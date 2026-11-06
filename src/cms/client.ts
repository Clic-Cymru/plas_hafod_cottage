import {
  PricingConfig,
  BlockedDateRange,
  BookingInquiry,
  GuestbookEntry,
  ContactMessage,
  LocalAttraction,
  Accreditation,
  SiteSettings,
  HeroSlide,
  SnowdonPath,
  ReviewItem,
  PolicySection,
  PropertyDetails,
  ReviewSettings,
  PageContent,
} from './types';
import { sanityClient, isSanityLive } from './sanity.client';
import { defaultAttractions } from '@/data/defaultAttractions';
import { defaultAccreditations } from '@/data/defaultAccreditations';


const sharedLiveSeasons = [
  {
    id: 'may-bank-holiday-2027',
    name: 'May Bank Holiday Weekend',
    startDate: '2027-04-30',
    endDate: '2027-05-03',
    nightlyRate: 175,
    minStay: 3,
  },
  {
    id: 'autumn-half-term-welsh-2026',
    name: 'Half Term - October (Welsh Schools)',
    startDate: '2026-10-23',
    endDate: '2026-11-01',
    nightlyRate: 170,
    minStay: 3,
  },
  {
    id: 'autumn-half-term-english-2026',
    name: 'Half Term - October (English Schools)',
    startDate: '2026-10-16',
    endDate: '2026-11-01',
    nightlyRate: 170,
    minStay: 3,
  },
  {
    id: 'autumn-half-term-2027',
    name: 'Half Term - October 2027',
    startDate: '2027-10-22',
    endDate: '2027-10-31',
    nightlyRate: 170,
    minStay: 3,
  },
  {
    id: 'february-half-term-welsh-2027',
    name: 'Half Term - February (Welsh Schools)',
    startDate: '2027-02-05',
    endDate: '2027-02-21',
    nightlyRate: 170,
    minStay: 3,
  },
  {
    id: 'february-half-term-english-2027',
    name: 'Half Term - February (English Schools)',
    startDate: '2027-02-12',
    endDate: '2027-02-28',
    nightlyRate: 170,
    minStay: 3,
  },
  {
    id: 'whitsun-half-term-2027',
    name: 'Half Term - May (English & Welsh)',
    startDate: '2027-05-21',
    endDate: '2027-06-06',
    nightlyRate: 190,
    minStay: 3,
  },
  {
    id: 'christmas-new-year-2026',
    name: 'Christmas and New Year',
    startDate: '2026-12-20',
    endDate: '2027-01-05',
    nightlyRate: 250,
    minStay: 3,
  },
  {
    id: 'christmas-new-year-2027',
    name: 'Christmas and New Year 2027/28',
    startDate: '2027-12-20',
    endDate: '2028-01-05',
    nightlyRate: 250,
    minStay: 3,
  },
  {
    id: 'easter-half-term-2027',
    name: 'Half Term - Easter',
    startDate: '2027-03-19',
    endDate: '2027-04-11',
    nightlyRate: 190,
    minStay: 3,
  },
  {
    id: 'winter-2026',
    name: 'Standard - Oct/Nov/Dec 2026',
    startDate: '2026-10-01',
    endDate: '2026-12-19',
    nightlyRate: 140,
    weekendRate: 150,
    minStay: 2,
  },
  {
    id: 'winter-2027',
    name: 'Standard - Jan/Feb/March 2027',
    startDate: '2027-01-06',
    endDate: '2027-03-31',
    nightlyRate: 150,
    weekendRate: 165,
    minStay: 2,
  },
  {
    id: 'spring-2027',
    name: 'Standard - April/May/June 2027',
    startDate: '2027-04-01',
    endDate: '2027-06-30',
    nightlyRate: 160,
    weekendRate: 175,
    minStay: 2,
  },
  {
    id: 'summer-peak-2026',
    name: 'Standard - July/Aug/Sept 2026',
    startDate: '2026-07-01',
    endDate: '2026-09-30',
    nightlyRate: 190,
    weekendRate: 200,
    minStay: 3,
  },
  {
    id: 'summer-peak-2027',
    name: 'Standard - July/Aug/Sept 2027',
    startDate: '2027-07-01',
    endDate: '2027-09-30',
    nightlyRate: 190,
    weekendRate: 200,
    minStay: 3,
  },
  {
    id: 'autumn-winter-2027',
    name: 'Standard - Oct/Nov/Dec 2027',
    startDate: '2027-10-01',
    endDate: '2027-12-19',
    nightlyRate: 140,
    weekendRate: 150,
    minStay: 2,
  },
];

// Pricing rules for Plas Hafod Cottage
export const defaultPricingConfig: PricingConfig = {
  baseRate: 150,
  weekendBaseRate: 165,
  minStayDefault: 3,
  depositType: 'fixed',
  fixedDepositAmount: 200,
  depositPercentage: 25,
  cleaningFee: 0,
  petFee: 40, // 1 dog = £40
  petFee2Dogs: 55, // 2 dogs = £55
  seasons: sharedLiveSeasons.map((s) => ({ ...s, minStay: Math.max(3, s.minStay) })),
  discounts: [],
};

