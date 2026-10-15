import { Metadata } from 'next';
import { LiveSiteNavbar } from '@/components/navigation/LiveSiteNavbar';
import { LiveSiteSisterPropertyAndAccreditations } from '@/components/cottage/LiveSiteSisterPropertyAndAccreditations';
import { FileText, CheckCircle2, AlertTriangle, ShieldCheck, Dog, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Booking Terms and Conditions - Bwthyn Plas Hafod Cottage',
  description:
    'Full booking terms, cancellation policies, pet rules, and guidelines for Plas Hafod Cottage and Bryn Bugeiliaid Bach.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#333333] flex flex-col font-sans selection:bg-[#efda07]/30 selection:text-stone-900">
      <LiveSiteNavbar currentPath="/terms" isCymraeg={false} />

      <main className="flex-1 pt-24 sm:pt-28">
        {/* Hero Banner */}
        <section className="bg-stone-900 text-white py-16 sm:py-20 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-5xl font-architects uppercase tracking-wider text-white mb-4">
              TERMS AND <span className="text-[#99a0c1]">CONDITIONS</span>
            </h1>
            <div className="w-20 h-1 bg-[#efda07] mx-auto mb-6" />
            <p className="text-base sm:text-lg text-stone-300 font-sans max-w-2xl mx-auto">
              Please ensure you read and fully understand our Booking Terms and Conditions below before
              confirming your reservation.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm space-y-8 text-stone-700 text-sm sm:text-base leading-relaxed">
            <div>
              <h2 className="text-2xl font-architects uppercase text-stone-900 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#99a0c1]" />
                1. Contract & Payment Schedule
              </h2>
              <p className="mb-3">
                A contract between the Guests and the Owner will come into existence when a deposit payment
                is received to secure the stay and a booking confirmation is issued showing confirmed holiday
                dates. The contract binds you and all members of your party.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone-600">
                <li>
                  A non-refundable <strong>£200 deposit (per week booked)</strong> is payable at the time of
                  booking.
                </li>
                <li>
                  Bookings made less than eight weeks before arrival must be paid in full, plus the £50
                  refundable damage deposit.
                </li>
                <li>
                  The balance must be paid no later than <strong>8 weeks before commencement</strong> of your
                  holiday.
                </li>
              </ul>
            </div>

            <div className="border-t border-stone-200 pt-8">
              <h2 className="text-2xl font-architects uppercase text-stone-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-[#efda07]" />
                2. Cancellations & Travel Insurance
              </h2>
              <p className="mb-3">
                All cancellations must be notified in writing. If you cancel more than 8 weeks before your
                arrival, your deposit is forfeit. If cancelled less than 8 weeks before arrival, the full
                balance remains due and non-refundable.
              </p>
              <p className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-amber-900 text-sm">
                <strong>Important:</strong> We strongly advise that you take out comprehensive travel
                insurance to cover cancellations, ferry/flight delays, or unexpected events.
              </p>
            </div>

            <div className="border-t border-stone-200 pt-8">
              <h2 className="text-2xl font-architects uppercase text-stone-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-[#99a0c1]" />
                3. Arrival, Departure & Occupancy
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-stone-600">
                <li>
                  <strong>Check-in:</strong> From 3:00pm on day of arrival.
                </li>
                <li>
                  <strong>Check-out:</strong> By 10:00am promptly on day of departure to allow thorough
                  cleaning and sanitizing.
                </li>
                <li>
                  <strong>Maximum Occupancy:</strong> 4 persons maximum. No parties, loud gatherings, or
                  unauthorized overnight visitors permitted.
                </li>
                <li>
                  <strong>Non-Smoking:</strong> Strictly no smoking or vaping anywhere inside the premises.
                  Candles are not allowed inside the house.
                </li>
              </ul>
            </div>

            <div className="border-t border-stone-200 pt-8">
              <h2 className="text-2xl font-architects uppercase text-stone-900 mb-3 flex items-center gap-2">
                <Dog className="w-6 h-6 text-[#99a0c1]" />
                4. Pet Policy (Plas Hafod Only)
              </h2>
              <p className="mb-3">
                Most dogs are warmly welcomed at Plas Hafod Cottage (maximum 2 dogs per booking). Dogs are
                <strong> not permitted</strong> in Bryn Bugeiliaid Bach.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone-600">
                <li>Pets must not be left unattended at the cottage at any time.</li>
                <li>
                  Pets are strictly not allowed on furniture, sofas, or beds. Extra cleaning costs will be
                  deducted from security deposits if hair is found on bedding.
                </li>
                <li>
                  Guests are responsible for picking up dog waste in the garden and placing it in designated
                  bins in the shed. Complimentary dog bags are provided under the kitchen sink.
                </li>
              </ul>
            </div>

            <div className="border-t border-stone-200 pt-8">
              <h2 className="text-2xl font-architects uppercase text-stone-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#efda07]" />
                5. Recycling & Eco-Friendly Care
              </h2>
              <p className="mb-3">
                Plas Hafod is proud to be a Plastic Free Business Champion and eco-conscious retreat. Please
                help us protect our Eryri environment by sorting waste into the provided containers in the shed:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="font-bold text-stone-800">Blue Boxes:</span>
                  <p className="text-stone-600 mt-1">
                    Glass bottles & jars; Tins, drink cans & foil; Plastic bottles, pots, tubs & trays (no bags);
                    Cardboard & clean paper.
                  </p>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="font-bold text-stone-800">Brown Bins:</span>
                  <p className="text-stone-600 mt-1">
                    All food waste and biodegradable peelings (no liquids/oils).
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-stone-200 pt-8 text-xs text-stone-500">
              <p>
                By placing a booking with us you accept these Terms and Conditions in full. We thank you for
                treating our home with care and respect and look forward to welcoming you to Plas Hafod!
              </p>
            </div>
          </div>
        </section>

        {/* Accreditations & Footer */}
        <LiveSiteSisterPropertyAndAccreditations isCymraeg={false} />
      </main>
    </div>
  );
}
