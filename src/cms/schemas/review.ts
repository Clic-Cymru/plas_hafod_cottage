/**
 * Sanity Schema: Guest Review & Testimonial
 * Covers external platform reviews (Airbnb, Vrbo, TripAdvisor, Google) and direct guestbook messages.
 */
export const reviewSchema = {
  name: 'review',
  title: 'Guest Reviews & Testimonials (Adolygiadau Gwesteion)',
  type: 'document',
  fields: [
    {
      name: 'author',
      title: 'Guest Name / Enw’r Gwestai',
      type: 'string',
      description: 'e.g. "Megan", "Andrew", "Rosie & Clive J."',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'source',
      title: 'Review Source / Platfform',
      type: 'string',
      options: {
        list: [
          { title: 'Airbnb', value: 'Airbnb' },
          { title: 'Vrbo', value: 'Vrbo' },
          { title: 'Booking.com', value: 'Booking.com' },
          { title: 'Google Reviews', value: 'Google' },
          { title: 'TripAdvisor', value: 'TripAdvisor' },
          { title: 'Direct Guestbook / Llyfr Gwesteion', value: 'Direct' },
        ],
      },
      initialValue: 'Airbnb',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'property',
      title: 'Property / Eiddo',
      type: 'string',
      options: {
        list: [
          { title: 'Both Properties / Y Ddau', value: 'both' },
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
      title: 'Stay Date / Month / Dyddiad Aros',
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
      title: 'Testun yr Adolygiad (Cymraeg)',
      type: 'text',
      rows: 4,
    },
    {
      name: 'guestPhoto',
      title: 'Guest Photo / Holiday Photo (Optional)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'featured',
      title: 'Featured on Homepage / Amlygu ar yr Hafan',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'order',
      title: 'Display Order / Trefn',
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
