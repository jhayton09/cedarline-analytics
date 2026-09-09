import { FaqAccordion } from '@/components/FaqAccordion';
import { TextLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Section';
import { homeFaq } from '@/content/faq';

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24">
      <div className="container-x">
        <div className="py-14 sm:py-16 lg:py-20">
          <Eyebrow>FAQ</Eyebrow>
          <h2
            id="faq-heading"
            className="mt-4 max-w-2xl text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.022em] sm:text-4xl"
          >
            Questions that usually come up before starting.
          </h2>

          <div className="mt-10 sm:mt-12">
            <FaqAccordion items={homeFaq} groupName="home-faq" />
            <div className="mt-8 max-w-3xl border-t border-line pt-6">
              <TextLink href="/founding-offer">More about the Founding Client Offer →</TextLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
