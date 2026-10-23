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
  author?: string;
  location?: string;
  stayDate?: string;
  rating?: number; // 1-5
  comment?: LocalizedString | string;
  reviewTextEn?: string;
  reviewTextCy?: string;
  imageUrl?: string;
  property?: 'plas-hafod' | 'bryn-bugeiliaid-bach' | string;
  order?: number;
  isFeatured?: boolean;
}

export interface ReviewSettings {
  trustindexEnabled: boolean;
  trustindexScriptUrl?: string;
  trustindexEmbedCode?: string;
  reviewHeading?: string;
  guestbookHeading?: string;
  guestbookDescription?: string;
  showPlatformReviews?: boolean;
  showGuestbookArchive?: boolean;
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

export interface LocalAttraction {
  id: string;
  title: string;
  titleCy?: string;
  category: string;
  categoryCy?: string;
  description: string;
  descriptionCy?: string;
  imageUrl: string;
  url: string;
  distance?: string;
  order?: number;
  featured?: boolean;
}

export interface Accreditation {
  id: string;
  title: string;
  titleCy?: string;
  source: string;
  badge: string;
  badgeColor?: string;
  score?: string;
  scoreCy?: string;
  description: string;
  descriptionCy?: string;
  imageUrl: string;
  property?: 'both' | 'plas-hafod' | 'bryn-bugeiliaid-bach';
  year?: string;
  order?: number;
  featured?: boolean;
}

export interface SiteSettings {
  siteTitle: string;
  hostNames: string;
  email: string;
  phone: string;
  whatsapp?: string;
  address: string;
  addressCy?: string;
  checkInTime: string;
  checkOutTime: string;
  bannerAnnouncementEn: string;
  bannerAnnouncementCy?: string;
  bannerEnabled: boolean;
  facebookUrl?: string;
  instagramUrl?: string;
  trustindexEnabled?: boolean;
  trustindexScriptUrl?: string;
  trustindexEmbedCode?: string;
}

export interface HeroSlide {
  id: string | number;
  title: string;
  imageUrl: string;
  altEn: string;
  altCy?: string;
  order?: number;
  active?: boolean;
}

export interface SnowdonPath {
  id: string;
  name: string;
  nameCy?: string;
  distance: string;
  start: string;
  startCy?: string;
  difficulty: string;
  description: string;
  descriptionCy?: string;
  order?: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  source: 'Airbnb' | 'Vrbo' | 'TripAdvisor' | 'Google' | 'Direct' | string;
  property?: 'both' | 'plas-hafod' | 'bryn-bugeiliaid-bach' | string;
  stars: number;
  stayDate?: string;
  textEn: string;
  textCy?: string;
  logoUrl?: string;
  guestPhotoUrl?: string;
  featured?: boolean;
}

export interface PolicySection {
  id: string;
  title: string;
  titleCy?: string;
  icon?: string;
  leadParagraphEn?: string;
  leadParagraphCy?: string;
  bulletsEn: string[];
  bulletsCy?: string[];
  order?: number;
}

export interface PropertyDetails {
  id: string;
  propertyId: 'plas-hafod' | 'bryn-bugeiliaid-bach';
  nameEn: string;
  nameCy?: string;
  taglineEn?: string;
  taglineCy?: string;
  sleeps: number;
  bedrooms: number;
  bathrooms: number;
  petFriendly: boolean;
  shortDescriptionEn?: string;
  shortDescriptionCy?: string;
  fullStoryEn?: string;
  fullStoryCy?: string;
  featuresEn: string[];
  featuresCy?: string[];
  galleryImages?: { url: string; caption?: string }[];
}
