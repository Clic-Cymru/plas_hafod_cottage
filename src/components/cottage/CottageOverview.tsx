import React from 'react';
import Image from 'next/image';
import { Locale } from '@/lib/i18n';
import { enDictionary } from '@/lib/i18n/dictionaries/en';
import { cyDictionary } from '@/lib/i18n/dictionaries/cy';
import {
  Users,
  BedDouble,
  Bath,
  Dog,
  Flame,
  Car,
  Wifi,
  TreePine,
  Sparkles,
  Utensils,
  Coffee,
  CheckCircle,
  MapPin,
} from 'lucide-react';

interface CottageOverviewProps {
  currentLocale: Locale;
}

export function CottageOverview({ currentLocale }: CottageOverviewProps) {
  const dict = currentLocale === 'cy' ? cyDictionary : enDictionary;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.jpg"
            alt="Plas Hafod historic stone cottage in Eryri / Snowdonia"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-950/70 text-amber-300 border border-amber-600/40 backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{dict.hero.badge}</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-serif text-stone-100 font-bold tracking-tight mb-6">
            {dict.hero.title}
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-stone-300 font-light leading-relaxed mb-10">
            {dict.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#booking"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-sm uppercase tracking-wider transition shadow-lg shadow-amber-950/50"
            >
              {dict.hero.ctaCheckAvailability}
            </a>
            <a
              href="#about"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-stone-600 hover:border-amber-400 bg-stone-900/60 backdrop-blur-sm text-stone-200 text-sm font-semibold tracking-wider uppercase transition"
            >
              {dict.hero.ctaExplore}
            </a>
          </div>

          {/* Quick Badges Bar */}
          <div className="mt-14 pt-8 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-stone-300">
            <div className="flex items-center justify-center gap-2 p-2 bg-stone-900/50 rounded-lg backdrop-blur-sm border border-stone-800">
              <Users className="w-4 h-4 text-amber-400" />
              <span>{dict.propertySummary.sleeps}</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 bg-stone-900/50 rounded-lg backdrop-blur-sm border border-stone-800">
              <BedDouble className="w-4 h-4 text-amber-400" />
              <span>{dict.propertySummary.bedrooms}</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 bg-stone-900/50 rounded-lg backdrop-blur-sm border border-stone-800">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>{dict.propertySummary.fireplace}</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 bg-stone-900/50 rounded-lg backdrop-blur-sm border border-stone-800">
              <Dog className="w-4 h-4 text-amber-400" />
              <span>{dict.propertySummary.petFriendly}</span>
            </div>
          </div>
        </div>
      </section>

      {/* About & Heritage Section */}
      <section id="about" className="scroll-mt-24 py-20 bg-stone-950 text-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Story */}
            <div className="space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                {dict.about.heading}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100">
                {dict.about.subheading}
              </h2>
              <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
                {dict.about.paragraph1}
              </p>
              <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
                {dict.about.paragraph2}
              </p>

              {/* Highlights List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                <div className="flex items-center gap-2 text-xs text-stone-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Restored Welsh slate & granite</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Enclosed cottage garden</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Dark sky reserve stargazing</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Underfloor slate heating</span>
                </div>
              </div>
            </div>

            {/* Visual Mosaic */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-stone-800 shadow-xl">
                <Image
                  src="/images/interior.jpg"
                  alt="Plas Hafod cozy interior inglenook fireplace"
                  fill
                  className="object-cover hover:scale-105 transition duration-500"
                />
              </div>
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-stone-800 shadow-xl mt-6">
                <Image
                  src="/images/bedroom.jpg"
                  alt="Plas Hafod luxury king bedroom"
                  fill
                  className="object-cover hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Grid */}
      <section id="amenities" className="scroll-mt-24 py-20 bg-stone-900 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              {dict.amenities.heading}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-100 font-bold mt-2">
              {dict.amenities.subheading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-stone-950 border border-stone-800 rounded-xl p-6 hover:border-amber-500/40 transition">
              <Utensils className="w-7 h-7 text-amber-400 mb-4" />
              <h3 className="font-serif font-semibold text-stone-100 mb-2">Artisan Kitchen</h3>
              <p className="text-xs text-stone-400 leading-relaxed">{dict.amenities.kitchen}</p>
            </div>

            <div className="bg-stone-950 border border-stone-800 rounded-xl p-6 hover:border-amber-500/40 transition">
              <Flame className="w-7 h-7 text-amber-400 mb-4" />
              <h3 className="font-serif font-semibold text-stone-100 mb-2">Inglenook Fireplace</h3>
              <p className="text-xs text-stone-400 leading-relaxed">{dict.amenities.living}</p>
            </div>

            <div className="bg-stone-950 border border-stone-800 rounded-xl p-6 hover:border-amber-500/40 transition">
              <TreePine className="w-7 h-7 text-amber-400 mb-4" />
              <h3 className="font-serif font-semibold text-stone-100 mb-2">Terrace & Views</h3>
              <p className="text-xs text-stone-400 leading-relaxed">{dict.amenities.outdoor}</p>
            </div>

            <div className="bg-stone-950 border border-stone-800 rounded-xl p-6 hover:border-amber-500/40 transition">
              <Coffee className="w-7 h-7 text-amber-400 mb-4" />
              <h3 className="font-serif font-semibold text-stone-100 mb-2">Welsh Welcome Basket</h3>
              <p className="text-xs text-stone-400 leading-relaxed">{dict.amenities.welcomeHamper}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="scroll-mt-24 py-16 bg-stone-950 border-t border-stone-800 text-stone-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <MapPin className="w-8 h-8 text-amber-400 mx-auto mb-3" />
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-100 font-bold mb-3">
            {dict.location.heading}
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed mb-6">
            {dict.location.description}
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-stone-500 bg-stone-900 border border-stone-800 px-4 py-2 rounded-full">
            <span>53°05&apos;35.2&quot;N 3°48&apos;05.8&quot;W</span>
            <span>•</span>
            <span>Eryri National Park, North Wales</span>
          </div>
        </div>
      </section>
    </div>
  );
}