// Pricing rules for Bryn Bugeiliaid Bach (Annexe)
export const bbbPricingConfig: PricingConfig = {
  baseRate: 150,
  weekendBaseRate: 165,
  minStayDefault: 2,
  depositType: 'fixed',
  fixedDepositAmount: 200,
  depositPercentage: 25,
  cleaningFee: 0,
  petFee: 0, // no pets allowed at annexe
  petFee2Dogs: 0,
  seasons: sharedLiveSeasons,
  discounts: [],
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

// In-memory inquiry store for local simulation
let mockInquiriesStore: BookingInquiry[] = [];
let mockContactStore: ContactMessage[] = [];


/**
 * Headless CMS Client Bridge
 * Handles fetching CMS content & executing Mutation API calls.
 */
export const BADGE_CY_MAP: Record<string, string> = {
  'Official 5-Star': '5 Seren Swyddogol',
  '2026 Winner': 'Enillydd 2026',
  '2025 Winner': 'Enillydd 2025',
  'Gold Copa Award': 'Gwobr Copa Aur',
  'Copa Gold Award': 'Gwobr Copa Aur',
  '2026 Accredited': 'Achrededig 2026',
  '2026 Finalist': 'Cystadleuydd 2026',
  'Top-Rated Host': 'Lletywr Gradd Uchaf',
  'Official Grading': 'Graddio Swyddogol',
  'Consecutive Excellence': 'Rhagoriaeth Barhaus',
  'Silver Award': 'Gwobr Arian',
  'Certified Welcome': 'Croeso Ardystiedig',
};

export const cmsClient = {
  async getPricingConfig(propertyId: 'plas-hafod' | 'bryn-bugeiliaid-bach' = 'plas-hafod'): Promise<PricingConfig> {
    if (isSanityLive && sanityClient) {
      try {
        // Fetch pricing document (prefer published over draft to ensure consistency)
        const query = `*[_type == "pricingConfig" && propertyId == $propertyId && !(_id in path("drafts.**"))][0] || *[_type == "pricingConfig" && propertyId == $propertyId][0] {
          ...,
          "resolvedRates": seasonalRates[] {
            ...,
            "seasonDoc": season->
          }
        }`;
        const data = await sanityClient.fetch(query, { propertyId });
        if (data && typeof data.baseRate === 'number') {
          const defaultMinStay =
            typeof data.minStayDefault === 'number' && data.minStayDefault >= 1
              ? data.minStayDefault
              : propertyId === 'bryn-bugeiliaid-bach'
              ? 2
              : 3;

          let seasons = data.seasons || [];
          if (Array.isArray(data.resolvedRates) && data.resolvedRates.length > 0) {
            seasons = data.resolvedRates
              .filter((r: any) => r?.seasonDoc?.startDate && r?.seasonDoc?.endDate)
              .map((r: any) => ({
                name: r.seasonDoc.name || r.notes || 'Seasonal Rate',
                startDate: r.seasonDoc.startDate,
                endDate: r.seasonDoc.endDate,
                nightlyRate: r.nightlyRate,
                weekendRate: typeof r.weekendRate === 'number' ? r.weekendRate : undefined,
                minStay: Math.max(
                  defaultMinStay,
                  r.minStay ?? r.seasonDoc.minStayDefault ?? defaultMinStay
                ),
              }));
          }

          let discounts = data.discounts || [];
          try {
            const offers = await sanityClient.fetch(
              `*[_type == "specialOffer" && active == true && (propertyId == $propertyId || propertyId == "both") && !(_id in path("drafts.**"))] | order(minNights asc)`,
              { propertyId }
            );
            if (Array.isArray(offers) && offers.length > 0) {
              discounts = offers.map((o: any) => ({
                name: o.title,
                code: o.code,
                minNights: o.minNights ?? 7,
                validFrom: o.validFrom,
                validTo: o.validTo,
                discountType: o.discountType ?? 'percentage',
                value: o.value,
              }));
            }
          } catch (_) {}

          const defaultPetFee1 = propertyId === 'bryn-bugeiliaid-bach' ? 0 : 40;
          const defaultPetFee2 = propertyId === 'bryn-bugeiliaid-bach' ? 0 : 55;
          const petFee1 = typeof data.petFee === 'number' ? data.petFee : defaultPetFee1;
          const petFee2 =
            typeof data.petFee2Dogs === 'number'
              ? data.petFee2Dogs
              : (petFee1 > 0 ? (data.petFee === 40 ? 55 : petFee1 * 2) : defaultPetFee2);

          // Sort seasons so narrower periods (e.g. school half terms) take priority over broad seasonal blocks
          seasons.sort((a: any, b: any) => {
            const durA = Math.abs(new Date(a.endDate).getTime() - new Date(a.startDate).getTime());
            const durB = Math.abs(new Date(b.endDate).getTime() - new Date(b.startDate).getTime());
            return durA - durB;
          });

          return {
            baseRate: data.baseRate,
            weekendBaseRate: typeof data.weekendBaseRate === 'number' ? data.weekendBaseRate : undefined,
            minStayDefault: defaultMinStay,
            depositType: data.depositType ?? 'fixed',
            fixedDepositAmount: data.fixedDepositAmount ?? 200,
            depositPercentage: data.depositPercentage ?? 25,
            cleaningFee: data.cleaningFee ?? 0,
            petFee: petFee1,
            petFee2Dogs: petFee2,
            seasons,
            discounts,
          };
        }
      } catch (err) {
        console.warn('Failed to fetch pricing from Sanity, using fallback:', err);
      }
    }
    return propertyId === 'bryn-bugeiliaid-bach' ? bbbPricingConfig : defaultPricingConfig;
  },

  async getBlockedDates(propertyId: 'plas-hafod' | 'bryn-bugeiliaid-bach' = 'plas-hafod'): Promise<BlockedDateRange[]> {
    if (isSanityLive && sanityClient) {
      try {
        const query = `{
          "manual": *[_type == "blockedDates" && (propertyId == $propertyId || propertyId == "both") && defined(startDate) && defined(endDate)],
          "confirmed": *[_type == "bookingInquiry" && (propertyId == $propertyId || (!defined(propertyId) && $propertyId == "plas-hafod")) && status in ["confirmed", "deposit_paid", "paid", "deposit_requested", "completed"] && defined(checkIn) && defined(checkOut)]
        }`;
        const data = await sanityClient.fetch(query, { propertyId });

        const manualRanges: BlockedDateRange[] = Array.isArray(data?.manual)
          ? data.manual.map((item: any) => ({
              id: item._id,
              startDate: item.startDate,
              endDate: item.endDate,
              reason: item.reason || 'booked',
              notes: item.notes || item.title || 'Blocked',
            }))
          : [];

        const confirmedRanges: BlockedDateRange[] = Array.isArray(data?.confirmed)
          ? data.confirmed.map((item: any) => ({
              id: item._id,
              startDate: item.checkIn,
              endDate: item.checkOut,
              reason: 'booked' as const,
              notes: `Confirmed: ${item.guestName || 'Guest'}`,
            }))
          : [];

        const combined = [...manualRanges, ...confirmedRanges];
        if (combined.length > 0) {
          return combined;
        }
      } catch (err) {
        console.warn('Failed to fetch blocked dates from Sanity, using fallback:', err);
      }
    }
    return propertyId === 'bryn-bugeiliaid-bach' ? bbbBlockedDates : defaultBlockedDates;
  },

  async getGuestbookEntries(
    property: 'both' | 'plas-hafod' | 'bryn-bugeiliaid-bach' = 'both',
    isCymraeg: boolean = false
  ): Promise<GuestbookEntry[]> {
    if (isSanityLive && sanityClient) {
      try {
        const query = `*[_type == "guestbookEntry" && ($property == "both" || !defined(property) || property == $property)] | order(order asc, _createdAt asc) {
          "id": _id,
          property,
          author,
          location,
          stayDate,
          rating,
          reviewTextEn,
          reviewTextCy,
          "imageUrl": photo.asset->url,
          isFeatured,
          order
        }`;
        const data = await sanityClient.fetch(query, { property });
        if (Array.isArray(data) && data.length > 0) {
          return data.map((entry: any, idx: number) => {
            const en = entry.reviewTextEn || '';
            const cy = entry.reviewTextCy || en;
            const prop = entry.property || 'plas-hafod';
            const fallbackImg =
              prop === 'bryn-bugeiliaid-bach'
                ? `/images/wp/guestbook/bbb-guestbook-${String((idx % 15) + 1).padStart(2, '0')}.jpg`
                : `/images/wp/guestbook/ph-guestbook-${String((idx % 21) + 1).padStart(2, '0')}.jpg`;
            return {
              id: entry.id || `guestbook-${idx + 1}`,
              property: prop,
              author: entry.author || `Guestbook Note ${idx + 1}`,
              location: entry.location,
              stayDate: entry.stayDate || 'Guestbook Excerpt',
              rating: entry.rating || 5,
              comment: { en, cy },
              reviewTextEn: isCymraeg ? cy : en,
              reviewTextCy: cy,
              imageUrl: entry.imageUrl || fallbackImg,
              order: entry.order ?? idx + 1,
              isFeatured: entry.isFeatured,
            };
          });
        }
      } catch (err) {
        console.warn('Failed to fetch guestbook from Sanity, using fallback:', err);
      }
    }
    const filtered = defaultGuestbookEntries.filter(
      (e) => property === 'both' || !e.property || e.property === property
    );
    return filtered.map((e) => ({
      ...e,
      comment: typeof e.comment === 'object' ? e.comment : { en: e.reviewTextEn || '', cy: e.reviewTextCy || e.reviewTextEn || '' },
    }));
  },

  /**
   * Action 1 from Project Spec:
   * Uses CMS Mutation API to create a new "Booking Inquiry" document.
   */
  async createBookingInquiry(inquiry: Omit<BookingInquiry, 'id' | 'createdAt' | 'status'>): Promise<BookingInquiry> {
    const calculatedTotal = inquiry.calculatedTotal ?? inquiry.totalPrice;
    const nightlyBreakdown = Array.isArray(inquiry.nightlyBreakdown)
      ? inquiry.nightlyBreakdown.map((item: any, idx: number) => ({
          _key: item._key || `night-${(item.date || '').replace(/[^a-zA-Z0-9]/g, '') || idx}-${idx}`,
          _type: 'nightRate',
          date: item.date,
          rate: item.rate,
          seasonName: item.seasonName || '',
        }))
      : [];

    const prefix = inquiry.propertyId === 'bryn-bugeiliaid-bach' ? 'BBB' : 'PH';
    const nameParts = (inquiry.guestName || 'GUEST').trim().split(/\s+/);
    const lastName = nameParts[nameParts.length - 1].replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 8);
    const dateStr = (inquiry.checkIn || '').replace(/[^0-9]/g, '').slice(2, 6);
    const paymentReference = inquiry.paymentReference || `${prefix}-${dateStr || '26'}-${lastName || 'GUEST'}`;
    const now = new Date().toISOString();

    const newRecord: BookingInquiry = {
      ...inquiry,
      nightlyBreakdown,
      calculatedTotal,
      totalPrice: inquiry.totalPrice ?? calculatedTotal,
      id: `inquiry-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      status: 'deposit_requested',
      paymentReference,
      depositSentAt: now,
      depositEmailStatus: 'sent',
      createdAt: now,
    };

    const token = process.env.SANITY_API_WRITE_TOKEN;
    const projId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production';

    if (projId && projId !== 'demo-project' && token) {
      const sanityUrl = `https://${projId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`;
      try {
        const res = await fetch(sanityUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
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
        if (!res.ok) {
          const errBody = await res.text();
          console.error(`Sanity mutation HTTP ${res.status}:`, errBody);
        }
      } catch (err) {
        console.error('Failed to submit Sanity mutation:', err);
      }
    }

    mockInquiriesStore.unshift(newRecord);
    return newRecord;
  },

  async getBookingInquiries(): Promise<BookingInquiry[]> {
    if (isSanityLive && sanityClient) {
      try {
        const query = `*[_type == "bookingInquiry"] | order(createdAt desc)`;
        const data = await sanityClient.fetch(query);
        if (Array.isArray(data)) {
          return data;
        }
      } catch (err) {
        console.warn('Failed to fetch inquiries from Sanity, using fallback:', err);
      }
    }
    return mockInquiriesStore;
  },

  async createContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): Promise<ContactMessage> {
    const newRecord: ContactMessage = {
      ...message,
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      status: 'unread',
      createdAt: new Date().toISOString(),
    };

    const token = process.env.SANITY_API_WRITE_TOKEN;
    const projId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production';

    if (projId && projId !== 'demo-project' && token) {
      const sanityUrl = `https://${projId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`;
      try {
        await fetch(sanityUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            mutations: [
              {
                create: {
                  _type: 'contactMessage',
                  ...newRecord,
                },
              },
            ],
          }),
        });
      } catch (err) {
        console.error('Failed to submit contact message to Sanity:', err);
      }
    }

    mockContactStore.unshift(newRecord);
    return newRecord;
  },

  async getContactMessages(): Promise<ContactMessage[]> {
    if (isSanityLive && sanityClient) {
      try {
        const query = `*[_type == "contactMessage"] | order(createdAt desc)`;
        const data = await sanityClient.fetch(query);
        if (Array.isArray(data)) {
          return data;
        }
      } catch (err) {
        console.warn('Failed to fetch contact messages from Sanity, using fallback:', err);
      }
    }
    return mockContactStore;
  },

  async getLocalAttractions(isCymraeg: boolean = false): Promise<LocalAttraction[]> {
    if (isSanityLive && sanityClient) {
      try {
        const query = `*[_type == "localAttraction"] | order(order asc, _createdAt asc) {
          "id": _id,
          "title": select($isCymraeg => coalesce(titleCy, title), title),
          "category": select($isCymraeg => coalesce(categoryCy, category), category),
          "description": select($isCymraeg => coalesce(descriptionCy, description), description),
          "imageUrl": coalesce(image.asset->url, customImageUrl, ""),
          url,
          distance,
          order,
          featured
        }`;
        const data = await sanityClient.fetch(query, { isCymraeg });
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn('Failed to fetch local attractions from Sanity, using fallback:', err);
      }
    }

    if (isCymraeg) {
      return defaultAttractions.map((item) => ({
        ...item,
        title: item.titleCy || item.title,
        category: item.categoryCy || item.category,
        description: item.descriptionCy || item.description,
      }));
    }

    return defaultAttractions;
  },

  async getAccreditations(
    property: 'plas-hafod' | 'bryn-bugeiliaid-bach' | 'both' = 'plas-hafod',
    isCymraeg: boolean = false
  ): Promise<Accreditation[]> {
    if (isSanityLive && sanityClient) {
      try {
        const query = `*[_type == "accreditation" && (!defined(featured) || featured == true) && (
          !defined(property) || property == "both" || property == $property
        )] | order(order asc, _createdAt asc) {
          "id": _id,
          "title": select($isCymraeg => coalesce(titleCy, title), title),
          "source": source,
          "badge": select($isCymraeg => coalesce(badgeCy, badge), badge),
          "badgeCy": badgeCy,
          "badgeColor": badgeColor,
          "score": select($isCymraeg => coalesce(scoreCy, score), score),
          "description": select($isCymraeg => coalesce(descriptionCy, description), description),
          "imageUrl": coalesce(image.asset->url, customImageUrl, ""),
          property,
          year,
          order,
          featured
        }`;
        const data = await sanityClient.fetch(query, { property, isCymraeg });
        if (Array.isArray(data) && data.length > 0) {
          if (isCymraeg) {
            return data.map((item) => ({
              ...item,
              badge: item.badgeCy || BADGE_CY_MAP[item.badge] || item.badge,
            }));
          }
          return data;
        }
      } catch (err) {
        console.warn('Failed to fetch accreditations from Sanity, using fallback:', err);
      }
    }

    const filtered = defaultAccreditations.filter((item) => {
      if (item.featured === false) return false;
      if (property === 'both') return true;
      return item.property === 'both' || item.property === property;
    });

    if (isCymraeg) {
      return filtered.map((item) => ({
        ...item,
        title: item.titleCy || item.title,
        badge: item.badgeCy || BADGE_CY_MAP[item.badge] || item.badge,
        score: item.scoreCy || item.score,
        description: item.descriptionCy || item.description,
      }));
    }

    return filtered;
  },

  async getSiteSettings(isCymraeg: boolean = false): Promise<SiteSettings> {
    if (isSanityLive && sanityClient) {
      try {
        const query = `{
          "site": *[_type == "siteSettings"][0],
          "reviews": *[_type == "reviewSettings"][0]
        }`;
        const data = await sanityClient.fetch(query);
        const site = data?.site;
        const rev = data?.reviews;

        if (site && site.siteTitle) {
          return {
            siteTitle: site.siteTitle,
            hostNames: site.hostNames || defaultSiteSettings.hostNames,
            email: site.email || defaultSiteSettings.email,
            phone: site.phone || defaultSiteSettings.phone,
            whatsapp: site.whatsapp || defaultSiteSettings.whatsapp,
            address: isCymraeg && site.addressCy ? site.addressCy : (site.address || defaultSiteSettings.address),
            addressCy: site.addressCy,
            checkInTime: site.checkInTime || defaultSiteSettings.checkInTime,
            checkOutTime: site.checkOutTime || defaultSiteSettings.checkOutTime,
            bannerAnnouncementEn: site.bannerAnnouncementEn || defaultSiteSettings.bannerAnnouncementEn,
            bannerAnnouncementCy: site.bannerAnnouncementCy || defaultSiteSettings.bannerAnnouncementCy,
            bannerEnabled: site.bannerEnabled !== undefined ? site.bannerEnabled : defaultSiteSettings.bannerEnabled,
            facebookUrl: site.facebookUrl || defaultSiteSettings.facebookUrl,
            instagramUrl: site.instagramUrl || defaultSiteSettings.instagramUrl,
            trustindexEnabled:
              rev?.trustindexEnabled !== undefined
                ? rev.trustindexEnabled
                : site.trustindexEnabled !== undefined
                ? site.trustindexEnabled
                : defaultSiteSettings.trustindexEnabled,
            trustindexScriptUrl:
              rev?.trustindexScriptUrl || site.trustindexScriptUrl || defaultSiteSettings.trustindexScriptUrl,
            trustindexEmbedCode:
              rev?.trustindexEmbedCode || site.trustindexEmbedCode || defaultSiteSettings.trustindexEmbedCode,
            bannerLink: site.bannerLink || defaultSiteSettings.bannerLink,
            offerDisplayMode: site.offerDisplayMode || (site.bannerEnabled !== false ? 'banner' : 'none'),
            offerPopupEnabled:
              site.offerPopupEnabled !== undefined ? site.offerPopupEnabled : defaultSiteSettings.offerPopupEnabled,
            offerPosition: site.offerPosition || defaultSiteSettings.offerPosition,
            offerBadgeEn: site.offerBadgeEn || defaultSiteSettings.offerBadgeEn,
            offerBadgeCy: site.offerBadgeCy || defaultSiteSettings.offerBadgeCy,
            offerTitleEn: site.offerTitleEn || defaultSiteSettings.offerTitleEn,
            offerTitleCy: site.offerTitleCy || defaultSiteSettings.offerTitleCy,
            offerDescriptionEn: site.offerDescriptionEn || defaultSiteSettings.offerDescriptionEn,
            offerDescriptionCy: site.offerDescriptionCy || defaultSiteSettings.offerDescriptionCy,
            offerButtonTextEn: site.offerButtonTextEn || defaultSiteSettings.offerButtonTextEn,
            offerButtonTextCy: site.offerButtonTextCy || defaultSiteSettings.offerButtonTextCy,
            offerButtonLink: site.offerButtonLink || defaultSiteSettings.offerButtonLink,
            bankAccountName: site.bankAccountName || defaultSiteSettings.bankAccountName,
            bankName: site.bankName || defaultSiteSettings.bankName,
            bankSortCode: site.bankSortCode || defaultSiteSettings.bankSortCode,
            bankAccountNumber: site.bankAccountNumber || defaultSiteSettings.bankAccountNumber,
            bankIban: site.bankIban || defaultSiteSettings.bankIban,
            bankBic: site.bankBic || defaultSiteSettings.bankBic,
            depositHoldHours: site.depositHoldHours ?? defaultSiteSettings.depositHoldHours,
            depositInstructions: site.depositInstructions || defaultSiteSettings.depositInstructions,
            depositInstructionsCy: site.depositInstructionsCy || defaultSiteSettings.depositInstructionsCy,
            depositType: site.depositType || defaultSiteSettings.depositType,
            fixedDepositAmount: site.fixedDepositAmount ?? defaultSiteSettings.fixedDepositAmount,
            depositPercentage: site.depositPercentage ?? defaultSiteSettings.depositPercentage,
            emergencyHostPhone: site.emergencyHostPhone || defaultSiteSettings.emergencyHostPhone,
            notificationRecipients: site.notificationRecipients || defaultSiteSettings.notificationRecipients,
            guestBookingEmailWelcomeEn: site.guestBookingEmailWelcomeEn || defaultSiteSettings.guestBookingEmailWelcomeEn,
            guestBookingEmailWelcomeCy: site.guestBookingEmailWelcomeCy || defaultSiteSettings.guestBookingEmailWelcomeCy,
            guestBookingEmailNextStepsEn: site.guestBookingEmailNextStepsEn || defaultSiteSettings.guestBookingEmailNextStepsEn,
            guestBookingEmailNextStepsCy: site.guestBookingEmailNextStepsCy || defaultSiteSettings.guestBookingEmailNextStepsCy,
            guestContactEmailReplyEn: site.guestContactEmailReplyEn || defaultSiteSettings.guestContactEmailReplyEn,
            guestContactEmailReplyCy: site.guestContactEmailReplyCy || defaultSiteSettings.guestContactEmailReplyCy,
            checkInDaysBeforeArrival: site.checkInDaysBeforeArrival ?? defaultSiteSettings.checkInDaysBeforeArrival,
            balanceReminderDaysBeforeArrival: site.balanceReminderDaysBeforeArrival ?? defaultSiteSettings.balanceReminderDaysBeforeArrival,
            plasHafodKeySafe: site.plasHafodKeySafe || defaultSiteSettings.plasHafodKeySafe,
            bbbKeySafe: site.bbbKeySafe || defaultSiteSettings.bbbKeySafe,
            checkInDirectionsEn: site.checkInDirectionsEn || defaultSiteSettings.checkInDirectionsEn,
            checkInDirectionsCy: site.checkInDirectionsCy || defaultSiteSettings.checkInDirectionsCy,
            wasteBinInstructionsEn: site.wasteBinInstructionsEn || defaultSiteSettings.wasteBinInstructionsEn,
            wasteBinInstructionsCy: site.wasteBinInstructionsCy || defaultSiteSettings.wasteBinInstructionsCy,
          };
        }
      } catch (err) {
        console.warn('Failed to fetch siteSettings from Sanity, using fallback:', err);
      }
    }
    return isCymraeg
      ? {
          ...defaultSiteSettings,
          address: defaultSiteSettings.addressCy || defaultSiteSettings.address,
        }
      : defaultSiteSettings;
  },

  async getReviewSettings(isCymraeg: boolean = false): Promise<ReviewSettings> {
    if (isSanityLive && sanityClient) {
      try {
        const query = `{
          "reviews": *[_type == "reviewSettings"][0],
          "site": *[_type == "siteSettings"][0]
        }`;
        const data = await sanityClient.fetch(query);
        const r = data?.reviews;
        const s = data?.site;
        if (r || s) {
          return {
            trustindexEnabled:
              r?.trustindexEnabled !== undefined
                ? r.trustindexEnabled
                : s?.trustindexEnabled !== undefined
                ? s.trustindexEnabled
                : defaultReviewSettings.trustindexEnabled,
            trustindexScriptUrl:
              r?.trustindexScriptUrl || s?.trustindexScriptUrl || defaultReviewSettings.trustindexScriptUrl,
            trustindexEmbedCode:
              r?.trustindexEmbedCode || s?.trustindexEmbedCode || defaultReviewSettings.trustindexEmbedCode,
            reviewHeading: isCymraeg
              ? r?.reviewHeadingCy || defaultReviewSettings.reviewHeading
              : r?.reviewHeadingEn || defaultReviewSettings.reviewHeading,
            guestbookHeading: isCymraeg
              ? r?.guestbookHeadingCy || defaultReviewSettings.guestbookHeading
              : r?.guestbookHeadingEn || defaultReviewSettings.guestbookHeading,
            guestbookDescription: isCymraeg
              ? r?.guestbookDescriptionCy || defaultReviewSettings.guestbookDescription
              : r?.guestbookDescriptionEn || defaultReviewSettings.guestbookDescription,
            showPlatformReviews: r?.showPlatformReviews ?? defaultReviewSettings.showPlatformReviews ?? true,
            showGuestbookArchive: r?.showGuestbookArchive ?? defaultReviewSettings.showGuestbookArchive ?? true,
          };
        }
      } catch (err) {
        console.warn('Failed to fetch reviewSettings from Sanity, using fallback:', err);
      }
    }
    return isCymraeg
      ? {
          ...defaultReviewSettings,
          reviewHeading: 'GWELWCH BETH MAE EIN CWSMERIAID YN EI FEDDWL',
          guestbookHeading: 'GEIRIAU GAN EIN HYMWELWYR',
          guestbookDescription:
            'Toriadau a gymerwyd yn uniongyrchol o’r llyfr gwesteion llawysgrif sydd yn lolfa Plas Hafod.',
        }
      : defaultReviewSettings;
  },

  async getHeroSlides(isCymraeg: boolean = false): Promise<HeroSlide[]> {
    if (isSanityLive && sanityClient) {
      try {
        const query = `*[_type == "heroSlide" && (!defined(active) || active == true)] | order(order asc, _createdAt asc) {
          "id": _id,
          title,
          "imageUrl": coalesce(image.asset->url, customImageUrl, ""),
          altEn,
          altCy,
          order,
          active
        }`;
        const data = await sanityClient.fetch(query);
        if (Array.isArray(data) && data.length > 0) {
          return data.map((slide: any) => ({
            id: slide.id,
            title: slide.title,
            imageUrl: slide.imageUrl || '/images/wp/hero-slide-1.jpg',
            altEn: isCymraeg ? (slide.altCy || slide.altEn) : slide.altEn,
            altCy: slide.altCy,
            order: slide.order,
            active: slide.active,
          }));
        }
      } catch (err) {
        console.warn('Failed to fetch hero slides from Sanity, using fallback:', err);
      }
    }
    return defaultHeroSlides.map((slide) => ({
      ...slide,
      altEn: isCymraeg ? (slide.altCy || slide.altEn) : slide.altEn,
    }));
  },

  async getSnowdonPaths(isCymraeg: boolean = false): Promise<SnowdonPath[]> {
    if (isSanityLive && sanityClient) {
      try {
        const query = `*[_type == "snowdonPath"] | order(order asc, _createdAt asc) {
          "id": _id,
          "name": select($isCymraeg => coalesce(nameCy, name), name),
          "nameCy": nameCy,
          distance,
          "start": select($isCymraeg => coalesce(startCy, start), start),
          "startCy": startCy,
          difficulty,
          "description": select($isCymraeg => coalesce(descriptionCy, description), description),
          "descriptionCy": descriptionCy,
          order
        }`;
        const data = await sanityClient.fetch(query, { isCymraeg });
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn('Failed to fetch snowdon paths from Sanity, using fallback:', err);
      }
    }
    if (isCymraeg) {
      return defaultSnowdonPaths.map((p) => ({
        ...p,
        name: p.nameCy || p.name,
        start: p.startCy || p.start,
        description: p.descriptionCy || p.description,
      }));
    }
    return defaultSnowdonPaths;
  },

  async getReviews(
    property: 'both' | 'plas-hafod' | 'bryn-bugeiliaid-bach' = 'both',
    isCymraeg: boolean = false
  ): Promise<ReviewItem[]> {
    if (isSanityLive && sanityClient) {
      try {
        const query = `*[_type == "review" && (!defined(property) || property == "both" || property == $property)] | order(order asc, _createdAt desc) {
          "id": _id,
          author,
          source,
          property,
          stars,
          stayDate,
          "textEn": select($isCymraeg => coalesce(textCy, textEn), textEn),
          "textCy": textCy,
          "guestPhotoUrl": guestPhoto.asset->url,
          featured,
          order
        }`;
        const data = await sanityClient.fetch(query, { property, isCymraeg });
        if (Array.isArray(data) && data.length > 0) {
          return data.map((item) => ({
            ...item,
            logoUrl:
              item.source === 'Airbnb'
                ? '/images/wp/logo-airbnb.png'
                : item.source === 'Vrbo'
                ? '/images/wp/logo-vrbo.png'
                : item.source === 'TripAdvisor'
                ? '/images/wp/logo-tripadvisor.png'
                : item.source === 'Booking.com'
                ? '/images/wp/logo-booking.svg'
                : item.source === 'Google' || item.source === 'Google Reviews'
                ? '/images/wp/logo-google.svg'
                : undefined,
          }));
        }
      } catch (err) {
        console.warn('Failed to fetch reviews from Sanity, using fallback:', err);
      }
    }
    if (isCymraeg) {
      return defaultReviews.map((r) => ({
        ...r,
        textEn: r.textCy || r.textEn,
      }));
    }
    return defaultReviews;
  },

  async getPolicySections(isCymraeg: boolean = false): Promise<PolicySection[]> {
    if (isSanityLive && sanityClient) {
      try {
        const query = `*[_type == "policySection"] | order(order asc, _createdAt asc) {
          "id": _id,
          "title": select($isCymraeg => coalesce(titleCy, title), title),
          "titleCy": titleCy,
          icon,
          "leadParagraphEn": select($isCymraeg => coalesce(leadParagraphCy, leadParagraphEn), leadParagraphEn),
          "leadParagraphCy": leadParagraphCy,
          "bulletsEn": select($isCymraeg => coalesce(bulletsCy, bulletsEn), bulletsEn),
          "bulletsCy": bulletsCy,
          order
        }`;
        const data = await sanityClient.fetch(query, { isCymraeg });
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn('Failed to fetch policy sections from Sanity, using fallback:', err);
      }
    }
    if (isCymraeg) {
      return defaultPolicySections.map((s) => ({
        ...s,
        title: s.titleCy || s.title,
        leadParagraphEn: s.leadParagraphCy || s.leadParagraphEn,
        bulletsEn: (s.bulletsCy && s.bulletsCy.length > 0) ? s.bulletsCy : s.bulletsEn,
      }));
    }
    return defaultPolicySections;
  },

  async getGalleryImages(
    propertyId: 'plas-hafod' | 'bryn-bugeiliaid-bach' = 'plas-hafod'
  ): Promise<{ id: number; src: string; alt: string }[] | null> {
    if (isSanityLive && sanityClient) {
      try {
        const slug = propertyId === 'bryn-bugeiliaid-bach' ? 'bryn-bugeiliaid-bach' : 'home';
        const query = `{
          "pageGallery": *[_type == "pageContent" && slug == $slug][0].galleryImages[]{
            "url": asset->url,
            caption
          },
          "propGallery": *[_type == "propertyDetails" && propertyId == $propertyId][0].galleryImages[]{
            "url": asset->url,
            caption
          }
        }`;
        const data = await sanityClient.fetch(query, { slug, propertyId });
        const list =
          Array.isArray(data?.pageGallery) && data.pageGallery.length > 0
            ? data.pageGallery
            : Array.isArray(data?.propGallery) && data.propGallery.length > 0
            ? data.propGallery
            : null;
        if (list) {
          const valid = list.filter((img: any) => Boolean(img?.url));
          if (valid.length > 0) {
            return valid.map((img: any, idx: number) => ({
              id: idx + 1,
              src: img.url,
              alt:
                img.caption ||
                (propertyId === 'bryn-bugeiliaid-bach'
                  ? `Bryn Bugeiliaid Bach Gallery Photo #${idx + 1}`
                  : `Plas Hafod Cottage Gallery Photo #${idx + 1}`),
            }));
          }
        }
      } catch (err) {
        console.warn('Failed to fetch gallery images from Sanity, using fallback:', err);
      }
    }
    return null;
  },

  async getPropertyDetails(
    propertyId: 'plas-hafod' | 'bryn-bugeiliaid-bach' = 'plas-hafod',
    isCymraeg: boolean = false
  ): Promise<PropertyDetails> {
    const fallback = propertyId === 'bryn-bugeiliaid-bach' ? defaultBbbDetails : defaultPlasHafodDetails;
    if (isSanityLive && sanityClient) {
      try {
        const query = `*[_type == "propertyDetails" && propertyId == $propertyId && !(_id in path("drafts.**"))][0] || *[_type == "propertyDetails" && propertyId == $propertyId][0] {
          _id,
          propertyId,
          nameEn,
          nameCy,
          taglineEn,
          taglineCy,
          sleeps,
          bedrooms,
          bathrooms,
          petFriendly,
          shortDescriptionEn,
          shortDescriptionCy,
          fullStoryEn,
          fullStoryCy,
          featuresEn,
          featuresCy,
          "galleryImages": galleryImages[] {
            "url": asset->url,
            caption
          }
        }`;
        const data = await sanityClient.fetch(query, { propertyId });
        if (data && (data.nameEn || data.bedrooms || data.propertyId)) {
          return {
            id: data._id || fallback.id,
            propertyId: data.propertyId || propertyId,
            nameEn: data.nameEn || fallback.nameEn,
            nameCy: data.nameCy || fallback.nameCy,
            taglineEn: data.taglineEn || fallback.taglineEn,
            taglineCy: data.taglineCy || fallback.taglineCy,
            sleeps: typeof data.sleeps === 'number' ? data.sleeps : fallback.sleeps,
            bedrooms: typeof data.bedrooms === 'number' ? data.bedrooms : fallback.bedrooms,
            bathrooms: typeof data.bathrooms === 'number' ? data.bathrooms : fallback.bathrooms,
            petFriendly: typeof data.petFriendly === 'boolean' ? data.petFriendly : fallback.petFriendly,
            shortDescriptionEn: data.shortDescriptionEn || fallback.shortDescriptionEn,
            shortDescriptionCy: data.shortDescriptionCy || fallback.shortDescriptionCy,
            fullStoryEn: data.fullStoryEn || fallback.fullStoryEn,
            fullStoryCy: data.fullStoryCy || fallback.fullStoryCy,
            featuresEn: Array.isArray(data.featuresEn) && data.featuresEn.length > 0 ? data.featuresEn : fallback.featuresEn,
            featuresCy: Array.isArray(data.featuresCy) && data.featuresCy.length > 0 ? data.featuresCy : fallback.featuresCy,
            galleryImages: data.galleryImages || fallback.galleryImages,
          };
        }
      } catch (err) {
        console.warn('Failed to fetch propertyDetails from Sanity, using fallback:', err);
      }
    }
    return fallback;
  },

  async getPageContent(
    slug: string,
    isCymraeg: boolean = false
  ): Promise<PageContent | null> {
    if (isSanityLive && sanityClient) {
      try {
        const query = `*[_type == "pageContent" && slug == $slug && !(_id in path("drafts.**"))][0] || *[_type == "pageContent" && slug == $slug][0] {
          _id,
          slug,
          titleEn,
          titleCy,
          heroHeadingEn,
          heroHeadingCy,
          heroSubheadingEn,
          heroSubheadingCy,
          bodyEn,
          bodyCy,
          seoTitleEn,
          seoTitleCy,
          seoDescriptionEn,
          seoDescriptionCy,
          "galleryImages": galleryImages[] {
            "url": asset->url,
            caption
          }
        }`;
        const data = await sanityClient.fetch(query, { slug });
        if (data && data.slug) {
          return {
            id: data._id,
            slug: data.slug,
            titleEn: data.titleEn || '',
            titleCy: data.titleCy,
            heroHeadingEn: data.heroHeadingEn,
            heroHeadingCy: data.heroHeadingCy,
            heroSubheadingEn: data.heroSubheadingEn,
            heroSubheadingCy: data.heroSubheadingCy,
            bodyEn: data.bodyEn,
            bodyCy: data.bodyCy,
            seoTitleEn: data.seoTitleEn,
            seoTitleCy: data.seoTitleCy,
            seoDescriptionEn: data.seoDescriptionEn,
            seoDescriptionCy: data.seoDescriptionCy,
            galleryImages: data.galleryImages,
          };
        }
      } catch (err) {
        console.warn('Failed to fetch pageContent from Sanity:', err);
      }
    }
    return null;
  },
};

