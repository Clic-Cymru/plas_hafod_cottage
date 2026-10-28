/**
 * Sanity Schema: Season
 * Global seasonal calendar periods applicable across all cottages.
 */
export const seasonSchema = {
  name: 'season',
  title: 'Season',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Season Name',
      type: 'string',
      description: 'e.g. Summer Peak 2026, Autumn Gold 2026, Festive Season (Christmas & New Year)',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Identifier / Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'startDate',
      title: 'Start Date (dd/mm/yyyy)',
      type: 'date',
      options: {
        dateFormat: 'DD/MM/YYYY',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'endDate',
      title: 'End Date (dd/mm/yyyy)',
      type: 'date',
      options: {
        dateFormat: 'DD/MM/YYYY',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'minStayDefault',
      title: 'Default Minimum Stay (Nights)',
      type: 'number',
      initialValue: 3,
      description: 'Default minimum stay required during this season across cottages.',
    },
    {
      name: 'description',
      title: 'Internal Notes',
      type: 'text',
      rows: 2,
    },
  ],
  orderings: [
    {
      title: 'Start Date, Earliest First',
      name: 'startDateAsc',
      by: [{ field: 'startDate', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      start: 'startDate',
      end: 'endDate',
    },
    prepare({ title, start, end }: any) {
      const formatUk = (d: string) => {
        if (!d) return '';
        const m = String(d).match(/^(\d{4})-(\d{2})-(\d{2})/);
        return m ? `${m[3]}/${m[2]}/${m[1]}` : d;
      };
      return {
        title: title || 'Unnamed Season',
        subtitle: `${formatUk(start)} → ${formatUk(end)}`,
      };
    },
  },
};
