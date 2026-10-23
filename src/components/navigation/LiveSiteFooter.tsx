'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface FooterProps {
  isCymraeg?: boolean;
}

export function LiveSiteFooter({ isCymraeg = false }: FooterProps) {
  const pathname = usePathname() || '/';

  // Compute corresponding URL for toggle
  const cleanPath = pathname.split('?')[0].split('#')[0] || '/';
  let targetLocaleHref = '/';

  if (isCymraeg) {
    // Currently Welsh -> target English
    const rest = cleanPath.replace(/^\/cy/, '') || '/';
    let en = rest;
    if (rest === '/ardal-leol') en = '/local-area';
    else if (rest === '/adolygiadau') en = '/reviews';
    else if (rest === '/cysylltu') en = '/contact';
    else if (rest === '/telerau') en = '/terms';
    targetLocaleHref = en;
  } else {
    // Currently English -> target Welsh
    if (cleanPath === '/' || cleanPath === '/bwthyn-plas-hafod-cymraeg') {
      targetLocaleHref = '/cy';
    } else {
      targetLocaleHref = `/cy${cleanPath}`;
    }
  }

  return (
    <footer className="border-t border-stone-200 bg-white py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dual Logos in Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-20 mb-8">
          <Link href={isCymraeg ? '/cy' : '/'} className="relative w-52 h-20">
            <Image
              src="/images/wp/logo-color.png"
              alt="Plas Hafod Cottage"
              fill
              className="object-contain"
            />
          </Link>
          <Link
            href={isCymraeg ? '/cy/bryn-bugeiliaid-bach' : '/bryn-bugeiliaid-bach'}
            className="relative w-52 h-20"
          >
            <Image
              src="/images/wp/bbb-logo-transparent.png"
              alt="Bryn Bugeiliaid Bach"
              fill
              className="object-contain"
            />
          </Link>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs text-stone-600 mb-6 font-medium">
          <Link href={isCymraeg ? '/cy' : '/'} className="hover:text-stone-900 transition">
            {isCymraeg ? 'Hafan' : 'Home'}
          </Link>
          <Link
            href={isCymraeg ? '/cy/local-area' : '/local-area'}
            className="hover:text-stone-900 transition"
          >
            {isCymraeg ? 'Ardal Leol' : 'Local Area'}
          </Link>
          <Link
            href={isCymraeg ? '/cy/reviews' : '/reviews'}
            className="hover:text-stone-900 transition"
          >
            {isCymraeg ? 'Adolygiadau' : 'Reviews'}
          </Link>
          <Link
            href={isCymraeg ? '/cy/bryn-bugeiliaid-bach' : '/bryn-bugeiliaid-bach'}
            className="hover:text-stone-900 transition"
          >
            Bryn Bugeiliaid Bach
          </Link>
          <Link
            href={isCymraeg ? '/cy/contact' : '/contact'}
            className="hover:text-stone-900 transition font-semibold text-[#99A0C1]"
          >
            {isCymraeg ? 'Cysylltu' : 'Contact Us'}
          </Link>
          <Link
            href={isCymraeg ? '/cy/terms' : '/terms'}
            className="hover:text-stone-900 transition underline underline-offset-2"
          >
            {isCymraeg ? 'Telerau ac Amodau' : 'Terms & Conditions'}
          </Link>
          <span className="text-stone-300">|</span>
          <Link
            href={targetLocaleHref}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 hover:bg-[#99A0C1] hover:text-white transition font-semibold text-stone-700"
          >
            <span>🌐</span>
            <span>{isCymraeg ? 'English Version' : 'Fersiwn Gymraeg'}</span>
          </Link>
        </div>

        <div className="text-center text-xs text-stone-500 font-sans space-y-1">
          <p>© 2026 Plas Hafod Cottage & Bryn Bugeiliaid Bach. Cedwir pob hawl / All rights reserved.</p>
          <p className="text-[11px] text-stone-400">
            Plas Hafod, Nebo, Caernarfon, Gwynedd, LL54 6EB · Snowdonia / Parc Cenedlaethol Eryri
          </p>
        </div>
      </div>
    </footer>
  );
}
