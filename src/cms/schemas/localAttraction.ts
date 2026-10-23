/**
 * Sanity Schema: Local Attraction & Area Card
 * Enables the client to update, add, reorder, and upload photos for attractions on the Local Area page in Sanity Studio.
 */
export const localAttractionSchema = {
  name: 'localAttraction',
  title: 'Local Attractions (Local Area)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Attraction Title (English)',
      type: 'string',
      description: 'e.g. "Sygun Copper Mine, Near Beddgelert" or "Caernarfon Castle"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'titleCy',
      title: 'Teitl (Cymraeg / Welsh)',
      type: 'string',
      description: 'Welsh title translation',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'category',
      title: 'Category / Badge (English)',
      type: 'string',
      description: 'e.g. "Heritage & Cave Tour", "UNESCO World Heritage", "Steam Heritage Railway"',
      options: {
        list: [
          { title: 'Heritage & Cave Tour', value: 'Heritage & Cave Tour' },
          { title: 'UNESCO World Heritage', value: 'UNESCO World Heritage' },
          { title: 'National Museum', value: 'National Museum' },
          { title: 'National Trust Garden', value: 'National Trust Garden' },
          { title: 'Country Park & Walks', value: 'Country Park & Walks' },
          { title: 'Adventure Boat Tour', value: 'Adventure Boat Tour' },
          { title: 'Local Vineyard & Cafe', value: 'Local Vineyard & Cafe' },
          { title: 'Italianate Coastal Village', value: 'Italianate Coastal Village' },
          { title: 'Mountain Safety', value: 'Mountain Safety' },
          { title: 'Steam Heritage Railway', value: 'Steam Heritage Railway' },
          { title: 'Historic Parkland', value: 'Historic Parkland' },
          { title: 'Aviation & Coast', value: 'Aviation & Coast' },
          { title: 'Mountain Railway', value: 'Mountain Railway' },
          { title: 'Official Tourism Guide', value: 'Official Tourism Guide' },
          { title: 'National Park', value: 'National Park' },
          { title: 'Local Craft Brewery', value: 'Local Craft Brewery' },
        ],
      },
    },
    {
      name: 'categoryCy',
      title: 'Categori (Cymraeg)',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Card Image / Photo',
      type: 'image',
      description: 'Upload a photo for this attraction card. Hotspot enabled for responsive cropping.',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'customImageUrl',
      title: 'Custom Image URL / Path (Fallback)',
      type: 'string',
      description: 'e.g. "/images/wp/local-area/caernarfon-castle.jpg" or external image URL',
    },
    {
      name: 'description',
      title: 'Description (English)',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'descriptionCy',
      title: 'Disgrifiad (Cymraeg / Welsh)',
      type: 'text',
      rows: 4,
    },
    {
      name: 'url',
      title: 'Website / Booking URL',
      type: 'url',
      description: 'Official website address for visitors to learn more',
      validation: (Rule: any) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    },
    {
      name: 'distance',
      title: 'Distance / Drive Time from Plas Hafod',
      type: 'string',
      description: 'e.g. "15 mins drive" or "5 miles"',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Card order on the page (1 = first, 2 = second, etc.)',
      initialValue: 10,
    },
    {
      name: 'featured',
      title: 'Featured Attraction',
      type: 'boolean',
      description: 'Mark this card as featured with a highlighted badge',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
};
