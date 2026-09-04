import { ScreenShot } from '@/components/ScreenShot';
import { SectionHeader } from '@/components/ui/Section';
import { caseStudies, demonstrationDisclosure, type CaseStudy } from '@/content/case-studies';

function DemoBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-moss-600/25 bg-moss-600/6 px-2.5 py-1 text-[0.6875rem] font-semibold tracking-[0.06em] text-moss-700 uppercase">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-moss-600" />
      Demonstration project
    </span>
  );
}

function DetailBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line pt-4">
      <h4 className="text-eyebrow font-semibold tracking-[0.14em] text-slate-muted uppercase">
        {label}
      </h4>
      <div className="mt-2.5 space-y-3 text-[0.9375rem] leading-[1.65] text-slate-body">
        {children}
      </div>
    </div>
  );
}

function CaseStudyBlock({ study, index }: { study: CaseStudy; index: number }) {
  const [primary, secondary] = study.shots;
  const reversed = index % 2 === 1;

  return (
    <article
      aria-labelledby={`${study.id}-heading`}
      className="border-t border-line pt-12 sm:pt-14 lg:pt-16"
    >
      <header data-reveal className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="lg:col-span-7">
          <p className="text-eyebrow font-semibold tracking-[0.14em] text-brand-600 uppercase">
            {study.category}
          </p>
          <h3
            id={`${study.id}-heading`}
            className="mt-4 text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.022em] sm:text-[2rem]"
          >
            {study.name}
          </h3>
          <p className="mt-2 text-[1.0625rem] text-slate-body">{study.subtitle}</p>
        </div>
        <div className="lg:col-span-5 lg:flex lg:justify-end lg:pb-1.5">
          <DemoBadge />
        </div>
      </header>

      <div
        data-reveal
        className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12 xl:gap-14"
      >
        <div className={`min-w-0 lg:col-span-7 ${reversed ? 'lg:order-2' : ''}`}>
          <ScreenShot
            shot={primary}
            label={`${study.name}.xlsx — ${primary.sheet}`}
            sizes="(min-width: 1024px) 56vw, (min-width: 640px) 90vw, 100vw"
          />
        </div>

        <div className={`min-w-0 lg:col-span-5 ${reversed ? 'lg:order-1' : ''}`}>
          <div className="space-y-6">
            <DetailBlock label="Challenge">
              <p>{study.challenge}</p>
            </DetailBlock>
            <DetailBlock label="Solution">
              {study.solution.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </DetailBlock>
            <DetailBlock label="Result">
              <p className="text-ink-800">{study.result}</p>
            </DetailBlock>
          </div>
        </div>
      </div>

      <div data-reveal className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
        <div className="min-w-0 lg:col-span-8">
          <ScreenShot
            shot={secondary}
            label={`${study.name}.xlsx — ${secondary.sheet}`}
            sizes="(min-width: 1024px) 64vw, (min-width: 640px) 90vw, 100vw"
          />
        </div>

        <div className="lg:col-span-4">
          <h4 className="text-eyebrow font-semibold tracking-[0.14em] text-slate-muted uppercase">
            Capabilities demonstrated
          </h4>
          <ul className="mt-4 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-1">
            {study.capabilities.map((capability) => (
              <li
                key={capability}
                className="border-t border-line py-2.5 text-[0.875rem] text-slate-body"
              >
                {capability}
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-line pt-4 text-[0.8125rem] leading-relaxed text-slate-muted">
            Built in {study.builtWith}. {demonstrationDisclosure}
          </p>
        </div>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="scroll-mt-24 bg-mist-50">
      <div className="container-x">
        <div className="py-20 sm:py-24 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <SectionHeader
              eyebrow="Selected Work"
              title={<span id="work-heading">Three systems, built end to end</span>}
              lede="Each project below was built by Cedarline to demonstrate a specific capability. Every screenshot is the real workbook — click any of them to inspect the detail."
              className="lg:col-span-7"
            />

            <div data-reveal className="lg:col-span-5">
              <div className="rounded-lg border border-line bg-white p-5 sm:p-6">
                <p className="text-eyebrow font-semibold tracking-[0.14em] text-moss-700 uppercase">
                  A note on these projects
                </p>
                <p className="mt-3 text-[0.9375rem] leading-[1.65] text-slate-body">
                  Carolina Landscaping, Queen City Cleaning and Blue Ridge Home Services are
                  fictional businesses. Cedarline built these workbooks itself to show what the
                  work looks like — they are not client engagements, and no figure on this page
                  represents a real company&rsquo;s results.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-20 lg:space-y-24">
            {caseStudies.map((study, index) => (
              <CaseStudyBlock key={study.id} study={study} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
