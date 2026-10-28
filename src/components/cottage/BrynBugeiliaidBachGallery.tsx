'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Grid } from 'lucide-react';

export interface BBBImageItem {
  id: number;
  src: string;
  alt: string;
}

const bbbAllImagesEn: BBBImageItem[] = [
  { id: 1, src: '/images/wp/bbb/bbb-01.jpg', alt: 'Bryn Bugeiliaid Bach Exterior & Sunset Views' },
  { id: 2, src: '/images/wp/bbb/bbb-02.jpg', alt: 'Cozy Living Area with Slate Hearth' },
  { id: 3, src: '/images/wp/bbb/bbb-03.jpg', alt: 'Inviting Log Burner & Rustic Fireplace' },
  { id: 4, src: '/images/wp/bbb/bbb-04.jpg', alt: 'Comfortable Seating & Dining Nook' },
  { id: 5, src: '/images/wp/bbb/bbb-05.jpg', alt: 'Glass Conservatory with Panoramic Valley Views' },
  { id: 6, src: '/images/wp/bbb/bbb-06.jpg', alt: 'Conservatory Seating Overlooking Snowdonia' },
  { id: 7, src: '/images/wp/bbb/bbb-07.jpg', alt: 'Master Double Bedroom with Coastal Vistas' },
  { id: 8, src: '/images/wp/bbb/bbb-08.jpg', alt: 'Second Comfortable Double Bedroom' },
  { id: 9, src: '/images/wp/bbb/bbb-09.jpg', alt: 'Spacious Walk-in Shower Room & Vanity' },
  { id: 10, src: '/images/wp/bbb/bbb-10.jpg', alt: 'Bunting Hearts & Character Beams' },
  { id: 11, src: '/images/wp/bbb/bbb-11.jpg', alt: 'Fully Fitted Farmhouse Kitchen' },
  { id: 12, src: '/images/wp/bbb/bbb-12.jpg', alt: 'Kitchen Appliances & Welcome Essentials' },
  { id: 13, src: '/images/wp/bbb/bbb-13.jpg', alt: 'Cottage Dining Table & Welsh Dresser' },
  { id: 14, src: '/images/wp/bbb/bbb-14.jpg', alt: 'Master Bedroom Plush Linens & Pillows' },
  { id: 15, src: '/images/wp/bbb/bbb-15.jpg', alt: 'Bedroom Dressing Table & Natural Light' },
  { id: 16, src: '/images/wp/bbb/bbb-16.jpg', alt: 'Contemporary Shower Detail & Fluffy Towels' },
  { id: 17, src: '/images/wp/bbb/bbb-17.jpg', alt: 'Private Slate Garden Patio with Outdoor Seating' },
  { id: 18, src: '/images/wp/bbb/bbb-18.jpg', alt: 'Evening Fire Pit & Star Gazing Area' },
  { id: 19, src: '/images/wp/bbb/bbb-19.jpg', alt: 'Lush Mountain Backdrop behind Annexe' },
  { id: 20, src: '/images/wp/bbb/bbb-20.jpg', alt: 'Views Across Nantlle Ridge & Sea Coastline' },
  { id: 21, src: '/images/wp/bbb/bbb-21.jpg', alt: 'Evening Ambiance with Warm Lighting' },
  { id: 22, src: '/images/wp/bbb/bbb-22.jpg', alt: 'Welsh Country Accents & Thoughtful Decor' },
  { id: 23, src: '/images/wp/bbb/bbb-23.jpg', alt: 'Bedroom Double Wardrobe & Storage' },
  { id: 24, src: '/images/wp/bbb/bbb-24.jpg', alt: 'Secondary Bedroom Window Vistas' },
  { id: 25, src: '/images/wp/bbb/bbb-25.jpg', alt: 'Heated Towel Rail & Bathroom Finishes' },
  { id: 26, src: '/images/wp/bbb/bbb-26.jpg', alt: 'Underfloor Heating Controls & Modern Comfort' },
  { id: 27, src: '/images/wp/bbb/bbb-27.jpg', alt: 'Outdoor Dining Table in Grassy Garden' },
  { id: 28, src: '/images/wp/bbb/bbb-28.jpg', alt: 'Sunset Glow over Dyffryn Nantlle from Patio' },
  { id: 29, src: '/images/wp/bbb/bbb-29.jpg', alt: 'Private Annexe Entrance & Parking Space' },
  { id: 30, src: '/images/wp/bbb/bbb-30.jpg', alt: 'Romantic Evening Retreat at Bryn Bugeiliaid Bach' },
];

