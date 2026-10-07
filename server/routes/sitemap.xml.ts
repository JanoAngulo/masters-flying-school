const PAGES = ['/', '/courses', '/fleet', '/students', '/about', '/contact']

export default defineEventHandler((event) => {
  const { siteUrl } = useRuntimeConfig(event).public
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  const urls = PAGES.map((p) => `  <url><loc>${siteUrl}${p}</loc></url>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
})
