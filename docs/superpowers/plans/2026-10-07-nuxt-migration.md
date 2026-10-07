# Nuxt Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the six-page Masters Flying School static site as a statically generated Nuxt 4 app that looks identical to the original, then fix the audit findings the migration is meant to solve.

**Architecture:** The original pages move to `legacy/` untouched and become the visual reference. A tested Node script ports each legacy page's `<main>` into a Nuxt page. Header, footer and the inquiry form become Vue components. The DOM behaviors from `main.js` (fleet tabs, term tips, YouTube click-to-load, details links) become one composable that attaches to the ported markup. Playwright screenshots of `legacy/` are the baseline the Nuxt output must match before any intentional change lands.

**Tech Stack:** Nuxt 4 (static generation via `nuxt generate`), Vue 3, Tailwind CSS 3.4 compiled through PostCSS, `@nuxt/fonts` (self-hosted Barlow / Barlow Condensed), Vitest for pure functions, Playwright for end-to-end tests and screenshot parity, `serve` for static previews.

**Spec:** `PRODUCT.md` (product truth) plus the `/impeccable audit` findings from 2026-10-07. This plan covers these findings:

| Finding | Severity | Task |
|---|---|---|
| Tailwind Play CDN shipped to visitors | P1 | 2 |
| "Training pilots since 1935" stat is misleading | P1 | 10 |
| Term-tip notes not announced to screen readers | P2 | 6 |
| No Open Graph, canonical or structured data | P2 | 9 |
| Hard-coded hex colors bypass tokens | P2 | 2, 3 |
| Reduced-motion rule kills all motion | P3 | 2 |
| Header and footer duplicated in six files | Pattern | 4 |

The mailto form handoff stays as is: `PRODUCT.md` records the form backend as undecided.

## Global Constraints

- Node ≥ 20 (the machine has v23.5.0). Nuxt `^4`. Tailwind `^3.4`, not v4: v4 renames utilities this markup relies on (`rounded`, `shadow`, `outline-none`, default border color).
- Every Tailwind class in the legacy markup is kept exactly as written, apart from the single replacement `bg-[#7D8DA6]` → `bg-navy-400`.
- Copy is unchanged except the one approved edit in Task 10. Do not add, reword or invent facts. `PRODUCT.md` lists what must never be fabricated (tuition, pass rates, testimonials, placement percentages, safety statistics).
- Brand colors exist once, as CSS custom properties in `app/assets/css/main.css`. Tailwind and plain CSS both read them from there.
- Accessibility target is WCAG 2.2 AA. Focus styles, skip link, ARIA states and 44px+ tap targets from the legacy site must survive.
- Routes: `/`, `/courses`, `/fleet`, `/students`, `/about`, `/contact`. Every route is prerendered to static HTML.
- The pitch build is `noindex` by default (`NUXT_PUBLIC_INDEXABLE=false`). That stops a pitch copy from competing with the school's real site in search results.
- Commit messages: Conventional Commits. **Never add AI attribution**: no `Co-Authored-By` trailer and no tool mentions in commits, comments or docs. This is the repo owner's standing rule.
- Windows dev machine: use forward slashes in scripts, and never compare absolute paths by string equality (drive-letter case varies).

## Review Focus

1. **Cross-page hash links into the fleet tabs** (homepage card → `/fleet#piper-aztec` via client-side navigation) must select that aircraft's tab and scroll it into view below the sticky header. Test: Task 6, Step 1, `opens the right aircraft from a homepage card`.
2. **Back button after picking a tab** must return to the previous page with no Vue Router `history.state` warning. Choosing a tab rewrites the URL hash, and doing that carelessly breaks router state. Test: Task 6, Step 1, `back button works after choosing a tab`.
3. **Opening `/contact?course=cpl` directly** (static HTML with no query at build time) must preselect the course after hydration. Test: Task 7, Step 5, `preselects the course from the query string`.
4. **Opening the mobile menu, then navigating** must close the menu and unlock page scroll on the new page. Test: Task 5, Step 1, `mobile menu closes and unlocks scroll after navigating`.
5. **Fleet page before JavaScript runs** must show all six spec sheets with the tab bar hidden, as the legacy page did. Test: Task 6, Step 1, `fleet HTML works without JavaScript`.

---

## File Structure

```
legacy/                         original site, untouched (visual baseline + port source)
  *.html, assets/
app/
  app.vue                       html/body attrs, favicon, JSON-LD
  layouts/default.vue           skip link + header + <main id="main"> + footer
  components/SiteHeader.vue     nav, mobile menu, scroll hairline, contact-page variant
  components/SiteFooter.vue     addresses, footer nav, year
  components/InquiryForm.vue    contact form with validation and mailto handoff
  composables/usePageEnhancements.ts  tabs, term tips, YouTube, details links
  composables/useSiteMeta.ts    per-page title/description/OG/canonical/robots
  utils/inquiry.ts              validation rules, course list, mailto builder (pure)
  utils/inquiry.test.ts
  pages/{index,courses,fleet,students,about,contact}.vue   generated by the port script
  assets/css/main.css           Tailwind layers, color tokens, site styles
public/img/                     copied from legacy/assets/img
scripts/port-legacy.mjs         legacy page → Nuxt page converter
scripts/port-legacy.test.mjs
tests/e2e/                      Playwright specs + __screenshots__/ baselines
nuxt.config.ts, tailwind.config.ts, playwright.config.ts, vitest.config.ts, package.json, .gitignore
```

---

### Task 1: Put the project under git and preserve the original site

**Files:**
- Create: `.gitignore`
- Move: `*.html`, `assets/` → `legacy/`

**Interfaces:**
- Produces: `legacy/{index,courses,fleet,students,about,contact}.html` and `legacy/assets/**`, which every later task reads.

- [ ] **Step 1: Initialize the repository**

Run from the project root:
```bash
git init -b main
```
Expected: `Initialized empty Git repository`.

- [ ] **Step 2: Move the original site into `legacy/`**

```bash
mkdir legacy
mv index.html courses.html fleet.html students.html about.html contact.html assets legacy/
```

- [ ] **Step 3: Write `.gitignore`**

```gitignore
node_modules/
.nuxt/
.output/
.data/
.env
test-results/
playwright-report/
```

- [ ] **Step 4: Verify the legacy site still works from its new folder**

Run: `npx serve legacy -l 4100 --no-clipboard`, open `http://localhost:4100/`, then stop the server.
Expected: homepage renders with images and styles (paths are relative, so the move breaks nothing).

- [ ] **Step 5: Commit**

```bash
git add .gitignore legacy PRODUCT.md docs
git commit -m "chore: preserve original static site under legacy/"
```

---

### Task 2: Scaffold Nuxt with compiled Tailwind, tokens, fonts and the test harness

**Files:**
- Create: `package.json`, `nuxt.config.ts`, `tailwind.config.ts`, `app/assets/css/main.css`, `app/app.vue`, `app/pages/index.vue` (temporary), `playwright.config.ts`, `vitest.config.ts`, `tests/e2e/smoke.spec.ts`, `tests/e2e/parity.spec.ts`
- Copy: `legacy/assets/img/*` → `public/img/`

