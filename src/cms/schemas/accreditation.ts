/**
 * Sanity Schema: Accreditation & Award
 * Enables the client to manage, add, edit, reorder, and upload certificates/awards
 * for Plas Hafod Cottage and Bryn Bugeiliaid Bach on the Studio backend.
 */
export const accreditationSchema = {
  name: 'accreditation',
  title: 'Accreditations & Awards',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Award / Accreditation Title (English)',
      type: 'string',
      description: 'e.g. "Traveller Review Award 2026", "Visit Wales 5-Star Grading", "Airbnb Superhost"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'titleCy',
      title: 'Award / Accreditation Title (Welsh)',
      type: 'string',
      description: 'Welsh translation placeholder for award title',
    },
    {
      name: 'source',
      title: 'Issuing Organization / Source',
      type: 'string',
      description: 'e.g. "Booking.com", "Visit Wales / Croeso Cymru", "Snowdonia National Park Authority", "Airbnb", "Welsh Hospitality Awards"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'badge',
      title: 'Badge Ribbon Text',
      type: 'string',
      description: 'Short tag shown at the top of the card e.g. "2026 Winner", "Official 5-Star", "Copa Gold Award", "Top-Rated Host"',
    },
    {
      name: 'badgeColor',
      title: 'Badge Color Theme',
      type: 'string',
      description: 'Select the color aesthetic for the top badge pill',
      options: {
        list: [
          { title: 'Gold / Yellow (Visit Wales / Copa Gold)', value: 'bg-[#efda07] text-stone-900' },
          { title: 'Blue (Booking.com)', value: 'bg-blue-600 text-white' },
          { title: 'Emerald Green (Eryri Ambassador)', value: 'bg-emerald-600 text-white' },
          { title: 'Coral Red (Airbnb Superhost)', value: 'bg-[#FF5A5F] text-white' },
          { title: 'Dark Stone (Best of North Wales)', value: 'bg-stone-800 text-white' },
          { title: 'Lavender / Slate Blue (Hospitality Finalist)', value: 'bg-[#99A0C1] text-white' },
          { title: 'Warm Amber (Welcome Charters)', value: 'bg-amber-600 text-white' },
          { title: 'Silver / Slate (Gwynedd Ambassador)', value: 'bg-slate-500 text-white' },
        ],
      },
      initialValue: 'bg-[#efda07] text-stone-900',
    },
    {
      name: 'score',
      title: 'Rating / Score Highlight (English)',
      type: 'string',
      description: 'e.g. "10 / 10 Exceptional Score", "4.95+ Star Rating", "Official 5-Star Luxury Standard"',
    },
    {
      name: 'scoreCy',
      title: 'Rating / Score Highlight (Welsh)',
      type: 'string',
      description: 'Welsh translation placeholder for rating e.g. "10 / 10 Sgôr Eithriadol"',
    },
    {
      name: 'description',
      title: 'Description (English)',
      type: 'text',
      rows: 3,
      description: 'Detailed description of the award, certification standard, or guest feedback',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'descriptionCy',
      title: 'Description (Welsh)',
      type: 'text',
      rows: 3,
      description: 'Welsh translation placeholder for award description',
    },
    {
      name: 'image',
      title: 'Award Certificate / Logo / Badge Image',
      type: 'image',
      description: 'Upload the official award certificate or logo badge. Hotspot enabled for optimal cropping.',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'customImageUrl',
      title: 'Custom Image Path / Fallback URL',
      type: 'string',
      description: 'e.g. "/images/wp/award-booking-2026.png" or external image URL',
    },
    {
      name: 'property',
      title: 'Display On Property',
      type: 'string',
      description: 'Choose which property pages should display this award',
      options: {
        list: [
          { title: 'Both Properties (Plas Hafod & Bryn Bugeiliaid Bach)', value: 'both' },
          { title: 'Plas Hafod (Homepage Only)', value: 'plas-hafod' },
          { title: 'Bryn Bugeiliaid Bach Only', value: 'bryn-bugeiliaid-bach' },
        ],
      },
      initialValue: 'plas-hafod',
    },
    {
      name: 'year',
      title: 'Year / Validity Period',
      type: 'string',
      description: 'e.g. "2026", "2025/2026"',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Cards are displayed in ascending order (1, 2, 3...)',
      initialValue: 1,
    },
    {
      name: 'featured',
      title: 'Active / Visible',
      type: 'boolean',
      description: 'Toggle off to temporarily hide an outdated award without deleting it',
      initialValue: true,
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Year (Newest First)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'source',
      badge: 'badge',
      property: 'property',
      order: 'order',
      media: 'image',
    },
    prepare({ title, subtitle, badge, property, order, media }: any) {
      const propLabel =
        property === 'plas-hafod'
          ? 'Plas Hafod'
          : property === 'bryn-bugeiliaid-bach'
          ? 'Bryn Bugeiliaid Bach'
          : 'Both Properties';
      const orderPrefix = order !== undefined && order !== null ? `#${order} ` : '';
      return {
        title: `${orderPrefix}${title || 'Untitled Award'}`,
        subtitle: `${subtitle || 'Award'} • [${propLabel}] ${badge ? `(${badge})` : ''}`,
        media,
      };
    },
  },
};
