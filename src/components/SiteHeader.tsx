'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { headerNav, site } from '@/content/site';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(
    (returnFocus = false) => {
      setOpen(false);
      if (returnFocus) toggleRef.current?.focus();
    },
    [],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu if the viewport grows past the mobile breakpoint while it is open.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu(true);
        return;
      }
      if (event.key !== 'Tab') return;

      // Keep focus inside the open panel (the toggle stays part of the loop).
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>('a[href], button');
      if (!focusable || focusable.length === 0) return;
      const items = [toggleRef.current, ...Array.from(focusable)].filter(
        (el): el is HTMLElement => el !== null,
      );
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, closeMenu]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || open
          ? 'border-b border-line bg-white/88 backdrop-blur-md supports-[backdrop-filter]:bg-white/78'
          : 'border-b border-transparent bg-white/0'
      }`}
    >
      <div className="container-x">
        <div className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
          <Link href="/" aria-label={`${site.name} — homepage`} className="-m-1 shrink-0 rounded p-1">
            <Image
              src="/brand/cedarline-logo.webp"
              alt={site.name}
              width={1200}
              height={300}
              priority
              sizes="(min-width: 640px) 208px, 176px"
              className="h-[26px] w-auto sm:h-[30px]"
            />
          </Link>

          {/* Conventional nav: no hamburger at this breakpoint or above. */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {headerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="relative rounded px-3 py-2 text-[0.9375rem] text-slate-body transition-colors duration-200 hover:text-ink-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Wrapper controls the responsive display: putting `hidden` on the Button
                itself would collide with the base `inline-flex` utility. */}
            <div className="hidden lg:block">
              <Button href="/#inquiry" variant="action">
                Start an Inquiry
              </Button>
            </div>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => (open ? closeMenu(false) : setOpen(true))}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="-mr-1 flex h-11 w-11 items-center justify-center rounded-md border border-line-strong bg-white text-ink-900 transition-colors duration-200 hover:bg-mist-50 lg:hidden"
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-5 w-5">
                {open ? (
                  <path
                    d="M5 5l10 10M15 5L5 15"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M3 6h14M3 10h14M3 14h14"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="border-t border-line bg-white lg:hidden"
      >
        <div className="container-x">
          <nav aria-label="Primary (mobile)" className="py-2">
            <ul className="divide-y divide-line">
              {headerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => closeMenu(false)}
                    className="flex min-h-11 items-center justify-between py-4 text-base font-medium text-ink-900"
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-slate-muted">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="pt-1 pb-6">
            <Button
              href="/#inquiry"
              variant="action"
              size="lg"
              onClick={() => closeMenu(false)}
              className="w-full"
            >
              Start an Inquiry
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
