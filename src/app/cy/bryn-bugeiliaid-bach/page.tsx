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
  title: 'Bryn Bugeiliaid Bach | Llety Moethus 2 Wely yn Nebo, Dyffryn Nantlle',
  description:
    'Llety gwyliau moethus 5 seren Croeso Cymru yn Nebo ger Penygroes yn edrych dros Ddyffryn Nantlle. Llosgwr coed, ystafell wydr, gwres dan lawr, golygfeydd godidog o Eryri.',
  alternates: {
    canonical: 'https://plashafodcottage.co.uk/cy/bryn-bugeiliaid-bach',
    languages: {
      'en-GB': 'https://plashafodcottage.co.uk/bryn-bugeiliaid-bach',
      'cy-GB': 'https://plashafodcottage.co.uk/cy/bryn-bugeiliaid-bach',
    },
  },
  openGraph: {
    title: 'Bryn Bugeiliaid Bach | Llety Moethus 2 Wely yn Nebo, Dyffryn Nantlle',
    description:
      'Llety gwyliau moethus 5 seren Croeso Cymru yn Nebo ger Penygroes yn edrych dros Ddyffryn Nantlle. Llosgwr coed, ystafell wydr, gwres dan lawr, golygfeydd godidog o Eryri.',
    url: 'https://plashafodcottage.co.uk/cy/bryn-bugeiliaid-bach',
    siteName: 'Bwthyn Plas Hafod a Bryn Bugeiliaid Bach',
    images: [
      {
        url: '/images/wp/bbb-hero-bg.jpg',
        width: 1920,
        height: 1080,
        alt: 'Bryn Bugeiliaid Bach yn Nebo, Dyffryn Nantlle',
      },
    ],
    locale: 'cy_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bryn Bugeiliaid Bach | Llety Moethus 2 Wely yn Nebo',
    description:
      'Llety gwyliau moethus 5 seren Croeso Cymru yn Nebo ger Penygroes yn edrych dros Ddyffryn Nantlle.',
    images: ['/images/wp/bbb-hero-bg.jpg'],
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function WelshBrynBugeiliaidBachPage() {
  const [pricingConfig, blockedDates, accreditations, siteSettings] = await Promise.all([
    cmsClient.getPricingConfig('bryn-bugeiliaid-bach'),
    cmsClient.getBlockedDates('bryn-bugeiliaid-bach'),
    cmsClient.getAccreditations('bryn-bugeiliaid-bach', true),
    cmsClient.getSiteSettings(false),
  ]);

  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: 'Hafan', url: `${SITE_URL}/cy` },
    { name: 'Bryn Bugeiliaid Bach', url: `${SITE_URL}/cy/bryn-bugeiliaid-bach` },
  ]);

  const bbbJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Accommodation', 'VacationRental'],
    name: 'Bryn Bugeiliaid Bach',
    description:
      'Llety gwyliau moethus 5 seren Croeso Cymru yn Nebo ger Penygroes yn edrych dros Ddyffryn Nantlle. Llosgwr coed, ystafell wydr, gwres dan lawr, golygfeydd godidog o Eryri.',
    url: `${SITE_URL}/cy/bryn-bugeiliaid-bach`,
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
      <LiveSiteNavbar currentPath="/cy/bryn-bugeiliaid-bach" isCymraeg={true} siteSettings={siteSettings} />

      <main className="flex-1">
        {/* Floating Subpage Hero with Official BBB Header Background & Large Centered White Logo */}
        <SubpageHero
          imageSrc="/images/wp/bbb-hero-bg.jpg"
          imageAlt="Bryn Bugeiliaid Bach"
          logoSrc="/images/wp/bbb-logo-white-official.png"
          logoAlt="Logo Swyddogol Bryn Bugeiliaid Bach"
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
                Llety anecs hunangynhwysol clyd i&#39;r brif eiddo yn cynnig yr un golygfeydd godidog
              </p>

              <p>
                Llety 2 ystafell wely wedi&#39;i adnewyddu&#39;n hyfryd yn edrych dros Ddyffryn Nantlle ac yn
                swatio ychydig o dan Grib Nantlle drawiadol yn Eryri hardd. Mwynhewch olygfeydd heb eu hail
                o arfordir Gogledd Cymru yn edrych drosodd i Ynys Môn a thu hwnt o&#39;r ystafell wydr braf.
              </p>
              <p>
                Mae&#39;r eiddo&#39;n cynnwys tân coed clyd yn y brif ardal fyw, gan gynnwys gwres dan y llawr ar
                y llawr gwaelod a gwres canolog ar y llawr 1af lle mae 2 ystafell wely gyda gwelyau dwbl
                cyfforddus ac ystafell gawod fawr.
              </p>
              <p>
                Mae&#39;r gegin wedi&#39;i chyfarparu&#39;n dda ac yn cynnwys ardal fwyta ar gyfer 4 person neu beth
                am fwynhau&#39;r awyr agored ac ymlacio gyda&#39;r nos wrth ymyl y pwll tân yn yr ardd lechi a glaswellt
                sy&#39;n cynnwys ardal fwyta ac ardal eistedd ar wahân i werthfawrogi&#39;r golygfeydd syfrdanol.
              </p>

              {/* Pet notice */}
              <div className="flex items-center gap-3 p-4 bg-amber-50 border border-[#efda07] rounded-2xl text-amber-900 text-sm font-medium">
                <Ban className="w-5 h-5 text-amber-700 shrink-0" />
                <span>
                  <strong>Sylwch:</strong> Yn wahanol i&#39;n prif fwthyn Plas Hafod, ni all Bryn Bugeiliaid Bach
                  dderbyn anifeiliaid anwes.
                </span>
              </div>

              {/* Key Features Icons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-xs">
                  <Flame className="w-5 h-5 text-[#efda07]" />
                  <span className="text-xs font-semibold text-stone-800">Tân Coed a Gwres</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-xs">
                  <Bed className="w-5 h-5 text-[#99a0c1]" />
                  <span className="text-xs font-semibold text-stone-800">2 Ystafell Wely Ddwbl</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-xs">
                  <Bath className="w-5 h-5 text-[#99a0c1]" />
                  <span className="text-xs font-semibold text-stone-800">Cawod Eang</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-xs">
                  <Coffee className="w-5 h-5 text-[#99a0c1]" />
                  <span className="text-xs font-semibold text-stone-800">Cegin Fferm Gyflawn</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-xs">
                  <Sparkles className="w-5 h-5 text-[#efda07]" />
                  <span className="text-xs font-semibold text-stone-800">Ystafell Wydr</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-xs">
                  <Sparkles className="w-5 h-5 text-[#efda07]" />
                  <span className="text-xs font-semibold text-stone-800">Pwll Tân ac Ardd</span>
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
        <BrynBugeiliaidBachAccreditations isCymraeg={true} accreditations={accreditations} />

        {/* Interactive 30-Photo Gallery with Lightbox Modal */}
        <BrynBugeiliaidBachGallery isCymraeg={true} />

        {/* BBB Booking Widget */}
        <LiveSiteBooking
          propertyId="bryn-bugeiliaid-bach"
          isCymraeg={true}
          pricingConfig={pricingConfig}
          blockedDates={blockedDates}
        />

        {/* Footer */}
        <LiveSiteFooter isCymraeg={true} />
      </main>
    </div>
  );
}
