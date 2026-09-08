import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Section';
import { site } from '@/content/site';

export function Founder() {
  return (
    <section id="about" aria-labelledby="founder-heading" className="scroll-mt-24 bg-mist-50">
      <div className="container-x">
        <div className="py-16 sm:py-20 lg:py-24">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Image first on mobile. */}
            <div className="order-1 lg:order-2 lg:col-span-4">
              <Image
                src="/brand/jake-hayton-headshot.webp"
                alt="Jake Hayton, founder of Cedarline Analytics"
                width={1000}
                height={1333}
                sizes="(min-width: 1024px) 26vw, (min-width: 640px) 22rem, 88vw"
                className="w-full max-w-[18rem] border border-line bg-white object-cover lg:max-w-none"
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

              <div className="mt-6 max-w-2xl space-y-5 text-[1.0625rem] leading-[1.7] text-slate-body">
                <p>
                  Cedarline Analytics was founded by Jake Hayton, an economics student at the
                  University of North Carolina at Chapel Hill with experience in financial analysis,
                  forecasting, and advanced Excel systems.
                </p>
                <p>
                  Jake handles each project directly—from defining the scope through building the
                  system, walkthrough, and support—so the person who understands the problem is the
                  person doing the work.
                </p>
              </div>

              <p className="mt-6 border-t border-line pt-5 text-[0.9375rem] text-slate-muted">
                Based in {site.region}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
