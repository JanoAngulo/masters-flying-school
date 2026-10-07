import { test, expect } from '@playwright/test'

const ROUTES = [
  { path: '/', h1: 'Earn your wings. Or your rotors.', title: 'Masters Flying School | Pilot training at Plaridel Airport, Bulacan' },
  { path: '/courses', h1: 'Courses', title: 'Courses | Masters Flying School' },
  { path: '/fleet', h1: 'Fleet', title: 'Fleet | Masters Flying School' },
  { path: '/students', h1: 'Students', title: 'Students | Masters Flying School' },
  { path: '/about', h1: 'About the school', title: 'About | Masters Flying School' },
  { path: '/contact', h1: 'Contact us', title: 'Contact | Masters Flying School' },
]

for (const r of ROUTES) {
  test(`${r.path} renders without console errors`, async ({ page }) => {
    const errors: string[] = []
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
    page.on('pageerror', (e) => errors.push(e.message))
    await page.goto(r.path)
    await expect(page.locator('h1')).toHaveText(r.h1)
    await expect(page).toHaveTitle(r.title)
    await page.waitForLoadState('networkidle')
    expect(errors.filter((e) => !/ytimg|youtube|google/.test(e))).toEqual([])
  })
}

test('every internal link resolves and none point at .html files', async ({ page, request }) => {
  const targets = new Set<string>()
  for (const r of ROUTES) {
    await page.goto(r.path)
    const hrefs = await page.locator('a[href]').evaluateAll((as) => as.map((a) => a.getAttribute('href')!))
    expect(hrefs.filter((h) => /\.html/.test(h))).toEqual([])
    hrefs.filter((h) => h.startsWith('/')).forEach((h) => targets.add(h.split(/[?#]/)[0] || '/'))
  }
  for (const t of targets) expect((await request.get(t)).status(), t).toBe(200)
})

test('header marks the current page and hides the inquiry button on contact', async ({ page }) => {
  await page.goto('/courses')
  await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Courses' })).toHaveAttribute('aria-current', 'page')
  await page.goto('/contact')
  await expect(page.locator('header').getByRole('link', { name: 'Send an inquiry' })).toHaveCount(0)
})

test('mobile menu closes and unlocks scroll after navigating', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open menu' }).click()
  await page.locator('#mobile-menu').getByRole('link', { name: 'Fleet' }).click()
  await expect(page).toHaveURL(/\/fleet\/?$/)
  await expect(page.locator('#mobile-menu')).toBeHidden()
  await expect(page.locator('body')).not.toHaveClass(/overflow-hidden/)
})

test('runway band states when the school was founded, not when the airfield opened', async ({ page }) => {
  await page.goto('/')
  const band = page.locator('section[aria-labelledby="hero-title"] dl')
  await expect(band).toContainText('School founded')
  await expect(band).toContainText('1994')
  await expect(band).not.toContainText('1935')
})

test('homepage close offers contact channels that work from abroad', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 })
  await page.goto('/')
  const close = page.locator('section[aria-labelledby="visit-title"]')
  await expect(close).toContainText('From abroad +63 2 851 7042')
  await expect(close).toContainText('From abroad +63 44 794 2865')
  await expect(close.getByRole('link', { name: 'info@mastersflyingschool.com' })).toHaveAttribute('href', 'mailto:info@mastersflyingschool.com')
  await expect(close.getByRole('link', { name: '+63 917 869 1974' })).toHaveAttribute('href', 'tel:+639178691974')
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320)
})

test('homepage routes each audience to its own first answer', async ({ page }) => {
  await page.goto('/')
  const start = page.locator('section[aria-labelledby="start-title"]')
  const routes = {
    'New to flying': '/courses#ppl',
    "Paying for someone's training": '/about#accreditation',
    'Already licensed': '/courses#instrument',
    'Coming from abroad': '/students#foreign-students',
  }
  for (const [name, href] of Object.entries(routes)) {
    await expect(start.getByRole('link', { name: new RegExp(`^${name}`) })).toHaveAttribute('href', href)
  }
  await expect(page.getByRole('link', { name: 'Visa routes for foreign students' })).toHaveAttribute('href', '/students#foreign-students')
})

test('runway band airline count matches the alumni list', async ({ page }) => {
  await page.goto('/')
  const band = page.locator('section[aria-labelledby="hero-title"] dl')
  await expect(band).toContainText('ATOC 94-02')
  // The alumni list also counts CAAP check pilots, which is not an airline.
  const airlines = await page.locator('section[aria-labelledby="alumni-title"] ol > li').evaluateAll(
    (rows) => rows.filter((r) => !r.textContent?.includes('CAAP')).length,
  )
  await expect(band).toContainText(`${airlines} airlines`)
})

test('homepage explains its aviation terms in place', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 })
  await page.goto('/')
  const tip = page.getByRole('button', { name: 'What does NBI clearance mean?' })
  await tip.scrollIntoViewIfNeeded()
  await tip.click()
  await expect(page.locator('#tip-home-nbi')).toBeVisible()
  await expect(page.locator('[data-tip-announcer]')).toContainText('National Bureau of Investigation')
  await expect.poll(async () => {
    const box = (await page.locator('#tip-home-nbi').boundingBox())!
    return box.x + box.width
  }).toBeLessThanOrEqual(360 - 11)
  for (const term of ['ATOC', 'third-class medical certificate', 'dual', 'higher-horsepower rating', 'checkride']) {
    await expect(page.getByRole('button', { name: `What does ${term} mean?` })).toHaveCount(1)
  }
  // Acronyms a first-timer would not know stay out of the visible copy.
  await expect(page.locator('main')).not.toContainText('PHPL')
  await expect(page.locator('main')).not.toContainText('PAF-ARCEN')
})

test('courses side nav marks the section being read', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/courses')
  const nav = page.getByRole('navigation', { name: 'Courses on this page' })
  const current = nav.locator('a[aria-current="location"]')
  await expect(current).toHaveCount(0)

  await page.locator('#cpl').evaluate((el) => el.scrollIntoView())
  await expect(current).toHaveText(['Commercial pilot'])

  // The two ratings sit side by side, so both are being read at once.
  await page.locator('#instrument').evaluate((el) => el.scrollIntoView())
  await expect(current).toHaveText(['Instrument rating', 'Multi-engine'])

  await nav.getByRole('link', { name: 'Flight instructor' }).click()
  await expect(current).toHaveText(['Flight instructor'])
  await expect(nav.locator('.spy-bar')).toHaveCSS('opacity', '1')
})
