import { ArrowRight, Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Section';
import { mailto } from '@/content/site';

const included = [
  'A custom solution built around one focused problem',
  'A 5–10 minute recorded walkthrough of how it works',
  'One reasonable revision round',
  'Seven days of post-delivery email support',
];

const projectTypes = [
  'Management dashboard',
  'KPI or reporting system',
  'Financial forecast',
  'Scenario model',
  'Break-even analysis',
  'Spreadsheet automation',
  'Improving an existing Excel or Sheets workflow',
];

const terms = [
  { label: 'Fee', value: '$150 total — $75 to begin, $75 on completion' },
  { label: 'Target turnaround', value: '3 business days from receiving the information and data' },
  { label: 'Scope', value: 'Agreed in writing before any work begins' },
];

export function FoundingOffer() {
  return (
    <section
      id="founding-offer"
      aria-labelledby="founding-heading"
      className="on-dark scroll-mt-24 bg-ink-900 text-white"
    >
      {/* One quiet directional wash; the section reads as a distinct chapter, not a promo banner. */}
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_32rem_at_18%_0%,rgba(47,45,183,0.28),transparent_65%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />

        <div className="container-x relative">
          <div className="py-20 sm:py-24 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
              <div data-reveal className="lg:col-span-6">
                <Eyebrow tone="dark">Founding Client Offer</Eyebrow>
                <h2
                  id="founding-heading"
                  className="mt-5 text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.022em] text-white sm:text-4xl lg:text-[2.625rem]"
                >
                  Founding Client Engagements
                </h2>
                <p className="mt-3 text-[1.0625rem] font-medium text-white/60">
                  Introductory pricing for the first three clients.
                </p>

                <div className="mt-6 space-y-5 text-[1.0625rem] leading-[1.7] text-white/70">
                  <p>
                    Cedarline is opening three founding-client engagements at an introductory rate
                    while refining its delivery process. Each engagement focuses on one clearly
                    defined reporting, forecasting, or business-system problem.
                  </p>
                  <p>
                    Together we identify one focused reporting, forecasting or spreadsheet problem,
                    and Cedarline builds a solution around it.
                  </p>
                </div>

                <div className="mt-10">
                  <h3 className="text-eyebrow font-semibold tracking-[0.14em] text-white/60 uppercase">
                    Suitable project types
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {projectTypes.map((type) => (
                      <li
                        key={type}
                        className="rounded-full border border-white/15 bg-white/4 px-3 py-1.5 text-[0.8125rem] text-white/75"
                      >
                        {type}
                      </li>
                    ))}
                  </ul>
                </div>

                <blockquote className="mt-10 border-l-2 border-moss-400/60 pl-5">
                  <p className="text-[1.0625rem] leading-[1.6] text-white/85">
                    If the final deliverable does not perform the functionality agreed upon before
                    the project begins, Cedarline Analytics will correct it at no additional charge.
                  </p>
                </blockquote>
              </div>

              <div data-reveal data-reveal-delay="120" className="lg:col-span-6">
                <div className="rounded-xl border border-white/12 bg-white/[0.045] p-6 backdrop-blur-[2px] sm:p-8">
                  <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/12 pb-6">
                    <div>
                      <p className="text-eyebrow font-semibold tracking-[0.14em] text-white/60 uppercase">
                        Project fee
                      </p>
                      <p className="mt-2 flex items-baseline gap-2">
                        <span className="text-5xl font-semibold tracking-[-0.03em] text-white tnum">
                          $150
                        </span>
                        <span className="text-[0.9375rem] text-white/65">total</span>
                      </p>
                    </div>
                    <p className="rounded-full border border-moss-400/35 bg-moss-400/10 px-3 py-1.5 text-[0.75rem] font-semibold tracking-[0.06em] text-moss-400 uppercase">
                      First 3 clients
                    </p>
                  </div>

                  <h3 className="mt-7 text-eyebrow font-semibold tracking-[0.14em] text-white/60 uppercase">
                    What is included
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {included.map((item) => (
                      <li key={item} className="flex gap-3 text-[0.9375rem] leading-[1.55] text-white/80">
                        <svg
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden="true"
                          className="mt-[0.3rem] h-3.5 w-3.5 shrink-0 text-moss-400"
                        >
                          <path
                            d="M3 8.5l3.2 3.2L13 5"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-8 divide-y divide-white/10 border-t border-white/12">
                    {terms.map((term) => (
                      <div key={term.label} className="grid gap-1 py-3.5 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-[0.8125rem] tracking-[0.02em] text-white/60">
                          {term.label}
                        </dt>
                        <dd className="text-[0.9375rem] leading-[1.5] text-white/80 sm:col-span-2">
                          {term.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <Button
                    href={mailto.foundingOffer}
                    size="lg"
                    variant="onDarkPrimary"
                    className="group mt-8 w-full"
                  >
                    Ask About the Founding Offer
                    <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Button>
                  <p className="mt-3.5 text-center text-[0.8125rem] text-white/60">
                    Opens an email to Jake. No form, no automated follow-up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
