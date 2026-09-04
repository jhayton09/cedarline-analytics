# Cedarline Analytics — website

Marketing site for Cedarline Analytics (cedarlineanalytics.com).

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · statically rendered.

No database, no authentication, no CMS, no API routes, no analytics or tracking
scripts, no cookies. The whole site is one prerendered page plus generated
metadata routes.

## Running it locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Before committing, the same three checks that gate the build:

```bash
npm run lint
npm run typecheck
npm run build
```

## Project layout

```
assets/                 Original source files, untouched. Never referenced at runtime.
public/brand/           Web-ready logo, icon, headshot (WebP)
public/work/            Web-ready portfolio screenshots (WebP, cropped)
scripts/
  prepare-images.mjs    Derives public/ from assets/ — see "Images" below
  serve.sh              Restarts `next start` cleanly on a given port
  shots.mjs             Dev-only: screenshots the running site at 4 viewports
  a11y.mjs              Dev-only: runs axe-core over the page in 4 states
src/app/                Layout, page, metadata routes, favicon, OG image
src/components/         Section and UI components
src/content/            All site copy: services, case studies, contact details
```

Copy lives in `src/content/` rather than inside components, so wording can be
changed in one place without touching layout.

## Images

`assets/` holds the untouched originals. `npm run images` regenerates everything
under `public/` from them — trimming the logo canvas, building the favicon and
apple touch icon, and cropping each screenshot to its measured content bounds
(the Blue Ridge dashboard has its helper columns cropped off; the dashboards that
were captured with a clipped chart row are cut at the whitespace band above it).

Screenshots stay at cropped native resolution because the click-to-enlarge view
needs the spreadsheet text to remain readable. Crop boxes and the reasoning
behind each one are documented in `scripts/prepare-images.mjs`.

Re-run `npm run images` after replacing anything in `assets/`.

## Review tooling

`scripts/shots.mjs` and `scripts/a11y.mjs` are dev-only helpers. They need
Playwright and axe-core, which are deliberately **not** in `package.json` —
Playwright downloads browsers on install, which does not belong in a deployment
build. Install them only when you need them:

```bash
npm i --no-save playwright axe-core
npm run build && ./scripts/serve.sh 3111
node scripts/shots.mjs        # writes to /tmp/cedarline-shots
node scripts/a11y.mjs         # axe-core, expects 0 violations
```

## Content accuracy

The three portfolio projects — Carolina Landscaping, Queen City Cleaning and
Blue Ridge Home Services — are fictional demonstration builds, not client work.
That disclosure appears on every case study, in the Selected Work introduction,
and in the footer. It is stored alongside the case study data in
`src/content/case-studies.ts` so it cannot be rendered without it.

There are no testimonials, client logos, performance claims or invented metrics
anywhere on the site. Keep it that way.

## Deployment

Not yet deployed. The domain is registered with Vercel and carries live Google
Workspace DNS records (MX, SPF, DKIM, DMARC, verification) — those must not be
modified when the site is connected.
