import type { Metadata } from 'next';
import Link from 'next/link';
import { CaseStudyBlock } from '@/components/CaseStudyBlock';
import { MobileStickyCta } from '@/components/MobileStickyCta';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Section';
import { caseStudies } from '@/content/case-studies';

export const metadata: Metadata = {
  title: 'Sample Work',
  description: 'Fictional demonstration systems Cedarline Analytics has built in Excel — dashboards, forecasts, and operating workbooks.',
};

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="border-b border-line">
          <div className="container-x">
            <div className="py-14 sm:py-16 lg:py-20">
              <Eyebrow>Sample Work</Eyebrow>
              <h1 className="mt-4 max-w-2xl text-[1.875rem] leading-[1.15] font-semibold tracking-[-0.024em] sm:text-4xl lg:text-[2.75rem]">
                See what Cedarline can actually build.
              </h1>
              <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.65] text-slate-body">
                These are fictional demonstration projects created to show the kinds of reporting,
                forecasting, and business systems Cedarline can build for small businesses.
              </p>
              <p className="mt-4 max-w-2xl text-[0.875rem] leading-relaxed text-slate-muted">
                These businesses are fictional and are not Cedarline clients.
              </p>

              <nav aria-label="Sample projects" className="mt-10 border-t border-line pt-2">
                <ul className="divide-y divide-line">
                  {caseStudies.map((study) => (
                    <li key={study.id}>
                      <Link
                        href={`#${study.id}`}
                        className="flex min-h-11 flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3.5 text-[0.9375rem] text-ink-900 transition-colors hover:text-brand-600"
                      >
                        <span className="font-medium">{study.name}</span>
                        <span className="text-slate-muted">{study.navLabel}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </section>

        <section className="container-x">
          <div className="space-y-16 py-14 sm:space-y-20 sm:py-16 lg:space-y-24 lg:py-20">
            {caseStudies.map((study) => (
              <CaseStudyBlock key={study.id} study={study} />
            ))}
          </div>
        </section>

        <section className="border-t border-line bg-mist-50">
          <div className="container-x">
            <div className="py-16 text-center sm:py-20">
              <h2 className="mx-auto max-w-xl text-[1.5rem] leading-[1.2] font-semibold tracking-[-0.018em] sm:text-[1.75rem]">
                Have a similar problem in your business?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[0.9375rem] leading-[1.6] text-slate-body">
                You don’t need to know exactly what should be built. Start with the problem, and
                Cedarline can help define the right solution.
              </p>
              <div className="mt-8 flex justify-center">
                <Button href="/#inquiry" variant="action" size="lg">
                  Start an Inquiry
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileStickyCta href="/#inquiry" targetId="work-page-has-no-local-inquiry-form" />
    </>
  );
}
