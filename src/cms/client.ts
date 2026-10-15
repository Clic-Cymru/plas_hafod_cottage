import { PricingConfig, BlockedDateRange, BookingInquiry, GuestbookEntry } from './types';

// Pricing rules for Plas Hafod Cottage
export const defaultPricingConfig: PricingConfig = {
  baseRate: 175, // £175 per night standard rate
  depositPercentage: 25, // 25% deposit to secure booking
  cleaningFee: 45,
  seasons: [
    {
      id: 'summer-peak-2026',
      name: 'Summer Peak (Haf)',
      startDate: '2026-06-01',
      endDate: '2026-08-31',
      nightlyRate: 245,
      minStay: 3,
    },
    {
      id: 'autumn-escape-2026',
      name: 'Autumn Gold (Hydref)',
      startDate: '2026-09-01',
      endDate: '2026-10-31',
      nightlyRate: 195,
      minStay: 2,
    },
    {
      id: 'christmas-new-year-2026',
      name: 'Festive Season (Nadolig & Blwyddyn Newydd)',
      startDate: '2026-12-20',
      endDate: '2027-01-05',
      nightlyRate: 285,
      minStay: 4,
    },
  ],
  discounts: [
    {
      id: 'weekly-stay-7',
      name: 'Full Week Retreat (7+ Nights)',
      minNights: 7,
      discountType: 'percentage',
      value: 12, // 12% off for week-long stays
    },
    {
      id: 'fortnight-stay-14',
      name: 'Extended Mountain Stay (14+ Nights)',
      minNights: 14,
      discountType: 'percentage',
      value: 20, // 20% off
    },
  ],
};

// Pricing rules for Bryn Bugeiliaid Bach (Annexe)
export const bbbPricingConfig: PricingConfig = {
  baseRate: 145, // £145 per night standard rate for annexe
  depositPercentage: 25,
  cleaningFee: 35,
  seasons: [
    {
      id: 'bbb-summer-peak-2026',
      name: 'Summer Peak (Haf)',
      startDate: '2026-06-01',
      endDate: '2026-08-31',
      nightlyRate: 195,
      minStay: 3,
    },
    {
      id: 'bbb-autumn-escape-2026',
      name: 'Autumn Gold (Hydref)',
      startDate: '2026-09-01',
      endDate: '2026-10-31',
      nightlyRate: 160,
      minStay: 2,
    },
    {
      id: 'bbb-christmas-2026',
      name: 'Festive Season (Nadolig & Blwyddyn Newydd)',
      startDate: '2026-12-20',
      endDate: '2027-01-05',
      nightlyRate: 225,
      minStay: 3,
    },
  ],
  discounts: [
    {
      id: 'bbb-weekly-stay-7',
      name: 'Full Week Annexe Retreat (7+ Nights)',
      minNights: 7,
      discountType: 'percentage',
      value: 10,
    },
    {
      id: 'bbb-fortnight-stay-14',
      name: 'Extended Annexe Stay (14+ Nights)',
      minNights: 14,
      discountType: 'percentage',
      value: 18,
    },
  ],
};

// Blocked dates for Plas Hafod Cottage
export const defaultBlockedDates: BlockedDateRange[] = [
  {
    id: 'block-ph-1',
    startDate: '2026-10-22',
    endDate: '2026-10-26',
    reason: 'booked',
    notes: 'Plas Hafod Booking #PH-1092',
  },
  {
    id: 'block-ph-2',
    startDate: '2026-11-05',
    endDate: '2026-11-09',
    reason: 'booked',
    notes: 'Plas Hafod Booking #PH-1099',
  },
  {
    id: 'block-ph-3',
    startDate: '2026-11-20',
    endDate: '2026-11-22',
    reason: 'maintenance',
    notes: 'Plas Hafod Chimney Sweep & Clean',
  },
  {
    id: 'block-ph-4',
    startDate: '2026-12-24',
    endDate: '2026-12-29',
    reason: 'booked',
    notes: 'Plas Hafod Christmas Holiday Stay',
  },
];

// Blocked dates for Bryn Bugeiliaid Bach
export const bbbBlockedDates: BlockedDateRange[] = [
  {
    id: 'block-bbb-1',
    startDate: '2026-10-17',
    endDate: '2026-10-20',
    reason: 'booked',
    notes: 'Bryn Bugeiliaid Bach Booking #BBB-501',
  },
  {
    id: 'block-bbb-2',
    startDate: '2026-10-28',
    endDate: '2026-10-31',
    reason: 'booked',
    notes: 'Bryn Bugeiliaid Bach Booking #BBB-504',
  },
  {
    id: 'block-bbb-3',
    startDate: '2026-11-12',
    endDate: '2026-11-16',
    reason: 'booked',
    notes: 'Bryn Bugeiliaid Bach Booking #BBB-510',
  },
  {
    id: 'block-bbb-4',
    startDate: '2026-12-21',
    endDate: '2026-12-27',
    reason: 'booked',
    notes: 'Bryn Bugeiliaid Bach Christmas Retreat',
  },
];

