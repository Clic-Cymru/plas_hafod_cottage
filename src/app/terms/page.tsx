import { Metadata } from 'next';
import { LiveSiteNavbar } from '@/components/navigation/LiveSiteNavbar';
import { LiveSiteFooter } from '@/components/navigation/LiveSiteFooter';
import { SubpageHero } from '@/components/navigation/SubpageHero';
import { FileText, CheckCircle2, AlertTriangle, ShieldCheck, Dog, Sparkles } from 'lucide-react';
import { cmsClient } from '@/cms/client';


export const metadata: Metadata = {
  title: 'Booking Terms and Conditions - Bwthyn Plas Hafod Cottage',
  description:
    'Full booking terms, cancellation policies, pet rules, and guidelines for Plas Hafod Cottage and Bryn Bugeiliaid Bach.',
};

function renderIcon(iconType?: string) {
  switch (iconType) {
    case 'alert':
      return <AlertTriangle className="w-6 h-6 text-[#efda07]" />;
    case 'dog':
      return <Dog className="w-6 h-6 text-[#99a0c1]" />;
    case 'clock':
      return <CheckCircle2 className="w-6 h-6 text-[#99a0c1]" />;
    case 'sparkles':
      return <Sparkles className="w-6 h-6 text-[#efda07]" />;
    case 'file':
      return <FileText className="w-6 h-6 text-[#99a0c1]" />;
    case 'shield':
    default:
      return <ShieldCheck className="w-6 h-6 text-[#99a0c1]" />;
  }
}

export default async function TermsPage() {
  const policySections = await cmsClient.getPolicySections(false);

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#333333] flex flex-col font-sans selection:bg-[#efda07]/30 selection:text-stone-900">
      <LiveSiteNavbar currentPath="/terms" isCymraeg={false} />

      <main className="flex-1">
        {/* Floating Subpage Hero with Landscape Background & Wave Divider */}
        <SubpageHero
          title="TERMS & CONDITIONS"
          subtitle="Please ensure you read and fully understand our Booking Terms and Conditions below before confirming your reservation."
          imageSrc="/images/wp/hero-bg.jpg"
          imageAlt="Plas Hafod landscape"
        />

        {/* Content Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm space-y-8 text-stone-700 text-sm sm:text-base leading-relaxed">
            {policySections.map((section, idx) => (
              <div key={section.id || idx} className={idx > 0 ? 'border-t border-stone-200 pt-8' : ''}>
                <h2 className="text-2xl font-architects uppercase text-stone-900 mb-3 flex items-center gap-2">
                  {renderIcon(section.icon)}
                  {section.title}
                </h2>
                {section.leadParagraphEn && (
                  <p className="mb-3">{section.leadParagraphEn}</p>
                )}
                {section.bulletsEn && section.bulletsEn.length > 0 && (
                  <ul className="list-disc pl-6 space-y-2 text-stone-600">
                    {section.bulletsEn.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div className="border-t border-stone-200 pt-8 text-xs text-stone-500">
              <p>
                By placing a booking with us you accept these Terms and Conditions in full. We thank you for
                treating our home with care and respect and look forward to welcoming you to Plas Hafod!
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <LiveSiteFooter isCymraeg={false} />
      </main>
    </div>
  );
}
