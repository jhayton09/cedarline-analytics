/**
 * Captures the fixed set of visual-review screenshots into ./review-screenshots.
 *
 * Dev-only: not part of the build. Requires a one-off install kept out of
 * package.json (see README "Review tooling"):
 *
 *   npm i --no-save playwright
 *   npm run build && ./scripts/serve.sh 3111
 *   node scripts/review-screenshots.mjs [baseUrl]
 *
 * Approach: take one true full-page screenshot per viewport (Chromium renders
 * the whole document in a single pass for `fullPage`, so `position: sticky`
 * elements — the header — appear exactly once, at the top, rather than
 * floating over content lower on the page). Every other requested screenshot
 * is then a pixel-accurate crop of that source image, using section
 * boundaries read from the live DOM via getBoundingClientRect. This avoids
 * ever scrolling a specific section under the sticky header, which is what
 * would obscure its top edge.
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { chromium } from 'playwright';

const base = process.argv[2] ?? 'http://localhost:3111';
const outDir = path.resolve(import.meta.dirname, '..', 'review-screenshots');
await mkdir(outDir, { recursive: true });

/** Scrolls the full page in steps so lazy images load. */
async function warmUp(page) {
  await page.evaluate(async () => {
    const step = Math.max(400, window.innerHeight * 0.85);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 300));
    window.scrollTo(0, 0);
  });

  // The scroll pass above reliably triggers image lazy-loading, but a full-page
  // screenshot captures far more of the document per "frame" than a real user
  // ever scrolls through at once, and this sequential-scroll simulation doesn't
  // reliably fire the reveal IntersectionObserver for every element in that
  // single pass (confirmed: elements past a certain scroll depth were still
  // sitting at opacity:0 afterward). A screenshot should show the page in its
  // settled, post-animation state, so mark every reveal target as finished
  // directly — this is the same end state the real animation converges to, not
  // a different one.
  await page.evaluate(() => {
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.setAttribute('data-revealed', 'true');
      el.style.transitionDelay = '0ms';
    });
  });
  await page.waitForTimeout(200);
}

/**
 * Chromium's `fullPage` screenshot mode (captureBeyondViewport) drops
 * `position: sticky` elements entirely — confirmed by comparing against a
 * normal, non-fullPage screenshot at the same scroll position, where the
 * header renders correctly. Forcing it to `static` for the single frame of
 * the full-page capture sidesteps the bug without changing its appearance:
 * at scroll position 0 a sticky header is already laid out exactly where a
 * static one would be, since it's the first element on the page.
 */
async function withHeaderUnstuck(page, fn) {
  await page.evaluate(() => {
    const header = document.querySelector('header');
    if (header) header.dataset.reviewCapturePosition = header.style.position || '';
    if (header) header.style.position = 'static';
  });
  try {
    return await fn();
  } finally {
    await page.evaluate(() => {
      const header = document.querySelector('header');
      if (header) header.style.position = header.dataset.reviewCapturePosition ?? '';
    });
  }
}

/** Reads absolute document-coordinate boundaries for the sections we crop from. */
async function measure(page) {
  return page.evaluate(() => {
    const ids = ['top', 'starting-points', 'services', 'work', 'approach', 'about', 'founding-offer', 'contact'];
    const out = {};
    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      out[id] = { top: r.top + window.scrollY, bottom: r.bottom + window.scrollY };
    }
    const footer = document.querySelector('footer');
    if (footer) {
      const r = footer.getBoundingClientRect();
      out.footer = { top: r.top + window.scrollY, bottom: r.bottom + window.scrollY };
    }
    const caseStudyIds = [
      'carolina-landscaping-heading',
      'queen-city-cleaning-heading',
      'blue-ridge-home-services-heading',
    ];
    out.caseStudies = caseStudyIds.map((id) => {
      const heading = document.getElementById(id);
      const article = heading?.closest('article');
      const r = article.getBoundingClientRect();
      return { top: r.top + window.scrollY, bottom: r.bottom + window.scrollY };
    });
    out.pageHeight = document.body.scrollHeight;
    return out;
  });
}

async function crop(sourcePath, outName, top, bottom, width) {
  const t = Math.max(0, Math.round(top));
  const h = Math.round(bottom) - t;
  await sharp(sourcePath)
    .extract({ left: 0, top: t, width, height: h })
    .png()
    .toFile(path.join(outDir, outName));
  console.log(`  ${outName.padEnd(28)} ${width}x${h}`);
}

const browser = await chromium.launch();

// ---- Desktop (1440px) ----
{
  const width = 1440;
  const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  await warmUp(page);

  const m = await measure(page);
  const fullPagePath = path.join(outDir, 'desktop-full-page.png');
  await withHeaderUnstuck(page, () => page.screenshot({ path: fullPagePath, fullPage: true }));
  console.log(`desktop-full-page.png       ${width}x${Math.round(m.pageHeight)}`);

  // Hero + navigation: top of document through the end of the hero section.
  await crop(fullPagePath, 'desktop-hero.png', 0, m.top.bottom, width);

  // Services + the adjacent "where projects usually start" band above it.
  await crop(fullPagePath, 'desktop-services.png', m['starting-points'].top, m.services.bottom, width);

  // Work section, split into three (one per case study) — it's too tall for
  // one screenshot to usefully evaluate. Cut through the midpoint of the
  // whitespace gap between case studies so neither side is cropped tight.
  const [cs1, cs2, cs3] = m.caseStudies;
  const gap12 = (cs1.bottom + cs2.top) / 2;
  const gap23 = (cs2.bottom + cs3.top) / 2;
  await crop(fullPagePath, 'desktop-work-1.png', m.work.top, gap12, width); // intro + note + Carolina Landscaping
  await crop(fullPagePath, 'desktop-work-2.png', gap12, gap23, width); // Queen City Cleaning
  await crop(fullPagePath, 'desktop-work-3.png', gap23, m.work.bottom, width); // Blue Ridge Home Services

  // About section.
  await crop(fullPagePath, 'desktop-about.png', m.about.top, m.about.bottom, width);

  // Founding Offer + Contact + footer, through the true end of the page.
  await crop(fullPagePath, 'desktop-offer-contact.png', m['founding-offer'].top, m.pageHeight, width);

  await context.close();
}

// ---- Mobile (390px) ----
{
  const width = 390;
  const context = await browser.newContext({ viewport: { width, height: 844 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  await warmUp(page);

  const m = await measure(page);
  const fullPagePath = path.join(outDir, 'mobile-full-page.png');
  await withHeaderUnstuck(page, () => page.screenshot({ path: fullPagePath, fullPage: true }));
  console.log(`mobile-full-page.png        ${width}x${Math.round(m.pageHeight)}`);

  await crop(fullPagePath, 'mobile-hero.png', 0, m.top.bottom, width);
  await crop(fullPagePath, 'mobile-work.png', m.work.top, m.work.bottom, width);
  await crop(fullPagePath, 'mobile-offer-contact.png', m['founding-offer'].top, m.pageHeight, width);

  await context.close();
}

await browser.close();
console.log(`\nAll files written to ${outDir}`);
