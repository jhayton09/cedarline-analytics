import { ScreenshotTabs } from '@/components/ScreenshotTabs';
import { TextLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Section';
import { demonstrationDisclosure, findCaseStudy } from '@/content/case-studies';

const blueRidge = findCaseStudy('blue-ridge-home-services');
const [managementDashboard, jobTracking] = blueRidge.views;

// The homepage frames the same two Blue Ridge screenshots as a shorter, more
// marketing-facing pair of views than the full case study on /work uses.
const featuredViews = [
  { label: 'Operations View', shot: jobTracking.shot },
  { label: 'Management Dashboard', shot: managementDashboard.shot },
];

const proofPoints = [
  {
    title: 'Connected data',
    body: 'Leads, jobs, expenses, and profitability in one system.',
  },
  {
    title: 'Automatic attention flags',
    body: 'Outstanding and overdue work surfaces without manual review.',
  },
  {
    title: 'Management visibility',
    body: 'Key operating and financial metrics update from the underlying records.',
  },
];

export function FeaturedWork() {
  return (
    <section id="featured-work" aria-labelledby="featured-work-heading" className="scroll-mt-24">
      <div className="container-x">
        <div className="py-16 sm:py-20 lg:py-24">
          <Eyebrow>Featured Work</Eyebrow>
          <h2
            id="featured-work-heading"
            className="mt-4 max-w-2xl text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.022em] sm:text-4xl"
          >
            See the system, not just the promise.
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-[1.65] text-slate-body">
            Blue Ridge Home Services is a fictional demonstration business built to show how
            Cedarline can turn disconnected operating data into one usable management system.
          </p>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="min-w-0 lg:col-span-8">
              <ScreenshotTabs views={featuredViews} workbookLabel="Blue Ridge Home Services" />
              <p className="mt-4 text-[0.8125rem] leading-relaxed text-slate-muted">
                {demonstrationDisclosure}
              </p>
            </div>

            <div className="lg:col-span-4">
              <dl className="divide-y divide-line border-t border-line lg:border-t-0">
                {proofPoints.map((point) => (
                  <div key={point.title} className="py-4 first:pt-0 lg:py-5 lg:first:pt-0">
                    <dt className="text-[0.9375rem] font-semibold text-ink-900">{point.title}</dt>
                    <dd className="mt-1.5 text-[0.9375rem] leading-[1.55] text-slate-body">{point.body}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 border-t border-line pt-6">
                <TextLink href="/work">See all sample work →</TextLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
