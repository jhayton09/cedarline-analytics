import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'onDarkPrimary' | 'onDarkSecondary';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-[-0.005em] ' +
  'transition-[background-color,border-color,color,box-shadow,transform] duration-200 ' +
  'active:translate-y-px whitespace-nowrap';

const variants: Record<Variant, string> = {
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
    <Link className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
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
