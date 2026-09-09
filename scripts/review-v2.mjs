/**
 * V2 review pass: console/network errors, horizontal overflow, functional
 * interaction checks (FAQ, tabs, lightbox, form states, sticky CTA,
 * reduced-motion), axe-core accessibility, and the required screenshot set.
 *
 * Dev-only — same one-off install as scripts/review-screenshots.mjs and
 * scripts/a11y.mjs (playwright, axe-core, sharp; all already present here).
 *
 *   node scripts/review-v2.mjs [baseUrl]
 */
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const axePath = require.resolve('axe-core');
const base = process.argv[2] ?? 'http://localhost:3111';
const outDir = path.resolve(import.meta.dirname, '..', 'review-screenshots-v2');
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
let failures = 0;

function logSection(title) {
  console.log(`\n=== ${title} ===`);
}

/** Attaches console/network error collection to a page. */
function watchErrors(page, label) {
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`);
  });
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
  page.on('requestfailed', (req) => {
    // Next dev/prod HMR and prefetch aborts are not real failures; ignore
    // only genuine cancellations that are not real 4xx/5xx.
    const failure = req.failure()?.errorText ?? '';
    if (failure.includes('net::ERR_ABORTED')) return;
    errors.push(`requestfailed: ${req.url()} (${failure})`);
  });
  page.on('response', (res) => {
    if (res.status() >= 400) errors.push(`http ${res.status()}: ${res.url()}`);
  });
  return { label, errors };
}

async function checkOverflow(page) {
  return page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
}

async function runAxe(page, name) {
  await page.addScriptTag({ path: axePath });
  const results = await page.evaluate(async () =>
    // @ts-expect-error injected global
    window.axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] },
    }),
  );
  if (results.violations.length === 0) {
    console.log(`  a11y ${name}: no violations (${results.passes.length} checks passed)`);
    return 0;
  }
  console.log(`  a11y ${name}: ${results.violations.length} violation group(s)`);
  results.violations.forEach((v) => {
    console.log(`    [${v.impact}] ${v.id} — ${v.help}`);
    v.nodes.slice(0, 3).forEach((n) => console.log(`       ${n.target.join(' ')}`));
  });
  return results.violations.length;
}

async function crop(sourcePath, outName, top, bottom, width) {
  const t = Math.max(0, Math.round(top));
  const h = Math.round(bottom) - t;
  await sharp(sourcePath).extract({ left: 0, top: t, width, height: h }).png().toFile(path.join(outDir, outName));
  console.log(`  wrote ${outName} (${width}x${h})`);
}

async function measure(page, ids) {
  return page.evaluate((ids) => {
    const out = {};
    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      out[id] = { top: r.top + window.scrollY, bottom: r.bottom + window.scrollY };
    }
    out.pageHeight = document.body.scrollHeight;
    return out;
  }, ids);
}

async function withHeaderUnstuck(page, fn) {
  await page.evaluate(() => {
    const header = document.querySelector('header');
    if (header) {
      header.dataset.reviewCapturePosition = header.style.position || '';
      header.style.position = 'static';
    }
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

async function warmUp(page) {
  await page.evaluate(async () => {
    const step = Math.max(400, window.innerHeight * 0.85);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 250));
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(150);
}

// ---------------------------------------------------------------------------
logSection('Functional checks: FAQ, services disclosure, reduced motion, overflow');
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const watch = watchErrors(page, 'home-functional');
  await page.goto(base, { waitUntil: 'networkidle' });

  // FAQ: open the first item via click, confirm it expands and only one stays open.
  const firstSummary = page.locator('#faq details summary').first();
  await firstSummary.click();
  const firstOpen = await page.locator('#faq details').first().evaluate((el) => el.open);
  console.log(`  FAQ first item opens on click: ${firstOpen ? 'OK' : 'FAIL'}`);
  if (!firstOpen) failures++;

  const secondSummary = page.locator('#faq details summary').nth(1);
  await secondSummary.click();
  const [firstStillOpen, secondOpen] = await page.evaluate(() => {
    const items = document.querySelectorAll('#faq details');
    return [items[0].open, items[1].open];
  });
  console.log(
    `  FAQ exclusive-open (native <details name>): first=${firstStillOpen} second=${secondOpen} — ${
      !firstStillOpen && secondOpen ? 'OK' : 'browser-dependent, not a failure'
    }`,
  );

  // Services progressive disclosure: title/summary always visible, examples behind "See examples ↓".
  const serviceDetails = page.locator('#services details').first();
  const examplesHiddenInitially = await serviceDetails.evaluate((el) => !el.open);
  console.log(`  Services examples collapsed by default: ${examplesHiddenInitially ? 'OK' : 'FAIL'}`);
  if (!examplesHiddenInitially) failures++;
  const collapsedLabel = (await serviceDetails.locator('summary').innerText()).trim();
  console.log(`  Collapsed label reads "See examples ↓": ${collapsedLabel === 'See examples ↓' ? 'OK' : `FAIL (got "${collapsedLabel}")`}`);
  if (collapsedLabel !== 'See examples ↓') failures++;
  await serviceDetails.locator('summary').click();
  const examplesOpen = await serviceDetails.evaluate((el) => el.open);
  console.log(`  Services "See examples" expands on click: ${examplesOpen ? 'OK' : 'FAIL'}`);
  if (!examplesOpen) failures++;
  const expandedLabel = (await serviceDetails.locator('summary').innerText()).trim();
  console.log(`  Expanded label reads "Hide examples ↑": ${expandedLabel === 'Hide examples ↑' ? 'OK' : `FAIL (got "${expandedLabel}")`}`);
  if (expandedLabel !== 'Hide examples ↑') failures++;

  const overflow = await checkOverflow(page);
  console.log(`  Horizontal overflow at 1440px: ${overflow ? 'FAIL — overflow present' : 'none'}`);
  if (overflow) failures++;

  console.log(`  Console/network errors: ${watch.errors.length === 0 ? 'none' : watch.errors.join('; ')}`);
  if (watch.errors.length > 0) failures++;

  await context.close();
}

// Tabs + lightbox now live on /work (the homepage Featured Work section was removed in this pass).
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const watch = watchErrors(page, 'work-functional');
  await page.goto(`${base}/work#blue-ridge`, { waitUntil: 'networkidle' });

  const anchorInView = await page.evaluate(() => {
    const el = document.getElementById('blue-ridge');
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  });
  console.log(`  /work#blue-ridge deep link scrolls the right section into view: ${anchorInView ? 'OK' : 'FAIL'}`);
  if (!anchorInView) failures++;

  const tabs = page.locator('#blue-ridge [role="tab"]');
  await tabs.first().focus();
  await page.keyboard.press('ArrowRight');
  const secondSelected = await tabs.nth(1).getAttribute('aria-selected');
  console.log(`  ScreenshotTabs ArrowRight moves selection: ${secondSelected === 'true' ? 'OK' : 'FAIL'}`);
  if (secondSelected !== 'true') failures++;

  // Every ScreenShot instance on the page renders its own <dialog>, so check
  // for *any* open dialog rather than the first one in document order.
  await page.locator('#blue-ridge [role="tabpanel"]:not([hidden]) button[aria-label^="Enlarge"]').click();
  await page.waitForTimeout(200);
  const dialogOpen = await page.evaluate(() => document.querySelector('dialog[open]') !== null);
  console.log(`  Lightbox opens: ${dialogOpen ? 'OK' : 'FAIL'}`);
  if (!dialogOpen) failures++;
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  const dialogClosed = await page.evaluate(() => document.querySelector('dialog[open]') === null);
  console.log(`  Lightbox closes on Escape: ${dialogClosed ? 'OK' : 'FAIL'}`);
  if (!dialogClosed) failures++;

  if (watch.errors.length > 0) {
    console.log(`  Console/network errors (/work): ${watch.errors.join('; ')}`);
    failures++;
  }
  await context.close();
}

