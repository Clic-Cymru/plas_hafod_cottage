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

export function generateOwnerBookingAlertHtml(data: BookingEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f9; color: #333333; margin: 0; padding: 20px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: #323149; color: #ffffff; padding: 24px; text-align: center; }
    .badge { display: inline-block; background: #efda07; color: #333333; font-weight: bold; font-size: 11px; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
    .content { padding: 24px; }
    .table { width: 100%; border-collapse: collapse; margin: 16px 0; }
    .table th, .table td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #edf2f7; font-size: 14px; }
    .table th { background: #f8fafc; color: #64748b; font-weight: 600; }
    .total-row { font-weight: bold; background: #f1f5f9; }
    .btn { display: inline-block; background: #99a0c1; color: #ffffff !important; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; text-align: center; margin-top: 16px; }
    .footer { padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; background: #f8fafc; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="badge">New Booking Request</span>
      <h1 style="margin: 0; font-size: 22px;">${data.propertyTitle}</h1>
    </div>
    <div class="content">
      <p style="font-size: 15px; margin-top: 0;">You have received a new booking inquiry through the website:</p>
      
      <table class="table">
        <tr><th>Guest Name</th><td><strong>${data.guestName}</strong></td></tr>
        <tr><th>Email</th><td><a href="mailto:${data.guestEmail}">${data.guestEmail}</a></td></tr>
        <tr><th>Phone</th><td><a href="tel:${data.guestPhone}">${data.guestPhone}</a></td></tr>
        <tr><th>Dates</th><td><strong>${data.checkIn}</strong> to <strong>${data.checkOut}</strong> (${data.totalNights} nights)</td></tr>
        <tr><th>Party</th><td>${data.adults} Adults, ${data.children} Children, ${data.pets} Pets</td></tr>
        ${data.appliedDiscountName ? `<tr><th>Discount Applied</th><td>${data.appliedDiscountName} (-£${data.discountAmount})</td></tr>` : ''}
        <tr class="total-row"><th>Total Quote</th><td>£${data.totalPrice}</td></tr>
        <tr><th>Deposit to Collect (25%)</th><td><strong>£${data.depositAmount}</strong></td></tr>
        <tr><th>Remaining Balance</th><td>£${data.balanceDue}</td></tr>
        ${data.notes ? `<tr><th>Guest Notes</th><td><em>"${data.notes}"</em></td></tr>` : ''}
      </table>

      <div style="text-align: center;">
        <a href="https://plashafodcottage.co.uk/studio" class="btn">Open in Sanity Studio Dashboard</a>
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

export function generateGuestConfirmationHtml(data: BookingEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f9; color: #333333; margin: 0; padding: 20px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: #323149; color: #ffffff; padding: 32px 24px; text-align: center; }
    .content { padding: 28px 24px; }
    .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .table th, .table td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #edf2f7; font-size: 14px; }
    .table th { background: #f8fafc; color: #64748b; font-weight: 600; width: 40%; }
    .highlight-box { background: #f8fafc; border-left: 4px solid #efda07; padding: 14px 18px; margin: 20px 0; border-radius: 0 8px 8px 0; font-size: 14px; line-height: 1.5; }
    .footer { padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; background: #f8fafc; border-top: 1px solid #e2e8f0; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1 style="margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 0.5px;">Croeso / Welcome</h1>
      <p style="margin: 6px 0 0; font-size: 15px; color: #e2e8f0;">${data.propertyTitle}</p>
    </div>
    <div class="content">
      <p style="font-size: 16px; margin-top: 0;">Dear <strong>${data.guestName}</strong>,</p>
      
      <p style="font-size: 14px; line-height: 1.6; color: #475569;">
        Thank you for your inquiry to stay with us at <strong>${data.propertyTitle}</strong>. We have received your booking request and our team is reviewing availability for your selected dates.
      </p>

      <div class="highlight-box">
        <strong>What happens next?</strong><br>
        We will review your requested dates and contact you shortly with confirmation and secure deposit payment details to lock in your stay.
      </div>

      <h3 style="font-size: 16px; margin: 24px 0 8px; color: #1e293b;">Your Booking Summary</h3>
      <table class="table">
        <tr><th>Property</th><td><strong>${data.propertyTitle}</strong></td></tr>
        <tr><th>Check-in</th><td>${data.checkIn}</td></tr>
        <tr><th>Check-out</th><td>${data.checkOut}</td></tr>
        <tr><th>Duration</th><td>${data.totalNights} Nights</td></tr>
        <tr><th>Guests</th><td>${data.adults} Adults, ${data.children} Children, ${data.pets} Pets</td></tr>
        <tr><th>Total Stay Price</th><td><strong>£${data.totalPrice}</strong></td></tr>
        <tr><th>Deposit to Secure</th><td>£${data.depositAmount} (25%)</td></tr>
        <tr><th>Balance Due Prior to Arrival</th><td>£${data.balanceDue}</td></tr>
      </table>

      <p style="font-size: 13px; color: #64748b; line-height: 1.5;">
        If you have any questions in the meantime or need to modify your inquiry, simply reply directly to this email or call us.
      </p>

      <p style="font-size: 14px; margin-bottom: 0;">
        Warmest regards,<br>
        <strong>Plas Hafod Cottage Team</strong><br>
        <span style="font-size: 12px; color: #64748b;">Nebo, Caernarfon, Gwynedd, LL54 6EG • Eryri / Snowdonia National Park</span>
      </p>
    </div>
    <div class="footer">
      Plas Hafod Cottage & Bryn Bugeiliaid Bach<br>
      Website: <a href="https://plashafodcottage.co.uk" style="color: #99a0c1;">plashafodcottage.co.uk</a> • Email: <a href="mailto:info@plashafodcottage.co.uk" style="color: #99a0c1;">info@plashafodcottage.co.uk</a>
    </div>
  </div>
</body>
</html>
`;
}

export function generateOwnerContactAlertHtml(data: ContactEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f9; color: #333333; margin: 0; padding: 20px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background: #323149; color: #ffffff; padding: 24px; text-align: center; }
    .content { padding: 24px; }
    .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 16px 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; }
    .footer { padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; background: #f8fafc; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2 style="margin: 0; font-size: 20px;">New Website Contact Message</h2>
    </div>
    <div class="content">
      <p style="font-size: 14px; margin-top: 0;"><strong>From:</strong> ${data.name} (<a href="mailto:${data.email}">${data.email}</a>)</p>
      ${data.phone ? `<p style="font-size: 14px;"><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>` : ''}
      ${data.subject ? `<p style="font-size: 14px;"><strong>Subject:</strong> ${data.subject}</p>` : ''}

      <div class="message-box">${data.message}</div>

      <p style="font-size: 13px; color: #64748b;">
        You can reply directly to this email to respond to ${data.name}.
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

export function generateVisitorContactAutoReplyHtml(data: ContactEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f9; color: #333333; margin: 0; padding: 20px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background: #323149; color: #ffffff; padding: 24px; text-align: center; }
    .content { padding: 24px; }
    .footer { padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; background: #f8fafc; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2 style="margin: 0; font-size: 20px;">Thank You for Contacting Us</h2>
      <p style="margin: 4px 0 0; font-size: 13px; color: #e2e8f0;">Bwthyn Plas Hafod Cottage & Bryn Bugeiliaid Bach</p>
    </div>
    <div class="content">
      <p style="font-size: 15px; margin-top: 0;">Dear ${data.name},</p>
      <p style="font-size: 14px; line-height: 1.6; color: #475569;">
        Thank you for getting in touch. We have received your message and will get back to you as soon as possible.
      </p>
      <div style="background: #f8fafc; border-left: 3px solid #99a0c1; padding: 12px 16px; margin: 16px 0; font-size: 13px; color: #64748b;">
        <strong>Your Message:</strong><br>
        <em>"${data.message}"</em>
      </div>
      <p style="font-size: 14px; margin-bottom: 0;">
        Warm regards,<br>
        <strong>Plas Hafod Cottage</strong><br>
        <span style="font-size: 12px; color: #64748b;">Eryri / Snowdonia National Park</span>
      </p>
    </div>
    <div class="footer">
      Plas Hafod Cottage • <a href="https://plashafodcottage.co.uk" style="color: #99a0c1;">plashafodcottage.co.uk</a>
    </div>
  </div>
</body>
</html>
`;
}
