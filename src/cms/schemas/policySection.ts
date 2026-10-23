/**
 * Sanity Schema: Policy & Terms Section
 * Enables editing terms, payment rules, cancellation policies, and dog guidelines.
 */
export const policySectionSchema = {
  name: 'policySection',
  title: 'Terms & Policies (Telerau ac Amodau)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title (English)',
      type: 'string',
      description: 'e.g. "1. Contract & Payment Schedule" or "2. Cancellation Policy"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'titleCy',
      title: 'Teitl yr Adran (Cymraeg)',
      type: 'string',
      description: 'e.g. "1. Cytundeb ac Amserlen Dalu"',
    },
    {
      name: 'icon',
      title: 'Section Icon Style',
      type: 'string',
      options: {
        list: [
          { title: 'Shield / Contract', value: 'shield' },
          { title: 'Alert / Cancellation', value: 'alert' },
          { title: 'Dog / Pets', value: 'dog' },
          { title: 'Clock / Times', value: 'clock' },
          { title: 'Sparkles / Cleaning', value: 'sparkles' },
          { title: 'Document / General', value: 'file' },
        ],
      },
      initialValue: 'shield',
    },
    {
      name: 'leadParagraphEn',
      title: 'Lead Summary Paragraph (English)',
      type: 'text',
      rows: 3,
    },
    {
      name: 'leadParagraphCy',
      title: 'Crynodeb Arweiniol (Cymraeg)',
      type: 'text',
      rows: 3,
    },
    {
      name: 'bulletsEn',
      title: 'Bullet Points / Clauses (English)',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'bulletsCy',
      title: 'Pwyntiau / Cymalau (Cymraeg)',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'order',
      title: 'Display Order / Trefn',
      type: 'number',
      initialValue: 1,
    },
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
    },
    prepare({ title, order }: any) {
      return {
        title: `${order ? `#${order} ` : ''}${title}`,
        subtitle: 'Terms Clause',
      };
    },
  },
};
