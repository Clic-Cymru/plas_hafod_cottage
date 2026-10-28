import { DepositRequestComponent } from '../studio/DepositRequestComponent';

/**
 * Sanity Schema: Booking Inquiries (Booking Inbox)
 * Where guest reservation submissions are stored and managed.
 */
export const bookingInquirySchema = {
  name: 'bookingInquiry',
  title: 'Booking Inquiry',
  type: 'document',
  fields: [
    {
      name: 'depositWorkflow',
      title: 'Deposit Request & BACS Payment Dispatcher',
      type: 'string',
      components: {
        input: DepositRequestComponent,
      },
    },
    {
      name: 'propertyId',
      title: 'Cottage',
      type: 'string',
      options: {
        list: [
          { title: 'Plas Hafod Cottage (Main)', value: 'plas-hafod' },
          { title: 'Bryn Bugeiliaid Bach (Annexe)', value: 'bryn-bugeiliaid-bach' },
        ],
        layout: 'radio',
      },
      initialValue: 'plas-hafod',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: '⏳ Pending Review', value: 'pending' },
          { title: '✉️ Deposit Requested / Provisional Hold', value: 'deposit_requested' },
          { title: '✅ Confirmed / Deposit Paid', value: 'confirmed' },
          { title: '❌ Declined / Cancelled', value: 'declined' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
    },
    {
      name: 'guestName',
      title: 'Guest Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'guestEmail',
      title: 'Email Address',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'guestPhone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'checkIn',
      title: 'Check-in Date (dd/mm/yyyy)',
      type: 'date',
      options: {
        dateFormat: 'DD/MM/YYYY',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'checkOut',
      title: 'Check-out Date (dd/mm/yyyy)',
      type: 'date',
      options: {
        dateFormat: 'DD/MM/YYYY',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'totalNights',
      title: 'Total Nights',
      type: 'number',
    },
    {
      name: 'adults',
      title: 'Adults',
      type: 'number',
      initialValue: 2,
    },
    {
      name: 'children',
      title: 'Children',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'pets',
      title: 'Pets',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'subtotal',
      title: 'Subtotal (£)',
      type: 'number',
    },
    {
      name: 'discountAmount',
      title: 'Discount Amount (£)',
      type: 'number',
    },
    {
      name: 'appliedDiscountName',
      title: 'Applied Offer / Discount',
      type: 'string',
    },
    {
      name: 'calculatedTotal',
      title: 'Calculated Total Amount (£)',
      type: 'number',
    },
    {
      name: 'totalPrice',
      title: 'Total Price (£)',
      type: 'number',
      hidden: true,
    },
    {
      name: 'depositAmount',
      title: 'Deposit Required (£)',
      type: 'number',
    },
    {
      name: 'balanceDue',
      title: 'Remaining Balance (£)',
      type: 'number',
    },
    {
      name: 'nightlyBreakdown',
      title: 'Nightly Rate Breakdown',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'nightRate',
          fields: [
            { name: 'date', title: 'Date', type: 'string' },
            { name: 'rate', title: 'Nightly Rate (£)', type: 'number' },
            { name: 'seasonName', title: 'Tariff / Season Name', type: 'string' },
          ],
          preview: {
            select: { date: 'date', rate: 'rate', season: 'seasonName' },
            prepare({ date, rate, season }: any) {
              const formatUk = (d: string) => {
                if (!d) return '';
                const m = String(d).match(/^(\d{4})-(\d{2})-(\d{2})/);
                return m ? `${m[3]}/${m[2]}/${m[1]}` : d;
              };
              return {
                title: `${formatUk(date)}: £${rate || 0}`,
                subtitle: season || 'Standard Rate',
              };
            },
          },
        },
      ],
    },
    {
      name: 'paymentReference',
      title: 'BACS Payment Reference',
      type: 'string',
      description: 'Unique reference quote on bank transfer (e.g. PH-2611-JONES)',
    },
    {
      name: 'depositSentAt',
      title: 'Deposit Request Sent At',
      type: 'datetime',
      options: {
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm',
      },
      readOnly: true,
    },
    {
      name: 'depositEmailStatus',
      title: 'Deposit Request Email Status',
      type: 'string',
      options: {
        list: [
          { title: 'Not Sent', value: 'not_sent' },
          { title: 'Sent to Guest', value: 'sent' },
          { title: 'Send Failed', value: 'failed' },
        ],
        layout: 'radio',
      },
      initialValue: 'not_sent',
    },
    {
      name: 'customDepositNote',
      title: 'Personal Host Note (Sent in Deposit Email)',
      type: 'text',
      rows: 2,
    },
    // Final Balance & Automated Check-in Workflow
    {
      name: 'finalBalancePaid',
      title: 'Final Balance Paid in Full',
      type: 'boolean',
      description: 'Mark as Yes once the guest has paid their remaining balance. Arrival instructions and key safe codes will only be sent when this is checked.',
      initialValue: false,
    },
    {
      name: 'finalBalancePaidAt',
      title: 'Final Balance Paid At',
      type: 'datetime',
      options: {
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm',
      },
      readOnly: true,
      hidden: ({ parent }: any) => !parent?.finalBalancePaid,
    },
    {
      name: 'keySafeCodeOverride',
      title: 'Custom Key Safe Code (Optional)',
      type: 'string',
      description: 'Leave blank to use the default cottage key safe code configured in Site Settings.',
    },
    {
      name: 'checkInEmailStatus',
      title: 'Check-in Guide & Key Safe Email Status',
      type: 'string',
      options: {
        list: [
          { title: 'Not Sent', value: 'not_sent' },
          { title: 'Sent to Guest', value: 'sent' },
          { title: 'Send Failed', value: 'failed' },
        ],
        layout: 'radio',
      },
      initialValue: 'not_sent',
    },
    {
      name: 'checkInEmailSentAt',
      title: 'Check-in Guide Sent At',
      type: 'datetime',
      options: {
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm',
      },
      readOnly: true,
    },
    {
      name: 'balanceReminderStatus',
      title: '14-Day Balance Reminder Email Status',
      type: 'string',
      options: {
        list: [
          { title: 'Not Sent', value: 'not_sent' },
          { title: 'Sent to Guest', value: 'sent' },
          { title: 'Send Failed', value: 'failed' },
        ],
        layout: 'radio',
      },
      initialValue: 'not_sent',
    },
    {
      name: 'balanceReminderSentAt',
      title: 'Balance Reminder Sent At',
      type: 'datetime',
      options: {
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm',
      },
      readOnly: true,
    },
    {
      name: 'id',
      title: 'Inquiry Reference ID',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'notes',
      title: 'Guest Notes & Special Requests',
      type: 'text',
      rows: 4,
    },
    {
      name: 'createdAt',
      title: 'Received At (dd/mm/yyyy)',
      type: 'datetime',
      options: {
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm',
      },
      readOnly: true,
    },
  ],
  orderings: [
    {
      title: 'Received Date, Newest First',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      guestName: 'guestName',
      checkIn: 'checkIn',
      checkOut: 'checkOut',
      total: 'calculatedTotal',
      status: 'status',
      propertyId: 'propertyId',
      paymentReference: 'paymentReference',
      finalBalancePaid: 'finalBalancePaid',
      checkInEmailStatus: 'checkInEmailStatus',
    },
    prepare({ guestName, checkIn, checkOut, total, status, propertyId, paymentReference, finalBalancePaid, checkInEmailStatus }: any) {
      const formatUk = (d: string) => {
        if (!d) return '';
        const m = String(d).match(/^(\d{4})-(\d{2})-(\d{2})/);
        return m ? `${m[3]}/${m[2]}/${m[1]}` : d;
      };
      const propBadge = propertyId === 'bryn-bugeiliaid-bach' ? '[BBB]' : '[Plas Hafod]';
      let statusLabel = 'NEW INQUIRY';
      if (status === 'deposit_requested') {
        statusLabel = 'DEPOSIT SENT';
      } else if (status === 'confirmed') {
        if (finalBalancePaid) {
          statusLabel = checkInEmailStatus === 'sent' ? 'BALANCE PAID · KEY SENT' : 'BALANCE PAID';
        } else {
          statusLabel = 'CONFIRMED · BAL DUE';
        }
      } else if (status === 'declined') {
        statusLabel = 'DECLINED';
      }
      const refSuffix = paymentReference ? ` • Ref: ${paymentReference}` : '';
      return {
        title: `${propBadge} ${guestName} (${statusLabel})`,
        subtitle: `${formatUk(checkIn)} → ${formatUk(checkOut)} • Total: £${total || 0}${refSuffix}`,
      };
    },
  },
};