**Interfaces:**
- Produces: Tailwind color names `red`, `red-dark`, `red-tint`, `navy`, `navy-700`, `navy-400`, `navy-300`, `tarmac`, `apron`, `ink`, `ink-muted`, `line`, all backed by `--c-*` RGB channel variables. Also font families `font-display` and `font-sans`, `max-w-site`, every legacy CSS class (`.threshold`, `.threshold-thin`, `.designator`, `.route-track`, `.route-track-v`, `.tabular`, `.skip-link`, `.hero-photo`, `.yt`, `.chev`, `.on-dark`, `.site-header[data-scrolled]`), npm scripts `generate`, `test`, `test:e2e`, `test:baseline`, and screenshot baselines in `tests/e2e/__screenshots__/`.

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "masters-flying-school",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "serve .output/public -l 4200 --no-clipboard",
    "port": "node scripts/port-legacy.mjs",
    "test": "vitest run",
    "test:e2e": "nuxt generate && playwright test --project=nuxt",
    "test:baseline": "playwright test --project=legacy --update-snapshots",
    "postinstall": "nuxt prepare"
  }
}
```

- [ ] **Step 2: Install dependencies**

```bash
npm install nuxt@^4 @nuxt/fonts
npm install -D tailwindcss@^3.4 postcss autoprefixer vitest @playwright/test serve
npx playwright install chromium
```
Expected: installs finish, `nuxt prepare` runs with no errors.

- [ ] **Step 3: Copy images**

```bash
mkdir -p public/img && cp legacy/assets/img/* public/img/
```

- [ ] **Step 4: Write `playwright.config.ts`**

```ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: 'tests/e2e',
  // Both projects share one baseline per screenshot name, so legacy captures become the reference for Nuxt.
  snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}',
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: 'disabled' } },
  webServer: [
    { command: 'npx serve legacy -l 4100 --no-clipboard', port: 4100, reuseExistingServer: true },
    { command: 'npx serve .output/public -l 4200 --no-clipboard', port: 4200, reuseExistingServer: true },
  ],
  projects: [
    { name: 'legacy', testMatch: /parity\.spec\.ts/, use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:4100' } },
    { name: 'nuxt', use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:4200' } },
  ],
})
```

- [ ] **Step 5: Write `tests/e2e/parity.spec.ts`**

```ts
import { test, expect, type Page } from '@playwright/test'

const PAGES = ['index', 'courses', 'fleet', 'students', 'about', 'contact'] as const
const VIEWPORTS = { desktop: { width: 1280, height: 800 }, mobile: { width: 390, height: 844 } } as const

export function urlFor(name: string, project: string) {
  if (project === 'legacy') return `/${name}.html`
  return name === 'index' ? '/' : `/${name}`
}

async function settle(page: Page) {
  await page.evaluate(async () => {
    document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => { img.loading = 'eager' })
    await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => { img.onload = img.onerror = r }))))
    await document.fonts.ready
  })
}

for (const name of PAGES) {
  for (const [viewport, size] of Object.entries(VIEWPORTS)) {
    test(`${name} matches the legacy page (${viewport})`, async ({ page }, info) => {
      await page.setViewportSize(size)
      await page.goto(urlFor(name, info.project.name))
      await settle(page)
      await expect(page).toHaveScreenshot(`${name}-${viewport}.png`, {
        fullPage: true,
        // Third-party content (map iframes, YouTube thumbnails) changes on its own.
        mask: [page.locator('iframe'), page.locator('.yt img')],
      })
    })
  }
}
```

- [ ] **Step 6: Capture the legacy baselines**

Run: `mkdir -p .output/public && npm run test:baseline`
(The empty folder lets the second web server start; Playwright launches both servers for every run.)
Expected: 12 tests pass and 12 PNGs appear in `tests/e2e/__screenshots__/` (`index-desktop.png` … `contact-mobile.png`). Open two of them to confirm they show the real pages, not blank or unstyled ones.

- [ ] **Step 7: Write the failing smoke test `tests/e2e/smoke.spec.ts`**

```ts
import { test, expect } from '@playwright/test'

test('compiled Tailwind tokens and self-hosted fonts load', async ({ page }) => {
  const external: string[] = []
  page.on('request', (r) => { if (/cdn\.tailwindcss\.com|fonts\.googleapis\.com/.test(r.url())) external.push(r.url()) })
  await page.goto('/')
  const h1 = page.locator('h1')
  await expect(h1).toHaveCSS('color', 'rgb(14, 34, 64)')
  // fonts.check() returns true for families that were never declared, so inspect the loaded faces instead.
  const loaded = await page.evaluate(async () => {
    await document.fonts.ready
    return [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.replace(/["']/g, ''))
  })
  expect(loaded).toContain('Barlow Condensed')
  expect(external).toEqual([])
})
```

- [ ] **Step 8: Run it to verify it fails**

Run: `npx playwright test --project=nuxt smoke`
Expected: FAIL. `.output/public` is still empty, so `/` returns 404 and no `h1` is found.

- [ ] **Step 9: Write `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

// Colors resolve to the RGB channel variables in main.css, so opacity modifiers like border-ink-muted/80 keep working.
const c = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`

export default {
  content: ['./app/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        // Livery red from the fleet paint scheme and logo bird. Accent only.
        red: { DEFAULT: c('red'), dark: c('red-dark'), tint: c('red-tint') },
        // Navy from the "Flying School" logotype. Primary dark surface and headings.
        navy: { DEFAULT: c('navy'), 700: c('navy-700'), 400: c('navy-400'), 300: c('navy-300') },
        tarmac: c('tarmac'),
        apron: c('apron'),
        ink: { DEFAULT: c('ink'), muted: c('ink-muted') },
        line: c('line'),
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'Arial Narrow', 'sans-serif'],
        sans: ['Barlow', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '76rem' },
    },
  },
} satisfies Config
```

- [ ] **Step 10: Write `app/assets/css/main.css`**

Port of `legacy/assets/css/site.css`. Hex values are replaced by tokens, and the reduced-motion rule is narrowed to the motion that matters.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Brand tokens, as RGB channels so Tailwind can apply opacity. The only place these colors are defined. */
:root {
  --c-red: 200 16 46;        /* #C8102E */
  --c-red-dark: 162 12 36;   /* #A20C24 */
  --c-red-tint: 251 233 236; /* #FBE9EC */
  --c-navy: 14 34 64;        /* #0E2240 */
  --c-navy-700: 22 48 90;    /* #16305A */
  --c-navy-400: 125 141 166; /* #7D8DA6 */
  --c-navy-300: 174 183 194; /* #AEB7C2 */
  --c-tarmac: 20 26 34;      /* #141A22 */
  --c-apron: 244 245 247;    /* #F4F5F7 */
  --c-ink: 27 35 48;         /* #1B2330 */
  --c-ink-muted: 91 100 112; /* #5B6470 */
  --c-line: 221 225 230;     /* #DDE1E6 */
}

html { scroll-behavior: smooth; scroll-padding-top: 5.5rem; }

/* The hidden attribute must win over display utilities like .block or .grid. */
[hidden] { display: none !important; }
body { font-feature-settings: "kern"; text-rendering: optimizeLegibility; }

/* Spec tables and hour counts line up. */
.tabular { font-variant-numeric: tabular-nums; }

/* Visible focus everywhere, in brand red on light surfaces and white on dark ones. */
:focus-visible { outline: 3px solid rgb(var(--c-red)); outline-offset: 3px; border-radius: 2px; }
.on-dark :focus-visible { outline-color: #FFFFFF; }

.skip-link { position: absolute; left: 1rem; top: -4rem; z-index: 100; transition: top .15s ease-out; }
.skip-link:focus { top: 1rem; }

/* Runway threshold motif: the "piano keys" painted at the start of runway 17 at Plaridel. */
.threshold {
  background-image: repeating-linear-gradient(90deg, #FFFFFF 0 14px, transparent 14px 26px);
}
.threshold-thin {
  height: 6px;
  background-image: repeating-linear-gradient(90deg, rgb(var(--c-navy)) 0 22px, transparent 22px 34px);
}
.on-dark .threshold-thin {
  background-image: repeating-linear-gradient(90deg, rgba(255,255,255,.85) 0 22px, transparent 22px 34px);
}

/* Runway designator numerals. */
.designator { font-family: "Barlow Condensed", sans-serif; font-weight: 700; line-height: .8; letter-spacing: -.02em; }

/* Training route: dashed track joining waypoints. */
.route-track { background-image: repeating-linear-gradient(90deg, rgb(var(--c-red)) 0 10px, transparent 10px 18px); height: 2px; }
.route-track-v { background-image: repeating-linear-gradient(180deg, rgb(var(--c-red)) 0 10px, transparent 10px 18px); width: 2px; }

/* Header gains a hairline once the page scrolls, so it separates from content. */
.site-header[data-scrolled="true"] { box-shadow: 0 1px 0 rgb(var(--c-line)); }

/* One orchestrated moment: the hero photo settles in on load. */
@keyframes settle { from { opacity: 0; transform: scale(1.04); } to { opacity: 1; transform: scale(1); } }
.hero-photo { animation: settle .9s cubic-bezier(.2,.7,.2,1) both; }

/* Click-to-load video, so YouTube scripts only load when asked. */
.yt { position: relative; aspect-ratio: 16 / 9; background: rgb(var(--c-tarmac)); overflow: hidden; }
.yt img { width: 100%; height: 100%; object-fit: cover; transition: opacity .2s ease-out; }
.yt button:hover img { opacity: .85; }
.yt iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }

details > summary { list-style: none; cursor: pointer; }
details > summary::-webkit-details-marker { display: none; }
details[open] .chev { transform: rotate(180deg); }
.chev { transition: transform .2s ease-out; }

/* Drop movement, keep state feedback: the chevron still turns and colors still change. */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .hero-photo { animation: none; }
  .group:hover .group-hover\:scale-\[1\.03\],
  .group:hover .group-hover\:scale-105 { --tw-scale-x: 1; --tw-scale-y: 1; }
}
```

- [ ] **Step 11: Write `nuxt.config.ts`**

```ts
export default defineNuxtConfig({
  compatibilityDate: '2026-10-07',
  devtools: { enabled: false },
  modules: ['@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  postcss: { plugins: { tailwindcss: {}, autoprefixer: {} } },
  fonts: {
    families: [
      { name: 'Barlow', weights: [400, 500, 600], provider: 'google' },
      { name: 'Barlow Condensed', weights: [500, 600, 700], provider: 'google' },
    ],
  },
  nitro: {
    prerender: {
      routes: ['/', '/courses', '/fleet', '/students', '/about', '/contact'],
      crawlLinks: true,
    },
  },
})
```

- [ ] **Step 12: Write `app/app.vue` and a temporary `app/pages/index.vue`**

`app/app.vue`:
```vue
<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'en' },
  bodyAttrs: { class: 'bg-white font-sans text-base text-ink antialiased' },
  link: [{ rel: 'icon', href: '/img/logo.jpg' }],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

`app/pages/index.vue` (Task 5 replaces it):
```vue
<template>
  <h1 class="font-display text-5xl font-bold text-navy">Masters Flying School</h1>
</template>
```

- [ ] **Step 13: Write `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: { include: ['scripts/**/*.test.mjs', 'app/utils/**/*.test.ts'] },
})
```

- [ ] **Step 14: Run the smoke test to verify it passes**

Run: `npm run generate && npx playwright test --project=nuxt smoke`
Expected: PASS. If `document.fonts.check` fails, confirm `.output/public/_fonts/` contains Barlow Condensed files. If it is empty, the build had no network access to fetch Google Fonts; rerun with network access.

- [ ] **Step 15: Commit**

```bash
git add package.json package-lock.json nuxt.config.ts tailwind.config.ts playwright.config.ts vitest.config.ts app public tests
git commit -m "build: scaffold Nuxt with compiled Tailwind, color tokens and self-hosted fonts"
```

---

### Task 3: Port script that turns a legacy page into a Nuxt page

**Files:**
- Create: `scripts/port-legacy.mjs`
- Test: `scripts/port-legacy.test.mjs`

**Interfaces:**
- Produces:
  - `PAGES: string[]`, which is `['index','courses','fleet','students','about','contact']`
  - `extract(html: string): { title: string, description: string, main: string }`
  - `rewriteBody(main: string): string`
  - `toVue({ title, description, body }): string`. The generated page calls `useSiteMeta({ title, description })` and `usePageEnhancements(root)`, and renders `<InquiryForm />` where the legacy form was. Those three are defined in Tasks 5–7 and 9.
  - CLI: `npm run port` writes `app/pages/<name>.vue` for each page.

- [ ] **Step 1: Write the failing tests `scripts/port-legacy.test.mjs`**

