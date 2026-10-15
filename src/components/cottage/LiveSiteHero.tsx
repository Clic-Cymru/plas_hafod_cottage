'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface HeroProps {
  isCymraeg?: boolean;
}

const slides = [
  {
    id: 1,
    src: '/images/wp/hero-slide-1.jpg',
    alt: 'Plas Hafod Cottage panoramic views over Snowdonia and Irish Sea',
  },
  {
    id: 2,
    src: '/images/wp/hero-slide-2.jpg',
    alt: 'Plas Hafod mountain valley and Snowdonia National Park setting',
  },
  {
    id: 3,
    src: '/images/wp/hero-slide-3.jpg',
    alt: 'Plas Hafod cottage grounds and Nantlle Ridge walkway views',
  },
];

export function LiveSiteHero({ isCymraeg = false }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [promoVisible, setPromoVisible] = useState(true);

  // Rotate hero slides every 9 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="relative h-[470px] sm:h-[500px] md:h-[516px] lg:h-[520px] max-h-[530px] flex flex-col justify-between overflow-hidden bg-stone-950">
        {/* Slow, gentle, cinematic Ken Burns keyframes */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes heroKenBurnsSlow {
                0% {
                  transform: scale(1.0);
                }
                100% {
                  transform: scale(1.06);
                }
              }
              .ken-burns-slide {
                animation: heroKenBurnsSlow 28000ms linear forwards;
                transform-origin: center center;
                will-change: transform;
              }
            `,
          }}
        />

        {/* 3-Image Background Slider with Slow Ken Burns Effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Inner wrapper with dynamic key to restart gentle Ken Burns drift on each activation */}
                <div
                  key={`${slide.id}-${isActive ? currentSlide : 'idle'}`}
                  className={`relative w-full h-full ${
                    isActive ? 'ken-burns-slide' : 'scale-100'
                  }`}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    className="object-cover object-center"
                  />
                </div>
              </div>
            );
          })}

          {/* Subtle Balanced Contrast Overlay - bright and scenic, not overly dark */}
          <div className="absolute inset-0 z-20 bg-black/25 bg-gradient-to-b from-stone-950/45 via-transparent to-stone-950/40 pointer-events-none" />
        </div>

        {/* Main Content & Center Watermark Logo */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 pt-16 sm:pt-20 pb-4 text-center">
          {/* Bigger White Watermark Logo */}
          <div className="relative w-full max-w-[650px] sm:max-w-[780px] md:max-w-[860px] lg:max-w-[920px] h-[280px] sm:h-[330px] md:h-[370px] lg:h-[390px] select-none pointer-events-none drop-shadow-2xl">
            <Image
              src="/images/wp/logo-white.png"
              alt="Bwthyn Plas Hafod Cottage"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

      {/* Exact Elementor Wave-Brush SVG Bottom Divider */}
      <div className="relative z-20 w-full overflow-hidden leading-none -mb-[1px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 283.5 27.8"
          preserveAspectRatio="none"
          className="relative block w-full h-[35px] sm:h-[60px] md:h-[75px] text-[#fbfbfd] fill-current"
        >
          <path d="M283.5,9.7c0,0-7.3,4.3-14,4.6c-6.8,0.3-12.6,0-20.9-1.5c-11.3-2-33.1-10.1-44.7-5.7s-12.1,4.6-18,7.4c-6.6,3.2-20,9.6-36.6,9.3C131.6,23.5,99.5,7.2,86.3,8c-1.4,0.1-6.6,0.8-10.5,2c-3.8,1.2-9.4,3.8-17,4.7c-3.2,0.4-8.3,1.1-14.2,0.9c-1.5-0.1-6.3-0.4-12-1.6c-5.7-1.2-11-3.1-15.8-3.7C6.5,9.2,0,10.8,0,10.8V27.8h283.5V9.7z M260.8,11.3c-0.7-1-2-0.4-4.3-0.4c-2.3,0-6.1-1.2-5.8-1.1c0.3,0.1,3.1,1.5,6,1.9C259.7,12.2,261.4,12.3,260.8,11.3z M242.4,8.6c0,0-2.4-0.2-5.6-0.9c-3.2-0.8-10.3-2.8-15.1-3.5c-8.2-1.1-15.8,0-15.1,0.1c0.8,0.1,9.6-0.6,17.6,1.1c3.3,0.7,9.3,2.2,12.4,2.7C239.9,8.7,242.4,8.6,242.4,8.6z M185.2,8.5c1.7-0.7-13.3,4.7-18.5,6.1c-2.1,0.6-6.2,1.6-10,2c-3.9,0.4-8.9,0.4-8.8,0.5c0,0.2,5.8,0.8,11.2,0c5.4-0.8,5.2-1.1,7.6-1.6C170.5,14.7,183.5,9.2,185.2,8.5z M199.1,6.9c0.2,0-0.8-0.4-4.8,1.1c-4,1.5-6.7,3.5-6.9,3.7c-0.2,0.1,3.5-1.8,6.6-3C197,7.5,199,6.9,199.1,6.9z M283,6c-0.1,0.1-1.9,1.1-4.8,2.5s-6.9,2.8-6.7,2.7c0.2,0,3.5-0.6,7.4-2.5C282.8,6.8,283.1,5.9,283,6z M31.3,11.6c0.1-0.2-1.9-0.2-4.5-1.2s-5.4-1.6-7.8-2C15,7.6,7.3,8.5,7.7,8.6C8,8.7,15.9,8.3,20.2,9.3c2.2,0.5,2.4,0.5,5.7,1.6S31.2,11.9,31.3,11.6z M73,9.2c0.4-0.1,3.5-1.6,8.4-2.6c4.9-1.1,8.9-0.5,8.9-0.8c0-0.3-1-0.9-6.2-0.3S72.6,9.3,73,9.2z M71.6,6.7C71.8,6.8,75,5.4,77.3,5c2.3-0.3,1.9-0.5,1.9-0.6c0-0.1-1.1-0.2-2.7,0.2C74.8,5.1,71.4,6.6,71.6,6.7z M93.6,4.4c0.1,0.2,3.5,0.8,5.6,1.8c2.1,1,1.8,0.6,1.9,0.5c0.1-0.1-0.8-0.8-2.4-1.3C97.1,4.8,93.5,4.2,93.6,4.4z M65.4,11.1c-0.1,0.3,0.3,0.5,1.9-0.2s2.6-1.3,2.2-1.2s-0.9,0.4-2.5,0.8C65.3,10.9,65.5,10.8,65.4,11.1z M34.5,12.4c-0.2,0,2.1,0.8,3.3,0.9c1.2,0.1,2,0.1,2-0.2c0-0.3-0.1-0.5-1.6-0.4C36.6,12.8,34.7,12.4,34.5,12.4z M152.2,21.1c-0.1,0.1-2.4-0.3-7.5-0.3c-5,0-13.6-2.4-17.2-3.5c-3.6-1.1,10,3.9,16.5,4.1C150.5,21.6,152.3,21,152.2,21.1z" />
          <path d="M269.6,18c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3C267.7,18.8,269.7,18,269.6,18z" />
          <path d="M227.4,9.8c-0.2-0.1-4.5-1-9.5-1.2c-5-0.2-12.7,0.6-12.3,0.5c0.3-0.1,5.9-1.8,13.3-1.2S227.6,9.9,227.4,9.8z" />
          <path d="M204.5,13.4c-0.1-0.1,2-1,3.2-1.1c1.2-0.1,2,0,2,0.3c0,0.3-0.1,0.5-1.6,0.4C206.4,12.9,204.6,13.5,204.5,13.4z" />
          <path d="M201,10.6c0-0.1-4.4,1.2-6.3,2.2c-1.9,0.9-6.2,3.1-6.1,3.1c0.1,0.1,4.2-1.6,6.3-2.6S201,10.7,201,10.6z" />
          <path d="M154.5,26.7c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3C152.6,27.5,154.6,26.8,154.5,26.7z" />
          <path d="M41.9,19.3c0,0,1.2-0.3,2.9-0.1c1.7,0.2,5.8,0.9,8.2,0.7c4.2-0.4,7.4-2.7,7-2.6c-0.4,0-4.3,2.2-8.6,1.9c-1.8-0.1-5.1-0.5-6.7-0.4S41.9,19.3,41.9,19.3z" />
          <path d="M75.5,12.6c0.2,0.1,2-0.8,4.3-1.1c2.3-0.2,2.1-0.3,2.1-0.5c0-0.1-1.8-0.4-3.4,0C76.9,11.5,75.3,12.5,75.5,12.6z" />
          <path d="M15.6,13.2c0-0.1,4.3,0,6.7,0.5c2.4,0.5,5,1.9,5,2c0,0.1-2.7-0.8-5.1-1.4C19.9,13.7,15.7,13.3,15.6,13.2z" />
        </svg>
      </div>
    </div>

      {/* Floating Special Autumn Offer Card (bottom-right toast, unobtrusive to hero logo) */}
      {promoVisible && (
        <div className="fixed bottom-6 right-6 z-40 max-w-sm sm:max-w-md bg-[#525d73]/95 backdrop-blur-md border-[3px] border-[#efda07] rounded-2xl p-4 sm:p-5 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-500">
          <button
            onClick={() => setPromoVisible(false)}
            className="absolute top-2.5 right-2.5 text-white/80 hover:text-white p-1 rounded-full transition"
            aria-label="Close Offer"
          >
            <X className="w-4 h-4" />
          </button>

          <h2 className="text-lg sm:text-xl font-architects text-white tracking-wide uppercase mb-2">
            {isCymraeg ? 'CYNNIG ARBENNIG HYDREF 2026!' : 'SPECIAL AUTUMN 2026 OFFER!'}
          </h2>

          <p className="text-xs sm:text-sm font-architects text-white/95 leading-relaxed mb-3">
            {isCymraeg
              ? 'Archebwch 3 noson rhwng 1af Hydref a 18fed Rhagfyr (ac eithrio 24/10/26 i 31/10/26) a chewch y 4edd noson AM DDIM!'
              : 'Book 3 nights between 1st October and 18th December (excluding 24/10/26 to 31/10/26) and get 4th night FREE!'}
          </p>

          <a
            href="#book"
            className="inline-block px-5 py-2 rounded-md font-architects text-xs font-bold uppercase tracking-wider bg-[#efda07] text-[#333333] hover:bg-[#ffe600] transition shadow-md"
          >
            {isCymraeg ? 'Archebwch Nawr' : 'Book Now'}
          </a>
        </div>
      )}
    </>
  );
}
