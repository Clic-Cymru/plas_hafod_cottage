/**
 * Sanity Schema: Guest Review & Testimonial
 * Covers external platform reviews (Airbnb, Vrbo, TripAdvisor, Google) and direct guestbook messages.
 */
export const reviewSchema = {
  name: 'review',
  title: 'Guest Review & Testimonial',
  type: 'document',
  fields: [
    {
      name: 'author',
      title: 'Guest Name',
      type: 'string',
      description: 'e.g. "Megan", "Andrew", "Rosie & Clive J."',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'source',
      title: 'Review Source',
      type: 'string',
      options: {
        list: [
          { title: 'Airbnb', value: 'Airbnb' },
          { title: 'Vrbo', value: 'Vrbo' },
          { title: 'Booking.com', value: 'Booking.com' },
          { title: 'Google Reviews', value: 'Google' },
          { title: 'TripAdvisor', value: 'TripAdvisor' },
          { title: 'Direct Guestbook', value: 'Direct' },
        ],
      },
      initialValue: 'Airbnb',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'property',
      title: 'Cottage',
      type: 'string',
      options: {
        list: [
          { title: 'Both Cottages', value: 'both' },
          { title: 'Plas Hafod Cottage', value: 'plas-hafod' },
          { title: 'Bryn Bugeiliaid Bach', value: 'bryn-bugeiliaid-bach' },
        ],
      },
      initialValue: 'plas-hafod',
    },
    {
      name: 'stars',
      title: 'Star Rating (1 - 5)',
      type: 'number',
      initialValue: 5,
      validation: (Rule: any) => Rule.min(1).max(5),
    },
    {
      name: 'stayDate',
      title: 'Stay Date / Month',
      type: 'string',
      description: 'e.g. "August 2026" or "October 2026"',
    },
    {
      name: 'textEn',
      title: 'Review Text (English)',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'textCy',
      title: 'Review Text (Welsh)',
      type: 'text',
      rows: 4,
      description: 'Welsh translation placeholder for review text',
    },
    {
      name: 'guestPhoto',
      title: 'Guest Photo (Optional)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 10,
    },
  ],
  preview: {
    select: {
      title: 'author',
      source: 'source',
      stars: 'stars',
      media: 'guestPhoto',
    },
    prepare({ title, source, stars, media }: any) {
      return {
        title: `${title || 'Guest'} (${source || 'Review'})`,
        subtitle: `${'★'.repeat(stars || 5)} · ${source}`,
        media,
      };
    },
  },
};
