import { ScreenshotTabs } from '@/components/ScreenshotTabs';
import { demonstrationDisclosure, type CaseStudy } from '@/content/case-studies';

export function CaseStudyBlock({ study }: { study: CaseStudy }) {
  const headingId = `${study.id}-heading`;

  return (
    <article id={study.id} aria-labelledby={headingId} className="scroll-mt-24 border-t border-line pt-12 sm:pt-14">
      <p className="text-eyebrow font-semibold tracking-[0.14em] text-brand-600 uppercase">
        {study.category}
      </p>
      <h2 id={headingId} className="mt-3 text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.022em] sm:text-[2rem]">
        {study.name}
      </h2>

      <div className="mt-9 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="min-w-0 lg:col-span-7">
          <ScreenshotTabs views={study.views} workbookLabel={study.name} />
        </div>

        <div className="lg:col-span-5">
          <div className="space-y-6">
            <div className="border-t border-line pt-4">
              <h3 className="text-eyebrow font-semibold tracking-[0.14em] text-slate-muted uppercase">
                Challenge
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-[1.65] text-slate-body">{study.challenge}</p>
            </div>
            <div className="border-t border-line pt-4">
              <h3 className="text-eyebrow font-semibold tracking-[0.14em] text-slate-muted uppercase">
                Solution
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-[1.65] text-slate-body">{study.solution}</p>
            </div>
            <div className="border-t border-line pt-4">
              <h3 className="text-eyebrow font-semibold tracking-[0.14em] text-slate-muted uppercase">
                Result
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-[1.65] text-ink-800">{study.result}</p>
            </div>
          </div>

          <div className="mt-6 border-t border-line pt-4">
            <h3 className="text-eyebrow font-semibold tracking-[0.14em] text-slate-muted uppercase">
              Capabilities demonstrated
            </h3>
            <ul className="mt-3 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-1">
              {study.capabilities.map((capability) => (
                <li key={capability} className="border-t border-line py-2.5 text-[0.875rem] text-slate-body">
                  {capability}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 border-t border-line pt-4 text-[0.8125rem] leading-relaxed text-slate-muted">
            {demonstrationDisclosure}
          </p>
        </div>
      </div>
    </article>
  );
}