```js
import { readFileSync } from 'node:fs'
import { describe, it, expect } from 'vitest'
import { PAGES, extract, rewriteBody, toVue } from './port-legacy.mjs'

const page = (main) => `<!doctype html><html><head><title>Fleet | Masters &amp; Co</title>
<meta name="description" content="It&#x27;s the fleet."></head><body><header>x</header>
<main id="main">${main}</main><footer>y</footer></body></html>`

describe('extract', () => {
  it('returns decoded title, description and the inside of <main>', () => {
    expect(extract(page('<h1>Fleet</h1>'))).toEqual({ title: 'Fleet | Masters & Co', description: "It's the fleet.", main: '<h1>Fleet</h1>' })
  })
  it('throws when <main id="main"> is missing', () => {
    expect(() => extract('<title>a</title><meta name="description" content="b">')).toThrow(/main/)
  })
})

describe('rewriteBody', () => {
  it('turns links to legacy pages into NuxtLinks, keeping attributes, query and hash', () => {
    expect(rewriteBody('<a href="courses.html#ppl" class="x">PPL</a>')).toBe('<NuxtLink to="/courses#ppl" class="x">PPL</NuxtLink>')
    expect(rewriteBody('<a class="y" href="contact.html?course=cpl#inquiry">Ask</a>')).toBe('<NuxtLink class="y" to="/contact?course=cpl#inquiry">Ask</NuxtLink>')
    expect(rewriteBody('<a href="index.html">Home</a>')).toBe('<NuxtLink to="/">Home</NuxtLink>')
  })
  it('keeps multi-line link contents', () => {
    expect(rewriteBody('<a href="fleet.html" class="group">\n<img src="assets/img/a.webp">\n</a>')).toBe('<NuxtLink to="/fleet" class="group">\n<img src="/img/a.webp">\n</NuxtLink>')
  })
  it('leaves tel, mailto, external and same-page links alone', () => {
    const html = '<a href="tel:+6328517042">c</a><a href="mailto:a@b.c">m</a><a href="https://facebook.com/x">f</a><a href="#visa-student">v</a>'
    expect(rewriteBody(html)).toBe(html)
  })
  it('points image paths at /img and swaps the untokenized bar color', () => {
    expect(rewriteBody('<img src="assets/img/logo.jpg"><span class="bg-[#7D8DA6]"></span>')).toBe('<img src="/img/logo.jpg"><span class="bg-navy-400"></span>')
  })
  it('replaces the inquiry form with the component', () => {
    expect(rewriteBody('<div><form id="inquiry-form" novalidate>\n<input name="a">\n</form></div>')).toBe('<div><InquiryForm /></div>')
  })
  it('refuses markup Vue would interpolate', () => {
    expect(() => rewriteBody('<p>{{ x }}</p>')).toThrow(/interpolation/)
  })
})

describe('toVue', () => {
  it('wraps the body and sets page meta from JSON-escaped strings', () => {
    const vue = toVue({ title: 'A "quoted" title', description: 'D', body: '<h1>A</h1>' })
    expect(vue).toContain('useSiteMeta({\n  title: "A \\"quoted\\" title",\n  description: "D",\n})')
    expect(vue).toContain('usePageEnhancements(root)')
    expect(vue).toContain('<div ref="root" class="contents"><h1>A</h1></div>')
  })
})

describe('every legacy page', () => {
  it.each(PAGES)('%s ports without leftover legacy paths', (name) => {
    const { main } = extract(readFileSync(`legacy/${name}.html`, 'utf8'))
    const body = rewriteBody(main)
    expect(body).not.toMatch(/href="(index|courses|fleet|students|about|contact)\.html/)
    expect(body).not.toContain('assets/img/')
    expect(body).not.toContain('#7D8DA6')
  })
})
```

- [ ] **Step 2: Run them to verify they fail**

Run: `npx vitest run scripts`
Expected: FAIL with `Failed to load url ./port-legacy.mjs`.

- [ ] **Step 3: Implement `scripts/port-legacy.mjs`**

```js
// Converts a legacy static page into a Nuxt page: the inside of <main> becomes the template,
// links between pages become NuxtLinks, and image paths point at public/img.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'

export const PAGES = ['index', 'courses', 'fleet', 'students', 'about', 'contact']

const PAGE_LINK = new RegExp(
  `<a\\b([^>]*?)\\shref="(${PAGES.join('|')})\\.html([?#][^"]*)?"([^>]*)>([\\s\\S]*?)<\\/a>`,
  'g',
)

const decode = (s) => s.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&')

export function extract(html) {
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1]
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1]
  const main = html.match(/<main id="main">([\s\S]*?)<\/main>/)?.[1]
  if (!title || !description || main === undefined) {
    throw new Error('Legacy page is missing <title>, meta description or <main id="main">')
  }
  return { title: decode(title), description: decode(description), main }
}

export function rewriteBody(main) {
  if (main.includes('{{')) throw new Error('Legacy markup contains "{{", which Vue would treat as interpolation')
  return main
    .replace(/<form id="inquiry-form"[\s\S]*?<\/form>/, '<InquiryForm />')
    .replace(PAGE_LINK, (_, before, page, rest = '', after, inner) =>
      `<NuxtLink${before} to="/${page === 'index' ? '' : page}${rest}"${after}>${inner}</NuxtLink>`)
    .replaceAll('assets/img/', '/img/')
    .replaceAll('bg-[#7D8DA6]', 'bg-navy-400')
}

export function toVue({ title, description, body }) {
  return `<script setup lang="ts">
useSiteMeta({
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)},
})
const root = ref<HTMLElement | null>(null)
usePageEnhancements(root)
</script>

<template>
  <div ref="root" class="contents">${body}</div>
</template>
`
}

if (process.argv[1]?.replace(/\\/g, '/').endsWith('scripts/port-legacy.mjs')) {
  mkdirSync('app/pages', { recursive: true })
  for (const name of PAGES) {
    const { title, description, main } = extract(readFileSync(`legacy/${name}.html`, 'utf8'))
    writeFileSync(`app/pages/${name}.vue`, toVue({ title, description, body: rewriteBody(main) }))
    console.log(`app/pages/${name}.vue`)
  }
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run scripts`
Expected: PASS, 15 tests (9 unit + 6 legacy pages).

- [ ] **Step 5: Commit**

```bash
git add scripts
git commit -m "build: add legacy page port script"
```

---

### Task 4: Shared layout, header and footer

**Files:**
- Create: `app/layouts/default.vue`, `app/components/SiteHeader.vue`, `app/components/SiteFooter.vue`
- Test: `tests/e2e/layout.spec.ts`

**Interfaces:**
- Consumes: color/font tokens and `.site-header`, `.skip-link`, `.threshold-thin`, `.on-dark`, `.tabular` classes from Task 2.
- Produces: `<main id="main">` wrapper that every page renders into. `SiteHeader` closes its mobile menu on any route change. `NuxtLink` sets `aria-current="page"` on the link to the current route by default; the header relies on that rather than setting it by hand.

- [ ] **Step 1: Write the failing tests `tests/e2e/layout.spec.ts`**

```ts
import { test, expect } from '@playwright/test'

test.describe('layout', () => {
  test('skip link is first in tab order and targets main', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: 'Skip to content' })
    await expect(skip).toBeFocused()
    await expect(skip).toHaveAttribute('href', '#main')
    await expect(page.locator('main#main')).toHaveCount(1)
  })

  test('header gains its hairline after scrolling', async ({ page }) => {
    await page.goto('/')
    const header = page.locator('.site-header')
    await expect(header).toHaveAttribute('data-scrolled', 'false')
    await page.evaluate(() => { document.body.style.minHeight = '300vh'; window.scrollTo(0, 400) })
    await expect(header).toHaveAttribute('data-scrolled', 'true')
  })

  test('mobile menu opens, focuses the first link, and closes on Escape', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    const toggle = page.getByRole('button', { name: 'Open menu' })
    await toggle.click()
    await expect(page.locator('#mobile-menu')).toBeVisible()
    await expect(page.locator('#mobile-menu a').first()).toBeFocused()
    await expect(page.locator('body')).toHaveClass(/overflow-hidden/)
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Escape')
    await expect(page.locator('#mobile-menu')).toBeHidden()
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused()
    await expect(page.locator('body')).not.toHaveClass(/overflow-hidden/)
  })

  test('footer shows the current year and both addresses', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer').last()
    await expect(footer).toContainText(`© ${new Date().getFullYear()} Masters Flying School`)
    await expect(footer).toContainText('Plaridel Airport, Plaridel, Bulacan')
  })
})
```

- [ ] **Step 2: Run them to verify they fail**

Run: `npm run test:e2e -- layout`
Expected: FAIL, with no "Skip to content" link found.

- [ ] **Step 3: Write `app/components/SiteHeader.vue`**

```vue
<script setup lang="ts">
const NAV = [
  { to: '/courses', label: 'Courses' },
  { to: '/fleet', label: 'Fleet' },
  { to: '/students', label: 'Students' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const

const route = useRoute()
// The contact page already shows the form, so the header drops its inquiry button there.
const onContact = computed(() => route.path.replace(/\/$/, '') === '/contact')

const open = ref(false)
const scrolled = ref(false)
const toggle = ref<HTMLButtonElement | null>(null)
const panel = ref<HTMLElement | null>(null)

watch(open, async (isOpen) => {
  document.body.classList.toggle('overflow-hidden', isOpen)
  if (isOpen) {
    await nextTick()
    panel.value?.querySelector('a')?.focus()
  }
})
watch(() => route.fullPath, () => { open.value = false })

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) {
    open.value = false
    toggle.value?.focus()
  }
}
const onScroll = () => { scrolled.value = window.scrollY > 8 }
const onWide = (e: MediaQueryListEvent) => { if (e.matches) open.value = false }
let wide: MediaQueryList | undefined

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('keydown', onKeydown)
  wide = window.matchMedia('(min-width: 1024px)')
  wide.addEventListener('change', onWide)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('keydown', onKeydown)
  wide?.removeEventListener('change', onWide)
  document.body.classList.remove('overflow-hidden')
})
</script>