const bbbAllImagesCy: BBBImageItem[] = [
  { id: 1, src: '/images/wp/bbb/bbb-01.jpg', alt: 'Bryn Bugeiliaid Bach a Golygfeydd o Fachlud yr Haul' },
  { id: 2, src: '/images/wp/bbb/bbb-02.jpg', alt: 'Ardal Fyw Clyd gydag Aelwyd Lechi' },
  { id: 3, src: '/images/wp/bbb/bbb-03.jpg', alt: 'Llosgwr Coed Croesawgar a Lle Tân Gwledig' },
  { id: 4, src: '/images/wp/bbb/bbb-04.jpg', alt: 'Seddi Cyfforddus a Chornel Fwyta' },
  { id: 5, src: '/images/wp/bbb/bbb-05.jpg', alt: 'Ystafell Wydr gyda Golygfeydd Panoramig o’r Dyffryn' },
  { id: 6, src: '/images/wp/bbb/bbb-06.jpg', alt: 'Seddi yn yr Ystafell Wydr yn Edrych dros Eryri' },
  { id: 7, src: '/images/wp/bbb/bbb-07.jpg', alt: 'Prif Ystafell Wely Ddwbl gyda Golygfeydd Arfordirol' },
  { id: 8, src: '/images/wp/bbb/bbb-08.jpg', alt: 'Ail Ystafell Wely Ddwbl Gyfforddus' },
  { id: 9, src: '/images/wp/bbb/bbb-09.jpg', alt: 'Ystafell Gawod Fawr a Basn Golchi' },
  { id: 10, src: '/images/wp/bbb/bbb-10.jpg', alt: 'Calonnau Bunting a Thrawstiau Traddodiadol' },
  { id: 11, src: '/images/wp/bbb/bbb-11.jpg', alt: 'Cegin Fferm wedi’i Chyfarparu’n Llawn' },
  { id: 12, src: '/images/wp/bbb/bbb-12.jpg', alt: 'Offer Cegin a Nwyddau Croeso' },
  { id: 13, src: '/images/wp/bbb/bbb-13.jpg', alt: 'Bwrdd Bwyta Bwthyn a Dreser Gymreig' },
  { id: 14, src: '/images/wp/bbb/bbb-14.jpg', alt: 'Prif Ystafell Wely gyda Dillad Gwely Moethus' },
  { id: 15, src: '/images/wp/bbb/bbb-15.jpg', alt: 'Bwrdd Gwisgo a Golau Naturiol' },
  { id: 16, src: '/images/wp/bbb/bbb-16.jpg', alt: 'Manylion Cawod Fodern a Tywelion Meddal' },
  { id: 17, src: '/images/wp/bbb/bbb-17.jpg', alt: 'Patio Ardd Lechi Breifat gyda Seddi Awyr Agored' },
  { id: 18, src: '/images/wp/bbb/bbb-18.jpg', alt: 'Pwll Tân yr Hwyr ac Ardal Syllu ar y Sêr' },
  { id: 19, src: '/images/wp/bbb/bbb-19.jpg', alt: 'Cefndir Mynyddoedd Gwyrddlas tu ôl i’r Anecs' },
  { id: 20, src: '/images/wp/bbb/bbb-20.jpg', alt: 'Golygfeydd dros Grib Nantlle ac Arfordir y Môr' },
  { id: 21, src: '/images/wp/bbb/bbb-21.jpg', alt: 'Awyrgylch Gyfeillgar gyda Golau Cynnes' },
  { id: 22, src: '/images/wp/bbb/bbb-22.jpg', alt: 'Acenion Gwledig Cymreig ac Addurniadau Meddylgar' },
  { id: 23, src: '/images/wp/bbb/bbb-23.jpg', alt: 'Cwpwrdd Dillad Dwbl a Lle Storio' },
  { id: 24, src: '/images/wp/bbb/bbb-24.jpg', alt: 'Golygfeydd o Ffenestr yr Ail Ystafell Wely' },
  { id: 25, src: '/images/wp/bbb/bbb-25.jpg', alt: 'Rheilen Dywelion wedi’i Chynhesu ac Ystafell Ymolchi' },
  { id: 26, src: '/images/wp/bbb/bbb-26.jpg', alt: 'Rheolydd Gwres dan Lawr a Chysur Modern' },
  { id: 27, src: '/images/wp/bbb/bbb-27.jpg', alt: 'Bwrdd Bwyta Awyr Agored yn yr Ardd Laswellt' },
  { id: 28, src: '/images/wp/bbb/bbb-28.jpg', alt: 'Machlud Haul dros Ddyffryn Nantlle o’r Patio' },
  { id: 29, src: '/images/wp/bbb/bbb-29.jpg', alt: 'Mynedfa Breifat i’r Anecs a Man Parcio' },
  { id: 30, src: '/images/wp/bbb/bbb-30.jpg', alt: 'Cilfach Ramantus gyda’r Nos ym Mryn Bugeiliaid Bach' },
];

interface Props {
  isCymraeg?: boolean;
  galleryImages?: BBBImageItem[] | null;
}

