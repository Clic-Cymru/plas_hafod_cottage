/**
 * Sanity Schema: Pricing Configuration & Rates
 * Manages standard nightly base rates, seasonal rate overrides, deposit %, and fees.
 */
export const pricingSchema = {
  name: 'pricingConfig',
  title: 'Pricing Engine & Rates',
  type: 'document',
  fields: [
    {
      name: 'propertyId',
      title: 'Cottage',
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
      description: 'Select which cottage this rate configuration applies to.',
    },
    {
      name: 'baseRate',
      title: 'Standard Midweek / Base Rate (£)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(50).positive(),
      description: 'Default price per night (Sun–Thu) when no specific seasonal rate applies.',
    },
    {
      name: 'weekendBaseRate',
      title: 'Standard Weekend Base Rate — Fri & Sat (£)',
      type: 'number',
      validation: (Rule: any) => Rule.min(50).positive(),
      description: 'Optional default Friday & Saturday price per night when no specific seasonal rate applies.',
    },
    {
      name: 'minStayDefault',
      title: 'Standard Minimum Stay (Nights)',
      type: 'number',
      initialValue: 2,
      validation: (Rule: any) => Rule.required().min(1),
      description: 'Default minimum booking nights when no season override applies.',
    },
    {
      name: 'depositType',
      title: 'Deposit Calculation Mode',
      type: 'string',
      options: {
        list: [
          { title: 'Fixed Amount (£) [e.g. £200 flat deposit]', value: 'fixed' },
          { title: 'Percentage of Total (%) [e.g. 25% of stay]', value: 'percentage' },
        ],
        layout: 'radio',
      },
      initialValue: 'fixed',
      validation: (Rule: any) => Rule.required(),
      description: 'Choose whether the booking deposit required to secure dates is a fixed sum (default: £200) or a percentage of the total stay price.',
    },
    {
      name: 'fixedDepositAmount',
      title: 'Fixed Deposit Amount (£)',
      type: 'number',
      initialValue: 200,
      validation: (Rule: any) => Rule.min(0),
      description: 'The fixed deposit amount in GBP required to secure a reservation when Fixed mode is selected (default: £200).',
    },
    {
      name: 'depositPercentage',
      title: 'Required Deposit Percentage (%)',
      type: 'number',
      initialValue: 25,
      validation: (Rule: any) => Rule.required().min(0).max(100),
      description: 'Percentage of total booking required as initial deposit when Percentage mode is selected (default: 25%).',
    },
    {
      name: 'cleaningFee',
      title: 'Cleaning Fee (£)',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'petFee',
      title: 'Pet Fee — 1 Dog (£)',
      type: 'number',
      initialValue: 40,
      description: 'Surcharge per stay for guests bringing 1 dog (default: £40).',
    },
    {
      name: 'petFee2Dogs',
      title: 'Pet Fee — 2 Dogs (£)',
      type: 'number',
      initialValue: 55,
      description: 'Total surcharge per stay for guests bringing 2 dogs (default: £55).',
    },
    {
      name: 'seasonalRates',
      title: 'Seasonal Rates & Peak Periods',
      type: 'array',
      description: 'Select seasons from the shared Seasons directory and specify this cottage’s nightly rate and minimum stay.',
      of: [
        {
          type: 'object',
          name: 'seasonalRate',
          title: 'Seasonal Rate Override',
          fields: [
            {
              name: 'season',
              title: 'Season',
              type: 'reference',
              to: [{ type: 'season' }],
              validation: (Rule: any) => Rule.required(),
              description: 'Select the season from the global Seasons list.',
            },
            {
              name: 'nightlyRate',
              title: 'Nightly Rate / Midweek Rate (£)',
              type: 'number',
              validation: (Rule: any) => Rule.required().positive(),
              description: 'Standard nightly rate for this season (or Sun–Thu midweek rate if a Weekend Rate is also set).',
            },
            {
              name: 'weekendRate',
              title: 'Weekend Nightly Rate — Fri & Sat (£) (Optional)',
              type: 'number',
              validation: (Rule: any) => Rule.positive(),
              description: 'Optional Friday & Saturday rate (£) for this season. Leave blank if the same nightly rate applies all week.',
            },
            {
              name: 'minStay',
              title: 'Minimum Stay (Nights)',
              type: 'number',
              initialValue: 3,
              validation: (Rule: any) => Rule.required().min(1),
            },
            {
              name: 'notes',
              title: 'Notes (Optional)',
              type: 'string',
            },
          ],
          preview: {
            select: {
              seasonName: 'season.name',
              start: 'season.startDate',
              end: 'season.endDate',
              rate: 'nightlyRate',
              weekendRate: 'weekendRate',
              minStay: 'minStay',
            },
            prepare({ seasonName, start, end, rate, weekendRate, minStay }: any) {
              const formatUk = (d: string) => {
                if (!d) return '';
                const m = String(d).match(/^(\d{4})-(\d{2})-(\d{2})/);
                return m ? `${m[3]}/${m[2]}/${m[1]}` : d;
              };
              const dateRange = start && end ? `${formatUk(start)} → ${formatUk(end)}` : 'Dates pending';
              const rateLabel = weekendRate && weekendRate !== rate
                ? `£${rate || 0} midweek / £${weekendRate} weekend`
                : `£${rate || 0}/night`;
              return {
                title: `${seasonName || 'Season'}: ${rateLabel}`,
                subtitle: `${dateRange} • Min stay: ${minStay || 1} nights`,
              };
            },
          },
        },
      ],
    },
    {
      name: 'seasons',
      title: 'Legacy Embedded Seasons',
      type: 'array',
      hidden: true,
      of: [
        {
          type: 'object',
          name: 'season',
          fields: [
            { name: 'name', type: 'string' },
            { name: 'startDate', type: 'date' },
            { name: 'endDate', type: 'date' },
            { name: 'nightlyRate', type: 'number' },
            { name: 'minStay', type: 'number' },
          ],
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
      depositType: 'depositType',
      fixedDepositAmount: 'fixedDepositAmount',
      depositPercentage: 'depositPercentage',
    },
    prepare({ propertyId, baseRate, depositType, fixedDepositAmount, depositPercentage }: any) {
      const name =
        propertyId === 'bryn-bugeiliaid-bach'
          ? 'Bryn Bugeiliaid Bach (Annexe)'
          : 'Plas Hafod Cottage (Main)';
      const depLabel =
        depositType === 'percentage'
          ? `${depositPercentage || 25}% deposit`
          : `£${fixedDepositAmount ?? 200} fixed deposit`;
      return {
        title: `${name} Rates`,
        subtitle: `Base: £${baseRate || 0}/night • ${depLabel}`,
      };
    },
  },
};