export const defaultPlasHafodDetails: PropertyDetails = {
  id: 'property-plas-hafod',
  propertyId: 'plas-hafod',
  nameEn: 'Plas Hafod Cottage',
  nameCy: 'Bwthyn Plas Hafod',
  taglineEn: '18th-century luxury 5-star mountain retreat with inglenook fire',
  taglineCy: 'Encil mynydd moethus 5-seren o’r 18fed ganrif gyda tân inglenook',
  sleeps: 4,
  bedrooms: 2,
  bathrooms: 2,
  petFriendly: true,
  shortDescriptionEn: 'Traditional stone holiday cottage with panoramic mountain and sea views, nestled in the peaceful hamlet of Nebo on the slopes of the Nantlle Ridge.',
  shortDescriptionCy: 'Bwthyn gwyliau cerrig traddodiadol gyda golygfeydd panoramig o’r mynyddoedd a’r môr, wedi’i leoli ym mhentref heddychlon Nebo.',
  featuresEn: [
    '2 Double Bedrooms (Sleeps 4)',
    'Inglenook Fireplace with Log Burner',
    'Dog Friendly (Up to 2 dogs)',
    'Enclosed Private Garden & Patio',
    'Direct Access to Nantlle Ridge Footpaths',
    'Spectacular Views to Anglesey & Ireland',
  ],
  featuresCy: [
    '2 Ystafell Wely Ddwbl (Lletya 4)',
    'Lle Tân Inglenook gyda Llosgwr Coed',
    'Croeso i Gŵn (Hyd at 2 gi)',
    'Gardd Breifat Gaeedig a Phatio',
    'Mynediad Uniongyrchol i Lwybr Crib Nantlle',
    'Golygfeydd Ysblennydd i Fôn ac Iwerddon',
  ],
};

