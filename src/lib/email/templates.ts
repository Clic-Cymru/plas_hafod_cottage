import { formatDateUK } from '../date-utils.ts';
import type { SiteSettings } from '../../cms/types.ts';

export interface BookingEmailData {
  propertyTitle: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  totalNights: number;
  adults: number;
  children: number;
  pets: number;
  totalPrice: number;
  depositAmount: number;
  balanceDue: number;
  appliedDiscountName?: string;
  discountAmount?: number;
  notes?: string;
  inquiryId?: string;
}

export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  submittedAt?: string;
}

export interface DepositRequestEmailData extends BookingEmailData {
  paymentReference: string;
  bankAccountName: string;
  bankName: string;
  bankSortCode: string;
  bankAccountNumber: string;
  bankIban?: string;
  bankBic?: string;
  holdHours?: number;
  depositDeadline?: string;
  depositInstructions?: string;
  customHostNote?: string;
  hostNames?: string;
  contactPhone?: string;
}

// Hosted on global CDN for instant, reliable loading across all email clients (Gmail, Outlook, Apple Mail)
export const LOGO_COLOR_URL =
  'https://cdn.sanity.io/images/iji5mij0/production/e869c435303f83aea95717dda5de5b822310fb00-821x523.png';
export const LOGO_WHITE_URL =
  'https://cdn.sanity.io/images/iji5mij0/production/20a5069ce3f84e0a7f886cd753993227028c0945-810x523.png';

/**
 * 1. Owner Alert: Dark Theme / Dashboard Style with White Logo
 */
