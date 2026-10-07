// Crawling stays allowed even on pitch builds: a crawler has to fetch a page to see its noindex tag.
export default defineEventHandler((event) => {
  const { siteUrl } = useRuntimeConfig(event).public
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return ['User-agent: *', 'Allow: /', '', `Sitemap: ${siteUrl}/sitemap.xml`, ''].join('\n')
})