export const defaultBbbDetails: PropertyDetails = {
  id: 'property-bryn-bugeiliaid-bach',
  propertyId: 'bryn-bugeiliaid-bach',
  nameEn: 'Bryn Bugeiliaid Bach',
  nameCy: 'Bryn Bugeiliaid Bach',
  taglineEn: 'Luxury peaceful 2-person annexe retreat with conservatory and underfloor heating',
  taglineCy: 'Encil annedd heddychlon moethus i 2 berson gyda hystafell wydr a gwres dan y llawr',
  sleeps: 2,
  bedrooms: 1,
  bathrooms: 1,
  petFriendly: false,
  shortDescriptionEn: 'A luxury self-contained romantic hideaway set beside Plas Hafod with sweeping sea and mountain panoramas (adults retreat, strictly no pets).',
  shortDescriptionCy: 'Encil rhamantus hunangynhaliol moethus wrth ymyl Plas Hafod gyda golygfeydd panoramig o’r môr a’r mynyddoedd (encil i oedolion, dim cŵn).',
  featuresEn: [
    '1 Luxury Bedroom with King Bed',
    'Panoramic Glass Conservatory',
    'Underfloor Heating & Log Burner',
    'Peaceful Adults Only Retreat',
    'Strictly No Pets (Hypoallergenic)',
    'Private Gated Parking & Sun Terrace',
  ],
  featuresCy: [
    '1 Ystafell Wely Foethus gyda Gwely Brenin',
    'Ystafell Wydr Banoramig',
    'Gwres Dan y Llawr a Llosgwr Coed',
    'Encil Heddychlon i Oedolion yn Unig',
    'Dim Cŵn (Hypoalergenig)',
    'Parcio Preifat a Theras Haul',
  ],
};

