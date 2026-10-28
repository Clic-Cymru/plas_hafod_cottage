/**
 * Sanity Schema: Page Content with English & Welsh translation placeholders.
 */
export const pageContentSchema = {
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  fields: [
    {
      name: 'slug',
      title: 'Page Identifier / Slug',
      type: 'string',
      description: 'e.g. "home", "bryn-bugeiliaid-bach", "local-area", "reviews", "contact", "terms"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'titleCy',
      title: 'Title (Welsh)',
      type: 'string',
      description: 'Welsh translation placeholder for page title.',
    },
    {
      name: 'heroHeadingEn',
      title: 'Hero Heading (English)',
      type: 'string',
    },
    {
      name: 'heroHeadingCy',
      title: 'Hero Heading (Welsh)',
      type: 'string',
    },
    {
      name: 'heroSubheadingEn',
      title: 'Hero Subheading (English)',
      type: 'text',
      rows: 2,
    },
    {
      name: 'heroSubheadingCy',
      title: 'Hero Subheading (Welsh)',
      type: 'text',
      rows: 2,
    },
    {
      name: 'bodyEn',
      title: 'Body Description (English)',
      type: 'text',
      rows: 6,
    },
    {
      name: 'bodyCy',
      title: 'Body Description (Welsh)',
      type: 'text',
      rows: 6,
    },
    {
      name: 'seoTitleEn',
      title: 'SEO Title (English)',
      type: 'string',
    },
    {
      name: 'seoTitleCy',
      title: 'SEO Title (Welsh)',
      type: 'string',
    },
    {
      name: 'seoDescriptionEn',
      title: 'Meta Description (English)',
      type: 'text',
      rows: 2,
    },
    {
      name: 'seoDescriptionCy',
      title: 'Meta Description (Welsh)',
      type: 'text',
      rows: 2,
    },
    {
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
  ],
  preview: {
    select: {
      title: 'titleEn',
      slug: 'slug',
    },
    prepare({ title, slug }: any) {
      return {
        title: title || slug || 'Untitled Page',
        subtitle: `Slug: /${slug || ''}`,
      };
    },
  },
};
