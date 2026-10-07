import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const PAGES = ['/', '/courses', '/fleet', '/students', '/about', '/contact']

// The sitemap is prerendered at build time, so the page sources are on disk next to it.
const sourceOf = (page: string) => join(process.cwd(), 'app/pages', `${page === '/' ? 'index' : page.slice(1)}.vue`)

// Last commit that touched the page. Left out when git can't say, since Google ignores a lastmod it can't trust.
function lastModified(file: string) {
  try {
    return execFileSync('git', ['log', '-1', '--format=%cs', '--', file], { encoding: 'utf8' }).trim() || null
  } catch {
    return null
  }
}

function imagesOn(file: string) {
  try {
    return [...new Set(readFileSync(file, 'utf8').match(/\/img\/[\w.-]+\.(?:webp|jpe?g|png)/g) ?? [])]
  } catch {
    return []
  }
}

export default defineEventHandler((event) => {
  const { siteUrl } = useRuntimeConfig(event).public
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  const urls = PAGES.map((p) => {
    const file = sourceOf(p)
    const lastmod = lastModified(file)
    const lines = [`    <loc>${siteUrl}${p}</loc>`]
    if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`)
    for (const img of imagesOn(file)) lines.push(`    <image:image><image:loc>${siteUrl}${img}</image:loc></image:image>`)
    return `  <url>\n${lines.join('\n')}\n  </url>`
  }).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`
})
