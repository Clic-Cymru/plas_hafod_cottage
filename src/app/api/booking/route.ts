import { NextResponse } from 'next/server';
import { cmsClient } from '@/cms/client';
import { calculateStayPrice } from '@/lib/pricing-engine';
import { sendBookingEmails } from '@/lib/email/resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      propertyId = 'plas-hafod',
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      adults = 2,
      children = 0,
      pets = 0,
      notes = '',
    } = body;

    const validatedPropertyId: 'plas-hafod' | 'bryn-bugeiliaid-bach' =
      propertyId === 'bryn-bugeiliaid-bach' ? 'bryn-bugeiliaid-bach' : 'plas-hafod';

    // Basic validation
    if (!guestName || !guestEmail || !guestPhone || !checkIn || !checkOut) {
      return NextResponse.json(
        { error: 'Missing required guest or booking information.' },
        { status: 400 }
      );
    }

    // Retrieve active pricing & blocked calendar from CMS for specific property
    const pricingConfig = await cmsClient.getPricingConfig(validatedPropertyId);
    const blockedDates = await cmsClient.getBlockedDates(validatedPropertyId);

    // Verify calculation independently on server to ensure pricing integrity
    const calculation = calculateStayPrice(checkIn, checkOut, pricingConfig, blockedDates);

    if (!calculation.isValid) {
      return NextResponse.json(
        { error: calculation.errorMessage || 'Invalid booking dates selected.' },
        { status: 400 }
      );
    }

    // Action 1: Save Inquiry to CMS via Mutation API
    const inquiryRecord = await cmsClient.createBookingInquiry({
      propertyId: validatedPropertyId,
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      adults: Number(adults),
      children: Number(children),
      pets: Number(pets),
      totalNights: calculation.totalNights,
      nightlyBreakdown: calculation.nightlyBreakdown,
      subtotal: calculation.subtotal,
      discountAmount: calculation.discountAmount,
      appliedDiscountName: calculation.appliedDiscountName,
      totalPrice: calculation.totalPrice,
      depositAmount: calculation.depositAmount,
      balanceDue: calculation.balanceDue,
      notes,
    });

    const propertyTitle =
      validatedPropertyId === 'bryn-bugeiliaid-bach'
        ? 'Bryn Bugeiliaid Bach'
        : 'Plas Hafod Cottage';

    // Action 2: Trigger Resend Email API (Owner Alert + Guest Auto-Confirmation)
    const emailResult = await sendBookingEmails({
      propertyTitle,
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      totalNights: calculation.totalNights,
      adults: Number(adults),
      children: Number(children),
      pets: Number(pets),
      totalPrice: calculation.totalPrice,
      depositAmount: calculation.depositAmount,
      balanceDue: calculation.balanceDue,
      notes,
      inquiryId: inquiryRecord.id,
    });


    return NextResponse.json({
      success: true,
      inquiryId: inquiryRecord.id,
      message: 'Booking inquiry received and logged in CMS.',
      calculation,
    });
  } catch (error: any) {
    console.error('Booking submission error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error processing booking.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const pricingConfig = await cmsClient.getPricingConfig();
    const blockedDates = await cmsClient.getBlockedDates();
    return NextResponse.json({
      pricingConfig,
      blockedDates,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
