import { Metadata } from 'next';
import { LiveSiteNavbar } from '@/components/navigation/LiveSiteNavbar';
import { LiveSiteFooter } from '@/components/navigation/LiveSiteFooter';
import { SubpageHero } from '@/components/navigation/SubpageHero';
import { cmsClient } from '@/cms/client';
import { CheckCircle2, AlertTriangle, ShieldCheck, Dog, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Telerau ac Amodau Archebu - Bwthyn Plas Hafod',
  description:
    'Telerau archebu llawn, polisïau canslo, rheolau anifeiliaid anwes, a chanllawiau ar gyfer Bwthyn Plas Hafod a Bryn Bugeiliaid Bach.',
  alternates: {
    canonical: 'https://plashafodcottage.co.uk/cy/terms',
    languages: {
      'en-GB': 'https://plashafodcottage.co.uk/terms',
      'cy-GB': 'https://plashafodcottage.co.uk/cy/terms',
    },
  },
};

export default async function WelshTermsPage() {
  const siteSettings = await cmsClient.getSiteSettings(false);

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#333333] flex flex-col font-sans selection:bg-[#efda07]/30 selection:text-stone-900">
      <LiveSiteNavbar currentPath="/cy/terms" isCymraeg={true} siteSettings={siteSettings} />

      <main className="flex-1">
        {/* Floating Subpage Hero with Landscape Background & Wave Divider */}
        <SubpageHero
          title="TELERAU AC AMODAU"
          subtitle="Gwnewch yn siŵr eich bod yn darllen ac yn deall ein Telerau ac Amodau Archebu isod yn llawn cyn cadarnhau eich archeb."
          imageSrc="/images/wp/hero-bg.jpg"
          imageAlt="Golygfeydd Plas Hafod"
        />

        {/* Content Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm space-y-8 text-stone-700 text-sm sm:text-base leading-relaxed">
            <div>
              <h2 className="text-2xl font-architects uppercase text-stone-900 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#99a0c1]" />
                1. Cytundeb a Threfniadau Talu
              </h2>
              <p className="mb-3">
                Daw cytundeb rhwng y Gwesteion a&#39;r Perchennog i rym pan dderbynnir blaendal i sicrhau&#39;r
                arhosiad a phan roddir cadarnhad archebu sy&#39;n dangos dyddiadau gwyliau wedi&#39;u cadarnhau.
                Mae&#39;r contract yn rhwymo chi a holl aelodau eich parti.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone-600">
                <li>
                  Mae blaendal na ellir ei ad-dalu o <strong>£200 (fesul wythnos a archebir)</strong> yn daladwy
                  ar adeg archebu.
                </li>
                <li>
                  Rhaid talu archebion a wneir lai nag wyth wythnos cyn cyrraedd yn llawn, ynghyd â&#39;r
                  blaendal difrod ad-daladwy o £50.
                </li>
                <li>
                  Rhaid talu&#39;r gweddill ddim hwyrach nag <strong>8 wythnos cyn dechrau</strong> eich gwyliau.
                </li>
              </ul>
            </div>

            <div className="border-t border-stone-200 pt-8">
              <h2 className="text-2xl font-architects uppercase text-stone-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-[#efda07]" />
                2. Canslo ac Yswiriant Teithio
              </h2>
              <p className="mb-3">
                Rhaid hysbysu am bob cansliad yn ysgrifenedig. Os byddwch yn canslo mwy nag 8 wythnos cyn eich
                cyrraedd, caiff eich blaendal ei fforffedu. Os caiff ei ganslo lai nag 8 wythnos cyn cyrraedd,
                erys y balans llawn yn ddyledus ac ni ellir ei ad-dalu.
              </p>
              <p className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-amber-900 text-sm">
                <strong>Pwysig:</strong> Rydym yn eich cynghori&#39;n gryf i gymryd yswiriant teithio cynhwysfawr
                i gynnwys canslo, oedi fferi/hediad, neu ddigwyddiadau annisgwyl.
              </p>
            </div>

            <div className="border-t border-stone-200 pt-8">
              <h2 className="text-2xl font-architects uppercase text-stone-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-[#99a0c1]" />
                3. Cyrraedd, Ymadael a Niferoedd
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-stone-600">
                <li>
                  <strong>Cyrraedd:</strong> O 3:00pm ar ddiwrnod cyrraedd.
                </li>
                <li>
                  <strong>Ymadael:</strong> Erbyn 10:00am yn brydlon ar ddiwrnod gadael er mwyn caniatáu
                  glanhau a diheintio trylwyr.
                </li>
                <li>
                  <strong>Uchafswm Deiliadaeth:</strong> 4 person ar y mwyaf. Ni chaniateir partïon, cynulliadau
                  swnllyd, nac ymwelwyr dros nos heb awdurdod.
                </li>
                <li>
                  <strong>Dim Ysmygu:</strong> Dim ysmygu na fepio o gwbl yn unrhyw le y tu mewn i&#39;r adeilad.
                  Ni chaniateir canhwyllau y tu mewn i&#39;r tŷ.
                </li>
              </ul>
            </div>

            <div className="border-t border-stone-200 pt-8">
              <h2 className="text-2xl font-architects uppercase text-stone-900 mb-3 flex items-center gap-2">
                <Dog className="w-6 h-6 text-[#99a0c1]" />
                4. Polisi Anifeiliaid Anwes (Plas Hafod yn Unig)
              </h2>
              <p className="mb-3">
                Mae croeso cynnes i&#39;r rhan fwyaf o gŵn ym Mhlas Hafod (uchafswm o 2 gi fesul archeb). Ni
                chaniateir cŵn <strong>yn Bryn Bugeiliaid Bach</strong>.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stone-600">
                <li>Ni ddylid gadael anifeiliaid anwes heb oruchwyliaeth yn y bwthyn ar unrhyw adeg.</li>
                <li>
                  Ni chaniateir anifeiliaid anwes ar ddodrefn, soffas na gwelyau. Bydd costau glanhau
                  ychwanegol yn cael eu didynnu o flaendaliadau diogelwch os ceir blew ar ddillad gwely.
                </li>
                <li>
                  Mae gwesteion yn gyfrifol am godi baw ci yn yr ardd a&#39;i roi mewn biniau dynodedig yn y
                  sied. Darperir bagiau ci am ddim o dan sinc y gegin.
                </li>
              </ul>
            </div>

            <div className="border-t border-stone-200 pt-8">
              <h2 className="text-2xl font-architects uppercase text-stone-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#efda07]" />
                5. Ailgylchu a Gofal Eco-Gyfeillgar
              </h2>
              <p className="mb-3">
                Mae Plas Hafod yn falch o fod yn Hyrwyddwr Busnes Di-Blasdig ac yn encil eco-ymwybodol. Helpwch
                ni i amddiffyn ein hamgylchedd yn Eryri trwy ddidoli gwastraff i&#39;r cynwysyddion a ddarperir
                yn y sied:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="font-bold text-stone-800">Blychau Glas:</span>
                  <p className="text-stone-600 mt-1">
                    Poteli a jariau gwydr; Tuniau, caniau diod a ffoil; Poteli plastig, potiau, tybiau a
                    hambyrddau (dim bagiau); Cardfwrdd a phapur glân.
                  </p>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="font-bold text-stone-800">Biniau Brown:</span>
                  <p className="text-stone-600 mt-1">
                    Holl wastraff bwyd a phlicion bioddiraddadwy (dim hylifau/olewau).
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-stone-200 pt-8 text-xs text-stone-500">
              <p>
                Trwy osod archeb gyda ni rydych yn derbyn y Telerau ac Amodau hyn yn llawn. Diolchwn i chi am
                drin ein cartref gyda gofal a pharch ac edrychwn ymlaen at eich croesawu i Blas Hafod!
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <LiveSiteFooter isCymraeg={true} />
      </main>
    </div>
  );
}
