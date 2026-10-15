import { Metadata } from 'next';
import { cmsClient } from '@/cms/client';
import { Navbar } from '@/components/navigation/Navbar';
import { CottageOverview } from '@/components/cottage/CottageOverview';
import { BookingWidget } from '@/components/booking/BookingWidget';
import { GuestbookGallery } from '@/components/reviews/GuestbookGallery';
import { Footer } from '@/components/navigation/Footer';
import { generateCottageJsonLd } from '@/lib/seo/jsonld';
import { cyDictionary } from '@/lib/i18n/dictionaries/cy';

export const metadata: Metadata = {
  title: cyDictionary.meta.siteTitle,
  description: cyDictionary.meta.siteDescription,
  alternates: {
    canonical: 'https://plashafod.co.uk/cy',
    languages: {
      'en-GB': 'https://plashafod.co.uk',
      'cy-GB': 'https://plashafod.co.uk/cy',
    },
  },
  openGraph: {
    title: cyDictionary.meta.siteTitle,
    description: cyDictionary.meta.siteDescription,
    url: 'https://plashafod.co.uk/cy',
    siteName: 'Plas Hafod',
    images: [
      {
        url: '/images/hero.jpg',
        width: 1200,
        height: 675,
        alt: 'Plas Hafod Bwthyn Gwyliau Moethus',
      },
    ],
    locale: 'cy_GB',
    type: 'website',
  },
};

export default async function WelshHomePage() {
  const [pricingConfig, blockedDates, guestbookEntries] = await Promise.all([
    cmsClient.getPricingConfig(),
    cmsClient.getBlockedDates(),
    cmsClient.getGuestbookEntries(),
  ]);

  const { lodgingBusiness, breadcrumbs } = generateCottageJsonLd({ locale: 'cy' });

  return (
    <>
      {/* Inject Technical & Local SEO JSON-LD Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
        <Navbar currentLocale="cy" />
        <main className="flex-1">
          <CottageOverview currentLocale="cy" />
          <BookingWidget
            currentLocale="cy"
            pricingConfig={pricingConfig}
            blockedDates={blockedDates}
          />
          <GuestbookGallery currentLocale="cy" entries={guestbookEntries} />
        </main>
        <Footer currentLocale="cy" />
      </div>
    </>
  );
}
