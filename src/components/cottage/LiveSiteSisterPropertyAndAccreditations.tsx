import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SisterProps {
  isCymraeg?: boolean;
  isBBBPage?: boolean;
}

const accreditationImages = [
  { id: 1, src: '/images/wp/award-plastic-free.jpg', alt: 'Plastic Free Business Copa Gold' },
  { id: 2, src: '/images/wp/award-eryri-ambassador.jpg', alt: 'Llysgennad Eryri Ambassador 2026' },
  { id: 3, src: '/images/wp/award-welsh-hospitality.jpeg', alt: 'Best of Welsh Hospitality Awards 2026 Finalist' },
  { id: 4, src: '/images/wp/award-superhost.jpg', alt: 'Airbnb Superhost Award' },
  { id: 5, src: '/images/wp/award-best-north-wales.jpg', alt: 'Best of North Wales Business Awards' },
  { id: 6, src: '/images/wp/award-ph-5star.jpg', alt: 'Visit Wales 5-star Grading Certificate' },
];

const croesoBadges = [
  { id: 7, src: '/images/wp/croeso-cyclists.jpg', alt: 'Croeso Beicwyr Cyclists Welcome' },
  { id: 8, src: '/images/wp/croeso-pets.jpg', alt: 'Croeso Anifeiliaid Pets Welcome' },
  { id: 9, src: '/images/wp/croeso-tv.jpg', alt: 'Croeso Criwiau TV/Film Crew Welcome' },
  { id: 10, src: '/images/wp/croeso-walkers.jpg', alt: 'Croeso Cerddwyr Walkers Welcome' },
];