<template>
  <header class="site-header sticky top-0 z-40 bg-white transition-shadow" :data-scrolled="String(scrolled)">
    <div class="mx-auto flex h-20 max-w-site items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
      <NuxtLink to="/" class="shrink-0" aria-label="Masters Flying School home">
        <img src="/img/logo.jpg" alt="Masters Flying School" width="179" height="91" class="h-12 w-auto sm:h-14">
      </NuxtLink>
      <nav aria-label="Main" class="hidden lg:block">
        <ul class="flex items-center gap-1 font-display text-lg font-semibold text-navy">
          <li v-for="item in NAV" :key="item.to">
            <NuxtLink :to="item.to" class="inline-flex min-h-[44px] items-center rounded px-3 hover:text-red aria-[current=page]:text-red aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[10px]">{{ item.label }}</NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="flex items-center gap-2">
        <a href="tel:+6328517042" class="hidden min-h-[44px] items-center rounded px-3 text-sm font-semibold text-navy hover:text-red xl:inline-flex tabular">(02) 851-7042</a>
        <NuxtLink v-if="!onContact" to="/contact#inquiry" class="hidden min-h-[44px] items-center rounded-md bg-red px-5 font-display text-lg font-semibold text-white transition-colors hover:bg-red-dark sm:inline-flex">Send an inquiry</NuxtLink>
        <button ref="toggle" type="button" aria-controls="mobile-menu" :aria-expanded="String(open)" :aria-label="open ? 'Close menu' : 'Open menu'" class="inline-flex h-11 w-11 items-center justify-center rounded-md text-navy hover:bg-apron lg:hidden" @click="open = !open">
          <svg :class="{ hidden: open }" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" /></svg>
          <svg :class="{ hidden: !open }" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6L19 6.4 17.6 5 12 10.6z" /></svg>
        </button>
      </div>
    </div>
    <div id="mobile-menu" ref="panel" :hidden="!open" class="border-t border-line bg-white lg:hidden">
      <nav aria-label="Mobile" class="mx-auto max-w-site px-4 pb-6 pt-2 sm:px-6">
        <ul class="divide-y divide-line font-display text-2xl font-semibold text-navy">
          <li v-for="item in NAV" :key="item.to">
            <NuxtLink :to="item.to" class="flex min-h-[52px] items-center aria-[current=page]:text-red" @click="open = false">{{ item.label }}</NuxtLink>
          </li>
        </ul>
        <div :class="onContact ? 'mt-4' : 'mt-4 grid gap-3 sm:grid-cols-2'">
          <NuxtLink v-if="!onContact" to="/contact#inquiry" class="flex min-h-[48px] items-center justify-center rounded-md bg-red font-display text-lg font-semibold text-white" @click="open = false">Send an inquiry</NuxtLink>
          <a href="tel:+6328517042" class="flex min-h-[48px] items-center justify-center rounded-md border border-navy font-semibold text-navy tabular">Call (02) 851-7042</a>
        </div>
      </nav>
    </div>
  </header>
</template>
```

- [ ] **Step 4: Write `app/components/SiteFooter.vue`**

```vue
<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="on-dark bg-tarmac text-white">
    <div class="threshold-thin" aria-hidden="true" />
    <div class="mx-auto max-w-site px-4 py-14 sm:px-6 lg:px-8">
      <div class="grid gap-10 lg:grid-cols-12">
        <p class="font-display text-3xl font-semibold leading-tight lg:col-span-5">Fly and you will catch the wind; dream and you shall reach your goal.</p>
        <div class="grid gap-8 sm:grid-cols-2 lg:col-span-7">
          <address class="not-italic">
            <p class="font-semibold">Main office</p>
            <p class="mt-1 text-navy-300">2317 Nissan Car Lease Bldg., Aurora Blvd., Pasay City, Metro Manila</p>
            <a href="tel:+6328517042" class="mt-2 inline-flex min-h-[44px] items-center text-white hover:underline tabular">(02) 851-7042</a>
          </address>
          <address class="not-italic">
            <p class="font-semibold">Hangar</p>
            <p class="mt-1 text-navy-300">Plaridel Airport, Plaridel, Bulacan</p>
            <a href="tel:+63447942865" class="mt-2 inline-flex min-h-[44px] items-center text-white hover:underline tabular">(044) 794-2865</a>
          </address>
        </div>
      </div>
      <div class="mt-12 flex flex-col gap-6 border-t border-white/15 pt-8 lg:flex-row lg:items-center lg:justify-between">
        <nav aria-label="Footer">
          <ul class="flex flex-wrap gap-x-6 gap-y-1">
            <li><NuxtLink to="/courses" class="inline-flex min-h-[44px] items-center hover:underline">Courses</NuxtLink></li>
            <li><NuxtLink to="/fleet" class="inline-flex min-h-[44px] items-center hover:underline">Fleet</NuxtLink></li>
            <li><NuxtLink to="/students" class="inline-flex min-h-[44px] items-center hover:underline">Students</NuxtLink></li>
            <li><NuxtLink to="/about" class="inline-flex min-h-[44px] items-center hover:underline">About</NuxtLink></li>
            <li><NuxtLink to="/contact" class="inline-flex min-h-[44px] items-center hover:underline">Contact</NuxtLink></li>
            <li><a href="mailto:info@mastersflyingschool.com" class="inline-flex min-h-[44px] items-center hover:underline">info@mastersflyingschool.com</a></li>
            <li><a href="https://www.facebook.com/pages/Masters-Flying-School/154831617913387" rel="noopener" target="_blank" class="inline-flex min-h-[44px] items-center hover:underline">Facebook</a></li>
          </ul>
        </nav>
        <p class="text-sm text-navy-300">© {{ year }} Masters Flying School. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
```

- [ ] **Step 5: Write `app/layouts/default.vue`**

```vue
<template>
  <a href="#main" class="skip-link rounded-md bg-navy px-4 py-3 font-semibold text-white">Skip to content</a>
  <SiteHeader />
  <main id="main">
    <slot />
  </main>
  <SiteFooter />
</template>
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm run test:e2e -- layout`
Expected: PASS (4 tests).

- [ ] **Step 7: Commit**

```bash
git add app/layouts app/components tests/e2e/layout.spec.ts
git commit -m "feat: shared layout with header, mobile menu and footer"
```

---

### Task 5: Generate the six pages

**Files:**
- Create: `app/composables/useSiteMeta.ts`, `app/composables/usePageEnhancements.ts` (stub, filled in Task 6), `app/components/InquiryForm.vue` (stub, filled in Task 7)
- Generate: `app/pages/{index,courses,fleet,students,about,contact}.vue` (overwrites the temporary index page)
- Test: `tests/e2e/pages.spec.ts`

**Interfaces:**
- Consumes: `npm run port` (Task 3), `default` layout (Task 4).
- Produces:
  - `useSiteMeta({ title: string, description: string }): void` (Task 9 extends it)
  - `usePageEnhancements(root: Ref<HTMLElement | null>): void` (Task 6 implements it)
  - `<InquiryForm />` (Task 7 implements it)

- [ ] **Step 1: Write the failing tests `tests/e2e/pages.spec.ts`**

```ts
import { test, expect } from '@playwright/test'

const ROUTES = [
  { path: '/', h1: 'Learn to fly at Plaridel.', title: 'Masters Flying School | Pilot training at Plaridel Airport, Bulacan' },
  { path: '/courses', h1: 'Courses', title: 'Courses | Masters Flying School' },
  { path: '/fleet', h1: 'Fleet', title: 'Fleet | Masters Flying School' },
  { path: '/students', h1: 'Students', title: 'Students | Masters Flying School' },
  { path: '/about', h1: 'About the school', title: 'About | Masters Flying School' },
  { path: '/contact', h1: 'Contact us', title: 'Contact | Masters Flying School' },
]

for (const r of ROUTES) {
  test(`${r.path} renders without console errors`, async ({ page }) => {
    const errors: string[] = []
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
    page.on('pageerror', (e) => errors.push(e.message))
    await page.goto(r.path)
    await expect(page.locator('h1')).toHaveText(r.h1)
    await expect(page).toHaveTitle(r.title)
    await page.waitForLoadState('networkidle')
    expect(errors.filter((e) => !/ytimg|youtube|google/.test(e))).toEqual([])
  })
}

