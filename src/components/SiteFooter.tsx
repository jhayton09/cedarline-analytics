import Link from 'next/link';
import { footerNav, legalNav, mailto, site } from '@/content/site';

/**
 * No mailing address yet — the finalized public business address isn't
 * available. It will be added before production deployment; do not invent
 * one in the meantime.
 */
export function SiteFooter() {
  return (
    <footer className="on-dark bg-ink-950 text-white">
      <div className="container-x">
        <div className="grid gap-10 py-14 sm:py-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            {/* Text-only wordmark: the icon's navy-to-black gradient is designed for a
                white backdrop and loses its left arc entirely against this dark
                footer, so a plain white icon tile (or a de-haloed cutout — tested and
                still half-disappears) both read worse than clean type. */}
            <Link href="/" className="inline-block rounded">
              <span className="font-display text-lg font-semibold tracking-[-0.01em] text-white">
                {site.name}
              </span>
            </Link>
            <p className="mt-3 text-[0.9375rem] leading-[1.6] text-white/65">{site.positioning}</p>
            <p className="mt-1 text-[0.9375rem] text-white/50">Based in {site.region}</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-4">
            <h2 className="text-eyebrow font-semibold tracking-[0.14em] text-white/60 uppercase">
              Navigation
            </h2>
            <ul className="mt-4 space-y-2.5">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded text-[0.9375rem] text-white/70 transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-eyebrow font-semibold tracking-[0.14em] text-white/60 uppercase">
              Contact
            </h2>
            <a
              href={mailto.general}
              className="mt-4 inline-block rounded text-[0.9375rem] text-white/70 underline decoration-white/20 underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-white/60"
            >
              {site.email}
            </a>

            <h2 className="mt-7 text-eyebrow font-semibold tracking-[0.14em] text-white/60 uppercase">
              Legal
            </h2>
            <ul className="mt-4 space-y-2.5">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded text-[0.9375rem] text-white/70 transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-[0.8125rem] text-white/60">
          <p>© 2026 {site.name}</p>
        </div>
      </div>
    </footer>
  );
}
