'use client';

import React, { useState, useEffect } from 'react';
import { useFormValue, set, PatchEvent } from 'sanity';

interface BankDetailsSummary {
  bankAccountName?: string;
  bankName?: string;
  bankSortCode?: string;
  bankAccountNumber?: string;
  depositHoldHours?: number;
}

interface DepositRequestProps {
  onChange?: (patch: PatchEvent) => void;
}

export function DepositRequestComponent(props: DepositRequestProps) {
  const { onChange } = props;

  // Read current document state via Sanity Studio hook
  const docId = useFormValue(['_id']) as string;
  const inquiryRefId = useFormValue(['id']) as string;
  const status = useFormValue(['status']) as string;
  const guestName = useFormValue(['guestName']) as string;
  const guestEmail = useFormValue(['guestEmail']) as string;
  const guestPhone = useFormValue(['guestPhone']) as string;
  const checkIn = (useFormValue(['checkIn']) as string) || '';
  const checkOut = (useFormValue(['checkOut']) as string) || '';
  const totalNights = Number(useFormValue(['totalNights']) || 1);
  const propertyId = (useFormValue(['propertyId']) as string) || 'plas-hafod';
  const rawCalculatedTotal = useFormValue(['calculatedTotal']);
  const rawTotalPrice = useFormValue(['totalPrice']);
  const totalPrice = Number(rawCalculatedTotal ?? rawTotalPrice ?? 0);
  const depositAmount = Number(useFormValue(['depositAmount']) ?? 0);
  const balanceDue = Number(useFormValue(['balanceDue']) ?? 0);
  const paymentReference = (useFormValue(['paymentReference']) as string) || '';
  const depositSentAt = (useFormValue(['depositSentAt']) as string) || '';
  const depositEmailStatus = (useFormValue(['depositEmailStatus']) as string) || '';
  const currentNote = (useFormValue(['customDepositNote']) as string) || '';

  // Final Balance & Automated Check-in Workflow Hooks
  const finalBalancePaid = Boolean(useFormValue(['finalBalancePaid']));
  const checkInEmailStatus = (useFormValue(['checkInEmailStatus']) as string) || 'not_sent';
  const checkInEmailSentAt = (useFormValue(['checkInEmailSentAt']) as string) || '';
  const balanceReminderStatus = (useFormValue(['balanceReminderStatus']) as string) || 'not_sent';
  const balanceReminderSentAt = (useFormValue(['balanceReminderSentAt']) as string) || '';

  const [customNote, setCustomNote] = useState(currentNote || '');
  const [bankDetails, setBankDetails] = useState<BankDetailsSummary | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [copied, setCopied] = useState(false);

  // Fetch site bank details for display
  useEffect(() => {
    fetch('/api/booking/send-deposit-request')
      .then((res) => res.json())
      .then((data) => {
        if (data.defaultBankDetails) {
          setBankDetails(data.defaultBankDetails);
        }
      })
      .catch((err) => console.warn('Could not load bank details preview:', err));
  }, []);

  // Compute reference if not yet set
  const computedRef =
    paymentReference ||
    (() => {
      const prefix = propertyId === 'bryn-bugeiliaid-bach' ? 'BBB' : 'PH';
      const cleanName = (guestName || 'GUEST')
        .trim()
        .split(/\s+/)
        .pop()
        ?.replace(/[^A-Za-z0-9]/g, '')
        .toUpperCase()
        .slice(0, 8);
      const datePart = (checkIn || '').replace(/[^0-9]/g, '').slice(2, 6);
      return `${prefix}-${datePart || '26'}-${cleanName || 'GUEST'}`;
    })();

  const formatUkDate = (d: string) => {
    if (!d) return '';
    const m = String(d).match(/^(\d{4})-(\d{2})-(\d{2})/);
    return m ? `${m[3]}/${m[2]}/${m[1]}` : d;
  };

  const handleSendEmail = async () => {
    if (!guestEmail) {
      setStatusMessage({ type: 'error', text: 'Error: Guest email is missing.' });
      return;
    }

    setIsSending(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/booking/send-deposit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryId: docId || inquiryRefId,
          customNote,
          inquiryData: {
            _id: docId,
            id: inquiryRefId,
            guestName,
            guestEmail,
            guestPhone,
            checkIn,
            checkOut,
            totalNights,
            propertyId,
            totalPrice,
            calculatedTotal: totalPrice,
            depositAmount,
            balanceDue,
            paymentReference: computedRef,
          },
        }),
      });

      const result = await res.json();

      if (!res.ok || result.error) {
        throw new Error(result.error || 'Failed to send deposit email.');
      }

      // Update Sanity Studio fields in the active form
      const now = new Date().toISOString();
      if (onChange) {
        onChange(
          PatchEvent.from([
            set('deposit_requested', ['status']),
            set(result.paymentReference || computedRef, ['paymentReference']),
            set(now, ['depositSentAt']),
            set('sent', ['depositEmailStatus']),
            set(customNote, ['customDepositNote']),
          ])
        );
      }

      setStatusMessage({
        type: 'success',
        text: `Deposit request sent to ${guestEmail} (Ref: ${result.paymentReference || computedRef})!`,
      });
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Error sending deposit email.';
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      setIsSending(false);
    }
  };

  const handleMarkAsPaid = () => {
    if (onChange) {
      onChange(PatchEvent.from([set('confirmed', ['status'])]));
      setStatusMessage({
        type: 'success',
        text: 'Status updated to Confirmed (Deposit Paid)! Dates are now fully booked.',
      });
    }
  };

  const handleToggleFinalBalance = () => {
    if (onChange) {
      const nextVal = !finalBalancePaid;
      onChange(
        PatchEvent.from([
          set(nextVal, ['finalBalancePaid']),
          set(nextVal ? new Date().toISOString() : null, ['finalBalancePaidAt']),
        ])
      );
      setStatusMessage({
        type: 'success',
        text: nextVal
          ? '✓ Final balance marked as Paid! Check-in instructions can now be released.'
          : 'Final balance marked as Unpaid.',
      });
    }
  };

  const handleDispatchAction = async (actionType: 'checkin' | 'balance') => {
    setIsSending(true);
    setStatusMessage(null);
    try {
      const res = await fetch(
        `/api/cron/automated-emails?inquiryId=${docId || inquiryRefId}&action=${actionType}&force=true&secret=plas-hafod-cron-2026`,
        { method: 'POST' }
      );
      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMessage({
          type: 'success',
          text:
            actionType === 'checkin'
              ? '✓ Check-in Guide & Key Safe Code successfully emailed to guest!'
              : '✓ 14-Day Balance Reminder successfully emailed to guest!',
        });
        if (onChange) {
          const sentAt = new Date().toISOString();
          if (actionType === 'checkin') {
            onChange(
              PatchEvent.from([
                set('sent', ['checkInEmailStatus']),
                set(sentAt, ['checkInEmailSentAt']),
              ])
            );
          } else {
            onChange(
              PatchEvent.from([
                set('sent', ['balanceReminderStatus']),
                set(sentAt, ['balanceReminderSentAt']),
              ])
            );
          }
        }
      } else {
        setStatusMessage({
          type: 'error',
          text: `Failed to dispatch email: ${data.error || 'Server error'}`,
        });
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: `Error contacting dispatch API: ${err.message}`,
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleCopyPaymentText = () => {
    const text = `Plas Hafod Cottage Deposit Request
Property: ${propertyId === 'bryn-bugeiliaid-bach' ? 'Bryn Bugeiliaid Bach' : 'Plas Hafod Cottage'}
Guest: ${guestName}
Dates: ${formatUkDate(checkIn)} to ${formatUkDate(checkOut)} (${totalNights || 1} nights)
Total Stay: £${totalPrice}
Deposit Required (25%): £${depositAmount}
Payment Reference: ${computedRef}

Bank Transfer Details:
Bank: ${bankDetails?.bankName || 'Lloyds Bank'}
Account Name: ${bankDetails?.bankAccountName || 'SIWSAN BRODA - Plas Hafod'}
Sort Code: ${bankDetails?.bankSortCode || '77-48-24'}
Account Number: ${bankDetails?.bankAccountNumber || '15999760'}

Please quote reference "${computedRef}" with your transfer.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const isSent = depositEmailStatus === 'sent' || status === 'deposit_requested';
  const isConfirmed = status === 'confirmed';

  return (
    <div
      style={{
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        background: '#ffffff',
        padding: '20px',
        marginTop: '12px',
        marginBottom: '20px',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #edf2f7',
          paddingBottom: '14px',
          marginBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px' }}>💳</span>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#1e293b' }}>
              Deposit Request &amp; BACS Payment Workflow
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>
              Review payment breakdown, bank details, and dispatch deposit request email to guest
            </p>
          </div>
        </div>

        {/* Current status pill */}
        <div
          style={{
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            background: isConfirmed ? '#dcfce7' : isSent ? '#fef3c7' : '#f1f5f9',
            color: isConfirmed ? '#166534' : isSent ? '#92400e' : '#475569',
            border: `1px solid ${isConfirmed ? '#86efac' : isSent ? '#fcd34d' : '#cbd5e1'}`,
          }}
        >
          {isConfirmed ? '✅ Confirmed / Paid' : isSent ? '✉️ Deposit Requested' : '⏳ Pending Review'}
        </div>
      </div>

      {/* Status timestamp if already sent */}
      {depositSentAt && (
        <div
          style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '8px',
            padding: '10px 14px',
            marginBottom: '16px',
            fontSize: '13px',
            color: '#166534',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <strong>Deposit Request Sent:</strong> {new Date(depositSentAt).toLocaleString('en-GB')}
            <span style={{ marginLeft: '12px', color: '#15803d' }}>Ref: <strong>{computedRef}</strong></span>
          </div>
          {!isConfirmed && (
            <button
              type="button"
              onClick={handleMarkAsPaid}
              style={{
                background: '#15803d',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Mark Deposit Cleared &amp; Confirmed ✓
            </button>
          )}
        </div>
      )}

      {/* Grid of Key Info */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
          marginBottom: '16px',
          background: '#f8fafc',
          padding: '14px',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
        }}
      >
        <div>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            Guest Name &amp; Contact
          </span>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
            {guestName || '—'}
          </div>
          <div style={{ fontSize: '12px', color: '#475569' }}>{guestEmail || 'No email provided'}</div>
        </div>

        <div>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            Dates &amp; Nights
          </span>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
            {formatUkDate(checkIn)} → {formatUkDate(checkOut)}
          </div>
          <div style={{ fontSize: '12px', color: '#475569' }}>{totalNights || 1} Nights</div>
        </div>

        <div>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            Total Stay Quote
          </span>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
            £{totalPrice || 0}
          </div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Balance: £{balanceDue || 0}</div>
        </div>

        <div>
          <span style={{ fontSize: '11px', color: '#854d0e', fontWeight: 700, textTransform: 'uppercase' }}>
            Deposit to Collect (25%)
          </span>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#b45309', marginTop: '2px' }}>
            £{depositAmount || 0}
          </div>
          <div style={{ fontSize: '12px', color: '#92400e' }}>
            Ref: <strong style={{ color: '#0f172a' }}>{computedRef}</strong>
          </div>
        </div>
      </div>

      {/* Bank Details Display */}
      {bankDetails && (
        <div
          style={{
            background: '#fafaf9',
            border: '1px solid #e7e5e4',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '16px',
            fontSize: '13px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontWeight: 700, color: '#292524' }}>
              🏦 Bank Transfer Details (From Site Settings)
            </span>
            <span style={{ fontSize: '11px', color: '#78716c' }}>
              Edit anytime in <em>Site Settings &amp; Branding</em>
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', color: '#44403c' }}>
            <div><strong>Bank:</strong> {bankDetails.bankName}</div>
            <div><strong>Account Name:</strong> {bankDetails.bankAccountName}</div>
            <div><strong>Sort Code:</strong> {bankDetails.bankSortCode}</div>
            <div><strong>Account No:</strong> {bankDetails.bankAccountNumber}</div>
          </div>
        </div>
      )}

      {/* Optional Note from Host */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
          Personal Host Message (Optional — included in email):
        </label>
        <textarea
          rows={2}
          value={customNote}
          onChange={(e) => setCustomNote(e.target.value)}
          placeholder="e.g. We look forward to welcoming you to Eryri! Let us know if you need high chairs or early check-in."
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            fontSize: '13px',
            fontFamily: 'inherit',
            resize: 'vertical',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Notification Toast Message */}
      {statusMessage && (
        <div
          style={{
            padding: '10px 14px',
            borderRadius: '6px',
            marginBottom: '16px',
            fontSize: '13px',
            fontWeight: 500,
            background: statusMessage.type === 'success' ? '#f0fdf4' : statusMessage.type === 'error' ? '#fef2f2' : '#f8fafc',
            border: `1px solid ${statusMessage.type === 'success' ? '#86efac' : statusMessage.type === 'error' ? '#fca5a5' : '#cbd5e1'}`,
            color: statusMessage.type === 'success' ? '#166534' : statusMessage.type === 'error' ? '#991b1b' : '#334155',
          }}
        >
          {statusMessage.text}
        </div>
      )}

      {/* Action Buttons Toolbar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
        <button
          type="button"
          onClick={handleSendEmail}
          disabled={isSending || !guestEmail}
          style={{
            background: isSending ? '#94a3b8' : '#323149',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 22px',
            fontSize: '14px',
            fontWeight: 700,
            cursor: isSending || !guestEmail ? 'not-allowed' : 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'background 0.2s',
          }}
        >
          {isSending ? (
            <>⏳ Sending Deposit Request...</>
          ) : isSent ? (
            <>📧 Re-send Deposit Request Email</>
          ) : (
            <>📧 Send Deposit Request Email</>
          )}
        </button>

        <button
          type="button"
          onClick={handleCopyPaymentText}
          style={{
            background: '#ffffff',
            color: '#334155',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {copied ? '✅ Copied to Clipboard!' : '📋 Copy Payment Details (Text/WhatsApp)'}
        </button>

        {!isConfirmed && (
          <button
            type="button"
            onClick={handleMarkAsPaid}
            style={{
              background: '#f8fafc',
              color: '#15803d',
              border: '1px solid #86efac',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              marginLeft: 'auto',
            }}
          >
            Mark Paid &amp; Confirmed ✓
          </button>
        )}
      </div>

      {/* Check-in & Final Balance Automation Box (For Confirmed Bookings) */}
      {isConfirmed && (
        <div
          style={{
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '2px dashed #e2e8f0',
          }}
        >
          <div
            style={{
              background: finalBalancePaid ? '#f0fdf4' : '#fffbeb',
              border: `1px solid ${finalBalancePaid ? '#86efac' : '#fde68a'}`,
              borderRadius: '10px',
              padding: '16px 18px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <strong style={{ fontSize: '14px', color: finalBalancePaid ? '#166534' : '#92400e', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {finalBalancePaid ? '✅ Final Balance: PAID IN FULL' : '⏳ Final Balance: PENDING PAYMENT'}
                </strong>
                <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#4b5563' }}>
                  Remaining balance due: <strong>£{balanceDue}</strong>
                </p>
              </div>

              <button
                type="button"
                onClick={handleToggleFinalBalance}
                style={{
                  background: finalBalancePaid ? '#ffffff' : '#15803d',
                  color: finalBalancePaid ? '#374151' : '#ffffff',
                  border: `1px solid ${finalBalancePaid ? '#d1d5db' : '#15803d'}`,
                  borderRadius: '6px',
                  padding: '7px 14px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {finalBalancePaid ? '↩ Mark as Unpaid' : '✓ Mark Final Balance as Paid (BACS Received)'}
              </button>
            </div>

            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px 14px',
                marginTop: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#1f2937' }}>
                    🔑 Check-in Guide &amp; Key Safe Code (14-Day Automation)
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
                    Status:{' '}
                    {checkInEmailStatus === 'sent' ? (
                      <span style={{ color: '#15803d', fontWeight: 600 }}>
                        Sent to guest on {checkInEmailSentAt ? new Date(checkInEmailSentAt).toLocaleDateString('en-GB') : 'Yes'}
                      </span>
                    ) : (
                      <span style={{ color: '#b45309' }}>
                        Not yet dispatched (fires automatically 14 days before stay once balance is paid)
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {finalBalancePaid ? (
                    <button
                      type="button"
                      onClick={() => handleDispatchAction('checkin')}
                      disabled={isSending}
                      style={{
                        background: '#323149',
                        color: '#efda07',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 14px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: isSending ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {checkInEmailStatus === 'sent' ? 'Re-send Check-in Guide Now' : 'Send Check-in Guide Now 🚀'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleDispatchAction('balance')}
                      disabled={isSending}
                      style={{
                        background: '#fef3c7',
                        color: '#92400e',
                        border: '1px solid #fcd34d',
                        borderRadius: '6px',
                        padding: '8px 14px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: isSending ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {balanceReminderStatus === 'sent' ? 'Re-send Balance Reminder' : 'Send 14-Day Balance Reminder Now ✉️'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
