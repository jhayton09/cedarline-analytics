import Image from 'next/image';
import Link from 'next/link';
import { Button, TextLink } from '@/components/ui/Button';
import { site } from '@/content/site';

/**
 * Deliberately not <SiteHeader>: a cold-traffic landing page keeps exactly
 * three things in the header — the way home, a link to proof, and the one
 * action — instead of the full site nav.
 */
export function OfferHeader() {
  return (
    <header className="border-b border-line bg-white">
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

          <div className="flex items-center gap-5">
            <TextLink href="/work" className="hidden sm:inline-block">
              See Sample Work →
            </TextLink>
            <Button href="#inquiry" variant="action">
              Start an Inquiry
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
