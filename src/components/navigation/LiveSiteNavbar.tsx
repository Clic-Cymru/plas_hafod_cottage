'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { SiteSettings } from '@/cms/types';
import { defaultSiteSettings } from '@/cms/client';

interface NavbarProps {
  currentPath?: string;
  isCymraeg?: boolean;
  siteSettings?: SiteSettings;
}

export function LiveSiteNavbar({ currentPath, isCymraeg = false, siteSettings }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Determine current active route
  const effectivePath = currentPath || pathname || '/';
  const isHomePage =
    effectivePath === '/' ||
    effectivePath === '/cy' ||
    effectivePath === '/bwthyn-plas-hafod-cymraeg';

  // All pages start with a floating transparent header over the hero banner,
  // and smoothly turn into a solid sticky header when scrolled down.
  const isSticky = scrolled;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute corresponding URLs for EN and CY for the current page
  const getLocaleUrls = (path: string) => {
    const cleanPath = path.split('?')[0].split('#')[0] || '/';
    if (
      cleanPath === '/' ||
      cleanPath === '/cy' ||
      cleanPath === '/bwthyn-plas-hafod-cymraeg'
    ) {
      return { en: '/', cy: '/cy' };
    }

    if (cleanPath.startsWith('/cy')) {
      const rest = cleanPath.replace(/^\/cy/, '') || '/';
      let en = rest;
      if (rest === '/ardal-leol') en = '/local-area';
      else if (rest === '/adolygiadau') en = '/reviews';
      else if (rest === '/cysylltu') en = '/contact';
      else if (rest === '/telerau') en = '/terms';
      return { en, cy: cleanPath };
    } else {
      let cy = `/cy${cleanPath}`;
      return { en: cleanPath, cy };
    }
  };

  const localeUrls = getLocaleUrls(effectivePath);

  const navLinks = isCymraeg
    ? [
        { label: 'HAFAN', href: '/cy' },
        { label: 'ARDAL LEOL', href: '/cy/local-area' },
        { label: 'ADOLYGIADAU', href: '/cy/reviews' },
        { label: 'BRYN BUGEILIAID BACH', href: '/cy/bryn-bugeiliaid-bach' },
        { label: 'CYSYLLTU', href: '/cy/contact' },
      ]
    : [
        { label: 'HOME', href: '/' },
        { label: 'LOCAL AREA', href: '/local-area' },
        { label: 'REVIEWS', href: '/reviews' },
        { label: 'BRYN BUGEILIAID BACH', href: '/bryn-bugeiliaid-bach' },
        { label: 'CONTACT', href: '/contact' },
      ];

  const bookHref =
    effectivePath === '/bryn-bugeiliaid-bach' ||
    effectivePath === '/cy/bryn-bugeiliaid-bach' ||
    effectivePath === '/' ||
    effectivePath === '/cy'
      ? '#book'
      : isCymraeg
      ? '/cy#book'
      : '/#book';

  const currentSettings = siteSettings || defaultSiteSettings;
  const mode = currentSettings.offerDisplayMode || (currentSettings.bannerEnabled !== false ? 'banner' : 'none');
  const showBanner = (mode === 'banner' || mode === 'both') && Boolean(currentSettings.bannerAnnouncementEn || currentSettings.bannerAnnouncementCy);
  const bannerText = isCymraeg
    ? (currentSettings.bannerAnnouncementCy || currentSettings.bannerAnnouncementEn)
    : (currentSettings.bannerAnnouncementEn || currentSettings.bannerAnnouncementCy);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* 1. Golden Announcement Banner - Sits above navigation to push header down */}
      {showBanner && bannerText && (
        <aside
          role="region"
          aria-label={isCymraeg ? 'Cynnig Arbennig' : 'Special Offer Announcement'}
          className="w-full bg-[#efda07] text-[#1c1c1c] border-b border-[#d8c504] shadow-sm py-2 px-3 sm:px-4 text-center select-none transition-all"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3 flex-wrap font-architects text-xs sm:text-sm font-bold tracking-wide uppercase">
            <span className="inline-block text-stone-900" aria-hidden="true">
              ✨
            </span>
            <a
              href={currentSettings.bannerLink || bookHref}
              className="hover:underline flex items-center gap-2 transition"
            >
              <span>{bannerText}</span>
              <span className="text-[11px] underline font-sans font-semibold tracking-normal normal-case text-stone-900/80 hover:text-stone-950">
                {isCymraeg ? '(archebwch nawr →)' : '(book direct →)'}
              </span>
            </a>
          </div>
        </aside>
      )}

      {/* 2. Main Navigation Bar Row - Clean background with logo, links and CTAs */}
      <div
        className={`w-full transition-all duration-300 ${
          isSticky
            ? 'bg-white/95 text-stone-800 shadow-sm backdrop-blur-md py-2.5 border-b border-stone-200'
            : 'bg-transparent text-white py-3 sm:py-4'
        }`}
      >
        <div className="w-full max-w-[1540px] mx-auto px-3 sm:px-4 lg:px-6 flex items-center justify-between gap-2 lg:gap-3 xl:gap-5">
        {/* Left: Logo */}
        <Link href={isCymraeg ? '/cy' : '/'} className="flex items-center shrink-0">
          <div className="relative w-28 sm:w-36 xl:w-44 h-10 xl:h-12 shrink-0">
            <Image
              src={isSticky ? '/images/wp/logo-color.png' : '/images/wp/logo-white.png'}
              alt="Plas Hafod Cottage"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Center: Navigation Links with Architects Daughter font & vertical separators */}
        <nav
          className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 2xl:gap-3 text-[13px] xl:text-[15px] 2xl:text-[16px] tracking-wide uppercase font-architects whitespace-nowrap shrink-0"
          style={{ fontFamily: "'Architects Daughter', cursive, sans-serif" }}
        >
          {/* Leading separator before first item */}
          <span
            className={`select-none font-sans font-light transition-colors ${
              isSticky ? 'text-stone-300' : 'text-white/70'
            }`}
            aria-hidden="true"
          >
            |
          </span>

          {navLinks.map((item) => {
            const isActive =
              effectivePath === item.href ||
              (item.href !== '/' &&
                item.href !== '/cy' &&
                effectivePath.startsWith(item.href));

            return (
              <React.Fragment key={item.label}>
                <Link
                  href={item.href}
                  style={{ fontFamily: "'Architects Daughter', cursive, sans-serif" }}
                  className={`transition duration-200 font-architects whitespace-nowrap tracking-wider ${
                    isActive
                      ? isSticky
                        ? 'text-[#99A0C1] font-bold'
                        : 'text-[#efda07] font-bold'
                      : isSticky
                      ? 'text-stone-700 hover:text-[#99A0C1]'
                      : 'text-white hover:text-[#efda07]'
                  }`}
                >
                  {item.label}
                </Link>

                {/* Separator after each item */}
                <span
                  className={`select-none font-sans font-light transition-colors ${
                    isSticky ? 'text-stone-300' : 'text-white/70'
                  }`}
                  aria-hidden="true"
                >
                  |
                </span>
              </React.Fragment>
            );
          })}
        </nav>

        {/* Right: Language Toggle + Social Icons + Book Now Button */}
        <div className="hidden lg:flex items-center space-x-2.5 xl:space-x-3.5 shrink-0">
          {/* Language Toggle Pill */}
          <div
            className={`flex items-center rounded-full p-0.5 border text-xs font-bold tracking-wider transition ${
              isSticky
                ? 'bg-stone-100/90 border-stone-300/80 shadow-xs'
                : 'bg-black/35 backdrop-blur-sm border-white/30'
            }`}
          >
            <Link
              href={localeUrls.en}
              aria-label="Switch to English"
              className={`px-2.5 py-1 rounded-full text-[11px] font-sans font-bold transition duration-200 ${
                !isCymraeg
                  ? 'bg-white text-stone-900 shadow-sm'
                  : isSticky
                  ? 'text-stone-600 hover:text-stone-900'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              EN
            </Link>
            <Link
              href={localeUrls.cy}
              aria-label="Newid i'r Gymraeg"
              className={`px-2.5 py-1 rounded-full text-[11px] font-sans font-bold transition duration-200 ${
                isCymraeg
                  ? 'bg-[#99A0C1] text-white shadow-sm'
                  : isSticky
                  ? 'text-stone-600 hover:text-stone-900'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              CY
            </Link>
          </div>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className={`transition hover:text-[#99A0C1] shrink-0 ${
              isSticky ? 'text-stone-600' : 'text-white'
            }`}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={`transition hover:text-[#99A0C1] shrink-0 ${
              isSticky ? 'text-stone-600' : 'text-white'
            }`}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          <a
            href={bookHref}
            style={{ fontFamily: "'Architects Daughter', cursive, sans-serif" }}
            className="whitespace-nowrap shrink-0 px-4 xl:px-5 py-2 xl:py-2.5 rounded-full text-xs xl:text-sm font-architects font-bold uppercase tracking-wider text-white bg-[#99A0C1] hover:bg-[#323149] transition shadow-sm"
          >
            {isCymraeg ? 'ARCHEBWCH NAWR' : 'BOOK NOW'}
          </a>
        </div>

        {/* Mobile menu controls: Language toggle + Book button + Hamburger */}
        <div className="flex lg:hidden items-center space-x-2">
          {/* Mobile Language Toggle */}
          <div className="flex items-center rounded-full p-0.5 border border-stone-300 bg-white/90 text-[11px] font-bold">
            <Link
              href={localeUrls.en}
              className={`px-2 py-0.5 rounded-full font-sans transition ${
                !isCymraeg
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              EN
            </Link>
            <Link
              href={localeUrls.cy}
              className={`px-2 py-0.5 rounded-full font-sans transition ${
                isCymraeg
                  ? 'bg-[#99A0C1] text-white'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              CY
            </Link>
          </div>

          <a
            href={bookHref}
            style={{ fontFamily: "'Architects Daughter', cursive, sans-serif" }}
            className="px-3 py-1.5 rounded-full text-xs font-architects font-bold uppercase text-white bg-[#99A0C1]"
          >
            {isCymraeg ? 'Archebu' : 'Book'}
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition ${
              isSticky ? 'text-stone-800' : 'text-white'
            }`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white text-stone-900 border-b border-stone-200 px-6 py-4 space-y-3 shadow-lg">
          {/* Mobile Drawer Language Pill */}
          <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider font-sans">
              {isCymraeg ? 'Iaith / Language:' : 'Language / Iaith:'}
            </span>
            <div className="flex items-center rounded-full p-1 border border-stone-300 bg-stone-50 text-xs font-bold">
              <Link
                href={localeUrls.en}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-1 rounded-full font-sans transition ${
                  !isCymraeg
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                English
              </Link>
              <Link
                href={localeUrls.cy}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-1 rounded-full font-sans transition ${
                  isCymraeg
                    ? 'bg-[#99A0C1] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Cymraeg
              </Link>
            </div>
          </div>

          {navLinks.map((item) => {
            const isActive =
              effectivePath === item.href ||
              (item.href !== '/' &&
                item.href !== '/cy' &&
                effectivePath.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontFamily: "'Architects Daughter', cursive, sans-serif" }}
                className={`block py-2 text-lg font-architects font-bold tracking-wider uppercase border-b border-stone-100 transition ${
                  isActive ? 'text-[#99A0C1]' : 'text-stone-800 hover:text-[#99A0C1]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
