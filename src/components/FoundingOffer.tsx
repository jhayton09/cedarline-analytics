import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Section';
import { offer } from '@/content/founding-offer';

export function FoundingOffer() {
  return (
    <section id="founding-offer" aria-labelledby="founding-heading" className="on-dark scroll-mt-24 bg-ink-900 text-white">
      <div className="container-x">
        <div className="py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Eyebrow tone="dark">Founding Client Offer</Eyebrow>
              <h2
                id="founding-heading"
                className="mt-4 text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.022em] text-white sm:text-4xl"
              >
                One focused business problem. One fixed price.
              </h2>

              <p className="mt-7 flex items-baseline gap-2">
                <span className="text-5xl font-semibold tracking-[-0.03em] text-white tnum">$150</span>
                <span className="text-[0.9375rem] text-white/65">total</span>
              </p>
              <p className="mt-2 text-[0.9375rem] text-white/65">{offer.clientsAvailable}</p>

              <p className="mt-6 max-w-md text-[1.0625rem] leading-[1.65] text-white/80">
                {offer.scopeExplanation}
              </p>

              <div className="mt-8 border-t border-white/12 pt-6">
                <h3 className="text-eyebrow font-semibold tracking-[0.14em] text-white/60 uppercase">
                  Included
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {offer.included.map((item) => (
                    <li key={item} className="text-[0.9375rem] leading-[1.5] text-white/80">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-6 border-t border-white/12 pt-6 text-[0.9375rem] text-white/70">
                {offer.paymentSplit}
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="border-t border-white/12 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                <h3 className="text-eyebrow font-semibold tracking-[0.14em] text-white/60 uppercase">
                  {offer.functionalityCommitmentHeading}
                </h3>
                <p className="mt-3 max-w-md text-[1.0625rem] leading-[1.6] text-white/80">
                  {offer.functionalityCommitment}
                </p>

                <div className="mt-9">
                  <Button href="#inquiry" variant="action" size="lg" className="w-full sm:w-auto">
                    Start a Founding Client Inquiry
                  </Button>
                  <p className="mt-3.5 text-[0.8125rem] text-white/60">
                    No phone call required to get started.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
