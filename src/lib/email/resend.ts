import { Resend } from 'resend';
import { formatDateUK } from '@/lib/date-utils';
import {
  BookingEmailData,
  ContactEmailData,
  DepositRequestEmailData,
  generateOwnerBookingAlertHtml,
  generateGuestConfirmationHtml,
  generateOwnerContactAlertHtml,
  generateVisitorContactAutoReplyHtml,
  generateOwnerBookingAlertText,
  generateGuestConfirmationText,
  generateOwnerContactAlertText,
  generateVisitorContactAutoReplyText,
  generateDepositRequestHtml,
  generateDepositRequestText,
} from './templates';

export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  return apiKey ? new Resend(apiKey) : null;
}

export function getEmailConfig() {
  return {
    fromEmail: process.env.RESEND_FROM_EMAIL || 'Plas Hafod Cottage <info@plashafodcottage.co.uk>',
    ownerEmail: process.env.NOTIFICATION_EMAIL || 'info@plashafodcottage.co.uk',
    publicReplyEmail: process.env.PUBLIC_REPLY_EMAIL || 'info@plashafodcottage.co.uk',
  };
}

// Retain export for backward compatibility
export const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendBookingEmails(data: BookingEmailData) {
  const client = getResendClient();
  const { fromEmail, ownerEmail, publicReplyEmail } = getEmailConfig();

  if (!client) {
    console.warn('[Resend Simulation] RESEND_API_KEY not configured. Emails simulated:', {
      owner: ownerEmail,
      guest: data.guestEmail,
      property: data.propertyTitle,
      dates: `${formatDateUK(data.checkIn)} to ${formatDateUK(data.checkOut)}`,
      total: data.totalPrice,
    });
    return { success: true, simulated: true };
  }

  try {
    const refHeader = data.inquiryId || `ph-${Date.now()}`;

    // 1. Send Alert to Cottage Owner (replying to this email goes straight to the guest)
    const ownerRes = await client.emails.send({
      from: fromEmail,
      to: ownerEmail,
      replyTo: data.guestEmail,
      subject: `🔔 New Booking Inquiry: ${data.propertyTitle} from ${data.guestName} (${formatDateUK(data.checkIn)} to ${formatDateUK(data.checkOut)})`,
      html: generateOwnerBookingAlertHtml(data),
      text: generateOwnerBookingAlertText(data),
      headers: {
        'X-Entity-Ref-ID': refHeader,
      },
    });

    if (ownerRes.error) {
      console.error('Resend error sending owner alert:', ownerRes.error);
    }

    // 2. Send Confirmation to Guest (replying to this goes to the business email)
    const guestRes = await client.emails.send({
      from: fromEmail,
      to: data.guestEmail,
      replyTo: publicReplyEmail,
      subject: `Booking Request Received – ${data.propertyTitle}`,
      html: generateGuestConfirmationHtml(data),
      text: generateGuestConfirmationText(data),
      headers: {
        'X-Entity-Ref-ID': refHeader,
      },
    });

    if (guestRes.error) {
      console.error('Resend error sending guest confirmation:', guestRes.error);
    }

    return { success: true, ownerRes, guestRes };
  } catch (error) {
    console.error('Failed to send booking emails via Resend:', error);
    return { success: false, error };
  }
}

export async function sendContactEmails(data: ContactEmailData) {
  const client = getResendClient();
  const { fromEmail, ownerEmail, publicReplyEmail } = getEmailConfig();

  if (!client) {
    console.warn('[Resend Simulation] RESEND_API_KEY not configured. Contact message simulated:', {
      owner: ownerEmail,
      from: data.email,
      name: data.name,
      message: data.message,
    });
    return { success: true, simulated: true };
  }

  try {
    // 1. Send Alert to Cottage Owner (replying to this email goes straight to the sender)
    const ownerRes = await client.emails.send({
      from: fromEmail,
      to: ownerEmail,
      replyTo: data.email,
      subject: `📬 Website Message: ${data.subject || 'General Inquiry'} from ${data.name}`,
      html: generateOwnerContactAlertHtml(data),
      text: generateOwnerContactAlertText(data),
    });

    if (ownerRes.error) {
      console.error('Resend error sending owner contact alert:', ownerRes.error);
    }

    // 2. Send Auto-reply to Visitor (replying to this goes to business email)
    const visitorRes = await client.emails.send({
      from: fromEmail,
      to: data.email,
      replyTo: publicReplyEmail,
      subject: `Thank You for Contacting Plas Hafod Cottage`,
      html: generateVisitorContactAutoReplyHtml(data),
      text: generateVisitorContactAutoReplyText(data),
    });

    if (visitorRes.error) {
      console.error('Resend error sending visitor auto-reply:', visitorRes.error);
    }

    return { success: true, ownerRes, visitorRes };
  } catch (error) {
    console.error('Failed to send contact emails via Resend:', error);
    return { success: false, error };
  }
}

export async function sendDepositRequestEmail(data: DepositRequestEmailData) {
  const client = getResendClient();
  const { fromEmail, ownerEmail, publicReplyEmail } = getEmailConfig();

  if (!client) {
    console.warn('[Resend Simulation] RESEND_API_KEY not configured. Deposit request simulated:', {
      guest: data.guestEmail,
      property: data.propertyTitle,
      depositAmount: data.depositAmount,
      reference: data.paymentReference,
      bank: `${data.bankName} - Sort: ${data.bankSortCode} - Acc: ${data.bankAccountNumber}`,
    });
    return { success: true, simulated: true };
  }

  try {
    const refHeader = data.paymentReference || data.inquiryId || `ph-dep-${Date.now()}`;

    // Send Deposit Request directly to Guest (cc owner so owner has immediate record)
    const guestRes = await client.emails.send({
      from: fromEmail,
      to: data.guestEmail,
      bcc: ownerEmail,
      replyTo: publicReplyEmail,
      subject: `Deposit Request – Secure Your Stay at ${data.propertyTitle} (${formatDateUK(data.checkIn)} to ${formatDateUK(data.checkOut)})`,
      html: generateDepositRequestHtml(data),
      text: generateDepositRequestText(data),
      headers: {
        'X-Entity-Ref-ID': refHeader,
      },
    });

    if (guestRes.error) {
      console.error('Resend error sending deposit request:', guestRes.error);
      return { success: false, error: guestRes.error };
    }

    return { success: true, guestRes };
  } catch (error) {
    console.error('Failed to send deposit request email via Resend:', error);
    return { success: false, error };
  }
}

