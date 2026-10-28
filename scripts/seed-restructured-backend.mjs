import fs from 'fs';
import https from 'https';

// Load environment variables
const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach((line) => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      env[trimmed.substring(0, eqIdx).trim()] = trimmed.substring(eqIdx + 1).trim();
    }
  }
});

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET;
const token = env.SANITY_API_WRITE_TOKEN;

async function mutate(mutations) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ mutations });
    const req = https.request(
      `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Length': Buffer.byteLength(data),
        },
      },
      (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(body);
            resolve(parsed);
          } catch (e) {
            reject(new Error(`Failed to parse response: ${body}`));
          }
        });
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function seed() {
  console.log('Seeding restructured backend data into Sanity...');

  // 1. Shared Global Seasons
  const seasons = [
    {
      _id: 'season-summer-2026',
      _type: 'season',
      name: 'Summer Peak 2026',
      slug: { _type: 'slug', current: 'summer-peak-2026' },
      startDate: '2026-06-01',
      endDate: '2026-08-31',
      minStayDefault: 3,
      description: 'High summer season across Snowdonia and North Wales coast.',
    },
    {
      _id: 'season-autumn-2026',
      _type: 'season',
      name: 'Autumn Gold 2026',
      slug: { _type: 'slug', current: 'autumn-gold-2026' },
      startDate: '2026-09-01',
      endDate: '2026-10-31',
      minStayDefault: 2,
      description: 'Early autumn mountain hiking and peaceful foliage season.',
    },
    {
      _id: 'season-christmas-2026',
      _type: 'season',
      name: 'Festive Season (Christmas & New Year)',
      slug: { _type: 'slug', current: 'festive-christmas-new-year-2026' },
      startDate: '2026-12-20',
      endDate: '2027-01-05',
      minStayDefault: 3,
      description: 'Christmas and New Year holiday period with cozy log fires.',
    },
    {
      _id: 'season-spring-2027',
      _type: 'season',
      name: 'Spring Awakening 2027',
      slug: { _type: 'slug', current: 'spring-awakening-2027' },
      startDate: '2027-03-26',
      endDate: '2027-04-18',
      minStayDefault: 3,
      description: 'Easter and early spring holidays.',
    },
  ];

  // 2. Special Offers & Discounts
  const specialOffers = [
    {
      _id: 'offer-ph-weekly-12',
      _type: 'specialOffer',
      title: 'Full Week Retreat (7+ Nights) — Plas Hafod',
      code: 'WEEKLY12',
      propertyId: 'plas-hafod',
      discountType: 'percentage',
      value: 12,
      minNights: 7,
      active: true,
      description: 'Save 12% on full week bookings (7 or more nights) at Plas Hafod Cottage.',
    },
    {
      _id: 'offer-ph-fortnight-20',
      _type: 'specialOffer',
      title: 'Extended Mountain Stay (14+ Nights) — Plas Hafod',
      code: 'LONGSTAY20',
      propertyId: 'plas-hafod',
      discountType: 'percentage',
      value: 20,
      minNights: 14,
      active: true,
      description: 'Save 20% on extended 2-week stays at Plas Hafod Cottage.',
    },
    {
      _id: 'offer-bbb-weekly-10',
      _type: 'specialOffer',
      title: 'Full Week Annexe Retreat (7+ Nights) — Bryn Bugeiliaid Bach',
      code: 'BBBWEEKLY10',
      propertyId: 'bryn-bugeiliaid-bach',
      discountType: 'percentage',
      value: 10,
      minNights: 7,
      active: true,
      description: 'Save 10% on full week stays (7+ nights) at Bryn Bugeiliaid Bach.',
    },
    {
      _id: 'offer-bbb-fortnight-18',
      _type: 'specialOffer',
      title: 'Extended Annexe Stay (14+ Nights) — Bryn Bugeiliaid Bach',
      code: 'BBBLONG18',
      propertyId: 'bryn-bugeiliaid-bach',
      discountType: 'percentage',
      value: 18,
      minNights: 14,
      active: true,
      description: 'Save 18% on extended 14+ night bookings at Bryn Bugeiliaid Bach.',
    },
  ];

  // 3. The 7 Core E-mail Templates
  const emailTemplates = [
    {
      _id: 'email-admin-notification',
      _type: 'emailTemplate',
      title: 'Admin Notification (New Reservation)',
      templateKey: 'admin_notification',
      order: 1,
      targetAudience: 'admin',
      triggerTiming: 'Sent immediately to host when a guest submits a booking inquiry',
      subjectEn: 'New Reservation Inquiry: {guest_name} — {property}',
      subjectCy: 'Ymholiad Archebu Newydd: {guest_name} — {property}',
      headingEn: 'New Booking Inquiry Received',
      headingCy: 'Ymholiad Archebu Newydd wedi Cyrraedd',
      messageEn:
        'A new reservation inquiry has been submitted through the website for {property}.\n\nGuest Name: {guest_name}\nDates: {check_in} to {check_out} ({total_nights} nights)\nParty: {adults} Adults, {children} Children, {pets} Pets\nEstimated Total: £{total_price}\nDeposit Required: £{deposit_amount}\n\nPlease review availability in your Studio calendar and send the deposit request to lock in the dates.',
      messageCy:
        'Mae ymholiad archebu newydd wedi cyrraedd trwy’r wefan ar gyfer {property}.\n\nEnw’r Gwestai: {guest_name}\nDyddiadau: {check_in} i {check_out} ({total_nights} noson)\nCyfanswm Amcangyfrifedig: £{total_price}\n\nAdolygwch argaeledd yn eich calendr Sanity Studio a chliciwch i anfon y cais blaendal.',
      instructionsEn: 'Log in to Sanity Studio to accept this booking and trigger the deposit request email.',
      instructionsCy: 'Mewngofnodwch i Sanity Studio i dderbyn yr archeb hon ac anfon yr e-bost blaendal.',
    },
    {
      _id: 'email-pending-reservation',
      _type: 'emailTemplate',
      title: 'Pending Reservation (Customer Acknowledgment)',
      templateKey: 'pending_reservation',
      order: 2,
      targetAudience: 'guest',
      triggerTiming: 'Sent immediately to customer confirming inquiry is under review',
      subjectEn: 'Your reservation at {property} has been received and is pending confirmation',
      subjectCy: 'Mae eich archeb yn {property} wedi’i derbyn ac yn aros am gadarnhad',
      headingEn: 'Thank You For Your Booking Inquiry',
      headingCy: 'Diolch am Eich Ymholiad Archebu',
      messageEn:
        'Dear {guest_name},\n\nThank you for choosing to stay with us at {property}. We have received your booking request for {check_in} to {check_out} ({total_nights} nights).\n\nOur hosts, Siwsan & Neil, are reviewing calendar availability and will be in touch shortly with confirmation and secure BACS bank deposit details to finalize your reservation.',
      messageCy:
        'Annwyl {guest_name},\n\nDiolch am ddewis aros gyda ni yn {property}. Rydym wedi derbyn eich cais archebu ar gyfer {check_in} i {check_out} ({total_nights} noson).\n\nMae Siwsan a Neil yn adolygu argaeledd y calendr ac yn cysylltu â chi’n fuan gyda manylion talu blaendal.',
      instructionsEn:
        'No payment has been taken yet. Your selected dates are placed on provisional hold while we verify availability.',
      instructionsCy: 'Ni chymerwyd unrhyw daliad eto. Mae eich dyddiadau wedi’u cadw dros dro.',
    },
    {
      _id: 'email-deposit-request',
      _type: 'emailTemplate',
      title: 'Deposit Request & BACS Payment Instructions',
      templateKey: 'deposit_request',
      order: 3,
      targetAudience: 'guest',
      triggerTiming: 'Sent manually by host clicking "Send Deposit Request" in Sanity Studio',
      subjectEn: 'Please pay your deposit to secure your booking at {property}',
      subjectCy: 'Talwch eich blaendal i gadarnhau eich archeb yn {property}',
      headingEn: 'Your Booking Dates Are Provisionally Held',
      headingCy: 'Mae Eich Dyddiadau Archebu Wedi’u Cadw Dros Dro',
      messageEn:
        'Dear {guest_name},\n\nWe are delighted to confirm that your requested dates for {property} ({check_in} to {check_out}) are available!\n\nTo lock in your reservation and confirm your stay, please transfer the initial deposit of £{deposit_amount} via online bank transfer within 48 hours.\n\nBank Account Name: {bank_account_name}\nBank: {bank_name}\nSort Code: {bank_sort_code}\nAccount Number: {bank_account_number}\nPayment Reference: {payment_reference}',
      messageCy:
        'Annwyl {guest_name},\n\nRydym yn falch iawn o gadarnhau bod eich dyddiadau ar gyfer {property} ({check_in} i {check_out}) ar gael!\n\nI gadarnhau eich archeb, trosglwyddwch y blaendal cychwynnol o £{deposit_amount} trwy drosglwyddiad banc ar-lein o fewn 48 awr.\n\nEnw’r Cyfrif: {bank_account_name}\nCod Didoli: {bank_sort_code}\nRhif y Cyfrif: {bank_account_number}\nCyfeirnod Talu: {payment_reference}',
      instructionsEn:
        'IMPORTANT: Please quote your unique reference {payment_reference} on your transfer so we can instantly identify your payment and confirm your booking.',
      instructionsCy:
        'PWYSIG: Nodwch eich cyfeirnod unigryw {payment_reference} wrth drosglwyddo arian.',
    },
    {
      _id: 'email-deposit-receipt',
      _type: 'emailTemplate',
      title: 'Deposit Receipt & Dates Confirmed',
      templateKey: 'deposit_receipt',
      order: 4,
      targetAudience: 'guest',
      triggerTiming: 'Sent when deposit payment clears to confirm dates are locked in',
      subjectEn: '{property} — Deposit Receipt & Booking Confirmed',
      subjectCy: '{property} — Derbynneb Blaendal ac Archeb Wedi’i Chadarnhau',
      headingEn: 'Deposit Received — Your Stay is Confirmed!',
      headingCy: 'Blaendal wedi Cyrraedd — Mae Eich Arhosiad Wedi’i Gadarnhau!',
      messageEn:
        'Dear {guest_name},\n\nWe have received your deposit payment of £{deposit_amount} for your stay at {property} ({check_in} to {check_out}). Your reservation is now officially confirmed and the dates are locked in our master calendar!\n\nTotal Booking: £{total_price}\nDeposit Paid: £{deposit_amount}\nRemaining Balance: £{balance_due}\nBalance Due Date: 60 days before arrival ({balance_due_date})\n\nWe look forward to welcoming you to Snowdonia!',
      messageCy:
        'Annwyl {guest_name},\n\nRydym wedi derbyn eich blaendal o £{deposit_amount} ar gyfer eich arhosiad yn {property} ({check_in} i {check_out}). Mae eich archeb bellach wedi’i chadarnhau’n swyddogol!\n\nEdrychwn ymlaen at eich croesawu i Eryri!',
      instructionsEn: 'Keep this email for your records. We will send a balance reminder 60 days before your check-in date.',
      instructionsCy: 'Cadwch yr e-bost hwn er gwybodaeth.',
    },
    {
      _id: 'email-payment-due-reminder',
      _type: 'emailTemplate',
      title: 'Payment Due Reminder (60 Days)',
      templateKey: 'payment_due_reminder',
      order: 5,
      targetAudience: 'guest',
      triggerTiming: 'Sent 60 days before check-in for remaining balance',
      subjectEn: 'Payment now due for your upcoming stay at {property}',
      subjectCy: 'Taliad bellach yn ddyledus ar gyfer eich arhosiad yn {property}',
      headingEn: 'Final Balance Reminder',
      headingCy: 'Nodyn Atgoffa am y Balans Terfynol',
      messageEn:
        'Dear {guest_name},\n\nYour upcoming holiday at {property} is getting closer! Your stay begins in 60 days on {check_in}.\n\nAs per our booking terms, the remaining balance of £{balance_due} is now due.\n\nPlease transfer £{balance_due} to:\nBank: {bank_name}\nSort Code: {bank_sort_code}\nAccount: {bank_account_number}\nReference: {payment_reference}',
      messageCy:
        'Annwyl {guest_name},\n\nMae eich gwyliau ar fin cyrraedd! Mae’r balans sy’n weddill o £{balance_due} bellach yn ddyledus ar gyfer eich arhosiad yn {property}.\n\nTrosglwyddwch £{balance_due} gan ddefnyddio’r cyfeirnod {payment_reference}.',
      instructionsEn: 'Once received, we will issue your Full Payment Receipt and send your arrival directions.',
      instructionsCy: 'Ar ôl derbyn y taliad, byddwn yn anfon eich derbynneb derfynol a chyfarwyddiadau cyrraedd.',
    },
    {
      _id: 'email-directions-guide',
      _type: 'emailTemplate',
      title: 'Directions Email & Arrival Guide (30 Days)',
      templateKey: 'directions_guide',
      order: 6,
      targetAudience: 'guest',
      triggerTiming: 'Sent 30 days before check-in to confirmed guests with driving & arrival instructions',
      subjectEn: 'Your upcoming stay at {property} — Directions & Arrival Guide',
      subjectCy: 'Eich arhosiad yn {property} — Cyfarwyddiadau Cyrraedd a Chanllaw',
      headingEn: 'Everything You Need for Arrival',
      headingCy: 'Popeth Sydd Ei Angen ar Gyfer Cyrraedd',
      messageEn:
        'Dear {guest_name},\n\nWe are looking forward to welcoming you to {property} on {check_in}!\n\nStandard Check-in Time: 4:00 PM\nStandard Check-out Time: 10:00 AM\n\nDirections:\nPlas Hafod Cottage is located in the peaceful village of Nebo, near Caernarfon (Postcode: LL54 6EE). As you arrive in Nebo, follow the country lane signs for Plas Hafod.\n\nKey Safe & Entry:\nThe key safe code and parking details will be sent via SMS / WhatsApp 24 hours prior to your arrival.',
      messageCy:
        'Annwyl {guest_name},\n\nRydym yn edrych ymlaen at eich croesawu i {property} ar {check_in}!\n\nAmser Cyrraedd: 4:00 PM\nAmser Gadael: 10:00 AM\n\nCyfeiriad: LL54 6EE, Nebo, ger Caernarfon.',
      instructionsEn: 'Host Contact: Siwsan & Neil (+44 7900 123 456). Please let us know your estimated arrival time!',
      instructionsCy: 'Ffôn y Lletywyr: Siwsan a Neil (+44 7900 123 456).',
    },
    {
      _id: 'email-full-payment-receipt',
      _type: 'emailTemplate',
      title: 'Full Payment Receipt',
      templateKey: 'full_payment_receipt',
      order: 7,
      targetAudience: 'guest',
      triggerTiming: 'Sent once final balance is cleared, showing zero balance due',
      subjectEn: '{property} — Full Payment Receipt (Balance Cleared)',
      subjectCy: '{property} — Derbynneb Taliad Llawn (Balans wedi’i Glirio)',
      headingEn: 'Full Payment Cleared — You’re All Set!',
      headingCy: 'Taliad Llawn wedi Cyrraedd — Popeth yn Barod!',
      messageEn:
        'Dear {guest_name},\n\nWe have received your final balance payment of £{balance_due} for your booking at {property} ({check_in} to {check_out}).\n\nYour account is now paid in full with zero balance remaining. Everything is ready for your stay and we cannot wait to host you in beautiful Snowdonia!',
      messageCy:
        'Annwyl {guest_name},\n\nRydym wedi derbyn eich taliad terfynol o £{balance_due} ar gyfer eich archeb yn {property} ({check_in} to {check_out}). Mae eich cyfrif wedi’i dalu’n llawn.',
      instructionsEn: 'All set! Have a wonderful trip and travel safely.',
      instructionsCy: 'Teithiwch yn ddiogel ac edrychwn ymlaen at eich gweld.',
    },
  ];

  // 4. Update Cottage Pricing Configurations to link with Seasons
  const pricingPlasHafodUpdate = {
    _id: 'pricing-plas-hafod',
    _type: 'pricingConfig',
    propertyId: 'plas-hafod',
    baseRate: 175,
    minStayDefault: 2,
    depositPercentage: 25,
    cleaningFee: 45,
    seasonalRates: [
      {
        _key: 'rate-ph-summer-2026',
        season: { _type: 'reference', _ref: 'season-summer-2026' },
        nightlyRate: 245,
        minStay: 3,
        notes: 'High summer peak tariff',
      },
      {
        _key: 'rate-ph-autumn-2026',
        season: { _type: 'reference', _ref: 'season-autumn-2026' },
        nightlyRate: 195,
        minStay: 2,
        notes: 'Autumn gold tariff',
      },
      {
        _key: 'rate-ph-christmas-2026',
        season: { _type: 'reference', _ref: 'season-christmas-2026' },
        nightlyRate: 285,
        minStay: 4,
        notes: 'Christmas and New Year festive peak',
      },
    ],
  };

  const pricingBBBUpdate = {
    _id: 'pricing-bryn-bugeiliaid-bach',
    _type: 'pricingConfig',
    propertyId: 'bryn-bugeiliaid-bach',
    baseRate: 145,
    minStayDefault: 2,
    depositPercentage: 25,
    cleaningFee: 35,
    seasonalRates: [
      {
        _key: 'rate-bbb-summer-2026',
        season: { _type: 'reference', _ref: 'season-summer-2026' },
        nightlyRate: 195,
        minStay: 3,
        notes: 'Summer peak tariff for annexe',
      },
      {
        _key: 'rate-bbb-autumn-2026',
        season: { _type: 'reference', _ref: 'season-autumn-2026' },
        nightlyRate: 160,
        minStay: 2,
        notes: 'Autumn gold tariff for annexe',
      },
      {
        _key: 'rate-bbb-christmas-2026',
        season: { _type: 'reference', _ref: 'season-christmas-2026' },
        nightlyRate: 225,
        minStay: 3,
        notes: 'Festive season tariff for annexe',
      },
    ],
  };

  // Build mutations
  const mutations = [
    // Create or replace seasons
    ...seasons.map((s) => ({ createOrReplace: s })),
    // Create or replace special offers
    ...specialOffers.map((o) => ({ createOrReplace: o })),
    // Create or replace email templates
    ...emailTemplates.map((t) => ({ createOrReplace: t })),
    // Patch pricing configs with seasonalRates
    {
      patch: {
        id: 'pricing-plas-hafod',
        set: {
          seasonalRates: pricingPlasHafodUpdate.seasonalRates,
          minStayDefault: pricingPlasHafodUpdate.minStayDefault,
        },
      },
    },
    {
      patch: {
        id: 'pricing-bryn-bugeiliaid-bach',
        set: {
          seasonalRates: pricingBBBUpdate.seasonalRates,
          minStayDefault: pricingBBBUpdate.minStayDefault,
        },
      },
    },
  ];

  const res = await mutate(mutations);
  console.log('Successfully seeded restructured backend data:', res);
}

seed().catch(console.error);
