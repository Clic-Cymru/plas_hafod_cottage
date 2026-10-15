/**
 * Sanity / Headless CMS Schema: Blocked Dates
 * Manages unavailable calendar dates (direct bookings, OTA sync, maintenance, owner use).
 */
export const blockedDatesSchema = {
  name: 'blockedDates',
  title: 'Blocked Dates / Calendar Restrictions',
  type: 'document',
  fields: [
    {
      name: 'propertyId',
      title: 'Property',
      type: 'string',
      options: {
        list: [
          { title: 'Plas Hafod Cottage', value: 'plas-hafod' },
          { title: 'Bryn Bugeiliaid Bach', value: 'bryn-bugeiliaid-bach' },
          { title: 'Both Cottages', value: 'both' },
        ],
        layout: 'radio',
      },
      initialValue: 'plas-hafod',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Label / Reference',
      type: 'string',
      description: 'e.g., "Confirmed Direct Booking - Smith Family" or "Annual Roof Maintenance"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'startDate',
      title: 'First Unavailable Night (Check-in day blocked)',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'endDate',
      title: 'Final Unavailable Night (Departure morning)',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'reason',
      title: 'Reason',
      type: 'string',
      options: {
        list: [
          { title: 'Confirmed Guest Booking', value: 'booked' },
          { title: 'Property Maintenance / Cleaning', value: 'maintenance' },
          { title: 'Owner Private Stay', value: 'owner_stay' },
          { title: 'Other Restriction', value: 'other' },
        ],
      },
      initialValue: 'booked',
    },
    {
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 2,
    },
  ],
  preview: {
    select: {
      title: 'title',
      start: 'startDate',
      end: 'endDate',
      reason: 'reason',
      propertyId: 'propertyId',
    },
    prepare({ title, start, end, reason, propertyId }: any) {
      const propLabel =
        propertyId === 'bryn-bugeiliaid-bach'
          ? '[BBB]'
          : propertyId === 'both'
          ? '[Both]'
          : '[Plas Hafod]';
      return {
        title: `${propLabel} ${title || 'Blocked Period'}`,
        subtitle: `${start} → ${end} (${reason || 'booked'})`,
      };
    },
  },
};
