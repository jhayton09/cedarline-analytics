import Image from 'next/image';
import Link from 'next/link';
import { nav, site } from '@/content/site';

export function SiteFooter() {
  return (
    <footer className="on-dark bg-ink-950 text-white">
      <div className="container-x">
        <div className="grid gap-10 py-14 sm:py-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Link href="#top" className="inline-flex items-center gap-3 rounded">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1.5">
                <Image
                  src="/brand/cedarline-icon.webp"
                  alt=""
                  width={512}
                  height={512}
                  sizes="40px"
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.01em] text-white">
                {site.name}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-[0.9375rem] leading-[1.6] text-white/65">
              {site.tagline} for owner-operated small businesses.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-4">
            <h2 className="text-eyebrow font-semibold tracking-[0.14em] text-white/60 uppercase">
              Sections
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {nav.map((item) => (
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
              href={`mailto:${site.email}`}
              className="mt-4 inline-block rounded text-[0.9375rem] text-white/70 underline decoration-white/20 underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-white/60"
            >
              {site.email}
            </a>
            <p className="mt-2.5 text-[0.9375rem] text-white/65">Based in {site.region}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-[0.8125rem] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <p>
            Projects shown on this site are fictional demonstration builds, not client engagements.
          </p>
        </div>
      </div>
    </footer>
  );
}
