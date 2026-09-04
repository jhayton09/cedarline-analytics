import { SectionHeader } from '@/components/ui/Section';
import { services } from '@/content/services';

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-24">
      <div className="container-x">
        <div className="py-20 sm:py-24 lg:py-28">
          <SectionHeader
            eyebrow="Services"
            title={<span id="services-heading">Three kinds of work, one underlying job</span>}
            lede="Making the numbers a small business already produces usable — quickly, repeatedly, and without a person having to rebuild them every month."
          />

          <div className="mt-14 sm:mt-16">
            {services.map((service) => (
              <article
                key={service.id}
                data-reveal
                // Explicit placement so the reading order is title → detail → deliverable
                // on narrow screens, while the deliverable still sits under the title in
                // the left column from lg upward.
                className="grid gap-7 border-t border-line py-11 last:border-b sm:py-12 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-12 lg:gap-y-8 lg:py-14"
              >
                <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
                  <p className="text-eyebrow font-semibold tracking-[0.14em] text-brand-600 tnum">
                    {service.index}
                  </p>
                  <h3 className="mt-4 text-[1.5rem] leading-[1.2] font-semibold tracking-[-0.018em] sm:text-[1.75rem] lg:max-w-[15ch]">
                    {service.title}
                  </h3>
                </div>

                <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
                  <p className="max-w-2xl text-[1.0625rem] leading-[1.6] text-ink-800">
                    {service.summary}
                  </p>
                  <p className="mt-3.5 max-w-2xl text-[0.9375rem] leading-[1.65] text-slate-body">
                    {service.detail}
                  </p>

                  <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
                    {service.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="border-t border-line py-2.5 text-[0.875rem] text-slate-body"
                      >
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-line pt-4 lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:max-w-[34ch]">
                  <h4 className="text-eyebrow font-semibold tracking-[0.14em] text-slate-muted uppercase">
                    Typical deliverable
                  </h4>
                  <p className="mt-2.5 text-[0.9375rem] leading-[1.6] text-slate-body">
                    {service.deliverable}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
