import fs from 'fs';
import {
  generateOwnerBookingAlertHtml,
  generateGuestConfirmationHtml,
  generateOwnerContactAlertHtml,
  generateVisitorContactAutoReplyHtml,
} from '../src/lib/email/templates.ts';
import { Resend } from 'resend';

const envFile = fs.readFileSync('.env.local', 'utf8');
const envVars = Object.fromEntries(
  envFile
    .split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#') && l.includes('='))
    .map(l => {
      const idx = l.indexOf('=');
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const resend = new Resend(envVars.RESEND_API_KEY);
const fromEmail = envVars.RESEND_FROM_EMAIL;
const testRecipient = envVars.NOTIFICATION_EMAIL || 'bob@clic.cymru';

async function sendSampleTemplates() {
  console.log(`Sending sample booking & contact templates to: ${testRecipient}`);

  // 1. Sample Booking Alert (Owner View)
  await resend.emails.send({
    from: fromEmail,
    to: testRecipient,
    subject: '🔔 [TEST ALERT] New Booking Inquiry: Plas Hafod Cottage from Jane Doe (12-16 Nov 2026)',
    html: generateOwnerBookingAlertHtml({
      propertyTitle: 'Plas Hafod Cottage',
      guestName: 'Jane Doe',
      guestEmail: testRecipient,
      guestPhone: '07123 456789',
      checkIn: '12 Nov 2026',
      checkOut: '16 Nov 2026',
      totalNights: 4,
      adults: 2,
      children: 1,
      pets: 1,
      totalPrice: 560,
      depositAmount: 140,
      balanceDue: 420,
      notes: 'Looking forward to our Snowdonia stay! We are bringing a small dog.',
      inquiryId: 'test-inquiry-123',
    }),
  });
  console.log('✅ Sent Sample 1: Owner Booking Alert');

  // 2. Sample Guest Confirmation (Guest View)
  await resend.emails.send({
    from: fromEmail,
    to: testRecipient,
    subject: '✨ [TEST RECEIPT] Booking Request Received – Plas Hafod Cottage',
    html: generateGuestConfirmationHtml({
      propertyTitle: 'Plas Hafod Cottage',
      guestName: 'Jane Doe',
      guestEmail: testRecipient,
      guestPhone: '07123 456789',
      checkIn: '12 Nov 2026',
      checkOut: '16 Nov 2026',
      totalNights: 4,
      adults: 2,
      children: 1,
      pets: 1,
      totalPrice: 560,
      depositAmount: 140,
      balanceDue: 420,
      notes: 'Looking forward to our Snowdonia stay! We are bringing a small dog.',
    }),
  });
  console.log('✅ Sent Sample 2: Guest Confirmation Email');
}

sendSampleTemplates().catch(console.error);
