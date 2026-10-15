import { Metadata } from 'next';
import { LiveSiteNavbar } from '@/components/navigation/LiveSiteNavbar';
import { LiveSiteSisterPropertyAndAccreditations } from '@/components/cottage/LiveSiteSisterPropertyAndAccreditations';
import { ContactForm } from '@/components/contact/ContactForm';
import { Mail, Phone, MapPin, Clock, Compass, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us & Location Directions - Bwthyn Plas Hafod Cottage',
  description:
    'Contact Siwsan & Neil at Plas Hafod Cottage & Bryn Bugeiliaid Bach in Nebo, Snowdonia. Get in touch for booking inquiries, directions, or special requests.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#333333] flex flex-col font-sans selection:bg-[#efda07]/30 selection:text-stone-900">
      <LiveSiteNavbar currentPath="/contact" isCymraeg={false} />

      <main className="flex-1 pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-stone-900 to-stone-800 text-white py-16 sm:py-20 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1
              className="text-3xl sm:text-5xl md:text-6xl font-architects uppercase tracking-wider text-white mb-4"
              style={{ fontFamily: "'Architects Daughter', cursive, sans-serif" }}
            >
              GET IN <span className="text-[#99a0c1]">TOUCH</span>
            </h1>
            <div className="w-20 h-1 bg-[#efda07] mx-auto mb-6" />
            <p className="text-base sm:text-lg text-stone-300 font-sans max-w-2xl mx-auto">
              Have a question about booking dates, bringing your dog, or planning your Snowdonia holiday?
              Siwsan and Neil are here to help.
            </p>
          </div>
        </section>

        {/* Contact Form & Information Cards Section */}
        <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 7 Columns: Form */}
            <div className="lg:col-span-7">
              <ContactForm isCymraeg={false} />
            </div>

            {/* Right 5 Columns: Direct Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* Card 1: Direct Host Contact */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
                <h3
                  className="text-xl sm:text-2xl font-architects uppercase tracking-wide text-stone-900 mb-2"
                  style={{ fontFamily: "'Architects Daughter', cursive, sans-serif" }}
                >
                  DIRECT <span className="text-[#99a0c1]">CONTACT</span>
                </h3>
                <div className="w-12 h-1 bg-[#efda07] mb-6" />

                <div className="space-y-4 text-sm text-stone-700">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-stone-100 text-[#99a0c1] shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase font-bold text-stone-400">Email Address</p>
                      <a
                        href="mailto:info@plashafodcottage.co.uk"
                        className="text-stone-900 font-medium hover:text-[#99a0c1] transition"
                      >
                        info@plashafodcottage.co.uk
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-stone-100 text-[#99a0c1] shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase font-bold text-stone-400">Telephone / Mobile</p>
                      <p className="text-stone-900 font-medium">01286 880620</p>
                      <p className="text-stone-600 text-xs mt-0.5">Mobile: 07917 843187</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-stone-100 text-[#99a0c1] shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase font-bold text-stone-400">Cottage Location</p>
                      <p className="text-stone-900 font-medium leading-snug">
                        Plas Hafod & Bryn Bugeiliaid Bach
                      </p>
                      <p className="text-stone-600 text-xs">
                        Nebo, near Caernarfon, Gwynedd, LL54 6EG
                      </p>
                      <p className="text-stone-500 text-[11px] mt-0.5">Snowdonia / Eryri, North Wales</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Essential Stay Information */}
              <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
                <h4
                  className="text-lg font-architects uppercase tracking-wide text-stone-900 mb-2"
                  style={{ fontFamily: "'Architects Daughter', cursive, sans-serif" }}
                >
                  STAY <span className="text-[#99a0c1]">INFORMATION</span>
                </h4>
                <div className="w-10 h-0.5 bg-[#efda07] mb-5" />

                <div className="space-y-3.5 text-xs sm:text-sm text-stone-600">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#99a0c1] shrink-0" />
                    <span>Check-in from <strong>4:00 PM</strong> | Check-out by <strong>10:00 AM</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Compass className="w-4 h-4 text-[#99a0c1] shrink-0" />
                    <span>What3Words: <strong>///scout.crusaders.shins</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#99a0c1] shrink-0" />
                    <span>Enclosed gardens safe for pets & dogs welcome</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Map Section */}
        <section className="bg-white border-t border-stone-200 py-16 sm:py-20">
          <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-4xl font-architects uppercase tracking-wide text-stone-900"
                style={{ fontFamily: "'Architects Daughter', cursive, sans-serif" }}
              >
                HOW TO <span className="text-[#99a0c1]">FIND US</span>
              </h2>
              <div className="w-16 h-1 bg-[#efda07] mx-auto mt-3 mb-4" />
              <p className="text-stone-600 text-sm max-w-xl mx-auto">
                Perched high on the slopes above Nebo, our cottages enjoy breathtaking panoramic vistas
                across Caernarfon Bay and the Nantlle Ridge.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Directions Details */}
              <div className="lg:col-span-5 space-y-4 text-stone-700 text-sm leading-relaxed">
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                  <h4 className="font-bold text-stone-900 mb-1">From Caernarfon (A487 Southbound):</h4>
                  <p className="text-xs sm:text-sm text-stone-600">
                    Follow the A487 south towards Porthmadog. At the roundabout for Penygroes, take the exit
                    towards Llanllyfni/Nebo. Follow the mountain road uphill into Nebo village.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                  <h4 className="font-bold text-stone-900 mb-1">From Porthmadog & A55:</h4>
                  <p className="text-xs sm:text-sm text-stone-600">
                    Travelling from the south, join the A487 north through Tremadog. Turn right onto the B4418
                    towards Talysarn and follow signs uphill to Nebo.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 text-amber-900 text-xs">
                  <strong>Scenic Mountain Lane:</strong> The final approach is via a tranquil rural country lane.
                  Detailed arrival directions and key safe codes are sent in your final booking pack 7 days prior to check-in.
                </div>
              </div>

              {/* Map Embed */}
              <div className="lg:col-span-7 h-[380px] sm:h-[420px] rounded-3xl overflow-hidden shadow-md border border-stone-200 relative">
                <iframe
                  title="Plas Hafod Cottage Location in Nebo Snowdonia"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19123.670494451073!2d-4.279!3d53.031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48651a027969312d%3A0x8797f7fa089d7b42!2sNebo%2C%20Caernarfon!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sister property and footer */}
        <LiveSiteSisterPropertyAndAccreditations isCymraeg={false} />
      </main>
    </div>
  );
}
