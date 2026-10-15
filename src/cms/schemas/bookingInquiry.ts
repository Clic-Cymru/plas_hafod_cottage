/**
 * Sanity / Headless CMS Schema: Booking Inquiries (Booking Inbox)
 * Where form submissions from guests are saved directly into the client dashboard.
 */
export const bookingInquirySchema = {
  name: 'bookingInquiry',
  title: 'Booking Inquiries (Inbox)',
  type: 'document',
  fields: [
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending Review', value: 'pending' },
          { title: 'Confirmed / Deposit Paid', value: 'confirmed' },
          { title: 'Declined / Cancelled', value: 'declined' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
    },
    {
      name: 'guestName',
      title: 'Guest Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'guestEmail',
      title: 'Email Address',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'guestPhone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'checkIn',
      title: 'Check-in Date',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'checkOut',
      title: 'Check-out Date',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'totalNights',
      title: 'Total Nights',
      type: 'number',
    },
    {
      name: 'adults',
      title: 'Adults',
      type: 'number',
      initialValue: 2,
    },
    {
      name: 'children',
      title: 'Children',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'pets',
      title: 'Pets',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'calculatedTotal',
      title: 'Calculated Total Amount (£)',
      type: 'number',
    },
    {
      name: 'depositAmount',
      title: 'Deposit Required (£)',
      type: 'number',
    },
    {
      name: 'balanceDue',
      title: 'Remaining Balance (£)',
      type: 'number',
    },
    {
      name: 'notes',
      title: 'Guest Notes & Special Requests',
      type: 'text',
      rows: 4,
    },
    {
      name: 'createdAt',
      title: 'Received At',
      type: 'datetime',
      readOnly: true,
    },
  ],
  orderings: [
    {
      title: 'Received Date, Newest First',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      guestName: 'guestName',
      checkIn: 'checkIn',
      checkOut: 'checkOut',
      total: 'calculatedTotal',
      status: 'status',
    },
    prepare({ guestName, checkIn, checkOut, total, status }: any) {
      return {
        title: `${guestName} (${status?.toUpperCase() || 'NEW'})`,
        subtitle: `${checkIn} → ${checkOut} • £${total || 0}`,
      };
    },
  },
};
