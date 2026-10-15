/**
 * Sanity / Headless CMS Schema: Page Content with Welsh (Cymraeg) & English fields.
 */
export const pageContentSchema = {
  name: 'pageContent',
  title: 'Pages & Bilingual Content',
  type: 'document',
  fields: [
    {
      name: 'slug',
      title: 'Page Slug / Identifier',
      type: 'string',
      description: 'e.g. "home", "about", "gallery", "booking", "contact"',
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
      title: 'Teitl (Cymraeg / Welsh)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroHeadingEn',
      title: 'Hero Heading (English)',
      type: 'string',
    },
    {
      name: 'heroHeadingCy',
      title: 'Prif Benaeth (Cymraeg)',
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
      title: 'Is-bennawd (Cymraeg)',
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
      title: 'Disgrifiad (Cymraeg)',
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
      title: 'Teitl SEO (Cymraeg)',
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
      title: 'Disgrifiad Meta (Cymraeg)',
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
};
