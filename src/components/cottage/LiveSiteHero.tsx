'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface HeroProps {
  isCymraeg?: boolean;
}

export function LiveSiteHero({ isCymraeg = false }: HeroProps) {
  const [promoVisible, setPromoVisible] = useState(true);

  return (
    <div className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-stone-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/wp/hero-bg.jpg"
          alt="Plas Hafod mountain views in Snowdonia"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark vignette overlay */}
        <div className="absolute inset-0 bg-stone-950/45 backdrop-brightness-90" />
      </div>

      {/* Main Content & Center Watermark */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-16 text-center">
        {/* Large Watermark Logo */}
        <div className="relative w-[340px] sm:w-[600px] md:w-[750px] h-[180px] sm:h-[300px] mb-4 opacity-75 select-none pointer-events-none">
          <Image
            src="/images/wp/logo-white.png"
            alt="Bwthyn Plas Hafod Cottage"
            fill
            className="object-contain"
          />
        </div>

        {/* Floating Special Autumn Offer Card */}
        {promoVisible && (
          <div className="relative max-w-xl mx-auto w-full bg-[#525d73]/85 backdrop-blur-md border-[3px] border-[#efda07] rounded-3xl p-6 sm:p-8 text-white shadow-2xl animate-in fade-in zoom-in-95 duration-500">
            <button
              onClick={() => setPromoVisible(false)}
              className="absolute top-3 right-3 text-white/80 hover:text-white p-1 rounded-full transition"
              aria-label="Close Offer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl sm:text-3xl font-architects text-white tracking-wide uppercase mb-3">
              {isCymraeg ? 'CYNNIG ARBENNIG HYDREF 2026!' : 'SPECIAL AUTUMN 2026 OFFER!'}
            </h2>

            <p className="text-sm sm:text-base font-architects text-white/95 leading-relaxed mb-6">
              {isCymraeg
                ? 'Archebwch 3 noson rhwng 1af Hydref a 18fed Rhagfyr (ac eithrio 24/10/26 i 31/10/26) a chewch y 4edd noson AM DDIM!'
                : 'Book 3 nights between 1st October and 18th December (excluding 24/10/26 to 31/10/26) and get 4th night FREE!'}
            </p>

            <a
              href="#book"
              className="inline-block px-8 py-2.5 rounded-md font-architects text-sm font-bold uppercase tracking-wider bg-[#efda07] text-[#333333] hover:bg-[#ffe600] transition shadow-md"
            >
              {isCymraeg ? 'Archebwch Nawr' : 'Book Now'}
            </a>
          </div>
        )}
      </div>

      {/* Elegant Wavy SVG Divider */}
      <div className="relative z-10 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-[40px] sm:h-[70px] text-[#fbfbfd]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </div>
  );
}
