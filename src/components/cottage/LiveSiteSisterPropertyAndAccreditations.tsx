'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Star, CheckCircle2 } from 'lucide-react';
import { LiveSiteFooter } from '@/components/navigation/LiveSiteFooter';
import { Accreditation } from '@/cms/types';
import { defaultAccreditations } from '@/data/defaultAccreditations';

interface SisterProps {
  isCymraeg?: boolean;
  isBBBPage?: boolean;
  accreditations?: Accreditation[];
}

const bbbSliderImages = [
  { id: 1, src: '/images/wp/bbb-slide-4.jpg', alt: 'Bryn Bugeiliaid Bach Bedroom Comfort' },
  { id: 2, src: '/images/wp/bbb-slide-1.jpg', alt: 'Bryn Bugeiliaid Bach Conservatory and Grounds' },
  { id: 3, src: '/images/wp/bbb-slide-2.jpg', alt: 'Bryn Bugeiliaid Bach Cozy Living Area with Log Fire' },
  { id: 4, src: '/images/wp/bbb-slide-3.jpg', alt: 'Bryn Bugeiliaid Bach Farmhouse Kitchen and Dining' },
];

const plasHafodSliderImages = [
  { id: 1, src: '/images/wp/plas-hafod-welcome.jpg', alt: 'Plas Hafod Cottage Exterior' },
  { id: 2, src: '/images/wp/carousel/slide-01.jpg', alt: 'Plas Hafod Grounds' },
  { id: 3, src: '/images/wp/carousel/slide-06.jpg', alt: 'Plas Hafod Living Room' },
  { id: 4, src: '/images/wp/carousel/slide-11.jpg', alt: 'Plas Hafod Valley Views' },
];

