import { Metadata } from 'next';
import { cmsClient } from '@/cms/client';
import { Navbar } from '@/components/navigation/Navbar';
import { CottageOverview } from '@/components/cottage/CottageOverview';
import { BookingWidget } from '@/components/booking/BookingWidget';
import { GuestbookGallery } from '@/components/reviews/GuestbookGallery';
import { Footer } from '@/components/navigation/Footer';
import { generateCottageJsonLd } from '@/lib/seo/jsonld';
import { enDictionary } from '@/lib/i18n/dictionaries/en';

export const metadata: Metadata = {
  title: enDictionary.meta.siteTitle,
  description: enDictionary.meta.siteDescription,
  alternates: {
    canonical: 'https://plashafod.co.uk',
    languages: {
      'en-GB': 'https://plashafod.co.uk',
      'cy-GB': 'https://plashafod.co.uk/cy',
    },
  },
  openGraph: {
    title: enDictionary.meta.siteTitle,
    description: enDictionary.meta.siteDescription,
    url: 'https://plashafod.co.uk',
    siteName: 'Plas Hafod',
    images: [
      {
        url: '/images/hero.jpg',
        width: 1200,
        height: 675,
        alt: 'Plas Hafod Welsh Holiday Cottage',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
};

export default async function HomePage() {
  const [pricingConfig, blockedDates, guestbookEntries] = await Promise.all([
    cmsClient.getPricingConfig(),
    cmsClient.getBlockedDates(),
    cmsClient.getGuestbookEntries(),
  ]);

  const { lodgingBusiness, breadcrumbs } = generateCottageJsonLd({ locale: 'en' });

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
        <Navbar currentLocale="en" />
        <main className="flex-1">
          <CottageOverview currentLocale="en" />
          <BookingWidget
            currentLocale="en"
            pricingConfig={pricingConfig}
            blockedDates={blockedDates}
          />
          <GuestbookGallery currentLocale="en" entries={guestbookEntries} />
        </main>
        <Footer currentLocale="en" />
      </div>
    </>
  );
}
