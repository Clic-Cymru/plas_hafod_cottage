import { Metadata } from 'next';
import { LiveSiteNavbar } from '@/components/navigation/LiveSiteNavbar';
import { LiveSiteFooter } from '@/components/navigation/LiveSiteFooter';
import { SubpageHero } from '@/components/navigation/SubpageHero';
import { cmsClient } from '@/cms/client';
import { TrustindexWidget } from '@/components/reviews/TrustindexWidget';
import { DualGuestbookGallery } from '@/components/reviews/DualGuestbookGallery';


export const metadata: Metadata = {
  title: 'Guest Reviews & Testimonials - Bwthyn Plas Hafod Cottage',
  description:
    'Read real guest reviews and guestbook entries from Airbnb, Vrbo, Booking.com, and Google Reviews for Plas Hafod Cottage and Bryn Bugeiliaid Bach in Snowdonia.',
};

export default async function ReviewsPage() {
  const [reviewSettings, guestbookEntries] = await Promise.all([
    cmsClient.getReviewSettings(false),
    cmsClient.getGuestbookEntries('both', false),
  ]);

  const hasTrustindex =
    reviewSettings.trustindexEnabled &&
    Boolean(reviewSettings.trustindexScriptUrl || reviewSettings.trustindexEmbedCode);

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#333333] flex flex-col font-sans selection:bg-[#efda07]/30 selection:text-stone-900">
      <LiveSiteNavbar currentPath="/reviews" isCymraeg={false} />

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
