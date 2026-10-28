import { NextResponse } from 'next/server';
import { cmsClient } from '@/cms/client';
import { getResendClient, getEmailConfig } from '@/lib/email/resend';
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
  BookingEmailData,
  ContactEmailData,
  DepositRequestEmailData,
} from '@/lib/email/templates';

export const dynamic = 'force-dynamic';

function getMockBookingData(propertyTitle: string): BookingEmailData {
  const checkIn = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const checkOut = new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  return {
    propertyTitle,
    guestName: 'Jane Doe',
    guestEmail: 'jane.doe@example.com',
    guestPhone: '+44 (0) 7123 456 789',
    checkIn,
    checkOut,
    totalNights: 4,
    adults: 2,
    children: 1,
    pets: 1,
    totalPrice: 620,
    depositAmount: 155,
    balanceDue: 465,
    appliedDiscountName: 'Autumn Getaway Special 10%',
    discountAmount: 65,
    notes: 'Looking forward to hiking in Snowdonia! We will be arriving by car on Friday afternoon.',
    inquiryId: 'sample-inquiry-2026',
  };
}

function getMockContactData(): ContactEmailData {
  return {
    name: 'David Morgan',
    email: 'david.morgan@example.cymru',
    phone: '+44 (0) 7987 654 321',
    subject: 'Question regarding pet facilities & enclosed garden',
    message:
      'Shwmae Siwsan & Neil,\n\nWe are looking to book a stay with our Golden Retriever in November. Could you confirm if the garden is fully enclosed and if there are good walking trails directly from the front door?\n\nDiolch yn fawr,\nDavid',
    submittedAt: new Date().toISOString(),
  };
}