export function generateOwnerBookingAlertHtml(data: BookingEmailData, settings?: Partial<SiteSettings>): string {
  const depositPct = settings?.depositPercentage || 25;
  const studioUrl = data.inquiryId
    ? `https://plashafodcottage.co.uk/studio/structure/archebion-phrisiau-booking-engine;bookingInquiry;${data.inquiryId}`
    : 'https://plashafodcottage.co.uk/studio';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; color: #334155; margin: 0; padding: 24px 12px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.06); }
    .header { background: #323149; color: #ffffff; padding: 32px 24px; text-align: center; }
    .badge { display: inline-block; background: #efda07; color: #1e1b2e; font-weight: 800; font-size: 11px; padding: 5px 12px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 12px; }
    .content { padding: 28px 24px; }
    .table { width: 100%; border-collapse: collapse; margin: 18px 0; }
    .table th, .table td { padding: 11px 14px; text-align: left; border-bottom: 1px solid #edf2f7; font-size: 14px; }
    .table th { background: #f8fafc; color: #64748b; font-weight: 600; width: 42%; }
    .total-row { font-weight: bold; background: #f1f5f9; }
    .btn { display: inline-block; background: #323149; color: #ffffff !important; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; text-align: center; margin-top: 16px; letter-spacing: 0.3px; }
    .footer { padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; background: #f8fafc; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div style="margin-bottom: 16px;">
        <img src="${LOGO_WHITE_URL}" alt="Plas Hafod Cottage" width="160" style="display: inline-block; max-width: 160px; height: auto;" border="0" />
      </div>
      <span class="badge">New Booking Request</span>
      <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">${data.propertyTitle}</h1>
    </div>
    <div class="content">
      <p style="font-size: 15px; margin-top: 0; color: #334155;">You have received a new booking inquiry through the website:</p>
      
      <table class="table">
        <tr><th>Guest Name</th><td><strong>${data.guestName}</strong></td></tr>
        <tr><th>Email</th><td><a href="mailto:${data.guestEmail}" style="color: #4338ca; text-decoration: none;">${data.guestEmail}</a></td></tr>
        <tr><th>Phone</th><td><a href="tel:${data.guestPhone}" style="color: #4338ca; text-decoration: none;">${data.guestPhone}</a></td></tr>
        <tr><th>Dates</th><td><strong>${formatDateUK(data.checkIn)}</strong> to <strong>${formatDateUK(data.checkOut)}</strong> (${data.totalNights} nights)</td></tr>
        <tr><th>Party</th><td>${data.adults} Adults, ${data.children} Children, ${data.pets} Pets</td></tr>
        ${data.appliedDiscountName ? `<tr><th>Discount Applied</th><td><span style="color: #15803d; font-weight: 600;">${data.appliedDiscountName} (-£${data.discountAmount})</span></td></tr>` : ''}
        <tr class="total-row"><th>Total Quote</th><td>£${data.totalPrice}</td></tr>
        <tr><th>Deposit to Collect (${depositPct}%)</th><td><strong style="color: #0f172a;">£${data.depositAmount}</strong></td></tr>
        <tr><th>Remaining Balance</th><td>£${data.balanceDue}</td></tr>
        ${data.notes ? `<tr><th>Guest Notes</th><td><em style="color: #475569;">"${data.notes}"</em></td></tr>` : ''}
        ${data.inquiryId ? `<tr><th>Reference ID</th><td><code>${data.inquiryId}</code></td></tr>` : ''}
      </table>

      <div style="text-align: center; margin-top: 24px;">
        <a href="${studioUrl}" class="btn">Open in Sanity Studio Dashboard →</a>
      </div>
    </div>
    <div class="footer">
      ${settings?.siteTitle || 'Plas Hafod Cottage Management System'} • Snowdonia / Eryri
    </div>
  </div>
</body>
</html>
`;
}

/**
 * 2. Guest Confirmation: Light, Welcoming Holiday Template with Colour Logo (+ Dark Mode swap)
 */
export function generateGuestConfirmationHtml(
  data: BookingEmailData,
  settings?: Partial<SiteSettings>,
  isCymraeg: boolean = false
): string {
  const hosts = settings?.hostNames || 'Siwsan & Neil';
  const siteTitle = settings?.siteTitle || 'Plas Hafod Cottage & Bryn Bugeiliaid Bach';
  const phone = settings?.emergencyHostPhone || settings?.phone || '+44 (0) 1286 880 000';
  const checkInTime = settings?.checkInTime || '4:00 PM';
  const checkOutTime = settings?.checkOutTime || '10:00 AM';
  const depositPct = settings?.depositPercentage || 25;
  const address =
    (isCymraeg && settings?.addressCy ? settings.addressCy : settings?.address) ||
    'Plas Hafod Cottage, Nebo, Caernarfon, Gwynedd, LL54 6EE';

  const rawWelcome = isCymraeg
    ? (settings?.guestBookingEmailWelcomeCy ||
       'Diolch am eich ymholiad i aros gyda ni yn {property}. Rydym wedi derbyn eich cais archebu ac mae ein tîm yn adolygu argaeledd ar gyfer eich dyddiadau dewisol.')
    : (settings?.guestBookingEmailWelcomeEn ||
       'Thank you for your inquiry to stay with us at {property}. We have received your booking request and our team is reviewing availability for your selected dates.');
  const resolvedWelcome = rawWelcome.replace('{property}', `<strong>${data.propertyTitle}</strong>`);

  const resolvedNextSteps = isCymraeg
    ? (settings?.guestBookingEmailNextStepsCy ||
       'Byddwn yn adolygu eich dyddiadau gofynnol ac yn cysylltu â chi’n fuan gyda chadarnhad a manylion talu blaendal diogel i gadarnhau eich arhosiad.')
    : (settings?.guestBookingEmailNextStepsEn ||
       'We will review your requested dates and contact you shortly with confirmation and secure deposit payment details to lock in your stay.');

  const dearText = isCymraeg ? 'Annwyl' : 'Dear';
  const whatNextHeading = isCymraeg ? 'Beth sy’n digwydd nesaf?' : 'What happens next?';
  const summaryHeading = isCymraeg ? 'Crynodeb o’ch Archeb' : 'Your Booking Summary';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f6f4; color: #2d3748; margin: 0; padding: 24px 12px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.06); }
    .header { background: #ffffff; padding: 32px 24px 20px; text-align: center; border-bottom: 3px solid #efda07; }
    .content { padding: 30px 24px; }
    .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .table th, .table td { padding: 11px 14px; text-align: left; border-bottom: 1px solid #edf2f7; font-size: 14px; }
    .table th { background: #fbfbfd; color: #64748b; font-weight: 600; width: 42%; }
    .highlight-box { background: #fafaf9; border-left: 4px solid #efda07; padding: 16px 18px; margin: 22px 0; border-radius: 0 8px 8px 0; font-size: 14px; line-height: 1.55; color: #334155; }
    .footer { padding: 24px 20px; text-align: center; font-size: 12px; color: #94a3b8; background: #fafaf9; border-top: 1px solid #f1f5f9; line-height: 1.6; }

    /* Dark Mode Email Client Support */
    @media (prefers-color-scheme: dark) {
      body { background-color: #121019 !important; color: #e2e8f0 !important; }
      .card { background-color: #1c1829 !important; border-color: #2e2842 !important; color: #f1f5f9 !important; }
      .header { background-color: #241f35 !important; border-bottom-color: #efda07 !important; }
      .logo-color { display: none !important; }
      .logo-white { display: inline-block !important; }
      .content { color: #e2e8f0 !important; }
      .table th { background-color: #262038 !important; color: #cbd5e1 !important; border-color: #383152 !important; }
      .table td { border-color: #2e2842 !important; color: #e2e8f0 !important; }
      .highlight-box { background-color: #241f35 !important; color: #e2e8f0 !important; }
      .footer { background-color: #151221 !important; border-color: #2e2842 !important; color: #64748b !important; }
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div style="margin-bottom: 12px;">
        <img class="logo-color" src="${LOGO_COLOR_URL}" alt="Plas Hafod Cottage" width="165" style="display: inline-block; max-width: 165px; height: auto;" border="0" />
      </div>
      <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #1e1b2e; letter-spacing: 0.3px;">Croeso / Welcome</h1>
      <p style="margin: 4px 0 0; font-size: 15px; color: #64748b; font-weight: 500;">${data.propertyTitle}</p>
    </div>
    <div class="content">
      <p style="font-size: 16px; margin-top: 0; color: #1e293b;">${dearText} <strong>${data.guestName}</strong>,</p>
      
      <p style="font-size: 14px; line-height: 1.6; color: #475569;">
        ${resolvedWelcome}
      </p>

      <div class="highlight-box">
        <strong style="color: #0f172a;">${whatNextHeading}</strong><br>
        ${resolvedNextSteps}
      </div>

      <h3 style="font-size: 16px; margin: 26px 0 10px; color: #0f172a;">${summaryHeading}</h3>
      <table class="table">
        <tr><th>Property</th><td><strong>${data.propertyTitle}</strong></td></tr>
        <tr><th>Check-in</th><td>${formatDateUK(data.checkIn)} (from ${checkInTime})</td></tr>
        <tr><th>Check-out</th><td>${formatDateUK(data.checkOut)} (by ${checkOutTime})</td></tr>
        <tr><th>Duration</th><td>${data.totalNights} Nights</td></tr>
        <tr><th>Guests</th><td>${data.adults} Adults, ${data.children} Children, ${data.pets} Pets</td></tr>
        ${data.appliedDiscountName ? `<tr><th>Special Offer</th><td><span style="color: #15803d; font-weight: 600;">${data.appliedDiscountName} (-£${data.discountAmount})</span></td></tr>` : ''}
        <tr><th>Total Stay Price</th><td><strong>£${data.totalPrice}</strong></td></tr>
        <tr><th>Deposit to Secure (${depositPct}%)</th><td><strong>£${data.depositAmount}</strong></td></tr>
        <tr><th>Balance Due Prior to Arrival</th><td>£${data.balanceDue}</td></tr>
      </table>

      <p style="font-size: 13px; color: #64748b; line-height: 1.6;">
        If you have any questions in the meantime or wish to modify your dates, simply reply directly to this email or call us on <strong>${phone}</strong>.
      </p>

      <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #edf2f7;">
        <p style="font-size: 14px; margin: 0 0 4px; color: #1e293b;">
          Warmest regards,<br>
          <strong>${hosts}</strong><br>
          <span style="color: #64748b; font-size: 13px;">${siteTitle}</span>
        </p>
        <span style="font-size: 12px; color: #64748b;">${address} • Eryri / Snowdonia National Park</span>
      </div>
    </div>
    <div class="footer">
      ${siteTitle}<br>
      Website: <a href="https://plashafodcottage.co.uk" style="color: #4f46e5; text-decoration: none;">plashafodcottage.co.uk</a> • Email: <a href="mailto:info@plashafodcottage.co.uk" style="color: #4f46e5; text-decoration: none;">info@plashafodcottage.co.uk</a>
    </div>
  </div>
</body>
</html>
`;
}

/**
 * 3. Owner Contact Message: Dark Theme with White Logo
 */
export function generateOwnerContactAlertHtml(
  data: ContactEmailData,
  settings?: Partial<SiteSettings>
): string {
  const siteTitle = settings?.siteTitle || 'Plas Hafod Cottage Management System';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; color: #334155; margin: 0; padding: 24px 12px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.06); }
    .header { background: #323149; color: #ffffff; padding: 30px 24px; text-align: center; }
    .content { padding: 28px 24px; }
    .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #efda07; border-radius: 6px; padding: 18px; margin: 18px 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #1e293b; }
    .btn { display: inline-block; background: #323149; color: #ffffff !important; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 13px; text-align: center; margin-top: 14px; }
    .footer { padding: 18px; text-align: center; font-size: 12px; color: #94a3b8; background: #f8fafc; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div style="margin-bottom: 14px;">
        <img src="${LOGO_WHITE_URL}" alt="Plas Hafod Cottage" width="150" style="display: inline-block; max-width: 150px; height: auto;" border="0" />
      </div>
      <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;">New Website Contact Message</h2>
    </div>
    <div class="content">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <tr><td style="padding: 6px 0; font-size: 14px; width: 80px; color: #64748b; font-weight: 600;">From:</td><td style="font-size: 14px; color: #0f172a;"><strong>${data.name}</strong> (&lt;<a href="mailto:${data.email}" style="color: #4338ca;">${data.email}</a>&gt;)</td></tr>
        ${data.phone ? `<tr><td style="padding: 6px 0; font-size: 14px; color: #64748b; font-weight: 600;">Phone:</td><td style="font-size: 14px; color: #0f172a;"><a href="tel:${data.phone}" style="color: #4338ca;">${data.phone}</a></td></tr>` : ''}
        ${data.subject ? `<tr><td style="padding: 6px 0; font-size: 14px; color: #64748b; font-weight: 600;">Subject:</td><td style="font-size: 14px; color: #0f172a;"><strong>${data.subject}</strong></td></tr>` : ''}
      </table>

      <div class="message-box">${data.message}</div>

      <p style="font-size: 13px; color: #64748b; margin-bottom: 0;">
        💡 You can reply directly to this email to respond to <strong>${data.name}</strong>.
      </p>

      <div style="text-align: center; margin-top: 20px;">
        <a href="https://plashafodcottage.co.uk/studio/structure/negeseuon-messages-inbox;contactMessage" class="btn">View in Studio Messages Inbox →</a>
      </div>
    </div>
    <div class="footer">
      ${siteTitle} • Website Message System
    </div>
  </div>
</body>
</html>
`;
}

/**
 * 4. Visitor Auto-Reply: Light Template with Colour Logo (+ Dark Mode swap)
 */
export function generateVisitorContactAutoReplyHtml(
  data: ContactEmailData,
  settings?: Partial<SiteSettings>,
  isCymraeg: boolean = false
): string {
  const hosts = settings?.hostNames || 'Siwsan & Neil';
  const siteTitle = settings?.siteTitle || 'Plas Hafod Cottage & Bryn Bugeiliaid Bach';
  const phone = settings?.emergencyHostPhone || settings?.phone || '+44 (0) 1286 880 000';
  const address =
    (isCymraeg && settings?.addressCy ? settings.addressCy : settings?.address) ||
    'Plas Hafod Cottage, Nebo, Caernarfon, Gwynedd, LL54 6EE';

  const rawReply = isCymraeg
    ? (settings?.guestContactEmailReplyCy ||
       'Diolch am gysylltu â ni. Rydym wedi derbyn eich neges a byddwn yn ymateb cyn pen 24 awr.')
    : (settings?.guestContactEmailReplyEn ||
       'Thank you for getting in touch with us. We have received your inquiry and will respond to you within 24 hours.');

  const dearText = isCymraeg ? 'Annwyl' : 'Dear';
  const yourMsgHeading = isCymraeg ? 'Eich Neges:' : 'Your Message:';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f6f4; color: #2d3748; margin: 0; padding: 24px 12px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.06); }
    .header { background: #ffffff; padding: 30px 24px 18px; text-align: center; border-bottom: 3px solid #efda07; }
    .content { padding: 28px 24px; }
    .footer { padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; background: #fafaf9; border-top: 1px solid #f1f5f9; }

    @media (prefers-color-scheme: dark) {
      body { background-color: #121019 !important; color: #e2e8f0 !important; }
      .card { background-color: #1c1829 !important; border-color: #2e2842 !important; color: #f1f5f9 !important; }
      .header { background-color: #241f35 !important; border-bottom-color: #efda07 !important; }
      .logo-color { display: none !important; }
      .logo-white { display: inline-block !important; }
      .content { color: #e2e8f0 !important; }
      .footer { background-color: #151221 !important; border-color: #2e2842 !important; color: #64748b !important; }
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div style="margin-bottom: 12px;">
        <img class="logo-color" src="${LOGO_COLOR_URL}" alt="Plas Hafod Cottage" width="160" style="display: inline-block; max-width: 160px; height: auto;" border="0" />
      </div>
      <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #1e1b2e;">Thank You for Contacting Us</h2>
      <p style="margin: 4px 0 0; font-size: 14px; color: #64748b;">${siteTitle}</p>
    </div>
    <div class="content">
      <p style="font-size: 15px; margin-top: 0; color: #1e293b;">${dearText} <strong>${data.name}</strong>,</p>
      <p style="font-size: 14px; line-height: 1.6; color: #475569;">
        ${rawReply}
      </p>
      
      <div style="background: #fafaf9; border-left: 3px solid #323149; padding: 14px 18px; margin: 18px 0; font-size: 13px; color: #475569; border-radius: 0 6px 6px 0;">
        <strong style="color: #0f172a;">${yourMsgHeading}</strong><br>
        <span style="font-style: italic;">"${data.message}"</span>
      </div>

      <div style="margin-top: 24px;">
        <p style="font-size: 14px; margin: 0 0 4px; color: #1e293b;">
          Warm regards,<br>
          <strong>${hosts}</strong><br>
          <span style="color: #64748b; font-size: 13px;">${siteTitle}</span>
        </p>
        <span style="font-size: 12px; color: #64748b;">${address} • Tel: ${phone}</span>
      </div>
    </div>
    <div class="footer">
      ${siteTitle} • <a href="https://plashafodcottage.co.uk" style="color: #4f46e5; text-decoration: none;">plashafodcottage.co.uk</a>
    </div>
  </div>
</body>
</html>
`;
}

/**
 * Plain Text Alternative: Guest Booking Confirmation
 */
export function generateGuestConfirmationText(
  data: BookingEmailData,
  settings?: Partial<SiteSettings>,
  isCymraeg: boolean = false
): string {
  const hosts = settings?.hostNames || 'Siwsan & Neil';
  const siteTitle = settings?.siteTitle || 'Plas Hafod Cottage & Bryn Bugeiliaid Bach';
  const phone = settings?.emergencyHostPhone || settings?.phone || '+44 (0) 1286 880 000';
  const checkInTime = settings?.checkInTime || '4:00 PM';
  const checkOutTime = settings?.checkOutTime || '10:00 AM';
  const depositPct = settings?.depositPercentage || 25;
  const address =
    (isCymraeg && settings?.addressCy ? settings.addressCy : settings?.address) ||
    'Plas Hafod Cottage, Nebo, Caernarfon, Gwynedd, LL54 6EE';

  const rawWelcome = isCymraeg
    ? (settings?.guestBookingEmailWelcomeCy ||
       'Diolch am eich ymholiad i aros gyda ni yn {property}. Rydym wedi derbyn eich cais archebu ac mae ein tîm yn adolygu argaeledd ar gyfer eich dyddiadau dewisol.')
    : (settings?.guestBookingEmailWelcomeEn ||
       'Thank you for your inquiry to stay with us at {property}. We have received your booking request and our team is reviewing availability for your selected dates.');
  const resolvedWelcome = rawWelcome.replace('{property}', data.propertyTitle);

  const rawNextSteps = isCymraeg
    ? (settings?.guestBookingEmailNextStepsCy ||
       'Byddwn yn adolygu eich dyddiadau gofynnol ac yn cysylltu â chi’n fuan gyda chadarnhad a manylion talu blaendal diogel i gadarnhau eich arhosiad.')
    : (settings?.guestBookingEmailNextStepsEn ||
       'We will review your requested dates and contact you shortly with confirmation and secure deposit payment details to lock in your stay.');

  const dearText = isCymraeg ? 'Annwyl' : 'Dear';
  const whatNextHeading = isCymraeg ? 'BETH SY’N DIGWYDD NESAF:' : 'WHAT HAPPENS NEXT:';
  const summaryHeading = isCymraeg ? 'CRYNODEB O’CH ARCHEB:' : 'YOUR BOOKING SUMMARY:';

  return `Croeso / Welcome to ${data.propertyTitle}

${dearText} ${data.guestName},

${resolvedWelcome}

${whatNextHeading}
${rawNextSteps}

${summaryHeading}
- Property: ${data.propertyTitle}
- Check-in: ${formatDateUK(data.checkIn)} (from ${checkInTime})
- Check-out: ${formatDateUK(data.checkOut)} (by ${checkOutTime})
- Duration: ${data.totalNights} Nights
- Guests: ${data.adults} Adults, ${data.children} Children, ${data.pets} Pets
${data.appliedDiscountName ? `- Special Offer: ${data.appliedDiscountName} (-£${data.discountAmount || 0})\n` : ''}- Total Stay Price: £${data.totalPrice}
- Deposit to Secure (${depositPct}%): £${data.depositAmount}
- Remaining Balance: £${data.balanceDue}
${data.notes ? `- Notes: "${data.notes}"\n` : ''}
If you have any questions in the meantime or wish to modify your dates, simply reply directly to this email or call us on ${phone}.

Warmest regards,
${hosts}
${siteTitle}
${address} • Eryri / Snowdonia National Park
Website: https://plashafodcottage.co.uk
Email: info@plashafodcottage.co.uk`;
}

/**
 * Plain Text Alternative: Owner Booking Alert
 */
export function generateOwnerBookingAlertText(
  data: BookingEmailData,
  settings?: Partial<SiteSettings>
): string {
  const depositPct = settings?.depositPercentage || 25;
  const siteTitle = settings?.siteTitle || 'Plas Hafod Cottage Management System';

  return `NEW BOOKING INQUIRY: ${data.propertyTitle}

Guest Details:
- Name: ${data.guestName}
- Email: ${data.guestEmail}
- Phone: ${data.guestPhone}

Stay Details:
- Property: ${data.propertyTitle}
- Check-in: ${formatDateUK(data.checkIn)}
- Check-out: ${formatDateUK(data.checkOut)}
- Duration: ${data.totalNights} Nights
- Guests: ${data.adults} Adults, ${data.children} Children, ${data.pets} Pets
${data.appliedDiscountName ? `- Special Offer: ${data.appliedDiscountName} (-£${data.discountAmount || 0})\n` : ''}- Total Price: £${data.totalPrice}
- Deposit to Collect (${depositPct}%): £${data.depositAmount}
- Remaining Balance: £${data.balanceDue}
${data.notes ? `- Guest Notes: "${data.notes}"\n` : ''}
Reference ID: ${data.inquiryId || 'N/A'}
Dashboard: https://plashafodcottage.co.uk/studio

${siteTitle}`;
}

/**
 * Plain Text Alternative: Owner Contact Alert
 */
export function generateOwnerContactAlertText(
  data: ContactEmailData,
  settings?: Partial<SiteSettings>
): string {
  const siteTitle = settings?.siteTitle || 'Plas Hafod Cottage Management System';

  return `NEW WEBSITE CONTACT MESSAGE

From: ${data.name} (${data.email})
${data.phone ? `Phone: ${data.phone}\n` : ''}${data.subject ? `Subject: ${data.subject}\n` : ''}
Message:
${data.message}

Reply directly to this email to respond to ${data.name}.
Inbox: https://plashafodcottage.co.uk/studio/structure/negeseuon-messages-inbox;contactMessage

${siteTitle}`;
}

/**
 * Plain Text Alternative: Visitor Contact Auto-Reply
 */
export function generateVisitorContactAutoReplyText(
  data: ContactEmailData,
  settings?: Partial<SiteSettings>,
  isCymraeg: boolean = false
): string {
  const hosts = settings?.hostNames || 'Siwsan & Neil';
  const siteTitle = settings?.siteTitle || 'Plas Hafod Cottage & Bryn Bugeiliaid Bach';
  const phone = settings?.phone || '+44 (0) 1286 880 000';
  const address =
    (isCymraeg && settings?.addressCy ? settings.addressCy : settings?.address) ||
    'Plas Hafod Cottage, Nebo, Caernarfon, Gwynedd, LL54 6EE';

  const rawReply = isCymraeg
    ? (settings?.guestContactEmailReplyCy ||
       'Diolch am gysylltu â ni. Rydym wedi derbyn eich neges a byddwn yn ymateb cyn pen 24 awr.')
    : (settings?.guestContactEmailReplyEn ||
       'Thank you for getting in touch with us. We have received your inquiry and will respond to you within 24 hours.');

  const dearText = isCymraeg ? 'Annwyl' : 'Dear';

  return `${dearText} ${data.name},

${rawReply}

${isCymraeg ? 'Eich Neges:' : 'Your Message:'}
"${data.message}"

Warm regards,
${hosts}
${siteTitle}
${address} • Tel: ${phone}
Website: https://plashafodcottage.co.uk
Email: info@plashafodcottage.co.uk`;
}

/**
 * 5. Guest Deposit Request: Premium BACS Payment Invitation
 */
export function generateDepositRequestHtml(
  data: DepositRequestEmailData,
  settings?: Partial<SiteSettings>
): string {
  const holdHours = data.holdHours || settings?.depositHoldHours || 48;
  const hosts = data.hostNames || settings?.hostNames || 'Siwsan & Neil';
  const phone = data.contactPhone || settings?.emergencyHostPhone || settings?.phone || '+44 (0) 1286 880 000';
  const siteTitle = settings?.siteTitle || 'Plas Hafod Cottage & Bryn Bugeiliaid Bach';
  const checkInTime = settings?.checkInTime || '4:00 PM';
  const checkOutTime = settings?.checkOutTime || '10:00 AM';
  const depositPct = settings?.depositPercentage || 25;
  const address = settings?.address || 'Plas Hafod Cottage, Nebo, Caernarfon, Gwynedd, LL54 6EE';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Deposit Request – ${data.propertyTitle}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f6f4; color: #2d3748; margin: 0; padding: 24px 12px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.06); }
    .header { background: #323149; padding: 32px 24px 24px; text-align: center; }
    .status-badge { display: inline-block; background: #efda07; color: #1e1b2e; font-weight: 800; font-size: 11px; padding: 6px 14px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 14px; }
    .content { padding: 30px 24px; }
    .hero-callout { background: #fefce8; border: 2px solid #facc15; border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center; }
    .bank-box { background: #f8fafc; border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px; margin: 24px 0; }
    .bank-table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    .bank-table td { padding: 8px 6px; font-size: 14px; border-bottom: 1px solid #e2e8f0; }
    .bank-table td.label { width: 40%; color: #64748b; font-weight: 600; }
    .bank-table td.value { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-weight: 700; color: #0f172a; font-size: 15px; }
    .ref-badge { display: inline-block; background: #323149; color: #efda07; padding: 5px 12px; border-radius: 6px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 16px; font-weight: 800; letter-spacing: 1px; }
    .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .table th, .table td { padding: 11px 14px; text-align: left; border-bottom: 1px solid #edf2f7; font-size: 14px; }
    .table th { background: #fbfbfd; color: #64748b; font-weight: 600; width: 42%; }
    .footer { padding: 24px 20px; text-align: center; font-size: 12px; color: #94a3b8; background: #fafaf9; border-top: 1px solid #f1f5f9; line-height: 1.6; }

    @media (prefers-color-scheme: dark) {
      body { background-color: #121019 !important; color: #e2e8f0 !important; }
      .card { background-color: #1c1829 !important; border-color: #2e2842 !important; color: #f1f5f9 !important; }
      .header { background-color: #241f35 !important; }
      .content { color: #e2e8f0 !important; }
      .hero-callout { background-color: #262038 !important; border-color: #efda07 !important; color: #f1f5f9 !important; }
      .bank-box { background-color: #201a30 !important; border-color: #3b3252 !important; color: #f1f5f9 !important; }
      .bank-table td { border-color: #2e2842 !important; }
      .bank-table td.label { color: #94a3b8 !important; }
      .bank-table td.value { color: #f1f5f9 !important; }
      .table th { background-color: #262038 !important; color: #cbd5e1 !important; border-color: #383152 !important; }
      .table td { border-color: #2e2842 !important; color: #e2e8f0 !important; }
      .footer { background-color: #151221 !important; border-color: #2e2842 !important; color: #64748b !important; }
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div style="margin-bottom: 14px;">
        <img src="${LOGO_WHITE_URL}" alt="Plas Hafod Cottage" width="165" style="display: inline-block; max-width: 165px; height: auto;" border="0" />
      </div>
      <span class="status-badge">Provisional Booking Accepted</span>
      <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">Deposit Request – Secure Your Stay</h1>
      <p style="margin: 6px 0 0; font-size: 14px; color: #cbbaff;">${data.propertyTitle}</p>
    </div>

    <div class="content">
      <p style="font-size: 16px; margin-top: 0; color: #1e293b;">Dear <strong>${data.guestName}</strong>,</p>

      <p style="font-size: 14px; line-height: 1.6; color: #475569;">
        Great news! We have reviewed your reservation inquiry for <strong>${data.propertyTitle}</strong> and are delighted to provisionally hold your dates:
        <strong>${formatDateUK(data.checkIn)} to ${formatDateUK(data.checkOut)}</strong> (${data.totalNights} nights).
      </p>

      ${data.customHostNote ? `
      <div style="background: #f0fdf4; border-left: 4px solid #22c55e; border-radius: 6px; padding: 14px 16px; margin: 18px 0; font-size: 14px; color: #166534; line-height: 1.55;">
        <strong>Note from your hosts (${hosts}):</strong><br>
        "${data.customHostNote}"
      </div>
      ` : ''}

      <!-- Deposit Callout -->
      <div class="hero-callout">
        <div style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #854d0e; font-weight: 700;">Deposit Required to Lock in Reservation</div>
        <div style="font-size: 32px; font-weight: 800; color: #1e1b2e; margin: 6px 0;">£${data.depositAmount}</div>
        <div style="font-size: 13px; color: #713f12; line-height: 1.5;">
          Please transfer within <strong>${holdHours} hours</strong>${data.depositDeadline ? ` (by <strong>${data.depositDeadline}</strong>)` : ''} to secure these dates.
        </div>
      </div>

      <!-- Bank Details Box -->
      <div class="bank-box">
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
          <strong style="font-size: 15px; color: #0f172a;">🏦 Bank Transfer (BACS) Details</strong>
          <span style="font-size: 11px; background: #e2e8f0; padding: 3px 8px; border-radius: 12px; font-weight: 600; color: #475569;">UK Bank Transfer</span>
        </div>

        <table class="bank-table">
          <tr>
            <td class="label">Bank Name</td>
            <td class="value">${data.bankName}</td>
          </tr>
          <tr>
            <td class="label">Account Name</td>
            <td class="value">${data.bankAccountName}</td>
          </tr>
          <tr>
            <td class="label">Sort Code</td>
            <td class="value">${data.bankSortCode}</td>
          </tr>
          <tr>
            <td class="label">Account Number</td>
            <td class="value">${data.bankAccountNumber}</td>
          </tr>
          ${data.bankIban ? `
          <tr>
            <td class="label">IBAN (International)</td>
            <td class="value">${data.bankIban}</td>
          </tr>
          ` : ''}
          ${data.bankBic ? `
          <tr>
            <td class="label">BIC / SWIFT</td>
            <td class="value">${data.bankBic}</td>
          </tr>
          ` : ''}
          <tr>
            <td class="label" style="vertical-align: middle;">Payment Reference</td>
            <td class="value" style="padding-top: 10px; padding-bottom: 10px;">
              <span class="ref-badge">${data.paymentReference}</span>
            </td>
          </tr>
        </table>

        <div style="margin-top: 14px; font-size: 12px; color: #64748b; line-height: 1.5;">
          ⚠️ <strong>Crucial:</strong> Please quote reference <strong style="color: #0f172a;">${data.paymentReference}</strong> with your bank transfer so we can instantly identify your payment.
        </div>
      </div>

      <!-- Booking Summary Table -->
      <h3 style="font-size: 16px; margin: 26px 0 10px; color: #0f172a;">Stay &amp; Pricing Breakdown</h3>
      <table class="table">
        <tr><th>Property</th><td><strong>${data.propertyTitle}</strong></td></tr>
        <tr><th>Check-in</th><td>${formatDateUK(data.checkIn)} (from ${checkInTime})</td></tr>
        <tr><th>Check-out</th><td>${formatDateUK(data.checkOut)} (by ${checkOutTime})</td></tr>
        <tr><th>Duration</th><td>${data.totalNights} Nights</td></tr>
        <tr><th>Guests</th><td>${data.adults} Adults, ${data.children} Children, ${data.pets} Pets</td></tr>
        ${data.appliedDiscountName ? `<tr><th>Applied Discount</th><td><span style="color: #15803d; font-weight: 600;">${data.appliedDiscountName} (-£${data.discountAmount})</span></td></tr>` : ''}
        <tr><th>Total Stay Price</th><td><strong>£${data.totalPrice}</strong></td></tr>
        <tr style="background: #fefce8;"><th>Deposit Required Now (${depositPct}%)</th><td><strong style="color: #854d0e; font-size: 15px;">£${data.depositAmount}</strong></td></tr>
        <tr><th>Remaining Balance</th><td>£${data.balanceDue} (due prior to arrival)</td></tr>
      </table>

      <!-- What happens next -->
      <div style="background: #f8fafc; border-radius: 8px; padding: 16px 18px; margin: 22px 0; font-size: 13px; line-height: 1.6; color: #475569;">
        <strong style="color: #0f172a; font-size: 14px; display: block; margin-bottom: 6px;">What happens after you pay?</strong>
        1. Once your transfer of <strong>£${data.depositAmount}</strong> clears, we will immediately send your official <strong>Booking Confirmation</strong>.<br>
        2. Four weeks prior to your arrival, we will send your full <strong>Welcome Pack, key safe code, and driving directions</strong>.<br>
        3. The remaining balance of <strong>£${data.balanceDue}</strong> will be due prior to arrival.
      </div>

      <p style="font-size: 13px; color: #64748b; line-height: 1.6;">
        If you have any questions or wish to discuss anything, please reply directly to this email or call us on <strong>${phone}</strong>.
      </p>

      <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #edf2f7;">
        <p style="font-size: 14px; margin: 0 0 4px; color: #1e293b;">
          Warmest regards,<br>
          <strong>${hosts}</strong><br>
          <span style="color: #64748b; font-size: 13px;">${siteTitle}</span>
        </p>
        <span style="font-size: 12px; color: #64748b;">${address} • Eryri / Snowdonia National Park</span>
      </div>
    </div>

    <div class="footer">
      ${siteTitle}<br>
      Website: <a href="https://plashafodcottage.co.uk" style="color: #4f46e5; text-decoration: none;">plashafodcottage.co.uk</a> • Email: <a href="mailto:info@plashafodcottage.co.uk" style="color: #4f46e5; text-decoration: none;">info@plashafodcottage.co.uk</a>
    </div>
  </div>
</body>
</html>
`;
}

/**
 * Plain Text Alternative: Guest Deposit Request
 */
export function generateDepositRequestText(
  data: DepositRequestEmailData,
  settings?: Partial<SiteSettings>
): string {
  const holdHours = data.holdHours || settings?.depositHoldHours || 48;
  const hosts = data.hostNames || settings?.hostNames || 'Siwsan & Neil';
  const phone = data.contactPhone || settings?.emergencyHostPhone || settings?.phone || '+44 (0) 1286 880 000';
  const checkInTime = settings?.checkInTime || '4:00 PM';
  const checkOutTime = settings?.checkOutTime || '10:00 AM';
  const depositPct = settings?.depositPercentage || 25;
  const siteTitle = settings?.siteTitle || 'Plas Hafod Cottage & Bryn Bugeiliaid Bach';
  const address = settings?.address || 'Plas Hafod Cottage, Nebo, Caernarfon, Gwynedd, LL54 6EE';

  return `PROVISIONAL RESERVATION ACCEPTED: ${data.propertyTitle}

Dear ${data.guestName},

Great news! We have reviewed your reservation inquiry for ${data.propertyTitle} and are delighted to provisionally hold your dates: ${formatDateUK(data.checkIn)} to ${formatDateUK(data.checkOut)} (${data.totalNights} nights).

${data.customHostNote ? `NOTE FROM YOUR HOSTS:\n"${data.customHostNote}"\n\n` : ''}DEPOSIT REQUIRED TO SECURE RESERVATION:
Amount: £${data.depositAmount} (${depositPct}% of total stay £${data.totalPrice})
Payment Deadline: Within ${holdHours} hours${data.depositDeadline ? ` (${data.depositDeadline})` : ''}

BANK TRANSFER (BACS) DETAILS:
- Bank Name: ${data.bankName}
- Account Name: ${data.bankAccountName}
- Sort Code: ${data.bankSortCode}
- Account Number: ${data.bankAccountNumber}
${data.bankIban ? `- IBAN: ${data.bankIban}\n` : ''}${data.bankBic ? `- BIC/SWIFT: ${data.bankBic}\n` : ''}- PAYMENT REFERENCE: ${data.paymentReference}

IMPORTANT: Please quote reference "${data.paymentReference}" on your bank transfer so we can instantly match your payment.

BOOKING SUMMARY:
- Property: ${data.propertyTitle}
- Check-in: ${formatDateUK(data.checkIn)} (from ${checkInTime})
- Check-out: ${formatDateUK(data.checkOut)} (by ${checkOutTime})
- Duration: ${data.totalNights} Nights
- Party: ${data.adults} Adults, ${data.children} Children, ${data.pets} Pets
${data.appliedDiscountName ? `- Discount: ${data.appliedDiscountName} (-£${data.discountAmount})\n` : ''}- Total Stay: £${data.totalPrice}
- Deposit Due Now: £${data.depositAmount}
- Remaining Balance: £${data.balanceDue}

WHAT HAPPENS NEXT:
1. Once your deposit transfer clears, we will send your official Booking Confirmation.
2. Four weeks prior to arrival, you will receive full arrival directions and key collection info.
3. If you have questions, reply directly to this email or call ${phone}.

Warmest regards,
${hosts}
${siteTitle}
${address} • Eryri / Snowdonia National Park
Website: https://plashafodcottage.co.uk
Email: info@plashafodcottage.co.uk`;
}


