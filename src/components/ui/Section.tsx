import type { ReactNode } from 'react';

export function Eyebrow({
  children,
  tone = 'light',
}: {
  children: ReactNode;
  tone?: 'light' | 'dark';
}) {
  return (
    <p
      className={`text-eyebrow font-semibold uppercase ${
        tone === 'dark' ? 'text-brand-300' : 'text-brand-600'
      }`}
    >
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lede,
  tone = 'light',
  align = 'left',
  className = '',
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={`${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}
    >
      <div className={align === 'center' ? 'flex justify-center' : ''}>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </div>
      <h2
        className={`mt-5 text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.022em] sm:text-4xl lg:text-[2.625rem] ${
          tone === 'dark' ? 'text-white' : ''
        }`}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={`mt-5 text-[1.0625rem] leading-[1.65] sm:text-lg ${
            tone === 'dark' ? 'text-white/70' : 'text-slate-body'
          }`}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
