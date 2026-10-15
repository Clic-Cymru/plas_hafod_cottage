import { Locale } from '@/lib/i18n';

export interface CottageJsonLdOptions {
  locale: Locale;
  siteUrl?: string;
}

export function generateCottageJsonLd({ locale, siteUrl = 'https://plashafod.co.uk' }: CottageJsonLdOptions) {
  const isWelsh = locale === 'cy';
  const name = isWelsh ? 'Plas Hafod - Bwthyn Gwyliau Moethus' : 'Plas Hafod - Luxury Welsh Holiday Cottage';
  const description = isWelsh
    ? 'Bwthyn gwyliau moethus o\'r 18fed ganrif yn Eryri gyda lle tân agored, golygfeydd panoramig o\'r mynyddoedd, a chysuron eithriadol.'
    : 'Historic 18th-century luxury holiday cottage in Snowdonia / Eryri with inglenook fireplace, mountain views, and modern boutique comforts.';

  const lodgingBusiness = {
    '@context': 'https://schema.org',
    '@type': ['LodgingBusiness', 'BedAndBreakfast', 'VacationRental'],
    '@id': `${siteUrl}/#lodging`,
    name,
    description,
    url: `${siteUrl}${isWelsh ? '/cy' : ''}`,
    telephone: '+44 1492 000000',
    priceRange: '££',
    currenciesAccepted: 'GBP',
    paymentAccepted: 'Credit Card, Debit Card, Bank Transfer',
    image: [
      `${siteUrl}/images/hero.jpg`,
      `${siteUrl}/images/interior.jpg`,
      `${siteUrl}/images/bedroom.jpg`,
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plas Hafod Lane, Near Betws-y-Coed',
      addressLocality: 'Conwy County / Eryri',
      addressRegion: 'North Wales',
      postalCode: 'LL24 0AA',
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 53.0931,
      longitude: -3.8016,
    },
    checkinTime: '16:00',
    checkoutTime: '10:00',
    petsAllowed: true,
    numberOfRooms: 2,
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Inglenook Wood Fireplace',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Private Mountain View Garden',
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
        name: 'Dog Friendly',
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
    containsPlace: {
      '@type': 'Accommodation',
      name: 'Plas Hafod Cottage',
      occupancy: {
        '@type': 'QuantitativeValue',
        maxValue: 6,
      },
      numberOfBedrooms: 2,
      numberOfBathroomsTotal: 2,
    },
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
