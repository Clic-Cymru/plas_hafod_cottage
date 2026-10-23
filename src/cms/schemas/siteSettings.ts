/**
 * Sanity Schema: Site Settings & Global Branding
 * Allows editing site-wide contact info, announcement banner, and host details.
 */
export const siteSettingsSchema = {
  name: 'siteSettings',
  title: 'Site Settings & Branding (Gosodiadau Gwefan)',
  type: 'document',
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
      name: 'bannerAnnouncementEn',
      title: 'Hero Banner Announcement (English)',
      type: 'string',
      description: 'Yellow highlight banner at top of hero',
      initialValue: 'BOOK DIRECT & SAVE 10% — BEST PRICE GUARANTEED ON ALL 2026 / 2027 DATES',
    },
    {
      name: 'bannerAnnouncementCy',
      title: 'Cyhoeddiad Baner yr Arwr (Cymraeg)',
      type: 'string',
      initialValue: 'ARCHEBWCH YN UNIONGYRCHOL AC ARBEDWCH 10% — PRIS GORAU WEDI’I WARANTU',
    },
    {
      name: 'bannerEnabled',
      title: 'Show Announcement Banner',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'facebookUrl',
      title: 'Facebook Page URL',
      type: 'url',
    },
    {
      name: 'instagramUrl',
      title: 'Instagram Profile URL',
      type: 'url',
    },
    // Special Offer Popup / Modal Settings
    {
      name: 'offerPopupEnabled',
      title: 'Enable Special Offer Popup / Galluogi Ffenestr Cynnig Arbennig',
      type: 'boolean',
      description: 'Display an interactive special offer card/modal when guests visit the homepage.',
      initialValue: true,
    },
    {
      name: 'offerPosition',
      title: 'Popup Screen Position / Lleoliad y Ffenestr',
      type: 'string',
      description: 'Choose whether the offer appears right in the center of the screen with a focused backdrop, or in the bottom-right corner.',
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
      title: 'Offer Badge Tag (English)',
      type: 'string',
      initialValue: 'SPECIAL AUTUMN 2026 OFFER!',
    },
    {
      name: 'offerBadgeCy',
      title: 'Bathodyn y Cynnig (Cymraeg)',
      type: 'string',
      initialValue: 'CYNNIG ARBENNIG HYDREF 2026!',
    },
    {
      name: 'offerTitleEn',
      title: 'Offer Main Heading (English)',
      type: 'string',
      initialValue: 'Book 3 Nights, Get 4th Night Free!',
    },
    {
      name: 'offerTitleCy',
      title: 'Prif Deitl y Cynnig (Cymraeg)',
      type: 'string',
      initialValue: 'Archebwch 3 Noson, Cewch y 4edd Noson am Ddim!',
    },
    {
      name: 'offerDescriptionEn',
      title: 'Offer Description & Terms (English)',
      type: 'text',
      rows: 3,
      initialValue: 'Book 3 nights between 1st October and 18th December (excluding 24/10/26 to 31/10/26) and get your 4th night completely FREE!',
    },
    {
      name: 'offerDescriptionCy',
      title: 'Disgrifiad a Thelerau’r Cynnig (Cymraeg)',
      type: 'text',
      rows: 3,
      initialValue: 'Archebwch 3 noson rhwng 1af Hydref a 18fed Rhagfyr (ac eithrio 24/10/26 i 31/10/26) a chewch y 4edd noson AM DDIM!',
    },
    {
      name: 'offerButtonTextEn',
      title: 'Offer Button Text (English)',
      type: 'string',
      initialValue: 'Book Now',
    },
    {
      name: 'offerButtonTextCy',
      title: 'Testun y Botwm (Cymraeg)',
      type: 'string',
      initialValue: 'Archebwch Nawr',
    },
    {
      name: 'offerButtonLink',
      title: 'Offer Button Link (e.g. #book or /contact)',
      type: 'string',
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
