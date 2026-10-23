/**
 * Sanity Schema: Site Settings & Global Branding
 * Allows editing site-wide contact info, announcement banner, and host details.
 */
export const siteSettingsSchema = {
  name: 'siteSettings',
  title: 'Site Settings & Branding (Gosodiadau Gwefan)',
  type: 'document',
  fieldsets: [
    {
      name: 'promotions',
      title: '🎁 Special Offers & Announcements (Cynigion Arbennig a Baneri)',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'socials',
      title: '📱 Social Media Links (Cyfryngau Cymdeithasol)',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    {
      name: 'siteTitle',
      title: 'Site Title / Enw’r Safle',
      type: 'string',
      initialValue: 'Bwthyn Plas Hafod Cottage & Bryn Bugeiliaid Bach',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'hostNames',
      title: 'Host Names / Enwau’r Lletywyr',
      type: 'string',
      initialValue: 'Siwsan & Neil',
      description: 'e.g. "Siwsan & Neil"',
    },
    {
      name: 'email',
      title: 'Contact Email / E-bost Cyswllt',
      type: 'string',
      initialValue: 'info@plashafodcottage.co.uk',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'phone',
      title: 'Telephone / Rhif Ffôn',
      type: 'string',
      initialValue: '+44 (0) 1286 880 000',
    },
    {
      name: 'whatsapp',
      title: 'WhatsApp Contact Number',
      type: 'string',
      description: 'International format e.g. +447123456789',
    },
    {
      name: 'address',
      title: 'Cottage Address (English)',
      type: 'text',
      rows: 3,
      initialValue: 'Plas Hafod Cottage, Nebo, Caernarfon, Gwynedd, LL54 6EE',
    },
    {
      name: 'addressCy',
      title: 'Cyfeiriad (Cymraeg)',
      type: 'text',
      rows: 3,
      initialValue: 'Bwthyn Plas Hafod, Nebo, Caernarfon, Gwynedd, LL54 6EE',
    },
    {
      name: 'checkInTime',
      title: 'Standard Check-in Time',
      type: 'string',
      initialValue: '4:00 PM',
    },
    {
      name: 'checkOutTime',
      title: 'Standard Check-out Time',
      type: 'string',
      initialValue: '10:00 AM',
    },
    {
      name: 'facebookUrl',
      title: 'Facebook Page URL',
      type: 'url',
      fieldset: 'socials',
    },
    {
      name: 'instagramUrl',
      title: 'Instagram Profile URL',
      type: 'url',
      fieldset: 'socials',
    },
    // Special Offers & Promo Presentation
    {
      name: 'offerDisplayMode',
      title: 'Offer Presentation Style / Ffordd o Arddangos y Cynnig',
      type: 'string',
      fieldset: 'promotions',
      description: 'Choose whether special offers should appear as a Top Announcement Banner or as a Popup Window.',
      options: {
        list: [
          { title: 'Top Announcement Banner (Baner Cyhoeddi ar y Brig)', value: 'banner' },
          { title: 'Special Offer Popup / Modal (Ffenestr Bop-yp Cynnig Arbennig)', value: 'popup' },
          { title: 'Both Banner & Popup (Y Faner a’r Bop-yp)', value: 'both' },
          { title: 'Disabled / None (Wedi’i Ddiffodd)', value: 'none' },
        ],
        layout: 'radio',
      },
      initialValue: 'banner',
    },
    {
      name: 'bannerAnnouncementEn',
      title: 'Banner Announcement Text (English)',
      type: 'string',
      fieldset: 'promotions',
      description: 'Yellow highlight banner across top of hero',
      initialValue: 'BOOK DIRECT & SAVE 10% — BEST PRICE GUARANTEED ON ALL 2026 / 2027 DATES',
    },
    {
      name: 'bannerAnnouncementCy',
      title: 'Testun y Faner Gyhoeddi (Cymraeg)',
      type: 'string',
      fieldset: 'promotions',
      initialValue: 'ARCHEBWCH YN UNIONGYRCHOL AC ARBEDWCH 10% — PRIS GORAU WEDI’I WARANTU',
    },
    {
      name: 'bannerLink',
      title: 'Banner Click Link',
      type: 'string',
      fieldset: 'promotions',
      description: 'Where clicking the announcement banner takes the guest (default: #book)',
      initialValue: '#book',
    },
    {
      name: 'bannerEnabled',
      title: 'Legacy: Show Announcement Banner',
      type: 'boolean',
      fieldset: 'promotions',
      hidden: true,
      initialValue: true,
    },
    // Popup Window Settings
    {
      name: 'offerPosition',
      title: 'Popup Screen Position (if Popup is chosen)',
      type: 'string',
      fieldset: 'promotions',
      description: 'Choose whether the popup appears right in the center with a focused backdrop, or in the bottom-right corner.',
      options: {
        list: [
          { title: 'Centered Modal Overlay (Canol y Dudalen gydag Arlliw Cefndir)', value: 'center' },
          { title: 'Bottom-Right Floating Toast (Cornel Isaf ar y Dde)', value: 'bottom-right' },
        ],
        layout: 'radio',
      },
      initialValue: 'center',
    },
    {
      name: 'offerBadgeEn',
      title: 'Popup Badge Tag (English)',
      type: 'string',
      fieldset: 'promotions',
      initialValue: 'SPECIAL AUTUMN 2026 OFFER!',
    },
    {
      name: 'offerBadgeCy',
      title: 'Bathodyn y Bop-yp (Cymraeg)',
      type: 'string',
      fieldset: 'promotions',
      initialValue: 'CYNNIG ARBENNIG HYDREF 2026!',
    },
    {
      name: 'offerTitleEn',
      title: 'Popup Heading (English)',
      type: 'string',
      fieldset: 'promotions',
      initialValue: 'Book 3 Nights, Get 4th Night Free!',
    },
    {
      name: 'offerTitleCy',
      title: 'Prif Deitl y Bop-yp (Cymraeg)',
      type: 'string',
      fieldset: 'promotions',
      initialValue: 'Archebwch 3 Noson, Cewch y 4edd Noson am Ddim!',
    },
    {
      name: 'offerDescriptionEn',
      title: 'Popup Description & Terms (English)',
      type: 'text',
      rows: 3,
      fieldset: 'promotions',
      initialValue: 'Book 3 nights between 1st October and 18th December (excluding 24/10/26 to 31/10/26) and get your 4th night completely FREE!',
    },
    {
      name: 'offerDescriptionCy',
      title: 'Disgrifiad a Thelerau’r Bop-yp (Cymraeg)',
      type: 'text',
      rows: 3,
      fieldset: 'promotions',
      initialValue: 'Archebwch 3 noson rhwng 1af Hydref a 18fed Rhagfyr (ac eithrio 24/10/26 i 31/10/26) a chewch y 4edd noson AM DDIM!',
    },
    {
      name: 'offerButtonTextEn',
      title: 'Popup Button Text (English)',
      type: 'string',
      fieldset: 'promotions',
      initialValue: 'Book Now',
    },
    {
      name: 'offerButtonTextCy',
      title: 'Testun Botwm y Bop-yp (Cymraeg)',
      type: 'string',
      fieldset: 'promotions',
      initialValue: 'Archebwch Nawr',
    },
    {
      name: 'offerButtonLink',
      title: 'Popup Button Link (e.g. #book)',
      type: 'string',
      fieldset: 'promotions',
      initialValue: '#book',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Global Site Settings & Branding',
        subtitle: 'Phone, Email, Address, Banner & Socials',
      };
    },
  },
};