test('every internal link resolves and none point at .html files', async ({ page, request }) => {
  const targets = new Set<string>()
  for (const r of ROUTES) {
    await page.goto(r.path)
    const hrefs = await page.locator('a[href]').evaluateAll((as) => as.map((a) => a.getAttribute('href')!))
    expect(hrefs.filter((h) => /\.html/.test(h))).toEqual([])
    hrefs.filter((h) => h.startsWith('/')).forEach((h) => targets.add(h.split(/[?#]/)[0] || '/'))
  }
  for (const t of targets) expect((await request.get(t)).status(), t).toBe(200)
})

test('header marks the current page and hides the inquiry button on contact', async ({ page }) => {
  await page.goto('/courses')
  await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Courses' })).toHaveAttribute('aria-current', 'page')
  await page.goto('/contact')
  await expect(page.locator('header').getByRole('link', { name: 'Send an inquiry' })).toHaveCount(0)
})

test('mobile menu closes and unlocks scroll after navigating', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open menu' }).click()
  await page.locator('#mobile-menu').getByRole('link', { name: 'Fleet' }).click()
  await expect(page).toHaveURL(/\/fleet\/?$/)
  await expect(page.locator('#mobile-menu')).toBeHidden()
  await expect(page.locator('body')).not.toHaveClass(/overflow-hidden/)
})
```

- [ ] **Step 2: Run them to verify they fail**

Run: `npm run test:e2e -- pages`
Expected: FAIL. `/courses` returns 404 and the homepage h1 is still "Masters Flying School".

- [ ] **Step 3: Write `app/composables/useSiteMeta.ts`**

```ts
export function useSiteMeta({ title, description }: { title: string; description: string }) {
  useSeoMeta({ title, description })
}
```

- [ ] **Step 4: Write the stubs that later tasks replace**

`app/composables/usePageEnhancements.ts`:
```ts
import type { Ref } from 'vue'

// Task 6 attaches the tab, term-tip, video and details behaviors here.
export function usePageEnhancements(_root: Ref<HTMLElement | null>) {}
```

`app/components/InquiryForm.vue`:
```vue
<template>
  <form id="inquiry-form" novalidate />
</template>
```

- [ ] **Step 5: Generate the pages**

Run: `npm run port`
Expected: six lines, `app/pages/index.vue` … `app/pages/contact.vue`.

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm run test:e2e -- pages`
Expected: PASS (9 tests). A console error "Hydration completed but contains mismatches" means the legacy markup has nesting the browser repairs, for example a block element inside `<p>`. Find the element with `npm run dev`, which names it in the console. Fix it in `legacy/<page>.html` so the baseline and port stay in sync, rerun `npm run test:baseline` and `npm run port`, and mention the fix in the commit message.

- [ ] **Step 7: Commit**

```bash
git add app tests/e2e/pages.spec.ts
git commit -m "feat: port all six pages from the legacy site"
```

---

### Task 6: Page behaviors (fleet tabs, term tips with announcements, video, details links)

**Files:**
- Modify: `app/composables/usePageEnhancements.ts` (replace the stub)
- Test: `tests/e2e/enhancements.spec.ts`

**Interfaces:**
- Consumes: `usePageEnhancements(root)` call in every generated page (Task 5). Markup hooks in the ported HTML: `[data-tabs]` with `[role="tablist"]`/`[role="tab"][aria-controls]`, `[data-tip][aria-controls]`, `[data-yt][data-title]`, same-page `a[href^="#"]` pointing at `<details>`.
- Produces: no new names; behavior only.

- [ ] **Step 1: Write the failing tests `tests/e2e/enhancements.spec.ts`**

```ts
import { test, expect } from '@playwright/test'

test.describe('fleet tabs', () => {
  test('fleet HTML works without JavaScript', async ({ request }) => {
    const html = await (await request.get('/fleet')).text()
    expect(html).toMatch(/<div role="tablist"[^>]*\shidden/)
    expect(html.match(/role="tabpanel"/g)).toHaveLength(6)
    expect(html).not.toMatch(/role="tabpanel"[^>]*\shidden/)
  })

  test('shows the first aircraft and supports arrow keys, Home and End', async ({ page }) => {
    await page.goto('/fleet')
    const tabs = page.getByRole('tab')
    await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true')
    await expect(page.locator('#cessna-150')).toBeVisible()
    await expect(page.locator('#cessna-152')).toBeHidden()
    await tabs.nth(0).focus()
    await page.keyboard.press('ArrowRight')
    await expect(tabs.nth(1)).toBeFocused()
    await expect(page.locator('#cessna-152')).toBeVisible()
    await expect(page).toHaveURL(/#cessna-152$/)
    await page.keyboard.press('End')
    await expect(page.locator('#schweizer-300cb')).toBeVisible()
    await page.keyboard.press('Home')
    await expect(page.locator('#cessna-150')).toBeVisible()
  })

  test('opens the right aircraft from a homepage card', async ({ page }) => {
    await page.goto('/')
    await page.locator('a[href="/fleet#piper-aztec"]').click()
    await expect(page).toHaveURL(/\/fleet\/?#piper-aztec$/)
    await expect(page.getByRole('tab', { name: /Piper Aztec/ })).toHaveAttribute('aria-selected', 'true')
    await expect(page.locator('#piper-aztec')).toBeInViewport()
  })

  test('direct load with a hash selects that aircraft', async ({ page }) => {
    await page.goto('/fleet#schweizer-269')
    await expect(page.locator('#schweizer-269')).toBeVisible()
    await expect(page.locator('#cessna-150')).toBeHidden()
  })

  test('back button works after choosing a tab', async ({ page }) => {
    const warnings: string[] = []
    page.on('console', (m) => { if (m.type() === 'warning' || m.type() === 'error') warnings.push(m.text()) })
    await page.goto('/')
    await page.locator('header').getByRole('link', { name: 'Fleet' }).first().click()
    await page.getByRole('tab', { name: /Cessna 172/ }).click()
    await page.goBack()
    await expect(page.locator('h1')).toHaveText('Learn to fly at Plaridel.')
    expect(warnings.filter((w) => /history\.state/.test(w))).toEqual([])
  })
})

test.describe('term tips', () => {
  test('open with text in a status region, close on Escape and outside click', async ({ page }) => {
    await page.goto('/fleet')
    const btn = page.getByRole('button', { name: 'What does stall mean?' }).first()
    const note = page.locator('#tip-cessna-150-1')
    await expect(note).toHaveAttribute('role', 'status')
    await btn.click()
    await expect(btn).toHaveAttribute('aria-expanded', 'true')
    await expect(note).toBeVisible()
    await expect(note).toContainText('wing stops making enough lift')
    await page.keyboard.press('Escape')
    await expect(note).toBeHidden()
    await expect(btn).toBeFocused()
    await btn.click()
    await page.locator('h1').click()
    await expect(note).toBeHidden()
    await expect(note).toHaveText('')
  })

  test('stays inside a narrow viewport', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 })
    await page.goto('/fleet')
    const btn = page.getByRole('button', { name: 'What does power loading mean?' }).first()
    await btn.scrollIntoViewIfNeeded()
    await btn.click()
    const box = (await page.locator('#tip-cessna-150-4').boundingBox())!
    expect(box.x + box.width).toBeLessThanOrEqual(360 - 11)
  })
})

test('video loads only after the play button is pressed', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.yt iframe')).toHaveCount(0)
  await page.getByRole('button', { name: 'Play video: Fixed wing flight, Cessna' }).click()
  const iframe = page.locator('.yt iframe')
  await expect(iframe).toHaveAttribute('src', /youtube-nocookie\.com\/embed\/zArCGT2t9AQ\?autoplay=1/)
  await expect(iframe).toHaveAttribute('title', 'Fixed wing flight, Cessna')
})

test('same-page link to a collapsed section opens it', async ({ page }) => {
  await page.goto('/students')
  const details = page.locator('details#visa-student')
  await expect(details).not.toHaveAttribute('open', '')
  await page.locator('a[href="#visa-student"]').first().click()
  await expect(details).toHaveAttribute('open', '')
})
```

- [ ] **Step 2: Run them to verify they fail**

Run: `npm run test:e2e -- enhancements`
Expected: FAIL. No tab is selected, so the tablist stays hidden; the term-tip role is still `note`.

- [ ] **Step 3: Replace `app/composables/usePageEnhancements.ts`**

```ts
import type { Ref } from 'vue'

type Cleanup = () => void

// Attaches behavior to the ported static markup. The markup itself is static, so Vue never re-renders
// these nodes and the DOM changes made here persist until the page unmounts.
export function usePageEnhancements(root: Ref<HTMLElement | null>) {
  const route = useRoute()
  const cleanups: Cleanup[] = []

  onMounted(() => {
    const el = root.value
    if (!el) return
    cleanups.push(initYoutube(el), initTermTips(el), initDetailsLinks(el))
    const tabs = initTabs(el)
    if (tabs) {
      tabs.showHash(route.hash)
      cleanups.push(watch(() => route.hash, (hash) => tabs.showHash(hash)))
      const onHash = () => tabs.showHash(location.hash)
      window.addEventListener('hashchange', onHash)
      cleanups.push(() => window.removeEventListener('hashchange', onHash))
    }
  })
  onBeforeUnmount(() => cleanups.splice(0).forEach((fn) => fn()))
}

// Fleet tabs. The tab bar ships hidden so the page still works, all panels stacked, without JS.
function initTabs(el: HTMLElement) {
  const root = el.querySelector<HTMLElement>('[data-tabs]')
  if (!root) return null
  const list = root.querySelector<HTMLElement>('[role="tablist"]')!
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[role="tab"]')]
  const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')!)!)

  const select = (i: number, { focus = false, push = false } = {}) => {
    tabs.forEach((t, j) => {
      const on = j === i
      t.setAttribute('aria-selected', String(on))
      t.tabIndex = on ? 0 : -1
      panels[j].hidden = !on
    })
    if (focus) tabs[i].focus()
    // Keep Vue Router's history state, or Back stops working.
    if (push) history.replaceState(history.state, '', `#${panels[i].id}`)
  }

  list.hidden = false
  panels.forEach((p, i) => p.setAttribute('aria-labelledby', tabs[i].id))
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(i, { push: true }))
    t.addEventListener('keydown', (e) => {
      const step = ({ ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 } as Record<string, number>)[e.key]
      let n: number
      if (step) n = (i + step + tabs.length) % tabs.length
      else if (e.key === 'Home') n = 0
      else if (e.key === 'End') n = tabs.length - 1
      else return
      e.preventDefault()
      select(n, { focus: true, push: true })
    })
  })

  return {
    showHash(hash: string) {
      const i = panels.findIndex((p) => `#${p.id}` === hash)
      if (i >= 0) {
        select(i)
        requestAnimationFrame(() => root.scrollIntoView({ block: 'start' }))
      } else if (!tabs.some((t) => t.getAttribute('aria-selected') === 'true')) {
        select(0)
      }
    },
  }
}

