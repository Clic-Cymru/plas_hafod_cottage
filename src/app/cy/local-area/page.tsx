import { Metadata } from 'next';
import Image from 'next/image';
import { LiveSiteNavbar } from '@/components/navigation/LiveSiteNavbar';
import { LiveSiteFooter } from '@/components/navigation/LiveSiteFooter';
import { SubpageHero } from '@/components/navigation/SubpageHero';
import { cmsClient } from '@/cms/client';
import { Compass, ExternalLink, Mountain, ShieldAlert, MapPin } from 'lucide-react';


import { generateBreadcrumbJsonLd, generateFaqJsonLd, SITE_URL } from '@/lib/seo/jsonld';
import { FaqSection } from '@/components/common/FaqSection';
import { defaultFaqsCy } from '@/data/faqs';

export const metadata: Metadata = {
  title: 'Ardal Leol a Chanllaw Eryri | Atyniadau ger Nebo a Phen-y-groes',
  description:
    'Archwiliwch Eryri o Nebo ger Pen-y-groes. Darganfyddwch lwybrau cerdded, Yr Wyddfa, Crib Nantlle, Castell Caernarfon, traeth Dinas Dinlle a rheilffyrdd stêm.',
  alternates: {
    canonical: 'https://plashafodcottage.co.uk/cy/local-area',
    languages: {
      'en-GB': 'https://plashafodcottage.co.uk/local-area',
      'cy-GB': 'https://plashafodcottage.co.uk/cy/local-area',
    },
  },
  openGraph: {
    title: 'Ardal Leol a Chanllaw Eryri | Atyniadau ger Nebo a Phen-y-groes',
    description:
      'Archwiliwch Eryri o Nebo ger Pen-y-groes. Darganfyddwch lwybrau cerdded, Yr Wyddfa, Crib Nantlle, Castell Caernarfon, traeth Dinas Dinlle a rheilffyrdd stêm.',
    url: 'https://plashafodcottage.co.uk/cy/local-area',
    siteName: 'Bwthyn Plas Hafod a Bryn Bugeiliaid Bach',
    images: [
      {
        url: '/images/wp/snowdon.jpg',
        width: 1920,
        height: 1080,
        alt: 'Mynyddoedd Eryri ger Nebo a Phen-y-groes',
      },
    ],
    locale: 'cy_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ardal Leol a Chanllaw Eryri | Atyniadau ger Nebo a Phen-y-groes',
    description:
      'Archwiliwch Eryri o Nebo ger Pen-y-groes: llwybrau cerdded, cestyll, traethau a rheilffyrdd.',
    images: ['/images/wp/snowdon.jpg'],
  },
};

const snowdonPathsCy = [
  {
    name: 'Llwybr y PYG',
    distance: '3.25 milltir bob ffordd',
    start: 'Maes parcio Hostal Ieuenctid Pen-y-Pass',
    description:
      "Y llwybr mynydd clasurol a phoblogaidd. Yn amlinellu'n dyner o amgylch y cwm rhewlifol cyn dringo i Fwlch Glas a'r grib olaf i'r copa.",
  },
  {
    name: 'Llwybr Watkin',
    distance: '3.5 milltir bob ffordd',
    start: 'Maes parcio y tu hwnt i Lyn Gwynant / Nant Gwynant',
    description:
      "Y ddringfa anoddaf a mwyaf heriol gyda'r esgyniad fertigol mwyaf, gan basio rhaeadrau hardd a hen weithfeydd copr Fictoraidd cyn rhan olaf serth ar y sgreoedd.",
  },
  {
    name: 'Llwybr Snowdon Ranger',
    distance: '3.75 milltir bob ffordd',
    start: 'Maes parcio wrth Lyn Cwellyn',
    description:
      "Un o'r llwybrau hynaf a gofnodwyd i'r copa. Llwybr cyson a gwerth chweil sy'n cynnig panoramâu agored godidog dros Foel Hebog a Chrib Nantlle.",
  },
  {
    name: 'Llwybr Rhyd Ddu',
    distance: '3.75 milltir bob ffordd',
    start: 'Maes parcio ym mhentref Rhyd Ddu',
    description:
      "Hawdd i'w ddilyn ar hyd llwybrau glaswelltog llydan i ddechrau, yna'n culhau ar hyd crib ddramatig Bwlch Main gyda disgynfeydd syfrdanol ar y naill ochr a'r llall.",
  },
  {
    name: 'Llwybr y Mwynwyr',
    distance: '3.75 milltir bob ffordd',
    start: 'Maes parcio Pen-y-Pass',
    description:
      "Yn dilyn hen drac cart llydan a thyner heibio Llyn Teyrn a Llyn Llydaw cyn dringo'n serth heibio Glaslyn i ymuno â Llwybr y PYG.",
  },
  {
    name: 'Llwybr Llanberis',
    distance: '5 milltir bob ffordd',
    start: 'Pentref Llanberis',
    description:
      "Y llwybr hiraf ond mwyaf graddol, sy'n rhedeg yn gyfochrog â Rheilffordd yr Wyddfa. Poblogaidd a hawdd i'w ddilyn gyda sawl man aros am gaffi ar hyd y llwybr.",
  },
];

