'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Locale, localeDetails } from '@/lib/i18n';
import { enDictionary } from '@/lib/i18n/dictionaries/en';
import { cyDictionary } from '@/lib/i18n/dictionaries/cy';
import { Calendar, Compass, Phone, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentLocale: Locale;
}

export function Navbar({ currentLocale }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dict = currentLocale === 'cy' ? cyDictionary : enDictionary;
  const alternateLocale: Locale = currentLocale === 'en' ? 'cy' : 'en';
  const altInfo = localeDetails[alternateLocale];

  return (
    <header className="sticky top-0 z-50 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 text-stone-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Welsh Tag */}
          <Link href={currentLocale === 'cy' ? '/cy' : '/'} className="flex flex-col group">
            <span className="text-2xl font-serif tracking-widest uppercase font-semibold text-amber-100 group-hover:text-amber-200 transition">
              Plas Hafod
            </span>
            <span className="text-[10px] tracking-widest uppercase text-stone-400 font-sans">
              Eryri • Snowdonia, Cymru
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#about" className="text-stone-300 hover:text-amber-200 transition">
              {dict.nav.cottage}
            </a>
            <a href="#amenities" className="text-stone-300 hover:text-amber-200 transition">
              {dict.nav.features}
            </a>
            <a href="#booking" className="text-stone-300 hover:text-amber-200 transition">
              {dict.nav.pricing}
            </a>
            <a href="#reviews" className="text-stone-300 hover:text-amber-200 transition">
              {dict.nav.reviews}
            </a>
            <a href="#location" className="text-stone-300 hover:text-amber-200 transition">
              {dict.nav.location}
            </a>
          </nav>

          {/* Actions & Language Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <Link
              href={altInfo.pathPrefix || '/'}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-stone-700 hover:border-amber-400/50 bg-stone-800/60 text-xs font-medium text-stone-200 hover:text-white transition"
              title={`Switch to ${altInfo.nativeLabel}`}
            >
              <span>{altInfo.flag}</span>
              <span>{altInfo.nativeLabel}</span>
            </Link>

            {/* Direct Booking CTA */}
            <a
              href="#booking"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-semibold px-4 py-2 rounded-lg text-xs uppercase tracking-wider transition shadow-md shadow-amber-900/30"
            >
              <Calendar className="w-4 h-4 text-stone-950" />
              <span>{dict.nav.bookNow}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              href={altInfo.pathPrefix || '/'}
              className="px-2.5 py-1 text-xs rounded border border-stone-700 text-stone-300"
            >
              {altInfo.flag} {altInfo.nativeLabel}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-400 hover:text-stone-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-800 bg-stone-900/95 px-4 pt-4 pb-6 space-y-3">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base text-stone-200 hover:bg-stone-800"
          >
            {dict.nav.cottage}
          </a>
          <a
            href="#amenities"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base text-stone-200 hover:bg-stone-800"
          >
            {dict.nav.features}
          </a>
          <a
            href="#booking"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base text-stone-200 hover:bg-stone-800"
          >
            {dict.nav.pricing}
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base text-stone-200 hover:bg-stone-800"
          >
            {dict.nav.reviews}
          </a>
          <a
            href="#booking"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center block mt-4 bg-amber-600 text-stone-950 font-semibold py-3 rounded-lg text-sm uppercase tracking-wider"
          >
            {dict.nav.bookNow}
          </a>
        </div>
      )}
    </header>
  );
}