// Reduced motion: page should render identically without relying on JS-driven reveal.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const watch = watchErrors(page, 'home-reduced-motion');
  await page.goto(base, { waitUntil: 'networkidle' });
  const heroVisible = await page.locator('#top h1').isVisible();
  console.log(`  prefers-reduced-motion: hero content visible immediately: ${heroVisible ? 'OK' : 'FAIL'}`);
  if (!heroVisible) failures++;
  if (watch.errors.length > 0) {
    console.log(`  Console/network errors (reduced motion): ${watch.errors.join('; ')}`);
    failures++;
  }
  await context.close();
}

// ---------------------------------------------------------------------------
logSection('Form: validation errors, success, and failure states');
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const watch = watchErrors(page, 'form');
  await page.goto(`${base}/#inquiry`, { waitUntil: 'networkidle' });
  await page.locator('#inquiry').scrollIntoViewIfNeeded();

  // Submit empty -> inline errors, no data wiped (there is none to wipe, but confirm fields stay).
  await page.locator('#inquiry form button[type="submit"]').click();
  await page.waitForTimeout(100);
  const errorCount = await page.locator('#inquiry form [id$="-error"]').count();
  console.log(`  Empty submit shows inline errors: ${errorCount >= 3 ? 'OK' : 'FAIL'} (${errorCount} errors)`);
  if (errorCount < 3) failures++;

  await withHeaderUnstuck(page, async () =>
    page.screenshot({ path: path.join(outDir, 'v2-home-desktop-form-error.png'), clip: await formClip(page) }),
  );

  // Fill valid data and submit -> success state.
  await page.locator('#inquiry input[type="email"]').fill('owner@example.com');
  await page.locator('#inquiry input[type="text"]').fill('Example Business');
  await page.locator('#inquiry input[type="radio"]').first().check();
  await page.locator('#inquiry form button[type="submit"]').click();
  await page.waitForTimeout(1200);
  const successVisible = await page.locator('#inquiry h3:has-text("Inquiry received.")').isVisible();
  console.log(`  Valid submit shows success state: ${successVisible ? 'OK' : 'FAIL'}`);
  if (!successVisible) failures++;
  await withHeaderUnstuck(page, async () =>
    page.screenshot({ path: path.join(outDir, 'v2-home-desktop-form-success.png'), clip: await formClip(page) }),
  );

  await context.close();
}

