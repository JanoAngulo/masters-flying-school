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
  runtimeConfig: {
    public: {
      siteUrl: 'https://mastersflyingschool.com',
      // Pitch builds stay out of search results so they never compete with the school's live site.
      indexable: false,
    },
  },
  nitro: {
    prerender: {
      routes: ['/', '/courses', '/fleet', '/students', '/about', '/contact', '/sitemap.xml', '/robots.txt'],
      crawlLinks: true,
    },
  },
})
