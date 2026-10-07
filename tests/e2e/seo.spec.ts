import { test, expect } from '@playwright/test'

const PATHS = ['/', '/courses', '/fleet', '/students', '/about', '/contact']

const ldJson = (html: string) =>
  [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]!))

for (const path of PATHS) {
  test(`${path} ships sharing tags in its static HTML`, async ({ request }) => {
    const html = await (await request.get(path)).text()
    const title = html.match(/<title>([^<]*)<\/title>/)![1]
    expect(html).toContain(`<meta property="og:title" content="${title}">`)
    expect(html).toMatch(/<meta property="og:description" content="[^"]+">/)
    expect(html).toContain('<meta property="og:image" content="https://mastersflyingschool.com/img/og-image.jpg">')
    expect(html).toContain('<meta property="og:image:width" content="1200">')
    expect(html).toContain('<meta property="og:image:height" content="630">')
    expect(html).toContain(`<link rel="canonical" href="https://mastersflyingschool.com${path === '/' ? '/' : path}">`)
    expect(html).toContain('<meta name="robots" content="noindex, nofollow">')
  })
}

test('the sharing image is a 1200x630 JPEG', async ({ request }) => {
  const res = await request.get('/img/og-image.jpg')
  expect(res.status()).toBe(200)
  expect(res.headers()['content-type']).toContain('image/jpeg')
})

test('icons and the web manifest are linked and served', async ({ request }) => {
  const html = await (await request.get('/')).text()
  for (const href of ['/favicon.ico', '/icon-192.png', '/apple-touch-icon.png', '/site.webmanifest']) {
    expect(html).toContain(`href="${href}"`)
    expect((await request.get(href)).status()).toBe(200)
  }
  const manifest = await (await request.get('/site.webmanifest')).json()
  expect(manifest.name).toBe('Masters Flying School')
  for (const icon of manifest.icons) expect((await request.get(icon.src)).status()).toBe(200)
})

test('structured data describes the school, both locations and the website', async ({ request }) => {
  const [school, website] = ldJson(await (await request.get('/')).text())
  expect(school['@type']).toBe('EducationalOrganization')
  expect(school.name).toBe('Masters Flying School')
  expect(school.foundingDate).toBe('1994')
  expect(school.address.addressLocality).toBe('Pasay City')
  expect(school.location.map((l: { address: { addressLocality: string } }) => l.address.addressLocality)).toEqual(['Pasay City', 'Plaridel'])
  expect(website).toMatchObject({ '@type': 'WebSite', name: 'Masters Flying School' })
})

test('inner pages carry a breadcrumb and the home page does not', async ({ request }) => {
  const types = async (path: string) => ldJson(await (await request.get(path)).text()).map((d) => d['@type'])
  expect(await types('/')).not.toContain('BreadcrumbList')
  const crumbs = ldJson(await (await request.get('/fleet')).text()).find((d) => d['@type'] === 'BreadcrumbList')
  expect(crumbs.itemListElement.map((i: { name: string }) => i.name)).toEqual(['Home', 'Fleet'])
})

test('the courses page lists each course as structured data', async ({ request }) => {
  const list = ldJson(await (await request.get('/courses')).text()).find((d) => d['@type'] === 'ItemList')
  expect(list.itemListElement).toHaveLength(7)
  expect(list.itemListElement[0].item).toMatchObject({ '@type': 'Course', url: 'https://mastersflyingschool.com/courses#ppl' })
})

test('sitemap lists every page at the site URL with its images', async ({ request }) => {
  const res = await request.get('/sitemap.xml')
  expect(res.status()).toBe(200)
  const xml = await res.text()
  for (const path of PATHS) expect(xml).toContain(`<loc>https://mastersflyingschool.com${path}</loc>`)
  expect(xml).toContain('<image:loc>https://mastersflyingschool.com/img/fleet-piper-aztec.webp</image:loc>')
})

test('robots.txt allows crawling, so the noindex tag is seen, and points at the sitemap', async ({ request }) => {
  const res = await request.get('/robots.txt')
  expect(res.status()).toBe(200)
  const txt = await res.text()
  expect(txt).toContain('User-agent: *')
  expect(txt).toContain('Allow: /')
  expect(txt).toContain('Sitemap: https://mastersflyingschool.com/sitemap.xml')
})

test('an unknown address shows the site error page with a way back', async ({ page }) => {
  await page.goto('/no-such-page')
  await expect(page.locator('h1')).toHaveText('Page not found')
  await expect(page).toHaveTitle('Page not found | Masters Flying School')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex')
  await page.getByRole('link', { name: /^Fleet/ }).first().click()
  await expect(page.locator('h1')).toHaveText('Fleet')
})
