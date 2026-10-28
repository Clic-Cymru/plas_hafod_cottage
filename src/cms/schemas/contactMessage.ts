/**
 * Sanity Schema: Contact Message
 * Inquiries submitted through the website /contact form.
 */
export const contactMessageSchema = {
  name: 'contactMessage',
  title: 'Contact Message',
  type: 'document',
  fields: [
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Unread / New', value: 'unread' },
          { title: 'Read / In Progress', value: 'read' },
          { title: 'Replied / Resolved', value: 'replied' },
        ],
        layout: 'radio',
      },
      initialValue: 'unread',
    },
    {
      name: 'name',
      title: 'Sender Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'subject',
      title: 'Subject / Topic',
      type: 'string',
    },
    {
      name: 'message',
      title: 'Message Content',
      type: 'text',
      rows: 5,
      validation: (Rule: any) => Rule.required(),
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
      name: 'name',
      email: 'email',
      subject: 'subject',
      status: 'status',
      createdAt: 'createdAt',
    },
    prepare({ name, email, subject, status, createdAt }: any) {
      const statusIcon = status === 'unread' ? '✉️ [NEW]' : status === 'replied' ? '✅' : '👀';
      return {
        title: `${statusIcon} ${name || 'Anonymous'} - ${subject || 'General Inquiry'}`,
        subtitle: `${email || ''} • ${createdAt ? new Date(createdAt).toLocaleDateString('en-GB') : ''}`,
      };
    },
  },
};
