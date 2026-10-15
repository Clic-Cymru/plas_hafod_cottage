import { Metadata } from 'next';
import Image from 'next/image';
import { LiveSiteNavbar } from '@/components/navigation/LiveSiteNavbar';
import { LiveSiteSisterPropertyAndAccreditations } from '@/components/cottage/LiveSiteSisterPropertyAndAccreditations';
import { Star, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Guest Reviews & Testimonials - Bwthyn Plas Hafod Cottage',
  description:
    'Read real guest reviews and guestbook entries from Airbnb, Vrbo, and TripAdvisor for Plas Hafod Cottage and Bryn Bugeiliaid Bach in Snowdonia.',
};

const reviews = [
  {
    author: 'Megan',
    source: 'Vrbo',
    logo: '/images/wp/logo-vrbo.png',
    stars: 5,
    text: 'We had a fantastic stay at Plas Hafod. Such a beautiful location and the cottage had everything we needed. Siwsan and Neil were fantastic hosts and we will most certainly return!',
  },
  {
    author: 'Andrew',
    source: 'Airbnb',
    logo: '/images/wp/logo-airbnb.png',
    stars: 5,
    text: 'The house felt new and very clean. It was perfect for our break. The views were amazing and Siwsan was an amazing host. We would definitely stay again.',
  },
  {
    author: 'Rosie and Clive J.',
    source: 'TripAdvisor',
    logo: '/images/wp/logo-tripadvisor.png',
    stars: 5,
    text: 'Gorgeous views, peace and quiet and spotlessly clean and well equipped cottage, bed was super-king and blissfully comfortable.',
  },
  {
    author: 'Luis',
    source: 'Airbnb',
    logo: '/images/wp/logo-airbnb.png',
    stars: 5,
    text: 'We absolutely loved it! The place was very cozy, warm and extremely clean. The cottage has amazing sea views from the hill, and they left everything ready to light on the chimney which was very pleasant. We arrived very late and they were very kind leaving the heating and the lights on to help us find the place. Siwsan is fantastic and made us feel at home, 100% we will visit again - thanks for everything!',
  },
  {
    author: 'Simon',
    source: 'Vrbo',
    logo: '/images/wp/logo-vrbo.png',
    stars: 5,
    text: 'Excellent property, in the hills surrounded by pure countryside. Lovely setting and views. Property itself was excellent condition, modern living quarters with new amenities with stunning views. Garden was fenced in so dogs had free roam there. Only spent a few days here but the whole family will be returning again in the future.',
  },
  {
    author: 'Joanne',
    source: 'Airbnb',
    logo: '/images/wp/logo-airbnb.png',
    stars: 5,
    text: 'What a beautiful cottage. So clean and tidy. In a gorgeous location, so peaceful with an amazing sea view. The cottage was fully equipped with everything: hairdryer, washing-up liquid, shower gel, lovely fluffy towels. Would definitely return.',
  },
  {
    author: 'Sally',
    source: 'TripAdvisor',
    logo: '/images/wp/logo-tripadvisor.png',
    stars: 5,
    text: 'If you are looking to get away this is the place to stay whatever the season you want to go. Immaculate, comfortable, views that you could only dream of, enclosed garden so the dogs are safe. Siwsan and Neil the perfect hosts, will definitely return Sally, Gary, Pip and Willow.',
  },
  {
    author: 'Prue',
    source: 'Airbnb',
    logo: '/images/wp/logo-airbnb.png',
    stars: 5,
    text: 'Fantastic place. The location is wonderful (and the views stunning) with masses of walks directly from the front door and total peace and quiet. The cottage was ideal for us and the dog, who appreciated the enclosed garden, and it was so thoughtfully equipped - everything we could possibly need, and sparkling clean. Easy to get to the beach at Aberdesach or Dinas. We had a great week there and strongly recommend it.',
  },
];

const guestbookClips = [
  { id: 1, src: '/images/wp/review-clip-1.jpg', alt: 'Guestbook comment 1' },
  { id: 2, src: '/images/wp/review-clip-2.jpg', alt: 'Guestbook comment 2' },
  { id: 3, src: '/images/wp/review-clip-3.jpg', alt: 'Guestbook comment 3' },
  { id: 4, src: '/images/wp/review-clip-4.jpg', alt: 'Guestbook comment 4' },
  { id: 5, src: '/images/wp/review-clip-5.jpg', alt: 'Guestbook comment 5' },
  { id: 6, src: '/images/wp/review-clip-6.jpg', alt: 'Guestbook comment 6' },
];

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#333333] flex flex-col font-sans selection:bg-[#efda07]/30 selection:text-stone-900">
      <LiveSiteNavbar currentPath="/reviews" isCymraeg={false} />

      <main className="flex-1 pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-stone-900 to-stone-800 text-white py-16 sm:py-20 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-architects uppercase tracking-wider text-white mb-4">
              REVIEWS & <span className="text-[#99a0c1]">TESTIMONIALS</span>
            </h1>
            <div className="w-20 h-1 bg-[#efda07] mx-auto mb-6" />
            <p className="text-base sm:text-lg text-stone-300 font-sans">
              See what our guests say after relaxing at Plas Hafod and Bryn Bugeiliaid Bach.
            </p>
          </div>
        </section>

        {/* Reviews Cards Section */}
        <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-architects uppercase tracking-wide text-stone-900">
              SEE WHAT OUR <span className="text-[#99a0c1]">CUSTOMERS THINK</span>
            </h2>
            <div className="w-16 h-1 bg-[#efda07] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((r, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="font-architects text-lg font-bold text-stone-900">
                      {r.author}
                    </span>
                    <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={r.logo}
                        alt={r.source}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* 5 Stars */}
                  <div className="flex items-center gap-1 mb-4 text-[#efda07]">
                    {[...Array(r.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#efda07]" />
                    ))}
                  </div>

                  <p className="text-stone-600 text-sm leading-relaxed font-sans italic">
                    &ldquo;{r.text}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                  <span className="font-medium text-stone-500">Verified Guest</span>
                  <span>{r.source}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Guestbook Comments Gallery */}
        <section className="bg-stone-100/70 border-t border-stone-200 py-16 sm:py-20">
          <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-4xl font-architects uppercase tracking-wide text-stone-900">
                PLAS HAFOD & BRYN BUGEILIAID BACH <span className="text-[#99a0c1]">GUESTBOOK</span>
              </h2>
              <div className="w-16 h-1 bg-[#efda07] mx-auto mt-3 mb-4" />
              <p className="text-stone-600 text-sm max-w-xl mx-auto">
                Snippets from our handwritten cottage visitors book over the seasons.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {guestbookClips.map((clip) => (
                <div
                  key={clip.id}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border-2 border-white hover:scale-[1.02] transition duration-300"
                >
                  <Image
                    src={clip.src}
                    alt={clip.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sister property and footer */}
        <LiveSiteSisterPropertyAndAccreditations isCymraeg={false} />
      </main>
    </div>
  );
}
