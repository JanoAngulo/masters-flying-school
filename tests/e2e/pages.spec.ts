import { test, expect } from '@playwright/test'

const ROUTES = [
  { path: '/', h1: 'Learn to fly at Plaridel.', title: 'Masters Flying School | Pilot training at Plaridel Airport, Bulacan' },
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
