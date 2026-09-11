import Image from 'next/image';
import { TextLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Section';
import { site } from '@/content/site';

/**
 * The homepage trust cue, not the full founder story — that lives on /about.
 */
export function Founder() {
  return (
    <section id="founder" aria-labelledby="founder-heading" className="scroll-mt-24 bg-mist-50">
      <div className="container-x">
        <div className="py-14 sm:py-16 lg:py-20">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
            {/* Image first on mobile. */}
            <div className="order-1 lg:order-2 lg:col-span-4">
              <Image
                src="/brand/jake-hayton-headshot.webp"
                alt="Jake Hayton, founder of Cedarline Analytics"
                width={1000}
                height={1333}
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 18rem, 88vw"
                className="w-full max-w-[16rem] border border-line bg-white object-cover lg:max-w-none"
              />
            </div>

            <div className="order-2 lg:order-1 lg:col-span-8">
              <Eyebrow>Founder</Eyebrow>
              <h2
                id="founder-heading"
                className="mt-4 text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.022em] sm:text-4xl"
              >
                Built by the person you’ll work with.
              </h2>

              <p className="mt-5 max-w-xl text-[1.0625rem] leading-[1.65] text-slate-body">
                Cedarline was founded by Jake Hayton, an economics student at the University of
                North Carolina at Chapel Hill with experience in financial analysis, forecasting,
                and advanced Excel systems. Jake handles each project directly.
              </p>

              <div className="mt-6 border-t border-line pt-5">
                <TextLink href="/about">About Jake →</TextLink>
              </div>
              <p className="mt-4 text-[0.9375rem] text-slate-muted">Based in {site.region}.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
