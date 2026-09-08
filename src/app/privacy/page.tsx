import type { Metadata } from 'next';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { Eyebrow } from '@/components/ui/Section';
import { mailto } from '@/content/site';

// DRAFT SHELL — for internal V2 review only. This route exists so navigation
// and the footer link can be tested; the copy below is a restrained
// placeholder, not final, reviewed policy language. Do not treat this page
// as production-ready and do not deploy it before real compliance copy
// (drafted or reviewed by counsel, as appropriate) replaces it.
export const metadata: Metadata = {
  title: 'Privacy',
  robots: { index: false, follow: false },
};

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

            <div className="mt-6 border-t border-line pt-5">
              <p className="text-[0.9375rem] font-medium text-ink-900">
                Draft placeholder — not final.
              </p>
              <p className="mt-2 text-[0.9375rem] leading-[1.65] text-slate-body">
                This page exists so the route and footer link can be tested during development.
                It has not been reviewed or approved as Cedarline Analytics&rsquo; actual privacy
                policy, and this route is not published on the live site until that is complete.
              </p>
            </div>

            <div className="mt-8 space-y-5 text-[0.9375rem] leading-[1.65] text-slate-body">
              <p>
                In general terms: information submitted through the inquiry form on this site is
                used only to respond to that inquiry. Cedarline does not sell personal information
                and does not automatically add inquiry submitters to marketing lists.
              </p>
              <p>
                A complete policy — covering what is collected, how it is stored, retention, and
                any third-party services used to operate the site — will replace this placeholder
                before the site is deployed.
              </p>
              <p>
                Questions in the meantime can be sent to{' '}
                <a
                  href={mailto.general}
                  className="text-ink-900 underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink-900"
                >
                  jake@cedarlineanalytics.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