export function LiveSiteSisterPropertyAndAccreditations({
  isCymraeg = false,
  isBBBPage = false,
  accreditations,
}: SisterProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = isBBBPage ? plasHafodSliderImages : bbbSliderImages;

  const fallbackAwards = defaultAccreditations
    .filter((a) => a.featured !== false && (a.property === 'both' || a.property === 'plas-hafod'))
    .map((a) => ({
      ...a,
      title: isCymraeg ? (a.titleCy || a.title) : a.title,
      score: isCymraeg ? (a.scoreCy || a.score) : a.score,
      description: isCymraeg ? (a.descriptionCy || a.description) : a.description,
    }));

  const displayAwards =
    accreditations && accreditations.length > 0 ? accreditations : fallbackAwards;

  // Auto rotate the sister property slider every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="bg-[#fbfbfd] text-[#333333]">
      {/* Thicker, Wavier Section Separator (Matches original site) */}
      <div className="w-full overflow-hidden leading-none pt-8 pb-3 sm:pb-4 flex justify-center">
        <svg
          className="w-full max-w-[1240px] h-7 sm:h-8 text-[#99A0C1]"
          height="32"
        >
          <defs>
            <pattern
              id="thick-wavy-ribbon"
              width="22"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 0,16 Q 5.5,2 11,16 T 22,16"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </pattern>
          </defs>
          <rect width="100%" height="32" fill="url(#thick-wavy-ribbon)" />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* 1. SISTER PROPERTY SECTION                                */}
      {/* Matches WordPress Elementor .elementor-element-43104334   */}
      {/* Slider container: border: 3px solid #99A0C1;              */}
      {/* border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.5)*/}
      {/* ========================================================= */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-12 sm:pb-16">
        <h2 className="text-2xl sm:text-4xl font-architects text-center uppercase tracking-wide text-[#323149] mb-10">
          {isBBBPage ? (
            <>
              {isCymraeg
                ? 'A YDYCH WEDI YSTYRIED EIN PRIF FWTHYN - '
                : 'HAVE YOU CONSIDERED OUR MAIN COTTAGE - '}{' '}
              <span className="text-[#99A0C1]">PLAS HAFOD COTTAGE</span>
            </>
          ) : (
            <>
              {isCymraeg
                ? 'A YDYCH WEDI YSTYRIED EIN HEIDDO ARALL - '
                : 'HAVE YOU CONSIDERED OUR OTHER PROPERTY - '}{' '}
              <span className="text-[#99A0C1]">BRYN BUGEILIAID BACH</span>
            </>
          )}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: 4-Slide Interactive BBB Image Slider */}
          <div className="md:col-span-6 flex justify-center">
            <div
              className="relative w-full max-w-[540px] aspect-[16/11] overflow-hidden group rounded-xl shadow-xl border-[3px] border-[#99A0C1]"
              style={{
                boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.35)',
              }}
            >
              {slides.map((s, idx) => (
                <div
                  key={s.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    idx === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 768px) 100vw, 540px"
                    className="object-cover"
                  />
                  {/* Subtle dark overlay matching original Elementor background-overlay #00000042 */}
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              ))}

              {/* "CHECK AVAILABILITY" Button centered on bottom of slide */}
              <div className="absolute bottom-6 inset-x-0 z-20 flex justify-center">
                <Link
                  href={
                    isBBBPage
                      ? isCymraeg
                        ? '/cy#book'
                        : '/#book'
                      : isCymraeg
                      ? '/cy/bryn-bugeiliaid-bach#book'
                      : '/bryn-bugeiliaid-bach#book'
                  }
                  className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-architects uppercase tracking-wider text-white bg-[#99A0C1]/90 hover:bg-[#323149] transition shadow-lg border-2 border-white backdrop-blur-xs"
                >
                  {isCymraeg ? 'GWIRIO ARGAELEDD' : 'CHECK AVAILABILITY'}
                </Link>
              </div>

              {/* Slider Dots */}
              <div className="absolute bottom-2 inset-x-0 z-20 flex justify-center gap-2 pb-0.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      idx === activeSlide ? 'bg-white scale-110 shadow' : 'bg-white/60 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: BBB Logo & Narrative */}
          <div className="md:col-span-6 flex flex-col items-center text-center px-4">
            <Link
              href={
                isBBBPage
                  ? isCymraeg
                    ? '/cy'
                    : '/'
                  : isCymraeg
                  ? '/cy/bryn-bugeiliaid-bach'
                  : '/bryn-bugeiliaid-bach'
              }
              className="relative w-full max-w-[380px] sm:max-w-[440px] md:max-w-[460px] aspect-[1301/552] mb-6 hover:opacity-90 transition block"
            >
              <Image
                src={isBBBPage ? '/images/wp/logo-color.png' : '/images/wp/bbb-logo-transparent.png'}
                alt={isBBBPage ? 'Plas Hafod Cottage Logo' : 'Bryn Bugeiliaid Bach Logo'}
                fill
                priority
                sizes="(max-width: 768px) 380px, 460px"
                className="object-contain"
              />
            </Link>

            <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-sans font-light max-w-lg mx-auto">
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

      {/* Thicker, Wavier Section Separator before Accreditations */}
      <div className="w-full overflow-hidden leading-none pt-6 pb-2 flex justify-center">
        <svg
          className="w-full max-w-[1240px] h-7 sm:h-8 text-[#99A0C1]"
          height="32"
        >
          <rect width="100%" height="32" fill="url(#thick-wavy-ribbon)" />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* 2. ACCREDITATIONS & PARTNERSHIPS SECTION                  */}
      {/* Styled to match the modern card aesthetic on Bryn Bugeiliaid Bach */}
      {/* ========================================================= */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Section Heading matching BBB */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#99A0C1]/15 border border-[#99A0C1]/40 text-[#494c68] text-xs font-bold tracking-wider uppercase mb-3 font-sans">
            <Award className="w-3.5 h-3.5 text-[#99A0C1]" />
            {isCymraeg ? 'Cydnabyddiaeth o Ragoriaeth' : 'Recognised For Excellence'}
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-architects uppercase tracking-wider text-stone-900"
            style={{ fontFamily: "'Architects Daughter', cursive, sans-serif" }}
          >
            {isCymraeg ? (
              <>EIN <span className="text-[#99A0C1]">ACHREDIADAU A PHARTNERIAETHAU</span></>
            ) : (
              <>OUR <span className="text-[#99A0C1]">ACCREDITATIONS &amp; PARTNERSHIPS</span></>
            )}
          </h2>
          <div className="w-20 sm:w-28 h-1.5 bg-[#efda07] mx-auto mt-3 mb-4" />
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-600 font-sans leading-relaxed mb-6">
            {isCymraeg
              ? 'Rydym yn hynod falch o’r cydnabyddiaethau swyddogol a dderbyniwyd ar gyfer Bwthyn Plas Hafod gan Croeso Cymru, Awdurdod Parc Cenedlaethol Eryri, a phrif lwyfannau lletygarwch.'
              : 'We take great pride in maintaining the highest standards of luxury, sustainability, and authentic guest care, officially certified by Visit Wales, Snowdonia National Park, and premier global hospitality platforms.'}
          </p>

          {/* Quick Highlights Bar */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-2 px-4 rounded-2xl bg-[#99A0C1]/10 border border-[#99A0C1]/20 text-xs sm:text-sm font-medium text-stone-700">
            <span className="font-bold text-stone-900">
              {isCymraeg ? 'Safonau Allweddol:' : 'Official Standards:'}
            </span>
            <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-stone-200/80 shadow-2xs font-semibold text-stone-800">
              ⭐ 5-Star Visit Wales
            </span>
            <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-stone-200/80 shadow-2xs font-semibold text-stone-800">
              🥇 Copa Gold Plastic Free
            </span>
            <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-stone-200/80 shadow-2xs font-semibold text-stone-800">
              🏆 9.6/10 Booking.com
            </span>
            <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-stone-200/80 shadow-2xs font-semibold text-stone-800">
              🎖️ Airbnb Superhost
            </span>
          </div>
        </div>

        {/* 3-Column Grid of Prominent Cards matching BBB */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayAwards.map((award, index) => (
            <div
              key={award.id}
              className="bg-[#fbfbfd] rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1 relative"
            >
              {/* Badge Pill */}
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-5 font-sans ${award.badgeColor || 'bg-[#efda07] text-stone-900'} shadow-xs`}
              >
                <Star className="w-3 h-3 fill-current" />
                <span>{award.badge}</span>
              </div>

              {/* Award Image Container - Generous & Prominent */}
              <div className="relative w-full h-56 sm:h-64 mb-6 rounded-2xl overflow-hidden p-3 bg-white border border-stone-200/80 shadow-xs flex items-center justify-center">
                {award.id === 'ph-welcome-charters' ? (
                  <div className="grid grid-cols-2 gap-2 w-full h-full p-1">
                    <div className="relative w-full h-full rounded-lg overflow-hidden bg-stone-50 border border-stone-200/60">
                      <Image
                        src="/images/wp/croeso-pets.jpg"
                        alt="Pet Welcome / Croeso Anifeiliaid Anwes"
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="relative w-full h-full rounded-lg overflow-hidden bg-stone-50 border border-stone-200/60">
                      <Image
                        src="/images/wp/croeso-cyclists.jpg"
                        alt="Cyclists Welcome / Croeso Beicwyr"
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="relative w-full h-full rounded-lg overflow-hidden bg-stone-50 border border-stone-200/60">
                      <Image
                        src="/images/wp/croeso-walkers.jpg"
                        alt="Walkers Welcome / Croeso Cerddwyr"
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="relative w-full h-full rounded-lg overflow-hidden bg-stone-50 border border-stone-200/60">
                      <Image
                        src="/images/wp/croeso-tv.jpg"
                        alt="TV & Film Crew Welcome"
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  </div>
                ) : (
                  <Image
                    src={award.imageUrl}
                    alt={award.title}
                    fill
                    loading={index < 6 ? 'eager' : 'lazy'}
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
              </div>

              {/* Title & Organization */}
              <h3
                className="text-xl sm:text-2xl font-architects uppercase text-stone-900 mb-1"
                style={{ fontFamily: "'Architects Daughter', cursive, sans-serif" }}
              >
                {award.title}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3 font-sans">
                {award.source}
              </p>

              {/* Rating / Score Highlight */}
              {award.score && (
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-[#efda07]/40 text-xs font-bold mb-4 font-sans">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>{award.score}</span>
                </div>
              )}

              {/* Description */}
              <p className="text-sm text-stone-600 leading-relaxed font-sans mt-auto">
                {award.description}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* ========================================================= */}
      {/* 3. SITE FOOTER                                            */}
      {/* ========================================================= */}
      <LiveSiteFooter isCymraeg={isCymraeg} />
    </div>
  );
}
