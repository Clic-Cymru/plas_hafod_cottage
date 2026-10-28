import React from 'react';
import Image from 'next/image';
import { Award, Star, CheckCircle2 } from 'lucide-react';
import { Accreditation } from '@/cms/types';

interface Props {
  isCymraeg?: boolean;
  accreditations?: Accreditation[];
}

export function BrynBugeiliaidBachAccreditations({ isCymraeg = false, accreditations }: Props) {
  const awards = isCymraeg
    ? [
        {
          id: 'tra-2026',
          src: '/images/wp/bbb-award-tra.png',
          alt: 'Gwobr Adolygu Teithwyr Booking.com 2026',
          badge: 'Enillydd 2026',
          badgeColor: 'bg-blue-600 text-white',
          title: 'Gwobr Adolygu Teithwyr 2026',
          source: 'Booking.com',
          score: '10 / 10 Sgôr Eithriadol',
          description:
            'Dyfarnwyd am adolygiadau eithriadol gan westeion, glendid rhagorol, a lletygarwch cynnes ym Mryn Bugeiliaid Bach.',
        },
        {
          id: '5-seren',
          src: '/images/wp/bbb-5seren.jpg',
          alt: 'Croeso Cymru 5 Seren Hunan-Ddarpar',
          badge: 'Graddio Swyddogol',
          badgeColor: 'bg-[#efda07] text-stone-900',
          title: 'Graddio 5 Seren Croeso Cymru',
          source: 'Visit Wales / Croeso Cymru',
          score: 'Safon 5 Seren Swyddogol',
          description:
            'Safonau moethus ac ansawdd uchaf ardystiedig a ddilyswyd gan gynllun graddio twristiaeth cenedlaethol Cymru.',
        },
        {
          id: 'tra-2025',
          src: '/images/wp/bbb-award-superhost.jpeg',
          alt: 'Gwobr Adolygu Teithwyr Booking.com 2025',
          badge: 'Rhagoriaeth Barhaus',
          badgeColor: 'bg-stone-800 text-white',
          title: 'Gwobr Adolygu Teithwyr 2025',
          source: 'Booking.com',
          score: '10 / 10 Sgôr Eithriadol',
          description:
            'Cydnabyddiaeth flynyddol am ddarparu profiadau gwyliau o’r radd flaenaf i westeion o bob cwr o’r byd.',
        },
      ]
    : [
        {
          id: 'tra-2026',
          src: '/images/wp/bbb-award-tra.png',
          alt: 'Booking.com Traveller Review Awards 2026',
          badge: '2026 Winner',
          badgeColor: 'bg-blue-600 text-white',
          title: 'Traveller Review Award 2026',
          source: 'Booking.com',
          score: '10 / 10 Exceptional Score',
          description:
            'Awarded for exceptional guest feedback, immaculate cleanliness, and heartfelt hospitality at Bryn Bugeiliaid Bach.',
        },
        {
          id: '5-seren',
          src: '/images/wp/bbb-5seren.jpg',
          alt: 'Visit Wales 5 Star Self-Catering Grading',
          badge: 'Official Grading',
          badgeColor: 'bg-[#efda07] text-stone-900',
          title: 'Visit Wales 5-Star Grading',
          source: 'Visit Wales / Croeso Cymru',
          score: 'Official 5-Star Luxury Standard',
          description:
            'Certified 5-star quality and luxury standards verified by the official Welsh Government tourism assessment scheme.',
        },
        {
          id: 'tra-2025',
          src: '/images/wp/bbb-award-superhost.jpeg',
          alt: 'Booking.com Traveller Review Awards 2025',
          badge: 'Consecutive Excellence',
          badgeColor: 'bg-stone-800 text-white',
          title: 'Traveller Review Award 2025',
          source: 'Booking.com',
          score: '10 / 10 Exceptional Score',
          description:
            'Consecutive years of unbroken 10/10 guest satisfaction and memorable self-catering escapes in Snowdonia.',
        },
      ];

  const displayAwards =
    accreditations && accreditations.length > 0
      ? accreditations.map((a) => ({
          id: a.id,
          src: a.imageUrl,
          alt: a.title,
          badge: a.badge,
          badgeColor: a.badgeColor || 'bg-[#efda07] text-stone-900',
          title: a.title,
          source: a.source,
          score: a.score || '',
          description: a.description,
        }))
      : awards;

  return (
    <section className="bg-white py-16 sm:py-24 border-b border-stone-200">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#99A0C1]/15 border border-[#99A0C1]/40 text-[#494c68] text-xs font-bold tracking-wider uppercase mb-3 font-sans">
            <Award className="w-3.5 h-3.5 text-[#99A0C1]" />
            {isCymraeg ? 'Cydnabyddiaeth o Ragoriaeth' : 'Recognised For Excellence'}
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-architects uppercase tracking-wider text-stone-900"
            style={{ fontFamily: "'Architects Daughter', cursive, sans-serif" }}
          >
            {isCymraeg ? (
              <>ACHREDITATIONAU AC <span className="text-[#99A0C1]">ANRHYDEDDAU</span></>
            ) : (
              <>ACCREDITATIONS &amp; <span className="text-[#99A0C1]">RECOGNITION</span></>
            )}
          </h2>
          <div className="w-20 sm:w-28 h-1.5 bg-[#efda07] mx-auto mt-3 mb-4" />
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            {isCymraeg
              ? 'Rydym yn hynod falch o’r cydnabyddiaethau swyddogol a dderbyniwyd ar gyfer Bryn Bugeiliaid Bach gan Croeso Cymru a llwyfannau teithio blaenllaw.'
              : 'We take great pride in maintaining the highest standards of luxury, cleanliness, and guest comfort, officially certified by Visit Wales and leading hospitality awards.'}
          </p>
        </div>

        {/* 3 Prominent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayAwards.map((award) => (
            <div
              key={award.id}
              className="bg-[#fbfbfd] rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1 relative"
            >
              {/* Badge Pill */}
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-5 font-sans ${award.badgeColor} shadow-xs`}
              >
                <Star className="w-3 h-3 fill-current" />
                <span>{award.badge}</span>
              </div>

              {/* Award Image Container - Generous & Prominent */}
              <div className="relative w-full h-56 sm:h-64 mb-6 rounded-2xl overflow-hidden p-2 bg-white border border-stone-200/80 shadow-xs flex items-center justify-center">
                <Image
                  src={award.src}
                  alt={award.alt}
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Title & Organization */}
              <h3
                className="text-xl sm:text-2xl font-architects uppercase text-stone-900 mb-1"
                style={{ fontFamily: "'Architects Daughter', cursive, sans-serif" }}
              >
                {award.title}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3 font-sans">
                {award.source}
              </p>

              {/* Rating Highlight */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-[#efda07]/40 text-xs font-bold mb-4 font-sans">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                <span>{award.score}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-stone-600 leading-relaxed font-sans">
                {award.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
