import React, { useState } from 'react';
import { DocumentActionDescription, DocumentActionProps } from 'sanity';

export function SendDepositRequestAction(props: DocumentActionProps): DocumentActionDescription | null {
  const { id, draft, published } = props;
  const doc = (draft || published) as Record<string, unknown> | null;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [resultMsg, setResultMsg] = useState<string | null>(null);

  if (!doc) return null;

  const guestName = String(doc.guestName || 'Guest');
  const guestEmail = String(doc.guestEmail || '');
  const depositAmount = Number(doc.depositAmount || 0);
  const totalPrice = Number(doc.calculatedTotal || doc.totalPrice || 0);
  const checkIn = String(doc.checkIn || '');
  const checkOut = String(doc.checkOut || '');
  const isAlreadySent = doc.depositEmailStatus === 'sent';

  const handleSend = async () => {
    setIsSending(true);
    setResultMsg(null);
    try {
      const res = await fetch('/api/booking/send-deposit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryId: doc._id || id,
          inquiryData: doc,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to send deposit email.');
      }
      setResultMsg(`Deposit request email successfully sent to ${guestEmail}!`);
      setTimeout(() => {
        setDialogOpen(false);
        setIsSending(false);
        setResultMsg(null);
      }, 2500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setResultMsg(`Error: ${msg}`);
      setIsSending(false);
    }
  };

  return {
    label: isAlreadySent ? 'Re-send Deposit Request' : 'Send Deposit Request (BACS)',
    title: 'Send a branded deposit request email with bank details to the guest',
    onHandle: () => {
      setDialogOpen(true);
    },
    dialog: dialogOpen
      ? {
          type: 'dialog' as const,
          onClose: () => {
            if (!isSending) setDialogOpen(false);
          },
          header: 'Send Deposit Request Email',
      content: (
        <div style={{ padding: '16px', fontFamily: 'sans-serif', lineHeight: 1.6, color: '#334155' }}>
          <p style={{ margin: '0 0 12px', fontSize: '14px' }}>
            Are you sure you want to send the BACS deposit request email to{' '}
            <strong>{guestName}</strong> ({guestEmail})?
          </p>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', marginBottom: '16px', fontSize: '13px' }}>
            <div><strong>Dates:</strong> {checkIn} to {checkOut}</div>
            <div><strong>Total Price:</strong> £{totalPrice}</div>
            <div style={{ color: '#b45309', fontWeight: 'bold' }}><strong>Deposit Amount (25%):</strong> £{depositAmount}</div>
          </div>
          {resultMsg && (
            <div style={{ padding: '10px', borderRadius: '6px', background: resultMsg.startsWith('Error') ? '#fef2f2' : '#f0fdf4', color: resultMsg.startsWith('Error') ? '#991b1b' : '#166534', marginBottom: '12px', fontSize: '13px' }}>
              {resultMsg}
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              disabled={isSending}
              onClick={() => setDialogOpen(false)}
              style={{ padding: '8px 16px', border: '1px solid #cbd5e1', background: '#fff', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isSending}
              onClick={handleSend}
              style={{ padding: '8px 18px', background: isSending ? '#94a3b8' : '#323149', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}
            >
              {isSending ? 'Sending via Resend...' : 'Confirm & Send Email'}
            </button>
          </div>
        </div>
      ),
    } : null,
  };
}
