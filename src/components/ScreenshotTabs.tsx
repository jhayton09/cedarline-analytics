'use client';

import { useId, useRef, useState } from 'react';
import { ScreenShot } from '@/components/ScreenShot';
import type { View } from '@/content/case-studies';

type Props = {
  views: readonly [View, View] | View[];
  /** Prefixes the screenshot frame's title-bar label, e.g. "Blue Ridge Home Services.xlsx". */
  workbookLabel: string;
};

/**
 * A manual, keyboard-operable tab switch between two workbook screenshots.
 * No autoplay, no carousel — the active view only changes on a deliberate
 * click or arrow-key press (WAI-ARIA tabs pattern).
 */
export function ScreenshotTabs({ views, workbookLabel }: Props) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (index: number) => {
    const next = (index + views.length) % views.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      focusTab(index + 1);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      focusTab(index - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusTab(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusTab(views.length - 1);
    }
  };

  return (
    <div>
      <div role="tablist" aria-label={`${workbookLabel} views`} className="flex flex-wrap gap-x-6 border-b border-line">
        {views.map((view, index) => {
          const selected = active === index;
          return (
            <button
              key={view.label}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`-mb-px border-b-2 py-3 text-[0.9375rem] font-medium transition-colors duration-200 ${
                selected
                  ? 'border-moss-700 text-ink-900'
                  : 'border-transparent text-slate-muted hover:text-ink-900'
              }`}
            >
              {view.label}
            </button>
          );
        })}
      </div>

      {views.map((view, index) => (
        <div
          key={view.label}
          role="tabpanel"
          id={`${baseId}-panel-${index}`}
          aria-labelledby={`${baseId}-tab-${index}`}
          hidden={active !== index}
          className="pt-6"
        >
          <ScreenShot
            shot={view.shot}
            label={`${workbookLabel}.xlsx — ${view.shot.sheet}`}
            sizes="(min-width: 1024px) 60vw, (min-width: 640px) 90vw, 100vw"
            hideCaption
          />
        </div>
      ))}
    </div>
  );
}
