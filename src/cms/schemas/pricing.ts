/**
 * Sanity / Headless CMS Schema: Pricing Configuration
 * Manages Base Rate, Seasonal Multipliers/Rates, and Discount Rules.
 */
export const pricingSchema = {
  name: 'pricingConfig',
  title: 'Pricing Engine & Rates',
  type: 'document',
  fields: [
    {
      name: 'propertyId',
      title: 'Property / Cottage',
      type: 'string',
      options: {
        list: [
          { title: 'Plas Hafod Cottage (Main House)', value: 'plas-hafod' },
          { title: 'Bryn Bugeiliaid Bach (Annexe)', value: 'bryn-bugeiliaid-bach' },
        ],
        layout: 'radio',
      },
      initialValue: 'plas-hafod',
      validation: (Rule: any) => Rule.required(),
      description: 'Select which cottage this pricing configuration applies to.',
    },
    {
      name: 'baseRate',
      title: 'Standard Nightly Base Rate (£)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(50).positive(),
      description: 'Default price per night when no specific seasonal rate applies.',
    },
    {
      name: 'depositPercentage',
      title: 'Required Deposit Percentage (%)',
      type: 'number',
      initialValue: 25,
      validation: (Rule: any) => Rule.required().min(0).max(100),
      description: 'Percentage of total booking required as initial deposit to secure dates.',
    },
    {
      name: 'cleaningFee',
      title: 'Cleaning Fee (£)',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'seasons',
      title: 'Seasons & Peak Periods',
      type: 'array',
      description: 'Define specific date ranges with custom nightly rates and minimum stay rules.',
      of: [
        {
          type: 'object',
          name: 'season',
          title: 'Season Period',
          fields: [
            { name: 'name', title: 'Season Name (e.g. Summer Peak, Christmas / New Year)', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'startDate', title: 'Start Date (dd/mm/yyyy)', type: 'date', options: { dateFormat: 'DD/MM/YYYY' }, validation: (Rule: any) => Rule.required() },
            { name: 'endDate', title: 'End Date (dd/mm/yyyy)', type: 'date', options: { dateFormat: 'DD/MM/YYYY' }, validation: (Rule: any) => Rule.required() },
            { name: 'nightlyRate', title: 'Nightly Rate (£)', type: 'number', validation: (Rule: any) => Rule.required().positive() },
            { name: 'minStay', title: 'Minimum Stay (Nights)', type: 'number', initialValue: 3, validation: (Rule: any) => Rule.required().min(1) },
          ],
          preview: {
            select: {
              title: 'name',
              start: 'startDate',
              end: 'endDate',
              rate: 'nightlyRate',
            },
            prepare({ title, start, end, rate }: any) {
              const formatUk = (d: string) => {
                if (!d) return '';
                const m = String(d).match(/^(\d{4})-(\d{2})-(\d{2})/);
                return m ? `${m[3]}/${m[2]}/${m[1]}` : d;
              };
              return {
                title: `${title} (£${rate}/night)`,
                subtitle: `${formatUk(start)} → ${formatUk(end)}`,
              };
            },
          },
        },
      ],
    },
    {
      name: 'discounts',
      title: 'Discounts & Special Offers',
      type: 'array',
      description: 'Promotional discounts (e.g. 7+ nights weekly discount, low-season specials).',
      of: [
        {
          type: 'object',
          name: 'discount',
          title: 'Discount Rule',
          fields: [
            { name: 'name', title: 'Offer Title', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'code', title: 'Promo Code (Optional)', type: 'string' },
            { name: 'minNights', title: 'Trigger: Minimum Nights Stayed', type: 'number', initialValue: 7 },
            { name: 'validFrom', title: 'Valid From (dd/mm/yyyy)', type: 'date', options: { dateFormat: 'DD/MM/YYYY' } },
            { name: 'validTo', title: 'Valid Until (dd/mm/yyyy)', type: 'date', options: { dateFormat: 'DD/MM/YYYY' } },
            {
              name: 'discountType',
              title: 'Discount Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Percentage Off (%)', value: 'percentage' },
                  { title: 'Fixed Amount (£)', value: 'fixed' },
                ],
                layout: 'radio',
              },
              initialValue: 'percentage',
            },
            { name: 'value', title: 'Discount Value (% or £)', type: 'number', validation: (Rule: any) => Rule.required().positive() },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      propertyId: 'propertyId',
      baseRate: 'baseRate',
    },
    prepare({ propertyId, baseRate }: any) {
      const name =
        propertyId === 'bryn-bugeiliaid-bach'
          ? 'Bryn Bugeiliaid Bach (Annexe)'
          : 'Plas Hafod Cottage (Main)';
      return {
        title: name,
        subtitle: `Standard Rate: £${baseRate || 0} / night`,
      };
    },
  },
};
