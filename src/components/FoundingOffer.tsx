import { Button, TextLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Section';
import { offer } from '@/content/founding-offer';

/**
 * A compact commercial teaser, not the full offer — /founding-offer now
 * carries the turnaround explanation, the guarantee, and the fit/not-fit
 * list. This section only needs to earn the click through to that page (or
 * the inquiry, directly).
 */
export function FoundingOffer() {
  return (
    <section id="founding-offer" aria-labelledby="founding-heading" className="on-dark scroll-mt-24 bg-ink-900 text-white">
      <div className="container-x">
        <div className="py-14 sm:py-16 lg:py-20">
          <div className="max-w-2xl">
            <Eyebrow tone="dark">Founding Client Offer</Eyebrow>
            <h2
              id="founding-heading"
              className="mt-4 text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.022em] text-white sm:text-4xl"
            >
              One focused business problem for $150.
            </h2>
            <p className="mt-3 text-[0.9375rem] text-white/65">{offer.clientsAvailable}</p>

            <p className="mt-6 text-[1.0625rem] font-medium text-white">{offer.teaserPaymentSplit}</p>
            <p className="mt-2.5 max-w-md text-[0.9375rem] leading-[1.6] text-white/75">
              {offer.teaserInclusion}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href="#inquiry" variant="action" size="lg">
                Start an Inquiry
              </Button>
              <TextLink href="/founding-offer" tone="dark">
                See full offer details →
              </TextLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
