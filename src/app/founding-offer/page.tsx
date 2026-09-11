import type { Metadata } from 'next';
import { FaqAccordion } from '@/components/FaqAccordion';
import { HowItWorks } from '@/components/HowItWorks';
import { InquiryForm } from '@/components/InquiryForm';
import { MobileStickyCta } from '@/components/MobileStickyCta';
import { OfferHeader } from '@/components/OfferHeader';
import { ScreenshotTabs } from '@/components/ScreenshotTabs';
import { SiteFooter } from '@/components/SiteFooter';
import { Button, TextLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Section';
import { demonstrationDisclosure, findCaseStudy } from '@/content/case-studies';
import { offerFaq } from '@/content/faq';
import { goodFit, notFit, offer, offerPageIncluded } from '@/content/founding-offer';
import { offerSteps } from '@/content/how-it-works';

export const metadata: Metadata = {
  title: 'Founding Client Offer',
  description:
    'Fix one reporting, forecasting, or spreadsheet-system problem for $150 — a fixed introductory price for Cedarline’s first three paying clients.',
};

const blueRidge = findCaseStudy('blue-ridge');

const artifactProofPoints = [
  {
    title: 'Connected data',
    body: 'Leads, jobs, expenses, and profitability in one system.',
  },
  {
    title: 'Automatic flags',
    body: 'Overdue and unfinished work surfaces automatically.',
  },
  {
    title: 'Management visibility',
    body: 'Key operating and financial information in one place.',
  },
];

const compactFacts = ['$150 total', '3-business-day target turnaround', 'One defined business problem'];

export default function FoundingOfferPage() {
  return (
    <>
      <OfferHeader />
      <main id="main">
        {/* Offer hero */}
        <section className="border-b border-line bg-mist-50">
          <div className="container-x">
            <div className="py-14 sm:py-18 lg:py-20">
              <Eyebrow>Founding Client Offer</Eyebrow>
              <h1 className="mt-4 max-w-3xl text-[2rem] leading-[1.15] font-semibold tracking-[-0.026em] text-balance sm:text-[2.625rem] lg:text-[3rem]">
                Fix one reporting, forecasting, or spreadsheet problem for $150.
              </h1>
              <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.65] text-slate-body sm:text-lg">
                Cedarline is offering its first three paying clients a focused analytics or
                business-systems engagement at a fixed introductory price.
              </p>

              <dl className="mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-4 border-t border-line-strong pt-6 sm:grid-cols-3">
                {compactFacts.map((fact) => (
                  <div key={fact}>
                    <dd className="text-[1.0625rem] font-semibold text-ink-900">{fact}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Button href="#inquiry" variant="action" size="lg">
                  Start a Founding Client Inquiry
                </Button>
                <TextLink href="#artifact">See an example system →</TextLink>
              </div>

              <p className="mt-7 text-[0.875rem] text-slate-muted">No phone call required to get started.</p>
              <p className="mt-1.5 text-[0.875rem] text-slate-muted">{offer.clientsAvailable}</p>
            </div>
          </div>
        </section>

        {/* Real artifact */}
        <section id="artifact" aria-labelledby="artifact-heading" className="scroll-mt-24">
          <div className="container-x">
            <div className="py-16 sm:py-20">
              <h2
                id="artifact-heading"
                className="max-w-2xl text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.022em] sm:text-4xl"
              >
                See what the finished work can look like.
              </h2>

              <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
                <div className="min-w-0 lg:col-span-7">
                  <ScreenshotTabs views={blueRidge.views} workbookLabel={blueRidge.name} />
                  <p className="mt-4 text-[0.8125rem] leading-relaxed text-slate-muted">
                    {demonstrationDisclosure}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <dl className="divide-y divide-line border-t border-line lg:border-t-0">
                    {artifactProofPoints.map((point) => (
                      <div key={point.title} className="py-4 first:pt-0 lg:py-5 lg:first:pt-0">
                        <dt className="text-[0.9375rem] font-semibold text-ink-900">{point.title}</dt>
                        <dd className="mt-1.5 text-[0.9375rem] leading-[1.55] text-slate-body">
                          {point.body}
                        </dd>
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

        {/* What you get */}
        <section className="border-t border-line bg-mist-50">
          <div className="container-x">
            <div className="py-16 sm:py-20">
              <h2 className="max-w-2xl text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.022em] sm:text-4xl">
                One focused engagement with a clear scope.
              </h2>

              <div className="mt-9 grid gap-10 lg:grid-cols-12 lg:gap-14">
                <ul className="divide-y divide-line border-t border-line lg:col-span-7">
                  {offerPageIncluded.map((item) => (
                    <li key={item} className="py-3.5 text-[0.9375rem] leading-[1.5] text-slate-body">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-line pt-5 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                  <h3 className="text-eyebrow font-semibold tracking-[0.14em] text-slate-muted uppercase">
                    Payment
                  </h3>
                  <p className="mt-2.5 text-[1.0625rem] font-medium text-ink-900">{offer.paymentSplit}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <HowItWorks id="how-it-works" heading="How it works" steps={offerSteps} />

        {/* Good fit / not fit */}
        <section className="border-t border-line bg-mist-50">
          <div className="container-x">
            <div className="py-16 sm:py-20">
              <h2 className="max-w-2xl text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.022em] sm:text-4xl">
                A good fit for focused business problems.
              </h2>

              <div className="mt-9 grid gap-10 sm:grid-cols-2 lg:gap-14">
                <div>
                  <h3 className="text-eyebrow font-semibold tracking-[0.14em] text-moss-700 uppercase">
                    Good fit
                  </h3>
                  <ul className="mt-4 divide-y divide-line border-t border-line">
                    {goodFit.map((item) => (
                      <li key={item} className="py-3 text-[0.9375rem] leading-[1.5] text-slate-body">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-eyebrow font-semibold tracking-[0.14em] text-slate-muted uppercase">
                    Probably not the right fit
                  </h3>
                  <ul className="mt-4 divide-y divide-line border-t border-line">
                    {notFit.map((item) => (
                      <li key={item} className="py-3 text-[0.9375rem] leading-[1.5] text-slate-body">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Risk reversal */}
        <section className="border-t border-line">
          <div className="container-x">
            <div className="py-16 sm:py-20">
              <h2 className="max-w-2xl text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.022em] sm:text-4xl">
                The agreed functionality is the standard.
              </h2>
              <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.65] text-slate-body">
                {offer.functionalityCommitment}
              </p>
              <p className="mt-3 max-w-2xl text-[0.9375rem] text-slate-muted">
                Scope and expectations are confirmed before the first payment.
              </p>
            </div>
          </div>
        </section>

        {/* Landing page FAQ */}
        <section className="border-t border-line bg-mist-50">
          <div className="container-x">
            <div className="py-16 sm:py-20">
              <h2 className="max-w-2xl text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.022em] sm:text-4xl">
                Questions before you start.
              </h2>
              <div className="mt-10">
                <FaqAccordion items={offerFaq} groupName="offer-faq" />
              </div>
            </div>
          </div>
        </section>

        {/* Final offer + form */}
        <section id="inquiry" aria-labelledby="final-offer-heading" className="scroll-mt-24 border-t border-line">
          <div className="container-x">
            <div className="py-16 sm:py-20 lg:py-24">
              <h2
                id="final-offer-heading"
                className="max-w-xl text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.022em] sm:text-4xl"
              >
                One business problem. $150. Start with three answers.
              </h2>
              <p className="mt-4 max-w-lg text-[1.0625rem] leading-[1.65] text-slate-body">
                Founding Client pricing is available to Cedarline’s first three paying clients.
              </p>

              <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-6">
                <div>
                  <dd className="text-[0.9375rem] font-semibold text-ink-900">$150 total</dd>
                </div>
                <div>
                  <dd className="text-[0.9375rem] text-slate-body">$75 to start</dd>
                </div>
                <div>
                  <dd className="text-[0.9375rem] text-slate-body">$75 on completion</dd>
                </div>
              </dl>

              <div className="mt-10">
                <InquiryForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileStickyCta href="#inquiry" targetId="inquiry" />
    </>
  );
}