// Term explanations (toggletips). Each note is a status region that is filled only once it is
// visible, so screen readers announce the explanation when it opens.
function initTermTips(el: HTMLElement): Cleanup {
  const tips = [...el.querySelectorAll<HTMLButtonElement>('[data-tip]')]
  if (!tips.length) return () => {}
  const noteOf = (btn: HTMLButtonElement) => document.getElementById(btn.getAttribute('aria-controls')!)!
  const text = new Map<HTMLElement, string>()
  tips.forEach((btn) => {
    const note = noteOf(btn)
    text.set(note, note.textContent ?? '')
    note.setAttribute('role', 'status')
    note.textContent = ''
  })

  const close = (btn: HTMLButtonElement) => {
    btn.setAttribute('aria-expanded', 'false')
    const note = noteOf(btn)
    note.hidden = true
    note.textContent = ''
  }

  tips.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const isOpen = btn.getAttribute('aria-expanded') === 'true'
      tips.forEach((b) => b !== btn && close(b))
      if (isOpen) return close(btn)
      const note = noteOf(btn)
      btn.setAttribute('aria-expanded', 'true')
      note.hidden = false
      note.style.left = '0px'
      requestAnimationFrame(() => {
        note.textContent = text.get(note) ?? ''
        // Keep the note inside the viewport on narrow screens.
        const overflow = note.getBoundingClientRect().right - (document.documentElement.clientWidth - 12)
        if (overflow > 0) note.style.left = `${-overflow}px`
      })
    })
  })

  const onClick = (e: MouseEvent) => {
    tips.forEach((b) => { if (!b.parentElement!.contains(e.target as Node)) close(b) })
  }
  const onKeydown = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return
    const open = tips.find((b) => b.getAttribute('aria-expanded') === 'true')
    if (open) { close(open); open.focus() }
  }
  document.addEventListener('click', onClick)
  document.addEventListener('keydown', onKeydown)
  return () => {
    document.removeEventListener('click', onClick)
    document.removeEventListener('keydown', onKeydown)
  }
}

// Click-to-load YouTube, so no YouTube scripts load until asked.
function initYoutube(el: HTMLElement): Cleanup {
  el.querySelectorAll<HTMLElement>('[data-yt]').forEach((box) => {
    const id = box.dataset.yt
    const title = box.dataset.title || 'Video'
    const img = box.querySelector('img')
    img?.addEventListener('error', () => img.remove())
    box.querySelector('button')?.addEventListener('click', () => {
      const iframe = document.createElement('iframe')
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
      iframe.title = title
      iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
      iframe.allowFullscreen = true
      box.replaceChildren(iframe)
      iframe.focus()
    })
  })
  return () => {}
}

// Links that point at a <details> open it before jumping there.
function initDetailsLinks(el: HTMLElement): Cleanup {
  el.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    const target = document.getElementById(a.getAttribute('href')!.slice(1))
    if (target instanceof HTMLDetailsElement) a.addEventListener('click', () => { target.open = true })
  })
  return () => {}
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm run test:e2e -- enhancements`
Expected: PASS (9 tests).

- [ ] **Step 5: Commit**

```bash
git add app/composables/usePageEnhancements.ts tests/e2e/enhancements.spec.ts
git commit -m "feat: port page behaviors and announce term tips to screen readers"
```

---

### Task 7: Inquiry form component

**Files:**
- Create: `app/utils/inquiry.ts`
- Test: `app/utils/inquiry.test.ts`, `tests/e2e/inquiry.spec.ts`
- Modify: `app/components/InquiryForm.vue` (replace the stub)

**Interfaces:**
- Consumes: `<InquiryForm />` placement in `app/pages/contact.vue` (Task 5); course links `/contact?course=<value>#inquiry` from `app/pages/courses.vue`.
- Produces (auto-imported from `app/utils/inquiry.ts`):
  - `type InquiryField = 'name' | 'email' | 'phone' | 'message'`
  - `INQUIRY_FIELDS: InquiryField[]`
  - `inquiryRules: Record<InquiryField, (value: string) => string>`, which returns `''` when the value is valid
  - `COURSES: { value: string; label: string }[]`
  - `buildInquiryMailto(d: { name: string; email: string; phone: string; course: string; message: string }): string`

- [ ] **Step 1: Write the failing unit tests `app/utils/inquiry.test.ts`**

```ts
import { describe, it, expect } from 'vitest'
import { inquiryRules, buildInquiryMailto, COURSES } from './inquiry'

describe('inquiryRules', () => {
  it('requires a name of at least two characters', () => {
    expect(inquiryRules.name(' J ')).toBe('Enter your full name.')
    expect(inquiryRules.name('Jo')).toBe('')
  })
  it('requires a plausible email', () => {
    expect(inquiryRules.email('name@example')).toBe('Enter an email address like name@example.com.')
    expect(inquiryRules.email(' name@example.com ')).toBe('')
  })
  it('accepts an empty phone but rejects letters', () => {
    expect(inquiryRules.phone('')).toBe('')
    expect(inquiryRules.phone('+63 917 123 4567')).toBe('')
    expect(inquiryRules.phone('call me')).toBe('Use digits only, for example +63 917 123 4567.')
  })
  it('requires a message of at least ten characters', () => {
    expect(inquiryRules.message('Hi there')).toBe('Tell us a little more, at least 10 characters.')
    expect(inquiryRules.message('I want my PPL')).toBe('')
  })
})

describe('COURSES', () => {
  it('lists the eight options the legacy form offered, in order', () => {
    expect(COURSES.map((c) => c.value)).toEqual(['unsure', 'ppl', 'cpl', 'phpl', 'chpl', 'instrument', 'multi-engine', 'instructor'])
  })
})

describe('buildInquiryMailto', () => {
  it('encodes subject and body and leaves out an empty phone', () => {
    const url = buildInquiryMailto({ name: 'Ana Cruz', email: 'ana@example.com', phone: '', course: 'Private pilot, airplane', message: 'Start in June & ask fees' })
    expect(url.startsWith('mailto:info@mastersflyingschool.com?subject=Inquiry%3A%20Private%20pilot%2C%20airplane&body=')).toBe(true)
    const body = decodeURIComponent(url.split('&body=')[1])
    expect(body).toBe('Name: Ana Cruz\nEmail: ana@example.com\nCourse: Private pilot, airplane\n\nStart in June & ask fees')
  })
  it('includes the phone line when given', () => {
    const body = decodeURIComponent(buildInquiryMailto({ name: 'A', email: 'a@b.co', phone: '0917', course: 'Not sure yet', message: 'x' }).split('&body=')[1])
    expect(body).toContain('Email: a@b.co\nPhone: 0917\nCourse:')
  })
})
```

- [ ] **Step 2: Run them to verify they fail**

Run: `npx vitest run app/utils`
Expected: FAIL with `Failed to load url ./inquiry`.

- [ ] **Step 3: Implement `app/utils/inquiry.ts`**

```ts
export type InquiryField = 'name' | 'email' | 'phone' | 'message'

export const INQUIRY_FIELDS: InquiryField[] = ['name', 'email', 'phone', 'message']

export const inquiryRules: Record<InquiryField, (value: string) => string> = {
  name: (v) => (v.trim().length >= 2 ? '' : 'Enter your full name.'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Enter an email address like name@example.com.'),
  phone: (v) => (!v.trim() || /^[+\d][\d\s()-]{6,}$/.test(v.trim()) ? '' : 'Use digits only, for example +63 917 123 4567.'),
  message: (v) => (v.trim().length >= 10 ? '' : 'Tell us a little more, at least 10 characters.'),
}

export const COURSES = [
  { value: 'unsure', label: 'Not sure yet' },
  { value: 'ppl', label: 'Private pilot, airplane' },
  { value: 'cpl', label: 'Commercial pilot, airplane' },
  { value: 'phpl', label: 'Private helicopter pilot' },
  { value: 'chpl', label: 'Commercial helicopter pilot' },
  { value: 'instrument', label: 'Instrument rating' },
  { value: 'multi-engine', label: 'Multi-engine rating' },
  { value: 'instructor', label: 'Flight instructor (CFI, CFII)' },
]

// TODO: replace the mailto handoff with a POST once the school has an inquiry endpoint (see PRODUCT.md).
export function buildInquiryMailto(d: { name: string; email: string; phone: string; course: string; message: string }) {
  const body = [
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    d.phone ? `Phone: ${d.phone}` : null,
    `Course: ${d.course}`,
    '',
    d.message,
  ].filter((line) => line !== null).join('\n')
  return `mailto:info@mastersflyingschool.com?subject=${encodeURIComponent(`Inquiry: ${d.course}`)}&body=${encodeURIComponent(body)}`
}
```

- [ ] **Step 4: Run the unit tests to verify they pass**

Run: `npx vitest run app/utils`
Expected: PASS (7 tests).

- [ ] **Step 5: Write the failing end-to-end tests `tests/e2e/inquiry.spec.ts`**

```ts
import { test, expect } from '@playwright/test'

test('reports every invalid field and focuses the first', async ({ page }) => {
  await page.goto('/contact')
  await page.getByRole('button', { name: 'Send inquiry' }).click()
  await expect(page.locator('#inquiry-status')).toHaveText('3 fields need fixing before we can send this.')
  await expect(page.locator('#name')).toBeFocused()
  await expect(page.locator('#name')).toHaveAttribute('aria-invalid', 'true')
  await expect(page.locator('#name-error')).toHaveText('Enter your full name.')
  await expect(page.locator('#phone')).toHaveAttribute('aria-invalid', 'false')
})

test('validates on blur and clears the error while typing a fix', async ({ page }) => {
  await page.goto('/contact')
  await page.locator('#email').fill('ana@')
  await page.locator('#email').blur()
  await expect(page.locator('#email-error')).toBeVisible()
  await page.locator('#email').fill('ana@example.com')
  await expect(page.locator('#email-error')).toBeHidden()
  await expect(page.locator('#email')).toHaveAttribute('aria-invalid', 'false')
})

test('preselects the course from the query string', async ({ page }) => {
  await page.goto('/contact?course=cpl#inquiry')
  await expect(page.locator('#course')).toHaveValue('cpl')
})

test('ignores an unknown course in the query string', async ({ page }) => {
  await page.goto('/contact?course=jet-pack')
  await expect(page.locator('#course')).toHaveValue('unsure')
})

test('course links on the courses page carry the course over', async ({ page }) => {
  await page.goto('/courses')
  await page.locator('a[href^="/contact?course=phpl"]').first().click()
  await expect(page.locator('#course')).toHaveValue('phpl')
})

test('a valid inquiry hands off to email and confirms with a fallback', async ({ page }) => {
  await page.goto('/contact')
  await page.locator('#name').fill('Ana Cruz')
  await page.locator('#email').fill('ana@example.com')
  await page.locator('#message').fill('I want to start my PPL in June.')
  await page.getByRole('button', { name: 'Send inquiry' }).click()
  const status = page.locator('#inquiry-status')
  await expect(status).toContainText('Your email app should now be open')
  await expect(status).toBeFocused()
  await expect(status.getByRole('link', { name: 'info@mastersflyingschool.com' })).toHaveAttribute('href', 'mailto:info@mastersflyingschool.com')
  await expect(page.getByRole('button', { name: 'Send inquiry' })).toBeEnabled()
})
```

