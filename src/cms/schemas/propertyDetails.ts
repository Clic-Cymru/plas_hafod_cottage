/**
 * Sanity Schema: Property Details & Amenities
 * Controls room breakdown, capacity, key features, and highlights for each cottage.
 */
export const propertyDetailsSchema = {
  name: 'propertyDetails',
  title: 'Cottage Features & Amenities',
  type: 'document',
  fields: [
    {
      name: 'propertyId',
      title: 'Cottage',
      type: 'string',
      options: {
        list: [
          { title: 'Plas Hafod Cottage (Main Cottage)', value: 'plas-hafod' },
          { title: 'Bryn Bugeiliaid Bach (Annexe)', value: 'bryn-bugeiliaid-bach' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'nameEn',
      title: 'Property Name (English)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'nameCy',
      title: 'Property Name (Welsh)',
      type: 'string',
    },
    {
      name: 'taglineEn',
      title: 'Tagline (English)',
      type: 'string',
      description: 'e.g. "Cozy 5-Star Cottage with Amazing Views"',
    },
    {
      name: 'taglineCy',
      title: 'Tagline (Welsh)',
      type: 'string',
      description: 'e.g. "Bwthyn Clyd 5-Seren gyda Golygfeydd Rhyfeddol"',
    },
    {
      name: 'sleeps',
      title: 'Maximum Guests',
      type: 'number',
      initialValue: 4,
    },
    {
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
      initialValue: 2,
    },
    {
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number',
      initialValue: 1,
    },
    {
      name: 'petFriendly',
      title: 'Pet Friendly',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'shortDescriptionEn',
      title: 'Short Description (English)',
      type: 'text',
      rows: 3,
    },
    {
      name: 'shortDescriptionCy',
      title: 'Short Description (Welsh)',
      type: 'text',
      rows: 3,
    },
    {
      name: 'fullStoryEn',
      title: 'Full Story & History (English)',
      type: 'text',
      rows: 6,
    },
    {
      name: 'fullStoryCy',
      title: 'Full Story & History (Welsh)',
      type: 'text',
      rows: 6,
    },
    {
      name: 'featuresEn',
      title: 'Key Feature Bullets (English)',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'featuresCy',
      title: 'Key Feature Bullets (Welsh)',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'galleryImages',
      title: 'Property Photo Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Caption / Alt Text',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'nameEn',
      propertyId: 'propertyId',
      sleeps: 'sleeps',
      bedrooms: 'bedrooms',
    },
    prepare({ title, propertyId, sleeps, bedrooms }: any) {
      return {
        title: title || (propertyId === 'bryn-bugeiliaid-bach' ? 'Bryn Bugeiliaid Bach' : 'Plas Hafod Cottage'),
        subtitle: `Sleeps ${sleeps || 2} · ${bedrooms || 1} Bed · ID: ${propertyId}`,
      };
    },
  },
};
