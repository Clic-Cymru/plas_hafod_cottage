import { Metadata } from 'next';
import Image from 'next/image';
import { LiveSiteNavbar } from '@/components/navigation/LiveSiteNavbar';
import { LiveSiteBooking } from '@/components/booking/LiveSiteBooking';
import { LiveSiteFooter } from '@/components/navigation/LiveSiteFooter';
import { SubpageHero } from '@/components/navigation/SubpageHero';
import { BrynBugeiliaidBachAccreditations } from '@/components/cottage/BrynBugeiliaidBachAccreditations';
import { BrynBugeiliaidBachGallery } from '@/components/cottage/BrynBugeiliaidBachGallery';
import { cmsClient } from '@/cms/client';
import { Sparkles, Flame, Bed, Bath, Coffee, Ban } from 'lucide-react';


import { generateBreadcrumbJsonLd, COTTAGE_ADDRESS, COTTAGE_GEO, SITE_URL } from '@/lib/seo/jsonld';

export const metadata: Metadata = {
  title: 'Bryn Bugeiliaid Bach | Luxury 2-Bed Cottage Annexe in Nebo, Dyffryn Nantlle',
  description:
    'Peaceful 5-star Visit Wales annexe in Nebo near Penygroes overlooking Dyffryn Nantlle. Log burner, conservatory, underfloor heating, breathtaking Snowdonia views.',
  alternates: {
    canonical: 'https://plashafodcottage.co.uk/bryn-bugeiliaid-bach',
    languages: {
      'en-GB': 'https://plashafodcottage.co.uk/bryn-bugeiliaid-bach',
      'cy-GB': 'https://plashafodcottage.co.uk/cy/bryn-bugeiliaid-bach',
    },
  },
  openGraph: {
    title: 'Bryn Bugeiliaid Bach | Luxury 2-Bed Cottage Annexe in Nebo, Dyffryn Nantlle',
    description:
      'Peaceful 5-star Visit Wales annexe in Nebo near Penygroes overlooking Dyffryn Nantlle. Log burner, conservatory, underfloor heating, breathtaking Snowdonia views.',
    url: 'https://plashafodcottage.co.uk/bryn-bugeiliaid-bach',
    siteName: 'Plas Hafod Cottage & Bryn Bugeiliaid Bach',
    images: [
      {
        url: '/images/wp/bbb-hero-bg.jpg',
        width: 1920,
        height: 1080,
        alt: 'Bryn Bugeiliaid Bach luxury annexe in Nebo, Dyffryn Nantlle',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bryn Bugeiliaid Bach | Luxury 2-Bed Annexe in Nebo',
    description:
      'Peaceful 5-star Visit Wales annexe overlooking Dyffryn Nantlle in Nebo near Penygroes.',
    images: ['/images/wp/bbb-hero-bg.jpg'],
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BrynBugeiliaidBachPage() {
  const [pricingConfig, blockedDates, accreditations, siteSettings, galleryImages] = await Promise.all([
    cmsClient.getPricingConfig('bryn-bugeiliaid-bach'),
    cmsClient.getBlockedDates('bryn-bugeiliaid-bach'),
    cmsClient.getAccreditations('bryn-bugeiliaid-bach', false),
    cmsClient.getSiteSettings(false),
    cmsClient.getGalleryImages('bryn-bugeiliaid-bach'),
  ]);

  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Bryn Bugeiliaid Bach', url: `${SITE_URL}/bryn-bugeiliaid-bach` },
  ]);

  const bbbJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Accommodation', 'VacationRental'],
    name: 'Bryn Bugeiliaid Bach',
    description:
      'Peaceful 5-star Visit Wales annexe in Nebo near Penygroes overlooking Dyffryn Nantlle. Log burner, conservatory, underfloor heating, breathtaking Snowdonia views.',
    url: `${SITE_URL}/bryn-bugeiliaid-bach`,
    address: COTTAGE_ADDRESS,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COTTAGE_GEO.latitude,
      longitude: COTTAGE_GEO.longitude,
    },
    occupancy: {
      '@type': 'QuantitativeValue',
      maxValue: 4,
    },
    numberOfBedrooms: 2,
    numberOfBathroomsTotal: 1,
    petsAllowed: false,
    smokingAllowed: false,
    starRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
    },
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#333333] flex flex-col font-sans selection:bg-[#efda07]/30 selection:text-stone-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bbbJsonLd) }}
      />
      <LiveSiteNavbar currentPath="/bryn-bugeiliaid-bach" isCymraeg={false} siteSettings={siteSettings} />

      <main className="flex-1">
        {/* Floating Subpage Hero with Official BBB Header Background & Large Centered White Logo */}
        <SubpageHero
          imageSrc="/images/wp/bbb-hero-bg.jpg"
          imageAlt="Bryn Bugeiliaid Bach"
          logoSrc="/images/wp/bbb-logo-white-official.png"
          logoAlt="Bryn Bugeiliaid Bach Official Logo"
          logoSize="large"
        />

        {/* BBB Overview & Narrative */}
        <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6 text-stone-700 text-base leading-relaxed">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-architects uppercase tracking-wider text-stone-900"
                style={{ fontFamily: "'Architects Daughter', cursive, sans-serif" }}
              >
                BRYN <span className="text-[#99A0C1]">BUGEILIAID BACH</span>
              </h1>
              <div className="w-16 h-1 bg-[#efda07]" />
              <p
                className="text-lg sm:text-xl font-architects text-stone-700 tracking-wide"
                style={{ fontFamily: "'Architects Daughter', cursive, sans-serif" }}
              >
                A cozy self-contained annexe to the main property offering the same stunning views
              </p>

              <p>
                A beautifully restored 2 bed accommodation overlooking Dyffryn Nantlle and nestled just
                below the impressive Nantlle Ridge in beautiful Snowdonia. Enjoy unrivalled views of the
                North Wales coast looking over to Anglesey and beyond from the impressive addition of a well
                appointed conservatory.
              </p>
              <p>
                The property boasts a cozy log fire in the main living area, including underfloor heating on
                the ground floor and central heating on the 1st floor where there are 2 bedrooms with comfortable
                double beds and a spacious shower room.
              </p>
              <p>
                The kitchen is well equipped and includes dining area for 4 persons or why not enjoy the great
                outdoors and relax in the evening by the fire pit in the slated and grassed garden which includes
                dining area and separate seating area to appreciate the breathtaking views.
              </p>

              {/* Pet notice */}
              <div className="flex items-center gap-3 p-4 bg-amber-50 border border-[#efda07] rounded-2xl text-amber-900 text-sm font-medium">
                <Ban className="w-5 h-5 text-amber-700 shrink-0" />
                <span>
                  <strong>Please Note:</strong> Unlike our main cottage Plas Hafod, Bryn Bugeiliaid Bach
                  cannot accommodate pets.
                </span>
              </div>

              {/* Key Features Icons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-xs">
                  <Flame className="w-5 h-5 text-[#efda07]" />
                  <span className="text-xs font-semibold text-stone-800">Log Fire &amp; Heating</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-xs">
                  <Bed className="w-5 h-5 text-[#99a0c1]" />
                  <span className="text-xs font-semibold text-stone-800">2 Double Bedrooms</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-xs">
                  <Bath className="w-5 h-5 text-[#99a0c1]" />
                  <span className="text-xs font-semibold text-stone-800">Spacious Shower</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-xs">
                  <Coffee className="w-5 h-5 text-[#99a0c1]" />
                  <span className="text-xs font-semibold text-stone-800">Farmhouse Kitchen</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-xs">
                  <Sparkles className="w-5 h-5 text-[#efda07]" />
                  <span className="text-xs font-semibold text-stone-800">Glass Conservatory</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-xs">
                  <Sparkles className="w-5 h-5 text-[#efda07]" />
                  <span className="text-xs font-semibold text-stone-800">Fire Pit &amp; Garden</span>
                </div>
              </div>
            </div>

            {/* Right: Featured Photo Showcase */}
            <div className="lg:col-span-5 flex flex-col gap-6 items-center">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-stone-200">
                <Image
                  src="/images/wp/bbb/bbb-01.jpg"
                  alt="Bryn Bugeiliaid Bach"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Dedicated Prominent Accreditations & Awards Section */}
        <BrynBugeiliaidBachAccreditations isCymraeg={false} accreditations={accreditations} />

        {/* Interactive 30-Photo Gallery with Lightbox Modal */}
        <BrynBugeiliaidBachGallery isCymraeg={false} galleryImages={galleryImages} />

        {/* BBB Booking Widget */}
        <LiveSiteBooking
          propertyId="bryn-bugeiliaid-bach"
          isCymraeg={false}
          pricingConfig={pricingConfig}
          blockedDates={blockedDates}
        />

        {/* Footer */}
        <LiveSiteFooter isCymraeg={false} />
      </main>
    </div>
  );
}
