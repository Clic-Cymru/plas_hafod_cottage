import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * On-Demand Revalidation Webhook for Sanity CMS
 * Guardrail: When client publishes/edits content in Sanity Studio, Sanity calls this webhook.
 * Next.js revalidates the static cache on-demand, meaning visitor page views require ZERO Sanity API calls!
 */
export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const secret = url.searchParams.get('secret') || request.headers.get('x-sanity-webhook-secret');
    const expectedSecret = process.env.SANITY_REVALIDATE_SECRET || 'plas-hafod-secret-key-2026';

    // Verify webhook secret token
    if (secret !== expectedSecret) {
      return NextResponse.json({ message: 'Invalid revalidation secret' }, { status: 401 });
    }

    let body: any = {};
    try {
      body = await request.json();
    } catch {
      // Body may be empty on test pings
    }

    const documentType = body?._type;

    // Targeted path revalidation based on changed document type
    if (documentType === 'localAttraction' || documentType === 'snowdonPath') {
      revalidatePath('/local-area');
      revalidatePath('/cy/ardal-leol');
      revalidatePath('/cy/local-area');
    } else if (documentType === 'review' || documentType === 'guestbookEntry') {
      revalidatePath('/reviews');
      revalidatePath('/cy/adolygiadau');
      revalidatePath('/cy/reviews');
      revalidatePath('/');
      revalidatePath('/cy');
    } else if (documentType === 'policySection') {
      revalidatePath('/terms');
      revalidatePath('/cy/telerau');
      revalidatePath('/cy/terms');
    } else if (documentType === 'pricingConfig' || documentType === 'blockedDates') {
      revalidatePath('/');
      revalidatePath('/cy');
      revalidatePath('/bryn-bugeiliaid-bach');
      revalidatePath('/cy/bryn-bugeiliaid-bach');
    } else {
      // General revalidation for site settings, hero slides, and page copy
      revalidatePath('/');
      revalidatePath('/cy');
      revalidatePath('/bryn-bugeiliaid-bach');
      revalidatePath('/cy/bryn-bugeiliaid-bach');
      revalidatePath('/local-area');
      revalidatePath('/reviews');
      revalidatePath('/terms');
      revalidatePath('/contact');
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      documentType: documentType || 'all',
      message: 'Next.js cache revalidated successfully',
    });
  } catch (err: any) {
    return NextResponse.json({ message: 'Error revalidating', error: err?.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  return POST(request);
}