async function formClip(page) {
  const box = await page.locator('#inquiry').boundingBox();
  return { x: 0, y: Math.max(0, box.y - 20), width: 1440, height: Math.min(900, box.height + 40) };
}

{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${base}/#inquiry`, { waitUntil: 'networkidle' });
  await page.locator('#inquiry').scrollIntoViewIfNeeded();

  // Deliberate, code-controlled failure trigger (see src/lib/inquiry.ts) — not advertised in the UI.
  await page.locator('#inquiry input[type="email"]').fill('fail@test.dev');
  await page.locator('#inquiry input[type="text"]').fill('Example Business');
  await page.locator('#inquiry input[type="radio"]').first().check();
  await page.locator('#inquiry form button[type="submit"]').click();
  await page.waitForTimeout(1200);
  const failVisible = await page.locator('#inquiry [role="alert"]').isVisible();
  console.log(`  Simulated-failure submit shows error banner: ${failVisible ? 'OK' : 'FAIL'}`);
  if (!failVisible) failures++;
  const dataKept = await page.locator('#inquiry input[type="text"]').inputValue();
  console.log(`  Entered data kept after failure: ${dataKept === 'Example Business' ? 'OK' : 'FAIL'}`);
  if (dataKept !== 'Example Business') failures++;
  await withHeaderUnstuck(page, async () =>
    page.screenshot({ path: path.join(outDir, 'v2-home-desktop-form-failure.png'), clip: await formClip(page) }),
  );

  await context.close();
}

