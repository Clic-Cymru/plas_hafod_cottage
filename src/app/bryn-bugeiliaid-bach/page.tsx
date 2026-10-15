import { Metadata } from 'next';
import Image from 'next/image';
import { LiveSiteNavbar } from '@/components/navigation/LiveSiteNavbar';
import { LiveSiteBooking } from '@/components/booking/LiveSiteBooking';
import { LiveSiteSisterPropertyAndAccreditations } from '@/components/cottage/LiveSiteSisterPropertyAndAccreditations';
import { cmsClient } from '@/cms/client';
import { Sparkles, Flame, Bed, Bath, Coffee, Ban } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bryn Bugeiliaid Bach - Luxury Annexe in Snowdonia',
  description:
    'A beautifully restored 2-bed self-contained annexe overlooking Dyffryn Nantlle with cozy log burner, conservatory, underfloor heating, and 5-star comfort.',
};

const bbbGallery = [
  { id: 1, src: '/images/wp/bbb-gallery-1.jpg', alt: 'Bryn Bugeiliaid Bach Living Room' },
  { id: 2, src: '/images/wp/bbb-gallery-2.jpg', alt: 'Bryn Bugeiliaid Bach Conservatory' },
  { id: 3, src: '/images/wp/bbb-gallery-3.jpg', alt: 'Bryn Bugeiliaid Bach Fireplace' },
  { id: 4, src: '/images/wp/bbb-gallery-4.jpg', alt: 'Bryn Bugeiliaid Bach Master Bedroom' },
  { id: 5, src: '/images/wp/bbb-gallery-5.jpg', alt: 'Bryn Bugeiliaid Bach Double Bedroom' },
  { id: 6, src: '/images/wp/bbb-gallery-6.jpg', alt: 'Bryn Bugeiliaid Bach Bathroom' },
  { id: 7, src: '/images/wp/bbb-gallery-7.jpg', alt: 'Bryn Bugeiliaid Bach Kitchen' },
  { id: 8, src: '/images/wp/bbb-gallery-8.jpg', alt: 'Bryn Bugeiliaid Bach Garden & Firepit' },
];

const bbbAwards = [
  { id: 1, src: '/images/wp/bbb-award-tra.png', alt: 'Traveller Review Awards 2026' },
  { id: 2, src: '/images/wp/bbb-5seren.jpg', alt: 'Croeso Cymru 5 Seren Grading' },
  { id: 3, src: '/images/wp/bbb-award-superhost.jpeg', alt: 'Airbnb Superhost Annexe' },
];

export default async function BrynBugeiliaidBachPage() {
  const [pricingConfig, blockedDates] = await Promise.all([
    cmsClient.getPricingConfig(),
    cmsClient.getBlockedDates(),
  ]);

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#333333] flex flex-col font-sans selection:bg-[#efda07]/30 selection:text-stone-900">
      <LiveSiteNavbar currentPath="/bryn-bugeiliaid-bach" isCymraeg={false} />

      <main className="flex-1 pt-24 sm:pt-28">
        {/* BBB Hero Banner */}
        <section className="relative py-20 sm:py-28 bg-stone-900 text-white overflow-hidden text-center">
          <div className="absolute inset-0 opacity-40">
            <Image
              src="/images/wp/bbb-living.jpg"
              alt="Bryn Bugeiliaid Bach Living Space"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-stone-950/60" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative w-64 sm:w-80 h-28 mx-auto mb-6">
              <Image
                src="/images/wp/bbb-logo-white.png"
                alt="Bryn Bugeiliaid Bach Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-3xl sm:text-5xl font-architects uppercase tracking-wider text-white mb-4">
              BRYN BUGEILIAID <span className="text-[#99a0c1]">BACH</span>
            </h1>
            <div className="w-20 h-1 bg-[#efda07] mx-auto mb-6" />
            <p className="text-base sm:text-xl font-architects text-stone-200 leading-relaxed max-w-2xl mx-auto">
              A cozy self-contained annexe to the main property offering the same stunning views
            </p>
          </div>
        </section>

        {/* BBB Overview & Features */}
        <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6 text-stone-700 text-base leading-relaxed">
              <h2 className="text-3xl sm:text-4xl font-architects uppercase text-stone-900">
                A LUXURIOUS ESCAPE IN <span className="text-[#99a0c1]">DYFFRYN NANTLLE</span>
              </h2>
              <div className="w-16 h-1 bg-[#efda07]" />

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
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-stone-200">
                  <Flame className="w-5 h-5 text-[#efda07]" />
                  <span className="text-xs font-semibold text-stone-800">Log Fire & Heating</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-stone-200">
                  <Bed className="w-5 h-5 text-[#99a0c1]" />
                  <span className="text-xs font-semibold text-stone-800">2 Double Bedrooms</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-stone-200">
                  <Bath className="w-5 h-5 text-[#99a0c1]" />
                  <span className="text-xs font-semibold text-stone-800">Spacious Shower</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-stone-200">
                  <Coffee className="w-5 h-5 text-[#99a0c1]" />
                  <span className="text-xs font-semibold text-stone-800">Full Farmhouse Kitchen</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-stone-200">
                  <Sparkles className="w-5 h-5 text-[#efda07]" />
                  <span className="text-xs font-semibold text-stone-800">Glass Conservatory</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-stone-200">
                  <Sparkles className="w-5 h-5 text-[#efda07]" />
                  <span className="text-xs font-semibold text-stone-800">Fire Pit & Garden</span>
                </div>
              </div>
            </div>

            {/* Right: BBB Awards & Signage */}
            <div className="lg:col-span-5 flex flex-col gap-6 items-center">
              <div className="w-full bg-white rounded-3xl p-6 border border-stone-200 shadow-sm text-center">
                <h3 className="font-architects text-lg uppercase tracking-wider text-stone-900 mb-4">
                  RECOGNITION & AWARDS
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {bbbAwards.map((award) => (
                    <div
                      key={award.id}
                      className="relative aspect-square rounded-xl overflow-hidden border border-stone-200 p-2"
                    >
                      <Image
                        src={award.src}
                        alt={award.alt}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BBB Gallery */}
        <section className="bg-stone-100/70 border-y border-stone-200 py-16 sm:py-20">
          <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-4xl font-architects uppercase tracking-wide text-stone-900">
                IMAGES OF <span className="text-[#99a0c1]">BRYN BUGEILIAID BACH</span>
              </h2>
              <div className="w-16 h-1 bg-[#efda07] mx-auto mt-3" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {bbbGallery.map((img) => (
                <div
                  key={img.id}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border-2 border-white group hover:scale-[1.02] transition duration-300"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BBB Booking Widget */}
        <LiveSiteBooking
          isCymraeg={false}
          pricingConfig={pricingConfig}
          blockedDates={blockedDates}
        />

        {/* Accreditations & Footer */}
        <LiveSiteSisterPropertyAndAccreditations isCymraeg={false} />
      </main>
    </div>
  );
}
