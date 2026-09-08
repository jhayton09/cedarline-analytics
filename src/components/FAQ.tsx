import { FaqAccordion } from '@/components/FaqAccordion';
import { Eyebrow } from '@/components/ui/Section';
import { homeFaq } from '@/content/faq';

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24">
      <div className="container-x">
        <div className="py-16 sm:py-20 lg:py-24">
          <Eyebrow>FAQ</Eyebrow>
          <h2
            id="faq-heading"
            className="mt-4 max-w-2xl text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.022em] sm:text-4xl"
          >
            Questions that usually come up before starting.
          </h2>

          <div className="mt-10 sm:mt-12">
            <FaqAccordion items={homeFaq} groupName="home-faq" />
          </div>
        </div>
      </div>
    </section>
  );
}
