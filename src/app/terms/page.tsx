import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { Eyebrow } from '@/components/ui/Section';
import { mailto, site } from '@/content/site';

// Approved policy — replaces the earlier draft shell. No robots override
// here: this page now inherits the default `index: true, follow: true`
// from the root layout, same as every other real page on the site.
//
// This governs use of the WEBSITE only. A paid client engagement is
// governed by its own separate written project agreement, not this page —
// see "Website Purpose" and "Founding Client Offer" below. Don't let that
// line blur by adding project-specific terms (cancellation, refunds,
// ownership, liability caps, etc.) here; those belong in the client
// agreement being drafted separately.
//
// This is the actual, reviewed policy text; it must not be materially
// rewritten without going back through the same approval this content came
// from. If site behavior changes in a way that contradicts a claim below
// (a new service provider, a new advertised service, a changed offer),
// update this page — don't let the two drift apart silently.
export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'The terms governing use of cedarlineanalytics.com — website purpose, the Founding Client Offer, acceptable use, and related disclosures.',
};

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

function PrivacyLink() {
  return (
    <Link
      href="/privacy"
      className="text-ink-900 underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink-900"
    >
      Privacy Policy
    </Link>
  );
}

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="container-x">
          <div className="max-w-2xl py-16 sm:py-20">
            <Eyebrow>Terms</Eyebrow>
            <h1 className="mt-4 text-[1.875rem] leading-[1.15] font-semibold tracking-[-0.024em] sm:text-4xl">
              Terms of Use
            </h1>
            <p className="mt-3 text-[0.9375rem] text-slate-muted">Effective September 9, 2026</p>

            <div className="mt-8 space-y-4 text-[0.9375rem] leading-[1.7] text-slate-body">
              <p>
                These Terms of Use (&ldquo;Terms&rdquo;) govern your use of
                cedarlineanalytics.com, operated by Cedarline Analytics (&ldquo;Cedarline,&rdquo;
                &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
              </p>
              <p>
                By using this website, you agree to these Terms. If you do not agree with them,
                please do not use the website.
              </p>
              <p>
                These Terms apply to use of the website itself. Any paid project or client
                engagement with Cedarline is subject to a separate written scope, project
                agreement, or other terms agreed before paid work begins.
              </p>
            </div>

            <div className="mt-10 space-y-8">
              <Section heading="Website Purpose">
                <p>
                  The Cedarline website provides information about Cedarline&rsquo;s services,
                  sample work, Founding Client Offer, and ways to contact Cedarline.
                </p>
                <p>Website content is provided for general informational and business-development purposes.</p>
                <p>
                  The website does not create a client relationship merely because you visit the
                  site, submit an inquiry, exchange preliminary emails, or review sample work.
                </p>
                <p>
                  A client engagement begins only after Cedarline and the prospective client agree
                  to the applicable project scope and commercial terms.
                </p>
              </Section>

              <Section heading="No Professional Accounting, Tax, Legal, or Investment Advice">
                <p>
                  Cedarline provides business analytics, reporting, forecasting, spreadsheet, and
                  business-system services.
                </p>
                <p>
                  Unless specifically agreed otherwise in a lawful written engagement, information
                  on this website is not:
                </p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>Accounting or audit advice</li>
                  <li>Tax advice</li>
                  <li>Legal advice</li>
                  <li>Personalized investment advice</li>
                  <li>A recommendation to buy or sell securities</li>
                  <li>A substitute for advice from a qualified professional when professional advice is required</li>
                </ul>
                <p>
                  Visitors and clients remain responsible for decisions made using information,
                  models, forecasts, or other materials presented through the website or created
                  in connection with a project.
                </p>
              </Section>

              <Section heading="Demonstration Projects">
                <p>
                  The projects currently displayed as Cedarline sample work use fictional
                  demonstration businesses.
                </p>
                <p>
                  They were created to show the types of reporting, forecasting, spreadsheet, and
                  business-system work Cedarline can build.
                </p>
                <p>These demonstration businesses are not Cedarline clients.</p>
                <p>
                  Any figures, operating results, customer information, scenarios, or other data
                  shown in those demonstrations are illustrative and should not be interpreted as
                  actual client results.
                </p>
                <p>
                  The presence of a demonstration project does not guarantee that a future project
                  will produce identical features, outputs, timing, or results.
                </p>
              </Section>

              <Section heading="Forecasts, Models, and Business Outcomes">
                <p>
                  Forecasts, financial models, scenario analyses, dashboards, and other analytical
                  tools depend on the assumptions, inputs, data, and circumstances on which they
                  are based.
                </p>
                <p>Actual business results may differ from modeled or forecast results.</p>
                <p>Nothing on this website guarantees:</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>Revenue growth</li>
                  <li>Profitability</li>
                  <li>Cost savings</li>
                  <li>Operational improvements</li>
                  <li>Investment returns</li>
                  <li>Particular business results</li>
                </ul>
                <p>
                  Prospective clients should evaluate any project based on the agreed scope and
                  their own business circumstances.
                </p>
              </Section>

              <Section heading="Founding Client Offer">
                <p>
                  The website may describe Cedarline&rsquo;s Founding Client Offer, including its
                  current introductory price and general included features.
                </p>
                <p>
                  Availability is limited to Cedarline&rsquo;s first three paying clients as stated
                  on the website.
                </p>
                <p>
                  Submitting an inquiry does not reserve a Founding Client engagement, create a
                  client relationship, or require payment.
                </p>
                <p>
                  Before any paid Founding Client project begins, Cedarline and the client must
                  agree to the applicable scope, deliverable, information required, price, payment
                  terms, timeline, and other project terms.
                </p>
                <p>
                  If there is a conflict between general website descriptions and a written
                  project agreement accepted for a specific engagement, the written project
                  agreement controls for that engagement.
                </p>
              </Section>

              <Section heading="Inquiries">
                <p>You may submit an inquiry through the website.</p>
                <p>
                  You agree that information you submit will be accurate to the best of your
                  knowledge and that you will not knowingly submit unlawful, fraudulent, abusive,
                  malicious, or misleading content.
                </p>
                <p>Submitting an inquiry:</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>Does not require Cedarline to accept a project</li>
                  <li>Does not obligate you to purchase services</li>
                  <li>Does not authorize Cedarline to charge you</li>
                  <li>Does not automatically subscribe you to marketing communications</li>
                </ul>
                <p>
                  Use of inquiry information is described in the Cedarline <PrivacyLink />.
                </p>
              </Section>

              <Section heading="Website Content and Intellectual Property">
                <p>
                  Unless otherwise stated, the Cedarline website and its original content,
                  including text, branding, page design, graphics, and demonstration materials, are
                  owned by or used with permission by Cedarline.
                </p>
                <p>You may view and use the website for ordinary personal or business-evaluation purposes.</p>
                <p>You may not, without permission:</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>Reproduce substantial portions of the website for commercial use</li>
                  <li>Present Cedarline content or demonstration work as your own</li>
                  <li>Remove or alter ownership, attribution, or disclosure information</li>
                  <li>
                    Use Cedarline branding in a way that falsely suggests sponsorship, endorsement,
                    partnership, or affiliation
                  </li>
                </ul>
                <p>
                  These Terms do not determine ownership rights for deliverables created for a
                  paying client. Those rights will be addressed in the applicable written project
                  agreement.
                </p>
              </Section>

              <Section heading="Acceptable Use">
                <p>You may not use the website to:</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>Violate applicable law</li>
                  <li>Attempt unauthorized access to the website or related systems</li>
                  <li>Interfere with the website&rsquo;s operation or security</li>
                  <li>Introduce malicious code</li>
                  <li>Abuse, probe, or overload the inquiry form or website infrastructure</li>
                  <li>Impersonate another person or business</li>
                  <li>Submit fraudulent or intentionally misleading inquiries</li>
                  <li>Scrape or reproduce website content in a manner that violates applicable law or these Terms</li>
                </ul>
                <p>
                  Cedarline may take reasonable steps to protect the website and its service
                  providers from abusive or malicious use.
                </p>
              </Section>

              <Section heading="Third-Party Services and Links">
                <p>The Cedarline website relies on or may link to third-party services.</p>
                <p>
                  For example, the website is hosted through Vercel and inquiry submissions are
                  processed through Formspree and delivered through Google Workspace.
                </p>
                <p>Third-party services operate under their own terms and privacy practices.</p>
                <p>
                  Cedarline is not responsible for the content, availability, security, or
                  practices of third-party websites or services that Cedarline does not control.
                </p>
                <p>
                  The Cedarline <PrivacyLink /> provides additional information about service
                  providers involved in operating the website.
                </p>
              </Section>

              <Section heading="Website Availability and Changes">
                <p>Cedarline may change, update, suspend, or discontinue portions of the website at any time.</p>
                <p>
                  Cedarline does not guarantee that the website will always be available,
                  uninterrupted, error-free, or compatible with every browser, device, or system.
                </p>
                <p>Cedarline may correct errors or update information on the website when appropriate.</p>
              </Section>

              <Section heading="Disclaimer of Warranties">
                <p>
                  To the extent permitted by applicable law, the website and its content are
                  provided on an &ldquo;as available&rdquo; basis.
                </p>
                <p>
                  Cedarline makes no guarantee that website content is complete, error-free, or
                  suitable for every visitor&rsquo;s specific business circumstances.
                </p>
                <p>Nothing in these Terms excludes warranties or rights that cannot lawfully be excluded.</p>
              </Section>

              <Section heading="Limitation of Liability">
                <p>
                  To the extent permitted by applicable law, Cedarline will not be responsible for
                  indirect, incidental, special, consequential, or similar losses arising solely
                  from use of, inability to use, or reliance on the public website.
                </p>
                <p>
                  This website limitation does not replace or determine any liability terms that
                  may apply to a paid client engagement. Any applicable project-specific terms will
                  be addressed separately in the written agreement governing that engagement.
                </p>
                <p>Nothing in these Terms limits liability where doing so would be prohibited by applicable law.</p>
              </Section>

              <Section heading="Privacy">
                <p>
                  Use of personal information submitted through the website is governed by the
                  Cedarline <PrivacyLink />.
                </p>
              </Section>

              <Section heading="Changes to These Terms">
                <p>Cedarline may update these Terms as the website, services, or business practices change.</p>
                <p>
                  When the Terms are materially updated, Cedarline will revise the effective date
                  shown at the top of this page and may provide additional notice when appropriate.
                </p>
                <p>The current version posted on this website governs use of the website after its effective date.</p>
              </Section>

              <Section heading="Governing Law">
                <p>
                  These Terms are governed by the laws of the State of North Carolina, without
                  regard to conflict-of-law principles, except to the extent another law must
                  apply.
                </p>
              </Section>

              <Section heading="Contact">
                <p>Questions about these Terms may be sent to:</p>
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
