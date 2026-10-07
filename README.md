# Masters Flying School

A website redesign pitch for [Masters Flying School](https://mastersflyingschool.com), a CAAP-certified airplane and helicopter flight school training at Plaridel Airport, Bulacan, since 1994.

This is an independent pitch, not the school's official site. It was built to present to the school and may go live if they adopt it. Until then, every build is kept out of search results by default.

## What's in it

Six statically generated pages: home, courses, fleet, students, about and contact.

- **Content comes from the school.** All copy, photos, certificate numbers and graduate names come from the school's existing site. The site never invents tuition, pass rates, testimonials or safety statistics. [PRODUCT.md](PRODUCT.md) lists the audiences, the facts to confirm with the school before launch, and what must never be made up.
- **Built for SEO.** Pages are prerendered to static HTML with per-page titles, Open Graph tags, canonical URLs, JSON-LD structured data, a sitemap and `robots.txt`.
- **Accessible.** Targets WCAG 2.2 AA: a skip link, keyboard-operable tabs and menus, screen-reader-announced definitions for aviation terms, 44px tap targets and reduced-motion support.
- **Inquiry form.** Submissions go through [Web3Forms](https://web3forms.com) with an hCaptcha spam check. If no access key is configured, the form falls back to opening the visitor's email app so an inquiry is never lost.
- **Security headers.** A strict Content Security Policy and related headers come from a local Nuxt module, sent as HTTP headers on Vercel and as a `<meta>` tag so local previews enforce the same policy.
- **Scroll motion.** GSAP animations load only after mount and are skipped for visitors who prefer reduced motion.

## Tech stack

- [Nuxt 4](https://nuxt.com) (Vue 3, static generation with `nuxt generate`)
- Tailwind CSS 3.4, compiled through PostCSS
- `@nuxt/fonts` (self-hosted Barlow and Barlow Condensed)
- GSAP for scroll motion
- Vitest for unit tests and Playwright for end-to-end and screenshot tests
- Deployed on Vercel

## Getting started

Requires **Node 24** and **npm 11**, which ships with Node 24.

```bash
npm install
npm run dev        # dev server at http://localhost:3000
```

To build and preview the static output:

```bash
npm run generate   # writes the site to .output/public
npm run preview    # serves it at http://localhost:4200
```

Each page has its own link-preview image in `public/img/og/`, cropped from the page photos. After changing a photo, run `npm run og` to regenerate them.

### Environment variables

Copy [.env.example](.env.example) to `.env` to override the defaults. On Vercel, set them under Project Settings > Environment Variables.

| Variable | Default | Purpose |
|---|---|---|
| `NUXT_PUBLIC_SITE_URL` | Vercel's production address, else `https://mastersflyingschool.com` | Domain used in canonical URLs, sharing tags, structured data and the sitemap. Link previews only show an image when this is where the site is served |
| `NUXT_PUBLIC_INDEXABLE` | `false` | Set to `true` only for the school's live site. While `false`, every page is `noindex` |
| `NUXT_PUBLIC_WEB3FORMS_KEY` | key in `nuxt.config.ts` | Web3Forms access key. Set it to the school's own key to send inquiries to them, or leave it empty to fall back to the email app |

## Testing

```bash
npm test                          # Vitest unit tests (form rules, structured data, port script)
npx playwright install chromium   # once, before the first e2e run
npm run test:e2e                  # generates the site, then runs Playwright against it
```

The end-to-end suite covers pages, layout, the inquiry form, SEO tags, security headers, motion and visual parity.

## How the migration worked

The site began as six static HTML pages using the Tailwind Play CDN. Those originals live untouched in [legacy/](legacy/) and serve two purposes:

1. **Port source.** [scripts/port-legacy.mjs](scripts/port-legacy.mjs) (`npm run port`) converted each legacy page's `<main>` into a Nuxt page, turning page links into `NuxtLink`s and the contact form into the `InquiryForm` component.
2. **Visual baseline.** Playwright screenshots of `legacy/` are the reference the Nuxt build was checked against before any intentional design change. `npm run test:baseline` recaptures them.

The full plan is in [docs/superpowers/plans/2026-10-07-nuxt-migration.md](docs/superpowers/plans/2026-10-07-nuxt-migration.md).

## Project structure

```
app/
  pages/          the six routes
  components/     SiteHeader, SiteFooter, InquiryForm, TermTip
  composables/    page behaviors (fleet tabs, term tips, YouTube click-to-load), SEO meta, motion
  utils/          form validation and payload, JSON-LD builders (unit tested)
  assets/css/     Tailwind entry and brand color tokens
server/routes/    sitemap.xml and robots.txt
modules/          security headers and CSP
public/           images, icons, web manifest
legacy/           original static site
scripts/          legacy-to-Nuxt port script
tests/e2e/        Playwright specs and screenshot baselines
```

## Known constraints

- **Nuxt is pinned to `~4.4.8`.** Nuxt 4.6 breaks `nuxt generate` when the project path contains a space, which is the case on the original dev machine. Before upgrading, delete `.output` and test `npm run generate` from a path with a space in it.
- **No `nuxt-security`.** Its current release doesn't emit headers under Nuxt 4.6's server hooks, so headers come from [modules/security-headers.ts](modules/security-headers.ts) instead.
- **Install with npm 11.** npm 10.9 crashes on this lockfile's `overrides`. If your Node version ships an older npm, run `npx npm@11 install`.

## Credits

Design and development by [John Russel Angulo](https://jrla1219.web.app). Photography, logo and course information belong to Masters Flying School.
