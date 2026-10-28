/**
 * Sanity Schema: Hero Slideshow Slide
 * Enables managing, reordering, and replacing hero slide images & Welsh/English alt tags.
 */
export const heroSlideSchema = {
  name: 'heroSlide',
  title: 'Hero Slideshow Slide',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Slide Title / Label (English)',
      type: 'string',
      description: 'Internal reference label e.g. "Snowdonia Mountain & Sea Panorama"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Slide Image',
      type: 'image',
      description: 'High-resolution photo (recommended 1920x1080 or wider). Hotspot supported.',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'customImageUrl',
      title: 'Fallback Image Path',
      type: 'string',
      description: 'e.g. "/images/wp/hero-slide-1.jpg"',
    },
    {
      name: 'altEn',
      title: 'Alt Text (English)',
      type: 'string',
      description: 'Accessibility & SEO description for search engines and screen readers',
      initialValue: 'Plas Hafod Cottage panoramic views over Snowdonia and Irish Sea',
    },
    {
      name: 'altCy',
      title: 'Alt Text (Welsh)',
      type: 'string',
      initialValue: 'Golygfeydd panoramig Bwthyn Plas Hafod dros Eryri a Môr Iwerddon',
      description: 'Welsh translation placeholder for alt text',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
      description: '1 = First slide, 2 = Second slide, etc.',
    },
    {
      name: 'active',
      title: 'Active Slide',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to temporarily hide this slide without deleting it',
    },
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
      media: 'image',
      active: 'active',
    },
    prepare({ title, order, media, active }: any) {
      return {
        title: `${order ? `#${order} ` : ''}${title}`,
        subtitle: active ? '✓ Active slide' : '⏸ Inactive (Hidden)',
        media,
      };
    },
  },
};