// Default Fallback Datasets
export const defaultSiteSettings: SiteSettings = {
  siteTitle: 'Bwthyn Plas Hafod Cottage & Bryn Bugeiliaid Bach',
  hostNames: 'Siwsan & Neil',
  email: 'info@plashafodcottage.co.uk',
  phone: '07748 635273 (Siwsan) / 07785 522890 (Neil)',
  whatsapp: '+447748635273',
  address: 'Plas Hafod Cottage, Nebo, Penygroes, Caernarfon, Gwynedd, LL54 6EB',
  addressCy: 'Bwthyn Plas Hafod, Nebo, Penygroes, Caernarfon, Gwynedd, LL54 6EB',
  checkInTime: '3:00 PM',
  checkOutTime: '10:00 AM',
  bannerAnnouncementEn: 'BOOK DIRECT & SAVE 10% — BEST PRICE GUARANTEED ON ALL 2026 / 2027 DATES',
  bannerAnnouncementCy: 'ARCHEBWCH YN UNIONGYRCHOL AC ARBEDWCH 10% — PRIS GORAU WEDI’I WARANTU',
  bannerEnabled: true,
  facebookUrl: 'https://www.facebook.com/bwthynplashafodcottage/',
  instagramUrl: 'https://www.instagram.com/plashafodcottage/',
  trustindexEnabled: false,
  offerPopupEnabled: true,
  offerPosition: 'center',
  offerBadgeEn: 'SPECIAL AUTUMN 2026 OFFER!',
  offerBadgeCy: 'CYNNIG ARBENNIG HYDREF 2026!',
  offerTitleEn: 'Book 3 Nights, Get 4th Night Free!',
  offerTitleCy: 'Archebwch 3 Noson, Cewch y 4edd Noson am Ddim!',
  offerDescriptionEn:
    'Book 3 nights between 1st October and 18th December (excluding 24/10/26 to 31/10/26) and get your 4th night completely FREE!',
  offerDescriptionCy:
    'Archebwch 3 noson rhwng 1af Hydref a 18fed Rhagfyr (ac eithrio 24/10/26 i 31/10/26) a chewch y 4edd noson AM DDIM!',
  offerButtonTextEn: 'Book Now',
  offerButtonTextCy: 'Archebwch Nawr',
  offerButtonLink: '#book',
  bannerLink: '#book',
  offerDisplayMode: 'popup',
  bankAccountName: 'SIWSAN BRODA - Plas Hafod',
  bankName: 'Lloyds Bank',
  bankSortCode: '77-48-24',
  bankAccountNumber: '15999760',
  depositHoldHours: 24,
  depositInstructions:
    'Please quote your unique payment reference on your bank transfer so we can instantly identify your payment and confirm your reservation.',
  depositInstructionsCy:
    'Nodwch eich cyfeirnod talu unigryw wrth drosglwyddo arian fel y gallwn nodi eich taliad ar unwaith a chadarnhau eich archeb.',
  depositType: 'fixed',
  fixedDepositAmount: 200,
  depositPercentage: 25,
  emergencyHostPhone: 'Siwsan: 07748 635273 / Neil: 07785 522890',
  notificationRecipients: 'plashafodcottage@gmail.com',
  guestBookingEmailWelcomeEn:
    'Your booking for {property} was successful and is now pending. We will send you a confirmation of the booking within 24-48 hours.',
  guestBookingEmailWelcomeCy:
    'Roedd eich cais archebu ar gyfer {property} yn llwyddiannus ac mae bellach yn aros am gadarnhad. Byddwn yn anfon cadarnhad o’r archeb atoch o fewn 24-48 awr.',
  guestBookingEmailNextStepsEn:
    'We will review your requested dates and contact you shortly with confirmation and secure deposit payment details to lock in your stay.',
  guestBookingEmailNextStepsCy:
    'Byddwn yn adolygu eich dyddiadau gofynnol ac yn cysylltu â chi’n fuan gyda chadarnhad a manylion talu blaendal diogel i gadarnhau eich arhosiad.',
  guestContactEmailReplyEn:
    'Thank you for getting in touch with us. We have received your inquiry and will respond to you within 24 hours.',
  guestContactEmailReplyCy:
    'Diolch am gysylltu â ni. Rydym wedi derbyn eich neges a byddwn yn ymateb cyn pen 24 awr.',
  checkInDaysBeforeArrival: 30,
  balanceReminderDaysBeforeArrival: 60,
  plasHafodKeySafe: 'Unlocked (Key inside)',
  bbbKeySafe: 'Unlocked (Key inside)',
  checkInDirectionsEn:
    `From the A55 follow the A487 heading towards Porthmadog. Once past Penygroes look for signs to NEBO. Do not turn towards Nebo. Follow the A487 for another mile. You will see a sign for a left turning ahead. Please indicate left and slow down. The turning is a very narrow lane opposite the entrance to TG Cefn Graianog (Quarry) - signage in cream with red writing.\n\nFollow the lane up the hill to the T-junction by the white farm house. Turn left. Follow the lane up the hill and take the first right turning. Follow the steep lane up around the bend approx. 1 mile. The entrance to Bwthyn Plas Hafod Cottage and Bryn Bugeiliaid will be sign posted on your left. Drive across track in the field and you will have reached your destination! There is a designated parking area for your accommodation.\n\nShould you travel through Porthmadog towards Caernarfon you will pass via the Villages of Bryncir and Pant Glas. Just after Pant Glas the signs for TG Cefn Graianog will be on your left and you need to take the narrow lane opposite on your right. Then follow the directions as above .....\n\n(Caernarfon to Nebo = Approx. 11 miles / Porthmadog to Nebo = Approx. 11 miles)\nThe property name is PLAS HAFOD COTTAGE which is the long white cottage.\n(Post Code of the property is LL54 6EB but this will take you via Nebo so please do follow directions as above)\nIf you use the What Three Words App this combination marks the entrance of the property: ///perfume.punctuate.ready`,
  checkInDirectionsCy:
    `O’r A55 dilynwch yr A487 tuag at Borthmadog. Ar ôl mynd heibio Pen-y-groes edrychwch am arwyddion i NEBO. Peidiwch â throi tuag at Nebo. Dilynwch yr A487 am filltir arall. Fe welwch arwydd am droad i’r chwith o’ch blaen. Mae’r troad yn lôn gul iawn gyferbyn â mynedfa TG Cefn Graianog (Chwarel).\n\nDilynwch y lôn i fyny’r bryn at y gyffordd T wrth y ffermdy gwyn. Trowch i’r chwith. Dilynwch y lôn i fyny’r bryn a chymerwch y troad cyntaf i’r dde. Dilynwch y lôn serth i fyny am oddeutu 1 filltir. Bydd y fynedfa i Fwthyn Plas Hafod a Bryn Bugeiliaid wedi’i harwyddo ar eich chwith.\n\nCod Post: LL54 6EB (Noder: Bydd Sat Nav yn mynd â chi trwy Nebo, felly dilynwch y cyfarwyddiadau uchod).\nWhat3Words: ///perfume.punctuate.ready`,
  wasteBinInstructionsEn:
    'General refuse (black bin) and mixed recycling (blue/green caddies) are located beside the timber woodshed. Collection is early Wednesday morning.',
  wasteBinInstructionsCy:
    'Mae sbwriel cyffredinol (bin du) ac ailgylchu cymysg wrth ymyl y sied goed. Cynhelir casgliadau yn gynnar fore Mercher.',
};

