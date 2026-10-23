/**
 * Sanity Schema: Property Details & Amenities
 * Controls room breakdown, capacity, key features, and highlights for each cottage.
 */
export const propertyDetailsSchema = {
  name: 'propertyDetails',
  title: 'Cottage Features & Amenities (Manylion y Bythynnod)',
  type: 'document',
  fields: [
    {
      name: 'propertyId',
      title: 'Property / Eiddo',
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
      title: 'Enw’r Eiddo (Cymraeg)',
      type: 'string',
    },
    {
      name: 'taglineEn',
      title: 'Tagline / Slogan (English)',
      type: 'string',
      description: 'e.g. "Cozy 5-Star Cottage with Amazing Views"',
    },
    {
      name: 'taglineCy',
      title: 'Llinell Tag (Cymraeg)',
      type: 'string',
      description: 'e.g. "Bwthyn Clyd 5-Seren gyda Golygfeydd Rhyfeddol"',
    },
    {
      name: 'sleeps',
      title: 'Maximum Guests / Cwsg',
      type: 'number',
      initialValue: 4,
    },
    {
      name: 'bedrooms',
      title: 'Bedrooms / Ystafelloedd Gwely',
      type: 'number',
      initialValue: 2,
    },
    {
      name: 'bathrooms',
      title: 'Bathrooms / Ystafelloedd Ymolchi',
      type: 'number',
      initialValue: 1,
    },
    {
      name: 'petFriendly',
      title: 'Pet Friendly / Cyfeillgar i Gwn',
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
      title: 'Disgrifiad Byr (Cymraeg)',
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
      title: 'Stori a Hanes Llawn (Cymraeg)',
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
      title: 'Pwyntiau Allweddol (Cymraeg)',
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
