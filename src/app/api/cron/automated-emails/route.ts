import { NextResponse } from 'next/server';
import { cmsClient } from '@/cms/client';
import { sanityClient, isSanityLive } from '@/cms/sanity.client';
import {
  sendCheckInGuideEmail,
  sendBalanceReminderEmail,
  sendCheckoutReminderEmail,
  sendReviewRequestEmail,
} from '@/lib/email/resend';
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
  const targetAction = searchParams.get('action'); // 'checkin' | 'balance' | 'checkout' | 'review'

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
        const query = `*[_type == "bookingInquiry" && status in ["confirmed", "deposit_requested", "completed"] && defined(checkIn)]`;
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

      const checkOutDate = parseDateOnly(booking.checkOut);
      const daysUntilCheckIn = calculateDaysUntil(checkInDate);
      const daysUntilCheckOut = checkOutDate ? calculateDaysUntil(checkOutDate) : null;
      const daysUntil = daysUntilCheckIn;
      const isPlasHafod = booking.propertyId !== 'bryn-bugeiliaid-bach';
      const propertyTitle = isPlasHafod ? 'Plas Hafod Cottage' : 'Bryn Bugeiliaid Bach';

      const logEntry: Record<string, any> = {
        id: docId,
        guest: booking.guestName,
        email: booking.guestEmail,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        daysUntilCheckIn,
        daysUntilCheckOut,
        status: booking.status,
        finalBalancePaid: Boolean(booking.finalBalancePaid),
        haltAutomatedPostStayEmails: Boolean(booking.haltAutomatedPostStayEmails),
      };

      evaluated.push(logEntry);

      // Check-In Guide Action (Trigger only when explicitly requested via action=checkin, NOT automated on timer because directions & check-in are sent immediately when marked complete/full payment received)
      const shouldTriggerCheckIn =
        targetAction === 'checkin' && (force || booking.checkInEmailStatus !== 'sent');

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
          directions: siteSettings.checkInDirectionsEn,
          wasteInstructions: siteSettings.wasteBinInstructionsEn,
          checkInTime: siteSettings.checkInTime || '3:00 PM',
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
        continue;
      }

      // Check-out Reminder Action (Trigger evening before checkout: daysUntilCheckOut === 1)
      const shouldTriggerCheckoutReminder =
        (targetAction === 'checkout' || targetAction === 'checkout_reminder' || (daysUntilCheckOut === 1 && booking.status === 'confirmed')) &&
        (force || booking.checkoutReminderStatus !== 'sent');

      if (shouldTriggerCheckoutReminder) {
        const emailData = {
          propertyTitle,
          propertyId: booking.propertyId || 'plas-hafod',
          guestName: booking.guestName,
          guestEmail: booking.guestEmail,
          checkOut: booking.checkOut || '',
          checkOutTime: siteSettings.checkOutTime || '10:00 AM',
          hostNames: siteSettings.hostNames || 'Siwsan & Neil',
          emergencyPhone: siteSettings.emergencyHostPhone || siteSettings.phone,
        };

        if (!dryRun) {
          const sendResult = await sendCheckoutReminderEmail(emailData, false);
          if (sendResult.success) {
            const sentAt = new Date().toISOString();
            await patchSanityBooking(docId, {
              checkoutReminderStatus: 'sent',
              checkoutReminderSentAt: sentAt,
            });
            booking.checkoutReminderStatus = 'sent';
            booking.checkoutReminderSentAt = sentAt;
            actionsTaken.push({
              docId,
              guest: booking.guestName,
              action: 'CHECKOUT_REMINDER_SENT',
              checkOut: booking.checkOut,
              daysUntilCheckOut,
            });
          } else {
            actionsTaken.push({
              docId,
              guest: booking.guestName,
              action: 'CHECKOUT_REMINDER_FAILED',
              error: sendResult.error,
            });
          }
        } else {
          actionsTaken.push({
            docId,
            guest: booking.guestName,
            action: 'CHECKOUT_REMINDER_SIMULATED',
            checkOut: booking.checkOut,
            daysUntilCheckOut,
          });
        }
        continue;
      }

      // Review Request Action (Trigger 1 week after stay: daysUntilCheckOut <= -7 && daysUntilCheckOut >= -14)
      if (booking.haltAutomatedPostStayEmails) {
        if (targetAction === 'review' || targetAction === 'review_request') {
          actionsTaken.push({
            docId,
            guest: booking.guestName,
            action: 'REVIEW_REQUEST_HALTED_BY_SANITY',
            reason: 'haltAutomatedPostStayEmails flag is set to true on booking document.',
          });
        }
      } else {
        const isWithinReviewWindow = daysUntilCheckOut !== null && daysUntilCheckOut <= -7 && daysUntilCheckOut >= -14;
        const isEligibleStatus = booking.status === 'confirmed' || booking.status === 'completed';
        const shouldTriggerReviewRequest =
          (targetAction === 'review' || targetAction === 'review_request' || (isWithinReviewWindow && isEligibleStatus)) &&
          (force || booking.reviewRequestStatus !== 'sent');

        if (shouldTriggerReviewRequest) {
          const emailData = {
            propertyTitle,
            propertyId: booking.propertyId || 'plas-hafod',
            guestName: booking.guestName,
            guestEmail: booking.guestEmail,
            checkOut: booking.checkOut || '',
            hostNames: siteSettings.hostNames || 'Siwsan & Neil',
            reviewUrl: 'https://g.page/r/CbTWBi9K2SN0EBM/review',
          };

          if (!dryRun) {
            const sendResult = await sendReviewRequestEmail(emailData, false);
            if (sendResult.success) {
              const sentAt = new Date().toISOString();
              await patchSanityBooking(docId, {
                reviewRequestStatus: 'sent',
                reviewRequestSentAt: sentAt,
              });
              booking.reviewRequestStatus = 'sent';
              booking.reviewRequestSentAt = sentAt;
              actionsTaken.push({
                docId,
                guest: booking.guestName,
                action: 'REVIEW_REQUEST_SENT',
                daysSinceCheckout: daysUntilCheckOut ? -daysUntilCheckOut : null,
              });
            } else {
              actionsTaken.push({
                docId,
                guest: booking.guestName,
                action: 'REVIEW_REQUEST_FAILED',
                error: sendResult.error,
              });
            }
          } else {
            actionsTaken.push({
              docId,
              guest: booking.guestName,
              action: 'REVIEW_REQUEST_SIMULATED',
              daysSinceCheckout: daysUntilCheckOut ? -daysUntilCheckOut : null,
            });
          }
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