function getMockDepositData(propertyTitle: string, siteSettings: any): DepositRequestEmailData {
  const booking = getMockBookingData(propertyTitle);
  return {
    ...booking,
    paymentReference: propertyTitle.includes('Bryn') ? 'BBB-2611-MORGAN' : 'PH-2611-MORGAN',
    bankAccountName: siteSettings.bankAccountName || 'Plas Hafod Cottage',
    bankName: siteSettings.bankName || 'Barclays Bank UK',
    bankSortCode: siteSettings.bankSortCode || '20-00-00',
    bankAccountNumber: siteSettings.bankAccountNumber || '12345678',
    bankIban: siteSettings.bankIban || 'GB29 BUKB 2000 0012 3456 78',
    bankBic: siteSettings.bankBic || 'BUKBGB22',
    holdHours: siteSettings.depositHoldHours || 48,
    depositDeadline: 'Friday, 13 Nov, 12:00 pm',
    depositInstructions: siteSettings.depositInstructions,
    customHostNote:
      'We are delighted to reserve these November dates for you! Please let us know if you need any recommendations for local dining in Penygroes, Caernarfon, or the surrounding area.',
    hostNames: siteSettings.hostNames || 'Siwsan & Neil',
    contactPhone: siteSettings.emergencyHostPhone || siteSettings.phone,
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const template = searchParams.get('template') || 'guest-confirmation';
    const lang = searchParams.get('lang') === 'cy' ? 'cy' : 'en';
    const isCymraeg = lang === 'cy';
    const property = searchParams.get('property') === 'bbb' ? 'bryn-bugeiliaid-bach' : 'plas-hafod';
    const propertyTitle = property === 'bryn-bugeiliaid-bach' ? 'Bryn Bugeiliaid Bach' : 'Plas Hafod Cottage';

    const siteSettings = await cmsClient.getSiteSettings(isCymraeg);

    let html = '';

    switch (template) {
      case 'owner-booking':
        html = generateOwnerBookingAlertHtml(getMockBookingData(propertyTitle), siteSettings);
        break;
      case 'owner-contact':
        html = generateOwnerContactAlertHtml(getMockContactData(), siteSettings);
        break;
      case 'visitor-contact':
        html = generateVisitorContactAutoReplyHtml(getMockContactData(), siteSettings, isCymraeg);
        break;
      case 'deposit-request':
        html = generateDepositRequestHtml(getMockDepositData(propertyTitle, siteSettings), siteSettings);
        break;
      case 'guest-confirmation':
      default:
        html = generateGuestConfirmationHtml(getMockBookingData(propertyTitle), siteSettings, isCymraeg);
        break;
    }

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      templateType = 'guest-confirmation',
      recipientEmail,
      lang = 'en',
      property = 'plas-hafod',
    } = body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!recipientEmail || !emailRegex.test(recipientEmail.trim())) {
      return NextResponse.json(
        { error: 'Please provide a valid recipient email address.' },
        { status: 400 }
      );
    }

    const isCymraeg = lang === 'cy';
    const propertyTitle = property === 'bbb' || property === 'bryn-bugeiliaid-bach' ? 'Bryn Bugeiliaid Bach' : 'Plas Hafod Cottage';
    const siteSettings = await cmsClient.getSiteSettings(isCymraeg);

    const client = getResendClient();
    const { fromEmail } = getEmailConfig();

    if (!client) {
      return NextResponse.json(
        {
          error:
            'RESEND_API_KEY is not configured on the server. Please check Cloudflare / local environment secrets.',
        },
        { status: 500 }
      );
    }

    let html = '';
    let text = '';
    let subject = '';

    switch (templateType) {
      case 'owner-booking': {
        const data = getMockBookingData(propertyTitle);
        html = generateOwnerBookingAlertHtml(data, siteSettings);
        text = generateOwnerBookingAlertText(data, siteSettings);
        subject = `🔔 [TEST PREVIEW] New Booking Inquiry: ${propertyTitle} from ${data.guestName}`;
        break;
      }
      case 'owner-contact': {
        const data = getMockContactData();
        html = generateOwnerContactAlertHtml(data, siteSettings);
        text = generateOwnerContactAlertText(data, siteSettings);
        subject = `📬 [TEST PREVIEW] Website Message: ${data.subject} from ${data.name}`;
        break;
      }
      case 'visitor-contact': {
        const data = getMockContactData();
        html = generateVisitorContactAutoReplyHtml(data, siteSettings, isCymraeg);
        text = generateVisitorContactAutoReplyText(data, siteSettings, isCymraeg);
        subject = isCymraeg
          ? `[PRAWF PREVIEW] Diolch am Gysylltu â ${propertyTitle}`
          : `[TEST PREVIEW] Thank You for Contacting ${propertyTitle}`;
        break;
      }
      case 'deposit-request': {
        const data = getMockDepositData(propertyTitle, siteSettings);
        html = generateDepositRequestHtml(data, siteSettings);
        text = generateDepositRequestText(data, siteSettings);
        subject = `🏦 [TEST PREVIEW] Deposit Request – Secure Your Stay at ${propertyTitle}`;
        break;
      }
      case 'guest-confirmation':
      default: {
        const data = getMockBookingData(propertyTitle);
        html = generateGuestConfirmationHtml(data, siteSettings, isCymraeg);
        text = generateGuestConfirmationText(data, siteSettings, isCymraeg);
        subject = isCymraeg
          ? `✨ [PRAWF PREVIEW] Cais Archebu wedi’i Dderbyn – ${propertyTitle}`
          : `✨ [TEST PREVIEW] Booking Request Received – ${propertyTitle}`;
        break;
      }
    }

    const resendResult = await client.emails.send({
      from: fromEmail,
      to: recipientEmail.trim(),
      subject,
      html,
      text,
    });

    if (resendResult.error) {
      console.error('Test email send error:', resendResult.error);
      return NextResponse.json(
        { error: resendResult.error.message || 'Resend failed to deliver test email.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: resendResult.data?.id,
      recipientEmail: recipientEmail.trim(),
      subject,
      templateType,
    });
  } catch (err: any) {
    console.error('Test email dispatch exception:', err);
    return NextResponse.json(
      { error: err?.message || 'Internal server error dispatching test email.' },
      { status: 500 }
    );
  }
}
