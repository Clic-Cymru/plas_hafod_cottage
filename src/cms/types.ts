export interface Season {
  id: string;
  name: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  nightlyRate: number; // in GBP (£)
  minStay: number;    // minimum nights
}

export interface DiscountRule {
  id: string;
  name: string;
  code?: string;
  minNights?: number;
  validFrom?: string; // YYYY-MM-DD
  validTo?: string;   // YYYY-MM-DD
  discountType: 'percentage' | 'fixed';
  value: number; // e.g. 10 for 10% or 50 for £50
}

export interface BlockedDateRange {
  id: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  reason?: 'booked' | 'maintenance' | 'owner_stay' | 'other';
  notes?: string;
}

export interface PricingConfig {
  baseRate: number; // default nightly rate in GBP
  depositPercentage: number; // e.g. 25%
  cleaningFee?: number;
  seasons: Season[];
  discounts: DiscountRule[];
}

export interface BookingInquiry {
  id?: string;
  propertyId?: 'plas-hafod' | 'bryn-bugeiliaid-bach';
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  adults: number;
  children: number;
  pets: number;
  totalNights: number;
  nightlyBreakdown: { date: string; rate: number; seasonName?: string }[];
  subtotal: number;
  discountAmount: number;
  appliedDiscountName?: string;
  totalPrice: number;
  depositAmount: number;
  balanceDue: number;
  notes?: string;
  status: 'pending' | 'confirmed' | 'declined';
  createdAt: string;
}

export interface LocalizedString {
  en: string;
  cy: string;
}

export interface GuestbookEntry {
  id: string;
  author: string;
  location?: string;
  stayDate: string;
  rating: number; // 1-5
  comment: LocalizedString | string;
  imageUrl?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

