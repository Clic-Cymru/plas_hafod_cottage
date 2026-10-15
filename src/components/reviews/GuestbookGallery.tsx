import React from 'react';
import Image from 'next/image';
import { Locale } from '@/lib/i18n';
import { enDictionary } from '@/lib/i18n/dictionaries/en';
import { cyDictionary } from '@/lib/i18n/dictionaries/cy';
import { GuestbookEntry } from '@/cms/types';
import { Star, Quote, MapPin, Calendar, HeartHandshake } from 'lucide-react';

interface GuestbookGalleryProps {
  currentLocale: Locale;
  entries: GuestbookEntry[];
}

export function GuestbookGallery({ currentLocale, entries }: GuestbookGalleryProps) {
  const dict = currentLocale === 'cy' ? cyDictionary : enDictionary;

  return (
    <section id="reviews" className="scroll-mt-24 py-20 bg-stone-900 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-900/30 text-amber-300 border border-amber-700/50 mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {dict.guestbook.heading}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-100 font-bold tracking-tight">
            {dict.guestbook.subheading}
          </h2>
          <div className="mt-4 flex items-center justify-center gap-6 text-xs text-stone-400">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-stone-200">5.0 / 5.0</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
            <span>•</span>
            <span>Google Reviews & Direct Guestbook</span>
            <span>•</span>
            <span>100% Verified Guests</span>
          </div>
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {entries.map((entry) => {
            const commentText =
              typeof entry.comment === 'string'
                ? entry.comment
                : currentLocale === 'cy'
                ? entry.comment.cy
                : entry.comment.en;

            return (
              <div
                key={entry.id}
                className="bg-stone-950/80 border border-stone-800 rounded-2xl overflow-hidden shadow-lg hover:border-amber-500/40 transition duration-300 flex flex-col justify-between"
              >
                {entry.imageUrl && (
                  <div className="relative h-56 w-full overflow-hidden group">
                    <Image
                      src={entry.imageUrl}
                      alt={`Plas Hafod guest stay by ${entry.author}`}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 text-amber-300 text-xs">
                      {[...Array(entry.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="relative">
                    <Quote className="w-8 h-8 text-amber-500/20 absolute -top-3 -left-2 -z-0" />
                    <p className="relative z-10 text-stone-300 text-sm leading-relaxed italic mb-6">
                      &ldquo;{commentText}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                    <div>
                      <p className="font-semibold text-stone-200">{entry.author}</p>
                      {entry.location && (
                        <p className="flex items-center gap-1 text-stone-500 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          {entry.location}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-stone-500 font-mono">
                      <Calendar className="w-3 h-3" />
                      {entry.stayDate}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
