import { PricingConfig, BlockedDateRange, BookingInquiry, GuestbookEntry } from './types';

// Default / fallback pricing rules as specified for Plas Hafod
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

// Default blocked dates for testing & calendar display
export const defaultBlockedDates: BlockedDateRange[] = [
  {
    id: 'block-1',
    startDate: '2026-10-22',
    endDate: '2026-10-26',
    reason: 'booked',
    notes: 'Guest Booking #PH-1092',
  },
  {
    id: 'block-2',
    startDate: '2026-11-05',
    endDate: '2026-11-09',
    reason: 'booked',
    notes: 'Guest Booking #PH-1099',
  },
  {
    id: 'block-3',
    startDate: '2026-11-20',
    endDate: '2026-11-22',
    reason: 'maintenance',
    notes: 'Chimney Sweep & Deep Clean',
  },
  {
    id: 'block-4',
    startDate: '2026-12-24',
    endDate: '2026-12-29',
    reason: 'booked',
    notes: 'Christmas Holiday Stay',
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
  async getPricingConfig(): Promise<PricingConfig> {
    // If Sanity or external CMS is configured via env vars, fetch via CMS API here
    if (process.env.SANITY_PROJECT_ID) {
      // In production with Sanity, run GROQ query: *[_type == "pricingConfig"][0]
    }
    return defaultPricingConfig;
  },

  async getBlockedDates(): Promise<BlockedDateRange[]> {
    if (process.env.SANITY_PROJECT_ID) {
      // In production with Sanity, run GROQ query: *[_type == "blockedDates"]
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
