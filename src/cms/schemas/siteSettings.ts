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
