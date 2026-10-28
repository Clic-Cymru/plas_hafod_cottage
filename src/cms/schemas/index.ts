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
import { seasonSchema } from './season';
import { specialOfferSchema } from './specialOffer';
import { emailTemplateSchema } from './emailTemplate';

export const schemaTypes = [
  // Properties & Content
  propertyDetailsSchema,
  heroSlideSchema,
  pageContentSchema,
  // Pricing & Bookings
  pricingSchema,
  seasonSchema,
  specialOfferSchema,
  blockedDatesSchema,
  bookingInquirySchema,
  contactMessageSchema,
  emailTemplateSchema,
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
  seasonSchema,
  specialOfferSchema,
  blockedDatesSchema,
  bookingInquirySchema,
  contactMessageSchema,
  emailTemplateSchema,
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
