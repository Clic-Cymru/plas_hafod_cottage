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
          .title('Content & Booking Engine')
          .items([
            // ==========================================
            // 1. Pages
            // ==========================================
            S.listItem()
              .title('Pages')
              .child(
                S.list()
                  .title('Pages')
                  .items([
                    // Bryn Bugeiliaid Bach
                    S.listItem()
                      .title('Bryn Bugeiliaid Bach')
                      .child(
                        S.document()
                          .schemaType('pageContent')
                          .documentId('page-bryn-bugeiliaid-bach')
                          .title('Bryn Bugeiliaid Bach Page')
                      ),

                    // Home page
                    S.listItem()
                      .title('Home page')
                      .child(
                        S.list()
                          .title('Home Page Management')
                          .items([
                            S.listItem()
                              .title('Page Content & SEO')
                              .child(
                                S.document()
                                  .schemaType('pageContent')
                                  .documentId('page-home')
                                  .title('Home Page Content')
                              ),
                            S.documentTypeListItem('heroSlide')
                              .title('Hero Slideshow'),
                          ])
                      ),

                    // Local Area
                    S.listItem()
                      .title('Local Area')
                      .child(
                        S.list()
                          .title('Local Area')
                          .items([
                            S.listItem()
                              .title('Page Content & SEO')
                              .child(
                                S.document()
                                  .schemaType('pageContent')
                                  .documentId('page-local-area')
                                  .title('Local Area Content')
                              ),
                            S.documentTypeListItem('localAttraction')
                              .title('Local Attractions'),
                            S.documentTypeListItem('snowdonPath')
                              .title('Snowdon Mountain Walks'),
                          ])
                      ),

                    // Reviews
                    S.listItem()
                      .title('Reviews')
                      .child(
                        S.list()
                          .title('Reviews')
                          .items([
                            S.listItem()
                              .title('Page Content & SEO')
                              .child(
                                S.document()
                                  .schemaType('pageContent')
                                  .documentId('page-reviews')
                                  .title('Reviews Page Content & SEO')
                              ),
                            S.listItem()
                              .title('Trustindex Live Reviews Setup')
                              .child(
                                S.document()
                                  .schemaType('reviewSettings')
                                  .documentId('reviewSettings')
                                  .title('Trustindex Live Reviews Setup')
                              ),
                            S.documentTypeListItem('accreditation')
                              .title('Accreditations & Awards'),
                            S.listItem()
                              .title('Handwritten Guestbook Archive')
                              .child(
                                S.list()
                                  .title('Handwritten Guestbook Archive')
                                  .items([
                                    S.listItem()
                                      .title('Plas Hafod Guestbook')
                                      .child(
                                        S.documentList()
                                          .title('Plas Hafod Guestbook')
                                          .filter(
                                            '_type == "guestbookEntry" && (!defined(property) || property == "plas-hafod")'
                                          )
                                          .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                      ),
                                    S.listItem()
                                      .title('Bryn Bugeiliaid Bach Guestbook')
                                      .child(
                                        S.documentList()
                                          .title('Bryn Bugeiliaid Bach Guestbook')
                                          .filter(
                                            '_type == "guestbookEntry" && property == "bryn-bugeiliaid-bach"'
                                          )
                                          .defaultOrdering([{ field: 'order', direction: 'asc' }])
                                      ),
                                    S.listItem()
                                      .title('All Guestbook Notes')
                                      .child(
                                        S.documentList()
                                          .title('All Guestbook Notes')
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

                    // Contact
                    S.listItem()
                      .title('Contact')
                      .child(
                        S.list()
                          .title('Contact')
                          .items([
                            S.listItem()
                              .title('Contact Page Content & SEO')
                              .child(
                                S.document()
                                  .schemaType('pageContent')
                                  .documentId('page-contact')
                                  .title('Contact Page Content')
                              ),
                            S.documentTypeListItem('contactMessage')
                              .title('Contact Messages Inbox'),
                          ])
                      ),

                    // Terms and Conditions
                    S.listItem()
                      .title('Terms and Conditions')
                      .child(
                        S.list()
                          .title('Terms and Conditions')
                          .items([
                            S.listItem()
                              .title('Terms Page Content & SEO')
                              .child(
                                S.document()
                                  .schemaType('pageContent')
                                  .documentId('page-terms')
                                  .title('Terms Page Content & SEO')
                              ),
                            S.listItem()
                              .title('Policy Sections')
                              .child(
                                S.documentList()
                                  .title('Terms and Conditions Sections')
                                  .filter('_type == "policySection"')
                                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
                              ),
                          ])
                      ),
                  ])
              ),

            // ==========================================
            // 2. Booking Engine
            // ==========================================
            S.listItem()
              .title('Booking Engine')
              .child(
                S.list()
                  .title('Booking Engine')
                  .items([
                    // Cottages
                    S.listItem()
                      .title('Cottages')
                      .child(
                        S.list()
                          .title('Cottages')
                          .items([
                            // Plas Hafod
                            S.listItem()
                              .title('Plas Hafod')
                              .child(
                                S.list()
                                  .title('Plas Hafod')
                                  .items([
                                    S.listItem()
                                      .title('Rates')
                                      .child(
                                        S.document()
                                          .schemaType('pricingConfig')
                                          .documentId('pricing-plas-hafod')
                                          .title('Plas Hafod Rates')
                                      ),
                                    S.listItem()
                                      .title('Bookings')
                                      .child(
                                        S.documentList()
                                          .title('Plas Hafod Bookings')
                                          .filter(
                                            '_type == "bookingInquiry" && (!defined(propertyId) || propertyId == "plas-hafod")'
                                          )
                                          .defaultOrdering([{ field: 'createdAt', direction: 'desc' }])
                                      ),
                                    S.listItem()
                                      .title('Blocked Dates')
                                      .child(
                                        S.documentList()
                                          .title('Plas Hafod Blocked Dates')
                                          .filter(
                                            '_type == "blockedDates" && (propertyId == "plas-hafod" || propertyId == "both")'
                                          )
                                          .defaultOrdering([{ field: 'startDate', direction: 'asc' }])
                                      ),
                                    S.listItem()
                                      .title('Specs & Amenities')
                                      .child(
                                        S.document()
                                          .schemaType('propertyDetails')
                                          .documentId('property-plas-hafod')
                                          .title('Plas Hafod Specs & Amenities')
                                      ),
                                  ])
                              ),

                            // Bryn Bugeiliaid Bach
                            S.listItem()
                              .title('Bryn Bugeiliaid Bach')
                              .child(
                                S.list()
                                  .title('Bryn Bugeiliaid Bach')
                                  .items([
                                    S.listItem()
                                      .title('Rates')
                                      .child(
                                        S.document()
                                          .schemaType('pricingConfig')
                                          .documentId('pricing-bryn-bugeiliaid-bach')
                                          .title('Bryn Bugeiliaid Bach Rates')
                                      ),
                                    S.listItem()
                                      .title('Bookings')
                                      .child(
                                        S.documentList()
                                          .title('Bryn Bugeiliaid Bach Bookings')
                                          .filter(
                                            '_type == "bookingInquiry" && propertyId == "bryn-bugeiliaid-bach"'
                                          )
                                          .defaultOrdering([{ field: 'createdAt', direction: 'desc' }])
                                      ),
                                    S.listItem()
                                      .title('Blocked Dates')
                                      .child(
                                        S.documentList()
                                          .title('Bryn Bugeiliaid Bach Blocked Dates')
                                          .filter(
                                            '_type == "blockedDates" && (propertyId == "bryn-bugeiliaid-bach" || propertyId == "both")'
                                          )
                                          .defaultOrdering([{ field: 'startDate', direction: 'asc' }])
                                      ),
                                    S.listItem()
                                      .title('Specs & Amenities')
                                      .child(
                                        S.document()
                                          .schemaType('propertyDetails')
                                          .documentId('property-bryn-bugeiliaid-bach')
                                          .title('Bryn Bugeiliaid Bach Specs & Amenities')
                                      ),
                                  ])
                              ),

                            // All Bookings View (Both Cottages)
                            S.listItem()
                              .title('All Bookings (Master Calendar & Inbox)')
                              .child(
                                S.documentList()
                                  .title('All Bookings (Both Cottages)')
                                  .filter('_type == "bookingInquiry"')
                                  .defaultOrdering([{ field: 'createdAt', direction: 'desc' }])
                              ),
                          ])
                      ),

                    // Seasons
                    S.listItem()
                      .title('Seasons')
                      .child(
                        S.documentList()
                          .title('Seasons')
                          .filter('_type == "season"')
                          .defaultOrdering([{ field: 'startDate', direction: 'asc' }])
                      ),

                    // Special offers / discounts
                    S.listItem()
                      .title('Special offers / discounts')
                      .child(
                        S.documentList()
                          .title('Special Offers & Discounts')
                          .filter('_type == "specialOffer"')
                      ),

                    // E-mail templates
                    S.listItem()
                      .title('E-mail templates')
                      .child(
                        S.documentList()
                          .title('E-mail Templates')
                          .filter('_type == "emailTemplate"')
                          .defaultOrdering([{ field: 'order', direction: 'asc' }])
                      ),
                  ])
              ),

            // ==========================================
            // 3. Site Settings
            // ==========================================
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Site Settings')
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