export const defaultGuestbook: GuestbookEntry[] = [
  {
    id: 'gb-1',
    author: 'Elen & David Williams',
    location: 'Cardiff',
    stayDate: 'August 2026',
    rating: 5,
    comment: {
      en: 'Plas Hafod is pure magic. Sitting by the crackling inglenook fire after hiking the ridges of Eryri was sublime. The views across the valley will stay with us forever.',
      cy: 'Mae Plas Hafod yn hud pur. Roedd eistedd wrth y tân agored ar ôl cerdded cribau Eryri yn fendigedig. Bydd yr olygfeydd dros y cwm yn aros gyda ni am byth.',
    },
    imageUrl: '/images/hero.jpg',
  },
  {
    id: 'gb-2',
    author: 'Sarah & Mark Thornton',
    location: 'Bristol',
    stayDate: 'September 2026',
    rating: 5,
    comment: {
      en: 'One of the most authentic, luxurious holiday cottages we have ever stayed in. Spotlessly clean, wonderfully peaceful, and the Welsh welcome hamper was delicious!',
      cy: 'Un o\'r bythynnod gwyliau mwyaf dilys a moethus rydym erioed wedi aros ynddo. Hynod lân, heddychlon iawn, ac roedd y fasged groeso Gymreig yn flasus!',
    },
    imageUrl: '/images/interior.jpg',
  },
  {
    id: 'gb-3',
    author: 'Geraint & Sioned Evans',
    location: 'Aberystwyth',
    stayDate: 'October 2026',
    rating: 5,
    comment: {
      en: 'The perfect romantic getaway. The bed was exceptionally comfortable, the kitchen well-appointed, and gazing at the dark starlit skies was unforgettable.',
      cy: 'Y dihangfa ramantus berffaith. Roedd y gwely yn hynod gyfforddus, y gegin wedi\'i threfnu\'n wych, a gwylio\'r awyr serog yn fythgofiadwy.',
    },
    imageUrl: '/images/bedroom.jpg',
  },
];

// In-memory inquiry store for local simulation
let mockInquiriesStore: BookingInquiry[] = [];

/**
 * Headless CMS Client Bridge
 * Handles fetching CMS content & executing Mutation API calls.
 */
export const cmsClient = {
  async getPricingConfig(propertyId: 'plas-hafod' | 'bryn-bugeiliaid-bach' = 'plas-hafod'): Promise<PricingConfig> {
    if (propertyId === 'bryn-bugeiliaid-bach') {
      return bbbPricingConfig;
    }
    return defaultPricingConfig;
  },

  async getBlockedDates(propertyId: 'plas-hafod' | 'bryn-bugeiliaid-bach' = 'plas-hafod'): Promise<BlockedDateRange[]> {
    if (propertyId === 'bryn-bugeiliaid-bach') {
      return bbbBlockedDates;
    }
    return defaultBlockedDates;
  },

  async getGuestbookEntries(): Promise<GuestbookEntry[]> {
    return defaultGuestbook;
  },

  /**
   * Action 1 from Project Spec:
   * Uses CMS Mutation API to create a new "Booking Inquiry" document.
   */
  async createBookingInquiry(inquiry: Omit<BookingInquiry, 'id' | 'createdAt' | 'status'>): Promise<BookingInquiry> {
    const newRecord: BookingInquiry = {
      ...inquiry,
      id: `inquiry-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    if (process.env.SANITY_PROJECT_ID && process.env.SANITY_API_WRITE_TOKEN) {
      // Direct Sanity Mutation API call:
      const sanityUrl = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${process.env.SANITY_DATASET || 'production'}`;
      try {
        await fetch(sanityUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.SANITY_API_WRITE_TOKEN}`,
          },
          body: JSON.stringify({
            mutations: [
              {
                create: {
                  _type: 'bookingInquiry',
                  ...newRecord,
                },
              },
            ],
          }),
        });
      } catch (err) {
        console.error('Failed to submit Sanity mutation:', err);
      }
    }

    mockInquiriesStore.unshift(newRecord);
    return newRecord;
  },

  async getBookingInquiries(): Promise<BookingInquiry[]> {
    return mockInquiriesStore;
  },
};