- [ ] **Step 6: Run them to verify they fail**

Run: `npm run test:e2e -- inquiry`
Expected: FAIL, because the stub form has no submit button.

- [ ] **Step 7: Replace `app/components/InquiryForm.vue`**

```vue
<script setup lang="ts">
type Fields = Record<InquiryField, string>

const route = useRoute()
const values = reactive<Fields>({ name: '', email: '', phone: '', message: '' })
const errors = reactive<Fields>({ name: '', email: '', phone: '', message: '' })
const checked = reactive<Record<InquiryField, boolean>>({ name: false, email: false, phone: false, message: false })
const course = ref('unsure')
const status = ref<'idle' | 'invalid' | 'sent'>('idle')
const invalidCount = ref(0)
const sending = ref(false)
const statusEl = ref<HTMLElement | null>(null)
const inputs: Partial<Record<InquiryField, HTMLInputElement | HTMLTextAreaElement>> = {}

const STATUS_CLASS = {
  idle: '',
  invalid: 'mt-6 rounded-md border border-red bg-red-tint p-4 text-ink',
  sent: 'mt-6 rounded-md border border-navy bg-apron p-4 text-ink',
}

const fieldClass = (f: InquiryField) => ({ 'border-red': !!errors[f] })
const ariaInvalid = (f: InquiryField) => (checked[f] ? String(!!errors[f]) : undefined)

function check(f: InquiryField) {
  errors[f] = inquiryRules[f](values[f])
  checked[f] = true
  return !errors[f]
}
const onBlur = (f: InquiryField) => { if (values[f]) check(f) }
const onInput = (f: InquiryField) => { if (checked[f] && errors[f]) check(f) }

// Static generation has no query string, so the course preset is applied in the browser.
onMounted(() => {
  const preset = route.query.course
  if (typeof preset === 'string' && COURSES.some((c) => c.value === preset)) course.value = preset
})

function onSubmit() {
  const invalid = INQUIRY_FIELDS.filter((f) => !check(f))
  if (invalid.length) {
    invalidCount.value = invalid.length
    status.value = 'invalid'
    inputs[invalid[0]]?.focus()
    return
  }
  sending.value = true
  const label = COURSES.find((c) => c.value === course.value)!.label
  window.location.href = buildInquiryMailto({ ...values, course: label })
  setTimeout(async () => {
    sending.value = false
    status.value = 'sent'
    await nextTick()
    statusEl.value?.focus()
  }, 600)
}
</script>

<template>
  <form id="inquiry-form" novalidate class="self-start rounded-lg bg-white p-6 shadow-[0_1px_0_rgb(var(--c-line))] sm:p-8 lg:col-span-8" @submit.prevent="onSubmit">
    <div class="grid gap-6 sm:grid-cols-2">
      <div>
        <label for="name" class="block font-semibold text-navy">Full name <span class="text-red" aria-hidden="true">*</span><span class="sr-only">(required)</span></label>
        <input id="name" :ref="(el) => { inputs.name = el as HTMLInputElement }" v-model="values.name" name="name" type="text" autocomplete="name" required aria-describedby="name-error" :aria-invalid="ariaInvalid('name')" class="mt-2 block min-h-[48px] w-full rounded-md border border-ink-muted/80 px-3 text-base focus:border-navy" :class="fieldClass('name')" @blur="onBlur('name')" @input="onInput('name')">
        <p id="name-error" class="mt-1 text-sm font-semibold text-red" :hidden="!errors.name">{{ errors.name }}</p>
      </div>
      <div>
        <label for="email" class="block font-semibold text-navy">Email <span class="text-red" aria-hidden="true">*</span><span class="sr-only">(required)</span></label>
        <input id="email" :ref="(el) => { inputs.email = el as HTMLInputElement }" v-model="values.email" name="email" type="email" autocomplete="email" inputmode="email" required aria-describedby="email-error" :aria-invalid="ariaInvalid('email')" class="mt-2 block min-h-[48px] w-full rounded-md border border-ink-muted/80 px-3 text-base focus:border-navy" :class="fieldClass('email')" @blur="onBlur('email')" @input="onInput('email')">
        <p id="email-error" class="mt-1 text-sm font-semibold text-red" :hidden="!errors.email">{{ errors.email }}</p>
      </div>
      <div>
        <label for="phone" class="block font-semibold text-navy">Phone or mobile <span class="font-normal text-ink-muted">(optional)</span></label>
        <input id="phone" :ref="(el) => { inputs.phone = el as HTMLInputElement }" v-model="values.phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" aria-describedby="phone-error" :aria-invalid="ariaInvalid('phone')" class="mt-2 block min-h-[48px] w-full rounded-md border border-ink-muted/80 px-3 text-base focus:border-navy" :class="fieldClass('phone')" @blur="onBlur('phone')" @input="onInput('phone')">
        <p id="phone-error" class="mt-1 text-sm font-semibold text-red" :hidden="!errors.phone">{{ errors.phone }}</p>
      </div>
      <div>
        <label for="course" class="block font-semibold text-navy">Course</label>
        <select id="course" v-model="course" name="course" class="mt-2 block min-h-[48px] w-full rounded-md border border-ink-muted/80 bg-white px-3 text-base focus:border-navy">
          <option v-for="c in COURSES" :key="c.value" :value="c.value">{{ c.label }}</option>
        </select>
      </div>
      <div class="sm:col-span-2">
        <label for="message" class="block font-semibold text-navy">Message <span class="text-red" aria-hidden="true">*</span><span class="sr-only">(required)</span></label>
        <textarea id="message" :ref="(el) => { inputs.message = el as HTMLTextAreaElement }" v-model="values.message" name="message" rows="9" required aria-describedby="message-help message-error" :aria-invalid="ariaInvalid('message')" class="mt-2 block w-full rounded-md border border-ink-muted/80 px-3 py-3 text-base focus:border-navy" :class="fieldClass('message')" @blur="onBlur('message')" @input="onInput('message')" />
        <p id="message-help" class="mt-1 text-sm text-ink-muted">For example: "I have a PPL from 2022 and want to start my CPL in June."</p>
        <p id="message-error" class="mt-1 text-sm font-semibold text-red" :hidden="!errors.message">{{ errors.message }}</p>
      </div>
    </div>
    <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
      <button type="submit" :disabled="sending" class="inline-flex min-h-[48px] items-center justify-center rounded-md bg-red px-8 font-display text-xl font-semibold text-white transition-colors hover:bg-red-dark disabled:cursor-wait disabled:opacity-60">{{ sending ? 'Preparing your email…' : 'Send inquiry' }}</button>
      <p class="text-sm text-ink-muted"><span class="text-red" aria-hidden="true">*</span> Required</p>
    </div>
    <div id="inquiry-status" ref="statusEl" role="status" aria-live="polite" tabindex="-1" :hidden="status === 'idle'" :class="STATUS_CLASS[status]">
      <template v-if="status === 'invalid'">{{ invalidCount === 1 ? 'One field needs fixing before we can send this.' : `${invalidCount} fields need fixing before we can send this.` }}</template>
      <template v-else-if="status === 'sent'">Your email app should now be open with this inquiry filled in. Press send there to reach us. If nothing opened, email <a class="font-semibold text-red underline underline-offset-2" href="mailto:info@mastersflyingschool.com">info@mastersflyingschool.com</a> or call <a class="font-semibold text-red underline underline-offset-2" href="tel:+6328517042">(02) 851-7042</a>.</template>
    </div>
  </form>
</template>
```

- [ ] **Step 8: Run all inquiry tests to verify they pass**

Run: `npx vitest run app/utils && npm run test:e2e -- inquiry`
Expected: PASS (7 unit, 6 end-to-end).

- [ ] **Step 9: Commit**

```bash
git add app/utils app/components/InquiryForm.vue tests/e2e/inquiry.spec.ts
git commit -m "feat: inquiry form component with validation and course preset"
```

---

### Task 8: Visual parity with the legacy site

**Files:**
- Modify: whichever of `app/assets/css/main.css`, `app/components/SiteHeader.vue`, `app/components/SiteFooter.vue`, `app/layouts/default.vue` the diffs point to
- Test: `tests/e2e/parity.spec.ts` (from Task 2)

**Interfaces:**
- Consumes: everything above. Produces nothing new.

- [ ] **Step 1: Run the parity suite against the Nuxt build**

Run: `npm run test:e2e -- parity`
Expected on the first run: some of the 12 comparisons may fail. Playwright writes `*-diff.png` files to `test-results/`.

- [ ] **Step 2: Fix each failing comparison at its cause**

Open each `*-diff.png`, find the cause in this table, and apply its fix. Never loosen `maxDiffPixelRatio` and never re-baseline to make a failure pass.

