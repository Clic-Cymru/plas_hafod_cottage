import fs from 'fs';
import {
  generateOwnerBookingAlertHtml,
  generateGuestConfirmationHtml,
  generateOwnerContactAlertHtml,
  generateVisitorContactAutoReplyHtml,
  generateDepositRequestHtml,
  generateOwnerBookingAlertText,
  generateGuestConfirmationText,
  generateOwnerContactAlertText,
  generateVisitorContactAutoReplyText,
  generateDepositRequestText,
} from '../src/lib/email/templates.ts';
import { Resend } from 'resend';

const sampleSettings = {
  siteTitle: 'Bwthyn Plas Hafod Cottage & Bryn Bugeiliaid Bach',
  hostNames: 'Siwsan & Neil',
  email: 'info@plashafodcottage.co.uk',
  phone: '+44 (0) 1286 880 000',
  emergencyHostPhone: '+44 (0) 7900 123 456',
  checkInTime: '4:00 PM',
  checkOutTime: '10:00 AM',
  depositPercentage: 25,
  depositHoldHours: 48,
  bankAccountName: 'Plas Hafod Cottage',
  bankName: 'Barclays Bank UK',
  bankSortCode: '20-00-00',
  bankAccountNumber: '12345678',
  bankIban: 'GB29 BUKB 2000 0012 3456 78',
  bankBic: 'BUKBGB22',
  depositInstructions: 'Please quote reference on your transfer.',
  guestBookingEmailWelcomeEn: 'Thank you for your inquiry to stay with us at {property}. We have received your booking request and our team is reviewing availability.',
  guestBookingEmailWelcomeCy: 'Diolch am eich ymholiad i aros gyda ni yn {property}. Rydym wedi derbyn eich cais archebu.',
  guestBookingEmailNextStepsEn: 'We will review your requested dates and contact you shortly with confirmation and secure deposit payment details.',
  guestBookingEmailNextStepsCy: 'Byddwn yn adolygu eich dyddiadau gofynnol ac yn cysylltu â chi’n fuan gyda chadarnhad a manylion talu blaendal diogel.',
  guestContactEmailReplyEn: 'Thank you for getting in touch with us. We have received your inquiry and will respond to you within 24 hours.',
  guestContactEmailReplyCy: 'Diolch am gysylltu â ni. Rydym wedi derbyn eich neges a byddwn yn ymateb cyn pen 24 awr.',
};

// Load .env.local if present
let envVars = {};
if (fs.existsSync('.env.local')) {
  const envFile = fs.readFileSync('.env.local', 'utf8');
  envVars = Object.fromEntries(
    envFile
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('#') && l.includes('='))
      .map((l) => {
        const idx = l.indexOf('=');
        return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
      })
  );
}

const apiKey = envVars.RESEND_API_KEY || process.env.RESEND_API_KEY;
const fromEmail = envVars.RESEND_FROM_EMAIL || 'Plas Hafod Cottage <info@plashafodcottage.co.uk>';
const notificationEmail = envVars.NOTIFICATION_EMAIL || 'info@plashafodcottage.co.uk';

const shouldSend = process.argv.includes('--send');
const targetArg = process.argv.find((a) => a.startsWith('--to='));
const targetRecipient = targetArg ? targetArg.split('=')[1] : notificationEmail;

console.log('=====================================================');
console.log('   PLAS HAFOD COTTAGE — EMAIL TEMPLATE TEST SUITE');
console.log('=====================================================');
console.log(`Live Mode: ${shouldSend ? 'YES (Sending live emails)' : 'NO (Dry run render verification)'}`);
if (shouldSend) {
  console.log(`Target Recipient: ${targetRecipient}`);
}

const mockBooking = {
  propertyTitle: 'Plas Hafod Cottage',
  guestName: 'Gwynfor Evans',
  guestEmail: targetRecipient,
  guestPhone: '+44 (0) 7900 654 321',
  checkIn: '2026-11-12',
  checkOut: '2026-11-16',
  totalNights: 4,
  adults: 2,
  children: 1,
  pets: 1,
  totalPrice: 620,
  depositAmount: 155,
  balanceDue: 465,
  appliedDiscountName: 'Late Autumn Getaway (10%)',
  discountAmount: 65,
  notes: 'We are bringing one well-behaved Welsh Collie. Looking forward to our stay!',
  inquiryId: 'ph-inq-test-9921',
};

const mockContact = {
  name: 'Catrin Jones',
  email: targetRecipient,
  phone: '+44 (0) 7123 999 888',
  subject: 'Winter dates inquiry for Bryn Bugeiliaid Bach',
  message: 'Shwmae Siwsan & Neil,\nAre logs provided for the woodburner upon arrival?\nDiolch!',
  submittedAt: new Date().toISOString(),
};

