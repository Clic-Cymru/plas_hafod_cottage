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
    },
    prepare({ title, start, end, reason }: any) {
      return {
        title: title || 'Blocked Period',
        subtitle: `${start} → ${end} (${reason || 'booked'})`,
      };
    },
  },
};
