import type { FaqItem } from '@/content/faq';

function ChevronIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Native <details>/<summary> rather than a JS-driven accordion: the browser
 * handles focus, Enter/Space toggling, and the expanded/collapsed state and
 * role it exposes to assistive tech, so there is no state to get out of sync.
 * The shared `name` makes only one entry open at a time in browsers that
 * support exclusive <details> groups; elsewhere it just degrades to an
 * ordinary independent accordion.
 */
export function FaqAccordion({ items, groupName }: { items: FaqItem[]; groupName: string }) {
  return (
    <div className="max-w-3xl border-t border-line">
      {items.map((item) => (
        <details key={item.question} name={groupName} className="group border-b border-line">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.0625rem] font-semibold tracking-[-0.012em] text-ink-900 [&::-webkit-details-marker]:hidden sm:py-6">
            {item.question}
            <ChevronIcon className="h-4 w-4 shrink-0 text-slate-muted transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <p className="max-w-2xl pb-5 text-[0.9375rem] leading-[1.65] text-slate-body sm:pb-6">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
