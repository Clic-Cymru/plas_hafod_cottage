import { Resend } from 'resend';
import {
  BookingEmailData,
  ContactEmailData,
  generateOwnerBookingAlertHtml,
  generateGuestConfirmationHtml,
  generateOwnerContactAlertHtml,
  generateVisitorContactAutoReplyHtml,
} from './templates';

const apiKey = process.env.RESEND_API_KEY;
export const resend = apiKey ? new Resend(apiKey) : null;

// Before domain verification, Resend free accounts send from 'onboarding@resend.dev'
// Once custom domain is added in Resend, set RESEND_FROM_EMAIL='Plas Hafod <info@plashafodcottage.co.uk>'
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || 'Plas Hafod Cottage <onboarding@resend.dev>';
const OWNER_EMAIL = process.env.NOTIFICATION_EMAIL || 'info@plashafodcottage.co.uk';

export async function sendBookingEmails(data: BookingEmailData) {
  if (!resend) {
    console.log('[Resend Simulation] RESEND_API_KEY not configured. Emails simulated:', {
      owner: OWNER_EMAIL,
      guest: data.guestEmail,
      property: data.propertyTitle,
      dates: `${data.checkIn} to ${data.checkOut}`,
      total: data.totalPrice,
    });
    return { success: true, simulated: true };
  }

  try {
    // 1. Send Alert to Cottage Owner
    const ownerRes = await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      replyTo: data.guestEmail,
      subject: `🔔 New Booking Inquiry: ${data.propertyTitle} from ${data.guestName} (${data.checkIn} to ${data.checkOut})`,
      html: generateOwnerBookingAlertHtml(data),
    });

    // 2. Send Confirmation to Guest
    const guestRes = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.guestEmail,
      replyTo: OWNER_EMAIL,
      subject: `Booking Request Received – ${data.propertyTitle}`,
      html: generateGuestConfirmationHtml(data),
    });

    return { success: true, ownerRes, guestRes };
  } catch (error) {
    console.error('Failed to send booking emails via Resend:', error);
    return { success: false, error };
  }
}

export async function sendContactEmails(data: ContactEmailData) {
  if (!resend) {
    console.log('[Resend Simulation] RESEND_API_KEY not configured. Contact message simulated:', {
      owner: OWNER_EMAIL,
      from: data.email,
      name: data.name,
      message: data.message,
    });
    return { success: true, simulated: true };
  }

  try {
    // 1. Send Alert to Cottage Owner
    const ownerRes = await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      replyTo: data.email,
      subject: `📬 Website Message: ${data.subject || 'General Inquiry'} from ${data.name}`,
      html: generateOwnerContactAlertHtml(data),
    });

    // 2. Send Auto-reply to Visitor
    const visitorRes = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      replyTo: OWNER_EMAIL,
      subject: `Thank You for Contacting Plas Hafod Cottage`,
      html: generateVisitorContactAutoReplyHtml(data),
    });

    return { success: true, ownerRes, visitorRes };
  } catch (error) {
    console.error('Failed to send contact emails via Resend:', error);
    return { success: false, error };
  }
}
