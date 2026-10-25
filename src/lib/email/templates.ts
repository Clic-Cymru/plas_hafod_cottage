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

// Hosted on global CDN for instant, reliable loading across all email clients (Gmail, Outlook, Apple Mail)
export const LOGO_COLOR_URL =
  'https://cdn.sanity.io/images/iji5mij0/production/e869c435303f83aea95717dda5de5b822310fb00-821x523.png';
export const LOGO_WHITE_URL =
  'https://cdn.sanity.io/images/iji5mij0/production/20a5069ce3f84e0a7f886cd753993227028c0945-810x523.png';

/**
 * 1. Owner Alert: Dark Theme / Dashboard Style with White Logo
 */
export function generateOwnerBookingAlertHtml(data: BookingEmailData): string {
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
        <tr><th>Dates</th><td><strong>${data.checkIn}</strong> to <strong>${data.checkOut}</strong> (${data.totalNights} nights)</td></tr>
        <tr><th>Party</th><td>${data.adults} Adults, ${data.children} Children, ${data.pets} Pets</td></tr>
        ${data.appliedDiscountName ? `<tr><th>Discount Applied</th><td><span style="color: #15803d; font-weight: 600;">${data.appliedDiscountName} (-£${data.discountAmount})</span></td></tr>` : ''}
        <tr class="total-row"><th>Total Quote</th><td>£${data.totalPrice}</td></tr>
        <tr><th>Deposit to Collect (25%)</th><td><strong style="color: #0f172a;">£${data.depositAmount}</strong></td></tr>
        <tr><th>Remaining Balance</th><td>£${data.balanceDue}</td></tr>
        ${data.notes ? `<tr><th>Guest Notes</th><td><em style="color: #475569;">"${data.notes}"</em></td></tr>` : ''}
      </table>

      <div style="text-align: center; margin-top: 24px;">
        <a href="https://plashafodcottage.co.uk/studio" class="btn">Open in Sanity Studio Dashboard →</a>
      </div>
    </div>
    <div class="footer">
      Plas Hafod Cottage Management System • Snowdonia / Eryri
    </div>
  </div>
</body>
</html>
`;
}

/**
 * 2. Guest Confirmation: Light, Welcoming Holiday Template with Colour Logo (+ Dark Mode swap)
 */
export function generateGuestConfirmationHtml(data: BookingEmailData): string {
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
        <!-- Light Mode Colour Logo -->
        <img class="logo-color" src="${LOGO_COLOR_URL}" alt="Plas Hafod Cottage" width="165" style="display: inline-block; max-width: 165px; height: auto;" border="0" />
        <!-- Dark Mode White Logo (hidden by default) -->
        <img class="logo-white" src="${LOGO_WHITE_URL}" alt="Plas Hafod Cottage" width="165" style="display: none; max-width: 165px; height: auto;" border="0" />
      </div>
      <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #1e1b2e; letter-spacing: 0.3px;">Croeso / Welcome</h1>
      <p style="margin: 4px 0 0; font-size: 15px; color: #64748b; font-weight: 500;">${data.propertyTitle}</p>
    </div>
    <div class="content">
      <p style="font-size: 16px; margin-top: 0; color: #1e293b;">Dear <strong>${data.guestName}</strong>,</p>
      
      <p style="font-size: 14px; line-height: 1.6; color: #475569;">
        Thank you for your inquiry to stay with us at <strong>${data.propertyTitle}</strong>. We have received your booking request and our team is reviewing availability for your selected dates.
      </p>

      <div class="highlight-box">
        <strong style="color: #0f172a;">What happens next?</strong><br>
        We will review your requested dates and contact you shortly with confirmation and secure deposit payment details to lock in your stay.
      </div>

      <h3 style="font-size: 16px; margin: 26px 0 10px; color: #0f172a;">Your Booking Summary</h3>
      <table class="table">
        <tr><th>Property</th><td><strong>${data.propertyTitle}</strong></td></tr>
        <tr><th>Check-in</th><td>${data.checkIn}</td></tr>
        <tr><th>Check-out</th><td>${data.checkOut}</td></tr>
        <tr><th>Duration</th><td>${data.totalNights} Nights</td></tr>
        <tr><th>Guests</th><td>${data.adults} Adults, ${data.children} Children, ${data.pets} Pets</td></tr>
        ${data.appliedDiscountName ? `<tr><th>Special Offer</th><td><span style="color: #15803d; font-weight: 600;">${data.appliedDiscountName} (-£${data.discountAmount})</span></td></tr>` : ''}
        <tr><th>Total Stay Price</th><td><strong>£${data.totalPrice}</strong></td></tr>
        <tr><th>Deposit to Secure</th><td><strong>£${data.depositAmount}</strong> (25%)</td></tr>
        <tr><th>Balance Due Prior to Arrival</th><td>£${data.balanceDue}</td></tr>
      </table>

      <p style="font-size: 13px; color: #64748b; line-height: 1.6;">
        If you have any questions in the meantime or wish to modify your dates, simply reply directly to this email or call us.
      </p>

      <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #edf2f7;">
        <p style="font-size: 14px; margin: 0 0 4px; color: #1e293b;">
          Warmest regards,<br>
          <strong>Plas Hafod Cottage Team</strong>
        </p>
        <span style="font-size: 12px; color: #64748b;">Nebo, Caernarfon, Gwynedd, LL54 6EE • Eryri / Snowdonia National Park</span>
      </div>
    </div>
    <div class="footer">
      Plas Hafod Cottage &amp; Bryn Bugeiliaid Bach<br>
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
export function generateOwnerContactAlertHtml(data: ContactEmailData): string {
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
    </div>
    <div class="footer">
      Plas Hafod Cottage Website Message System
    </div>
  </div>
</body>
</html>
`;
}

