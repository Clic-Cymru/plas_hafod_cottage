'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Paintbrush,
  Key,
  Armchair,
  Bed,
  Bath,
  Coffee,
  X,
  Maximize2,
  Play,
  Pause,
} from 'lucide-react';
import { liveCarouselImages, CarouselSlide } from '@/data/carouselImages';

interface AboutAndGalleryProps {
  isCymraeg?: boolean;
  galleryImages?: { id: number; src: string; alt: string }[] | null;
}

export function LiveSiteAboutAndGallery({ isCymraeg = false, galleryImages }: AboutAndGalleryProps) {
  const slides = useMemo(
    () => (galleryImages && galleryImages.length > 0 ? galleryImages : liveCarouselImages),
    [galleryImages]
  );
  const total = slides.length; // 44
  const CLONE_COUNT = Math.min(4, total);

  // Extended slides array with clones at both ends for infinite seamless loop
  const extendedSlides = useMemo(
    () => [
      ...slides.slice(-CLONE_COUNT),
      ...slides,
      ...slides.slice(0, CLONE_COUNT),
    ],
    [slides, CLONE_COUNT]
  );

  // Carousel state
  const [trackIndex, setTrackIndex] = useState(CLONE_COUNT);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const carouselTrackRef = useRef<HTMLDivElement>(null);

  // Dynamically adjust visible slides per viewport
  useEffect(() => {
    function updateVisible() {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else if (window.innerWidth < 1280) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    }
    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  const nextSlide = useCallback(() => {
    setIsAnimating(true);
    setTrackIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setIsAnimating(true);
    setTrackIndex((prev) => prev - 1);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    if (trackIndex >= total + CLONE_COUNT) {
      setIsAnimating(false);
      setTrackIndex(trackIndex - total);
    } else if (trackIndex < CLONE_COUNT) {
      setIsAnimating(false);
      setTrackIndex(trackIndex + total);
    }
  }, [trackIndex, total]);

  // Re-enable animation after instant loop snap
  useEffect(() => {
    if (!isAnimating) {
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
      return () => {
        cancelAnimationFrame(raf1);
      };
    }
  }, [isAnimating]);

  // Autoplay timer - paused when hovered or in lightbox
  useEffect(() => {
    if (!isAutoPlaying || isHovered || lightboxIndex !== null) return;
    const interval = setInterval(nextSlide, 4200);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, lightboxIndex, nextSlide]);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % total : null));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + total) % total : null));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, total]);

  const currentPhotoNumber = ((trackIndex - CLONE_COUNT) % total + total) % total + 1;

  return (
    <div className="bg-[#fbfbfd] text-[#333333]">
      {/* ========================================================= */}
      {/* 1. WELCOME TO PLAS HAFOD COTTAGE SECTION                  */}
      {/* Matches WordPress Elementor .elementor-element-2b9d01dd   */}
      {/* Image style: border: 4px solid #99A0C1;                   */}
      {/* border-radius: 90px 30px 90px 30px; box-shadow: 4px 4px 10px rgba(0,0,0,0.5) */}
      {/* ========================================================= */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Plas Hafod Cottage Exterior Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className="relative w-full max-w-[420px] aspect-[3/4] overflow-hidden transition-transform duration-500 hover:scale-[1.01]"
              style={{
                borderRadius: '90px 30px 90px 30px',
                border: '4px solid #99A0C1',
                boxShadow: '4px 4px 10px 0px rgba(0, 0, 0, 0.5)',
              }}
            >
              <Image
                src="/images/wp/plas-hafod-welcome.jpg"
                alt={
                  isCymraeg
                    ? 'Bwthyn Plas Hafod - Bwthyn Traddodiadol Cymreig'
                    : 'Plas Hafod Cottage - Traditional Welsh Stone Holiday Cottage'
                }
                fill
                priority
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: Text Narrative */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-5xl font-architects tracking-wide uppercase text-[#323149] leading-tight">
              {isCymraeg ? 'CROESO I' : 'WELCOME TO'}
              <br />
              <span className="text-[#99A0C1]">
                {isCymraeg ? 'FWTHYN PLAS HAFOD' : 'PLAS HAFOD COTTAGE'}
              </span>
            </h2>

            {/* Gold Accent Divider (Elementor divider #EFDA07) */}
            <div className="w-20 h-1 bg-[#EFDA07] mt-3 mb-6" />

            <div className="space-y-4 text-stone-700 text-base sm:text-lg leading-relaxed font-sans font-light">
              {isCymraeg ? (
                <>
                  <p>
                    Wedi’i adeiladu yn y 1800au, mae Plas Hafod wedi’i adnewyddu, ei ymestyn
                    a’i ddodrefnu’n feddylgar i’n safon uchel arferol. Wedi’i leoli
                    oddi ar y llwybr arferol gyda llawer o nodweddion gwreiddiol. Encil rhamantus a
                    chlyd delfrydol ar gyfer cyplau sy’n chwilio am y dihangfa berffaith neu ar
                    gyfer selogion cerdded/dringo neu deuluoedd/ffrindiau sy’n mwynhau ac yn
                    gwerthfawrogi bywyd gwyllt a ffyrdd o fyw gwledig.
                  </p>
                  <p>
                    Wedi’i leoli ar ymyl Parc Cenedlaethol Eryri, gyda llwybr cerdded Crib Nantlle
                    ychydig lathenni o’n mynedfa â gatiau, ym mhentref heddychlon Nebo uwchben
                    Dyffryn Nantlle, mae’r Bwthyn hwn yn mwynhau golygfeydd ysblennydd a
                    bythgofiadwy o fryniau a mynyddoedd mawreddog Gogledd Cymru, cefn gwlad garw,
                    arfordiroedd euraidd, Ynys Môn ac ar ddiwrnodau clir gellir gweld hyd yn oed
                    Mynyddoedd Wicklow mawreddog Iwerddon ar y gorwel.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Built in 1800’s Plas Hafod has been carefully and thoughtfully renovated,
                    extended and furnished to our usual high standard. Situated off the beaten
                    track with many original features. Ideal romantic and cosy retreat for couples
                    looking for the perfect getaway break or for walking/climbing enthusiasts or
                    families/friends whom enjoy and appreciate wildlife and rural lifestyles.
                  </p>
                  <p>
                    Situated on the edge of the Snowdonia National Park, with the walkway of the
                    Nantlle Ridge just yards from our gated entrance, in the peaceful hamlet of Nebo
                    above the Nantlle Valleys, this Cottage enjoying spectacular and unforgettable
                    views of the North Wales hills and magnificent mountains, rugged countryside,
                    golden coastlines, the Isle of Anglesey and on clear days even the majestic
                    Wicklow Mountains of Ireland can be seen on the horizon.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. IMAGES OF PLAS HAFOD SCROLLING CAROUSEL                */}
      {/* Matches WordPress Elementor .elementor-element-17492189   */}
      {/* & media-carousel widget with all 44 photos                */}
      {/* Slide style: border: 3px solid #99A0C1; border-radius: 15px */}
      {/* ========================================================= */}
      <section className="py-12 bg-[#f4f5f8] border-y border-stone-200/80">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-architects tracking-wide uppercase text-[#323149]">
              {isCymraeg ? 'DELWEDDAU O' : 'IMAGES OF'}{' '}
              <span className="text-[#99A0C1]">PLAS HAFOD</span>
            </h2>
            <div className="w-16 h-1 bg-[#EFDA07] mx-auto mt-2" />
            <p className="text-xs sm:text-sm text-stone-500 font-sans mt-2">
              {isCymraeg
                ? `Archwiliwch ein horiel o ${total} llun - cliciwch ar unrhyw ddelwedd i’w chwyddo`
                : `Explore our complete gallery of ${total} authentic photos — click any image to enlarge`}
            </p>
          </div>

          {/* Carousel Container with Smooth Sliding Track */}
          <div
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Overflow Hidden Window */}
            <div className="overflow-hidden w-full py-1">
              {/* Sliding Track */}
              <div
                ref={carouselTrackRef}
                className="flex will-change-transform"
                style={{
                  transform: `translate3d(-${trackIndex * (100 / visibleCount)}%, 0, 0)`,
                  transition: isAnimating
                    ? 'transform 650ms cubic-bezier(0.25, 1, 0.5, 1)'
                    : 'none',
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {extendedSlides.map((slide, slideIndex) => {
                  const realIndex =
                    ((slideIndex - CLONE_COUNT) % total + total) % total;
                  return (
                    <div
                      key={`${slide.id}-${slideIndex}`}
                      className="shrink-0 px-1.5 sm:px-2"
                      style={{
                        width: `${100 / visibleCount}%`,
                        maxWidth: `${100 / visibleCount}%`,
                      }}
                    >
                      <div
                        onClick={() => setLightboxIndex(realIndex)}
                        className="relative h-[250px] sm:h-[280px] md:h-[310px] lg:h-[330px] overflow-hidden cursor-pointer group/slide transition-transform duration-300 hover:-translate-y-1 bg-stone-200"
                        style={{
                          border: '3px solid #99A0C1',
                          borderRadius: '15px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                        }}
                        title={isCymraeg ? 'Cliciwch i agor' : 'Click to enlarge'}
                      >
                        <Image
                          src={slide.src}
                          alt={slide.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          className="object-cover rounded-[12px] group-hover/slide:scale-105 transition-transform duration-500"
                        />

                        {/* Subtle hover overlay with expand icon */}
                        <div className="absolute inset-0 bg-[#323149]/30 opacity-0 group-hover/slide:opacity-100 transition-opacity duration-300 rounded-[12px] flex items-center justify-center">
                          <div className="p-2.5 bg-white/90 text-[#323149] rounded-full shadow-lg transform scale-90 group-hover/slide:scale-100 transition-transform">
                            <Maximize2 className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-[#323149] hover:bg-[#99A0C1] hover:text-white shadow-xl border-2 border-[#99A0C1] flex items-center justify-center transition z-20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-[#323149] hover:bg-[#99A0C1] hover:text-white shadow-xl border-2 border-[#99A0C1] flex items-center justify-center transition z-20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Carousel Footer: Index indicator + Autoplay controls */}
          <div className="flex items-center justify-between mt-6 px-2 text-xs text-stone-600 font-sans">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAutoPlaying((prev) => !prev)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-300 hover:border-[#99A0C1] text-stone-700 transition"
                aria-label={isAutoPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#99A0C1]" />
                    <span>{isCymraeg ? 'Oedi' : 'Pause'}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#99A0C1]" />
                    <span>{isCymraeg ? 'Chwarae' : 'Play'}</span>
                  </>
                )}
              </button>
              <span className="hidden sm:inline text-stone-400">|</span>
              <span className="hidden sm:inline font-mono">
                {currentPhotoNumber} / {total}
              </span>
            </div>

            {/* Slider progress bar indicator */}
            <div className="w-36 sm:w-64 h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#99A0C1] transition-all duration-300"
                style={{ width: `${(currentPhotoNumber / total) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. VISIT WALES 5* RATING SECTION                          */}
      {/* Matches WordPress Elementor .elementor-element-5487bbb6   */}
      {/* Image style: border: 4px solid #99A0C1;                   */}
      {/* border-radius: 90px 30px 90px 30px; box-shadow: 4px 4px 10px rgba(0,0,0,0.5) */}
      {/* Image: /images/wp/plas-hafod-visit-wales.jpg (7_12_crop)  */}
      {/* ========================================================= */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-architects tracking-wide uppercase text-[#323149] leading-tight">
              {isCymraeg ? 'GRADDIO 5★' : 'VISIT WALES'}{' '}
              <span className="text-[#99A0C1]">
                {isCymraeg ? 'CROESO CYMRU' : '5* RATING'}
              </span>
            </h2>

            {/* Gold Accent Divider */}
            <div className="w-20 h-1 bg-[#EFDA07]" />

            <p className="text-base sm:text-lg text-stone-700 font-sans font-light">
              {isCymraeg
                ? 'Mae Bwthyn Plas Hafod wedi’i asesu gan Croeso Cymru ac mae wedi ennill Graddfa Ansawdd 5* ragorol yn y meysydd canlynol:'
                : 'Plas Hafod Cottage has been assessed by Visit Wales and has acquired an excellent 5* Quality Grading in the following areas:'}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 font-architects uppercase tracking-wider text-sm sm:text-base text-stone-800">
              <li className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200/90 shadow-sm">
                <Paintbrush className="w-5 h-5 text-[#99A0C1]" />
                <span>{isCymraeg ? 'Glendid' : 'CLEANLINESS'}</span>
              </li>
              <li className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200/90 shadow-sm">
                <Key className="w-5 h-5 text-[#99A0C1]" />
                <span>{isCymraeg ? 'Effeithlonrwydd Rheolaeth' : 'MANAGEMENT EFFICIENCY'}</span>
              </li>
              <li className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200/90 shadow-sm">
                <Armchair className="w-5 h-5 text-[#99A0C1]" />
                <span>{isCymraeg ? 'Mannau Byw' : 'LIVING AREAS'}</span>
              </li>
              <li className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200/90 shadow-sm">
                <Bed className="w-5 h-5 text-[#99A0C1]" />
                <span>{isCymraeg ? 'Ystafelloedd Gwely' : 'BEDROOMS'}</span>
              </li>
              <li className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200/90 shadow-sm">
                <Bath className="w-5 h-5 text-[#99A0C1]" />
                <span>{isCymraeg ? 'Ystafell Ymolchi' : 'BATHROOM'}</span>
              </li>
              <li className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200/90 shadow-sm">
                <Coffee className="w-5 h-5 text-[#99A0C1]" />
                <span>{isCymraeg ? 'Cegin / Ardal Fwyta' : 'KITCHEN / DINING AREA'}</span>
              </li>
            </ul>
          </div>

          {/* Right: Authentic Cottage Patio & Grounds Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className="relative w-full max-w-[420px] aspect-[4/3.8] overflow-hidden transition-transform duration-500 hover:scale-[1.01]"
              style={{
                borderRadius: '90px 30px 90px 30px',
                border: '4px solid #99A0C1',
                boxShadow: '4px 4px 10px 0px rgba(0, 0, 0, 0.5)',
              }}
            >
              <Image
                src="/images/wp/plas-hafod-visit-wales.jpg"
                alt={
                  isCymraeg
                    ? 'Golygfeydd a gerddi Bwthyn Plas Hafod'
                    : 'Plas Hafod Cottage grounds, patio and breathtaking mountain views'
                }
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. FULL-SCREEN LIGHTBOX MODAL                             */}
      {/* ========================================================= */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Slide counter */}
          <div className="absolute top-5 left-6 text-white/80 font-mono text-sm sm:text-base z-50">
            {lightboxIndex + 1} / {total}
          </div>

          {/* Previous Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev !== null ? (prev - 1 + total) % total : 0));
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/25 rounded-full transition z-50"
            aria-label="Previous Lightbox Image"
          >
            <ChevronLeft className="w-7 h-7 sm:w-9 sm:h-9" />
          </button>

          {/* Main Lightbox Image */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-[75vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={slides[lightboxIndex].src}
              alt={slides[lightboxIndex].alt}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Next Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev !== null ? (prev + 1) % total : 0));
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/25 rounded-full transition z-50"
            aria-label="Next Lightbox Image"
          >
            <ChevronRight className="w-7 h-7 sm:w-9 sm:h-9" />
          </button>
        </div>
      )}
    </div>
  );
}
