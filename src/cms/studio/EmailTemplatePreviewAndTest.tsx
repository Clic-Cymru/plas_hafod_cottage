'use client';

import React, { useState, useEffect } from 'react';
import { useFormValue } from 'sanity';

interface TemplateOption {
  id: string;
  name: string;
  badge: string;
  description: string;
  supportsWelsh: boolean;
  sampleSubject: string;
}

const TEMPLATES: TemplateOption[] = [
  {
    id: 'guest-confirmation',
    name: 'Guest Booking Confirmation',
    badge: 'Guest Receipt',
    description: 'Instant branded confirmation receipt sent to guests upon booking inquiry submission.',
    supportsWelsh: true,
    sampleSubject: '✨ Booking Request Received – Plas Hafod Cottage',
  },
  {
    id: 'owner-booking',
    name: 'Owner Booking Alert',
    badge: 'Owner Alert',
    description: 'High-priority alert sent to hosts containing guest details, pricing breakdown, and Studio links.',
    supportsWelsh: false,
    sampleSubject: '🔔 New Booking Inquiry: Plas Hafod Cottage from Jane Doe',
  },
  {
    id: 'deposit-request',
    name: 'Guest Deposit Request (BACS)',
    badge: 'Payment Callout',
    description: 'Luxury branded payment invitation with bank transfer details, deadline, and payment reference.',
    supportsWelsh: false,
    sampleSubject: '🏦 Deposit Request – Secure Your Stay at Plas Hafod Cottage',
  },
  {
    id: 'visitor-contact',
    name: 'Visitor Contact Auto-Reply',
    badge: 'Auto-Reply',
    description: 'Polite branded auto-reply thanking website visitors and confirming 24h response.',
    supportsWelsh: true,
    sampleSubject: 'Thank You for Contacting Plas Hafod Cottage',
  },
  {
    id: 'owner-contact',
    name: 'Owner Contact Alert',
    badge: 'Message Alert',
    description: 'Alert sent to hosts with visitor questions, phone number, and direct reply capability.',
    supportsWelsh: false,
    sampleSubject: '📬 Website Message: Pet facilities inquiry from David Morgan',
  },
];

