import { ScreenShot } from '@/components/ScreenShot';
import { Button, TextLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Section';
import { findCaseStudy } from '@/content/case-studies';

const dashboardShot = findCaseStudy('carolina-landscaping').views[0].shot;

export function Hero() {
  return (
    <section id="top" className="border-b border-line bg-mist-50">
      <div className="container-x">
        <div className="grid items-center gap-12 pt-12 pb-16 sm:pt-16 sm:pb-20 lg:grid-cols-12 lg:gap-14 lg:pt-20 lg:pb-24">
          <div className="min-w-0 lg:col-span-5">
            <Eyebrow>Business Analytics &amp; Systems</Eyebrow>

            <h1 className="mt-5 text-[2rem] leading-[1.14] font-semibold tracking-[-0.026em] text-balance sm:text-[2.5rem] lg:text-[2.75rem] lg:leading-[1.1]">
              Run your business from clear numbers, not scattered spreadsheets.
            </h1>

            <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.65] text-slate-body sm:text-lg">
              Cedarline builds dashboards, forecasts, and spreadsheet systems for small businesses
              that need clearer reporting and better visibility into what’s actually happening.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href="#inquiry" variant="action" size="lg">
                Start an Inquiry
              </Button>
              <TextLink href="/work">See sample work →</TextLink>
            </div>

            <p className="mt-8 border-t border-line pt-5 text-[0.875rem] leading-relaxed text-slate-muted">
              See complete demonstration systems built in Excel.
            </p>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <ScreenShot
              shot={dashboardShot}
              label="Carolina Landscaping.xlsx — Management Dashboard"
              sizes="(min-width: 1024px) 58vw, (min-width: 640px) 90vw, 100vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
