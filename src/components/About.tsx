import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Section';
import { site } from '@/content/site';

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-24 bg-mist-50">
      <div className="container-x">
        <div className="py-20 sm:py-24 lg:py-28">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
            <div data-reveal className="lg:col-span-5">
              <div className="relative mx-auto max-w-[22rem] lg:mx-0 lg:max-w-none">
                <Image
                  src="/brand/jake-hayton-headshot.webp"
                  alt="Jake Hayton, founder of Cedarline Analytics"
                  width={1000}
                  height={1333}
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 22rem, 88vw"
                  className="w-full rounded-xl border border-line bg-white object-cover shadow-panel"
                />
                <div className="mt-5 border-t border-line pt-4">
                  <p className="text-[0.9375rem] font-semibold text-ink-900">{site.founder}</p>
                  <p className="mt-0.5 text-[0.875rem] text-slate-muted">
                    Founder, {site.name}
                  </p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-2 inline-block rounded text-[0.875rem] text-brand-600 underline decoration-brand-600/30 underline-offset-4 transition-colors hover:decoration-brand-600"
                  >
                    {site.email}
                  </a>
                </div>
              </div>
            </div>

            <div data-reveal data-reveal-delay="100" className="lg:col-span-7">
              <Eyebrow>About</Eyebrow>
              <h2
                id="about-heading"
                className="mt-5 text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.022em] sm:text-4xl lg:text-[2.625rem]"
              >
                One person, accountable for the work
              </h2>

              <div className="mt-6 space-y-5 text-[1.0625rem] leading-[1.7] text-slate-body">
                <p>
                  Cedarline Analytics was founded by Jake Hayton, an economics student at the
                  University of North Carolina at Chapel Hill, working in financial analysis,
                  forecasting and advanced Excel systems.
                </p>
                <p>
                  Cedarline exists because of a specific gap. Plenty of small businesses are large
                  enough to have real operational complexity — jobs, crews, seasonality, thin
                  margins — but not large enough to employ anyone whose job is to make sense of the
                  numbers. Reporting ends up living in whichever spreadsheet grew the fastest, and
                  it gets harder to trust every year.
                </p>
                <p>
                  The work is the reporting layer those businesses would have if they did employ an
                  analyst: dashboards, forecasts and operating workbooks that are clearly built,
                  honest about their assumptions, and maintainable by the person who actually has to
                  use them.
                </p>
                <p className="text-ink-800">
                  Every project is handled by me directly. You will know exactly who built your
                  system, and exactly who to email when you have a question about it.
                </p>
              </div>

              <dl className="mt-10 grid gap-x-10 gap-y-6 border-t border-line pt-8 sm:grid-cols-2">
                <div>
                  <dt className="text-eyebrow font-semibold tracking-[0.14em] text-slate-muted uppercase">
                    Focus
                  </dt>
                  <dd className="mt-2 text-[0.9375rem] leading-[1.6] text-slate-body">
                    Financial and economic analysis, forecasting, and Excel and Google Sheets
                    systems.
                  </dd>
                </div>
                <div>
                  <dt className="text-eyebrow font-semibold tracking-[0.14em] text-slate-muted uppercase">
                    Works with
                  </dt>
                  <dd className="mt-2 text-[0.9375rem] leading-[1.6] text-slate-body">
                    Owner-operated service businesses — home services, contractors, landscaping,
                    cleaning, property management and professional services.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
