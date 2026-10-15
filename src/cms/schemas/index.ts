import { pricingSchema } from './pricing';
import { blockedDatesSchema } from './blockedDates';
import { bookingInquirySchema } from './bookingInquiry';
import { pageContentSchema } from './pageContent';
import { guestbookSchema } from './guestbook';

export const schemaTypes = [
  pricingSchema,
  blockedDatesSchema,
  bookingInquirySchema,
  pageContentSchema,
  guestbookSchema,
];

export {
  pricingSchema,
  blockedDatesSchema,
  bookingInquirySchema,
  pageContentSchema,
  guestbookSchema,
};
