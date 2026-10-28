import { EmailTemplatePreviewAndTest } from '../studio/EmailTemplatePreviewAndTest';

/**
 * Sanity Schema: E-mail Template
 * Configures the 7 core booking lifecycle and notification email templates.
 */
export const emailTemplateSchema = {
  name: 'emailTemplate',
  title: 'E-mail Template',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Template Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'templateKey',
      title: 'Template Identifier',
      type: 'string',
      options: {
        list: [
          { title: '1. Admin Notification (New Reservation)', value: 'admin_notification' },
          { title: '2. Pending Reservation (Customer Receipt)', value: 'pending_reservation' },
          { title: '3. Deposit Request (BACS Payment Instructions)', value: 'deposit_request' },
          { title: '4. Deposit Receipt (Dates Confirmed)', value: 'deposit_receipt' },
          { title: '5. Payment Due Reminder (60 Days)', value: 'payment_due_reminder' },
          { title: '6. Directions & Arrival Guide (30 Days)', value: 'directions_guide' },
          { title: '7. Full Payment Receipt', value: 'full_payment_receipt' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
    },
    {
      name: 'targetAudience',
      title: 'Target Recipient',
      type: 'string',
      options: {
        list: [
          { title: 'Guest (Customer)', value: 'guest' },
          { title: 'Host / Owner (Admin)', value: 'admin' },
        ],
        layout: 'radio',
      },
      initialValue: 'guest',
    },
    {
      name: 'subjectEn',
      title: 'Email Subject (English)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subjectCy',
      title: 'Email Subject (Welsh)',
      type: 'string',
    },
    {
      name: 'headingEn',
      title: 'Email Banner Heading (English)',
      type: 'string',
    },
    {
      name: 'headingCy',
      title: 'Email Banner Heading (Welsh)',
      type: 'string',
    },
    {
      name: 'messageEn',
      title: 'Email Body Message (English)',
      type: 'text',
      rows: 6,
      validation: (Rule: any) => Rule.required(),
      description: 'Main body copy. Use placeholders: {guest_name}, {property}, {check_in}, {check_out}, {total_nights}, {deposit_amount}, {balance_due}, {payment_reference}',
    },
    {
      name: 'messageCy',
      title: 'Email Body Message (Welsh)',
      type: 'text',
      rows: 6,
      description: 'Welsh translation placeholder for email body.',
    },
    {
      name: 'instructionsEn',
      title: 'Highlighted Instructions / Action Box (English)',
      type: 'text',
      rows: 3,
      description: 'Optional highlight callout box (e.g. BACS bank instructions or arrival notes).',
    },
    {
      name: 'instructionsCy',
      title: 'Highlighted Instructions / Action Box (Welsh)',
      type: 'text',
      rows: 3,
      description: 'Welsh translation placeholder for highlight callout box.',
    },
    {
      name: 'previewTool',
      title: 'Live Email Preview & Test Dispatcher',
      type: 'string',
      components: {
        input: EmailTemplatePreviewAndTest,
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
      audience: 'targetAudience',
      templateKey: 'templateKey',
    },
    prepare({ title, order, audience, templateKey }: any) {
      const audLabel = audience === 'admin' ? '[Owner]' : '[Guest]';
      const triggerLabels: Record<string, string> = {
        admin_notification: 'Sent immediately to host upon new booking inquiry',
        pending_reservation: 'Sent immediately to guest confirming inquiry is under review',
        deposit_request: 'Sent manually by host to request BACS deposit',
        deposit_receipt: 'Sent when deposit clears to confirm booking dates',
        payment_due_reminder: 'Automated reminder for remaining balance before check-in',
        directions_guide: 'Automated arrival directions & check-in guide (30 days before check-in)',
        full_payment_receipt: 'Sent once final balance is cleared',
      };
      return {
        title: `${order ? `#${order} ` : ''}${audLabel} ${title}`,
        subtitle: triggerLabels[templateKey] || 'Booking Email Workflow',
      };
    },
  },
};
