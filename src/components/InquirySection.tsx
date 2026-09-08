import { InquiryForm } from '@/components/InquiryForm';
import { Eyebrow } from '@/components/ui/Section';

export function InquirySection() {
  return (
    <section id="inquiry" aria-labelledby="inquiry-heading" className="scroll-mt-24 bg-mist-50">
      <div className="container-x">
        <div className="py-16 sm:py-20 lg:py-24">
          <Eyebrow>Start an Inquiry</Eyebrow>
          <h2
            id="inquiry-heading"
            className="mt-4 max-w-xl text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.022em] sm:text-4xl"
          >
            Tell me what you’re trying to improve.
          </h2>
          <p className="mt-4 max-w-lg text-[1.0625rem] leading-[1.65] text-slate-body">
            You don’t need a finished scope or perfect data. Start with the problem, and Cedarline
            can help determine the right next step.
          </p>

          <div className="mt-10">
            <InquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
