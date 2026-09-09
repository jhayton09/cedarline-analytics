import type { Metadata } from 'next';
import Image from 'next/image';
import { MobileStickyCta } from '@/components/MobileStickyCta';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { Button, TextLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Section';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Jake Hayton founded Cedarline Analytics to help small businesses build clearer reporting, practical forecasts, and more usable internal systems.',
};

const principles = [
  {
    title: 'You work directly with me.',
    body: 'There is no account manager between the business problem and the person building the solution.',
  },
  {
    title: 'Scope comes first.',
    body: 'The deliverable, information needed, price, and timeline are agreed before work begins.',
  },
  {
    title: 'The system should remain usable after delivery.',
    body: 'The goal is not to build something impressive-looking that only its creator understands.',
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* About hero */}
        <section className="border-b border-line bg-mist-50">
          <div className="container-x">
            <div className="py-14 sm:py-16 lg:py-20">
              <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                <div className="order-1 lg:order-2 lg:col-span-4">
                  <Image
                    src="/brand/jake-hayton-headshot.webp"
                    alt="Jake Hayton, founder of Cedarline Analytics"
                    width={1000}
                    height={1333}
                    priority
                    sizes="(min-width: 1024px) 26vw, (min-width: 640px) 22rem, 88vw"
                    className="w-full max-w-[18rem] border border-line bg-white object-cover lg:max-w-none"
                  />
                </div>

                <div className="order-2 lg:order-1 lg:col-span-8">
                  <Eyebrow>About</Eyebrow>
                  <h1 className="mt-4 text-[2rem] leading-[1.15] font-semibold tracking-[-0.026em] sm:text-[2.5rem]">
                    Built by Jake Hayton.
                  </h1>
                  <p className="mt-5 max-w-xl text-[1.0625rem] leading-[1.65] text-slate-body">
                    Jake founded Cedarline Analytics to help small businesses build clearer
                    reporting, practical forecasts, and more usable internal systems.
                  </p>

                  <dl className="mt-7 space-y-1.5 border-t border-line pt-5 text-[0.9375rem]">
                    <div>
                      <dt className="sr-only">Name</dt>
                      <dd className="font-semibold text-ink-900">Jake Hayton</dd>
                    </div>
                    <div>
                      <dt className="sr-only">Role</dt>
                      <dd className="text-slate-body">Founder, {site.name}</dd>
                    </div>
                    <div>
                      <dt className="sr-only">Education</dt>
                      <dd className="text-slate-body">
                        Economics — University of North Carolina at Chapel Hill
                      </dd>
                    </div>
                    <div>
                      <dt className="sr-only">Location</dt>
                      <dd className="text-slate-muted">Based in {site.region}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Cedarline exists */}
        <section className="border-b border-line">
          <div className="container-x">
            {/* ~18% tighter than the hero/CTA sections' py-14/py-16 — this and the three
                sections below have less content and were reading as over-spaced. */}
            <div className="py-11.5 sm:py-13">
              <h2 className="max-w-2xl text-[1.5rem] leading-[1.2] font-semibold tracking-[-0.018em] sm:text-[1.75rem]">
                Small businesses often need the work of an analyst before they need a full-time
                analyst.
              </h2>
              <div className="mt-5 max-w-2xl space-y-4 text-[0.9375rem] leading-[1.65] text-slate-body">
                <p>
                  As businesses grow, their reporting and operating systems often grow with
                  them—new spreadsheets, new processes, and more information to keep track of.
                  Eventually, getting a clear answer can take more work than it should.
                </p>
                <p>
                  Cedarline exists to solve focused versions of that problem: clearer reporting,
                  better forecasting, and spreadsheet systems that are easier to use and maintain.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Background */}
        <section className="border-b border-line bg-mist-50">
          <div className="container-x">
            <div className="py-11.5 sm:py-13">
              <h2 className="max-w-2xl text-[1.5rem] leading-[1.2] font-semibold tracking-[-0.018em] sm:text-[1.75rem]">
                A foundation in economics and analytical work.
              </h2>
              <div className="mt-5 max-w-2xl space-y-4 text-[0.9375rem] leading-[1.65] text-slate-body">
                <p>
                  Jake studies economics at UNC Chapel Hill and has experience working with
                  financial analysis, forecasting, modeling, and advanced Excel systems.
                </p>
                <p>
                  Cedarline applies those skills to practical small-business problems—building
                  tools that help owners understand what is happening without requiring
                  unnecessarily complicated software.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How I work */}
        <section className="border-b border-line">
          <div className="container-x">
            <div className="py-11.5 sm:py-13">
              <h2 className="max-w-2xl text-[1.5rem] leading-[1.2] font-semibold tracking-[-0.018em] sm:text-[1.75rem]">
                Direct, scoped, and practical.
              </h2>

              <ul className="mt-9 grid divide-y divide-line border-t border-line sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                {principles.map((principle) => (
                  <li key={principle.title} className="py-6 first:pt-0 sm:px-8 sm:py-0 first:sm:pl-0 last:sm:pr-0">
                    <h3 className="text-[1.0625rem] font-semibold tracking-[-0.012em] text-ink-900">
                      {principle.title}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-[1.6] text-slate-body">
                      {principle.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Proof */}
        <section className="border-b border-line bg-mist-50">
          <div className="container-x">
            <div className="py-11.5 sm:py-13">
              <h2 className="max-w-2xl text-[1.5rem] leading-[1.2] font-semibold tracking-[-0.018em] sm:text-[1.75rem]">
                Judge the work directly.
              </h2>
              <p className="mt-5 max-w-2xl text-[0.9375rem] leading-[1.65] text-slate-body">
                Cedarline publishes complete demonstration systems so prospective clients can
                inspect the kind of work being offered before starting a project.
              </p>
              <div className="mt-6">
                <TextLink href="/work">See sample work →</TextLink>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section>
          <div className="container-x">
            <div className="py-16 text-center sm:py-20">
              <h2 className="mx-auto max-w-xl text-[1.5rem] leading-[1.2] font-semibold tracking-[-0.018em] sm:text-[1.75rem]">
                Have a business problem Cedarline may be able to help with?
              </h2>
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
      <MobileStickyCta href="/#inquiry" targetId="about-page-has-no-local-inquiry-form" />
    </>
  );
}