export const defaultHeroSlides: HeroSlide[] = [
  {
    id: 1,
    title: 'Plas Hafod Mountain & Sea View',
    imageUrl: '/images/wp/hero-slide-1.jpg',
    altEn: 'Plas Hafod Cottage panoramic views over Snowdonia and Irish Sea',
    altCy: 'Golygfeydd panoramig Bwthyn Plas Hafod dros Eryri a Môr Iwerddon',
    order: 1,
    active: true,
  },
  {
    id: 2,
    title: 'Snowdonia National Park Setting',
    imageUrl: '/images/wp/hero-slide-2.jpg',
    altEn: 'Plas Hafod mountain valley and Snowdonia National Park setting',
    altCy: 'Cwm mynydd Plas Hafod a lleoliad Parc Cenedlaethol Eryri',
    order: 2,
    active: true,
  },
  {
    id: 3,
    title: 'Cottage Grounds and Nantlle Ridge',
    imageUrl: '/images/wp/hero-slide-3.jpg',
    altEn: 'Plas Hafod cottage grounds and Nantlle Ridge walkway views',
    altCy: 'Tiroedd bwthyn Plas Hafod a golygfeydd llwybr Crib Nantlle',
    order: 3,
    active: true,
  },
];

export const defaultSnowdonPaths: SnowdonPath[] = [
  {
    id: 'pyg-track',
    name: 'PYG Track',
    nameCy: 'Llwybr y PYG',
    distance: '3.25 miles each way',
    start: 'Pen-y-Pass Youth Hostel car park',
    startCy: 'Maes parcio Hostel Ieuenctid Pen-y-Pass',
    difficulty: 'Moderate',
    description:
      'The classic and popular mountain path. Contours gently around the dramatic glacial cwm before rising up to Bwlch Glas and the final ridge to the summit.',
    descriptionCy:
      'Y llwybr mynydd clasurol a phoblogaidd. Ymgiliodd yn ysgafn o amgylch y cwm rhewlifol dramatig cyn codi i Fwlch Glas a’r grib olaf i’r copa.',
    order: 1,
  },
  {
    id: 'watkin-path',
    name: 'Watkin Path',
    nameCy: 'Llwybr Watkin',
    distance: '3.5 miles each way',
    start: 'Car park beyond Llyn Gwynant / Nant Gwynant',
    startCy: 'Maes parcio tu hwnt i Lyn Gwynant / Nant Gwynant',
    difficulty: 'Demanding',
    description:
      'The hardest and most demanding climb with the greatest vertical ascent, passing beautiful waterfalls and Victorian copper workings before a steep final scree section.',
    descriptionCy:
      'Y ddringfa galetaf a mwyaf heriol gyda’r esgyniad fertigol mwyaf, gan basio rhaeadrau hardd a hen weithfeydd copr cyn darn sgrí serth olaf.',
    order: 2,
  },
  {
    id: 'snowdon-ranger-path',
    name: 'Snowdon Ranger Path',
    nameCy: 'Llwybr Ceidwad yr Wyddfa',
    distance: '3.75 miles each way',
    start: 'Car park at Llyn Cwellyn',
    startCy: 'Maes parcio ger Llyn Cwellyn',
    difficulty: 'Moderate',
    description:
      'One of the oldest recorded paths to the peak. A steady, rewarding path offering superb open panoramas over Moel Hebog and the Nantlle Ridge.',
    descriptionCy:
      'Un o’r llwybrau hynaf a gofnodwyd i’r copa. Llwybr cyson a gwerth chweil yn cynnig panoramâu agored gwych dros Foel Hebog a Chrib Nantlle.',
    order: 3,
  },
  {
    id: 'rhyd-ddu-path',
    name: 'Rhyd Ddu Path',
    nameCy: 'Llwybr Rhyd Ddu',
    distance: '3.75 miles each way',
    start: 'Car park at Rhyd Ddu village',
    startCy: 'Maes parcio ym mhentref Rhyd Ddu',
    difficulty: 'Moderate',
    description:
      'Easy to follow along broad grassy tracks initially, then narrows along the dramatic Bwlch Main ridge with breathtaking drops on either side.',
    descriptionCy:
      'Hawdd ei ddilyn ar hyd traciau gweunol llydan i ddechrau, yna’n culhau ar hyd crib ddramatig Bwlch Main gyda godre syfrdanol ar bob ochr.',
    order: 4,
  },
  {
    id: 'miners-track',
    name: 'Miners Track',
    nameCy: 'Llwybr y Mwynwyr',
    distance: '3.75 miles each way',
    start: 'Pen-y-Pass car park',
    startCy: 'Maes parcio Pen-y-Pass',
    difficulty: 'Moderate',
    description:
      'Follows a wide, gentle historical cart track past Llyn Teyrn and Llyn Llydaw before climbing steeply past Glaslyn to join the PYG Track.',
    descriptionCy:
      'Dilyn trac certiau hanesyddol llydan a thyner heibio Llyn Teyrn a Llyn Llydaw cyn dringo’n serth heibio Glaslyn i ymuno â Llwybr y PYG.',
    order: 5,
  },
  {
    id: 'llanberis-path',
    name: 'Llanberis Path',
    nameCy: 'Llwybr Llanberis',
    distance: '5 miles each way',
    start: 'Llanberis village',
    startCy: 'Pentref Llanberis',
    difficulty: 'Gentle',
    description:
      'The longest but gradual route, running parallel to the Snowdon Mountain Railway. Popular and easy to navigate with several cafe stops along the route.',
    descriptionCy:
      'Y llwybr hiraf ond mwyaf graddol, yn rhedeg yn gyfochrog â Rheilffordd yr Wyddfa. Poblogaidd a hawdd ei ddilyn gyda sawl man stopio.',
    order: 6,
  },
];

