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
      routes: ['/'],
      crawlLinks: true,
    },
  },
})
