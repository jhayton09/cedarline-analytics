import { SectionHeader } from '@/components/ui/Section';

const steps = [
  {
    step: '01',
    title: 'A short conversation',
    body: 'You describe the process, spreadsheet or report that is costing you time. I tell you plainly whether it is something Cedarline can help with.',
  },
  {
    step: '02',
    title: 'Scope in writing',
    body: 'One focused problem, and a written description of what the deliverable will do — agreed before any work begins, so there is no ambiguity later.',
  },
  {
    step: '03',
    title: 'Build',
    body: 'The workbook or model is built against your data, or against a representative sample if you would rather not share live figures at this stage.',
  },
  {
    step: '04',
    title: 'Handover and support',
    body: 'A recorded walkthrough so you can see how it works, one revision round, and email support for the week after delivery.',
  },
];

export function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-heading" className="scroll-mt-24">
      <div className="container-x">
        <div className="py-20 sm:py-24 lg:py-28">
          <SectionHeader
            eyebrow="How it works"
            title={<span id="approach-heading">A small, defined engagement</span>}
            lede="Cedarline is deliberately narrow: one problem, scoped up front, delivered in something you already know how to open."
          />

          <ol className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8">
            {steps.map((item, index) => (
              <li key={item.step} data-reveal data-reveal-delay={index * 80}>
                <p className="border-t-2 border-ink-900 pt-4 text-eyebrow font-semibold tracking-[0.14em] text-brand-600 tnum">
                  {item.step}
                </p>
                <h3 className="mt-3 text-[1.0625rem] font-semibold tracking-[-0.012em]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.65] text-slate-body">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
