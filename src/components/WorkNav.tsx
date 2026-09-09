import Link from 'next/link';
import { TextLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Section';
import { caseStudies } from '@/content/case-studies';

/**
 * Replaces the old homepage Featured Work section — a full screenshot
 * presentation duplicated what the hero and /work already show. This is
 * just a compact index into the three /work case studies.
 */
export function WorkNav() {
  return (
    <section id="work-nav" aria-labelledby="work-nav-heading" className="scroll-mt-24">
      <div className="container-x">
        <div className="py-14 sm:py-16">
          <Eyebrow>Work</Eyebrow>
          <h2
            id="work-nav-heading"
            className="mt-4 max-w-2xl text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.022em] sm:text-4xl"
          >
            See the work behind Cedarline.
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-[1.65] text-slate-body">
            Explore three complete demonstration systems covering reporting, forecasting, and
            operations.
          </p>

          <ul className="mt-9 max-w-2xl divide-y divide-line border-t border-line">
            {caseStudies.map((study) => (
              <li key={study.id}>
                <Link
                  href={`/work#${study.id}`}
                  className="group flex min-h-11 flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4"
                >
                  <span className="text-[1.0625rem] font-medium text-ink-900">{study.name}</span>
                  <span className="text-[0.9375rem] text-slate-muted transition-colors duration-200 group-hover:text-brand-600">
                    {study.navLabel} →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <TextLink href="/work">View all sample work →</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