export default async function WelshLocalAreaPage() {
  const [attractions, siteSettings] = await Promise.all([
    cmsClient.getLocalAttractions(true),
    cmsClient.getSiteSettings(false),
  ]);

  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: 'Hafan', url: `${SITE_URL}/cy` },
    { name: 'Ardal Leol', url: `${SITE_URL}/cy/local-area` },
  ]);

  const faqJsonLd = generateFaqJsonLd(defaultFaqsCy);

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
      <LiveSiteNavbar currentPath="/cy/local-area" isCymraeg={true} siteSettings={siteSettings} />

      <main className="flex-1">
        {/* Floating Subpage Hero with Snowdon Landscape Background & Wave Divider */}
        <SubpageHero
          title="ARDAL LEOL"
          subtitle="Bydd ein portffolio o wybodaeth am ddigwyddiadau lleol, gweithgareddau ac atyniadau twristiaeth yn eich helpu i benderfynu ble i fynd a beth i'w weld yn ystod eich arhosiad ym Mhlas Hafod. Wedi'i leoli oddi ar y prif lwybrau ym mhentrefan Nebo ger Pen-y-groes, mae Plas Hafod o fewn cyrraedd hawdd i draeth Dinas Dinlle, llwybrau mynydd Yr Wyddfa, Castell Caernarfon, Rheilffordd Ucheldir Cymru, a Phorthmeirion."
          imageSrc="/images/wp/snowdon.jpg"
          imageAlt="Mynyddoedd Eryri ger Plas Hafod"
        />

        {/* Attractions Grid with Authentic Images */}
        <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-architects uppercase tracking-wide text-stone-900">
              DARGANFOD <span className="text-[#99a0c1]">ATYNIADAU LLEOL</span>
            </h2>
            <div className="w-16 h-1 bg-[#efda07] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attractions.map((attraction) => (
              <div
                key={attraction.id}
                className="bg-white rounded-3xl border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden"
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
                        Dan Sylw
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
                    <p className="text-stone-600 text-sm leading-relaxed font-sans line-clamp-4">
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
                    DYSGU MWY <ExternalLink className="w-4 h-4" />
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
                Gyda’i gopa yn 3,560 tr (1,085m), Yr Wyddfa yw’r copa uchaf yng Nghymru a Lloegr.
                Mae chwe phrif lwybr cerdded i’r copa, pob un yn cynnig heriau a golygfeydd unigryw.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {snowdonPathsCy.map((path, idx) => (
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
                    Pellter: <span className="text-stone-600 font-normal">{path.distance}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mountain Safety Notice */}
            <div className="bg-amber-50 border-2 border-[#efda07] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start gap-4">
              <ShieldAlert className="w-8 h-8 text-amber-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-architects text-lg sm:text-xl font-bold text-stone-900 uppercase mb-2">
                  Cyngor Diogelwch ar y Mynydd
                </h3>
                <p className="text-stone-700 text-sm leading-relaxed">
                  Mynnwch ragolwg tywydd lleol dibynadwy cyn cychwyn a chynlluniwch lwybr sy’n addas i’r
                  amodau. Gwiriwch eich offer cyn gadael: ewch â dillad gwrth-ddŵr, dillad cynnes ychwanegol,
                  het, menig, bwyd, digon o ddŵr, map, cwmpas a bag goroesi. Dysgwch sgiliau sylfaenol o fordwyo
                  mynydd. Os bydd y tywydd yn gwaethygu, trowch yn ôl. Peidiwch â dibynnu’n llwyr ar ffonau
                  symudol, oherwydd gall signalau mynydd fod yn ysbeidiol.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Local Area & Stay FAQ Section (GEO Optimized) */}
        <FaqSection isCymraeg={true} />

        {/* Footer */}
        <LiveSiteFooter isCymraeg={true} />
      </main>
    </div>
  );
}
