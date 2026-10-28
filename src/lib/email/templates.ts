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

export interface CheckInGuideEmailData {
  propertyTitle: string;
  propertyId?: 'plas-hafod' | 'bryn-bugeiliaid-bach';
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkIn: string;
  checkOut: string;
  totalNights: number;
  adults?: number;
  children?: number;
  pets?: number;
  keySafeCode: string;
  wifiSsid?: string;
  wifiPassword?: string;
  directions?: string;
  wasteInstructions?: string;
  checkInTime?: string;
  checkOutTime?: string;
  emergencyPhone?: string;
  hostNames?: string;
  inquiryId?: string;
}

export interface BalanceReminderEmailData {
  propertyTitle: string;
  propertyId?: 'plas-hafod' | 'bryn-bugeiliaid-bach';
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkIn: string;
  checkOut: string;
  totalNights: number;
  totalPrice: number;
  depositPaid: number;
  balanceDue: number;
  paymentReference: string;
  bankAccountName: string;
  bankName: string;
  bankSortCode: string;
  bankAccountNumber: string;
  bankIban?: string;
  bankBic?: string;
  dueDate?: string;
  emergencyPhone?: string;
  hostNames?: string;
  inquiryId?: string;
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
 * 2. Guest Confirmation (Pending Reservation): Light, Welcoming Holiday Template with Colour Logo (+ Dark Mode swap)
 */
export function generateGuestConfirmationHtml(
  data: BookingEmailData,
  settings?: Partial<SiteSettings>,
  isCymraeg: boolean = false
): string {
  const hosts = settings?.hostNames || 'Siwsan and Neil';
  const siteTitle = settings?.siteTitle || 'Bwthyn Plas Hafod Cottage & Bryn Bugeiliaid Bach';
  const phone = settings?.emergencyHostPhone || settings?.phone || 'Siwsan: 07748 635273 / Neil: 07785 522890';
  const checkInTime = settings?.checkInTime || '15:00 (3:00 PM)';
  const checkOutTime = settings?.checkOutTime || '10:00 (10:00 AM)';
  const depositPct = settings?.depositPercentage || 25;
  const address =
    (isCymraeg && settings?.addressCy ? settings.addressCy : settings?.address) ||
    'Bwthyn Plas Hafod, Nebo, Gwynedd, LL54 6EB';

  const rawWelcome = isCymraeg
    ? (settings?.guestBookingEmailWelcomeCy ||
       'Roedd eich cais archebu ar gyfer {property} yn llwyddiannus ac mae bellach yn aros am gadarnhad. Byddwn yn anfon cadarnhad o’r archeb atoch o fewn 24-48 awr.')
    : (settings?.guestBookingEmailWelcomeEn ||
       'Your booking for {property} was successful and is now pending. We will send you a confirmation of the booking within 24-48 hours.');
  const resolvedWelcome = rawWelcome.replace('{property}', `<strong>${data.propertyTitle}</strong>`);

  const resolvedNextSteps = isCymraeg
    ? (settings?.guestBookingEmailNextStepsCy ||
       'Byddwn yn adolygu eich dyddiadau gofynnol ac yn cysylltu â chi’n fuan gyda chadarnhad a manylion talu blaendal diogel i gadarnhau eich arhosiad.')
    : (settings?.guestBookingEmailNextStepsEn ||
       'We will review your requested dates and contact you shortly with confirmation and secure deposit payment details to lock in your stay.');

  const dearText = isCymraeg ? 'Helo' : 'Hi';
  const whatNextHeading = isCymraeg ? 'Beth sy’n digwydd nesaf?' : 'What happens next?';
  const summaryHeading = isCymraeg ? 'Crynodeb o’ch Archeb' : 'Your Booking Summary';

  const houseIconUrl = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/803819_787671/House.png';
  const mapIconUrl = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/803819_787671/Map.png';
  const calendarIconUrl = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/803819_787671/Calendar.png';
  const markerIconUrl = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/803819_787671/Calendar_with_marker.png';
  const cardIconUrl = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/803819_787671/Credit%20Card.png';

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
      
      <p style="font-size: 15px; line-height: 1.6; color: #334155;">
        ${resolvedWelcome}
      </p>

      <!-- Visual Summary Rows matching original Pending Reservation template -->
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5; margin: 20px 0;">
        <tr>
          <td width="68" style="padding: 14px 12px 14px 0; vertical-align: middle; text-align: center;">
            <img src="${houseIconUrl}" alt="Cottage" width="48" style="display: inline-block; height: auto; border: 0;" />
          </td>
          <td style="padding: 14px 0; vertical-align: middle;">
            <div style="font-size: 13px; font-weight: 800; color: #0f172a; text-transform: uppercase;">${isCymraeg ? 'BWTHYN A ARCHEBWYD' : 'COTTAGE BOOKED'}</div>
            <div style="font-size: 14px; color: #334155; margin-top: 3px; font-weight: 600;">${data.propertyTitle}</div>
          </td>
        </tr>
        <tr><td colspan="2" style="border-top: 1px solid #e5e5e5; padding: 0;"></td></tr>
        <tr>
          <td width="68" style="padding: 14px 12px 14px 0; vertical-align: middle; text-align: center;">
            <img src="${mapIconUrl}" alt="Address" width="38" style="display: inline-block; height: auto; border: 0;" />
          </td>
          <td style="padding: 14px 0; vertical-align: middle;">
            <div style="font-size: 13px; font-weight: 800; color: #0f172a; text-transform: uppercase;">${isCymraeg ? 'CYFEIRIAD' : 'ADDRESS'}</div>
            <div style="font-size: 14px; color: #334155; margin-top: 3px;">${address}</div>
          </td>
        </tr>
        <tr><td colspan="2" style="border-top: 1px solid #e5e5e5; padding: 0;"></td></tr>
        <tr>
          <td width="68" style="padding: 14px 12px 14px 0; vertical-align: middle; text-align: center;">
            <img src="${calendarIconUrl}" alt="Dates" width="46" style="display: inline-block; height: auto; border: 0;" />
          </td>
          <td style="padding: 14px 0; vertical-align: middle;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td width="50%">
                  <div style="font-size: 13px; font-weight: 800; color: #0f172a; text-transform: uppercase;">${isCymraeg ? 'CYRRAEDD' : 'ARRIVAL'}</div>
                  <div style="font-size: 14px; color: #475569; margin-top: 3px; font-style: italic;">${formatDateUK(data.checkIn)}</div>
                </td>
                <td width="50%">
                  <div style="font-size: 13px; font-weight: 800; color: #0f172a; text-transform: uppercase;">${isCymraeg ? 'GADAEL' : 'DEPARTURE'}</div>
                  <div style="font-size: 14px; color: #475569; margin-top: 3px; font-style: italic;">${formatDateUK(data.checkOut)}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr><td colspan="2" style="border-top: 1px solid #e5e5e5; padding: 0;"></td></tr>
        <tr>
          <td width="68" style="padding: 14px 12px 14px 0; vertical-align: middle; text-align: center;">
            <img src="${markerIconUrl}" alt="Times" width="42" style="display: inline-block; height: auto; border: 0;" />
          </td>
          <td style="padding: 14px 0; vertical-align: middle;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td width="50%">
                  <div style="font-size: 13px; font-weight: 800; color: #0f172a; text-transform: uppercase;">CHECK-IN</div>
                  <div style="font-size: 14px; color: #475569; margin-top: 3px; font-style: italic;">15:00 (${checkInTime})</div>
                </td>
                <td width="50%">
                  <div style="font-size: 13px; font-weight: 800; color: #0f172a; text-transform: uppercase;">CHECK-OUT</div>
                  <div style="font-size: 14px; color: #475569; margin-top: 3px; font-style: italic;">10:00 (${checkOutTime})</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr><td colspan="2" style="border-top: 1px solid #e5e5e5; padding: 0;"></td></tr>
        <tr>
          <td width="68" style="padding: 14px 12px 14px 0; vertical-align: middle; text-align: center;">
            <img src="${cardIconUrl}" alt="Price" width="32" style="display: inline-block; height: auto; border: 0;" />
          </td>
          <td style="padding: 14px 0; vertical-align: middle;">
            <div style="font-size: 13px; font-weight: 800; color: #0f172a; text-transform: uppercase;">${isCymraeg ? 'PRIS' : 'PRICE'}</div>
            <div style="font-size: 15px; color: #0f172a; margin-top: 3px; font-weight: 700; font-style: italic;">£${data.totalPrice} (${data.totalNights} ${isCymraeg ? 'Noson' : 'Nights'})</div>
          </td>
        </tr>
      </table>

      <div class="highlight-box">
        <strong style="color: #0f172a;">${whatNextHeading}</strong><br>
        ${resolvedNextSteps}
      </div>

      <p style="font-size: 13px; color: #64748b; line-height: 1.6;">
        If you have any queries regarding your booking please contact us on <a href="mailto:info@plashafodcottage.co.uk" style="color: #4f46e5;">info@plashafodcottage.co.uk</a> or <strong>${phone}</strong>.
      </p>

      <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #edf2f7;">
        <p style="font-size: 14px; margin: 0 0 4px; color: #1e293b;">
          <strong>Gyda Diolch / With Thanks</strong><br><br>
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
    'Plas Hafod Cottage, Nebo, Penygroes, Caernarfon, Gwynedd, LL54 6EB';

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
  const phone = settings?.emergencyHostPhone || settings?.phone || 'Siwsan: 07748 635273 / Neil: 07785 522890';
  const checkInTime = settings?.checkInTime || '15:00';
  const checkOutTime = settings?.checkOutTime || '10:00';
  const depositPct = settings?.depositPercentage || 25;
  const address =
    (isCymraeg && settings?.addressCy ? settings.addressCy : settings?.address) ||
    'Bwthyn Plas Hafod, Nebo, Gwynedd, LL54 6EB';

  const rawWelcome = isCymraeg
    ? (settings?.guestBookingEmailWelcomeCy ||
       'Roedd eich cais archebu ar gyfer {property} yn llwyddiannus ac mae bellach yn aros am gadarnhad. Byddwn yn anfon cadarnhad o’r archeb atoch o fewn 24–48 awr.')
    : (settings?.guestBookingEmailWelcomeEn ||
       'Your booking for {property} was successful and is now pending. We will send you a confirmation of the booking within 24-48 hours.');
  const resolvedWelcome = rawWelcome.replace('{property}', data.propertyTitle);

  const rawNextSteps = isCymraeg
    ? (settings?.guestBookingEmailNextStepsCy ||
       'Byddwn yn adolygu eich dyddiadau gofynnol ac yn cysylltu â chi o fewn 24–48 awr gyda chadarnhad a manylion talu blaendal i gadarnhau eich arhosiad.')
    : (settings?.guestBookingEmailNextStepsEn ||
       'We will review your requested dates and send you a confirmation with deposit payment details within 24–48 hours to secure your stay.');

  const dearText = isCymraeg ? 'Helo' : 'Hi';
  const whatNextHeading = isCymraeg ? 'BETH SY’N DIGWYDD NESAF:' : 'WHAT HAPPENS NEXT:';
  const summaryHeading = isCymraeg ? 'MANYLION EICH ARCHEB:' : 'YOUR BOOKING DETAILS:';

  return `Croeso / Welcome to ${data.propertyTitle}

${dearText} ${data.guestName},

${resolvedWelcome}

${whatNextHeading}
${rawNextSteps}

${summaryHeading}
- COTTAGE BOOKED: ${data.propertyTitle}
- ADDRESS: ${address}
- ARRIVAL: ${formatDateUK(data.checkIn)} (Check-in: ${checkInTime})
- DEPARTURE: ${formatDateUK(data.checkOut)} (Check-out: ${checkOutTime})
- Duration: ${data.totalNights} Nights
- Guests: ${data.adults} Adults, ${data.children} Children, ${data.pets} Pets
${data.appliedDiscountName ? `- Special Offer: ${data.appliedDiscountName} (-£${data.discountAmount || 0})\n` : ''}- PRICE: £${data.totalPrice}
- Deposit to Secure (${depositPct}%): £${data.depositAmount}
- Remaining Balance: £${data.balanceDue}
${data.notes ? `- Notes: "${data.notes}"\n` : ''}
If you have any questions in the meantime or wish to modify your dates, simply reply directly to this email or call us on ${phone}.

Gyda Diolch / With Thanks
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
    'Plas Hafod Cottage, Nebo, Penygroes, Caernarfon, Gwynedd, LL54 6EB';

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
  const holdHours = data.holdHours || settings?.depositHoldHours || 24;
  const hosts = data.hostNames || settings?.hostNames || 'Siwsan & Neil';
  const phone = data.contactPhone || settings?.emergencyHostPhone || settings?.phone || 'Siwsan: 07748 635273 / Neil: 07785 522890';
  const siteTitle = settings?.siteTitle || 'Plas Hafod Cottage & Bryn Bugeiliaid Bach';
  const checkInTime = settings?.checkInTime || '15:00';
  const checkOutTime = settings?.checkOutTime || '10:00';
  const depositPct = settings?.depositPercentage || 25;
  const address = settings?.address || 'Bwthyn Plas Hafod, Nebo, Gwynedd, LL54 6EB';

  const houseIconUrl = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/803819_787671/House.png';
  const calendarIconUrl = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/803819_787671/Calendar.png';
  const creditCardIconUrl = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/803819_787671/Credit%20Card.png';

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
    body { font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f6f4; color: #2d3748; margin: 0; padding: 24px 12px; }
    .card { max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.06); }
    .header { background: #323149; padding: 32px 24px 24px; text-align: center; }
    .status-badge { display: inline-block; background: #efda07; color: #1e1b2e; font-weight: 800; font-size: 11px; padding: 6px 14px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 14px; }
    .content { padding: 30px 24px; }
    .summary-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; margin: 16px 0; }
    .bank-box { background: #fefce8; border: 2px solid #facc15; border-radius: 12px; padding: 20px; margin: 20px 0; }
    .bank-table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    .bank-table td { padding: 8px 6px; font-size: 14px; border-bottom: 1px solid #fde047; }
    .bank-table td.label { width: 40%; color: #713f12; font-weight: 600; }
    .bank-table td.value { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-weight: 700; color: #1e1b2e; font-size: 15px; }
    .ref-badge { display: inline-block; background: #323149; color: #efda07; padding: 5px 12px; border-radius: 6px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 16px; font-weight: 800; letter-spacing: 1px; }
    .footer { padding: 24px 20px; text-align: center; font-size: 12px; color: #cbd5e1; background: #323149; border-top: 1px solid #241f35; line-height: 1.6; }

    @media (prefers-color-scheme: dark) {
      body { background-color: #121019 !important; color: #e2e8f0 !important; }
      .card { background-color: #1c1829 !important; border-color: #2e2842 !important; color: #f1f5f9 !important; }
      .header { background-color: #241f35 !important; }
      .content { color: #e2e8f0 !important; }
      .summary-card { background-color: #201a30 !important; border-color: #3b3252 !important; color: #f1f5f9 !important; }
      .bank-box { background-color: #262038 !important; border-color: #efda07 !important; color: #f1f5f9 !important; }
      .bank-table td { border-color: #3b3252 !important; }
      .bank-table td.label { color: #cbd5e1 !important; }
      .bank-table td.value { color: #f1f5f9 !important; }
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div style="margin-bottom: 14px;">
        <img src="${LOGO_WHITE_URL}" alt="Plas Hafod Cottage" width="165" style="display: inline-block; max-width: 165px; height: auto;" border="0" />
      </div>
      <span class="status-badge">Dates Available – Deposit Request</span>
      <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">Deposit Request – ${data.propertyTitle}</h1>
      <p style="margin: 6px 0 0; font-size: 14px; color: #cbbaff;">Eryri / Snowdonia National Park</p>
    </div>

    <div class="content">
      <p style="font-size: 16px; margin-top: 0; color: #1e293b;">Hi <strong>${data.guestName}</strong>,</p>

      <p style="font-size: 15px; line-height: 1.65; color: #334155;">
        Thank you for your interest in <strong>${data.propertyTitle}</strong>. Dates you requested are available and to secure your stay a deposit of <strong>£${data.depositAmount}</strong> is payable within <strong>${holdHours} hours</strong> of this e-mail${data.depositDeadline ? ` (by <strong>${data.depositDeadline}</strong>)` : ''}. Details of the amount and payment method are below.
      </p>

      ${data.customHostNote ? `
      <div style="background: #f0fdf4; border-left: 4px solid #22c55e; border-radius: 6px; padding: 14px 16px; margin: 18px 0; font-size: 14px; color: #166534; line-height: 1.55;">
        <strong>Note from your hosts (${hosts}):</strong><br>
        "${data.customHostNote}"
      </div>
      ` : ''}

      <!-- Cottage Booked -->
      <div class="summary-card">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="52" valign="top" style="padding-right: 14px;">
              <img src="${houseIconUrl}" width="42" height="42" alt="Cottage" style="display: block;" />
            </td>
            <td valign="middle">
              <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #323149;">COTTAGE BOOKED</div>
              <div style="font-size: 16px; font-weight: 700; color: #0f172a; margin-top: 4px;">${data.propertyTitle}</div>
              <div style="font-size: 13px; color: #64748b; margin-top: 2px;">${data.adults} Adults, ${data.children} Children, ${data.pets} Pets • ${data.totalNights} Nights</div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Arrival & Departure -->
      <div class="summary-card">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="50%" valign="top" style="padding-right: 10px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="46" valign="top" style="padding-right: 10px;">
                    <img src="${calendarIconUrl}" width="38" height="38" alt="Arrival" style="display: block;" />
                  </td>
                  <td valign="middle">
                    <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #323149;">ARRIVAL</div>
                    <div style="font-size: 15px; font-weight: 700; color: #0f172a; margin-top: 2px;">${formatDateUK(data.checkIn)}</div>
                    <div style="font-size: 12px; color: #64748b;">Check-in: ${checkInTime}</div>
                  </td>
                </tr>
              </table>
            </td>
            <td width="50%" valign="top" style="padding-left: 10px; border-left: 1px solid #e2e8f0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="46" valign="top" style="padding-right: 10px;">
                    <img src="${calendarIconUrl}" width="38" height="38" alt="Departure" style="display: block;" />
                  </td>
                  <td valign="middle">
                    <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #323149;">DEPARTURE</div>
                    <div style="font-size: 15px; font-weight: 700; color: #0f172a; margin-top: 2px;">${formatDateUK(data.checkOut)}</div>
                    <div style="font-size: 12px; color: #64748b;">Check-out: ${checkOutTime}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>

      <!-- Cost Breakdown & Bank Details -->
      <div class="bank-box">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px;">
          <tr>
            <td width="52" valign="top" style="padding-right: 14px;">
              <img src="${creditCardIconUrl}" width="42" height="42" alt="Cost Breakdown" style="display: block;" />
            </td>
            <td valign="middle">
              <div style="font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #1e1b2e;">COST BREAKDOWN</div>
              <div style="font-size: 14px; color: #334155; margin-top: 6px; line-height: 1.7;">
                ${data.appliedDiscountName ? `<div>Special Offer: <strong style="color: #15803d;">${data.appliedDiscountName} (-£${data.discountAmount})</strong></div>` : ''}
                <div>Total Price - <strong>£${data.totalPrice}</strong></div>
                <div>Deposit (${depositPct}%) - <strong style="font-size: 16px; color: #1e1b2e;">£${data.depositAmount}</strong></div>
                <div>Remaining Balance - <strong>£${data.balanceDue}</strong> (due 60 days prior to stay)</div>
                <div>Booking Id - <strong>${data.paymentReference}</strong></div>
              </div>
            </td>
          </tr>
        </table>

        <p style="font-size: 14px; color: #1e293b; line-height: 1.6; margin: 14px 0 10px;">
          Please make the payment of <strong>£${data.depositAmount}</strong> via direct bank transfer to the details below and include your <strong>Booking Id</strong> as the Reference:
        </p>

        <table class="bank-table">
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
          ${data.bankName ? `
          <tr>
            <td class="label">Bank Name</td>
            <td class="value">${data.bankName}</td>
          </tr>
          ` : ''}
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
            <td class="label" style="vertical-align: middle;">Booking Id / Reference</td>
            <td class="value" style="padding-top: 10px; padding-bottom: 10px;">
              <span class="ref-badge">${data.paymentReference}</span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Important Policy Notice -->
      <p style="font-size: 14px; line-height: 1.65; color: #334155; margin: 20px 0 12px;">
        If payment of the deposit is not received within the time specified then your stay will automatically be removed from the calendar, making the dates available to others, as we assume that you are no longer interested.
      </p>
      <p style="font-size: 14px; line-height: 1.65; color: #334155; margin: 0 0 20px;">
        Safe receipt of your payment will be forwarded within 48hrs of payment.
      </p>

      <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #edf2f7;">
        <p style="font-size: 15px; margin: 0 0 4px; color: #1e293b;">
          Gyda Diolch / With Thanks<br>
          <strong>${hosts}</strong>
        </p>
        <span style="font-size: 12px; color: #64748b;">${address} • Tel: ${phone}</span>
      </div>
    </div>

    <div class="footer">
      <strong style="color: #ffffff;">${siteTitle}</strong><br>
      <a href="https://www.facebook.com/bwthynplashafodcottage/" style="color: #efda07; text-decoration: none;">Facebook</a> •
      <a href="https://www.instagram.com/plashafodcottage/" style="color: #efda07; text-decoration: none;">Instagram</a> •
      <a href="https://plashafodcottage.co.uk" style="color: #efda07; text-decoration: none;">plashafodcottage.co.uk</a><br>
      Email: <a href="mailto:info@plashafodcottage.co.uk" style="color: #cbd5e1; text-decoration: none;">info@plashafodcottage.co.uk</a>
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
  const holdHours = data.holdHours || settings?.depositHoldHours || 24;
  const hosts = data.hostNames || settings?.hostNames || 'Siwsan & Neil';
  const phone = data.contactPhone || settings?.emergencyHostPhone || settings?.phone || 'Siwsan: 07748 635273 / Neil: 07785 522890';
  const checkInTime = settings?.checkInTime || '15:00';
  const checkOutTime = settings?.checkOutTime || '10:00';
  const depositPct = settings?.depositPercentage || 25;
  const siteTitle = settings?.siteTitle || 'Plas Hafod Cottage & Bryn Bugeiliaid Bach';
  const address = settings?.address || 'Bwthyn Plas Hafod, Nebo, Gwynedd, LL54 6EB';

  return `DEPOSIT REQUEST – ${data.propertyTitle}

Hi ${data.guestName},

Thank you for your interest in ${data.propertyTitle}. Dates you requested are available and to secure your stay a deposit of £${data.depositAmount} is payable within ${holdHours} hours of this e-mail${data.depositDeadline ? ` (by ${data.depositDeadline})` : ''}. Details of the amount and payment method are below.

${data.customHostNote ? `NOTE FROM YOUR HOSTS:\n"${data.customHostNote}"\n\n` : ''}COTTAGE BOOKED: ${data.propertyTitle} (${data.adults} Adults, ${data.children} Children, ${data.pets} Pets • ${data.totalNights} Nights)
ARRIVAL: ${formatDateUK(data.checkIn)} (Check-in: ${checkInTime})
DEPARTURE: ${formatDateUK(data.checkOut)} (Check-out: ${checkOutTime})

COST BREAKDOWN:
${data.appliedDiscountName ? `Special Offer - ${data.appliedDiscountName} (-£${data.discountAmount})\n` : ''}Total Price - £${data.totalPrice}
Deposit (${depositPct}%) - £${data.depositAmount}
Remaining Balance - £${data.balanceDue}
Booking Id - ${data.paymentReference}

Please make the payment of £${data.depositAmount} via direct bank transfer to the details below and include your Booking Id as the Reference:

Account Name: ${data.bankAccountName}
Sort Code: ${data.bankSortCode}
Account Number: ${data.bankAccountNumber}
${data.bankName ? `Bank Name: ${data.bankName}\n` : ''}${data.bankIban ? `IBAN: ${data.bankIban}\n` : ''}${data.bankBic ? `BIC/SWIFT: ${data.bankBic}\n` : ''}Booking Id / Reference: ${data.paymentReference}

If payment of the deposit is not received within the time specified then your stay will automatically be removed from the calendar, making the dates available to others, as we assume that you are no longer interested.

Safe receipt of your payment will be forwarded within 48hrs of payment.

Gyda Diolch / With Thanks
${hosts}
${siteTitle}
${address} • Tel: ${phone}
Website: https://plashafodcottage.co.uk
Email: info@plashafodcottage.co.uk`;
}

/**
 * 6. Guest Check-in Guide & Arrival Directions (Sent 30 Days Prior to Stay)
 */
export function generateCheckInGuideHtml(
  data: CheckInGuideEmailData,
  settings?: Partial<SiteSettings>,
  isCymraeg: boolean = false
): string {
  const hosts = data.hostNames || settings?.hostNames || 'Siwsan & Neil';
  const phone = data.emergencyPhone || settings?.emergencyHostPhone || settings?.phone || 'Siwsan: 07748 635273 / Neil: 07785 522890';
  const siteTitle = settings?.siteTitle || 'Plas Hafod Cottage & Bryn Bugeiliaid Bach';
  const checkInTime = data.checkInTime || settings?.checkInTime || '3:00 PM';
  const checkOutTime = data.checkOutTime || settings?.checkOutTime || '10:00 AM';
  const address =
    (isCymraeg && settings?.addressCy ? settings.addressCy : settings?.address) ||
    'Plas Hafod Cottage, Nebo, Penygroes, Caernarfon, Gwynedd, LL54 6EB';

  const isBBB = data.propertyId === 'bryn-bugeiliaid-bach';
  const defaultKeySafe = isBBB ? (settings?.bbbKeySafe || 'Unlocked (Key inside)') : (settings?.plasHafodKeySafe || 'Unlocked (Key inside)');
  const keySafeCode = data.keySafeCode || defaultKeySafe;
  const isUnlockedEntry = /unlocked|key inside/i.test(keySafeCode);
  const wifiSsid = data.wifiSsid || (isBBB ? settings?.bbbWifiSsid || 'BrynBugeiliaid_Guest' : settings?.plasHafodWifiSsid || 'PlasHafod_Guest_5G');
  const wifiPass = data.wifiPassword || (isBBB ? settings?.bbbWifiPassword || 'nantlle-ridge-views' : settings?.plasHafodWifiPassword || 'eryri-mountain-peace');

  const directions = data.directions || (isCymraeg ? settings?.checkInDirectionsCy : settings?.checkInDirectionsEn) ||
    `From the A55 follow the A487 heading towards Porthmadog. Once past Penygroes look for signs to NEBO. Do not turn towards Nebo. Follow the A487 for another mile. You will see a sign for a left turning ahead. Please indicate left and slow down. The turning is a very narrow lane opposite the entrance to TG Cefn Graianog (Quarry) - signage in cream with red writing.\n\nFollow the lane up the hill to the T-junction by the white farm house. Turn left. Follow the lane up the hill and take the first right turning. Follow the steep lane up around the bend approx. 1 mile. The entrance to Bwthyn Plas Hafod Cottage and Bryn Bugeiliaid will be sign posted on your left. Drive across track in the field and you will have reached your destination! There is a designated parking area for your accommodation.\n\nShould you travel through Porthmadog towards Caernarfon you will pass via the Villages of Bryncir and Pant Glas. Just after Pant Glas the signs for TG Cefn Graianog will be on your left and you need to take the narrow lane opposite on your right. Then follow the directions as above.\n\n(Caernarfon to Nebo = Approx. 11 miles / Porthmadog to Nebo = Approx. 11 miles)\nPostcode: LL54 6EB (Note: Sat Nav will take you via Nebo, so please follow the directions above).\nWhat3Words entrance: ///perfume.punctuate.ready`;

  const directionsHtml = directions
    .split(/\n\n+/)
    .map((p) => `<p style="font-size: 13px; line-height: 1.6; color: #475569; margin: 0 0 10px;">${p.replace(/\n/g, '<br>')}</p>`)
    .join('');

  const wasteInfo = data.wasteInstructions || (isCymraeg ? settings?.wasteBinInstructionsCy : settings?.wasteBinInstructionsEn) ||
    'General refuse (black bin) and mixed recycling (blue/green caddies) are located beside the timber woodshed. Collection is early Wednesday morning.';

  const badgeText = isCymraeg ? 'CYFARWYDDIADAU CYRRAEDD A CHROESO' : 'DIRECTIONS & ARRIVAL GUIDE';
  const bannerHeading = isCymraeg ? 'Eich Gwyliau yn Eryri – Cyfarwyddiadau Cyrraedd' : 'Your Holiday in Eryri / Snowdonia – Directions & Arrival Guide';

  const mapImageUrl = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/803819_787671/editor_images/90999d9e-03a6-48a4-bbcb-925672f38dcc.png';
  const googleMapsUrl = "https://www.google.com/maps/place/53%C2%B001'20.7%22N+4%C2%B016'05.2%22W/@53.0224173,-4.2681046,925m/data=!3m2!1e3!4b1!4m5!3m4!1s0x0:0xd26a6eeb24eac6fd!8m2!3d53.0224173!4d-4.2681046?hl=en";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>${bannerHeading} – ${data.propertyTitle}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f6f4; color: #2d3748; margin: 0; padding: 24px 12px; }
    .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.06); }
    .header { background: #323149; padding: 32px 24px 24px; text-align: center; border-bottom: 3px solid #efda07; }
    .status-badge { display: inline-block; background: #efda07; color: #1e1b2e; font-weight: 800; font-size: 11px; padding: 6px 14px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 14px; }
    .content { padding: 30px 24px; }
    .keysafe-card { background: #fefce8; border: 2px solid #facc15; border-radius: 12px; padding: 22px; margin: 22px 0; text-align: center; }
    .key-badge { display: inline-block; background: #1e1b2e; color: #efda07; padding: 10px 24px; border-radius: 8px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 22px; font-weight: 800; letter-spacing: 2px; margin: 10px 0; }
    .info-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; margin: 18px 0; }
    .table { width: 100%; border-collapse: collapse; margin: 16px 0; }
    .table th, .table td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #edf2f7; font-size: 14px; }
    .table th { background: #fbfbfd; color: #64748b; font-weight: 600; width: 38%; }
    .footer { padding: 24px 20px; text-align: center; font-size: 12px; color: #94a3b8; background: #fafaf9; border-top: 1px solid #f1f5f9; line-height: 1.6; }

    @media (prefers-color-scheme: dark) {
      body { background-color: #121019 !important; color: #e2e8f0 !important; }
      .card { background-color: #1c1829 !important; border-color: #2e2842 !important; color: #f1f5f9 !important; }
      .header { background-color: #241f35 !important; }
      .content { color: #e2e8f0 !important; }
      .keysafe-card { background-color: #262038 !important; border-color: #efda07 !important; color: #f1f5f9 !important; }
      .info-card { background-color: #201a30 !important; border-color: #3b3252 !important; color: #f1f5f9 !important; }
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
      <span class="status-badge">${badgeText}</span>
      <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">${bannerHeading}</h1>
      <p style="margin: 6px 0 0; font-size: 14px; color: #cbbaff;">${data.propertyTitle}</p>
    </div>

    <div class="content">
      <p style="font-size: 16px; margin-top: 0; color: #1e293b;">
        ${isCymraeg ? 'Helo' : 'Hi'} <strong>${data.guestName}</strong>,
      </p>

      <p style="font-size: 14px; line-height: 1.6; color: #475569;">
        ${isCymraeg
          ? `Diolch yn fawr am archebu <strong>${data.propertyTitle}</strong> ar gyfer eich gwyliau (${formatDateUK(data.checkIn)} i ${formatDateUK(data.checkOut)}). Rydym yn siŵr y cewch amser gwych yn ystod eich arhosiad yma yn Eryri.`
          : `May we first of all thank you for booking <strong>${data.propertyTitle}</strong> for your holiday (${formatDateUK(data.checkIn)} to ${formatDateUK(data.checkOut)}). We are sure you will have a wonderful time during your stay here in Eryri / Snowdonia.`}
      </p>

      <!-- Stay Times Summary -->
      <table class="table">
        <tr><th>${isCymraeg ? 'Eiddo' : 'Property'}</th><td><strong>${data.propertyTitle}</strong></td></tr>
        <tr><th>${isCymraeg ? 'Dyddiad Cyrraedd' : 'Check-in'}</th><td><strong>${formatDateUK(data.checkIn)}</strong> (${isCymraeg ? 'ar ôl' : 'after'} <strong>${checkInTime}</strong>)</td></tr>
        <tr><th>${isCymraeg ? 'Dyddiad Gadael' : 'Check-out'}</th><td><strong>${formatDateUK(data.checkOut)}</strong> (${isCymraeg ? 'erbyn' : 'by'} <strong>${checkOutTime}</strong> ${isCymraeg ? 'fanbellaf' : 'at the latest'})</td></tr>
        <tr><th>${isCymraeg ? 'Hyd yr Arhosiad' : 'Duration'}</th><td>${data.totalNights} ${isCymraeg ? 'Noson' : 'Nights'}</td></tr>
        <tr><th>${isCymraeg ? 'Cyfeiriad' : 'Address'}</th><td>${address}</td></tr>
        <tr><th>What3Words</th><td><code>///perfume.punctuate.ready</code></td></tr>
      </table>

      <!-- Entry / Key Safe Callout -->
      <div class="keysafe-card">
        <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1.2px; color: #854d0e; font-weight: 700;">
          🔑 ${isCymraeg ? 'MYNEDIAD AC ALLWEDD' : 'ARRIVAL & ENTRY'}
        </div>
        ${isUnlockedEntry
          ? `<div style="font-size: 15px; font-weight: 700; color: #1e1b2e; margin: 10px 0;">
              ${isCymraeg
                ? 'Bydd y Bwthyn wedi’i adael heb ei gloi gyda’r allwedd y tu mewn — gwnewch eich hun yn gartrefol pan fyddwch yn cyrraedd!'
                : 'The Cottage will be left unlocked with the key inside — please make yourself at home on your arrival!'}
             </div>`
          : `<div class="key-badge">${keySafeCode}</div>
             <div style="font-size: 13px; color: #713f12; line-height: 1.5;">
              ${isCymraeg
                ? 'Mae\'r blwch allweddi wedi\'i leoli wrth ymyl y prif ddrws. Pwyswch y côd i ryddhau\'r allweddi.'
                : 'Enter the code above at the key safe beside the entrance door to release the keys.'}
             </div>`
        }
        <div style="font-size: 12px; color: #713f12; line-height: 1.5; margin-top: 8px;">
          ${isCymraeg
            ? 'Byddem yn gwerthfawrogi pe gallech anfon e-bost neu ffonio ni ychydig ddyddiau cyn eich arhosiad i roi syniad o’ch amser cyrraedd amcangyfrifedig.'
            : 'It would be appreciated if you could email or phone us a few days prior to your stay with an indication of your estimated time of arrival.'}
        </div>
      </div>

      <!-- Map & Directions -->
      <div class="info-card">
        <strong style="font-size: 15px; color: #0f172a; display: block; margin-bottom: 8px;">
          🚗 ${isCymraeg ? 'Cyfarwyddiadau Cyrraedd (o’r A487)' : 'Directions (Easiest Route from the A487)'}
        </strong>
        <p style="font-size: 12px; color: #64748b; margin: 0 0 12px;">
          ${isCymraeg
            ? 'Cliciwch ar y map isod i’w agor yn Google Maps:'
            : 'Click on the map image below to open in Google Maps:'}
        </p>
        <div style="text-align: center; margin-bottom: 14px;">
          <a href="${googleMapsUrl}" target="_blank" rel="noopener">
            <img src="${mapImageUrl}" alt="Map to Plas Hafod Cottage" style="display: block; width: 100%; max-width: 540px; height: auto; border-radius: 8px; border: 1px solid #cbd5e1; margin: 0 auto;" />
          </a>
        </div>
        ${directionsHtml}
      </div>

      <!-- WiFi Info Card -->
      <div class="info-card">
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <strong style="font-size: 15px; color: #0f172a;">📶 ${isCymraeg ? 'Rhyngrwyd Di-wifr (WiFi)' : 'Complimentary High-Speed WiFi'}</strong>
        </div>
        <p style="margin: 4px 0 2px; font-size: 13px; color: #475569;">
          <strong>Network (SSID):</strong> <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-family: monospace;">${wifiSsid}</code>
        </p>
        <p style="margin: 2px 0 0; font-size: 13px; color: #475569;">
          <strong>Password:</strong> <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-family: monospace;">${wifiPass}</code>
        </p>
      </div>

      <!-- Bins & Care Info -->
      <div class="info-card">
        <strong style="font-size: 14px; color: #0f172a; display: block; margin-bottom: 4px;">
          ♻️ ${isCymraeg ? 'Ailgylchu a Sbwriel' : 'Waste & Recycling'}
        </strong>
        <p style="font-size: 13px; line-height: 1.55; color: #475569; margin: 0;">
          ${wasteInfo}
        </p>
      </div>

      <p style="font-size: 13px; color: #64748b; line-height: 1.6; margin-top: 24px;">
        ${isCymraeg
          ? `Os oes gennych unrhyw gwestiynau peidiwch ag oedi i ffonio neu anfon e-bost atom: <strong>${phone}</strong>.`
          : `Should you have any questions please don’t hesitate to call or email and we shall endeavour to get back to you as soon as possible. Contact Details: <strong>${phone}</strong>.`}
      </p>

      <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #edf2f7;">
        <p style="font-size: 14px; margin: 0 0 4px; color: #1e293b;">
          <strong>Cofion Cynnes / Warmest Regards</strong><br>
          <strong>${hosts}</strong><br>
          <span style="color: #64748b; font-size: 13px;">${siteTitle}</span>
        </p>
        <span style="font-size: 12px; color: #64748b;">${address} • Eryri / Snowdonia National Park</span>
      </div>
    </div>

    <div class="footer">
      ${siteTitle}<br>
      Website: <a href="https://plashafodcottage.co.uk" style="color: #4f46e5; text-decoration: none;">plashafodcottage.co.uk</a> • Tel: ${phone}
    </div>
  </div>
</body>
</html>
`;
}

/**
 * Plain Text Alternative: Guest Check-in Guide
 */
export function generateCheckInGuideText(
  data: CheckInGuideEmailData,
  settings?: Partial<SiteSettings>,
  isCymraeg: boolean = false
): string {
  const hosts = data.hostNames || settings?.hostNames || 'Siwsan & Neil';
  const phone = data.emergencyPhone || settings?.emergencyHostPhone || settings?.phone || 'Siwsan: 07748 635273 / Neil: 07785 522890';
  const siteTitle = settings?.siteTitle || 'Plas Hafod Cottage & Bryn Bugeiliaid Bach';
  const checkInTime = data.checkInTime || settings?.checkInTime || '3:00 PM';
  const checkOutTime = data.checkOutTime || settings?.checkOutTime || '10:00 AM';
  const address =
    (isCymraeg && settings?.addressCy ? settings.addressCy : settings?.address) ||
    'Plas Hafod Cottage, Nebo, Penygroes, Caernarfon, Gwynedd, LL54 6EB';

  const isBBB = data.propertyId === 'bryn-bugeiliaid-bach';
  const defaultKeySafe = isBBB ? (settings?.bbbKeySafe || 'Unlocked (Key inside)') : (settings?.plasHafodKeySafe || 'Unlocked (Key inside)');
  const keySafeCode = data.keySafeCode || defaultKeySafe;
  const isUnlockedEntry = /unlocked|key inside/i.test(keySafeCode);
  const wifiSsid = data.wifiSsid || (isBBB ? settings?.bbbWifiSsid || 'BrynBugeiliaid_Guest' : settings?.plasHafodWifiSsid || 'PlasHafod_Guest_5G');
  const wifiPass = data.wifiPassword || (isBBB ? settings?.bbbWifiPassword || 'nantlle-ridge-views' : settings?.plasHafodWifiPassword || 'eryri-mountain-peace');

  const directions = data.directions || (isCymraeg ? settings?.checkInDirectionsCy : settings?.checkInDirectionsEn) ||
    `From the A55 follow the A487 heading towards Porthmadog. Once past Penygroes look for signs to NEBO. Do not turn towards Nebo. Follow the A487 for another mile. You will see a sign for a left turning ahead. Please indicate left and slow down. The turning is a very narrow lane opposite the entrance to TG Cefn Graianog (Quarry) - signage in cream with red writing.\n\nFollow the lane up the hill to the T-junction by the white farm house. Turn left. Follow the lane up the hill and take the first right turning. Follow the steep lane up around the bend approx. 1 mile. The entrance to Bwthyn Plas Hafod Cottage and Bryn Bugeiliaid will be sign posted on your left. Drive across track in the field and you will have reached your destination! There is a designated parking area for your accommodation.\n\nShould you travel through Porthmadog towards Caernarfon you will pass via the Villages of Bryncir and Pant Glas. Just after Pant Glas the signs for TG Cefn Graianog will be on your left and you need to take the narrow lane opposite on your right. Then follow the directions as above.\n\n(Caernarfon to Nebo = Approx. 11 miles / Porthmadog to Nebo = Approx. 11 miles)\nPostcode: LL54 6EB (Note: Sat Nav will take you via Nebo, so please follow the directions above).\nWhat3Words entrance: ///perfume.punctuate.ready`;

  const googleMapsUrl = "https://www.google.com/maps/place/53%C2%B001'20.7%22N+4%C2%B016'05.2%22W/@53.0224173,-4.2681046,925m/data=!3m2!1e3!4b1!4m5!3m4!1s0x0:0xd26a6eeb24eac6fd!8m2!3d53.0224173!4d-4.2681046?hl=en";

  return `YOUR HOLIDAY IN ERYRI / SNOWDONIA – DIRECTIONS & ARRIVAL GUIDE: ${data.propertyTitle}

Hi ${data.guestName},

May we first of all thank you for booking ${data.propertyTitle} for your holiday (${formatDateUK(data.checkIn)} to ${formatDateUK(data.checkOut)}). We are sure you will have a wonderful time during your stay here in Eryri / Snowdonia.

ARRIVAL & ENTRY:
${isUnlockedEntry ? 'The Cottage will be left unlocked with the key inside - please make yourself at home on your arrival!' : `Key Safe Code: ${keySafeCode}`}
Admittance to the Cottage is after ${checkInTime}. At the end of your stay we kindly ask that you vacate at ${checkOutTime} at the latest so that we have sufficient time to prepare the Cottage for our next guests.
It would be appreciated if you could email/phone us a few days prior to your stay with an indication as to your estimated time of arrival.

DIRECTIONS:
${directions}
Google Maps Link: ${googleMapsUrl}

WIFI DETAILS:
- Network (SSID): ${wifiSsid}
- Password: ${wifiPass}

CONTACT DETAILS:
${phone}
Email: info@plashafodcottage.co.uk

Thank you again for your booking and we look forward to welcoming you to this part of Wales!

Cofion Cynnes / Warmest Regards,
${hosts}
${siteTitle}
Website: https://plashafodcottage.co.uk`;
}

/**
 * 7. 60-Day Balance Reminder (Sent when balance unpaid 60 days before arrival)
 * Uses dynamic propertyTitle & placeholders so it works seamlessly for both Plas Hafod Cottage and Bryn Bugeiliaid Bach.
 */
export function generateBalanceReminderHtml(
  data: BalanceReminderEmailData,
  settings?: Partial<SiteSettings>,
  isCymraeg: boolean = false
): string {
  const hosts = data.hostNames || settings?.hostNames || 'Siwsan & Neil';
  const phone = data.emergencyPhone || settings?.emergencyHostPhone || settings?.phone || 'Siwsan: 07748 635273 / Neil: 07785 522890';
  const siteTitle = settings?.siteTitle || 'Bwthyn Plas Hafod Cottage & Bryn Bugeiliaid Bach';
  const address = settings?.address || 'Plas Hafod Cottage, Nebo, Penygroes, Caernarfon, Gwynedd, LL54 6EB';
  const daysNotice = settings?.balanceReminderDaysBeforeArrival || 60;

  const badgeText = isCymraeg ? 'ATGOFFA: GWEDDILL DYLEDUS' : 'PAYMENT REQUEST: OUTSTANDING BALANCE';
  const headingText = isCymraeg ? 'Taliad Gweddill Dyledus – Eich Arhosiad yn Eryri' : 'Outstanding Balance Due – Your Upcoming Stay';

  const houseIconUrl = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/803819_787671/House.png';
  const calendarIconUrl = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/803819_787671/Calendar.png';
  const cardIconUrl = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/803819_787671/Credit%20Card.png';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>${headingText} – ${data.propertyTitle}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f6f4; color: #2d3748; margin: 0; padding: 24px 12px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.06); }
    .header { background: #323149; padding: 32px 24px 24px; text-align: center; border-bottom: 3px solid #efda07; }
    .status-badge { display: inline-block; background: #efda07; color: #1e1b2e; font-weight: 800; font-size: 11px; padding: 6px 14px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 14px; }
    .content { padding: 30px 24px; }
    .section-row { display: flex; align-items: flex-start; gap: 16px; padding: 18px 0; border-bottom: 1px solid #e5e5e5; }
    .hero-callout { background: #fefce8; border: 2px solid #facc15; border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center; }
    .bank-box { background: #f8fafc; border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px; margin: 24px 0; }
    .bank-table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    .bank-table td { padding: 8px 6px; font-size: 14px; border-bottom: 1px solid #e2e8f0; }
    .bank-table td.label { width: 40%; color: #64748b; font-weight: 600; }
    .bank-table td.value { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-weight: 700; color: #0f172a; font-size: 15px; }
    .ref-badge { display: inline-block; background: #323149; color: #efda07; padding: 5px 12px; border-radius: 6px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 16px; font-weight: 800; letter-spacing: 1px; }
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
      <span class="status-badge">${badgeText}</span>
      <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">${headingText}</h1>
      <p style="margin: 6px 0 0; font-size: 14px; color: #cbbaff;">${data.propertyTitle}</p>
    </div>

    <div class="content">
      <p style="font-size: 16px; margin-top: 0; color: #1e293b;">
        ${isCymraeg ? 'Helo' : 'Hi'} <strong>${data.guestName}</strong>,
      </p>

      <p style="font-size: 15px; line-height: 1.6; color: #334155;">
        ${isCymraeg
          ? `Mae eich arhosiad yn <strong>${data.propertyTitle}</strong> ymhen ${daysNotice} diwrnod. Gofynnwn yn garedig i chi nawr dalu’r balans sy’n weddill o <strong>£${data.balanceDue}</strong>. Mae manylion dadansoddiad y gost a’r dull talu isod.`
          : `Your stay at <strong>${data.propertyTitle}</strong> is in ${daysNotice} days time. We kindly request that you now pay the outstanding balance of <strong>£${data.balanceDue}</strong>. Details of the cost breakdown and payment method are below.`}
      </p>

      <!-- Cottage & Dates Visual Summary (Matching Original Template Layout) -->
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5; margin: 20px 0;">
        <tr>
          <td width="72" style="padding: 16px 12px 16px 0; vertical-align: middle; text-align: center;">
            <img src="${houseIconUrl}" alt="Cottage" width="52" style="display: inline-block; height: auto; border: 0;" />
          </td>
          <td style="padding: 16px 0; vertical-align: middle;">
            <div style="font-size: 13px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
              ${isCymraeg ? 'BWTHYN A ARCHEIRWYD' : 'COTTAGE BOOKED'}
            </div>
            <div style="font-size: 15px; color: #334155; margin-top: 4px; font-weight: 600;">
              ${data.propertyTitle}
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="border-top: 1px solid #e5e5e5; padding: 0;"></td>
        </tr>
        <tr>
          <td width="72" style="padding: 16px 12px 16px 0; vertical-align: middle; text-align: center;">
            <img src="${calendarIconUrl}" alt="Calendar" width="48" style="display: inline-block; height: auto; border: 0;" />
          </td>
          <td style="padding: 16px 0; vertical-align: middle;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td width="50%" style="vertical-align: top; padding-right: 10px;">
                  <div style="font-size: 13px; font-weight: 800; color: #0f172a; text-transform: uppercase;">
                    ${isCymraeg ? 'CYRRAEDD' : 'ARRIVAL'}
                  </div>
                  <div style="font-size: 14px; color: #475569; margin-top: 4px; font-style: italic;">
                    ${formatDateUK(data.checkIn)}
                  </div>
                </td>
                <td width="50%" style="vertical-align: top;">
                  <div style="font-size: 13px; font-weight: 800; color: #0f172a; text-transform: uppercase;">
                    ${isCymraeg ? 'GADAEL' : 'DEPARTURE'}
                  </div>
                  <div style="font-size: 14px; color: #475569; margin-top: 4px; font-style: italic;">
                    ${formatDateUK(data.checkOut)}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- Cost Breakdown Callout -->
      <div class="hero-callout">
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 6px;">
          <img src="${cardIconUrl}" alt="" width="24" style="display: inline-block; height: auto; vertical-align: middle;" />
          <span style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #854d0e; font-weight: 800;">
            ${isCymraeg ? 'GWEDDILL DYLEDUS' : 'OUTSTANDING BALANCE'}
          </span>
        </div>
        <div style="font-size: 32px; font-weight: 800; color: #1e1b2e; margin: 6px 0;">£${data.balanceDue}</div>
        <div style="font-size: 14px; color: #475569; line-height: 1.7; margin-top: 8px;">
          <em>${isCymraeg ? 'Cyfanswm Pris' : 'Total Price'} - <strong>£${data.totalPrice}</strong></em><br>
          <em>${isCymraeg ? ' eisoes wedi’i Dalu' : 'Already Paid'} - <strong>£${data.depositPaid}</strong></em><br>
          <em>${isCymraeg ? 'Swm sy’n Weddill' : 'Amount Outstanding'} - <strong>£${data.balanceDue}</strong></em><br>
          <em>${isCymraeg ? 'Cyfeirnod Archeb (Booking ID)' : 'Booking ID / Reference'} - <strong>${data.paymentReference}</strong></em>
        </div>
      </div>

      <!-- Bank Transfer Details -->
      <div class="bank-box">
        <p style="margin: 0 0 14px; font-size: 14px; color: #334155; line-height: 1.5; font-style: italic;">
          ${isCymraeg
            ? `Gwnewch y taliad o <strong>£${data.balanceDue}</strong> trwy drosglwyddiad banc uniongyrchol i’r manylion isod a chynnwys eich Cyfeirnod Archeb fel y Cyfeirnod:`
            : `Please make the payment of <strong>£${data.balanceDue}</strong> via direct bank transfer to the details below and include your Booking ID as the Reference:`}
        </p>

        <table class="bank-table">
          <tr><td class="label">Account Name</td><td class="value">${data.bankAccountName}</td></tr>
          <tr><td class="label">Sort Code</td><td class="value">${data.bankSortCode}</td></tr>
          <tr><td class="label">Account Number</td><td class="value">${data.bankAccountNumber}</td></tr>
          ${data.bankIban ? `<tr><td class="label">IBAN</td><td class="value">${data.bankIban}</td></tr>` : ''}
          ${data.bankBic ? `<tr><td class="label">BIC / SWIFT</td><td class="value">${data.bankBic}</td></tr>` : ''}
          <tr>
            <td class="label" style="vertical-align: middle;">Booking ID / Reference</td>
            <td class="value" style="padding-top: 10px; padding-bottom: 10px;">
              <span class="ref-badge">${data.paymentReference}</span>
            </td>
          </tr>
        </table>
      </div>

      <p style="font-size: 13px; color: #64748b; line-height: 1.6;">
        ${isCymraeg
          ? `Os oes gennych unrhyw ymholiadau ynglŷn â’ch archeb cysylltwch â ni ar <a href="mailto:info@plashafodcottage.co.uk" style="color: #4f46e5;">info@plashafodcottage.co.uk</a> neu <strong>${phone}</strong>.`
          : `If you have any queries regarding your booking please contact us on <a href="mailto:info@plashafodcottage.co.uk" style="color: #4f46e5;">info@plashafodcottage.co.uk</a> or <strong>${phone}</strong>.`}
      </p>

      <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #edf2f7;">
        <p style="font-size: 14px; margin: 0 0 4px; color: #1e293b;">
          <strong>Gyda Diolch / With Thanks</strong><br><br>
          <strong>Siwsan and Neil</strong><br>
          <span style="color: #64748b; font-size: 13px;">${siteTitle}</span>
        </p>
        <span style="font-size: 12px; color: #64748b;">${address} • Eryri / Snowdonia National Park</span>
      </div>
    </div>

    <div class="footer">
      ${siteTitle}<br>
      Website: <a href="https://plashafodcottage.co.uk" style="color: #4f46e5; text-decoration: none;">plashafodcottage.co.uk</a> • Tel: ${phone}
    </div>
  </div>
</body>
</html>
`;
}

/**
 * Plain Text Alternative: Balance Reminder
 */
export function generateBalanceReminderText(
  data: BalanceReminderEmailData,
  settings?: Partial<SiteSettings>,
  isCymraeg: boolean = false
): string {
  const hosts = data.hostNames || settings?.hostNames || 'Siwsan and Neil';
  const phone = data.emergencyPhone || settings?.emergencyHostPhone || settings?.phone || 'Siwsan: 07748 635273 / Neil: 07785 522890';
  const siteTitle = settings?.siteTitle || 'Bwthyn Plas Hafod Cottage & Bryn Bugeiliaid Bach';
  const daysNotice = settings?.balanceReminderDaysBeforeArrival || 60;

  return `OUTSTANDING BALANCE DUE: ${data.propertyTitle}

Hi ${data.guestName},

Your stay at ${data.propertyTitle} is in ${daysNotice} days time. We kindly request that you now pay the outstanding balance of £${data.balanceDue}. Details of the cost breakdown and payment method are below.

COTTAGE BOOKED: ${data.propertyTitle}
ARRIVAL: ${formatDateUK(data.checkIn)}
DEPARTURE: ${formatDateUK(data.checkOut)}

OUTSTANDING BALANCE:
- Total Price: £${data.totalPrice}
- Already Paid: £${data.depositPaid}
- Amount Outstanding: £${data.balanceDue}
- Booking ID: ${data.paymentReference}

Please make the payment of £${data.balanceDue} via direct bank transfer to the details below and include your Booking ID as the Reference:

Account Name: ${data.bankAccountName}
Sort Code: ${data.bankSortCode}
Account Number: ${data.bankAccountNumber}
${data.bankIban ? `IBAN: ${data.bankIban}\n` : ''}${data.bankBic ? `BIC / SWIFT: ${data.bankBic}\n` : ''}Reference: ${data.paymentReference}

If you have any queries regarding your booking please contact us on info@plashafodcottage.co.uk or ${phone}.

Gyda Diolch / With Thanks,
${hosts}
${siteTitle}
Website: https://plashafodcottage.co.uk`;
}

/**
 * 8. Guest Deposit Receipt (Sent once BACS Deposit Clears)
 */
export function generateDepositReceiptHtml(
  data: BookingEmailData,
  settings?: Partial<SiteSettings>,
  isCymraeg: boolean = false
): string {
  const hosts = settings?.hostNames || 'Siwsan & Neil';
  const siteTitle = settings?.siteTitle || 'Plas Hafod Cottage & Bryn Bugeiliaid Bach';
  const phone = settings?.emergencyHostPhone || settings?.phone || 'Siwsan: 07748 635273 / Neil: 07785 522890';
  const checkInTime = settings?.checkInTime || '15:00';
  const checkOutTime = settings?.checkOutTime || '10:00';
  const balanceDays = settings?.balanceReminderDaysBeforeArrival || 60;
  const address =
    (isCymraeg && settings?.addressCy ? settings.addressCy : settings?.address) ||
    'Bwthyn Plas Hafod, Nebo, Gwynedd, LL54 6EB';

  const houseIconUrl = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/803819_787671/House.png';
  const mapIconUrl = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/803819_787671/Map.png';
  const calendarIconUrl = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/803819_787671/Calendar.png';
  const calendarMarkerIconUrl = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/803819_787671/Calendar_with_marker.png';
  const creditCardIconUrl = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/803819_787671/Credit%20Card.png';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>${isCymraeg ? `Blaendal Wedi’i Dderbyn – ${data.propertyTitle}` : `Deposit Receipt – ${data.propertyTitle}`}</title>
  <style>
    body { font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f6f4; color: #2d3748; margin: 0; padding: 24px 12px; }
    .card { max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.06); }
    .header { background: #323149; padding: 32px 24px 24px; text-align: center; }
    .status-badge { display: inline-block; background: #22c55e; color: #ffffff; font-weight: 800; font-size: 11px; padding: 6px 14px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 14px; }
    .content { padding: 30px 24px; }
    .summary-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; margin: 14px 0; }
    .price-card { background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 18px 20px; margin: 16px 0; }
    .footer { padding: 24px 20px; text-align: center; font-size: 12px; color: #cbd5e1; background: #323149; border-top: 1px solid #241f35; line-height: 1.6; }

    @media (prefers-color-scheme: dark) {
      body { background-color: #121019 !important; color: #e2e8f0 !important; }
      .card { background-color: #1c1829 !important; border-color: #2e2842 !important; color: #f1f5f9 !important; }
      .header { background-color: #241f35 !important; }
      .content { color: #e2e8f0 !important; }
      .summary-card { background-color: #201a30 !important; border-color: #3b3252 !important; color: #f1f5f9 !important; }
      .price-card { background-color: #14291e !important; border-color: #22c55e !important; color: #f1f5f9 !important; }
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div style="margin-bottom: 14px;">
        <img src="${LOGO_WHITE_URL}" alt="Plas Hafod Cottage" width="165" style="display: inline-block; max-width: 165px; height: auto;" border="0" />
      </div>
      <span class="status-badge">${isCymraeg ? 'Blaendal Wedi’i Dderbyn' : 'Deposit Safely Received'}</span>
      <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">${isCymraeg ? `Cadarnhad Blaendal – ${data.propertyTitle}` : `Deposit Receipt – ${data.propertyTitle}`}</h1>
      <p style="margin: 6px 0 0; font-size: 14px; color: #cbbaff;">Eryri / Snowdonia National Park</p>
    </div>

    <div class="content">
      <p style="font-size: 16px; margin-top: 0; color: #1e293b;">${isCymraeg ? 'Helo' : 'Hi'} <strong>${data.guestName}</strong>,</p>

      <p style="font-size: 15px; line-height: 1.65; color: #334155;">
        ${isCymraeg
          ? `Gallwn gadarnhau ein bod wedi derbyn eich trosglwyddiad banc yn ddiogel am y swm o <strong>£${data.depositAmount}</strong> fel blaendal ar gyfer rhentu <strong>${data.propertyTitle}</strong>. Diolch yn fawr iawn am eich taliad prydlon!`
          : `We can confirm that we have safely received your bank transfer in the sum of <strong>£${data.depositAmount}</strong> as deposit for rental of <strong>${data.propertyTitle}</strong>. Many thanks for your prompt payment!`}
      </p>

      <p style="font-size: 15px; line-height: 1.65; color: #334155;">
        ${isCymraeg
          ? `Anfonir nodyn atgoffa am y balans sy’n weddill <strong>${balanceDays} diwrnod</strong> cyn eich arhosiad.`
          : `A reminder will be sent for the outstanding balance <strong>${balanceDays} days</strong> prior to your stay.`}
      </p>

      <p style="font-size: 15px; line-height: 1.65; color: #334155;">
        ${isCymraeg
          ? `Edrychwn ymlaen at eich croesawu i <strong>${data.propertyTitle}</strong>!`
          : `Looking forward to welcoming you to <strong>${data.propertyTitle}</strong>!`}
      </p>

      <p style="font-size: 14px; font-weight: 700; color: #1e293b; margin: 22px 0 10px;">
        ${isCymraeg ? 'Manylion eich archeb:' : 'Details of your booking:'}
      </p>

      <!-- Cottage Booked -->
      <div class="summary-card">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="52" valign="top" style="padding-right: 14px;">
              <img src="${houseIconUrl}" width="42" height="42" alt="Cottage" style="display: block;" />
            </td>
            <td valign="middle">
              <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #323149;">${isCymraeg ? 'BWTHYN A ARCHEBWYD' : 'COTTAGE BOOKED'}</div>
              <div style="font-size: 16px; font-weight: 700; color: #0f172a; margin-top: 4px;">${data.propertyTitle}</div>
              <div style="font-size: 13px; color: #64748b; margin-top: 2px;">${data.adults} Adults, ${data.children} Children, ${data.pets} Pets • ${data.totalNights} Nights</div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Address -->
      <div class="summary-card">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="52" valign="top" style="padding-right: 14px;">
              <img src="${mapIconUrl}" width="42" height="42" alt="Address" style="display: block;" />
            </td>
            <td valign="middle">
              <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #323149;">${isCymraeg ? 'CYFEIRIAD' : 'ADDRESS'}</div>
              <div style="font-size: 15px; font-weight: 600; color: #0f172a; margin-top: 4px;">${address}</div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Arrival & Departure -->
      <div class="summary-card">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="50%" valign="top" style="padding-right: 10px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="46" valign="top" style="padding-right: 10px;">
                    <img src="${calendarIconUrl}" width="38" height="38" alt="Arrival" style="display: block;" />
                  </td>
                  <td valign="middle">
                    <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #323149;">${isCymraeg ? 'CYRRAEDD' : 'ARRIVAL'}</div>
                    <div style="font-size: 15px; font-weight: 700; color: #0f172a; margin-top: 2px;">${formatDateUK(data.checkIn)}</div>
                  </td>
                </tr>
              </table>
            </td>
            <td width="50%" valign="top" style="padding-left: 10px; border-left: 1px solid #e2e8f0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="46" valign="top" style="padding-right: 10px;">
                    <img src="${calendarIconUrl}" width="38" height="38" alt="Departure" style="display: block;" />
                  </td>
                  <td valign="middle">
                    <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #323149;">${isCymraeg ? 'GADAEL' : 'DEPARTURE'}</div>
                    <div style="font-size: 15px; font-weight: 700; color: #0f172a; margin-top: 2px;">${formatDateUK(data.checkOut)}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>

      <!-- Check-in & Check-out -->
      <div class="summary-card">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="50%" valign="top" style="padding-right: 10px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="46" valign="top" style="padding-right: 10px;">
                    <img src="${calendarMarkerIconUrl}" width="38" height="38" alt="Check-in" style="display: block;" />
                  </td>
                  <td valign="middle">
                    <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #323149;">CHECK-IN</div>
                    <div style="font-size: 15px; font-weight: 700; color: #0f172a; margin-top: 2px;">${checkInTime}</div>
                  </td>
                </tr>
              </table>
            </td>
            <td width="50%" valign="top" style="padding-left: 10px; border-left: 1px solid #e2e8f0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="46" valign="top" style="padding-right: 10px;">
                    <img src="${calendarMarkerIconUrl}" width="38" height="38" alt="Check-out" style="display: block;" />
                  </td>
                  <td valign="middle">
                    <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #323149;">CHECK-OUT</div>
                    <div style="font-size: 15px; font-weight: 700; color: #0f172a; margin-top: 2px;">${checkOutTime}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>

      <!-- Price & Deposit Summary -->
      <div class="price-card">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="52" valign="top" style="padding-right: 14px;">
              <img src="${creditCardIconUrl}" width="42" height="42" alt="Price" style="display: block;" />
            </td>
            <td valign="middle">
              <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #166534;">${isCymraeg ? 'PRIS A BLAENDAL' : 'PRICE & DEPOSIT PAID'}</div>
              <div style="font-size: 20px; font-weight: 800; color: #14532d; margin-top: 4px;">£${data.totalPrice} <span style="font-size: 13px; font-weight: 600; color: #15803d;">(£${data.depositAmount} ${isCymraeg ? 'wedi’i dalu' : 'deposit paid'})</span></div>
              <div style="font-size: 13px; color: #334155; margin-top: 4px;">
                ${isCymraeg
                  ? `Gweddill o <strong>£${data.balanceDue}</strong> yn ddyledus ${balanceDays} diwrnod cyn cyrraedd`
                  : `Remaining balance of <strong>£${data.balanceDue}</strong> due ${balanceDays} days prior to arrival`}
              </div>
            </td>
          </tr>
        </table>
      </div>

      <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #edf2f7;">
        <p style="font-size: 15px; margin: 0 0 4px; color: #1e293b;">
          Gyda Diolch / With Thanks<br>
          <strong>${hosts}</strong>
        </p>
        <span style="font-size: 12px; color: #64748b;">${address} • Tel: ${phone}</span>
      </div>
    </div>

    <div class="footer">
      <strong style="color: #ffffff;">${siteTitle}</strong><br>
      <a href="https://www.facebook.com/bwthynplashafodcottage/" style="color: #efda07; text-decoration: none;">Facebook</a> •
      <a href="https://www.instagram.com/plashafodcottage/" style="color: #efda07; text-decoration: none;">Instagram</a> •
      <a href="https://plashafodcottage.co.uk" style="color: #efda07; text-decoration: none;">plashafodcottage.co.uk</a><br>
      Email: <a href="mailto:info@plashafodcottage.co.uk" style="color: #cbd5e1; text-decoration: none;">info@plashafodcottage.co.uk</a>
    </div>
  </div>
</body>
</html>
`;
}

/**
 * Plain Text Alternative: Guest Deposit Receipt
 */
export function generateDepositReceiptText(
  data: BookingEmailData,
  settings?: Partial<SiteSettings>,
  isCymraeg: boolean = false
): string {
  const hosts = settings?.hostNames || 'Siwsan & Neil';
  const siteTitle = settings?.siteTitle || 'Plas Hafod Cottage & Bryn Bugeiliaid Bach';
  const checkInTime = settings?.checkInTime || '15:00';
  const checkOutTime = settings?.checkOutTime || '10:00';
  const balanceDays = settings?.balanceReminderDaysBeforeArrival || 60;
  const address =
    (isCymraeg && settings?.addressCy ? settings.addressCy : settings?.address) ||
    'Bwthyn Plas Hafod, Nebo, Gwynedd, LL54 6EB';

  return `DEPOSIT RECEIPT – ${data.propertyTitle}

${isCymraeg ? 'Helo' : 'Hi'} ${data.guestName},

We can confirm that we have safely received your bank transfer in the sum of £${data.depositAmount} as deposit for rental of ${data.propertyTitle}. Many thanks for your prompt payment!

A reminder will be sent for the outstanding balance ${balanceDays} days prior to your stay.

Looking forward to welcoming you to ${data.propertyTitle}!

Details of your booking:
- COTTAGE BOOKED: ${data.propertyTitle}
- ADDRESS: ${address}
- ARRIVAL: ${formatDateUK(data.checkIn)} (Check-in: ${checkInTime})
- DEPARTURE: ${formatDateUK(data.checkOut)} (Check-out: ${checkOutTime})
- PRICE: £${data.totalPrice} (Deposit Paid: £${data.depositAmount} | Balance Due: £${data.balanceDue})

Gyda Diolch / With Thanks
${hosts}
${siteTitle}
Website: https://plashafodcottage.co.uk
Email: info@plashafodcottage.co.uk`;
}

/**
 * 9. Guest Full Payment Receipt (Sent once Final Balance Clears)
 */
export function generateFullPaymentReceiptHtml(
  data: BookingEmailData,
  settings?: Partial<SiteSettings>,
  isCymraeg: boolean = false
): string {
  const hosts = settings?.hostNames || 'Siwsan & Neil';
  const siteTitle = settings?.siteTitle || 'Plas Hafod Cottage & Bryn Bugeiliaid Bach';
  const phone = settings?.emergencyHostPhone || settings?.phone || 'Siwsan: 07748 635273 / Neil: 07785 522890';
  const checkInTime = settings?.checkInTime || '15:00';
  const checkOutTime = settings?.checkOutTime || '10:00';
  const directionsDays = settings?.checkInDaysBeforeArrival || 30;
  const address =
    (isCymraeg && settings?.addressCy ? settings.addressCy : settings?.address) ||
    'Bwthyn Plas Hafod, Nebo, Gwynedd, LL54 6EB';

  const houseIconUrl = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/803819_787671/House.png';
  const mapIconUrl = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/803819_787671/Map.png';
  const calendarIconUrl = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/803819_787671/Calendar.png';
  const calendarMarkerIconUrl = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/803819_787671/Calendar_with_marker.png';
  const creditCardIconUrl = 'https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/803819_787671/Credit%20Card.png';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>${isCymraeg ? `Taliad Llawn Wedi’i Dderbyn – ${data.propertyTitle}` : `Full Payment Receipt – ${data.propertyTitle}`}</title>
  <style>
    body { font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f6f4; color: #2d3748; margin: 0; padding: 24px 12px; }
    .card { max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.06); }
    .header { background: #323149; padding: 32px 24px 24px; text-align: center; }
    .status-badge { display: inline-block; background: #22c55e; color: #ffffff; font-weight: 800; font-size: 11px; padding: 6px 14px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 14px; }
    .content { padding: 30px 24px; }
    .summary-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; margin: 14px 0; }
    .price-card { background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 18px 20px; margin: 16px 0; }
    .footer { padding: 24px 20px; text-align: center; font-size: 12px; color: #cbd5e1; background: #323149; border-top: 1px solid #241f35; line-height: 1.6; }

    @media (prefers-color-scheme: dark) {
      body { background-color: #121019 !important; color: #e2e8f0 !important; }
      .card { background-color: #1c1829 !important; border-color: #2e2842 !important; color: #f1f5f9 !important; }
      .header { background-color: #241f35 !important; }
      .content { color: #e2e8f0 !important; }
      .summary-card { background-color: #201a30 !important; border-color: #3b3252 !important; color: #f1f5f9 !important; }
      .price-card { background-color: #14291e !important; border-color: #22c55e !important; color: #f1f5f9 !important; }
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div style="margin-bottom: 14px;">
        <img src="${LOGO_WHITE_URL}" alt="Plas Hafod Cottage" width="165" style="display: inline-block; max-width: 165px; height: auto;" border="0" />
      </div>
      <span class="status-badge">${isCymraeg ? 'Archeb Wedi’i Chadarnhau’n Llawn' : 'Booking Fully Confirmed'}</span>
      <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">${isCymraeg ? `Taliad Terfynol Wedi’i Dderbyn – ${data.propertyTitle}` : `Full Payment Receipt – ${data.propertyTitle}`}</h1>
      <p style="margin: 6px 0 0; font-size: 14px; color: #cbbaff;">Eryri / Snowdonia National Park</p>
    </div>

    <div class="content">
      <p style="font-size: 16px; margin-top: 0; color: #1e293b;">${isCymraeg ? 'Helo' : 'Hi'} <strong>${data.guestName}</strong>,</p>

      <p style="font-size: 15px; line-height: 1.65; color: #334155;">
        ${isCymraeg
          ? `Gallwn gadarnhau ein bod wedi derbyn eich trosglwyddiad banc yn ddiogel am y swm o <strong>£${data.balanceDue}</strong> fel y taliad terfynol ar gyfer rhentu <strong>${data.propertyTitle}</strong>. Mae eich archeb bellach wedi’i chadarnhau’n llawn.`
          : `We can confirm that we have safely received your bank transfer in the sum of <strong>£${data.balanceDue}</strong> as the final payment for rental of <strong>${data.propertyTitle}</strong>. Your booking is now fully confirmed.`}
      </p>

      <p style="font-size: 15px; line-height: 1.65; color: #334155;">
        ${isCymraeg
          ? `Byddwn yn anfon cyfarwyddiadau llawn a manylion am y bwthyn o fewn <strong>${directionsDays} diwrnod</strong> i’ch arhosiad.`
          : `We will send full directions and details regarding the cottage within <strong>${directionsDays} days</strong> of your stay.`}
      </p>

      <p style="font-size: 15px; line-height: 1.65; color: #334155;">
        ${isCymraeg
          ? `Rydym yn edrych ymlaen at eich croesawu i <strong>${data.propertyTitle}</strong>!`
          : `We are looking forward to welcoming you to <strong>${data.propertyTitle}</strong>!`}
      </p>

      <p style="font-size: 14px; font-weight: 700; color: #1e293b; margin: 22px 0 10px;">
        ${isCymraeg ? 'Manylion eich archeb:' : 'Details of your booking:'}
      </p>

      <!-- Cottage Booked -->
      <div class="summary-card">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="52" valign="top" style="padding-right: 14px;">
              <img src="${houseIconUrl}" width="42" height="42" alt="Cottage" style="display: block;" />
            </td>
            <td valign="middle">
              <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #323149;">${isCymraeg ? 'BWTHYN A ARCHEBWYD' : 'COTTAGE BOOKED'}</div>
              <div style="font-size: 16px; font-weight: 700; color: #0f172a; margin-top: 4px;">${data.propertyTitle}</div>
              <div style="font-size: 13px; color: #64748b; margin-top: 2px;">${data.adults} Adults, ${data.children} Children, ${data.pets} Pets • ${data.totalNights} Nights</div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Address -->
      <div class="summary-card">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="52" valign="top" style="padding-right: 14px;">
              <img src="${mapIconUrl}" width="42" height="42" alt="Address" style="display: block;" />
            </td>
            <td valign="middle">
              <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #323149;">${isCymraeg ? 'CYFEIRIAD' : 'ADDRESS'}</div>
              <div style="font-size: 15px; font-weight: 600; color: #0f172a; margin-top: 4px;">${address}</div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Arrival & Departure -->
      <div class="summary-card">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="50%" valign="top" style="padding-right: 10px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="46" valign="top" style="padding-right: 10px;">
                    <img src="${calendarIconUrl}" width="38" height="38" alt="Arrival" style="display: block;" />
                  </td>
                  <td valign="middle">
                    <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #323149;">${isCymraeg ? 'CYRRAEDD' : 'ARRIVAL'}</div>
                    <div style="font-size: 15px; font-weight: 700; color: #0f172a; margin-top: 2px;">${formatDateUK(data.checkIn)}</div>
                  </td>
                </tr>
              </table>
            </td>
            <td width="50%" valign="top" style="padding-left: 10px; border-left: 1px solid #e2e8f0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="46" valign="top" style="padding-right: 10px;">
                    <img src="${calendarIconUrl}" width="38" height="38" alt="Departure" style="display: block;" />
                  </td>
                  <td valign="middle">
                    <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #323149;">${isCymraeg ? 'GADAEL' : 'DEPARTURE'}</div>
                    <div style="font-size: 15px; font-weight: 700; color: #0f172a; margin-top: 2px;">${formatDateUK(data.checkOut)}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>

      <!-- Check-in & Check-out -->
      <div class="summary-card">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="50%" valign="top" style="padding-right: 10px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="46" valign="top" style="padding-right: 10px;">
                    <img src="${calendarMarkerIconUrl}" width="38" height="38" alt="Check-in" style="display: block;" />
                  </td>
                  <td valign="middle">
                    <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #323149;">CHECK-IN</div>
                    <div style="font-size: 15px; font-weight: 700; color: #0f172a; margin-top: 2px;">${checkInTime}</div>
                  </td>
                </tr>
              </table>
            </td>
            <td width="50%" valign="top" style="padding-left: 10px; border-left: 1px solid #e2e8f0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="46" valign="top" style="padding-right: 10px;">
                    <img src="${calendarMarkerIconUrl}" width="38" height="38" alt="Check-out" style="display: block;" />
                  </td>
                  <td valign="middle">
                    <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #323149;">CHECK-OUT</div>
                    <div style="font-size: 15px; font-weight: 700; color: #0f172a; margin-top: 2px;">${checkOutTime}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>

      <!-- Price Summary -->
      <div class="price-card">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="52" valign="top" style="padding-right: 14px;">
              <img src="${creditCardIconUrl}" width="42" height="42" alt="Price" style="display: block;" />
            </td>
            <td valign="middle">
              <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #166534;">${isCymraeg ? 'PRIS (WEDI’I DALU’N LLAWN)' : 'PRICE (PAID IN FULL)'}</div>
              <div style="font-size: 20px; font-weight: 800; color: #14532d; margin-top: 4px;">£${data.totalPrice} <span style="font-size: 13px; font-weight: 600; color: #15803d;">(£${data.balanceDue} ${isCymraeg ? 'taliad terfynol wedi’i dderbyn' : 'final payment received'})</span></div>
            </td>
          </tr>
        </table>
      </div>

      <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #edf2f7;">
        <p style="font-size: 15px; margin: 0 0 4px; color: #1e293b;">
          Gyda Diolch / With Thanks<br>
          <strong>${hosts}</strong>
        </p>
        <span style="font-size: 12px; color: #64748b;">${address} • Tel: ${phone}</span>
      </div>
    </div>

    <div class="footer">
      <strong style="color: #ffffff;">${siteTitle}</strong><br>
      <a href="https://www.facebook.com/bwthynplashafodcottage/" style="color: #efda07; text-decoration: none;">Facebook</a> •
      <a href="https://www.instagram.com/plashafodcottage/" style="color: #efda07; text-decoration: none;">Instagram</a> •
      <a href="https://plashafodcottage.co.uk" style="color: #efda07; text-decoration: none;">plashafodcottage.co.uk</a><br>
      Email: <a href="mailto:info@plashafodcottage.co.uk" style="color: #cbd5e1; text-decoration: none;">info@plashafodcottage.co.uk</a>
    </div>
  </div>
</body>
</html>
`;
}

/**
 * Plain Text Alternative: Guest Full Payment Receipt
 */
export function generateFullPaymentReceiptText(
  data: BookingEmailData,
  settings?: Partial<SiteSettings>,
  isCymraeg: boolean = false
): string {
  const hosts = settings?.hostNames || 'Siwsan & Neil';
  const siteTitle = settings?.siteTitle || 'Plas Hafod Cottage & Bryn Bugeiliaid Bach';
  const checkInTime = settings?.checkInTime || '15:00';
  const checkOutTime = settings?.checkOutTime || '10:00';
  const directionsDays = settings?.checkInDaysBeforeArrival || 30;
  const address =
    (isCymraeg && settings?.addressCy ? settings.addressCy : settings?.address) ||
    'Bwthyn Plas Hafod, Nebo, Gwynedd, LL54 6EB';

  return `FULL PAYMENT RECEIPT – ${data.propertyTitle}

${isCymraeg ? 'Helo' : 'Hi'} ${data.guestName},

We can confirm that we have safely received your bank transfer in the sum of £${data.balanceDue} as the final payment for rental of ${data.propertyTitle}. Your booking is now fully confirmed.

We will send full directions and details regarding the cottage within ${directionsDays} days of your stay.

We are looking forward to welcoming you to ${data.propertyTitle}!

Details of your booking:
- COTTAGE BOOKED: ${data.propertyTitle}
- ADDRESS: ${address}
- ARRIVAL: ${formatDateUK(data.checkIn)} (Check-in: ${checkInTime})
- DEPARTURE: ${formatDateUK(data.checkOut)} (Check-out: ${checkOutTime})
- PRICE: £${data.totalPrice} (Paid in full)

Gyda Diolch / With Thanks
${hosts}
${siteTitle}
Website: https://plashafodcottage.co.uk
Email: info@plashafodcottage.co.uk`;
}