export const defaultReviews: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Megan',
    source: 'Vrbo',
    logoUrl: '/images/wp/logo-vrbo.png',
    stars: 5,
    stayDate: 'September 2026',
    textEn:
      'We had a fantastic stay at Plas Hafod. Such a beautiful location and the cottage had everything we needed. Siwsan and Neil were fantastic hosts and we will most certainly return!',
    textCy:
      'Cawsom arhosiad gwych ym Mhlas Hafod. Lleoliad mor hardd ac roedd gan y bwthyn bopeth yr oedd arnom ei angen. Roedd Siwsan a Neil yn lletywyr ffantastig a byddwn yn sicr yn dychwelyd!',
    featured: true,
  },
  {
    id: 'rev-2',
    author: 'Andrew',
    source: 'Airbnb',
    logoUrl: '/images/wp/logo-airbnb.png',
    stars: 5,
    stayDate: 'October 2026',
    textEn:
      'The house felt new and very clean. It was perfect for our break. The views were amazing and Siwsan was an amazing host. We would definitely stay again.',
    textCy:
      'Roedd y tŷ yn teimlo’n newydd ac yn lân iawn. Roedd yn berffaith ar gyfer ein hegwyl. Roedd y golygfeydd yn anhygoel ac roedd Siwsan yn lletywr anhygoel.',
    featured: true,
  },
  {
    id: 'rev-3',
    author: 'Rosie and Clive J.',
    source: 'TripAdvisor',
    logoUrl: '/images/wp/logo-tripadvisor.png',
    stars: 5,
    stayDate: 'August 2026',
    textEn:
      'Gorgeous views, peace and quiet and spotlessly clean and well equipped cottage, bed was super-king and blissfully comfortable.',
    textCy:
      'Golygfeydd hyfryd, heddwch a llonyddwch a bwthyn hynod lân ac offer da, roedd y gwely yn uwch-frenin ac yn hyfryd o gyfforddus.',
    featured: true,
  },
  {
    id: 'rev-4',
    author: 'Luis',
    source: 'Airbnb',
    logoUrl: '/images/wp/logo-airbnb.png',
    stars: 5,
    stayDate: 'July 2026',
    textEn:
      'We absolutely loved it! The place was very cozy, warm and extremely clean. The cottage has amazing sea views from the hill, and they left everything ready to light on the chimney which was very pleasant. Siwsan is fantastic and made us feel at home, 100% we will visit again!',
    textCy:
      'Roeddem wrth ein boddau ag ef! Roedd y lle yn glyd iawn, yn gynnes ac yn hynod lân. Mae gan y bwthyn olygfeydd anhygoel o’r môr o’r bryn, ac roedd popeth yn barod i gynnau tân.',
    featured: true,
  },
  {
    id: 'rev-5',
    author: 'Simon',
    source: 'Vrbo',
    logoUrl: '/images/wp/logo-vrbo.png',
    stars: 5,
    stayDate: 'September 2026',
    textEn:
      'Excellent property, in the hills surrounded by pure countryside. Modern living quarters with new amenities and stunning views. Garden was fenced in so dogs had free roam there.',
    textCy:
      'Eiddo rhagorol, yn y bryniau wedi’i amgylchynu gan gefn gwlad pur. Cartref modern gyda chyfleusterau newydd a golygfeydd godidog. Roedd yr ardd wedi’i ffensio ar gyfer cŵn.',
    featured: true,
  },
  {
    id: 'rev-6',
    author: 'Joanne',
    source: 'Airbnb',
    logoUrl: '/images/wp/logo-airbnb.png',
    stars: 5,
    stayDate: 'October 2026',
    textEn:
      'What a beautiful cottage. So clean and tidy. In a gorgeous location, so peaceful with an amazing sea view. The cottage was fully equipped with everything.',
    textCy:
      'Dyna fwthyn hardd. Mor lân a thaclus. Mewn lleoliad hyfryd, mor heddychlon gyda golygfa anhygoel o’r môr. Roedd y bwthyn wedi’i gyfarparu’n llawn.',
    featured: true,
  },
];

export const defaultReviewSettings: ReviewSettings = {
  trustindexEnabled: true,
  trustindexScriptUrl: 'https://cdn.trustindex.io/loader.js?4a4d3e0840a425233b16403d1a0',
  trustindexEmbedCode: '',
  reviewHeading: 'SEE WHAT OUR CUSTOMERS THINK',
  guestbookHeading: 'WORDS FROM OUR VISITORS',
  guestbookDescription:
    'Clippings taken directly from the handwritten guestbook located in the inglenook lounge of Plas Hafod Cottage.',
  showPlatformReviews: true,
  showGuestbookArchive: true,
};

