import { Metadata } from 'next';
import { LiveSiteNavbar } from '@/components/navigation/LiveSiteNavbar';
import { LiveSiteFooter } from '@/components/navigation/LiveSiteFooter';
import { SubpageHero } from '@/components/navigation/SubpageHero';
import { cmsClient } from '@/cms/client';
import { TrustindexWidget } from '@/components/reviews/TrustindexWidget';
import { DualGuestbookGallery } from '@/components/reviews/DualGuestbookGallery';


import { generateBreadcrumbJsonLd, SITE_URL } from '@/lib/seo/jsonld';

export const metadata: Metadata = {
  title: 'Adolygiadau Gwesteion | Bwthyn Plas Hafod a Bryn Bugeiliaid Bach',
  description:
    'Darllenwch adolygiadau 5 seren go iawn a thystiolaethau llyfr gwesteion gan ymwelwyr Plas Hafod a Bryn Bugeiliaid Bach yn Nebo, Eryri.',
  alternates: {
    canonical: 'https://plashafodcottage.co.uk/cy/reviews',
    languages: {
      'en-GB': 'https://plashafodcottage.co.uk/reviews',
      'cy-GB': 'https://plashafodcottage.co.uk/cy/reviews',
    },
  },
  openGraph: {
    title: 'Adolygiadau Gwesteion | Bwthyn Plas Hafod a Bryn Bugeiliaid Bach',
    description:
      'Darllenwch adolygiadau 5 seren go iawn a thystiolaethau llyfr gwesteion gan ymwelwyr Plas Hafod a Bryn Bugeiliaid Bach yn Nebo, Eryri.',
    url: 'https://plashafodcottage.co.uk/cy/reviews',
    siteName: 'Bwthyn Plas Hafod a Bryn Bugeiliaid Bach',
    images: [
      {
        url: '/images/wp/hero-slide-1.jpg',
        width: 1920,
        height: 1080,
        alt: 'Tirwedd mynydd Bwthyn Plas Hafod yn Eryri',
      },
    ],
    locale: 'cy_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adolygiadau Gwesteion | Bwthyn Plas Hafod a Bryn Bugeiliaid Bach',
    description:
      'Darllenwch adolygiadau 5 seren gan ymwelwyr ein bythynnod yn Nebo, Eryri.',
    images: ['/images/wp/hero-slide-1.jpg'],
  },
};

export default async function WelshReviewsPage() {
  const [reviewSettings, guestbookEntries, siteSettings] = await Promise.all([
    cmsClient.getReviewSettings(true),
    cmsClient.getGuestbookEntries('both', true),
    cmsClient.getSiteSettings(false),
  ]);

  const hasTrustindex =
    reviewSettings.trustindexEnabled &&
    Boolean(reviewSettings.trustindexScriptUrl || reviewSettings.trustindexEmbedCode);

  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: 'Hafan', url: `${SITE_URL}/cy` },
    { name: 'Adolygiadau', url: `${SITE_URL}/cy/reviews` },
  ]);

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#333333] flex flex-col font-sans selection:bg-[#efda07]/30 selection:text-stone-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <LiveSiteNavbar currentPath="/cy/reviews" isCymraeg={true} siteSettings={siteSettings} />

      <main className="flex-1">
        {/* Floating Subpage Hero with Landscape Background & Wave Divider */}
        <SubpageHero
          title="ADOLYGIADAU"
          imageSrc="/images/wp/hero-slide-1.jpg"
          imageAlt="Golygfeydd mynydd a môr Plas Hafod"
        />

        {/* Live Multi-Platform Reviews (Trustindex Google, Airbnb, Vrbo, Booking.com) */}
        <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-architects uppercase tracking-wide text-stone-900">
              {reviewSettings.reviewHeading || 'BETH MAE EIN CWSMERIAID YN EI DDWEUD'}
            </h2>
            <div className="w-16 h-1 bg-[#efda07] mx-auto mt-3 mb-4" />
            <p className="text-stone-500 max-w-xl mx-auto text-sm">
              Adolygiadau byw a sgoriau gwesteion go iawn o Google, Airbnb, Vrbo, a Booking.com.
            </p>
          </div>

          {hasTrustindex && (
            <div>
              <TrustindexWidget
                scriptUrl={reviewSettings.trustindexScriptUrl}
                embedCode={reviewSettings.trustindexEmbedCode}
                isCymraeg={true}
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
                  Detholiad o Lyfrau Gwesteion Llawysgrif
                </span>
                <h2 className="text-2xl sm:text-4xl font-architects uppercase tracking-wide text-stone-900 mt-1">
                  {reviewSettings.guestbookHeading || 'LLYFRAU GWESTEION PLAS HAFOD A BRYN BUGEILIAID BACH'}
                </h2>
                <div className="w-16 h-1 bg-[#efda07] mx-auto mt-3 mb-4" />
                <p className="text-stone-500 max-w-2xl mx-auto text-sm">
                  {reviewSettings.guestbookDescription ||
                    'Toriadau a lluniau gwreiddiol o nodiadau llawysgrif ein gwesteion ym Mhlas Hafod a Bryn Bugeiliaid Bach.'}
                </p>
              </div>

              {/* Dual Cottage Gallery with Tabs and Fullscreen Lightbox */}
              <DualGuestbookGallery entries={guestbookEntries} isCymraeg={true} />
            </div>
          </section>
        )}
      </main>

      <LiveSiteFooter isCymraeg={true} />
    </div>
  );
}
