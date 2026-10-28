import { NextResponse } from 'next/server';
import { cmsClient } from '@/cms/client';
import { sanityClient, isSanityLive } from '@/cms/sanity.client';
import { sendCheckInGuideEmail, sendBalanceReminderEmail } from '@/lib/email/resend';
import { BookingInquiry } from '@/cms/types';

export const dynamic = 'force-dynamic';

type InquiryRecord = BookingInquiry & { _id?: string };

function parseDateOnly(dateStr?: string): Date | null {
  if (!dateStr) return null;
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  }
  return new Date(dateStr);
}

function calculateDaysUntil(targetDate: Date): number {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const diffTime = target.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

async function patchSanityBooking(docId: string, patchData: Record<string, any>): Promise<boolean> {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  const projId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production';

  if (!docId || !token || !projId || projId === 'demo-project') {
    return false;
  }

  const sanityUrl = `https://${projId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`;
  try {
    const res = await fetch(sanityUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        mutations: [
          {
            patch: {
              id: docId,
              set: patchData,
            },
          },
        ],
      }),
    });
    return res.ok;
  } catch (err) {
    console.error(`Failed to patch Sanity booking ${docId}:`, err);
    return false;
  }
}

export async function GET(request: Request) {
  return handleAutomatedEmails(request);
}

export async function POST(request: Request) {
  return handleAutomatedEmails(request);
}

