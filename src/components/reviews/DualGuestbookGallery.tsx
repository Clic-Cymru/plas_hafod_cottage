'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { GuestbookEntry } from '@/cms/types';

interface DualGuestbookGalleryProps {
  entries: GuestbookEntry[];
  isCymraeg?: boolean;
}

export function DualGuestbookGallery({ entries, isCymraeg = false }: DualGuestbookGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % entries.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + entries.length) % entries.length);
    }
  };

  const currentItem = lightboxIndex !== null ? entries[lightboxIndex] : null;

  return (
    <div>
      {/* Grid of Authentic Handwritten Excerpts (Without artificial names or filters) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {entries.map((clip, idx) => (
          <div
            key={clip.id || idx}
            onClick={() => openLightbox(idx)}
            className="group relative rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm bg-stone-50 hover:shadow-xl hover:border-stone-300 transition-all duration-300 cursor-pointer"
          >
            <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
              <Image
                src={clip.imageUrl || '/images/wp/guestbook/ph-guestbook-01.jpg'}
                alt={
                  isCymraeg
                    ? `Sylw llawysgrif llyfr gwesteion rhif ${idx + 1}`
                    : `Authentic handwritten guestbook note ${idx + 1}`
                }
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="px-3.5 py-2 rounded-full bg-stone-900/85 text-white text-xs font-medium flex items-center gap-1.5 shadow-lg backdrop-blur-xs">
                  <ZoomIn className="w-3.5 h-3.5 text-[#efda07]" />
                  {isCymraeg ? 'Cliciwch i chwyddo' : 'Click to enlarge'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {currentItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-sm animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Top Bar with Property Info & Close */}
          <div
            className="w-full max-w-5xl flex items-center justify-between text-white pb-3 mb-2 border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="font-architects text-lg text-white font-bold flex items-center gap-2">
                <span>{currentItem.property === 'bryn-bugeiliaid-bach' ? '🌿' : '🏡'}</span>
                <span>
                  {currentItem.property === 'bryn-bugeiliaid-bach'
                    ? 'Bryn Bugeiliaid Bach'
                    : isCymraeg
                    ? 'Bwthyn Plas Hafod Cottage'
                    : 'Plas Hafod Cottage'}
                </span>
              </h3>
              <p className="text-xs text-stone-400">
                {isCymraeg ? 'Nodyn Llawysgrif Llyfr Gwesteion' : 'Authentic Handwritten Guestbook Note'} ·{' '}
                {lightboxIndex + 1} / {entries.length}
              </p>
            </div>
            <button
              onClick={closeLightbox}
              className="p-2 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Image Container */}
          <div
            className="relative w-full max-w-5xl h-[75vh] flex items-center justify-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentItem.imageUrl || '/images/wp/guestbook/ph-guestbook-01.jpg'}
              alt={
                isCymraeg
                  ? `Nodyn llyfr gwesteion ${lightboxIndex + 1}`
                  : `Handwritten guestbook note ${lightboxIndex + 1}`
              }
              fill
              className="object-contain"
              priority
            />

            {/* Prev / Next Controls */}
            {entries.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 hover:bg-[#efda07] hover:text-stone-900 text-white transition shadow-lg"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 hover:bg-[#efda07] hover:text-stone-900 text-white transition shadow-lg"
                  aria-label="Next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
