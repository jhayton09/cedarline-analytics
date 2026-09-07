'use client';

import Image from 'next/image';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { Shot } from '@/content/case-studies';

function ExpandIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path
        d="M6 2H2v4M10 14h4v-4M14 6V2h-4M2 10v4h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SheetIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <rect x="1.75" y="2.75" width="12.5" height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1.75 6.25h12.5M6.25 6.25v7" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

type Props = {
  shot: Shot;
  /** Shown in the frame's title bar — the sheet this screenshot came from. */
  label: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Hides the caption under the frame; used where the caption is set elsewhere. */
  hideCaption?: boolean;
};

export function ScreenShot({
  shot,
  label,
  sizes,
  priority = false,
  className = '',
  hideCaption = false,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const captionId = useId();

  const close = useCallback(() => dialogRef.current?.close(), []);

  const openDialog = useCallback(() => {
    setOpen(true);
    dialogRef.current?.showModal();
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <figure className={`min-w-0 ${className}`}>
        <button
          type="button"
          onClick={openDialog}
          aria-label={`Enlarge screenshot: ${label}`}
          data-hover-lift
          className="group block w-full cursor-zoom-in overflow-hidden rounded-xl border border-line bg-white text-left shadow-panel transition-[box-shadow,transform] duration-300 hover:shadow-lift"
        >
          <span className="flex items-center gap-2 border-b border-line bg-mist-50 px-3 py-2 sm:px-3.5">
            <SheetIcon className="h-3.5 w-3.5 shrink-0 text-moss-600" />
            <span className="truncate text-[0.6875rem] font-medium tracking-[0.02em] text-slate-muted sm:text-xs">
              {label}
            </span>
            <span className="ml-auto flex shrink-0 items-center gap-1.5 rounded border border-line-strong bg-white px-1.5 py-1 text-[0.625rem] font-medium tracking-[0.04em] text-slate-muted uppercase transition-colors duration-200 group-hover:border-ink-600 group-hover:text-ink-900">
              <ExpandIcon className="h-2.5 w-2.5" />
              Enlarge
            </span>
          </span>
          <span className="block overflow-hidden bg-white">
            <Image
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              sizes={sizes}
              priority={priority}
              className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.012]"
            />
          </span>
        </button>
        {hideCaption ? null : (
          <figcaption className="mt-3 text-[0.8125rem] leading-relaxed text-slate-muted">
            {shot.caption}
          </figcaption>
        )}
      </figure>

      <dialog
        ref={dialogRef}
        aria-labelledby={captionId}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          // Clicking the backdrop (the dialog element itself) dismisses.
          if (event.target === dialogRef.current) close();
        }}
        // The dialog fills the viewport, so it carries the dark ground itself rather than
        // relying on ::backdrop — which keeps contrast correct and inspectable.
        className="m-0 h-full max-h-none w-full max-w-none bg-ink-950/95 p-0 text-white backdrop:bg-ink-950/85 backdrop:backdrop-blur-sm"
      >
        {open ? (
          <div className="on-dark flex h-full w-full flex-col p-3 sm:p-5">
            <div className="mx-auto flex w-full max-w-[1600px] items-center gap-3 pb-3">
              <p className="min-w-0 flex-1 truncate text-sm font-medium text-white">{label}</p>
              <button
                type="button"
                onClick={close}
                className="flex h-9 items-center gap-2 rounded-md border border-white/25 px-3 text-sm text-white transition-colors duration-200 hover:border-white/50 hover:bg-white/10"
              >
                Close
                <span aria-hidden="true" className="text-base leading-none">
                  ×
                </span>
              </button>
            </div>

            <div
              tabIndex={0}
              role="group"
              aria-label={`${label} — scrollable image`}
              // `safe` centring falls back to start alignment once the image overflows,
              // so a tall or wide sheet can still be scrolled to its top-left corner.
              className="mx-auto grid w-full max-w-[1600px] flex-1 overflow-auto overscroll-contain rounded-lg [place-content:safe_center]"
              // Wide spreadsheets stay legible: the image never renders below 60% of its
              // native width, so on a phone you pan rather than squint.
              style={
                {
                  '--shot-w': `${shot.width}px`,
                  '--shot-min': `${Math.round(shot.width * 0.6)}px`,
                } as React.CSSProperties
              }
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                unoptimized
                className="block h-auto max-w-none rounded-lg bg-white [width:min(var(--shot-w),max(100%,var(--shot-min)))]"
              />
            </div>

            <p
              id={captionId}
              className="mx-auto w-full max-w-[1600px] pt-3 text-[0.8125rem] leading-relaxed text-white/70"
            >
              {shot.caption}
              <span className="ml-1 text-white/60 lg:hidden">Scroll to see the full sheet.</span>
            </p>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
