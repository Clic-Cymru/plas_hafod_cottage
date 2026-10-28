import { Metadata } from 'next';
import { cmsClient } from '@/cms/client';
import { LiveSiteNavbar } from '@/components/navigation/LiveSiteNavbar';
import { LiveSiteHero } from '@/components/cottage/LiveSiteHero';
import { LiveSiteAboutAndGallery } from '@/components/cottage/LiveSiteAboutAndGallery';
import { LiveSiteBooking } from '@/components/booking/LiveSiteBooking';
import { LiveSiteSisterPropertyAndAccreditations } from '@/components/cottage/LiveSiteSisterPropertyAndAccreditations';
import { generateCottageJsonLd } from '@/lib/seo/jsonld';


export const metadata: Metadata = {
  title: 'Plas Hafod Cottage | 5-Star Luxury Holiday Cottage in Nebo, Snowdonia',
  description:
    '5-star Visit Wales holiday cottage in Nebo near Penygroes, Snowdonia (Eryri). Panoramic mountain and sea views, inglenook fire, dog-friendly. Book direct.',
  alternates: {
    canonical: 'https://plashafodcottage.co.uk',
    languages: {
      'en-GB': 'https://plashafodcottage.co.uk',
      'cy-GB': 'https://plashafodcottage.co.uk/cy',
    },
  },
  openGraph: {
    title: 'Plas Hafod Cottage | 5-Star Luxury Holiday Cottage in Nebo, Snowdonia',
    description:
      '5-star Visit Wales holiday cottage in Nebo near Penygroes, Snowdonia (Eryri). Panoramic mountain and sea views, inglenook fire, dog-friendly. Book direct.',
    url: 'https://plashafodcottage.co.uk',
    siteName: 'Plas Hafod Cottage & Bryn Bugeiliaid Bach',
    images: [
      {
        url: '/images/wp/hero-bg.jpg',
        width: 1920,
        height: 1080,
        alt: 'Plas Hafod panoramic mountain views in Snowdonia',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plas Hafod Cottage | 5-Star Holiday Cottage in Nebo, Snowdonia',
    description:
      '5-star Visit Wales holiday cottage in Nebo near Penygroes with panoramic Snowdonia mountain views.',
    images: ['/images/wp/hero-bg.jpg'],
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const [pricingConfig, blockedDates, accreditations, heroSlides, siteSettings, galleryImages] = await Promise.all([
    cmsClient.getPricingConfig(),
    cmsClient.getBlockedDates(),
    cmsClient.getAccreditations('plas-hafod', false),
    cmsClient.getHeroSlides(false),
    cmsClient.getSiteSettings(false),
    cmsClient.getGalleryImages('plas-hafod'),
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
        <LiveSiteNavbar currentPath="/" isCymraeg={false} siteSettings={siteSettings} />
        <main className="flex-1">
          <LiveSiteHero
            isCymraeg={false}
            slides={heroSlides}
            siteSettings={siteSettings}
          />
          <LiveSiteAboutAndGallery isCymraeg={false} galleryImages={galleryImages} />
          <LiveSiteBooking
            propertyId="plas-hafod"
            isCymraeg={false}
            pricingConfig={pricingConfig}
            blockedDates={blockedDates}
          />
          <LiveSiteSisterPropertyAndAccreditations isCymraeg={false} accreditations={accreditations} />
        </main>
      </div>
    </>
  );
}
