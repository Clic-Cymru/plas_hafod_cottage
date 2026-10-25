import { Metadata } from 'next';
import { LiveSiteNavbar } from '@/components/navigation/LiveSiteNavbar';
import { LiveSiteFooter } from '@/components/navigation/LiveSiteFooter';
import { SubpageHero } from '@/components/navigation/SubpageHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { cmsClient } from '@/cms/client';
import { Mail, Phone, MapPin, Clock, Compass, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cysylltu â Ni a Chyfarwyddiadau Lleoliad - Bwthyn Plas Hafod',
  description:
    'Cysylltwch â Siwsan a Neil ym Mhlas Hafod a Bryn Bugeiliaid Bach yn Nebo, Eryri. Cysylltwch ar gyfer ymholiadau archebu, cyfarwyddiadau neu geisiadau arbennig.',
  alternates: {
    canonical: 'https://plashafodcottage.co.uk/cy/contact',
    languages: {
      'en-GB': 'https://plashafodcottage.co.uk/contact',
      'cy-GB': 'https://plashafodcottage.co.uk/cy/contact',
    },
  },
};

export default async function WelshContactPage() {
  const siteSettings = await cmsClient.getSiteSettings(false);

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#333333] flex flex-col font-sans selection:bg-[#efda07]/30 selection:text-stone-900">
      <LiveSiteNavbar currentPath="/cy/contact" isCymraeg={true} siteSettings={siteSettings} />

      <main className="flex-1">
        {/* Floating Subpage Hero with Landscape Background & Wave Divider */}
        <SubpageHero
          title="CYSYLLTU"
          subtitle="Oes gennych chi gwestiwn am ddyddiadau archebu, dod â'ch ci, neu gynllunio eich gwyliau yn Eryri? Mae Siwsan a Neil yma i helpu."
          imageSrc="/images/wp/hero-bg.jpg"
          imageAlt="Golygfeydd Plas Hafod"
        />

        {/* Contact Form & Information Cards Section */}
        <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 7 Columns: Form */}
            <div className="lg:col-span-7">
              <ContactForm isCymraeg={true} />
            </div>

            {/* Right 5 Columns: Direct Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* Card 1: Direct Host Contact */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
                <h3
                  className="text-xl sm:text-2xl font-architects uppercase tracking-wide text-stone-900 mb-2"
                  style={{ fontFamily: "'Architects Daughter', cursive, sans-serif" }}
                >
                  CYSWLLT <span className="text-[#99a0c1]">UNIONGYRCHOL</span>
                </h3>
                <div className="w-12 h-1 bg-[#efda07] mb-6" />

                <div className="space-y-4 text-sm text-stone-700">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-stone-100 text-[#99a0c1] shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase font-bold text-stone-400">Cyfeiriad E-bost</p>
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
                      <p className="text-xs uppercase font-bold text-stone-400">Rhif Ffôn / Symudol</p>
                      <p className="text-stone-900 font-medium">01286 880620</p>
                      <p className="text-stone-600 text-xs mt-0.5">Symudol: 07917 843187</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-stone-100 text-[#99a0c1] shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase font-bold text-stone-400">Lleoliad y Bwthyn</p>
                      <p className="text-stone-900 font-medium leading-snug">
                        Plas Hafod & Bryn Bugeiliaid Bach
                      </p>
                      <p className="text-stone-600 text-xs">
                        Nebo, ger Caernarfon, Gwynedd, LL54 6EG
                      </p>
                      <p className="text-stone-500 text-[11px] mt-0.5">Eryri, Gogledd Cymru</p>
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
                  GWYBODAETH <span className="text-[#99a0c1]">ARWYDDOCAOL</span>
                </h4>
                <div className="w-10 h-0.5 bg-[#efda07] mb-5" />

                <div className="space-y-3.5 text-xs sm:text-sm text-stone-600">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#99a0c1] shrink-0" />
                    <span>Cyrraedd o <strong>4:00 PM</strong> | Ymadael erbyn <strong>10:00 AM</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Compass className="w-4 h-4 text-[#99a0c1] shrink-0" />
                    <span>What3Words: <strong>///scout.crusaders.shins</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#99a0c1] shrink-0" />
                    <span>Gerddi caeedig diogel ar gyfer anifeiliaid anwes a chŵn</span>
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
                SUT I <span className="text-[#99a0c1]">GYRRAEDD ATOM</span>
              </h2>
              <div className="w-16 h-1 bg-[#efda07] mx-auto mt-3 mb-4" />
              <p className="text-stone-600 text-sm max-w-xl mx-auto">
                Yn uchel ar y llethrau uwchben Nebo, mae ein bythynnod yn mwynhau golygfeydd panoramig godidog
                ar draws Bae Caernarfon a Chrib Nantlle.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Directions Details */}
              <div className="lg:col-span-5 space-y-4 text-stone-700 text-sm leading-relaxed">
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                  <h4 className="font-bold text-stone-900 mb-1">O Gaernarfon (A487 i&#39;r De):</h4>
                  <p className="text-xs sm:text-sm text-stone-600">
                    Dilynwch yr A487 i&#39;r de tuag at Borthmadog. Wrth y gylchfan ar gyfer Pen-y-groes,
                    cymerwch yr allanfa tuag at Lanllyfni/Nebo. Dilynwch y ffordd fynydd i fyny&#39;r allt i
                    bentref Nebo.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                  <h4 className="font-bold text-stone-900 mb-1">O Borthmadog a&#39;r A55:</h4>
                  <p className="text-xs sm:text-sm text-stone-600">
                    Wrth deithio o&#39;r de, ymunwch â&#39;r A487 i&#39;r gogledd trwy Dremadog. Trowch i&#39;r dde ar
                    y B4418 tuag at Dalysarn a dilynwch yr arwyddion i fyny&#39;r allt i Nebo.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 text-amber-900 text-xs">
                  <strong>Lôn Fynydd Hardd:</strong> Mae&#39;r dull olaf o gyrraedd ar hyd lôn wledig dawel.
                  Anfonir cyfarwyddiadau cyrraedd manwl a chodau clo allwedd yn eich pecyn archebu terfynol
                  7 diwrnod cyn cyrraedd.
                </div>
              </div>

              {/* Map Embed */}
              <div className="lg:col-span-7 h-[380px] sm:h-[420px] rounded-3xl overflow-hidden shadow-md border border-stone-200 relative">
                <iframe
                  title="Lleoliad Bwthyn Plas Hafod yn Nebo Eryri"
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

        {/* Footer */}
        <LiveSiteFooter isCymraeg={true} />
      </main>
    </div>
  );
}
