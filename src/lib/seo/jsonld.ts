export type Locale = 'en' | 'cy';

export interface CottageJsonLdOptions {
  locale: Locale;
  siteUrl?: string;
}

export const SITE_URL = 'https://plashafodcottage.co.uk';

export const COTTAGE_GEO = {
  latitude: 53.0335,
  longitude: -4.2618,
};

export const COTTAGE_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Plas Hafod, Nebo',
  addressLocality: 'Penygroes',
  addressRegion: 'Gwynedd / Eryri (Snowdonia)',
  postalCode: 'LL54 6EB',
  addressCountry: 'GB',
};

export function generateCottageJsonLd({ locale, siteUrl = SITE_URL }: CottageJsonLdOptions) {
  const isWelsh = locale === 'cy';
  const name = isWelsh
    ? 'Bwthyn Plas Hafod a Bryn Bugeiliaid Bach - Llety Gwyliau Moethus'
    : 'Plas Hafod Cottage & Bryn Bugeiliaid Bach - Luxury Welsh Holiday Cottages';
  const description = isWelsh
    ? 'Llety gwyliau moethus 5 seren Croeso Cymru yn Nebo ger Penygroes, Eryri gyda golygfeydd panoramig o fynyddoedd a\'r môr, lle tân agored, a chysuron eithriadol.'
    : '5-star Visit Wales certified luxury holiday cottages in Nebo near Penygroes, Snowdonia / Eryri with inglenook fireplaces, panoramic mountain and sea views, and modern comforts.';

  const lodgingBusiness = {
    '@context': 'https://schema.org',
    '@type': ['LodgingBusiness', 'BedAndBreakfast', 'VacationRental'],
    '@id': `${siteUrl}/#lodging`,
    name,
    description,
    url: `${siteUrl}${isWelsh ? '/cy' : ''}`,
    telephone: '+44 1286 880620',
    priceRange: '££',
    currenciesAccepted: 'GBP',
    paymentAccepted: 'Credit Card, Debit Card, Bank Transfer',
    image: [
      `${siteUrl}/images/wp/hero-bg.jpg`,
      `${siteUrl}/images/wp/bbb-hero-bg.jpg`,
      `${siteUrl}/images/wp/hero-slide-1.jpg`,
      `${siteUrl}/images/wp/snowdon.jpg`,
    ],
    address: COTTAGE_ADDRESS,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COTTAGE_GEO.latitude,
      longitude: COTTAGE_GEO.longitude,
    },
    checkinTime: '16:00',
    checkoutTime: '10:00',
    petsAllowed: true,
    numberOfRooms: 4,
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Inglenook Wood Fireplace / Log Burner',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Private Panoramic Mountain and Sea Views',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Superfast Wi-Fi',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Free Onsite Parking',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Dog Friendly (Plas Hafod Cottage)',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Nantlle Ridge Walking Trail Access Directly from Doorstep',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Visit Wales 5-Star Accredited',
        value: true,
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1',
    },
    containsPlace: [
      {
        '@type': 'Accommodation',
        name: isWelsh ? 'Bwthyn Plas Hafod' : 'Plas Hafod Cottage',
        description: isWelsh
          ? 'Bwthyn hanesyddol o\'r 18fed ganrif gyda lle tân agored, golygfeydd panoramig o\'r môr a\'r mynyddoedd, croeso i gŵn, cysgu 4-6.'
          : 'Historic 18th-century stone holiday cottage with inglenook wood fireplace, panoramic sea & mountain views, dog friendly, sleeps 4-6.',
        occupancy: {
          '@type': 'QuantitativeValue',
          maxValue: 6,
        },
        numberOfBedrooms: 2,
        numberOfBathroomsTotal: 2,
        petsAllowed: true,
        url: `${siteUrl}${isWelsh ? '/cy' : ''}`,
      },
      {
        '@type': 'Accommodation',
        name: 'Bryn Bugeiliaid Bach',
        description: isWelsh
          ? 'Llety moethus hunangynhwysol 2 wely gyda llosgwr coed, ystafell wydr, a gwres o dan y llawr yn edrych dros Ddyffryn Nantlle, cysgu 2-4.'
          : 'Luxury 2-bedroom self-contained annexe overlooking Dyffryn Nantlle with cozy log burner, conservatory, underfloor heating, sleeps 2-4.',
        occupancy: {
          '@type': 'QuantitativeValue',
          maxValue: 4,
        },
        numberOfBedrooms: 2,
        numberOfBathroomsTotal: 1,
        petsAllowed: false,
        url: `${siteUrl}${isWelsh ? '/cy/bryn-bugeiliaid-bach' : '/bryn-bugeiliaid-bach'}`,
      },
    ],
  };

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isWelsh ? 'Hafan' : 'Home',
        item: `${siteUrl}${isWelsh ? '/cy' : ''}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isWelsh ? 'Prisiau ac Archebu' : 'Rates & Booking',
        item: `${siteUrl}${isWelsh ? '/cy' : ''}#booking`,
      },
    ],
  };

  return {
    lodgingBusiness,
    breadcrumbs,
  };
}

export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateContactJsonLd({ locale, siteUrl = SITE_URL }: CottageJsonLdOptions) {
  const isWelsh = locale === 'cy';
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: isWelsh ? 'Cysylltu â Bwthyn Plas Hafod' : 'Contact Plas Hafod Cottage',
    url: `${siteUrl}${isWelsh ? '/cy/contact' : '/contact'}`,
    mainEntity: {
      '@type': 'LodgingBusiness',
      name: 'Plas Hafod Cottage & Bryn Bugeiliaid Bach',
      telephone: '+44 1286 880620',
      address: COTTAGE_ADDRESS,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: COTTAGE_GEO.latitude,
        longitude: COTTAGE_GEO.longitude,
      },
    },
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function generateFaqJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
