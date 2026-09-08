import { Eyebrow } from '@/components/ui/Section';
import { services } from '@/content/services';

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-24 bg-mist-50">
      <div className="container-x">
        <div className="py-16 sm:py-20 lg:py-24">
          <Eyebrow>Services</Eyebrow>
          <h2
            id="services-heading"
            className="mt-4 max-w-2xl text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.022em] sm:text-4xl"
          >
            Three ways Cedarline helps small businesses get clearer, faster information.
          </h2>

          <div className="mt-11 grid divide-y divide-line border-t border-line sm:mt-12 lg:grid-cols-3 lg:divide-x lg:divide-y-0 lg:border-x">
            {services.map((service) => (
              <article key={service.id} className="py-8 lg:px-8 lg:py-9 lg:first:pl-0 lg:last:pr-0">
                <h3 className="text-[1.125rem] leading-[1.25] font-semibold tracking-[-0.014em]">
                  {service.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.6] text-slate-body">{service.summary}</p>
                <ul className="mt-6 space-y-2 border-t border-line pt-5">
                  {service.examples.map((example) => (
                    <li key={example} className="text-[0.875rem] leading-[1.5] text-slate-muted">
                      {example}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