// ---------------------------------------------------------------------------
logSection('Mobile sticky CTA');
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  const sticky = page.locator('[role="region"][aria-label="Start an inquiry"]');

  // Tailwind v4 applies translate-* via the standalone CSS `translate`
  // property, not a `transform` matrix — checking `.transform` here always
  // reads "none" whether the bar is shown or hidden. `.translate` is "0px" at
  // rest and "0px 100%" once `translate-y-full` is applied.
  const isShown = async () => sticky.evaluate((el) => getComputedStyle(el).translate === '0px');

  console.log(`  Visible near top of page: ${(await isShown()) ? 'OK' : 'FAIL'}`);
  if (!(await isShown())) failures++;

  // Focusable and in the tab order while visible.
  const tabIndexVisible = await sticky.locator('a').evaluate((el) => el.tabIndex);
  console.log(`  Focusable while visible (tabIndex=${tabIndexVisible}): ${tabIndexVisible !== -1 ? 'OK' : 'FAIL'}`);
  if (tabIndexVisible === -1) failures++;

  // Bottom clearance: the CTA is a fixed bar of known height: confirm content just
  // above its top edge is still real, hit-testable page content — not something the
  // bar has silently swallowed.
  const clearanceOk = await sticky.evaluate((el) => {
    const barTop = el.getBoundingClientRect().top;
    const probeY = barTop - 8; // just above the bar
    const probeX = window.innerWidth / 2;
    const hit = document.elementFromPoint(probeX, probeY);
    return hit !== null && !el.contains(hit);
  });
  console.log(`  Content just above the bar is real, hit-testable page content: ${clearanceOk ? 'OK' : 'FAIL'}`);
  if (!clearanceOk) failures++;

  // Safe-area inset is actually applied (not just a static bottom padding).
  const safeArea = await sticky.evaluate((el) => el.style.paddingBottom);
  const hasSafeArea = safeArea.includes('safe-area-inset-bottom');
  console.log(`  Safe-area inset applied to bottom padding: ${hasSafeArea ? 'OK' : 'FAIL'} ("${safeArea}")`);
  if (!hasSafeArea) failures++;

  // Scrolls correctly to #inquiry, then hides permanently rather than
  // reappearing on the way toward the footer.
  await sticky.locator('a').click();
  await page.waitForTimeout(500);
  const hashCorrect = new URL(page.url()).hash === '#inquiry';
  console.log(`  CTA click navigates to #inquiry: ${hashCorrect ? 'OK' : 'FAIL'} (${page.url()})`);
  if (!hashCorrect) failures++;

  await page.waitForTimeout(300); // IntersectionObserver callback + transition
  console.log(`  Hides once #inquiry is reached: ${!(await isShown()) ? 'OK' : 'FAIL'}`);
  if (await isShown()) failures++;

  const tabIndexHidden = await sticky.locator('a').evaluate((el) => el.tabIndex);
  console.log(`  Not focusable once hidden (tabIndex=${tabIndexHidden}): ${tabIndexHidden === -1 ? 'OK' : 'FAIL'}`);
  if (tabIndexHidden !== -1) failures++;

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); // scroll on toward the footer
  await page.waitForTimeout(200);
  console.log(`  Stays hidden past #inquiry, toward the footer: ${!(await isShown()) ? 'OK' : 'FAIL'}`);
  if (await isShown()) failures++;

  await context.close();
}

// ---------------------------------------------------------------------------
logSection('Accessibility (axe-core)');
const pages = [
  { url: base, name: 'home' },
  { url: `${base}/work`, name: 'work' },
  { url: `${base}/founding-offer`, name: 'founding-offer' },
  { url: `${base}/about`, name: 'about' },
  { url: `${base}/privacy`, name: 'privacy' },
  { url: `${base}/terms`, name: 'terms' },
];
for (const { url, name } of pages) {
  for (const [vpName, viewport] of [
    ['desktop', { width: 1440, height: 900 }],
    ['mobile', { width: 390, height: 844 }],
  ]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    const v = await runAxe(page, `${name}-${vpName}`);
    failures += v;
    const overflow = await checkOverflow(page);
    if (overflow) {
      console.log(`  Horizontal overflow at ${name}-${vpName}: FAIL`);
      failures++;
    }
    await context.close();
  }
}

// Mobile menu open + FAQ open state for a11y as well.
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.locator('button[aria-controls="mobile-nav"]').click();
  await page.waitForTimeout(200);
  const v = await runAxe(page, 'home-mobile-menu-open');
  failures += v;
  await context.close();
}

// ---------------------------------------------------------------------------
logSection('Screenshots');

