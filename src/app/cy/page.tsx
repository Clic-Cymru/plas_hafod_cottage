import { Metadata } from 'next';
import { cmsClient } from '@/cms/client';
import { LiveSiteNavbar } from '@/components/navigation/LiveSiteNavbar';
import { LiveSiteHero } from '@/components/cottage/LiveSiteHero';
import { LiveSiteAboutAndGallery } from '@/components/cottage/LiveSiteAboutAndGallery';
import { LiveSiteBooking } from '@/components/booking/LiveSiteBooking';
import { LiveSiteSisterPropertyAndAccreditations } from '@/components/cottage/LiveSiteSisterPropertyAndAccreditations';
import { generateCottageJsonLd } from '@/lib/seo/jsonld';


export const metadata: Metadata = {
  title: 'Bwthyn Plas Hafod | Bwthyn Gwyliau Moethus 5 Seren yn Nebo, Eryri',
  description:
    'Bwthyn gwyliau moethus 5 seren Croeso Cymru yn Nebo ger Penygroes, Eryri. Golygfeydd panoramig o fynyddoedd a\'r môr, lle tân agored, croeso i gŵn. Archebwch yn uniongyrchol.',
  alternates: {
    canonical: 'https://plashafodcottage.co.uk/cy',
    languages: {
      'en-GB': 'https://plashafodcottage.co.uk',
      'cy-GB': 'https://plashafodcottage.co.uk/cy',
    },
  },
  openGraph: {
    title: 'Bwthyn Plas Hafod | Bwthyn Gwyliau Moethus 5 Seren yn Nebo, Eryri',
    description:
      'Bwthyn gwyliau moethus 5 seren Croeso Cymru yn Nebo ger Penygroes, Eryri. Golygfeydd panoramig o fynyddoedd a\'r môr, lle tân agored, croeso i gŵn. Archebwch yn uniongyrchol.',
    url: 'https://plashafodcottage.co.uk/cy',
    siteName: 'Bwthyn Plas Hafod a Bryn Bugeiliaid Bach',
    images: [
      {
        url: '/images/wp/hero-bg.jpg',
        width: 1920,
        height: 1080,
        alt: 'Golygfeydd panoramig mynydd Plas Hafod yn Eryri',
      },
    ],
    locale: 'cy_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bwthyn Plas Hafod | Bwthyn Gwyliau 5 Seren yn Nebo, Eryri',
    description:
      'Bwthyn gwyliau moethus 5 seren Croeso Cymru yn Nebo ger Penygroes, Eryri.',
    images: ['/images/wp/hero-bg.jpg'],
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