export const defaultGuestbookEntries: GuestbookEntry[] = [
  {
    id: 'guestbook-clip-1',
    author: 'Elen & David Williams',
    location: 'Cardiff',
    stayDate: 'August 2026',
    rating: 5,
    imageUrl: '/images/wp/review-clip-1.jpg',
    reviewTextEn:
      'Plas Hafod is pure magic. Sitting by the crackling inglenook fire after hiking the ridges of Eryri was sublime. The views across the valley will stay with us forever.',
    reviewTextCy:
      'Mae Plas Hafod yn hud pur. Roedd eistedd wrth y tân agored ar ôl cerdded cribau Eryri yn fendigedig. Bydd yr olygfeydd dros y cwm yn aros gyda ni am byth.',
    order: 1,
  },
  {
    id: 'guestbook-clip-2',
    author: 'Sarah & Mark Thornton',
    location: 'Bristol',
    stayDate: 'September 2026',
    rating: 5,
    imageUrl: '/images/wp/review-clip-2.jpg',
    reviewTextEn:
      'One of the most authentic, luxurious holiday cottages we have ever stayed in. Spotlessly clean, wonderfully peaceful, and the Welsh welcome hamper was delicious!',
    reviewTextCy:
      'Un o’r bythynnod gwyliau mwyaf dilys a moethus rydym erioed wedi aros ynddo. Hynod lân, heddychlon iawn, ac roedd y fasged groeso Gymreig yn flasus!',
    order: 2,
  },
  {
    id: 'guestbook-clip-3',
    author: 'Geraint & Sioned Evans',
    location: 'Aberystwyth',
    stayDate: 'October 2026',
    rating: 5,
    imageUrl: '/images/wp/review-clip-3.jpg',
    reviewTextEn:
      'The perfect romantic getaway. The bed was exceptionally comfortable, the kitchen well-appointed, and gazing at the dark starlit skies was unforgettable.',
    reviewTextCy:
      'Y dihangfa ramantus berffaith. Roedd y gwely yn hynod gyfforddus, y gegin wedi’i threfnu’n wych, a gwylio’r awyr serog yn fythgofiadwy.',
    order: 3,
  },
  {
    id: 'guestbook-clip-4',
    author: 'Fiona & Patrick Davies',
    location: 'Chester',
    stayDate: 'July 2026',
    rating: 5,
    imageUrl: '/images/wp/review-clip-4.jpg',
    reviewTextEn:
      'A truly peaceful retreat in the Welsh mountains. The views are astonishing and the welcome basket was lovely.',
    reviewTextCy:
      'Dihangfa wirioneddol heddychlon ym mynyddoedd Cymru. Mae’r golygfeydd yn syfrdanol ac roedd y fasged groeso’n hyfryd.',
    order: 4,
  },
  {
    id: 'guestbook-clip-5',
    author: 'Rhiannon & Huw Roberts',
    location: 'Caerdydd',
    stayDate: 'June 2026',
    rating: 5,
    imageUrl: '/images/wp/review-clip-5.jpg',
    reviewTextEn:
      'We loved our time at Plas Hafod. The cottage has so much character and warmth. We cannot wait to return next year!',
    reviewTextCy:
      'Roeddem wrth ein boddau gyda’n hamser ym Mhlas Hafod. Mae gan y bwthyn gymaint o gymeriad a chynhesrwydd. Ni allwn aros i ddychwelyd y flwyddyn nesaf!',
    order: 5,
  },
  {
    id: 'guestbook-clip-6',
    author: 'Rebecca & James Miller',
    location: 'Manchester',
    stayDate: 'May 2026',
    rating: 5,
    imageUrl: '/images/wp/review-clip-6.jpg',
    reviewTextEn:
      'Beautiful cottage, pristine cleanliness and breathtaking views. Walking the Snowdon trails right from the doorstep was ideal.',
    reviewTextCy:
      'Bwthyn hardd, glendid perffaith a golygfeydd syfrdanol. Roedd cerdded llwybrau’r Wyddfa yn union o’r drws yn ddelfrydol.',
    order: 6,
  },
];

export const defaultPolicySections: PolicySection[] = [
  {
    id: 'term-1',
    title: '1. Contract & Payment Schedule',
    titleCy: '1. Cytundeb ac Amserlen Dalu',
    icon: 'shield',
    leadParagraphEn:
      'A contract between the Guests and the Owner will come into existence when a deposit payment is received to secure the stay and a booking confirmation is issued showing confirmed holiday dates. The contract binds you and all members of your party.',
    leadParagraphCy:
      'Daw cytundeb i rym rhwng y Gwesteion a’r Perchennog pan dderbynnir blaendal i sicrhau’r arhosiad a phan roddir cadarnhad archeb sy’n dangos dyddiadau cadarnhau. Mae’r cytundeb yn eich rhwymo chi a phob aelod o’ch parti.',
    bulletsEn: [
      'A non-refundable £200 deposit (per week booked) is payable at the time of booking.',
      'The remaining balance of the rental fee must be paid 6 weeks prior to arrival date.',
      'Bookings made within 6 weeks of arrival must be paid in full at the time of booking.',
      'We accept bank transfer, debit/credit card via secure booking gateway.',
    ],
    bulletsCy: [
      'Mae blaendal na ellir ei ad-dalu o £200 (fesul wythnos) yn ddyledus ar adeg archebu.',
      'Rhaid talu gweddill y ffi llogi 6 wythnos cyn dyddiad cyrraedd.',
      'Rhaid talu archebion a wneir o fewn 6 wythnos i gyrraedd yn llawn ar unwaith.',
    ],
    order: 1,
  },
  {
    id: 'term-2',
    title: '2. Cancellation by Guest',
    titleCy: '2. Canslo gan y Gwestai',
    icon: 'alert',
    leadParagraphEn:
      'All cancellations must be notified immediately in writing via email. We strongly advise taking out comprehensive UK holiday travel insurance.',
    leadParagraphCy:
      'Rhaid hysbysu am bob canslo ar unwaith yn ysgrifenedig trwy e-bost. Rydym yn cynghori’n gryf i gymryd yswiriant teithio gwyliau cynhwysfawr.',
    bulletsEn: [
      'More than 6 weeks prior to arrival: Deposit is retained.',
      'Between 4 and 6 weeks prior to arrival: 50% of the total rental sum is refunded.',
      'Less than 4 weeks prior to arrival: The full rental sum is retained unless re-let.',
    ],
    bulletsCy: [
      'Mwy na 6 wythnos cyn cyrraedd: Cedwir y blaendal.',
      'Rhwng 4 a 6 wythnos cyn cyrraedd: Ad-delir 50% o gyfanswm y rhent.',
      'Llai na 4 wythnos cyn cyrraedd: Cedwir cyfanswm y rhent oni bai am ail-osod.',
    ],
    order: 2,
  },
  {
    id: 'term-3',
    title: '3. Dogs Policy',
    titleCy: '3. Polisi Cŵn',
    icon: 'dog',
    leadParagraphEn:
      'Plas Hafod Cottage warmly welcomes up to 2 well-behaved dogs (Bryn Bugeiliaid Bach remains strictly dog-free). As Snowdonia is surrounded by active sheep farming, specific guidelines must be respected.',
    leadParagraphCy:
      'Mae Bwthyn Plas Hafod yn croesawu hyd at 2 gi sy’n ymddwyn yn dda (mae Bryn Bugeiliaid Bach yn ddi-gŵn). Gan fod ffermio defaid gweithredol o amgylch Eryri, rhaid parchu canllawiau penodol.',
    bulletsEn: [
      'Well-behaved dogs are welcome at Plas Hafod Cottage by prior arrangement (max 2 dogs).',
      'Dogs must not be left unattended in the cottage or garden at any time.',
      'Dogs must be kept on leads outside the enclosed cottage garden boundaries.',
      'Please do not permit dogs on furniture or beds. Bring your dog’s bed and towels.',
    ],
    bulletsCy: [
      'Croesewir hyd at 2 gi sy’n ymddwyn yn dda ym Mhlas Hafod trwy drefniant ymlaen llaw.',
      'Ni ddylid gadael cŵn ar eu pennau eu hunain yn y bwthyn na’r ardd ar unrhyw adeg.',
      'Rhaid cadw cŵn ar dennyn y tu allan i derfynau gardd y bwthyn.',
      'Gofynnir i beidio â gadael cŵn ar ddodrefn na gwelyau. Dewch â gwely a thywelion eich ci.',
    ],
    order: 3,
  },
  {
    id: 'term-4',
    title: '4. Arrival & Departure Times',
    titleCy: '4. Amserau Cyrraedd a Gadael',
    icon: 'clock',
    leadParagraphEn:
      'To allow for meticulous cleaning and preparation to 5-star luxury standards:',
    leadParagraphCy:
      'Er mwyn caniatáu glanhau trylwyr a pharatoi i safonau moethus 5-seren:',
    bulletsEn: [
      'Check-in is from 3:00 PM on the day of arrival.',
      'Check-out is strictly by 10:00 AM on the day of departure.',
      'Key safe code instructions are emailed 7 days prior to your arrival.',
    ],
    bulletsCy: [
      'Mae cyrraedd o 3:00 PM ymlaen ar ddiwrnod cyrraedd.',
      'Rhaid gadael erbyn 10:00 AM ar ddiwrnod gadael.',
    ],
    order: 4,
  },
  {
    id: 'term-5',
    title: '5. Care of Property & Damage Deposit',
    titleCy: '5. Gofal am yr Eiddo a Blaendal Niwed',
    icon: 'sparkles',
    leadParagraphEn:
      'Guests are expected to treat the property with care and leave it in a clean and orderly condition.',
    leadParagraphCy:
      'Disgwylir i westeion drin yr eiddo â gofal a’i adael mewn cyflwr glân a thaclus.',
    bulletsEn: [
      'Smoking / vaping is strictly prohibited inside all properties.',
      'Any accidental damage or breakages should be reported to Siwsan & Neil promptly.',
      'Electric vehicle charging is not permitted from standard domestic 3-pin sockets.',
    ],
    bulletsCy: [
      'Gwaherddir ysmygu y tu mewn i’r holl eiddo.',
      'Dylid rhoi gwybod i Siwsan a Neil am unrhyw ddifrod damweiniol yn brydlon.',
    ],
    order: 5,
  },
];