export function LiveSiteSisterPropertyAndAccreditations({
  isCymraeg = false,
  isBBBPage = false,
}: SisterProps) {
  return (
    <div className="bg-[#fbfbfd] text-[#333333]">
      {/* Wave Separator */}
      <div className="w-full overflow-hidden leading-none py-6">
        <svg
          className="w-full h-8 sm:h-12 text-[#99a0c1]/40"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M0,30 Q30,10 60,30 T120,30 T180,30 T240,30 T300,30 T360,30 T420,30 T480,30 T540,30 T600,30 T660,30 T720,30 T780,30 T840,30 T900,30 T960,30 T1020,30 T1080,30 T1140,30 T1200,30" />
        </svg>
      </div>

      {/* 1. Sister Property Section */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl sm:text-4xl font-architects text-center uppercase tracking-wide text-stone-900 mb-12">
          {isBBBPage ? (
            <>
              {isCymraeg ? 'A YDYCH WEDI YSTYRIED EIN PRIF FWTHYN - ' : 'HAVE YOU CONSIDERED OUR MAIN COTTAGE - '}{' '}
              <span className="text-[#99a0c1]">PLAS HAFOD COTTAGE</span>
            </>
          ) : (
            <>
              {isCymraeg
                ? 'A YDYCH WEDI YSTYRIED EIN HEIDDO ARALL - '
                : 'HAVE YOU CONSIDERED OUR OTHER PROPERTY - '}{' '}
              <span className="text-[#99a0c1]">BRYN BUGEILIAID BACH</span>
            </>
          )}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          {/* Left Photo with Click here to book button */}
          <div className="md:col-span-6 relative aspect-[16/11] rounded-2xl overflow-hidden shadow-md group">
            <Image
              src={isBBBPage ? '/images/wp/gallery-1.jpg' : '/images/wp/bbb-living.jpg'}
              alt={isBBBPage ? 'Plas Hafod Cottage Exterior' : 'Bryn Bugeiliaid Bach sister accommodation'}
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            <Link
              href={isBBBPage ? (isCymraeg ? '/cy#book' : '/#book') : '/bryn-bugeiliaid-bach#book'}
              className="absolute bottom-5 left-1/2 -translate-x-1/2 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#99a0c1] hover:bg-[#323149] transition shadow-lg"
            >
              {isCymraeg ? 'CLICIWCH YMA I ARCHEBU' : 'CLICK HERE TO BOOK'}
            </Link>
          </div>

          {/* Right Logo & Description */}
          <div className="md:col-span-6 flex flex-col items-center text-center px-4">
            <div className="relative w-72 sm:w-80 h-24 mb-6">
              <Image
                src={isBBBPage ? '/images/wp/logo-color.png' : '/images/wp/bbb-logo.jpg'}
                alt={isBBBPage ? 'Plas Hafod Cottage Logo' : 'Bryn Bugeiliaid Bach Logo'}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-sans max-w-md">
              {isBBBPage ? (
                isCymraeg
                  ? 'Bwthyn traddodiadol moethus 5 seren yn Nyffryn Nantlle gyda lle tân agored, golygfeydd panoramig ac yn croesawu cŵn.'
                  : 'Our traditional 5-star detached Welsh stone cottage with inglenook fireplace, panoramic mountain & sea views, and pet-friendly garden.'
              ) : (
                isCymraeg
                  ? 'Llety 2 wely wedi&#39;i adfer yn hyfryd yn edrych dros Ddyffryn Nantlle ac yn swatio ychydig o dan Grib Nantlle drawiadol yn Eryri hardd.'
                  : 'A beautifully restored 2 bed accommodation overlooking Dyffryn Nantlle and nestled just below the impressive Nantlle Ridge in beautiful Snowdonia.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Accreditations & Partnerships */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl sm:text-5xl font-architects text-center uppercase tracking-wide text-stone-900 mb-6">
          {isCymraeg ? 'EIN' : 'OUR'}{' '}
          <span className="text-[#99a0c1]">
            {isCymraeg ? 'ACHREDIADAU A PHARTNERIAETHAU' : 'ACCREDITATIONS & PARTNERSHIPS'}
          </span>
        </h2>

        {/* Bulleted Points */}
        <div className="text-center max-w-2xl mx-auto space-y-2 text-xs sm:text-sm text-stone-700 font-sans mb-12">
          <p className="font-semibold text-stone-900">
            {isCymraeg ? 'Mae&#39;r ddwy eiddo yn:' : 'Both properties are :'}
          </p>
          <p>★ 5 star Accredited by the Visit Wales grading scheme</p>
          <p>🏅 Copa (Gold) Award by Snowdonia National Park as a Plastic Free Business</p>
          <p className="pt-2 text-stone-600">
            In addition, Plas Hafod Cottage has been further accredited by Visit Wales with successful
            &ldquo;Welcome Awards&rdquo; in the following:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-1 font-medium">
            <span>🐾 Pet Welcome</span>
            <span>🚲 Cyclists Welcome</span>
            <span>🥾 Walkers Welcome</span>
            <span>🎥 TV/Film Crew Welcome</span>
          </div>
        </div>

        {/* Awards Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto mb-8">
          {accreditationImages.map((award) => (
            <div
              key={award.id}
              className="relative aspect-[3/4] bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 p-2 hover:shadow-md transition"
            >
              <Image src={award.src} alt={award.alt} fill className="object-contain p-2" />
            </div>
          ))}
        </div>

        {/* 4 Croeso Welcome Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {croesoBadges.map((badge) => (
            <div
              key={badge.id}
              className="relative aspect-[1/2] rounded-xl overflow-hidden shadow-sm border border-stone-200"
            >
              <Image src={badge.src} alt={badge.alt} fill className="object-contain" />
            </div>
          ))}
        </div>
      </section>

      {/* 3. Live Site Footer */}
      <footer className="border-t border-stone-200 bg-white py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dual Logos in Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-24 mb-8">
            <Link href="/" className="relative w-52 h-20">
              <Image
                src="/images/wp/logo-color.png"
                alt="Plas Hafod Cottage"
                fill
                className="object-contain"
              />
            </Link>
            <Link href="/bryn-bugeiliaid-bach" className="relative w-52 h-20">
              <Image
                src="/images/wp/bbb-logo.jpg"
                alt="Bryn Bugeiliaid Bach"
                fill
                className="object-contain"
              />
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-stone-600 mb-6 font-medium">
            <Link href="/" className="hover:text-stone-900 transition">
              {isCymraeg ? 'Hafan' : 'Home'}
            </Link>
            <Link href="/bwthyn-plas-hafod-cymraeg" className="hover:text-stone-900 transition">
              {isCymraeg ? 'English' : 'Cymraeg'}
            </Link>
            <Link href="/local-area" className="hover:text-stone-900 transition">
              {isCymraeg ? 'Ardal Leol' : 'Local Area'}
            </Link>
            <Link href="/reviews" className="hover:text-stone-900 transition">
              {isCymraeg ? 'Adolygiadau' : 'Reviews'}
            </Link>
            <Link href="/bryn-bugeiliaid-bach" className="hover:text-stone-900 transition">
              Bryn Bugeiliaid Bach
            </Link>
            <Link href="/contact" className="hover:text-stone-900 transition font-semibold text-[#99a0c1]">
              {isCymraeg ? 'Cysylltu' : 'Contact Us'}
            </Link>
            <Link href="/terms" className="hover:text-stone-900 transition underline underline-offset-2">
              {isCymraeg ? 'Telerau ac Amodau' : 'Terms & Conditions'}
            </Link>

          </div>

          <div className="text-center text-xs text-stone-500 font-sans space-y-1">
            <p>
              © 2026 Plas Hafod Cottage & Bryn Bugeiliaid Bach. All rights reserved.
            </p>
            <p className="text-[11px] text-stone-400">
              Snowdonia / Eryri National Park, North Wales, UK
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
