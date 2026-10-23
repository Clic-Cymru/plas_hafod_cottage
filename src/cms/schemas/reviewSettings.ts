/**
 * Sanity Schema: Review & Accreditation Settings (Gosodiadau Adolygiadau)
 * Dedicated singleton configuration for Trustindex Live Reviews, review displays, and guestbook archive.
 */
export const reviewSettingsSchema = {
  name: 'reviewSettings',
  title: 'Review & Trustindex Settings (Gosodiadau Adolygiadau)',
  type: 'document',
  fields: [
    {
      name: 'trustindexHeading',
      title: '--- Trustindex Live Reviews Aggregator ---',
      type: 'string',
      readOnly: true,
      description:
        'Connect your live automated reviews from Google, Airbnb, Vrbo, and Booking.com using Trustindex.',
    },
    {
      name: 'trustindexEnabled',
      title: 'Enable Trustindex Live Reviews / Galluogi Trustindex',
      type: 'boolean',
      description:
        'Toggle this switch on to display the live Trustindex multi-platform review slider on the website.',
      initialValue: true,
    },
    {
      name: 'trustindexScriptUrl',
      title: 'Trustindex CDN Script URL / Widget ID',
      type: 'string',
      description:
        'Paste your Trustindex loader URL (e.g. "https://cdn.trustindex.io/loader.js?4a4d3e0840a425233b16403d1a0") or widget ID.',
      initialValue: 'https://cdn.trustindex.io/loader.js?4a4d3e0840a425233b16403d1a0',
    },
    {
      name: 'trustindexEmbedCode',
      title: 'Trustindex Raw HTML Embed Code (Optional)',
      type: 'text',
      rows: 4,
      description:
        'Optional raw HTML snippet provided by your Trustindex dashboard (AMP iframe or direct widget code).',
    },
    {
      name: 'presentationHeading',
      title: '--- Page Headings & Display Controls ---',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'reviewHeadingEn',
      title: 'Reviews Section Heading (English)',
      type: 'string',
      initialValue: 'SEE WHAT OUR CUSTOMERS THINK',
    },
    {
      name: 'reviewHeadingCy',
      title: 'Pennawd yr Adran Adolygiadau (Cymraeg)',
      type: 'string',
      initialValue: 'GWELWCH BETH MAE EIN CWSMERIAID YN EI FEDDWL',
    },
    {
      name: 'guestbookHeadingEn',
      title: 'Handwritten Guestbook Archive Heading (English)',
      type: 'string',
      initialValue: 'WORDS FROM OUR VISITORS',
    },
    {
      name: 'guestbookHeadingCy',
      title: 'Pennawd yr Archif Llyfr Gwesteion (Cymraeg)',
      type: 'string',
      initialValue: 'GEIRIAU GAN EIN HYMWELWYR',
    },
    {
      name: 'guestbookDescriptionEn',
      title: 'Guestbook Description (English)',
      type: 'text',
      rows: 2,
      initialValue:
        'Clippings taken directly from the handwritten guestbook located in the inglenook lounge of Plas Hafod Cottage.',
    },
    {
      name: 'guestbookDescriptionCy',
      title: 'Disgrifiad Llyfr Gwesteion (Cymraeg)',
      type: 'text',
      rows: 2,
      initialValue:
        'Toriadau a gymerwyd yn uniongyrchol o’r llyfr gwesteion llawysgrif sydd yn lolfa Plas Hafod.',
    },
    {
      name: 'showPlatformReviews',
      title: 'Show Platform Reviews Cards (Airbnb, Vrbo, Booking.com)',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'showGuestbookArchive',
      title: 'Show Authentic Handwritten Guestbook Archive',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Trustindex & Review Settings',
        subtitle: 'Live CDN Widget, Toggles & Headings',
      };
    },
  },
};
