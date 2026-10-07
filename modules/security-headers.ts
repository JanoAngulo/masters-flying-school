import { createHash } from 'node:crypto'
import { defineNuxtModule } from '@nuxt/kit'

// Security headers for the static build. Nitro's Vercel preset writes routeRules headers into
// .vercel/output/config.json, so these reach visitors as real HTTP headers on Vercel.
//
// The CSP also goes into each page as a <meta> tag, so a local `npm run preview` enforces the same policy
// and the e2e tests catch anything it would block. (A meta CSP cannot carry frame-ancestors; the header does.)

// Third parties the pages load from: hCaptcha (inquiry form spam check), Google Maps (contact page embeds),
// YouTube thumbnails and the click-to-play player (about page) and the Web3Forms API (inquiry delivery).
const HCAPTCHA = ['https://hcaptcha.com', 'https://*.hcaptcha.com']

const CSP: Record<string, string[]> = {
  'default-src': ["'self'"],
  'script-src': ["'self'", ...HCAPTCHA], // plus the hash of each inline script, added at build time
  'script-src-attr': ["'none'"],
  'style-src': ["'self'", "'unsafe-inline'", ...HCAPTCHA],
  'img-src': ["'self'", 'data:', 'https://i.ytimg.com'],
  'font-src': ["'self'"],
  'connect-src': ["'self'", 'https://api.web3forms.com', ...HCAPTCHA],
  'frame-src': ['https://maps.google.com', 'https://www.google.com', 'https://www.youtube-nocookie.com', ...HCAPTCHA],
  'manifest-src': ["'self'"],
  'form-action': ["'self'", 'mailto:'],
  'frame-ancestors': ["'none'"],
  'base-uri': ["'none'"],
  'object-src': ["'none'"],
  'upgrade-insecure-requests': [],
}

const HEADERS = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), display-capture=(), payment=(), usb=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
}

// Inline scripts the browser executes. JSON and JSON-LD blocks are data, so CSP ignores them.
const INLINE_SCRIPT = /<script(?![^>]*\ssrc=)([^>]*)>([\s\S]*?)<\/script>/g
const DATA_TYPE = /\stype=["']?application\/(?:ld\+)?json/

export function inlineScriptHashes(html: string) {
  const hashes = new Set<string>()
  for (const [, attrs, body] of html.matchAll(INLINE_SCRIPT)) {
    if (DATA_TYPE.test(attrs!) || !body) continue
    hashes.add(`'sha256-${createHash('sha256').update(body).digest('base64')}'`)
  }
  return hashes
}

export function cspString(hashes: Iterable<string>, { forMeta = false } = {}) {
  return Object.entries(CSP)
    .filter(([name]) => !(forMeta && name === 'frame-ancestors'))
    .map(([name, values]) => [name, ...values, ...(name === 'script-src' ? hashes : [])].join(' '))
    .join('; ')
}

export default defineNuxtModule({
  meta: { name: 'security-headers' },
  setup(_, nuxt) {
    if (nuxt.options.dev) return

    nuxt.hook('nitro:init', (nitro) => {
      const allHashes = new Set<string>()

      nitro.hooks.hook('prerender:generate', (route) => {
        if (!route.fileName?.endsWith('.html') || typeof route.contents !== 'string') return
        const hashes = inlineScriptHashes(route.contents)
        hashes.forEach((h) => allHashes.add(h))
        const meta = `<meta http-equiv="Content-Security-Policy" content="${cspString(hashes, { forMeta: true })}">`
        route.contents = route.contents.replace(/<meta charset="[^"]*">/i, (charset) => charset + meta)
      })

      // Every page shares one inline script (Nuxt's runtime config), so a single policy covers the site.
      nitro.hooks.hook('prerender:done', () => {
        const all = nitro.options.routeRules['/**'] ?? {}
        nitro.options.routeRules['/**'] = {
          ...all,
          headers: { ...all.headers, ...HEADERS, 'Content-Security-Policy': cspString(allHashes) },
        }
      })
    })
  },
})
