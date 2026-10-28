/**
 * Sanity Schema: Special Offer & Discount
 * Manages promotional offers, weekly stay discounts, and seasonal deals.
 */
export const specialOfferSchema = {
  name: 'specialOffer',
  title: 'Special Offer / Discount',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Offer Title',
      type: 'string',
      description: 'e.g. Full Week Retreat (7+ Nights), Winter Midweek Special',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'code',
      title: 'Promo Code (Optional)',
      type: 'string',
      description: 'Optional coupon code entered by guests during checkout.',
    },
    {
      name: 'propertyId',
      title: 'Applicable Cottage',
      type: 'string',
      options: {
        list: [
          { title: 'Both Cottages', value: 'both' },
          { title: 'Plas Hafod Cottage', value: 'plas-hafod' },
          { title: 'Bryn Bugeiliaid Bach', value: 'bryn-bugeiliaid-bach' },
        ],
        layout: 'radio',
      },
      initialValue: 'both',
    },
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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'value',
      title: 'Discount Value (% or £)',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: 'minNights',
      title: 'Trigger: Minimum Nights Stayed',
      type: 'number',
      initialValue: 7,
      description: 'Automatically applies when booking duration is at least this many nights.',
    },
    {
      name: 'validFrom',
      title: 'Valid From (dd/mm/yyyy)',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
    },
    {
      name: 'validTo',
      title: 'Valid Until (dd/mm/yyyy)',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
    },
    {
      name: 'active',
      title: 'Active Offer',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to temporarily pause this offer without deleting it.',
    },
    {
      name: 'description',
      title: 'Offer Description / Terms',
      type: 'text',
      rows: 2,
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'discountType',
      value: 'value',
      propertyId: 'propertyId',
      minNights: 'minNights',
      active: 'active',
    },
    prepare({ title, type, value, propertyId, minNights, active }: any) {
      const propBadge =
        propertyId === 'bryn-bugeiliaid-bach'
          ? '[BBB]'
          : propertyId === 'plas-hafod'
          ? '[Plas Hafod]'
          : '[Both]';
      const valLabel = type === 'fixed' ? `£${value} off` : `${value}% off`;
      const nightsLabel = minNights ? `(${minNights}+ nights)` : '';
      const statusIcon = active === false ? '⏸ Inactive' : '✓ Active';
      return {
        title: `${propBadge} ${title || 'Special Offer'}`,
        subtitle: `${valLabel} ${nightsLabel} • ${statusIcon}`,
      };
    },
  },
};