async function handleAutomatedEmails(request: Request) {
  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get('authorization') || '';
  const cronHeader = request.headers.get('x-cron-secret') || '';
  const secretParam = searchParams.get('secret') || '';

  const configuredSecret = process.env.CRON_SECRET || 'plas-hafod-cron-2026';
  const providedToken =
    authHeader.replace(/^Bearer\s+/i, '') || cronHeader || secretParam;

  // Verify authorization
  const isAuthorized =
    providedToken === configuredSecret ||
    process.env.NODE_ENV === 'development';

  if (!isAuthorized) {
    return NextResponse.json(
      { error: 'Unauthorized: Invalid or missing CRON_SECRET.' },
      { status: 401 }
    );
  }

  const dryRun = searchParams.get('dryRun') === 'true';
  const force = searchParams.get('force') === 'true';
  const targetInquiryId = searchParams.get('inquiryId');
  const targetAction = searchParams.get('action'); // 'checkin' | 'balance'

  try {
    const siteSettings = await cmsClient.getSiteSettings(false);
    const checkInDays = siteSettings.checkInDaysBeforeArrival ?? 30;
    const balanceDays = siteSettings.balanceReminderDaysBeforeArrival ?? 60;

    // Fetch bookings to evaluate
    let bookings: InquiryRecord[] = [];

    if (targetInquiryId) {
      if (isSanityLive && sanityClient) {
        try {
          const doc = await sanityClient.fetch(
            `*[_type == "bookingInquiry" && (_id == $targetInquiryId || id == $targetInquiryId)][0]`,
            { targetInquiryId }
          );
          if (doc) bookings = [doc];
        } catch (_) {}
      }
      if (bookings.length === 0) {
        const all = await cmsClient.getBookingInquiries();
        const found = all.find((b) => b.id === targetInquiryId || (b as InquiryRecord)._id === targetInquiryId);
        if (found) bookings = [found as InquiryRecord];
      }
    } else if (isSanityLive && sanityClient) {
      try {
        const query = `*[_type == "bookingInquiry" && status in ["confirmed", "deposit_requested"] && defined(checkIn)]`;
        bookings = await sanityClient.fetch(query);
      } catch (err) {
        console.warn('Could not query active bookings from Sanity, falling back to client:', err);
        bookings = (await cmsClient.getBookingInquiries()) as InquiryRecord[];
      }
    } else {
      bookings = (await cmsClient.getBookingInquiries()) as InquiryRecord[];
    }

    const evaluated: any[] = [];
    const actionsTaken: any[] = [];

    for (const booking of bookings) {
      const docId = booking._id || booking.id;
      if (!booking.checkIn || !booking.guestEmail || !docId) continue;

      const checkInDate = parseDateOnly(booking.checkIn);
      if (!checkInDate) continue;

      const daysUntil = calculateDaysUntil(checkInDate);
      const isPlasHafod = booking.propertyId !== 'bryn-bugeiliaid-bach';
      const propertyTitle = isPlasHafod ? 'Plas Hafod Cottage' : 'Bryn Bugeiliaid Bach';

      const logEntry: Record<string, any> = {
        id: docId,
        guest: booking.guestName,
        email: booking.guestEmail,
        checkIn: booking.checkIn,
        daysUntil,
        status: booking.status,
        finalBalancePaid: Boolean(booking.finalBalancePaid),
      };

      evaluated.push(logEntry);

      // Check-In Guide Action (Trigger when within check-in window and balance is paid)
      const isWithinCheckInWindow = daysUntil <= checkInDays && daysUntil >= 0;
      const shouldTriggerCheckIn =
        (targetAction === 'checkin' || (isWithinCheckInWindow && booking.finalBalancePaid)) &&
        (force || booking.checkInEmailStatus !== 'sent');

      if (shouldTriggerCheckIn) {
        const defaultKeySafe = isPlasHafod
          ? (siteSettings.plasHafodKeySafe || 'Unlocked (Key inside)')
          : (siteSettings.bbbKeySafe || 'Unlocked (Key inside)');
        const keySafeCode = booking.keySafeCodeOverride || defaultKeySafe;

        const emailData = {
          propertyTitle,
          propertyId: booking.propertyId || 'plas-hafod',
          guestName: booking.guestName,
          guestEmail: booking.guestEmail,
          guestPhone: booking.guestPhone,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          totalNights: booking.totalNights || 1,
          adults: booking.adults || 2,
          children: booking.children || 0,
          pets: booking.pets || 0,
          keySafeCode,
          wifiSsid: isPlasHafod ? siteSettings.plasHafodWifiSsid : siteSettings.bbbWifiSsid,
          wifiPassword: isPlasHafod ? siteSettings.plasHafodWifiPassword : siteSettings.bbbWifiPassword,
          directions: siteSettings.checkInDirectionsEn,
          wasteInstructions: siteSettings.wasteBinInstructionsEn,
          checkInTime: siteSettings.checkInTime || '4:00 PM',
          checkOutTime: siteSettings.checkOutTime || '10:00 AM',
          emergencyPhone: siteSettings.emergencyHostPhone || siteSettings.phone,
          hostNames: siteSettings.hostNames || 'Siwsan & Neil',
          inquiryId: docId,
        };

        if (!dryRun) {
          const sendResult = await sendCheckInGuideEmail(emailData, false);
          if (sendResult.success) {
            const sentAt = new Date().toISOString();
            await patchSanityBooking(docId, {
              checkInEmailStatus: 'sent',
              checkInEmailSentAt: sentAt,
            });
            booking.checkInEmailStatus = 'sent';
            booking.checkInEmailSentAt = sentAt;
            actionsTaken.push({
              docId,
              guest: booking.guestName,
              action: 'CHECK_IN_GUIDE_SENT',
              keySafeCode,
              daysUntil,
            });
          } else {
            actionsTaken.push({
              docId,
              guest: booking.guestName,
              action: 'CHECK_IN_GUIDE_FAILED',
              error: sendResult.error,
            });
          }
        } else {
          actionsTaken.push({
            docId,
            guest: booking.guestName,
            action: 'CHECK_IN_GUIDE_SIMULATED',
            keySafeCode,
            daysUntil,
          });
        }
        continue;
      }

      // Balance Reminder Action (Trigger when within balance window and balance is NOT paid)
      const isWithinBalanceWindow = daysUntil <= balanceDays && daysUntil >= 0;
      const shouldTriggerBalanceReminder =
        (targetAction === 'balance' || (isWithinBalanceWindow && !booking.finalBalancePaid)) &&
        (force || booking.balanceReminderStatus !== 'sent');

      if (shouldTriggerBalanceReminder) {
        const emailData = {
          propertyTitle,
          propertyId: booking.propertyId || 'plas-hafod',
          guestName: booking.guestName,
          guestEmail: booking.guestEmail,
          guestPhone: booking.guestPhone,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          totalNights: booking.totalNights || 1,
          totalPrice: booking.calculatedTotal || booking.totalPrice || 0,
          depositPaid: booking.depositAmount || 0,
          balanceDue: booking.balanceDue || Math.max(0, (booking.totalPrice || 0) - (booking.depositAmount || 0)),
          paymentReference: booking.paymentReference || `PH-${(booking.checkIn || '').replace(/[^0-9]/g, '').slice(2, 6)}-${(booking.guestName || 'GUEST').split(/\s+/).pop()?.toUpperCase()}`,
          bankAccountName: siteSettings.bankAccountName || 'SIWSAN BRODA - Plas Hafod',
          bankName: siteSettings.bankName || 'Lloyds Bank',
          bankSortCode: siteSettings.bankSortCode || '77-48-24',
          bankAccountNumber: siteSettings.bankAccountNumber || '15999760',
          bankIban: siteSettings.bankIban,
          bankBic: siteSettings.bankBic,
          emergencyPhone: siteSettings.emergencyHostPhone || siteSettings.phone,
          hostNames: siteSettings.hostNames || 'Siwsan & Neil',
          inquiryId: docId,
        };

        if (!dryRun) {
          const sendResult = await sendBalanceReminderEmail(emailData, false);
          if (sendResult.success) {
            const sentAt = new Date().toISOString();
            await patchSanityBooking(docId, {
              balanceReminderStatus: 'sent',
              balanceReminderSentAt: sentAt,
            });
            booking.balanceReminderStatus = 'sent';
            booking.balanceReminderSentAt = sentAt;
            actionsTaken.push({
              docId,
              guest: booking.guestName,
              action: 'BALANCE_REMINDER_SENT',
              balanceDue: emailData.balanceDue,
              daysUntil,
            });
          } else {
            actionsTaken.push({
              docId,
              guest: booking.guestName,
              action: 'BALANCE_REMINDER_FAILED',
              error: sendResult.error,
            });
          }
        } else {
          actionsTaken.push({
            docId,
            guest: booking.guestName,
            action: 'BALANCE_REMINDER_SIMULATED',
            balanceDue: emailData.balanceDue,
            daysUntil,
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      dryRun,
      checkInDaysTrigger: checkInDays,
      balanceDaysTrigger: balanceDays,
      totalEvaluated: evaluated.length,
      actionsDispatched: actionsTaken.length,
      actions: actionsTaken,
      evaluatedSummary: evaluated,
    });
  } catch (error: unknown) {
    console.error('Error executing automated emails cron:', error);
    const msg = error instanceof Error ? error.message : 'Internal error processing automated emails.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
