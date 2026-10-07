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

test('sitemap lists every page at the site URL', async ({ request }) => {
  const res = await request.get('/sitemap.xml')
  expect(res.status()).toBe(200)
  const xml = await res.text()
  for (const path of PATHS) expect(xml).toContain(`<loc>https://mastersflyingschool.com${path}</loc>`)
})

test('robots.txt allows crawling, so the noindex tag is seen, and points at the sitemap', async ({ request }) => {
  const res = await request.get('/robots.txt')
  expect(res.status()).toBe(200)
  const txt = await res.text()
  expect(txt).toContain('User-agent: *')
  expect(txt).toContain('Allow: /')
  expect(txt).toContain('Sitemap: https://mastersflyingschool.com/sitemap.xml')
})
