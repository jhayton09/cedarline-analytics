/**
 * Local review helper. Captures the running site at several viewports.
 * Dev-only: not part of the build, not referenced by the app.
 *
 * Dev-only: not part of the build. Requires a one-off install that is deliberately
 * kept out of package.json, because Playwright downloads browsers on install and
 * that has no place in a Vercel build:
 *
 *   npm i --no-save playwright axe-core
 *
 *   node scripts/shots.mjs [baseUrl] [outDir]
 */
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const base = process.argv[2] ?? 'http://localhost:3111';
const outDir = process.argv[3] ?? '/tmp/cedarline-shots';

const viewports = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'laptop-1280', width: 1280, height: 800 },
  { name: 'tablet-834', width: 834, height: 1112 },
  { name: 'mobile-390', width: 390, height: 844 },
];

const sections = [
  'top',
  'starting-points',
  'services',
  'work',
  'approach',
  'about',
  'founding-offer',
  'contact',
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const errors = [];

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[${vp.name}] console: ${msg.text()}`);
  });
  page.on('pageerror', (err) => errors.push(`[${vp.name}] pageerror: ${err.message}`));
  page.on('requestfailed', (req) =>
    errors.push(`[${vp.name}] requestfailed: ${req.url()} ${req.failure()?.errorText}`),
  );

  await page.goto(base, { waitUntil: 'networkidle' });

  // Walk the page so every lazy image and reveal has fired before capturing.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });

  await page.screenshot({
    path: `${outDir}/${vp.name}-full.png`,
    fullPage: true,
    timeout: 120000,
  });

  for (const id of sections) {
    const el = page.locator(`#${id}`);
    if ((await el.count()) === 0) continue;
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${outDir}/${vp.name}-${id}.png`, scale: 'css' });
  }

  // Horizontal overflow check.
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  if (overflow > 1) errors.push(`[${vp.name}] horizontal overflow: ${overflow}px`);

  await context.close();
}

// Lightbox check at mobile width.
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.locator('#work button[aria-label^="Enlarge"]').first().click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${outDir}/mobile-390-lightbox.png` });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  const stillOpen = await page.locator('dialog[open]').count();
  if (stillOpen > 0) errors.push('[lightbox] did not close on Escape');
  await context.close();
}

// Mobile menu check.
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.locator('button[aria-controls="mobile-nav"]').click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${outDir}/mobile-390-menu.png` });
  await context.close();
}

await browser.close();

console.log(`Screenshots written to ${outDir}`);
if (errors.length) {
  console.log('\nIssues:');
  errors.forEach((e) => console.log(' -', e));
} else {
  console.log('No console errors, failed requests, or horizontal overflow detected.');
}
