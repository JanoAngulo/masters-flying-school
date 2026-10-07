export default defineNuxtConfig({
  compatibilityDate: '2026-10-07',
  devtools: { enabled: false },
  // Local modules in modules/ (security headers and CSP) load automatically.
  modules: ['@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  postcss: { plugins: { tailwindcss: {}, autoprefixer: {} } },
  fonts: {
    families: [
      { name: 'Barlow', weights: [400, 500, 600], provider: 'google' },
      { name: 'Barlow Condensed', weights: [500, 600, 700], provider: 'google' },
    ],
  },
  app: {
    head: {
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', type: 'image/png', href: '/icon-192.png', sizes: '192x192' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      meta: [{ name: 'theme-color', content: '#0E2240' }],
    },
  },
  // Every value can be set at generate time with NUXT_PUBLIC_* env vars; see .env.example.
  runtimeConfig: {
    public: {
      siteUrl: 'https://mastersflyingschool.com',
      // Pitch builds stay out of search results so they never compete with the school's live site.
      indexable: false,
      // Web3Forms access keys are public by design (they ship in the page). Inquiries go to the email the key was made with.
      // Set NUXT_PUBLIC_WEB3FORMS_KEY to swap it; set it empty to fall back to opening the visitor's email app.
      web3formsKey: '6f1e318a-9fe4-42d4-a31c-687d7d8b70fc',
    },
  },
  routeRules: {
    // Addresses from the static-HTML version of the site. (Not /index.html: that file is the home page itself.)
    ...Object.fromEntries(['about', 'contact', 'courses', 'fleet', 'students'].map((p) => [`/${p}.html`, { redirect: { to: `/${p}`, statusCode: 301 } }])),
  },
  nitro: {
    prerender: {
      routes: ['/', '/courses', '/fleet', '/students', '/about', '/contact', '/sitemap.xml', '/robots.txt'],
      crawlLinks: true,
    },
  },
})
