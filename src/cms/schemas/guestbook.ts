/**
 * Sanity Schema: Handwritten Guestbook Comment / Note (Llyfr Gwesteion)
 * Enables viewing, uploading, cropping, and editing the handwritten guestbook
 * clipping images and their transcripts in Sanity Studio.
 */
export const guestbookSchema = {
  name: 'guestbookEntry',
  title: 'Handwritten Guestbook Archive (Llyfr Gwesteion)',
  type: 'document',
  fields: [
    {
      name: 'photo',
      title: 'Guestbook Clipping Image / Llun y Sylw Llawysgrif',
      type: 'image',
      description:
        'Upload or view the photograph/scan of the handwritten guestbook page from Plas Hafod or Bryn Bugeiliaid Bach.',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'property',
      title: 'Property / Eiddo',
      type: 'string',
      options: {
        list: [
          { title: 'Plas Hafod Cottage (Bwthyn Plas Hafod)', value: 'plas-hafod' },
          { title: 'Bryn Bugeiliaid Bach (Annexe)', value: 'bryn-bugeiliaid-bach' },
        ],
        layout: 'radio',
      },
      initialValue: 'plas-hafod',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Guest Name(s) / Enw(au) y Gwesteion (Optional)',
      type: 'string',
      description: 'Optional. Leave blank to let the handwritten note speak for itself.',
      validation: (Rule: any) => Rule.optional(),
    },
    {
      name: 'stayDate',
      title: 'Stay Date / Month & Year (Dyddiad Arhosiad)',
      type: 'string',
      description: 'e.g. "August 2026", "October 2026", "Autumn 2026"',
    },
    {
      name: 'location',
      title: 'Guest Origin / Location (Tarddiad y Gwestai)',
      type: 'string',
      description: 'e.g. "Cardiff", "Bristol", "London", "Aberystwyth"',
    },
    {
      name: 'rating',
      title: 'Star Rating (1-5)',
      type: 'number',
      initialValue: 5,
      validation: (Rule: any) => Rule.min(1).max(5),
    },
    {
      name: 'reviewTextEn',
      title: 'Transcription / Handwritten Note Content (English)',
      type: 'text',
      rows: 4,
      description: 'Optional text transcription of the handwritten note for accessibility and search.',
    },
    {
      name: 'reviewTextCy',
      title: 'Trawsgrifiad / Cynnwys y Sylw Llawysgrif (Cymraeg)',
      type: 'text',
      rows: 4,
    },
    {
      name: 'order',
      title: 'Display Order / Trefn',
      type: 'number',
      description: 'Controls the display order on the website (1, 2, 3...)',
      initialValue: 1,
    },
    {
      name: 'isFeatured',
      title: 'Feature on Homepage (Dangos ar yr Hafan)',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'author',
      property: 'property',
      order: 'order',
      subtitle: 'stayDate',
      media: 'photo',
    },
    prepare({ title, property, order, subtitle, media }: any) {
      const propLabel =
        property === 'bryn-bugeiliaid-bach' ? '🌿 Bryn Bugeiliaid Bach' : '🏡 Plas Hafod';
      const numLabel = order ? `Note #${order}` : 'Note';
      return {
        title: title ? `${propLabel} - ${title}` : `${propLabel} ${numLabel}`,
        subtitle: subtitle || 'Authentic handwritten note',
        media,
      };
    },
  },
};
