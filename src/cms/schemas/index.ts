import { pricingSchema } from './pricing';
import { blockedDatesSchema } from './blockedDates';
import { bookingInquirySchema } from './bookingInquiry';
import { pageContentSchema } from './pageContent';
import { guestbookSchema } from './guestbook';
import { contactMessageSchema } from './contactMessage';
import { localAttractionSchema } from './localAttraction';
import { accreditationSchema } from './accreditation';
import { siteSettingsSchema } from './siteSettings';
import { heroSlideSchema } from './heroSlide';
import { snowdonPathSchema } from './snowdonPath';
import { reviewSchema } from './review';
import { policySectionSchema } from './policySection';
import { propertyDetailsSchema } from './propertyDetails';
import { reviewSettingsSchema } from './reviewSettings';

export const schemaTypes = [
  // Properties & Content
  propertyDetailsSchema,
  heroSlideSchema,
  pageContentSchema,
  // Pricing & Bookings
  pricingSchema,
  blockedDatesSchema,
  bookingInquirySchema,
  contactMessageSchema,
  // Reviews & Accreditations
  reviewSettingsSchema,
  reviewSchema,
  guestbookSchema,
  accreditationSchema,
  // Local Area & Walks
  localAttractionSchema,
  snowdonPathSchema,
  // Policies & Settings
  policySectionSchema,
  siteSettingsSchema,
];

export {
  pricingSchema,
  blockedDatesSchema,
  bookingInquirySchema,
  contactMessageSchema,
  pageContentSchema,
  guestbookSchema,
  localAttractionSchema,
  accreditationSchema,
  siteSettingsSchema,
  heroSlideSchema,
  snowdonPathSchema,
  reviewSchema,
  policySectionSchema,
  propertyDetailsSchema,
  reviewSettingsSchema,
};
