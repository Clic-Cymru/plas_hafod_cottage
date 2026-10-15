/**
 * Sanity / Headless CMS Schema: Guestbook & Reviews
 */
export const guestbookSchema = {
  name: 'guestbookEntry',
  title: 'Guestbook & Reviews',
  type: 'document',
  fields: [
    {
      name: 'author',
      title: 'Guest Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Guest Origin / Location',
      type: 'string',
      description: 'e.g. "Cardiff", "London", "Bristol", "Edinburgh"',
    },
    {
      name: 'stayDate',
      title: 'Month / Year of Stay',
      type: 'string',
      description: 'e.g. "September 2025"',
    },
    {
      name: 'rating',
      title: 'Star Rating (1-5)',
      type: 'number',
      initialValue: 5,
      validation: (Rule: any) => Rule.required().min(1).max(5),
    },
    {
      name: 'reviewTextEn',
      title: 'Review / Comment (English)',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'reviewTextCy',
      title: 'Adolygiad (Cymraeg - Optional)',
      type: 'text',
      rows: 4,
    },
    {
      name: 'photo',
      title: 'Guest Photo / Guestbook Handwritten Note Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'isFeatured',
      title: 'Feature on Homepage',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      author: 'author',
      stayDate: 'stayDate',
      rating: 'rating',
    },
    prepare({ author, stayDate, rating }: any) {
      return {
        title: `${author} (${'★'.repeat(rating || 5)})`,
        subtitle: stayDate || 'Guest Review',
      };
    },
  },
};
