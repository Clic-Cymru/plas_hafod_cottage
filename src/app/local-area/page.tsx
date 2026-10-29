import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { LiveSiteNavbar } from '@/components/navigation/LiveSiteNavbar';
import { LiveSiteFooter } from '@/components/navigation/LiveSiteFooter';
import { SubpageHero } from '@/components/navigation/SubpageHero';
import { cmsClient } from '@/cms/client';
import { Compass, ExternalLink, Mountain, ShieldAlert, MapPin } from 'lucide-react';


import { generateBreadcrumbJsonLd, generateFaqJsonLd, SITE_URL } from '@/lib/seo/jsonld';
import { FaqSection } from '@/components/common/FaqSection';
import { defaultFaqsEn } from '@/data/faqs';

export const metadata: Metadata = {
  title: 'Local Area & Snowdonia Guide | Things To Do Near Nebo & Penygroes',
  description:
    'Explore Snowdonia (Eryri) from Nebo near Penygroes. Discover walking trails, Yr Wyddfa (Snowdon), Nantlle Ridge, Caernarfon Castle, Dinas Dinlle beach & steam railways.',
  alternates: {
    canonical: 'https://plashafodcottage.co.uk/local-area',
    languages: {
      'en-GB': 'https://plashafodcottage.co.uk/local-area',
      'cy-GB': 'https://plashafodcottage.co.uk/cy/local-area',
    },
  },
  openGraph: {
    title: 'Local Area & Snowdonia Guide | Things To Do Near Nebo & Penygroes',
    description:
      'Explore Snowdonia (Eryri) from Nebo near Penygroes. Discover walking trails, Yr Wyddfa (Snowdon), Nantlle Ridge, Caernarfon Castle, Dinas Dinlle beach & steam railways.',
    url: 'https://plashafodcottage.co.uk/local-area',
    siteName: 'Plas Hafod Cottage & Bryn Bugeiliaid Bach',
    images: [
      {
        url: '/images/wp/snowdon.jpg',
        width: 1920,
        height: 1080,
        alt: 'Snowdonia mountain range near Nebo and Penygroes',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Local Area & Snowdonia Guide | Things To Do Near Nebo & Penygroes',
    description:
      'Explore Snowdonia (Eryri) from Nebo near Penygroes: walks, castles, beaches & railways.',
    images: ['/images/wp/snowdon.jpg'],
  },
};

export default async function LocalAreaPage() {
  const [attractions, snowdonPaths, siteSettings] = await Promise.all([
    cmsClient.getLocalAttractions(false),
    cmsClient.getSnowdonPaths(false),
    cmsClient.getSiteSettings(false),
  ]);

  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Local Area Guide', url: `${SITE_URL}/local-area` },
  ]);

  const faqJsonLd = generateFaqJsonLd(defaultFaqsEn);

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#333333] flex flex-col font-sans selection:bg-[#efda07]/30 selection:text-stone-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <LiveSiteNavbar currentPath="/local-area" isCymraeg={false} siteSettings={siteSettings} />

      <main className="flex-1">
        {/* Floating Subpage Hero with Snowdon Landscape Background & Wave Divider */}
        <SubpageHero
          title="LOCAL AREA"
          subtitle="Our portfolio of information on local events, activities and tourist attractions will help you decide where to go and what to see during your stay at Plas Hafod. Situated off the beaten track in the hamlet of Nebo near Penygroes, Plas Hafod is within easy reach of Dinas Dinlle beach, the mountain trails of Snowdon, Caernarfon Castle, the Welsh Highland Railway, and Portmeirion."
          imageSrc="/images/wp/snowdon.jpg"
          imageAlt="Snowdonia mountain range"
        />

        {/* Attractions Grid with Authentic Images */}
        <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-architects uppercase tracking-wide text-stone-900">
              DISCOVER LOCAL <span className="text-[#99a0c1]">ATTRACTIONS</span>
            </h2>
            <div className="w-16 h-1 bg-[#efda07] mx-auto mt-3" />
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {attractions.map((attraction) => (
              <div
                key={attraction.id}
                className="break-inside-avoid bg-white rounded-3xl border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Card Image Container */}
                  <div className="relative w-full h-56 overflow-hidden bg-stone-100">
                    <Image
                      src={attraction.imageUrl || '/images/wp/snowdon.jpg'}
                      alt={attraction.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {attraction.distance && (
                      <div className="absolute bottom-3 left-3 bg-stone-900/85 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                        <MapPin className="w-3 h-3 text-[#efda07]" />
                        <span>{attraction.distance}</span>
                      </div>
                    )}
                    {attraction.featured && (
                      <div className="absolute top-3 right-3 bg-[#99a0c1] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#99a0c1] bg-[#99a0c1]/10 px-3 py-1 rounded-full">
                        {attraction.category}
                      </span>
                      <Compass className="w-4 h-4 text-stone-400 group-hover:text-[#99a0c1] transition" />
                    </div>
                    <h3
                      style={{ fontFamily: "'Architects Daughter', cursive, sans-serif" }}
                      className="text-xl font-architects text-stone-900 mb-3 group-hover:text-[#99a0c1] transition font-bold"
                    >
                      {attraction.title}
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed font-sans">
                      {attraction.description}
                    </p>
                  </div>
                </div>

                {/* Card Button */}
                <div className="px-6 pb-6 pt-0">
                  <a
                    href={attraction.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-semibold text-xs tracking-wider uppercase bg-stone-100 hover:bg-[#99a0c1] hover:text-white text-stone-800 transition duration-200"
                  >
                    LEARN MORE <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Yr Wyddfa / Mount Snowdon Walking Routes */}
        <section className="bg-white border-y border-stone-200 py-16 sm:py-20">
          <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-architects uppercase tracking-wide text-stone-900">
                YR WYDDFA / <span className="text-[#99a0c1]">MOUNT SNOWDON</span>
              </h2>
              <div className="w-16 h-1 bg-[#efda07] mx-auto mt-3 mb-4" />
              <p className="max-w-2xl mx-auto text-stone-600 text-sm sm:text-base">
                Standing at 3,560 ft (1,085m), Yr Wyddfa is the highest peak in Wales and England.
                There are six primary walking routes to the summit, each offering unique challenges and views.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {snowdonPaths.map((path, idx) => (
                <div
                  key={idx}
                  className="bg-[#fbfbfd] rounded-2xl p-6 border border-stone-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-[#99a0c1]">
                      <Mountain className="w-5 h-5" />
                      <span className="font-architects text-lg font-bold text-stone-900">
                        {path.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-stone-500 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>{path.start}</span>
                    </div>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                      {path.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-200 text-xs font-semibold text-stone-800">
                    Distance: <span className="text-stone-600 font-normal">{path.distance}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mountain Safety Notice */}
            <div className="bg-amber-50 border-2 border-[#efda07] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start gap-4">
              <ShieldAlert className="w-8 h-8 text-amber-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-architects text-lg sm:text-xl font-bold text-stone-900 uppercase mb-2">
                  Mountain Safety Advice
                </h3>
                <p className="text-stone-700 text-sm leading-relaxed">
                  Obtain a reliable local weather forecast before setting off and plan a route suitable to
                  conditions. Check your equipment before leaving: take waterproofs, warm spare clothing,
                  hat, gloves, food, plenty of water, a map, a compass and survival bag. Learn basic mountaineering
                  navigation skills. If weather conditions deteriorate, turn back. Do not rely entirely on mobile phones,
                  as mountain signals can be intermittent.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Local Area & Stay FAQ Section (GEO Optimized) */}
        <FaqSection isCymraeg={false} />

        {/* Footer */}
        <LiveSiteFooter isCymraeg={false} />
      </main>
    </div>
  );
}