export function BrynBugeiliaidBachGallery({ isCymraeg = false, galleryImages }: Props) {
  const defaultImages = isCymraeg ? bbbAllImagesCy : bbbAllImagesEn;
  const images =
    galleryImages && galleryImages.length > 0
      ? galleryImages.map((img, idx) => ({
          id: img.id || idx + 1,
          src: img.src,
          alt: img.alt || defaultImages[idx]?.alt || `Bryn Bugeiliaid Bach #${idx + 1}`,
        }))
      : defaultImages;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  // Show either 12 preview images or all 30 images in the grid
  const displayedImages = showAll ? images : images.slice(0, 12);

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : 0));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0));
      }
    },
    [lightboxIndex, images.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown, lightboxIndex]);

  return (
    <section className="bg-stone-100/70 border-y border-stone-200 py-16 sm:py-24">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#efda07]/15 border border-[#efda07]/40 text-[#856b00] text-xs font-bold tracking-wider uppercase mb-3 font-sans">
            <Sparkles className="w-3.5 h-3.5 text-[#b09000]" />
            {isCymraeg ? 'Archwiliwch y Llety' : 'Explore The Annexe'}
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-architects uppercase tracking-wider text-stone-900"
            style={{ fontFamily: "'Architects Daughter', cursive, sans-serif" }}
          >
            {isCymraeg ? (
              <>DELWEDDAU O <span className="text-[#99A0C1]">FRYN BUGEILIAID BACH</span></>
            ) : (
              <>IMAGES OF <span className="text-[#99A0C1]">BRYN BUGEILIAID BACH</span></>
            )}
          </h2>
          <div className="w-20 sm:w-28 h-1.5 bg-[#efda07] mx-auto mt-3 mb-4" />
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            {isCymraeg
              ? 'Cliciwch ar unrhyw ddelwedd i agor y llyfrgell lawn a modd archwilio manwl.'
              : 'Click any image to open the full interactive lightbox viewer and inspect all 30 photos in detail.'}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedImages.map((img, idx) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              aria-label={`Inspect photo ${img.id}: ${img.alt}`}
              className="group relative aspect-[4/3] w-full text-left rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border-2 border-white bg-stone-200 cursor-pointer transition duration-300 hover:-translate-y-1 focus:outline-hidden focus:ring-4 focus:ring-[#efda07]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition duration-500 ease-out"
              />

              {/* Hover overlay with zoom icon and caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 pointer-events-none">
                <div className="self-end bg-black/50 backdrop-blur-xs text-white p-2 rounded-full border border-white/20 shadow-sm">
                  <Maximize2 className="w-4 h-4 text-[#efda07]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#efda07] drop-shadow-xs">
                    #{img.id} of {images.length}
                  </span>
                  <p className="text-xs font-medium text-white line-clamp-1 drop-shadow-sm font-sans">
                    {img.alt}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* View All / Toggle Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-architects uppercase tracking-wider text-sm font-bold bg-white text-stone-900 border-2 border-stone-300 hover:border-stone-900 hover:bg-stone-900 hover:text-white transition shadow-sm cursor-pointer"
            style={{ fontFamily: "'Architects Daughter', cursive, sans-serif" }}
          >
            <Grid className="w-4 h-4" />
            {showAll
              ? isCymraeg
                ? 'Dangos Llai o Ddelweddau'
                : 'Show Fewer Photos'
              : isCymraeg
              ? `Gweld Pob un o'r ${images.length} Delwedd`
              : `View All ${images.length} Photos`}
          </button>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar: Counter, Title & Close Button */}
          <div
            className="flex items-center justify-between z-10 w-full max-w-7xl mx-auto pb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-white/10 text-[#efda07] font-mono text-xs sm:text-sm font-bold border border-white/15">
                {lightboxIndex + 1} / {images.length}
              </span>
              <span className="text-white/90 text-xs sm:text-sm font-medium hidden sm:inline-block font-sans line-clamp-1 max-w-md">
                {images[lightboxIndex].alt}
              </span>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
              aria-label="Close Lightbox (Esc)"
              title="Close (Esc)"
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>

          {/* Main Stage: Left Arrow + Main Image + Right Arrow */}
          <div
            className="relative flex-1 flex items-center justify-center my-2 max-w-7xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : 0));
              }}
              className="absolute left-2 sm:left-4 z-20 p-2 sm:p-3 text-white/80 hover:text-white bg-black/40 hover:bg-black/80 rounded-full border border-white/20 transition backdrop-blur-sm shadow-lg"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Current Image */}
            <div className="relative w-full h-[65vh] sm:h-[72vh] flex items-center justify-center">
              <Image
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-contain"
                priority
              />
            </div>

            {/* Next Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0));
              }}
              className="absolute right-2 sm:right-4 z-20 p-2 sm:p-3 text-white/80 hover:text-white bg-black/40 hover:bg-black/80 rounded-full border border-white/20 transition backdrop-blur-sm shadow-lg"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>

          {/* Bottom Thumbnail Strip */}
          <div
            className="z-10 w-full max-w-7xl mx-auto pt-2 overflow-x-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent flex items-center justify-center gap-2 pb-1"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-2 py-1 px-2">
              {images.map((thumb, idx) => (
                <button
                  key={thumb.id}
                  onClick={() => setLightboxIndex(idx)}
                  className={`relative w-12 sm:w-16 h-9 sm:h-12 shrink-0 rounded-lg overflow-hidden border-2 transition duration-200 cursor-pointer ${
                    idx === lightboxIndex
                      ? 'border-[#efda07] scale-110 shadow-md ring-2 ring-[#efda07]/40'
                      : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/50'
                  }`}
                  aria-label={`Jump to image ${idx + 1}`}
                >
                  <Image
                    src={thumb.src}
                    alt={thumb.alt}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
