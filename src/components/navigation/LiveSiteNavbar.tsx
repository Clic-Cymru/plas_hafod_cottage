'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPath?: string;
  isCymraeg?: boolean;
}

export function LiveSiteNavbar({ currentPath = '/', isCymraeg = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: isCymraeg ? 'HAFAN' : 'HOME', href: isCymraeg ? '/cy' : '/' },
    {
      label: isCymraeg ? 'ENGLISH VERSION' : 'BWTHYN PLAS HAFOD – CYMRAEG',
      href: isCymraeg ? '/' : '/cy',
    },
    { label: isCymraeg ? 'ARDAL LEOL' : 'LOCAL AREA', href: '/local-area' },
    { label: isCymraeg ? 'ADOLYGIADAU' : 'REVIEWS', href: '/reviews' },
    { label: 'BRYN BUGEILIAID BACH', href: '/bryn-bugeiliaid-bach' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 text-stone-800 shadow-sm backdrop-blur-md py-2 border-b border-stone-200'
          : 'bg-stone-900/40 text-white backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href={isCymraeg ? '/cy' : '/'} className="flex items-center shrink-0">
          <div className="relative w-36 sm:w-44 h-12">
            <Image
              src={scrolled ? '/images/wp/logo-color.png' : '/images/wp/logo-white.png'}
              alt="Plas Hafod Cottage"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-[13px] tracking-wider uppercase font-medium font-sans">
          {navLinks.map((item, idx) => {
            const isActive = currentPath === item.href;
            return (
              <React.Fragment key={item.label}>
                {idx > 0 && (
                  <span className={`select-none ${scrolled ? 'text-stone-300' : 'text-stone-400/60'}`}>
                    |
                  </span>
                )}
                <Link
                  href={item.href}
                  className={`transition duration-200 hover:text-[#99a0c1] ${
                    isActive
                      ? scrolled
                        ? 'text-[#99a0c1] font-bold'
                        : 'text-amber-300 font-bold'
                      : scrolled
                      ? 'text-stone-700'
                      : 'text-stone-100'
                  }`}
                >
                  {item.label}
                </Link>
              </React.Fragment>
            );
          })}
        </nav>

        {/* Right: Social Icons + Book Now Button */}
        <div className="hidden lg:flex items-center space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className={`transition hover:text-[#99a0c1] ${
              scrolled ? 'text-stone-600' : 'text-white'
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
            className={`transition hover:text-[#99a0c1] ${
              scrolled ? 'text-stone-600' : 'text-white'
            }`}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          <a
            href={
              currentPath === '/bryn-bugeiliaid-bach'
                ? '#book'
                : currentPath === '/' || currentPath === '/cy'
                ? '#book'
                : isCymraeg
                ? '/cy#book'
                : '/#book'
            }
            className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#99a0c1] hover:bg-[#323149] transition shadow-sm"
          >
            {isCymraeg ? 'ARCHEBWCH NAWR' : 'BOOK NOW'}
          </a>
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex lg:hidden items-center space-x-2">
          <a
            href={
              currentPath === '/bryn-bugeiliaid-bach'
                ? '#book'
                : currentPath === '/' || currentPath === '/cy'
                ? '#book'
                : isCymraeg
                ? '/cy#book'
                : '/#book'
            }
            className="px-3 py-1.5 rounded-full text-xs font-semibold uppercase text-white bg-[#99a0c1]"
          >
            {isCymraeg ? 'Archebu' : 'Book'}
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg ${scrolled ? 'text-stone-800' : 'text-white'}`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white text-stone-900 border-b border-stone-200 px-6 py-4 space-y-3 shadow-lg">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold tracking-wider uppercase border-b border-stone-100 hover:text-[#99a0c1]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