const mockDeposit = {
  ...mockBooking,
  paymentReference: 'PH-2611-EVANS',
  bankAccountName: sampleSettings.bankAccountName || 'Plas Hafod Cottage',
  bankName: sampleSettings.bankName || 'Barclays Bank UK',
  bankSortCode: sampleSettings.bankSortCode || '20-00-00',
  bankAccountNumber: sampleSettings.bankAccountNumber || '12345678',
  bankIban: sampleSettings.bankIban || 'GB29 BUKB 2000 0012 3456 78',
  bankBic: sampleSettings.bankBic || 'BUKBGB22',
  holdHours: 48,
  depositDeadline: 'Thursday, 12 Nov, 4:00 pm',
  depositInstructions: sampleSettings.depositInstructions,
  customHostNote: 'Looking forward to welcoming you to Snowdonia!',
  hostNames: sampleSettings.hostNames || 'Siwsan & Neil',
  contactPhone: sampleSettings.emergencyHostPhone || sampleSettings.phone,
};

// 1. Verify Guest Confirmation (EN & CY)
console.log('\n[1/5] Testing Guest Booking Confirmation Template...');
const guestHtmlEn = generateGuestConfirmationHtml(mockBooking, sampleSettings, false);
const guestTextEn = generateGuestConfirmationText(mockBooking, sampleSettings, false);
const guestHtmlCy = generateGuestConfirmationHtml(mockBooking, sampleSettings, true);
console.log(`  ✓ Rendered English HTML (${guestHtmlEn.length} bytes) and Text (${guestTextEn.length} bytes)`);
console.log(`  ✓ Rendered Welsh HTML (${guestHtmlCy.length} bytes)`);

// 2. Verify Owner Booking Alert
console.log('\n[2/5] Testing Owner Booking Alert Template...');
const ownerAlertHtml = generateOwnerBookingAlertHtml(mockBooking, sampleSettings);
const ownerAlertText = generateOwnerBookingAlertText(mockBooking, sampleSettings);
console.log(`  ✓ Rendered Owner Alert HTML (${ownerAlertHtml.length} bytes) and Text (${ownerAlertText.length} bytes)`);

// 3. Verify Deposit Request (BACS)
console.log('\n[3/5] Testing Guest Deposit Request (BACS) Template...');
const depositHtml = generateDepositRequestHtml(mockDeposit, sampleSettings);
const depositText = generateDepositRequestText(mockDeposit, sampleSettings);
console.log(`  ✓ Rendered Deposit Request HTML (${depositHtml.length} bytes) and Text (${depositText.length} bytes)`);

// 4. Verify Visitor Contact Auto-Reply (EN & CY)
console.log('\n[4/5] Testing Visitor Contact Auto-Reply Template...');
const visitorHtmlEn = generateVisitorContactAutoReplyHtml(mockContact, sampleSettings, false);
const visitorTextEn = generateVisitorContactAutoReplyText(mockContact, sampleSettings, false);
const visitorHtmlCy = generateVisitorContactAutoReplyHtml(mockContact, sampleSettings, true);
console.log(`  ✓ Rendered English Auto-Reply HTML (${visitorHtmlEn.length} bytes) and Text (${visitorTextEn.length} bytes)`);
console.log(`  ✓ Rendered Welsh Auto-Reply HTML (${visitorHtmlCy.length} bytes)`);

// 5. Verify Owner Contact Message Alert
console.log('\n[5/5] Testing Owner Contact Alert Template...');
const contactAlertHtml = generateOwnerContactAlertHtml(mockContact, sampleSettings);
const contactAlertText = generateOwnerContactAlertText(mockContact, sampleSettings);
console.log(`  ✓ Rendered Owner Contact Message HTML (${contactAlertHtml.length} bytes) and Text (${contactAlertText.length} bytes)`);

console.log('\n🎉 All 5 email templates passed syntax & render validation successfully!');

if (shouldSend) {
  if (!apiKey) {
    console.error('\n❌ Cannot dispatch live emails: RESEND_API_KEY is missing from .env.local');
    process.exit(1);
  }

  const resend = new Resend(apiKey);

  async function dispatchSample() {
    console.log(`\n📡 Dispatching sample Guest Confirmation to: ${targetRecipient}...`);
    const res = await resend.emails.send({
      from: fromEmail,
      to: targetRecipient,
      subject: `✨ [TEST SUITE] Booking Request Received – ${mockBooking.propertyTitle}`,
      html: guestHtmlEn,
      text: guestTextEn,
    });

    if (res.error) {
      console.error('❌ Resend Error:', res.error);
    } else {
      console.log(`✅ Dispatched successfully! Resend ID: ${res.data?.id}`);
    }
  }

  dispatchSample().catch(console.error);
}
