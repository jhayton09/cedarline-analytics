/**
 * Local review helper: runs axe-core against the page at desktop and mobile,
 * with the lightbox and the mobile menu open as well, since those states are
 * only reachable through interaction.
 *
 * Dev-only: not part of the build. Requires a one-off install that is deliberately
 * kept out of package.json, because Playwright downloads browsers on install and
 * that has no place in a Vercel build:
 *
 *   npm i --no-save playwright axe-core
 *
 *   node scripts/a11y.mjs [baseUrl]
 */
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const axePath = require.resolve('axe-core');
const base = process.argv[2] ?? 'http://localhost:3111';

const browser = await chromium.launch();

async function audit(name, width, height, prepare) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  if (prepare) await prepare(page);
  await page.addScriptTag({ path: axePath });
  const results = await page.evaluate(async () =>
    // @ts-expect-error injected global
    window.axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] },
    }),
  );
  await context.close();

  const violations = results.violations.filter((v) => v.impact !== 'minor' || true);
  console.log(`\n=== ${name} (${width}x${height}) ===`);
  if (violations.length === 0) {
    console.log(`no violations (${results.passes.length} checks passed)`);
    return 0;
  }
  violations.forEach((v) => {
    console.log(`\n[${v.impact}] ${v.id} — ${v.help}`);
    v.nodes.slice(0, 4).forEach((n) => {
      console.log(`   ${n.target.join(' ')}`);
      console.log(`   ${n.failureSummary?.split('\n').join(' | ').slice(0, 220)}`);
    });
    if (v.nodes.length > 4) console.log(`   ...and ${v.nodes.length - 4} more`);
  });
  return violations.length;
}

let total = 0;
total += await audit('desktop', 1440, 900);
total += await audit('mobile', 390, 844);
total += await audit('mobile — menu open', 390, 844, async (page) => {
  await page.locator('button[aria-controls="mobile-nav"]').click();
  await page.waitForTimeout(300);
});
total += await audit('desktop — lightbox open', 1440, 900, async (page) => {
  await page.locator('#work button[aria-label^="Enlarge"]').first().click();
  await page.waitForTimeout(500);
});

await browser.close();
console.log(`\nTotal violation groups: ${total}`);
process.exit(total === 0 ? 0 : 1);
