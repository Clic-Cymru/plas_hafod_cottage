import { Resend } from 'resend';
import { formatDateUK } from '@/lib/date-utils';
import { cmsClient } from '@/cms/client';
import {
  BookingEmailData,
  ContactEmailData,
  DepositRequestEmailData,
  CheckInGuideEmailData,
  BalanceReminderEmailData,
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
  generateCheckInGuideHtml,
  generateCheckInGuideText,
  generateBalanceReminderHtml,
  generateBalanceReminderText,
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

export async function sendBookingEmails(data: BookingEmailData, isCymraeg: boolean = false) {
  const client = getResendClient();
  const { fromEmail, ownerEmail, publicReplyEmail } = getEmailConfig();

  // Load live site settings for customized copy, check-in times & recipients
  const siteSettings = await cmsClient.getSiteSettings(isCymraeg);
  const customRecipients = siteSettings.notificationRecipients
    ? siteSettings.notificationRecipients.split(',').map((s) => s.trim()).filter(Boolean)
    : [];
  const targetOwnerRecipients = customRecipients.length > 0 ? customRecipients : ownerEmail;

  if (!client) {
    console.warn('[Resend Simulation] RESEND_API_KEY not configured. Emails simulated:', {
      owner: targetOwnerRecipients,
      guest: data.guestEmail,
      property: data.propertyTitle,
      dates: `${formatDateUK(data.checkIn)} to ${formatDateUK(data.checkOut)}`,
      total: data.totalPrice,
    });
    return { success: true, simulated: true };
  }

  try {
    const refHeader = data.inquiryId || `ph-${Date.now()}`;

    // 1. Send Alert to Cottage Owner(s) (replying goes straight to the guest)
    const ownerRes = await client.emails.send({
      from: fromEmail,
      to: targetOwnerRecipients,
      replyTo: data.guestEmail,
      subject: `🔔 New Booking Inquiry: ${data.propertyTitle} from ${data.guestName} (${formatDateUK(data.checkIn)} to ${formatDateUK(data.checkOut)})`,
      html: generateOwnerBookingAlertHtml(data, siteSettings),
      text: generateOwnerBookingAlertText(data, siteSettings),
      headers: {
        'X-Entity-Ref-ID': refHeader,
      },
    });

    if (ownerRes.error) {
      console.error('Resend error sending owner alert:', ownerRes.error);
    }

    // 2. Send Confirmation to Guest (replying goes to the public business email)
    const guestSubject = isCymraeg
      ? `Cais Archebu wedi’i Dderbyn – ${data.propertyTitle}`
      : `Booking Request Received – ${data.propertyTitle}`;

    const guestRes = await client.emails.send({
      from: fromEmail,
      to: data.guestEmail,
      replyTo: publicReplyEmail,
      subject: guestSubject,
      html: generateGuestConfirmationHtml(data, siteSettings, isCymraeg),
      text: generateGuestConfirmationText(data, siteSettings, isCymraeg),
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

export async function sendContactEmails(data: ContactEmailData, isCymraeg: boolean = false) {
  const client = getResendClient();
  const { fromEmail, ownerEmail, publicReplyEmail } = getEmailConfig();

  // Load live site settings for customized copy and recipients
  const siteSettings = await cmsClient.getSiteSettings(isCymraeg);
  const customRecipients = siteSettings.notificationRecipients
    ? siteSettings.notificationRecipients.split(',').map((s) => s.trim()).filter(Boolean)
    : [];
  const targetOwnerRecipients = customRecipients.length > 0 ? customRecipients : ownerEmail;

  if (!client) {
    console.warn('[Resend Simulation] RESEND_API_KEY not configured. Contact message simulated:', {
      owner: targetOwnerRecipients,
      from: data.email,
      name: data.name,
      message: data.message,
    });
    return { success: true, simulated: true };
  }

  try {
    // 1. Send Alert to Cottage Owner(s) (replying goes straight to sender)
    const ownerRes = await client.emails.send({
      from: fromEmail,
      to: targetOwnerRecipients,
      replyTo: data.email,
      subject: `📬 Website Message: ${data.subject || 'General Inquiry'} from ${data.name}`,
      html: generateOwnerContactAlertHtml(data, siteSettings),
      text: generateOwnerContactAlertText(data, siteSettings),
    });

    if (ownerRes.error) {
      console.error('Resend error sending owner contact alert:', ownerRes.error);
    }

    // 2. Send Auto-reply to Visitor (replying goes to business email)
    const visitorSubject = isCymraeg
      ? 'Diolch am Gysylltu â Bwthyn Plas Hafod'
      : 'Thank You for Contacting Plas Hafod Cottage';

    const visitorRes = await client.emails.send({
      from: fromEmail,
      to: data.email,
      replyTo: publicReplyEmail,
      subject: visitorSubject,
      html: generateVisitorContactAutoReplyHtml(data, siteSettings, isCymraeg),
      text: generateVisitorContactAutoReplyText(data, siteSettings, isCymraeg),
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
    const errMsg = 'RESEND_API_KEY environment variable is missing or invalid on the server.';
    console.error('[Resend Error]', errMsg);
    return { success: false, simulated: true, error: new Error(errMsg) };
  }

  const siteSettings = await cmsClient.getSiteSettings(false);
  const customRecipients = siteSettings.notificationRecipients
    ? siteSettings.notificationRecipients.split(',').map((s) => s.trim()).filter(Boolean)
    : [];
  const targetBccRecipients = customRecipients.length > 0 ? customRecipients : ownerEmail;

  try {
    const refHeader = data.paymentReference || data.inquiryId || `ph-dep-${Date.now()}`;

    // Send Deposit Request directly to Guest (bcc owner so owner has immediate record)
    const guestRes = await client.emails.send({
      from: fromEmail,
      to: data.guestEmail,
      bcc: targetBccRecipients,
      replyTo: publicReplyEmail,
      subject: `Deposit Request – Secure Your Stay at ${data.propertyTitle} (${formatDateUK(data.checkIn)} to ${formatDateUK(data.checkOut)})`,
      html: generateDepositRequestHtml(data, siteSettings),
      text: generateDepositRequestText(data, siteSettings),
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

export async function sendCheckInGuideEmail(data: CheckInGuideEmailData, isCymraeg: boolean = false) {
  const client = getResendClient();
  const { fromEmail, ownerEmail, publicReplyEmail } = getEmailConfig();

  if (!client) {
    const errMsg = 'RESEND_API_KEY environment variable is missing on server. Check-in guide simulated.';
    console.warn('[Resend Simulation]', errMsg, { to: data.guestEmail, property: data.propertyTitle });
    return { success: true, simulated: true };
  }

  const siteSettings = await cmsClient.getSiteSettings(isCymraeg);
  const customRecipients = siteSettings.notificationRecipients
    ? siteSettings.notificationRecipients.split(',').map((s) => s.trim()).filter(Boolean)
    : [];
  const targetBccRecipients = customRecipients.length > 0 ? customRecipients : ownerEmail;

  try {
    const refHeader = data.inquiryId ? `checkin-${data.inquiryId}` : `checkin-${Date.now()}`;
    const subject = isCymraeg
      ? `Canllaw Cyrraedd a Chôd Blwch Allweddi – ${data.propertyTitle} (${formatDateUK(data.checkIn)})`
      : `Arrival Guide & Key Safe Instructions – ${data.propertyTitle} (${formatDateUK(data.checkIn)})`;

    const guestRes = await client.emails.send({
      from: fromEmail,
      to: data.guestEmail,
      bcc: targetBccRecipients,
      replyTo: publicReplyEmail,
      subject,
      html: generateCheckInGuideHtml(data, siteSettings, isCymraeg),
      text: generateCheckInGuideText(data, siteSettings, isCymraeg),
      headers: {
        'X-Entity-Ref-ID': refHeader,
      },
    });

    if (guestRes.error) {
      console.error('Resend error sending check-in guide:', guestRes.error);
      return { success: false, error: guestRes.error };
    }

    return { success: true, guestRes };
  } catch (error) {
    console.error('Failed to send check-in guide email via Resend:', error);
    return { success: false, error };
  }
}

export async function sendBalanceReminderEmail(data: BalanceReminderEmailData, isCymraeg: boolean = false) {
  const client = getResendClient();
  const { fromEmail, ownerEmail, publicReplyEmail } = getEmailConfig();

  if (!client) {
    const errMsg = 'RESEND_API_KEY environment variable is missing on server. Balance reminder simulated.';
    console.warn('[Resend Simulation]', errMsg, { to: data.guestEmail, property: data.propertyTitle });
    return { success: true, simulated: true };
  }

  const siteSettings = await cmsClient.getSiteSettings(isCymraeg);
  const customRecipients = siteSettings.notificationRecipients
    ? siteSettings.notificationRecipients.split(',').map((s) => s.trim()).filter(Boolean)
    : [];
  const targetBccRecipients = customRecipients.length > 0 ? customRecipients : ownerEmail;

  try {
    const refHeader = data.paymentReference ? `bal-${data.paymentReference}` : `bal-${Date.now()}`;
    const subject = isCymraeg
      ? `Atgoffa Taliad Gweddill – ${data.propertyTitle} (${formatDateUK(data.checkIn)})`
      : `Reminder: Remaining Balance Due – ${data.propertyTitle} (${formatDateUK(data.checkIn)})`;

    const guestRes = await client.emails.send({
      from: fromEmail,
      to: data.guestEmail,
      bcc: targetBccRecipients,
      replyTo: publicReplyEmail,
      subject,
      html: generateBalanceReminderHtml(data, siteSettings, isCymraeg),
      text: generateBalanceReminderText(data, siteSettings, isCymraeg),
      headers: {
        'X-Entity-Ref-ID': refHeader,
      },
    });

    if (guestRes.error) {
      console.error('Resend error sending balance reminder:', guestRes.error);
      return { success: false, error: guestRes.error };
    }

    return { success: true, guestRes };
  } catch (error) {
    console.error('Failed to send balance reminder email via Resend:', error);
    return { success: false, error };
  }
}