/**
 * 4. Visitor Auto-Reply: Light Template with Colour Logo (+ Dark Mode swap)
 */
export function generateVisitorContactAutoReplyHtml(data: ContactEmailData): string {
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
        <img class="logo-white" src="${LOGO_WHITE_URL}" alt="Plas Hafod Cottage" width="160" style="display: none; max-width: 160px; height: auto;" border="0" />
      </div>
      <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #1e1b2e;">Thank You for Contacting Us</h2>
      <p style="margin: 4px 0 0; font-size: 14px; color: #64748b;">Bwthyn Plas Hafod Cottage &amp; Bryn Bugeiliaid Bach</p>
    </div>
    <div class="content">
      <p style="font-size: 15px; margin-top: 0; color: #1e293b;">Dear <strong>${data.name}</strong>,</p>
      <p style="font-size: 14px; line-height: 1.6; color: #475569;">
        Thank you for getting in touch with us. We have received your inquiry and will respond to you within 24 hours.
      </p>
      
      <div style="background: #fafaf9; border-left: 3px solid #323149; padding: 14px 18px; margin: 18px 0; font-size: 13px; color: #475569; border-radius: 0 6px 6px 0;">
        <strong style="color: #0f172a;">Your Message:</strong><br>
        <span style="font-style: italic;">"${data.message}"</span>
      </div>

      <div style="margin-top: 24px;">
        <p style="font-size: 14px; margin: 0 0 4px; color: #1e293b;">
          Warm regards,<br>
          <strong>Plas Hafod Cottage Team</strong>
        </p>
        <span style="font-size: 12px; color: #64748b;">Nebo, Caernarfon • Eryri / Snowdonia National Park</span>
      </div>
    </div>
    <div class="footer">
      Plas Hafod Cottage • <a href="https://plashafodcottage.co.uk" style="color: #4f46e5; text-decoration: none;">plashafodcottage.co.uk</a>
    </div>
  </div>
</body>
</html>
`;
}
