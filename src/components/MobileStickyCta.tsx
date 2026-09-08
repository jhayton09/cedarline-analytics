'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';

type Props = {
  /** Where the CTA sends the visitor — a same-page hash, or `/#inquiry` from another route. */
  href?: string;
  /**
   * Id of the on-page inquiry form to watch for. Once it has been reached,
   * the bar hides for the rest of the visit rather than reappearing every
   * time the form scrolls out of view. Omit (or pass an id that isn't on the
   * page, e.g. from /work) to keep the bar visible throughout — there is
   * nothing local to hide it for.
   */
  targetId?: string;
};

/**
 * Mobile-only sticky call-to-action. Not rendered at all above the lg
 * breakpoint, where the header's own CTA is already visible.
 */
export function MobileStickyCta({ href = '#inquiry', targetId = 'inquiry' }: Props) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        // Once the inquiry section has been reached, stop watching — the bar
        // stays hidden rather than flickering back in as the user scrolls
        // past it toward the footer.
        setHidden(true);
        observer.disconnect();
      },
      { rootMargin: '0px 0px -15% 0px' },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  return (
    <div
      role="region"
      aria-label="Start an inquiry"
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur-md transition-transform duration-200 ease-out supports-[backdrop-filter]:bg-white/90 lg:hidden ${
        hidden ? 'pointer-events-none translate-y-full' : 'translate-y-0'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="px-4 py-2.5">
        <Button href={href} variant="action" size="lg" className="w-full" tabIndex={hidden ? -1 : undefined}>
          Start an Inquiry
        </Button>
      </div>
    </div>
  );
}
