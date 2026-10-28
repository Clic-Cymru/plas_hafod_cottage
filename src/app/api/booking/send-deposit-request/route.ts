import { NextResponse } from 'next/server';
import { cmsClient } from '@/cms/client';
import { sanityClient, isSanityLive } from '@/cms/sanity.client';
import { sendDepositRequestEmail } from '@/lib/email/resend';
import { BookingInquiry } from '@/cms/types';

export const dynamic = 'force-dynamic';

type InquiryRecord = BookingInquiry & { _id?: string };

function generatePaymentReference(propertyId: string | undefined, guestName: string, checkIn: string): string {
  const prefix = propertyId === 'bryn-bugeiliaid-bach' ? 'BBB' : 'PH';
  const nameParts = (guestName || 'GUEST').trim().split(/\s+/);
  const lastName = nameParts[nameParts.length - 1].replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 8);
  const dateStr = (checkIn || '').replace(/[^0-9]/g, '').slice(2, 6); // e.g. 2611 for Nov 2026
  return `${prefix}-${dateStr || '26'}-${lastName || 'GUEST'}`;
}

function formatDeadlineUK(hoursAhead: number): string {
  const d = new Date(Date.now() + hoursAhead * 60 * 60 * 1000);
  return d.toLocaleString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      inquiryId,
      customNote,
      bankDetailsOverride,
      inquiryData: directData,
    } = body;

    if (!inquiryId && !directData) {
      return NextResponse.json(
        { error: 'Missing inquiryId or inquiryData' },
        { status: 400 }
      );
    }

    // 1. Fetch Inquiry Record
    let inquiry: InquiryRecord | null = null;
    let sanityDocId: string | null = null;

    if (inquiryId && isSanityLive && sanityClient) {
      try {
        const query = `*[_type == "bookingInquiry" && (_id == $inquiryId || id == $inquiryId)][0]`;
        inquiry = await sanityClient.fetch(query, { inquiryId });
        if (inquiry) {
          sanityDocId = inquiry._id || null;
        }
      } catch (err) {
        console.warn('Could not fetch inquiry from Sanity:', err);
      }
    }

    // Fallback to direct data provided by caller or in-memory store
    if (!inquiry && directData) {
      inquiry = directData as InquiryRecord;
      sanityDocId = directData._id || directData.id || null;
    }

    if (!inquiry && inquiryId) {
      const allInquiries = await cmsClient.getBookingInquiries();
      inquiry = (allInquiries.find((i) => i.id === inquiryId || (i as InquiryRecord)._id === inquiryId) as InquiryRecord) || null;
      if (inquiry) {
        sanityDocId = inquiry._id || inquiry.id || null;
      }
    }

    if (!inquiry) {
      return NextResponse.json(
        { error: `Booking inquiry not found for ID: ${inquiryId}` },
        { status: 404 }
      );
    }

    // 2. Fetch Global Site Settings (Bank Details)
    const siteSettings = await cmsClient.getSiteSettings(false);

    const bankAccountName =
      bankDetailsOverride?.bankAccountName ||
      inquiry.customBankAccountName ||
      siteSettings.bankAccountName ||
      'SIWSAN BRODA - Plas Hafod';

    const bankName =
      bankDetailsOverride?.bankName ||
      inquiry.customBankName ||
      siteSettings.bankName ||
      'Lloyds Bank';

    const bankSortCode =
      bankDetailsOverride?.bankSortCode ||
      inquiry.customBankSortCode ||
      siteSettings.bankSortCode ||
      '77-48-24';

    const bankAccountNumber =
      bankDetailsOverride?.bankAccountNumber ||
      inquiry.customBankAccountNumber ||
      siteSettings.bankAccountNumber ||
      '15999760';

    const bankIban = bankDetailsOverride?.bankIban || siteSettings.bankIban;
    const bankBic = bankDetailsOverride?.bankBic || siteSettings.bankBic;
    const holdHours = Number(
      bankDetailsOverride?.depositHoldHours || siteSettings.depositHoldHours || 24
    );

    // 3. Generate or preserve unique payment reference
    const paymentReference =
      inquiry.paymentReference ||
      generatePaymentReference(inquiry.propertyId, inquiry.guestName, inquiry.checkIn);

    const propertyTitle =
      inquiry.propertyId === 'bryn-bugeiliaid-bach'
        ? 'Bryn Bugeiliaid Bach (Annexe)'
        : 'Plas Hafod Cottage';

    const depositDeadline = formatDeadlineUK(holdHours);

    // 4. Send Deposit Request Email via Resend
    const emailResult = await sendDepositRequestEmail({
      propertyTitle,
      guestName: inquiry.guestName,
      guestEmail: inquiry.guestEmail,
      guestPhone: inquiry.guestPhone,
      checkIn: inquiry.checkIn,
      checkOut: inquiry.checkOut,
      totalNights: inquiry.totalNights || 1,
      adults: Number(inquiry.adults || 2),
      children: Number(inquiry.children || 0),
      pets: Number(inquiry.pets || 0),
      totalPrice: Number(inquiry.calculatedTotal || inquiry.totalPrice || 0),
      depositAmount: Number(inquiry.depositAmount || 0),
      balanceDue: Number(inquiry.balanceDue || 0),
      appliedDiscountName: inquiry.appliedDiscountName,
      discountAmount: inquiry.discountAmount,
      inquiryId: inquiry.id || inquiryId,
      paymentReference,
      bankAccountName,
      bankName,
      bankSortCode,
      bankAccountNumber,
      bankIban,
      bankBic,
      holdHours,
      depositDeadline,
      depositInstructions: siteSettings.depositInstructions,
      customHostNote: customNote || inquiry.customDepositNote || undefined,
      hostNames: siteSettings.hostNames,
      contactPhone: siteSettings.phone,
    });

    if (!emailResult.success) {
      return NextResponse.json(
        { error: 'Failed to send deposit request email via Resend', details: emailResult.error },
        { status: 500 }
      );
    }

    const sentAt = new Date().toISOString();

    // 5. Update Status in Sanity via Mutation API
    const token = process.env.SANITY_API_WRITE_TOKEN;
    const projId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production';

    if (sanityDocId && projId && projId !== 'demo-project' && token) {
      const sanityUrl = `https://${projId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`;
      try {
        await fetch(sanityUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            mutations: [
              {
                patch: {
                  id: sanityDocId,
                  set: {
                    status: 'deposit_requested',
                    paymentReference,
                    depositSentAt: sentAt,
                    depositEmailStatus: 'sent',
                    customDepositNote: customNote || inquiry.customDepositNote || '',
                  },
                },
              },
            ],
          }),
        });
      } catch (err) {
        console.error('Failed to update Sanity mutation for deposit request:', err);
      }
    }

    // In-memory update
    inquiry.status = 'deposit_requested';
    inquiry.paymentReference = paymentReference;
    inquiry.depositSentAt = sentAt;
    inquiry.depositEmailStatus = 'sent';

    return NextResponse.json({
      success: true,
      inquiryId: inquiry.id || inquiryId,
      paymentReference,
      depositSentAt: sentAt,
      guestEmail: inquiry.guestEmail,
      message: `Deposit request email sent to ${inquiry.guestEmail} for reference ${paymentReference}.`,
    });
  } catch (error: unknown) {
    console.error('Deposit request error:', error);
    const msg = error instanceof Error ? error.message : 'Internal server error sending deposit request.';
    return NextResponse.json(
      { error: msg },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const inquiryId = searchParams.get('inquiryId');

    const siteSettings = await cmsClient.getSiteSettings(false);

    if (!inquiryId) {
      return NextResponse.json({
        defaultBankDetails: {
          bankAccountName: siteSettings.bankAccountName || 'SIWSAN BRODA - Plas Hafod',
          bankName: siteSettings.bankName || 'Lloyds Bank',
          bankSortCode: siteSettings.bankSortCode || '77-48-24',
          bankAccountNumber: siteSettings.bankAccountNumber || '15999760',
          bankIban: siteSettings.bankIban || '',
          bankBic: siteSettings.bankBic || '',
          depositHoldHours: siteSettings.depositHoldHours || 24,
        },
      });
    }

    let inquiry: InquiryRecord | null = null;
    if (isSanityLive && sanityClient) {
      try {
        const query = `*[_type == "bookingInquiry" && (_id == $inquiryId || id == $inquiryId)][0]`;
        inquiry = await sanityClient.fetch(query, { inquiryId });
      } catch (err) {
        console.warn('Error fetching inquiry for preview:', err);
      }
    }

    return NextResponse.json({
      inquiry,
      siteSettings,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
