/**
 * Sanity Schema: Snowdon Mountain Path / Walking Route
 * Allows adding and editing Snowdonia hiking routes shown on the Local Area page.
 */
export const snowdonPathSchema = {
  name: 'snowdonPath',
  title: 'Snowdon Paths & Walks (Lwybrau’r Wyddfa)',
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
      title: 'Enw’r Llwybr (Cymraeg)',
      type: 'string',
      description: 'e.g. "Llwybr y PYG", "Llwybr Watkin", "Llwybr Ceidwad yr Wyddfa"',
    },
    {
      name: 'distance',
      title: 'Distance / Pellter',
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
      title: 'Man Cychwyn (Cymraeg)',
      type: 'string',
      description: 'e.g. "Maes parcio Hostel Ieuenctid Pen-y-Pass"',
    },
    {
      name: 'difficulty',
      title: 'Difficulty Level / Graddfa Anhawster',
      type: 'string',
      options: {
        list: [
          { title: 'Gentle / Hawdd', value: 'Gentle' },
          { title: 'Moderate / Cymedrol', value: 'Moderate' },
          { title: 'Demanding / Caled', value: 'Demanding' },
          { title: 'Hard & Strenuous / Hynod Galetach', value: 'Hard' },
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
      title: 'Disgrifiad (Cymraeg)',
      type: 'text',
      rows: 4,
    },
    {
      name: 'order',
      title: 'Display Order / Trefn',
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
