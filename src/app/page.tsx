import { Metadata } from 'next';
import { cmsClient } from '@/cms/client';
import { LiveSiteNavbar } from '@/components/navigation/LiveSiteNavbar';
import { LiveSiteHero } from '@/components/cottage/LiveSiteHero';
import { LiveSiteAboutAndGallery } from '@/components/cottage/LiveSiteAboutAndGallery';
import { LiveSiteBooking } from '@/components/booking/LiveSiteBooking';
import { LiveSiteSisterPropertyAndAccreditations } from '@/components/cottage/LiveSiteSisterPropertyAndAccreditations';
import { generateCottageJsonLd } from '@/lib/seo/jsonld';

export const instant = false;

export const metadata: Metadata = {
  title: 'Bwthyn Plas Hafod Cottage - Cozy Cottage with Amazing Views in Snowdonia',

  description:
    'Experience Plas Hafod, a 5-star Visit Wales certified holiday cottage nestled on the edge of Snowdonia National Park in Nebo with panoramic sea and mountain views.',
  alternates: {
    canonical: 'https://plashafodcottage.co.uk',
    languages: {
      'en-GB': 'https://plashafodcottage.co.uk',
      'cy-GB': 'https://plashafodcottage.co.uk/cy',
    },
  },
  openGraph: {
    title: 'Bwthyn Plas Hafod Cottage - Cozy Cottage with Amazing Views',
    description:
      '5-star Visit Wales holiday cottage on the edge of Snowdonia National Park in Nebo with breathtaking views of Snowdonia, Anglesey, and the Irish Sea.',
    url: 'https://plashafodcottage.co.uk',
    siteName: 'Plas Hafod Cottage',
    images: [
      {
        url: '/images/wp/hero-bg.jpg',
        width: 1920,
        height: 1080,
        alt: 'Plas Hafod mountain views in Snowdonia',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
};

export default async function HomePage() {
  const [pricingConfig, blockedDates] = await Promise.all([
    cmsClient.getPricingConfig(),
    cmsClient.getBlockedDates(),
  ]);

  const { lodgingBusiness, breadcrumbs } = generateCottageJsonLd({ locale: 'en' });

  return (
    <>
      {/* Technical & Local SEO JSON-LD Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <div className="min-h-screen bg-[#fbfbfd] text-[#333333] flex flex-col font-sans selection:bg-[#efda07]/30 selection:text-stone-900">
        <LiveSiteNavbar currentPath="/" isCymraeg={false} />
        <main className="flex-1">
          <LiveSiteHero isCymraeg={false} />
          <LiveSiteAboutAndGallery isCymraeg={false} />
          <LiveSiteBooking
            propertyId="plas-hafod"
            isCymraeg={false}
            pricingConfig={pricingConfig}
            blockedDates={blockedDates}
          />
          <LiveSiteSisterPropertyAndAccreditations isCymraeg={false} />
        </main>
      </div>
    </>
  );
}
