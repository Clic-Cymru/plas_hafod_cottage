# Project Specification: Plas Hafod React Migration

## 1. Project Overview

Migrate the existing WordPress holiday let website to a modern Jamstack architecture. The new site will be statically generated for maximum performance, hosted on Cloudflare Pages, and feature built-in technical SEO, Local SEO (GEO), and bilingual support (English/Welsh). 

The backend will be powered entirely by a Headless CMS, serving as a unified dashboard for content, pricing rules, and booking inquiry management.

## 2. Tech Stack

* **Frontend:** Next.js (React) - App Router for superior SEO and performance.
* **Styling:** Tailwind CSS.
* **Hosting:** Cloudflare Pages (via GitHub/GitLab CI/CD).
* **Backend/API:** Cloudflare Functions (for serverless form handling and API routing).
* **Email Delivery:** Resend or SendGrid API.
* **Database & Content:** Headless CMS (e.g., Sanity.io). Chosen for its robust Mutation API which allows us to write data (bookings) back to the CMS from the frontend.

## 3. Core Features & Architecture

### A. The Unified CMS Dashboard (Client Admin)
The Headless CMS will be configured to provide a tailored dashboard for the client, containing:
1. **Content & Translations:** Fields to manage site text, Welsh translations, and Guestbook images.
2. **Pricing Engine:** 
   * `Base Rate` field.
   * `Seasons` schema (Start Date, End Date, Nightly Rate, Min Stay).
   * `Discounts` schema (Valid Dates, Trigger Rules, Discount Amount/Percentage).
3. **Calendar Management:** A schema to define "Blocked Dates" to prevent inquiries for unavailable periods.
4. **Booking Inbox:** A schema for "Booking Inquiries" where form submissions are saved.

### B. Booking & Calculation Flow
1. **Frontend Fetch:** Next.js fetches pricing rules, blocked dates, and content from the CMS at build time (and revalidates via ISR/Webhooks).
2. **User Selection:** Guest selects dates on the React calendar. The frontend runs a calculation script, applying seasonal rates and active discounts, and displays the total price/deposit.
3. **Form Submission:** Guest submits the inquiry.
4. **Serverless Processing (Cloudflare Function):**
   * Receives the POST request.
   * **Action 1:** Uses the CMS Mutation API to create a new "Booking Inquiry" document directly inside the Headless CMS dashboard (Option A implemented).
   * **Action 2:** Triggers the Email API to send an instant notification to the client and a summary to the guest.

### C. SEO & Local SEO (GEO) Strategy
* **Dynamic Metadata:** Title tags, meta descriptions, and Open Graph tags generated dynamically.
* **JSON-LD Schema Markup:** Implement `LodgingBusiness`, `LocalBusiness`, and `BreadcrumbList` schemas to maximize Google Maps and local search visibility.
* **Semantic HTML:** Strict adherence to semantic tags and heading hierarchies.
* **Image Optimization:** `next/image` for automatic WebP conversion, resizing, and lazy loading.
* **Internationalization (i18n):** Clean URL structures for Welsh/English (e.g., `/cy/amdanom-ni` vs `/about-us`) with `hreflang` tags.

### D. Reviews & Guestbook
* **Digital Reviews:** Embeddable React widget (e.g., Elfsight or Trustindex) to aggregate Google, Airbnb, and Vrbo reviews.
* **Guestbook Gallery:** Images uploaded to the CMS rendered in an optimized masonry grid on the frontend.

## 4. Development Phases

1. **Setup & CMS Configuration:** Initialize Next.js, Cloudflare Pages, and set up all CMS schemas (Pages, Pricing, Blocked Dates, Booking Inquiries).
2. **UI/UX Development:** Build static pages, responsive navigation, and bilingual architecture.
3. **Pricing & Booking Engine:** Build the frontend calculation logic, the calendar component, and the serverless Cloudflare functions for CMS mutation and email delivery.
4. **SEO & Analytics:** Inject JSON-LD, optimize assets, and prepare hooks for keyword targeting.
5. **Testing & Go-Live:** End-to-end testing of the inquiry flow, CMS data writing, and email triggers.