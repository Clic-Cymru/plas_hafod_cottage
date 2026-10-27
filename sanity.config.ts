import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/cms/schemas';
import { ClicCymruLogo } from './src/cms/studio/ClicCymruLogo';
import { ClicCymruNavbar } from './src/cms/studio/ClicCymruNavbar';
import { SendDepositRequestAction } from './src/cms/studio/SendDepositRequestAction';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'iji5mij0';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'plas-hafod-cottage',
  title: 'Plas Hafod Studio · Clic Cymru',
  projectId,
  dataset,
  basePath: '/studio',
  studio: {
    components: {
      navbar: ClicCymruNavbar,
      logo: ClicCymruLogo,
    },
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Clic Cymru Content Engine')
          .items([
            // 1. Holiday Cottages & Content
            S.listItem()
              .title('🏡 Tai Gwyliau / Cottages & Media')
              .child(
                S.list()
                  .title('Holiday Cottages & Presentation')
                  .items([
                    S.listItem()
                      .title('🌟 Plas Hafod (Main Cottage Specs & Amenities)')
                      .child(
                        S.document()
                          .schemaType('propertyDetails')
                          .documentId('property-plas-hafod')
                          .title('Plas Hafod Cottage Specs & Amenities')
                      ),
                    S.listItem()
                      .title('🏡 Bryn Bugeiliaid Bach (Annexe Specs & Amenities)')
                      .child(
                        S.document()
                          .schemaType('propertyDetails')
                          .documentId('property-bryn-bugeiliaid-bach')
                          .title('Bryn Bugeiliaid Bach Specs & Amenities')
                      ),
                    S.documentTypeListItem('heroSlide')
                      .title('Hero Slideshow (Sleidiau’r Hafan)'),
                    S.documentTypeListItem('pageContent')
                      .title('Pages & Bilingual Content (Tudalennau)'),
                  ])
              ),

            // 2. Booking Engine & Rates
            S.listItem()
              .title('📅 Archebion & Phrisiau / Booking Engine')
              .child(
                S.list()
                  .title('Booking & Calendar Management')
                  .items([
                    S.documentTypeListItem('blockedDates')
                      .title('Blocked Dates Calendar (Dyddiadau Wedi’u Rhwystro)'),
                    S.documentTypeListItem('pricingConfig')
                      .title('Seasonal Pricing & Nightly Rates (Prisio)'),
                    S.documentTypeListItem('bookingInquiry')
                      .title('Booking Inquiries Inbox (Archebion Newydd)'),
                  ])
              ),

            // 3. Contact & Messages Inbox
            S.listItem()
              .title('💬 Negeseuon / Messages Inbox')
              .child(
                S.documentTypeList('contactMessage')
                  .title('Guest Contact Inquiries (Negeseuon Cyswllt)')
              ),

            // 4. Reviews & Accreditations
            S.listItem()
              .title('⭐ Adolygiadau & Achrediadau / Reviews & Accreditations')
              .child(
                S.list()
                  .title('Reviews & Accreditations (Adolygiadau ac Achrediadau)')
                  .items([
                    S.listItem()
                      .title('⚙️ Trustindex Live Reviews Setup (Ffurfweddiad Trustindex)')
                      .child(
                        S.document()
                          .schemaType('reviewSettings')
                          .documentId('reviewSettings')
                          .title('Trustindex Live Reviews Setup & Controls')
                      ),
                    S.listItem()
                      .title('🏆 Accreditations & Awards (Achrediadau)')
                      .child(
                        S.documentList()
                          .title('Accreditations & Awards')
                          .apiVersion('2024-01-01')
                          .filter('_type == "accreditation"')
                          .defaultOrdering([{ field: 'order', direction: 'asc' }])
                      ),
                    S.listItem()
                      .title('📖 Handwritten Guestbook Archive (Llyfr Gwesteion)')
                      .child(
                        S.list()
                          .title('Handwritten Guestbook Collections')
                          .items([
                            S.listItem()
                              .title('🏡 Plas Hafod Cottage Guestbook (21 Notes)')
                              .child(
                                S.documentList()
                                  .title('Plas Hafod Cottage Guestbook')
                                  .apiVersion('2024-01-01')
                                  .filter(
                                    '_type == "guestbookEntry" && (!defined(property) || property == "plas-hafod")'
                                  )
                                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
                              ),
                            S.listItem()
                              .title('🌿 Bryn Bugeiliaid Bach Guestbook (15 Notes)')
                              .child(
                                S.documentList()
                                  .title('Bryn Bugeiliaid Bach Guestbook')
                                  .apiVersion('2024-01-01')
                                  .filter('_type == "guestbookEntry" && property == "bryn-bugeiliaid-bach"')
                                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
                              ),
                            S.listItem()
                              .title('📋 All Guestbook Comments (All Cottages)')
                              .child(
                                S.documentList()
                                  .title('All Guestbook Comments')
                                  .apiVersion('2024-01-01')
                                  .filter('_type == "guestbookEntry"')
                                  .defaultOrdering([
                                    { field: 'property', direction: 'asc' },
                                    { field: 'order', direction: 'asc' },
                                  ])
                              ),
                          ])
                      ),
                  ])
              ),

            // 5. Local Area & Snowdon Walks
            S.listItem()
              .title('🏔️ Ardal Leol / Local Area & Walks')
              .child(
                S.list()
                  .title('Local Guide & Mountain Trails')
                  .items([
                    S.listItem()
                      .title('Local Attractions (Atyniadau Lleol)')
                      .child(
                        S.documentList()
                          .title('Local Attractions')
                          .apiVersion('2024-01-01')
                          .filter('_type == "localAttraction"')
                          .defaultOrdering([{ field: 'order', direction: 'asc' }])
                      ),
                    S.listItem()
                      .title('Snowdon Mountain Walks (Llwybrau’r Wyddfa)')
                      .child(
                        S.documentList()
                          .title('Snowdon Trails')
                          .apiVersion('2024-01-01')
                          .filter('_type == "snowdonPath"')
                          .defaultOrdering([{ field: 'order', direction: 'asc' }])
                      ),
                  ])
              ),

            // 6. Terms & Policies
            S.listItem()
              .title('📜 Telerau & Pholisïau / Terms & Policies')
              .child(
                S.documentList()
                  .title('Terms & Cancellation Policies')
                  .apiVersion('2024-01-01')
                  .filter('_type == "policySection"')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),

            // 7. Site Settings & Branding (Singleton)
            S.listItem()
              .title('⚙️ Gosodiadau Gwefan / Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Global Site Settings & Branding')
              ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) => {
      if (context.schemaType === 'bookingInquiry') {
        return [...prev, SendDepositRequestAction];
      }
      return prev;
    },
  },
});