| What the diff shows | Cause | Fix |
|---|---|---|
| All text slightly shifted or reflowed | Font files differ from the Google CDN build (subset or weight missing) | Confirm `fonts.families` weights in `nuxt.config.ts` match the legacy Google Fonts URL exactly: Barlow 400/500/600, Barlow Condensed 500/600/700 |
| A whole section's color is off | Token typo in `main.css` `:root` | Compare against the hex comments beside each variable |
| Header nav link underlined on a page where legacy had none | Static server redirects `/courses` → `/courses/`, and the link is no longer exact-active | Check `curl -sI http://localhost:4200/courses`; if it redirects, add `serve.json` with `{ "cleanUrls": true, "trailingSlash": false }` to `public/` |
| Element missing styles that exist in legacy | Class string built at runtime that Tailwind's scanner cannot see | Write the full class literally in the template (Tailwind only sees whole strings) |
| Content offset by a few pixels at the top | Nuxt's `#__nuxt` wrapper or a page `div.contents` wrapper gaining margin | Check computed styles on both wrappers in devtools; neither may have margin, padding or display other than `contents`/`block` |
| Fleet page shows all six panels stacked | Tabs never initialized (`root` ref null) | Confirm `app/pages/fleet.vue` root element is `<div ref="root" class="contents">` |

- [ ] **Step 3: Re-run until all 12 pass**

Run: `npm run test:e2e -- parity`
Expected: PASS (12 tests). Stop after two fix rounds. If anything still fails, record the page, viewport and diff image path in the task report, and do not re-baseline.

- [ ] **Step 4: Run the whole suite**

Run: `npm test && npm run test:e2e`
Expected: all unit and end-to-end tests pass.

- [ ] **Step 5: Commit**

```bash
git add app
git commit -m "fix: match legacy rendering pixel for pixel"
```

---

### Task 9: Search and sharing metadata

**Files:**
- Modify: `app/composables/useSiteMeta.ts`, `nuxt.config.ts`, `app/app.vue`
- Test: `tests/e2e/seo.spec.ts`

**Interfaces:**
- Consumes: `useSiteMeta({ title, description })` calls in all six pages.
- Produces: runtime config `public.siteUrl: string` (default `https://mastersflyingschool.com`, env `NUXT_PUBLIC_SITE_URL`) and `public.indexable: boolean` (default `false`, env `NUXT_PUBLIC_INDEXABLE`).

- [ ] **Step 1: Write the failing tests `tests/e2e/seo.spec.ts`**

```ts
import { test, expect } from '@playwright/test'

const PATHS = ['/', '/courses', '/fleet', '/students', '/about', '/contact']

for (const path of PATHS) {
  test(`${path} ships sharing tags in its static HTML`, async ({ request }) => {
    const html = await (await request.get(path)).text()
    const title = html.match(/<title>([^<]*)<\/title>/)![1]
    expect(html).toContain(`<meta property="og:title" content="${title}">`)
    expect(html).toMatch(/<meta property="og:description" content="[^"]+">/)
    expect(html).toContain('<meta property="og:image" content="https://mastersflyingschool.com/img/hero-cessna-line.webp">')
    expect(html).toContain(`<link rel="canonical" href="https://mastersflyingschool.com${path === '/' ? '/' : path}">`)
    expect(html).toContain('<meta name="robots" content="noindex, nofollow">')
  })
}

test('structured data describes the school with both locations', async ({ request }) => {
  const html = await (await request.get('/')).text()
  const json = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)![1]
  const data = JSON.parse(json)
  expect(data['@type']).toBe('EducationalOrganization')
  expect(data.name).toBe('Masters Flying School')
  expect(data.foundingDate).toBe('1994')
  expect(data.address.addressLocality).toBe('Pasay City')
  expect(data.location.address.addressLocality).toBe('Plaridel')
})
```

- [ ] **Step 2: Run them to verify they fail**

Run: `npm run test:e2e -- seo`
Expected: FAIL, with no `og:title` found.

- [ ] **Step 3: Add runtime config to `nuxt.config.ts`**

Add this key inside `defineNuxtConfig({ ... })`:
```ts
  runtimeConfig: {
    public: {
      siteUrl: 'https://mastersflyingschool.com',
      // Pitch builds stay out of search results so they never compete with the school's live site.
      indexable: false,
    },
  },
```

- [ ] **Step 4: Replace `app/composables/useSiteMeta.ts`**

```ts
export function useSiteMeta({ title, description }: { title: string; description: string }) {
  const { siteUrl, indexable } = useRuntimeConfig().public
  const path = useRoute().path.replace(/\/$/, '') || '/'
  const url = `${siteUrl}${path === '/' ? '/' : path}`

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogSiteName: 'Masters Flying School',
    ogLocale: 'en_PH',
    ogUrl: url,
    ogImage: `${siteUrl}/img/hero-cessna-line.webp`,
    ogImageAlt: 'Two Masters Flying School Cessnas in red and white livery parked on the Plaridel flight line',
    twitterCard: 'summary_large_image',
    robots: indexable ? 'index, follow' : 'noindex, nofollow',
  })
  useHead({ link: [{ rel: 'canonical', href: url }] })
}
```

- [ ] **Step 5: Add structured data to `app/app.vue`**

Replace the `<script setup>` block with:
```vue
<script setup lang="ts">
const { siteUrl } = useRuntimeConfig().public

// Every value here is already published on the site; nothing is added.
const school = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Masters Flying School',
  url: `${siteUrl}/`,
  logo: `${siteUrl}/img/logo.jpg`,
  foundingDate: '1994',
  email: 'info@mastersflyingschool.com',
  telephone: '+6328517042',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2317 Nissan Car Lease Bldg., Aurora Blvd.',
    addressLocality: 'Pasay City',
    addressRegion: 'Metro Manila',
    addressCountry: 'PH',
  },
  location: {
    '@type': 'Place',
    name: 'Plaridel hangar',
    telephone: '+63447942865',
    address: { '@type': 'PostalAddress', streetAddress: 'Plaridel Airport', addressLocality: 'Plaridel', addressRegion: 'Bulacan', addressCountry: 'PH' },
  },
  sameAs: ['https://www.facebook.com/pages/Masters-Flying-School/154831617913387'],
}

useHead({
  htmlAttrs: { lang: 'en' },
  bodyAttrs: { class: 'bg-white font-sans text-base text-ink antialiased' },
  link: [{ rel: 'icon', href: '/img/logo.jpg' }],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(school) }],
})
</script>
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm run test:e2e -- seo`
Expected: PASS (7 tests). If a tag fails only because its attributes render in a different order (for example `content` before `property`, or `href` before `rel`), rewrite that assertion to parse the tag with a regex that ignores attribute order. Do not change the output to suit the test.

- [ ] **Step 7: Commit**

```bash
git add nuxt.config.ts app/composables/useSiteMeta.ts app/app.vue tests/e2e/seo.spec.ts
git commit -m "feat: sharing tags, canonical URLs, structured data and noindex for pitch builds"
```

---

### Task 10: Correct the misleading "since 1935" statistic

Approved copy change: the airfield opened in 1935, but the school was founded in 1994. In the homepage's runway band, the label "Training pilots since / 1935" becomes "School founded / 1994".

**Files:**
- Modify: `app/pages/index.vue` (runway band `<dl>`), `tests/e2e/parity.spec.ts`
- Test: `tests/e2e/pages.spec.ts`

**Interfaces:**
- Consumes: generated `app/pages/index.vue`. From here on, `index.vue` is hand-maintained; do not rerun `npm run port` for it.

- [ ] **Step 1: Add the failing test to `tests/e2e/pages.spec.ts`**

```ts
test('runway band states when the school was founded, not when the airfield opened', async ({ page }) => {
  await page.goto('/')
  const band = page.locator('section[aria-labelledby="hero-title"] dl')
  await expect(band).toContainText('School founded')
  await expect(band).toContainText('1994')
  await expect(band).not.toContainText('1935')
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm run test:e2e -- pages -g "runway band"`
Expected: FAIL, because the band contains "1935".

- [ ] **Step 3: Edit `app/pages/index.vue`**

Replace:
```html
<div><dt class="text-sm text-navy-300">Training pilots since</dt><dd class="font-display text-2xl font-semibold tabular">1935</dd></div>
```
with:
```html
<div><dt class="text-sm text-navy-300">School founded</dt><dd class="font-display text-2xl font-semibold tabular">1994</dd></div>
```

- [ ] **Step 4: Mask the changed stat in the homepage parity comparison**

In `tests/e2e/parity.spec.ts`, change the `mask` array to:
```ts
        mask: [
          page.locator('iframe'),
          page.locator('.yt img'),
          // Intentional copy change (Task 10): the founding-year stat differs from legacy on purpose.
          page.locator('section[aria-labelledby="hero-title"] dl > div:last-child'),
        ],
```

- [ ] **Step 5: Run the affected suites**

Run: `npm run test:e2e -- pages parity`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add app/pages/index.vue tests/e2e/pages.spec.ts tests/e2e/parity.spec.ts
git commit -m "fix: state the school's founding year instead of the airfield's"
```

---

### Task 11: Final verification

**Files:**
- No source changes, unless a check below fails.

- [ ] **Step 1: Full test run from a clean build**

```bash
rm -rf .output .nuxt && npm test && npm run test:e2e
```
Expected: every unit and end-to-end test passes.

- [ ] **Step 2: Confirm the CDN script and render-blocking font CSS are gone**

```bash
grep -rl "cdn.tailwindcss.com\|fonts.googleapis.com" .output/public || echo "clean"
```
Expected: `clean`.

- [ ] **Step 3: Confirm brand hex values live only in the token block**

```bash
grep -rniE "#(C8102E|A20C24|FBE9EC|0E2240|16305A|7D8DA6|AEB7C2|141A22|F4F5F7|1B2330|5B6470|DDE1E6)" app --include=*.vue --include=*.ts --include=*.css
```
Expected: matches only in the `:root` comments of `app/assets/css/main.css`.

- [ ] **Step 4: Run the design detector over the new app**

```bash
"C:/Users/angul/.claude/plugins/cache/impeccable/impeccable/4.4.0/skills/impeccable/scripts/impeccable" detect --json .output/public
```
Expected: no new finding types compared with the 2026-10-07 audit. The "flat type hierarchy" false positive should disappear now that compiled CSS is present. Record the output in the task report.

- [ ] **Step 5: Commit any fixes, then tag the migration**

```bash
git tag nuxt-migration
```
