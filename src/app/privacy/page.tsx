import type { Metadata } from 'next';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { Eyebrow } from '@/components/ui/Section';
import { mailto, site } from '@/content/site';

// Approved policy — replaces the earlier draft shell. No robots override
// here: this page now inherits the default `index: true, follow: true`
// from the root layout, same as every other real page on the site.
//
// This is the actual, reviewed policy text; it must not be materially
// rewritten without going back through the same approval this content came
// from. If site behavior changes in a way that contradicts a claim below
// (a new service provider, a new tracking technology, a new data field
// collected), update this page — don't let the two drift apart silently.
export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Cedarline Analytics collects and uses information submitted through its inquiry form, the service providers involved, and your choices.',
};

/** External link: same underline treatment as the rest of the site's body copy, opening in a new tab since it leaves cedarlineanalytics.com. */
function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-ink-900 underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink-900"
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="text-[1.25rem] leading-[1.3] font-semibold tracking-[-0.012em] text-ink-900">
        {heading}
      </h2>
      <div className="mt-4 space-y-4 text-[0.9375rem] leading-[1.7] text-slate-body">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="container-x">
          <div className="max-w-2xl py-16 sm:py-20">
            <Eyebrow>Privacy</Eyebrow>
            <h1 className="mt-4 text-[1.875rem] leading-[1.15] font-semibold tracking-[-0.024em] sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-[0.9375rem] text-slate-muted">Effective September 9, 2026</p>

            <div className="mt-8 space-y-4 text-[0.9375rem] leading-[1.7] text-slate-body">
              <p>
                Cedarline Analytics (&ldquo;Cedarline,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
                &ldquo;our&rdquo;) respects the privacy of people who visit cedarlineanalytics.com
                and contact Cedarline through the website.
              </p>
              <p>
                This Privacy Policy explains what information is collected through the site, how
                it is used, the service providers involved, and the choices available to you.
              </p>
            </div>

            <div className="mt-10 space-y-8">
              <Section heading="Information You Provide">
                <p>
                  If you submit an inquiry through the Cedarline website, we collect the
                  information you choose to provide through the inquiry form:
                </p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>Business email address</li>
                  <li>Business name</li>
                  <li>
                    The category of problem you are trying to improve: Reporting, Forecasting,
                    Spreadsheet / process, or Not sure yet
                  </li>
                </ul>
                <p>
                  The inquiry form does not ask for a phone number, budget, payment information,
                  or sensitive personal information.
                </p>
                <p>Please do not submit sensitive information through the inquiry form.</p>
              </Section>

              <Section heading="How We Use Inquiry Information">
                <p>Cedarline uses inquiry information to:</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>Review and respond to your inquiry</li>
                  <li>Understand the general type of business problem you are asking about</li>
                  <li>Determine whether Cedarline may be a reasonable fit</li>
                  <li>Communicate with you about a potential project</li>
                  <li>Define project scope if you choose to continue</li>
                </ul>
                <p>Submitting an inquiry does not enroll you in a marketing mailing list.</p>
                <p>
                  Cedarline does not use an inquiry submission as consent to send unrelated
                  promotional email.
                </p>
                <p>Cedarline does not sell personal information.</p>
                <p>
                  Cedarline does not share personal information for targeted or cross-context
                  behavioral advertising.
                </p>
              </Section>

              <Section heading="Service Providers">
                <p>Cedarline uses service providers to operate the website and deliver inquiries.</p>

                <div>
                  <p className="font-medium text-ink-900">Formspree</p>
                  <p className="mt-1.5">
                    Inquiry-form submissions are transmitted to Formspree, which processes the
                    submission so it can be delivered to Cedarline. Formspree may also process
                    technical information associated with the request, such as IP address, browser
                    information, access time, and referring information, in accordance with its
                    own privacy practices. See{' '}
                    <ExternalLink href="https://formspree.io/legal/privacy-policy/">
                      Formspree&rsquo;s Privacy Policy
                    </ExternalLink>
                    .
                  </p>
                  <p className="mt-2.5">
                    Cedarline&rsquo;s current Formspree plan provides 30 days of submission history
                    in the Formspree dashboard. Formspree may retain certain information for
                    different periods when necessary to operate its services, maintain security,
                    comply with law, or meet its own obligations.
                  </p>
                </div>

                <div>
                  <p className="font-medium text-ink-900">Google Workspace</p>
                  <p className="mt-1.5">
                    Inquiry notifications are delivered to Cedarline&rsquo;s business email through
                    Google Workspace. As a result, information contained in an inquiry may be
                    processed and stored through Google&rsquo;s email services. See{' '}
                    <ExternalLink href="https://policies.google.com/privacy">
                      Google&rsquo;s Privacy Policy
                    </ExternalLink>
                    .
                  </p>
                </div>

                <div>
                  <p className="font-medium text-ink-900">Vercel</p>
                  <p className="mt-1.5">
                    The Cedarline website is hosted by Vercel. In operating the hosting
                    infrastructure, Vercel may process ordinary technical and network information
                    associated with website visits, including IP address, coarse location derived
                    from IP address, request information, device or system information, and
                    security or diagnostic information. See{' '}
                    <ExternalLink href="https://vercel.com/legal/privacy-policy">
                      Vercel&rsquo;s Privacy Notice
                    </ExternalLink>
                    .
                  </p>
                </div>

                <p>Cedarline does not use any other service provider for this website.</p>
              </Section>

              <Section heading="Analytics, Advertising, and Tracking">
                <p>Cedarline does not currently use:</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>Website analytics tools</li>
                  <li>Advertising pixels</li>
                  <li>Session-recording tools</li>
                  <li>Heatmaps</li>
                  <li>Cross-site advertising trackers</li>
                  <li>Marketing cookies</li>
                </ul>
                <p>The site does not use inquiry information to build advertising profiles.</p>
                <p>
                  Ordinary hosting, security, and form-processing providers may process technical
                  information necessary to provide their services as described above.
                </p>
              </Section>

              <Section heading="Do Not Track and Similar Signals">
                <p>
                  Cedarline does not currently engage in cross-site behavioral tracking on this
                  website.
                </p>
                <p>
                  Because Cedarline does not use the site for cross-site behavioral tracking, the
                  site does not change its behavior in response to browser &ldquo;Do Not
                  Track&rdquo; signals.
                </p>
                <p>
                  If Cedarline&rsquo;s tracking practices materially change in the future, this
                  Privacy Policy will be updated before or when those practices are introduced as
                  appropriate.
                </p>
              </Section>

              <Section heading="How Long We Keep Information">
                <p>
                  For an inquiry that does not become a client engagement, Cedarline generally
                  retains the inquiry and related email correspondence for up to 12 months.
                </p>
                <p>
                  Cedarline may delete non-client inquiries sooner when they are no longer useful
                  for responding to or following up on the request.
                </p>
                <p>
                  If an inquiry becomes a client engagement, information associated with the
                  engagement may be retained for longer as reasonably necessary for project
                  administration, business records, accounting, dispute resolution, legal
                  obligations, or other legitimate business purposes.
                </p>
                <p>
                  Formspree&rsquo;s current Free plan provides 30 days of submission history in its
                  dashboard. Service providers may maintain other technical, security, backup, or
                  legally required records according to their own policies.
                </p>
              </Section>

              <Section heading="Your Choices and Requests">
                <p>
                  You may contact Cedarline to request access to, correction of, or deletion of
                  personal information you previously submitted through the website.
                </p>
                <p>
                  Send requests to{' '}
                  <a
                    href={mailto.general}
                    className="text-ink-900 underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink-900"
                  >
                    {site.email}
                  </a>
                  .
                </p>
                <p>
                  Cedarline will review reasonable requests and respond as required by applicable
                  law. Some information may need to be retained when reasonably necessary for legal
                  obligations, business records, security, dispute resolution, or an existing
                  client relationship.
                </p>
                <p>
                  Cedarline may need to verify that a request relates to the person whose
                  information is being requested before acting on it.
                </p>
              </Section>

              <Section heading="Information Security">
                <p>
                  Cedarline uses reasonable administrative and technical measures intended to
                  protect information handled through the website.
                </p>
                <p>
                  However, no method of transmission or electronic storage can be guaranteed to be
                  completely secure.
                </p>
              </Section>

              <Section heading="Children">
                <p>
                  The Cedarline website is intended for businesses and business users and is not
                  directed to children under 13.
                </p>
                <p>
                  Cedarline does not knowingly use the website to collect personal information from
                  children under 13.
                </p>
                <p>
                  If Cedarline learns that such information was submitted, it will take reasonable
                  steps to delete it.
                </p>
              </Section>

              <Section heading="Third-Party Links">
                <p>The Cedarline website may link to third-party websites or services.</p>
                <p>Their privacy practices are governed by their own policies, not this Privacy Policy.</p>
              </Section>

              <Section heading="Changes to This Policy">
                <p>
                  Cedarline may update this Privacy Policy as the website, services, or data
                  practices change.
                </p>
                <p>
                  When material changes are made, Cedarline will update the effective date shown at
                  the top of the policy and, when appropriate, provide additional notice on the
                  website.
                </p>
                <p>
                  Visitors should review the current version of the Privacy Policy for the latest
                  information about Cedarline&rsquo;s practices.
                </p>
              </Section>

              <Section heading="Contact">
                <p>Questions or requests concerning this Privacy Policy may be sent to:</p>
                <p className="text-ink-900">
                  {site.founder}
                  <br />
                  {site.name}
                  <br />
                  <a
                    href={mailto.general}
                    className="underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink-900"
                  >
                    {site.email}
                  </a>
                </p>
              </Section>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
