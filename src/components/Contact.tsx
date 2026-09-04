import { ArrowRight, Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Section';
import { mailto, site } from '@/content/site';

const helpful = [
  'What the process or report is',
  'How you handle it today',
  'What you wish you could see',
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24">
      <div className="container-x">
        <div className="py-20 sm:py-24 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
            <div data-reveal className="lg:col-span-6">
              <Eyebrow>Contact</Eyebrow>
              <h2
                id="contact-heading"
                className="mt-5 text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.022em] sm:text-4xl lg:text-[2.625rem]"
              >
                Let&rsquo;s talk about what you&rsquo;re trying to improve
              </h2>
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-slate-body">
                If there is a reporting process, spreadsheet, forecast or internal workflow that
                takes too much time or does not give you the information you need, tell me how you
                currently handle it. I will let you know whether Cedarline is a reasonable fit — and
                I will say so directly if it is not.
              </p>

              <div className="mt-10 border-t border-line pt-7">
                <h3 className="text-eyebrow font-semibold tracking-[0.14em] text-slate-muted uppercase">
                  Useful things to include
                </h3>
                <ul className="mt-4 max-w-md">
                  {helpful.map((item) => (
                    <li
                      key={item}
                      className="border-b border-line py-3 text-[0.9375rem] leading-[1.5] text-slate-body last:border-b-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div data-reveal data-reveal-delay="100" className="lg:col-span-6">
              <div className="rounded-xl border border-line bg-mist-50 p-6 sm:p-8">
                <p className="text-eyebrow font-semibold tracking-[0.14em] text-slate-muted uppercase">
                  Email
                </p>
                <a
                  href={mailto.general}
                  className="mt-3 inline-block rounded text-xl font-semibold tracking-[-0.015em] text-ink-900 underline decoration-brand-600/30 underline-offset-[6px] transition-colors duration-200 hover:decoration-brand-600 sm:text-2xl"
                >
                  {site.email}
                </a>
                <p className="mt-3 text-[0.9375rem] text-slate-body">
                  {site.founder} — Founder, {site.name}
                </p>

                <Button href={mailto.general} size="lg" className="group mt-7 w-full">
                  Email Cedarline
                  <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Button>

                <dl className="mt-8 divide-y divide-line border-t border-line">
                  <div className="grid gap-1 py-3.5 sm:grid-cols-3 sm:gap-4">
                    <dt className="text-[0.8125rem] text-slate-muted">Replies</dt>
                    <dd className="text-[0.9375rem] leading-[1.5] text-slate-body sm:col-span-2">
                      Come from Jake directly — not an assistant or an autoresponder
                    </dd>
                  </div>
                  <div className="grid gap-1 py-3.5 sm:grid-cols-3 sm:gap-4">
                    <dt className="text-[0.8125rem] text-slate-muted">No form</dt>
                    <dd className="text-[0.9375rem] leading-[1.5] text-slate-body sm:col-span-2">
                      This site collects nothing and runs no tracking — email is the only channel
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
