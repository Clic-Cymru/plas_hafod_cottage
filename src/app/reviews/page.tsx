import { Metadata } from 'next';
import { LiveSiteNavbar } from '@/components/navigation/LiveSiteNavbar';
import { LiveSiteFooter } from '@/components/navigation/LiveSiteFooter';
import { SubpageHero } from '@/components/navigation/SubpageHero';
import { cmsClient } from '@/cms/client';
import { TrustindexWidget } from '@/components/reviews/TrustindexWidget';
import { DualGuestbookGallery } from '@/components/reviews/DualGuestbookGallery';


import { generateBreadcrumbJsonLd, SITE_URL } from '@/lib/seo/jsonld';

export const metadata: Metadata = {
  title: 'Guest Reviews & Testimonials | Plas Hafod Cottage & Bryn Bugeiliaid Bach',
  description:
    'Read genuine 5-star reviews and guestbook memories from Airbnb, Google, Booking.com, and Vrbo for our holiday cottages in Nebo, Snowdonia.',
  alternates: {
    canonical: 'https://plashafodcottage.co.uk/reviews',
    languages: {
      'en-GB': 'https://plashafodcottage.co.uk/reviews',
      'cy-GB': 'https://plashafodcottage.co.uk/cy/reviews',
    },
  },
  openGraph: {
    title: 'Guest Reviews & Testimonials | Plas Hafod Cottage & Bryn Bugeiliaid Bach',
    description:
      'Read genuine 5-star reviews and guestbook memories from Airbnb, Google, Booking.com, and Vrbo for our holiday cottages in Nebo, Snowdonia.',
    url: 'https://plashafodcottage.co.uk/reviews',
    siteName: 'Plas Hafod Cottage & Bryn Bugeiliaid Bach',
    images: [
      {
        url: '/images/wp/hero-slide-1.jpg',
        width: 1920,
        height: 1080,
        alt: 'Plas Hafod holiday cottage panoramic landscape',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guest Reviews | Plas Hafod Cottage & Bryn Bugeiliaid Bach',
    description:
      'Read 5-star guest reviews and handwritten guestbook memories for our cottages in Nebo, Snowdonia.',
    images: ['/images/wp/hero-slide-1.jpg'],
  },
};

export default async function ReviewsPage() {
  const [reviewSettings, guestbookEntries, siteSettings] = await Promise.all([
    cmsClient.getReviewSettings(false),
    cmsClient.getGuestbookEntries('both', false),
    cmsClient.getSiteSettings(false),
  ]);

  const hasTrustindex =
    reviewSettings.trustindexEnabled &&
    Boolean(reviewSettings.trustindexScriptUrl || reviewSettings.trustindexEmbedCode);

  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Guest Reviews', url: `${SITE_URL}/reviews` },
  ]);

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#333333] flex flex-col font-sans selection:bg-[#efda07]/30 selection:text-stone-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <LiveSiteNavbar currentPath="/reviews" isCymraeg={false} siteSettings={siteSettings} />

      <main className="flex-1">
        {/* Floating Subpage Hero with Landscape Background & Wave Divider */}
        <SubpageHero
          title="REVIEWS"
          imageSrc="/images/wp/hero-slide-1.jpg"
          imageAlt="Plas Hafod panoramic landscape"
        />

        {/* Live Multi-Platform Reviews (Trustindex Google, Airbnb, Vrbo, Booking.com) */}
        <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-architects uppercase tracking-wide text-stone-900">
              {reviewSettings.reviewHeading || 'SEE WHAT OUR CUSTOMERS THINK'}
            </h2>
            <div className="w-16 h-1 bg-[#efda07] mx-auto mt-3 mb-4" />
            <p className="text-stone-500 max-w-xl mx-auto text-sm">
              Live automated reviews and verified guest ratings from Google, Airbnb, Vrbo, and Booking.com.
            </p>
          </div>

          {hasTrustindex && (
            <div>
              <TrustindexWidget
                scriptUrl={reviewSettings.trustindexScriptUrl}
                embedCode={reviewSettings.trustindexEmbedCode}
                isCymraeg={false}
              />
            </div>
          )}
        </section>

        {/* Authentic Handwritten Guestbook Archive Gallery (Plas Hafod & Bryn Bugeiliaid Bach) */}
        {reviewSettings.showGuestbookArchive && (
          <section className="bg-white py-16 border-t border-stone-200">
            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <span className="text-xs uppercase tracking-widest text-[#99a0c1] font-semibold">
                  Authentic Handwritten Comments
                </span>
                <h2 className="text-2xl sm:text-4xl font-architects uppercase tracking-wide text-stone-900 mt-1">
                  {reviewSettings.guestbookHeading || 'WORDS FROM OUR VISITORS'}
                </h2>
                <div className="w-16 h-1 bg-[#efda07] mx-auto mt-3 mb-4" />
                <p className="text-stone-500 max-w-2xl mx-auto text-sm">
                  {reviewSettings.guestbookDescription ||
                    'Original clippings and notes taken directly from the handwritten guestbooks at Plas Hafod Cottage and Bryn Bugeiliaid Bach.'}
                </p>
              </div>

              {/* Dual Cottage Gallery with Tabs and Fullscreen Lightbox */}
              <DualGuestbookGallery entries={guestbookEntries} isCymraeg={false} />
            </div>
          </section>
        )}
      </main>

      <LiveSiteFooter isCymraeg={false} />
    </div>
  );
}
