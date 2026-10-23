import { Metadata } from 'next';
import { cmsClient } from '@/cms/client';
import { LiveSiteNavbar } from '@/components/navigation/LiveSiteNavbar';
import { LiveSiteHero } from '@/components/cottage/LiveSiteHero';
import { LiveSiteAboutAndGallery } from '@/components/cottage/LiveSiteAboutAndGallery';
import { LiveSiteBooking } from '@/components/booking/LiveSiteBooking';
import { LiveSiteSisterPropertyAndAccreditations } from '@/components/cottage/LiveSiteSisterPropertyAndAccreditations';
import { generateCottageJsonLd } from '@/lib/seo/jsonld';


export const metadata: Metadata = {
  title: 'Bwthyn Plas Hafod - Bwthyn Gwyliau Clyd gyda Golygfeydd Rhyfeddol yn Eryri',

  description:
    'Profwch Plas Hafod, bwthyn gwyliau 5 seren Croeso Cymru ar ymyl Parc Cenedlaethol Eryri yn Nebo gyda golygfeydd panoramig o fynyddoedd a&#39;r môr.',
  alternates: {
    canonical: 'https://plashafodcottage.co.uk/cy',
    languages: {
      'en-GB': 'https://plashafodcottage.co.uk',
      'cy-GB': 'https://plashafodcottage.co.uk/cy',
    },
  },
  openGraph: {
    title: 'Bwthyn Plas Hafod - Bwthyn Clyd gyda Golygfeydd Rhyfeddol',
    description:
      'Bwthyn gwyliau 5 seren Croeso Cymru ar ymyl Parc Cenedlaethol Eryri yn Nebo gyda golygfeydd godidog o Eryri, Ynys Môn, a Môr Iwerddon.',
    url: 'https://plashafodcottage.co.uk/cy',
    siteName: 'Bwthyn Plas Hafod',
    images: [
      {
        url: '/images/wp/hero-bg.jpg',
        width: 1920,
        height: 1080,
        alt: 'Golygfeydd mynydd Plas Hafod yn Eryri',
      },
    ],
    locale: 'cy_GB',
    type: 'website',
  },
};

export default async function WelshHomePage() {
  const [pricingConfig, blockedDates, accreditations, heroSlides, siteSettings] = await Promise.all([
    cmsClient.getPricingConfig(),
    cmsClient.getBlockedDates(),
    cmsClient.getAccreditations('plas-hafod', true),
    cmsClient.getHeroSlides(true),
    cmsClient.getSiteSettings(true),
  ]);

  const { lodgingBusiness, breadcrumbs } = generateCottageJsonLd({ locale: 'cy' });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <div className="min-h-screen bg-[#fbfbfd] text-[#333333] flex flex-col font-sans selection:bg-[#efda07]/30 selection:text-stone-900">
        <LiveSiteNavbar currentPath="/cy" isCymraeg={true} siteSettings={siteSettings} />
        <main className="flex-1">
          <LiveSiteHero
            isCymraeg={true}
            slides={heroSlides}
            siteSettings={siteSettings}
          />
          <LiveSiteAboutAndGallery isCymraeg={true} />
          <LiveSiteBooking
            propertyId="plas-hafod"
            isCymraeg={true}
            pricingConfig={pricingConfig}
            blockedDates={blockedDates}
          />
          <LiveSiteSisterPropertyAndAccreditations isCymraeg={true} accreditations={accreditations} />
        </main>
      </div>
    </>
  );
}
