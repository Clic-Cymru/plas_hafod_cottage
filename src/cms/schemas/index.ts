import { pricingSchema } from './pricing';
import { blockedDatesSchema } from './blockedDates';
import { bookingInquirySchema } from './bookingInquiry';
import { pageContentSchema } from './pageContent';
import { guestbookSchema } from './guestbook';
import { contactMessageSchema } from './contactMessage';

export const schemaTypes = [
  pricingSchema,
  blockedDatesSchema,
  bookingInquirySchema,
  contactMessageSchema,
  pageContentSchema,
  guestbookSchema,
];

export {
  pricingSchema,
  blockedDatesSchema,
  bookingInquirySchema,
  contactMessageSchema,
  pageContentSchema,
  guestbookSchema,
};