export function EmailTemplatePreviewAndTest() {
  const notificationRecipients = (useFormValue(['notificationRecipients']) as string) || '';
  const defaultEmail = notificationRecipients.split(',')[0]?.trim() || 'info@plashafodcottage.co.uk';

  const [activeTemplate, setActiveTemplate] = useState('guest-confirmation');
  const [lang, setLang] = useState<'en' | 'cy'>('en');
  const [property, setProperty] = useState<'plas-hafod' | 'bbb'>('plas-hafod');
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [refreshKey, setRefreshKey] = useState(Date.now());

  const [recipient, setRecipient] = useState(defaultEmail);
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Update default recipient when form value changes
  useEffect(() => {
    if (defaultEmail && !recipient) {
      setRecipient(defaultEmail);
    }
  }, [defaultEmail, recipient]);

  const currentTemplate = TEMPLATES.find((t) => t.id === activeTemplate) || TEMPLATES[0];

  const handleSendTest = async () => {
    if (!recipient || !recipient.includes('@')) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    setIsSending(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/email/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateType: activeTemplate,
          recipientEmail: recipient.trim(),
          lang,
          property,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to dispatch test email.');
      }

      setStatusMessage({
        type: 'success',
        text: `✅ Test email successfully dispatched via Resend to ${recipient}! (Message ID: ${data.messageId || 'sent'})`,
      });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: `❌ Error sending test email: ${err.message}`,
      });
    } finally {
      setIsSending(false);
    }
  };

  const previewUrl = `/api/email/test?template=${activeTemplate}&lang=${lang}&property=${property}&t=${refreshKey}`;

  return (
    <div
      style={{
        background: '#ffffff',
        border: '2px solid #e2e8f0',
        borderRadius: '12px',
        padding: '22px',
        marginBottom: '26px',
        boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #edf2f7',
          paddingBottom: '14px',
          marginBottom: '18px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '26px' }}>📧</span>
          <div>
            <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: '#1e293b' }}>
              Email Template Live Preview &amp; Test Sender
            </h3>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#64748b' }}>
              Preview all transactional templates using your active CMS copy, bank settings, and branding.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setRefreshKey(Date.now())}
          style={{
            background: '#f1f5f9',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#334155',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          🔄 Refresh Preview
        </button>
      </div>

      {/* Template Selection Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '16px',
        }}
      >
        {TEMPLATES.map((tmpl) => {
          const isSelected = tmpl.id === activeTemplate;
          return (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => {
                setActiveTemplate(tmpl.id);
                setStatusMessage(null);
              }}
              style={{
                flex: '1 0 auto',
                padding: '9px 14px',
                borderRadius: '8px',
                border: isSelected ? '2px solid #323149' : '1px solid #e2e8f0',
                background: isSelected ? '#323149' : '#f8fafc',
                color: isSelected ? '#ffffff' : '#334155',
                fontSize: '13px',
                fontWeight: isSelected ? 700 : 500,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                <span
                  style={{
                    fontSize: '10px',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: isSelected ? '#efda07' : '#e2e8f0',
                    color: '#1e1b2e',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  {tmpl.badge}
                </span>
              </div>
              <div style={{ fontWeight: 600 }}>{tmpl.name}</div>
            </button>
          );
        })}
      </div>

      {/* Controls Bar: Language, Property, Viewport */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '18px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          {/* Property Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Property:</span>
            <select
              value={property}
              onChange={(e) => setProperty(e.target.value as any)}
              style={{
                fontSize: '13px',
                padding: '5px 10px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#1e293b',
              }}
            >
              <option value="plas-hafod">Plas Hafod Cottage</option>
              <option value="bbb">Bryn Bugeiliaid Bach</option>
            </select>
          </div>

          {/* Language Selector (if supported) */}
          {currentTemplate.supportsWelsh ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Language:</span>
              <button
                type="button"
                onClick={() => setLang('en')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: lang === 'en' ? 700 : 500,
                  background: lang === 'en' ? '#323149' : '#ffffff',
                  color: lang === 'en' ? '#ffffff' : '#334155',
                  border: '1px solid #cbd5e1',
                  cursor: 'pointer',
                }}
              >
                🇬🇧 English
              </button>
              <button
                type="button"
                onClick={() => setLang('cy')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: lang === 'cy' ? 700 : 500,
                  background: lang === 'cy' ? '#323149' : '#ffffff',
                  color: lang === 'cy' ? '#ffffff' : '#334155',
                  border: '1px solid #cbd5e1',
                  cursor: 'pointer',
                }}
              >
                🏴󠁧󠁢󠁷󠁬󠁳󠁿 Cymraeg
              </button>
            </div>
          ) : (
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>Language: English (Internal host alert)</span>
          )}
        </div>

        {/* Viewport Width Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Device View:</span>
          <button
            type="button"
            onClick={() => setViewport('desktop')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: viewport === 'desktop' ? 700 : 500,
              background: viewport === 'desktop' ? '#323149' : '#ffffff',
              color: viewport === 'desktop' ? '#ffffff' : '#334155',
              border: '1px solid #cbd5e1',
              cursor: 'pointer',
            }}
          >
            💻 Desktop (600px)
          </button>
          <button
            type="button"
            onClick={() => setViewport('mobile')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: viewport === 'mobile' ? 700 : 500,
              background: viewport === 'mobile' ? '#323149' : '#ffffff',
              color: viewport === 'mobile' ? '#ffffff' : '#334155',
              border: '1px solid #cbd5e1',
              cursor: 'pointer',
            }}
          >
            📱 Mobile (375px)
          </button>
        </div>
      </div>

      {/* Live Preview Frame Container */}
      <div
        style={{
          background: '#f1f5f9',
          border: '1px solid #cbd5e1',
          borderRadius: '10px',
          padding: '24px 12px',
          display: 'flex',
          justifyContent: 'center',
          overflowX: 'auto',
          minHeight: '440px',
        }}
      >
        <div
          style={{
            width: viewport === 'mobile' ? '375px' : '620px',
            maxWidth: '100%',
            transition: 'width 0.25s ease',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            borderRadius: '12px',
            overflow: 'hidden',
            background: '#ffffff',
          }}
        >
          <iframe
            key={previewUrl}
            src={previewUrl}
            title={currentTemplate.name}
            style={{
              width: '100%',
              height: '520px',
              border: 'none',
              display: 'block',
              background: '#ffffff',
            }}
          />
        </div>
      </div>

      {/* One-Click Live Test Dispatcher */}
      <div
        style={{
          marginTop: '20px',
          background: '#f8fafc',
          border: '2px solid #e2e8f0',
          borderRadius: '10px',
          padding: '16px 20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>
              🚀 Send Live Test Email via Resend
            </h4>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>
              Dispatch the currently selected template ({currentTemplate.name}) directly to an inbox to test formatting in real mail clients.
            </p>
          </div>
          <span style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>
            Verified Sender: info@plashafodcottage.co.uk
          </span>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px' }}>
            <input
              type="email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. host@example.com or bob@clic.cymru"
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '13px',
                color: '#1e293b',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            type="button"
            onClick={handleSendTest}
            disabled={isSending}
            style={{
              background: isSending ? '#94a3b8' : '#323149',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 20px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: isSending ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              letterSpacing: '0.3px',
            }}
          >
            {isSending ? 'Sending Test...' : '🚀 Dispatch Live Test'}
          </button>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div
            style={{
              marginTop: '12px',
              padding: '10px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              lineHeight: 1.5,
              background: statusMessage.type === 'success' ? '#f0fdf4' : '#fef2f2',
              color: statusMessage.type === 'success' ? '#166534' : '#991b1b',
              border: `1px solid ${statusMessage.type === 'success' ? '#86efac' : '#fecaca'}`,
            }}
          >
            {statusMessage.text}
          </div>
        )}
      </div>
    </div>
  );
}
