import React from 'react';
import { Locale } from '@/lib/i18n';
import { enDictionary } from '@/lib/i18n/dictionaries/en';
import { cyDictionary } from '@/lib/i18n/dictionaries/cy';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  currentLocale: Locale;
}

export function Footer({ currentLocale }: FooterProps) {
  const dict = currentLocale === 'cy' ? cyDictionary : enDictionary;

  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xl font-serif font-bold text-amber-100 tracking-wider">
              Plas Hafod
            </span>
            <p className="text-xs text-stone-400 mt-1">{dict.footer.tagline}</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-400 bg-stone-900 border border-stone-800 px-4 py-2 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{dict.footer.directBookingGuarantee}</span>
          </div>

          <div className="text-xs text-stone-400 text-center md:text-right">
            <p>
              © 2026 Plas Hafod. {dict.footer.rights}
            </p>
            <p className="mt-1 flex items-center justify-center md:justify-end gap-1 text-[11px] text-stone-500">
              Made with <Heart className="w-3 h-3 text-rose-500 fill-current" /> in Eryri, Cymru
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
