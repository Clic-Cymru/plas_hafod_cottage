/**
 * Sanity Schema: Snowdon Mountain Path / Walking Route
 * Allows adding and editing Snowdonia hiking routes shown on the Local Area page.
 */
export const snowdonPathSchema = {
  name: 'snowdonPath',
  title: 'Snowdon Path / Trail',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Path Name (English)',
      type: 'string',
      description: 'e.g. "PYG Track", "Watkin Path", "Snowdon Ranger Path"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'nameCy',
      title: 'Path Name (Welsh)',
      type: 'string',
      description: 'Welsh translation placeholder for path name',
    },
    {
      name: 'distance',
      title: 'Distance',
      type: 'string',
      description: 'e.g. "3.25 miles each way"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'start',
      title: 'Starting Point (English)',
      type: 'string',
      description: 'e.g. "Pen-y-Pass Youth Hostel car park"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'startCy',
      title: 'Starting Point (Welsh)',
      type: 'string',
      description: 'Welsh translation placeholder for starting point',
    },
    {
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Gentle', value: 'Gentle' },
          { title: 'Moderate', value: 'Moderate' },
          { title: 'Demanding', value: 'Demanding' },
          { title: 'Hard & Strenuous', value: 'Hard' },
        ],
      },
      initialValue: 'Moderate',
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
      title: 'Description (Welsh)',
      type: 'text',
      rows: 4,
      description: 'Welsh translation placeholder for description',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 10,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'distance',
      difficulty: 'difficulty',
    },
    prepare({ title, subtitle, difficulty }: any) {
      return {
        title,
        subtitle: `${subtitle || ''} · ${difficulty || 'Moderate'}`,
      };
    },
  },
};