// ---- Homepage desktop (1440px) ----
{
  const width = 1440;
  const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  await warmUp(page);
  const m = await measure(page, ['top', 'work-nav', 'services', 'founding-offer', 'founder', 'inquiry']);
  const full = path.join(outDir, 'v2-home-desktop-full.png');
  await withHeaderUnstuck(page, () => page.screenshot({ path: full, fullPage: true }));
  console.log(`  wrote v2-home-desktop-full.png (${width}x${Math.round(m.pageHeight)})`);
  await crop(full, 'v2-home-desktop-hero.png', 0, m.top.bottom, width);
  await crop(full, 'v2-home-desktop-work-nav.png', m['work-nav'].top, m['work-nav'].bottom, width);
  await crop(full, 'v2-home-desktop-services.png', m.services.top, m.services.bottom, width);
  await crop(full, 'v2-home-desktop-offer.png', m['founding-offer'].top, m['founding-offer'].bottom, width);
  await crop(full, 'v2-home-desktop-founder.png', m.founder.top, m.founder.bottom, width);
  await crop(full, 'v2-home-desktop-form.png', m.inquiry.top, m.inquiry.bottom, width);

  // FAQ open state.
  await page.locator('#faq').scrollIntoViewIfNeeded();
  await page.locator('#faq details summary').first().click();
  await page.waitForTimeout(150);
  const faqBox = await page.locator('#faq').boundingBox();
  await page.screenshot({
    path: path.join(outDir, 'v2-faq-open-desktop.png'),
    clip: { x: 0, y: faqBox.y, width, height: Math.min(900, faqBox.height) },
  });
  console.log('  wrote v2-faq-open-desktop.png');

  await context.close();
}

// ---- Homepage mobile (390px) ----
{
  const width = 390;
  const context = await browser.newContext({ viewport: { width, height: 844 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  await warmUp(page);
  const m = await measure(page, ['top', 'services', 'inquiry']);
  const full = path.join(outDir, 'v2-home-mobile-full.png');
  await withHeaderUnstuck(page, () => page.screenshot({ path: full, fullPage: true }));
  console.log(`  wrote v2-home-mobile-full.png (${width}x${Math.round(m.pageHeight)})`);
  await crop(full, 'v2-home-mobile-hero.png', 0, m.top.bottom, width);
  await crop(full, 'v2-home-mobile-services.png', m.services.top, m.services.bottom, width);
  await crop(full, 'v2-home-mobile-form.png', m.inquiry.top, m.inquiry.bottom, width);

  // Mobile sticky CTA — visible near the top of the page.
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(outDir, 'v2-mobile-sticky-cta.png') });
  console.log('  wrote v2-mobile-sticky-cta.png');

  await context.close();
}

// ---- /work ----
for (const [name, width, height] of [
  ['v2-work-desktop-full.png', 1440, 900],
  ['v2-work-mobile-full.png', 390, 844],
]) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.goto(`${base}/work`, { waitUntil: 'networkidle' });
  await warmUp(page);
  await withHeaderUnstuck(page, () => page.screenshot({ path: path.join(outDir, name), fullPage: true }));
  console.log(`  wrote ${name}`);
  await context.close();
}

// ---- /founding-offer ----
{
  const width = 1440;
  const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.goto(`${base}/founding-offer`, { waitUntil: 'networkidle' });
  await warmUp(page);
  const m = await measure(page, ['artifact', 'inquiry']);
  const full = path.join(outDir, 'v2-offer-desktop-full.png');
  await page.screenshot({ path: full, fullPage: true });
  console.log(`  wrote v2-offer-desktop-full.png (${width}x${Math.round(m.pageHeight)})`);
  await crop(full, 'v2-offer-desktop-hero.png', 0, m.artifact.top, width);
  await crop(full, 'v2-offer-desktop-form.png', m.inquiry.top, m.inquiry.bottom, width);
  await context.close();
}
{
  const width = 390;
  const context = await browser.newContext({ viewport: { width, height: 844 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.goto(`${base}/founding-offer`, { waitUntil: 'networkidle' });
  await warmUp(page);
  const m = await measure(page, ['inquiry']);
  const full = path.join(outDir, 'v2-offer-mobile-full.png');
  await page.screenshot({ path: full, fullPage: true });
  console.log(`  wrote v2-offer-mobile-full.png (${width}x${Math.round(m.pageHeight)})`);
  await crop(full, 'v2-offer-mobile-form.png', m.inquiry.top, m.inquiry.bottom, width);
  await context.close();
}

// ---- /about ----
for (const [name, width, height] of [
  ['v2-about-desktop-full.png', 1440, 900],
  ['v2-about-mobile-full.png', 390, 844],
]) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.goto(`${base}/about`, { waitUntil: 'networkidle' });
  await warmUp(page);
  await withHeaderUnstuck(page, () => page.screenshot({ path: path.join(outDir, name), fullPage: true }));
  console.log(`  wrote ${name}`);
  await context.close();
}

await browser.close();
console.log(`\nAll files written to ${outDir}`);
console.log(`\nTotal failures/violation groups: ${failures}`);
process.exit(failures === 0 ? 0 : 1);
