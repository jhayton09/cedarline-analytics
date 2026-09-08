import Link from 'next/link';
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from 'react';

type Variant = 'action' | 'primary' | 'secondary' | 'onDarkPrimary' | 'onDarkSecondary';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-[-0.005em] ' +
  'transition-[background-color,border-color,color,box-shadow,transform] duration-200 ' +
  'active:translate-y-px whitespace-nowrap disabled:pointer-events-none disabled:opacity-60';

const variants: Record<Variant, string> = {
  // The one color reserved for action/interaction: every real call-to-action
  // button in V2 (Start an Inquiry, Send Inquiry, the founding-offer CTAs)
  // uses this variant, so green never appears as plain decoration elsewhere.
  action:
    'bg-moss-700 text-white shadow-[0_1px_2px_rgb(9_12_34/0.18)] hover:bg-moss-800 ' +
    'hover:shadow-[0_6px_18px_-6px_rgb(19_76_41/0.45)]',
  primary:
    'bg-ink-900 text-white shadow-[0_1px_2px_rgb(9_12_34/0.18)] hover:bg-ink-700 ' +
    'hover:shadow-[0_6px_18px_-6px_rgb(9_12_34/0.45)]',
  secondary:
    'border border-line-strong bg-white text-ink-900 hover:border-ink-600 hover:bg-mist-50',
  onDarkPrimary: 'bg-white text-ink-900 hover:bg-mist-100',
  onDarkSecondary:
    'border border-white/25 text-white hover:border-white/50 hover:bg-white/8',
};

const sizes: Record<Size, string> = {
  md: 'h-10 px-4 text-[0.9375rem]',
  lg: 'h-12 px-6 text-[0.9375rem] sm:text-base',
};

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, 'className' | 'children'>;

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: Props) {
  return (
    <Link
      data-hover-lift-sm
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

type SubmitButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

/**
 * Same visual language as `Button`, but a real `<button>` — for in-page
 * actions like form submission that don't navigate anywhere.
 */
export function SubmitButton({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: SubmitButtonProps) {
  return (
    <button
      data-hover-lift-sm
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * A subordinate, underlined text link — the site's only "secondary action"
 * pattern. Deliberately not a button: a co-equal second button competes with
 * the one real call-to-action on the page.
 */
export function TextLink({
  href,
  children,
  className = '',
  ...props
}: { href: string; children: ReactNode; className?: string } & Omit<
  ComponentProps<typeof Link>,
  'href' | 'className' | 'children'
>) {
  return (
    <Link
      href={href}
      className={`rounded text-[0.9375rem] font-medium text-ink-900 underline decoration-line-strong underline-offset-4 transition-colors duration-200 hover:decoration-ink-900 ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
      className={`h-3.5 w-3.5 shrink-0 ${className}`}
    >
      <path
        d="M2.5 8h11m0 0L9 3.5M13.5 8L9 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
