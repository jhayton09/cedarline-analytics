import { Eyebrow } from '@/components/ui/Section';
import { services, type Service } from '@/content/services';

function PlusIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * The title and one-sentence summary are always visible — only the example
 * list sits behind a disclosure. Native <details>/<summary> so the expand
 * control gets correct keyboard support and expanded/collapsed state for
 * free; the icon rotating 45° turns the "+" into a close "×", and the label
 * itself swaps text, so the state change isn't icon-only.
 */
function ServiceRow({ service }: { service: Service }) {
  return (
    <div className="border-t border-line py-7 first:border-t-0 sm:py-8 lg:grid lg:grid-cols-12 lg:gap-x-10">
      <div className="lg:col-span-4">
        <h3 className="text-[1.1875rem] leading-[1.25] font-semibold tracking-[-0.014em]">
          {service.title}
        </h3>
      </div>

      <div className="mt-3 lg:col-span-8 lg:mt-0">
        <p className="max-w-xl text-[0.9375rem] leading-[1.6] text-slate-body">{service.summary}</p>

        <details className="group mt-4">
          <summary className="flex min-h-11 w-fit cursor-pointer list-none items-center gap-1.5 text-[0.875rem] font-medium text-ink-900 [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">See examples</span>
            <span className="hidden group-open:inline">Hide examples</span>
            <PlusIcon className="h-3 w-3 shrink-0 transition-transform duration-200 group-open:rotate-45" />
          </summary>
          <ul className="mt-4 max-w-xl space-y-2 border-t border-line pt-4">
            {service.examples.map((example) => (
              <li key={example} className="text-[0.875rem] leading-[1.5] text-slate-muted">
                {example}
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-24 bg-mist-50">
      <div className="container-x">
        <div className="py-14 sm:py-16 lg:py-20">
          <Eyebrow>Services</Eyebrow>
          <h2
            id="services-heading"
            className="mt-4 max-w-2xl text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.022em] sm:text-4xl"
          >
            Three ways Cedarline helps small businesses get clearer, faster information.
          </h2>

          <div className="mt-10 sm:mt-12">
            {services.map((service) => (
              <ServiceRow key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
