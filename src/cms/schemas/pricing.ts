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
            { name: 'startDate', title: 'Start Date', type: 'date', validation: (Rule: any) => Rule.required() },
            { name: 'endDate', title: 'End Date', type: 'date', validation: (Rule: any) => Rule.required() },
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
              return {
                title: `${title} (£${rate}/night)`,
                subtitle: `${start} → ${end}`,
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
            { name: 'validFrom', title: 'Valid From (Optional)', type: 'date' },
            { name: 'validTo', title: 'Valid Until (Optional)', type: 'date' },
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
};
