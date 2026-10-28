'use client';

import React, { useState } from 'react';
import { ChevronDown, MapPin, ShoppingBag, Mountain, Dog, Home, Compass, Car } from 'lucide-react';
import { defaultFaqsEn, defaultFaqsCy, FaqEntry } from '@/data/faqs';

function renderFaqIcon(iconType?: string) {
  switch (iconType) {
    case 'pin':
      return <MapPin className="w-5 h-5 text-[#99A0C1]" />;
    case 'shopping':
      return <ShoppingBag className="w-5 h-5 text-[#efda07]" />;
    case 'mountain':
      return <Mountain className="w-5 h-5 text-[#99A0C1]" />;
    case 'compass':
      return <Compass className="w-5 h-5 text-[#efda07]" />;
    case 'home':
      return <Home className="w-5 h-5 text-[#99A0C1]" />;
    case 'dog':
      return <Dog className="w-5 h-5 text-[#efda07]" />;
    case 'car':
    default:
      return <Car className="w-5 h-5 text-[#99A0C1]" />;
  }
}

interface FaqSectionProps {
  isCymraeg?: boolean;
}

export function FaqSection({ isCymraeg = false }: FaqSectionProps) {
  const faqs = isCymraeg ? defaultFaqsCy : defaultFaqsEn;
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-stone-200/60">
      <div className="text-center mb-12">
        <h2
          className="text-2xl sm:text-4xl font-architects uppercase tracking-wide text-stone-900"
          style={{ fontFamily: "'Architects Daughter', cursive, sans-serif" }}
        >
          {isCymraeg ? (
            <>
              CWESTIYNAU <span className="text-[#99A0C1]">CYFFREDIN</span>
            </>
          ) : (
            <>
              FREQUENTLY ASKED <span className="text-[#99A0C1]">QUESTIONS</span>
            </>
          )}
        </h2>
        <div className="w-16 h-1 bg-[#efda07] mx-auto mt-3 mb-4" />
        <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto">
          {isCymraeg
            ? 'Popeth sydd angen i chi ei wybod am ein lleoliad yn Nebo, amwynderau Pen-y-groes, cerdded Crib Nantlle, ac aros gyda ni.'
            : 'Everything you need to know about our location in Nebo, amenities in nearby Penygroes, walking the Nantlle Ridge, and staying with us.'}
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-white border-[#99A0C1]/60 shadow-md ring-1 ring-[#99A0C1]/20'
                  : 'bg-white/80 hover:bg-white border-stone-200 hover:border-stone-300 shadow-sm'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between text-left p-5 sm:p-6 gap-4 cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 shrink-0">
                    {renderFaqIcon(faq.icon)}
                  </div>
                  <span className="font-semibold text-stone-900 text-sm sm:text-base leading-snug">
                    {faq.question}
                  </span>
                </div>
                <div
                  className={`p-1.5 rounded-full shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#efda07]/30 text-stone-900' : 'text-stone-400 bg-stone-100'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 mt-1 pl-[3.75rem] sm:pl-[4.5rem]">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
