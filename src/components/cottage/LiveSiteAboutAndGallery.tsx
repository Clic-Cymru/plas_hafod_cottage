'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Key,
  Armchair,
  Bed,
  Bath,
  Coffee,
  Paintbrush
} from 'lucide-react';

interface AboutAndGalleryProps {
  isCymraeg?: boolean;
}

const galleryImages = [
  { id: 1, src: '/images/wp/gallery-1.jpg', alt: 'Plas Hafod Cottage Exterior' },
  { id: 2, src: '/images/wp/gallery-2.jpg', alt: 'Plas Hafod Garden Pod' },
  { id: 3, src: '/images/wp/gallery-3.jpg', alt: 'Plas Hafod Covered Outdoor Seating' },
  { id: 4, src: '/images/wp/gallery-4.jpg', alt: 'Plas Hafod Mountain Panorama' },
  { id: 5, src: '/images/wp/gallery-5.jpg', alt: 'Plas Hafod Patio Seating' },
  { id: 6, src: '/images/wp/gallery-6.jpg', alt: 'Plas Hafod Cozy Inglenook Fireplace' },
  { id: 7, src: '/images/wp/gallery-7.jpg', alt: 'Plas Hafod Lounge Beams' },
  { id: 8, src: '/images/wp/gallery-8.jpg', alt: 'Plas Hafod Master King Bedroom' },
  { id: 9, src: '/images/wp/gallery-9.jpg', alt: 'Plas Hafod Twin Bedroom' },
  { id: 10, src: '/images/wp/gallery-10.jpg', alt: 'Plas Hafod Modern Bathroom' },
  { id: 11, src: '/images/wp/gallery-11.jpg', alt: 'Plas Hafod Farmhouse Kitchen' },
  { id: 12, src: '/images/wp/gallery-12.jpg', alt: 'Plas Hafod Garden Sunset' },
];

