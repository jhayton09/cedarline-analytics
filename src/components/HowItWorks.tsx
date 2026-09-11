import type { Step } from '@/content/how-it-works';

type Props = {
  heading: string;
  steps: Step[];
  id?: string;
  /** Homepage sits on white; the /founding-offer instance sits on the mist band below the hero. */
  tone?: 'white' | 'mist';
};

export function HowItWorks({ heading, steps, id = 'how-it-works', tone = 'white' }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`scroll-mt-24 ${tone === 'mist' ? 'bg-mist-50' : ''}`}
    >
      <div className="container-x">
        <div className="py-16 sm:py-20 lg:py-24">
          <h2
            id={`${id}-heading`}
            className="max-w-2xl text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.022em] sm:text-4xl"
          >
            {heading}
          </h2>

          <ol className="mt-11 grid gap-y-9 sm:grid-cols-3 sm:gap-x-10 sm:gap-y-0 sm:divide-x sm:divide-line">
            {steps.map((step, index) => (
              <li key={step.title} className="sm:px-8 first:sm:pl-0 last:sm:pr-0">
                <p className="text-eyebrow font-semibold tracking-[0.14em] text-slate-muted uppercase">
                  Step {index + 1}
                </p>
                <h3 className="mt-2.5 text-[1.0625rem] font-semibold tracking-[-0.012em]">{step.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.65] text-slate-body">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
