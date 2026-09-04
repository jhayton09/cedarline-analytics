import { ScreenShot } from '@/components/ScreenShot';
import { ArrowRight, Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Section';
import { caseStudies } from '@/content/case-studies';

const [carolina] = caseStudies;
const [dashboardShot, dataShot] = carolina.shots;

const meta = [
  { label: 'Built in', value: 'Excel & Google Sheets' },
  { label: 'Based in', value: 'North Carolina' },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-mist-50 to-white">
      {/* A single restrained wash behind the composition — no blobs, no glow. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(70rem_28rem_at_78%_-6rem,rgba(47,45,183,0.07),transparent_70%)]"
      />

      <div className="container-x relative">
        <div className="grid items-center gap-14 pt-14 pb-20 sm:pt-20 sm:pb-24 lg:grid-cols-12 lg:gap-12 lg:pt-24 lg:pb-32">
          <div className="min-w-0 lg:col-span-5" data-reveal>
            <Eyebrow>Analytics &amp; Systems Consultancy</Eyebrow>

            <h1 className="mt-6 text-[2.125rem] leading-[1.1] font-semibold tracking-[-0.028em] text-balance sm:text-[2.75rem] lg:text-[3.125rem] lg:leading-[1.06]">
              Business Analytics &amp; Systems for Small Businesses
            </h1>

            <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.65] text-slate-body sm:text-lg">
              Cedarline turns scattered business data into clear reporting, forecasts you can plan
              against, and systems that show what is actually happening in your business.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="#contact" size="lg" className="group">
                Discuss Your Business
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
              <Button href="#work" size="lg" variant="secondary">
                View Our Work
              </Button>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-2 gap-x-6 gap-y-2 border-t border-line pt-6">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="text-eyebrow font-semibold tracking-[0.14em] text-slate-muted uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 text-[0.9375rem] text-ink-800">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="min-w-0 lg:col-span-7" data-reveal data-reveal-delay="120">
            <div className="relative lg:-mr-6 xl:-mr-12">
              <ScreenShot
                shot={dashboardShot}
                label="Carolina Landscaping.xlsx — Dashboard"
                sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, (min-width: 640px) 90vw, 100vw"
                priority
                hideCaption
                className="relative z-10"
              />

              {/* The data sheet the dashboard is calculated from, layered in front to
                  show the system underneath rather than just the chart on top. */}
              <div className="relative z-20 mt-4 sm:absolute sm:-bottom-14 sm:-left-6 sm:mt-0 sm:w-[62%] lg:-bottom-16 lg:-left-10">
                <ScreenShot
                  shot={dataShot}
                  label={`Carolina Landscaping.xlsx — ${dataShot.sheet}`}
                  sizes="(min-width: 1280px) 440px, (min-width: 1024px) 36vw, (min-width: 640px) 56vw, 100vw"
                  hideCaption
                  className="shadow-float sm:rounded-xl"
                />
              </div>
            </div>

            <p className="mt-6 text-[0.8125rem] leading-relaxed text-slate-muted sm:mt-24 lg:mt-28">
              From a demonstration project built by Cedarline. The dashboard above is calculated
              entirely from the monthly data sheet in front of it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