export function LiveSiteAboutAndGallery({ isCymraeg = false }: AboutAndGalleryProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? galleryImages.length - 3 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= galleryImages.length - 3 ? 0 : prev + 1));
  };

  const visibleImages = galleryImages.slice(currentSlide, currentSlide + 3);

  return (
    <div className="bg-[#fbfbfd] text-[#333333]">
      {/* 1. Welcome Section */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Window View Croeso Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[460px] aspect-[4/5] rounded-[36px] overflow-hidden shadow-xl border-4 border-white ring-1 ring-stone-200">
              <Image
                src="/images/wp/croeso-window.jpg"
                alt="Plas Hafod Croeso Window with Eryri Valley View"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: Text and Narrative */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-5xl font-architects tracking-wide uppercase text-stone-900 leading-tight">
              {isCymraeg ? 'CROESO I' : 'WELCOME TO'}{' '}
              <span className="text-[#99a0c1]">
                {isCymraeg ? 'FWTHYN PLAS HAFOD' : 'PLAS HAFOD COTTAGE'}
              </span>
            </h2>

            {/* Gold Underline Bar */}
            <div className="w-20 h-1 bg-[#efda07] mt-3 mb-6" />

            <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed font-sans">
              {isCymraeg ? (
                <>
                  <p>
                    Wedi&#39;i adeiladu yn y 1800au, mae Plas Hafod wedi&#39;i adnewyddu, ei ymestyn a&#39;i ddodrefnu&#39;n feddylgar i&#39;n safon uchel arferol. Wedi&#39;i leoli oddi ar y llwybr arferol gyda llawer o nodweddion gwreiddiol. Encil rhamantus a chlyd delfrydol ar gyfer cyplau sy&#39;n chwilio am y dihangfa berffaith neu ar gyfer selogion cerdded/dringo neu deuluoedd/ffrindiau sy&#39;n mwynhau ac yn gwerthfawrogi bywyd gwyllt a ffyrdd o fyw gwledig.
                  </p>
                  <p>
                    Wedi&#39;i leoli ar ymyl Parc Cenedlaethol Eryri, gyda llwybr cerdded Crib Nantlle ychydig lathenni o&#39;n mynedfa â gatiau, ym mhentref heddychlon Nebo uwchben Dyffryn Nantlle, mae&#39;r Bwthyn hwn yn mwynhau golygfeydd ysblennydd a bythgofiadwy o fryniau a mynyddoedd mawreddog Gogledd Cymru, cefn gwlad garw, arfordiroedd euraidd, Ynys Môn ac ar ddiwrnodau clir gellir gweld hyd yn oed Mynyddoedd Wicklow mawreddog Iwerddon ar y gorwel.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Built in 1800&#39;s Plas Hafod has been carefully and thoughtfully renovated, extended and furnished to our usual high standard. Situated off the beaten track with many original features. Ideal romantic and cosy retreat for couples looking for the perfect getaway break or for walking/climbing enthusiasts or families/friends whom enjoy and appreciate wildlife and rural lifestyles.
                  </p>
                  <p>
                    Situated on the edge of the Snowdonia National Park, with the walkway of the Nantlle Ridge just yards from our gated entrance, in the peaceful hamlet of Nebo above the Nantlle Valleys, this Cottage enjoying spectacular and unforgettable views of the North Wales hills and magnificent mountains, rugged countryside, golden coastlines, the Isle of Anglesey and on clear days even the majestic Wicklow Mountains of Ireland can be seen on the horizon.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Gallery Carousel Section */}
      <section className="py-12 bg-stone-50/70 border-y border-stone-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-architects text-center tracking-wide uppercase text-stone-900 mb-8">
            {isCymraeg ? 'DELWEDDAU O' : 'IMAGES OF'}{' '}
            <span className="text-[#99a0c1]">PLAS HAFOD</span>
          </h2>

          <div className="relative">
            {/* Gallery Track */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visibleImages.map((img) => (
                <div
                  key={img.id}
                  className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-md border-2 border-white group"
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

            {/* Carousel Navigation Arrows */}
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md border border-stone-200 flex items-center justify-center transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md border border-stone-200 flex items-center justify-center transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Visit Wales 5-Star Rating Section */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-architects tracking-wide uppercase text-stone-900">
              {isCymraeg ? 'GRADDIO 5★' : 'VISIT WALES'}{' '}
              <span className="text-[#99a0c1]">
                {isCymraeg ? 'CROESO CYMRU' : '5★ RATING'}
              </span>
            </h2>

            <p className="text-sm sm:text-base text-stone-600 font-sans">
              {isCymraeg
                ? 'Mae Bwthyn Plas Hafod wedi&#39;i asesu gan Croeso Cymru ac mae wedi ennill Graddfa Ansawdd 5* ragorol yn y meysydd canlynol:'
                : 'Plas Hafod Cottage has been assessed by Visit Wales and has acquired an excellent 5* Quality Grading in the following areas:'}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-architects uppercase tracking-wider text-sm text-stone-800">
              <li className="flex items-center gap-3 p-2 bg-white rounded-lg border border-stone-200/80 shadow-sm">
                <Paintbrush className="w-5 h-5 text-[#99a0c1]" />
                <span>{isCymraeg ? 'Glendid' : 'Cleanliness'}</span>
              </li>
              <li className="flex items-center gap-3 p-2 bg-white rounded-lg border border-stone-200/80 shadow-sm">
                <Key className="w-5 h-5 text-[#99a0c1]" />
                <span>{isCymraeg ? 'Effeithlonrwydd Rheolaeth' : 'Management Efficiency'}</span>
              </li>
              <li className="flex items-center gap-3 p-2 bg-white rounded-lg border border-stone-200/80 shadow-sm">
                <Armchair className="w-5 h-5 text-[#99a0c1]" />
                <span>{isCymraeg ? 'Mannau Byw' : 'Living Areas'}</span>
              </li>
              <li className="flex items-center gap-3 p-2 bg-white rounded-lg border border-stone-200/80 shadow-sm">
                <Bed className="w-5 h-5 text-[#99a0c1]" />
                <span>{isCymraeg ? 'Ystafelloedd Gwely' : 'Bedrooms'}</span>
              </li>
              <li className="flex items-center gap-3 p-2 bg-white rounded-lg border border-stone-200/80 shadow-sm">
                <Bath className="w-5 h-5 text-[#99a0c1]" />
                <span>{isCymraeg ? 'Ystafell Ymolchi' : 'Bathroom'}</span>
              </li>
              <li className="flex items-center gap-3 p-2 bg-white rounded-lg border border-stone-200/80 shadow-sm">
                <Coffee className="w-5 h-5 text-[#99a0c1]" />
                <span>{isCymraeg ? 'Cegin / Ardal Fwyta' : 'Kitchen / Dining Area'}</span>
              </li>
            </ul>
          </div>

          {/* Right: Visit Wales Sign Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-xl border-4 border-white ring-1 ring-stone-200">
              <Image
                src="/images/wp/visit-wales-sign.jpg"
                alt="Visit Wales 5 Star Quality Grading Sign"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
