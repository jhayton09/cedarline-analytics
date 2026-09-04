/**
 * Derives the web-ready image set in /public from the original files in /assets.
 *
 * Originals are never modified. Crop boxes were measured from the source files by
 * scanning for the last column/row containing real ink (ignoring faint spreadsheet
 * gridlines) and for the whitespace bands between dashboard blocks, so each crop
 * ends on a natural boundary instead of slicing through a chart.
 *
 * Run with: npm run images
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'assets');
const OUT = path.join(ROOT, 'public');

/**
 * @typedef {{ left: number, top: number, width: number, height: number }} Box
 * @typedef {{ src: string, out: string, crop?: Box, note: string }} Shot
 */

/** @type {Shot[]} */
const SCREENSHOTS = [
  {
    src: 'carolina-landscaping-dashboard.png',
    out: 'work/carolina-landscaping-dashboard',
    // Source is 1480x1032. Content ends at x=1398; the lower chart row is clipped by
    // the original screenshot, so cut in the whitespace band at y=796-852.
    crop: { left: 0, top: 0, width: 1412, height: 824 },
    note: 'KPI tiles, performance-vs-target table and monthly charts',
  },
  {
    src: 'carolina-landscaping-data.png',
    out: 'work/carolina-landscaping-data',
    // Source is 2236x1036 but only the top 301px carry data; the rest is empty grid.
    crop: { left: 0, top: 0, width: 2236, height: 310 },
    note: 'monthly data table feeding the dashboard',
  },
  {
    src: 'queen-city-cleaning-dashboard.png',
    out: 'work/queen-city-cleaning-dashboard',
    // Content occupies the left 1271px; charts end at y=974 before a clipped footnote.
    crop: { left: 0, top: 0, width: 1300, height: 1000 },
    note: 'forecast dashboard with scenario comparison',
  },
  {
    src: 'queen-city-cleaning-scenarios.png',
    out: 'work/queen-city-cleaning-scenarios',
    // Full width is used; content ends at y=595.
    crop: { left: 0, top: 0, width: 2226, height: 615 },
    note: 'assumption drivers and seasonality indices',
  },
  {
    src: 'blue-ridge-dashboard.png',
    out: 'work/blue-ridge-dashboard',
    // The dashboard proper ends at x=812; a helper "CHART DATA" block sits from x=970.
    // Cut at 860 to drop the helper columns, and at y=772 above the clipped chart row.
    crop: { left: 0, top: 0, width: 860, height: 772 },
    note: 'management dashboard, helper columns cropped out',
  },
  {
    src: 'blue-ridge-job-automation.png',
    out: 'work/blue-ridge-job-automation',
    // Content ends at x=2043; rows continue past the bottom of the capture.
    crop: { left: 0, top: 0, width: 2060, height: 1030 },
    note: 'job log with calculated columns and status flags',
  },
];

async function emit(pipeline, outBase, { webpQuality = 90 } = {}) {
  const target = path.join(OUT, `${outBase}.webp`);
  await mkdir(path.dirname(target), { recursive: true });
  const info = await pipeline
    .clone()
    .webp({ quality: webpQuality, effort: 6 })
    .toFile(target);
  return info;
}

async function buildScreenshots() {
  /** @type {Record<string, { width: number, height: number }>} */
  const manifest = {};

  for (const shot of SCREENSHOTS) {
    let pipeline = sharp(path.join(SRC, shot.src)).flatten({ background: '#ffffff' });
    if (shot.crop) pipeline = pipeline.extract(shot.crop);

    // Screenshots stay at their cropped native resolution: these are spreadsheets and
    // the cell text has to survive being enlarged in the lightbox.
    const info = await emit(pipeline, shot.out, { webpQuality: 90 });
    manifest[path.basename(shot.out)] = { width: info.width, height: info.height };
    console.log(
      `${shot.src.padEnd(38)} -> ${shot.out}.webp  ${info.width}x${info.height}  ` +
        `${(info.size / 1024).toFixed(0)}kb  (${shot.note})`,
    );
  }

  return manifest;
}

async function buildBrand() {
  /** @type {Record<string, { width: number, height: number }>} */
  const manifest = {};

  // Both logo files sit on a 2000x2000 white canvas with heavy padding. Trim to the
  // artwork so layout spacing is controlled by CSS rather than baked-in whitespace.
  const logo = sharp(path.join(SRC, 'cedarline-logo.png'))
    .flatten({ background: '#ffffff' })
    .trim({ background: '#ffffff', threshold: 12 })
    .resize({ width: 1200, withoutEnlargement: true });
  const logoInfo = await emit(logo, 'brand/cedarline-logo', { webpQuality: 95 });
  manifest['cedarline-logo'] = { width: logoInfo.width, height: logoInfo.height };
  console.log(`cedarline-logo    -> ${logoInfo.width}x${logoInfo.height}`);

  const iconTrimmed = sharp(path.join(SRC, 'cedarline-icon.png'))
    .flatten({ background: '#ffffff' })
    .trim({ background: '#ffffff', threshold: 12 });
  const iconInfo = await emit(
    iconTrimmed.clone().resize({ width: 512, withoutEnlargement: true }),
    'brand/cedarline-icon',
    { webpQuality: 95 },
  );
  manifest['cedarline-icon'] = { width: iconInfo.width, height: iconInfo.height };

  // Favicon + apple touch icon, via the Next.js app-directory file convention.
  // The mark is padded onto a square so it is not cropped at small sizes.
  const { width: iw, height: ih } = await iconTrimmed.clone().metadata();
  const side = Math.max(iw ?? 0, ih ?? 0);
  const square = (size, background) =>
    iconTrimmed
      .clone()
      .extend({
        top: Math.round((side - (ih ?? 0)) / 2),
        bottom: side - (ih ?? 0) - Math.round((side - (ih ?? 0)) / 2),
        left: Math.round((side - (iw ?? 0)) / 2),
        right: side - (iw ?? 0) - Math.round((side - (iw ?? 0)) / 2),
        background,
      })
      .resize(size, size, { fit: 'contain', background })
      .png();

  const appDir = path.join(ROOT, 'src', 'app');
  await square(96, '#ffffff').toFile(path.join(appDir, 'icon.png'));
  await square(180, '#ffffff').toFile(path.join(appDir, 'apple-icon.png'));
  console.log('favicon + apple touch icon written to src/app');

  const headshot = sharp(path.join(SRC, 'jake-hayton-headshot.png'))
    .flatten({ background: '#ffffff' })
    .resize({ width: 1000, withoutEnlargement: true });
  const headInfo = await emit(headshot, 'brand/jake-hayton-headshot', { webpQuality: 88 });
  manifest['jake-hayton-headshot'] = { width: headInfo.width, height: headInfo.height };
  console.log(`jake-hayton-headshot -> ${headInfo.width}x${headInfo.height}`);

  return manifest;
}

const manifest = { ...(await buildBrand()), ...(await buildScreenshots()) };
await writeFile(
  path.join(ROOT, 'src', 'lib', 'image-manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
);
console.log('\nWrote src/lib/image-manifest.json');
