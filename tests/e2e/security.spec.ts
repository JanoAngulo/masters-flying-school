import { test, expect } from '@playwright/test'

const PATHS = ['/', '/courses', '/fleet', '/students', '/about', '/contact']

for (const path of PATHS) {
  test(`${path} carries a CSP that blocks nothing the page needs`, async ({ page }) => {
    const violations: string[] = []
    page.on('console', (m) => { if (/Content Security Policy/i.test(m.text())) violations.push(m.text()) })
    await page.goto(path)
    const csp = await page.locator('meta[http-equiv="Content-Security-Policy"]').getAttribute('content')
    expect(csp).toContain("script-src 'self'")
    expect(csp).toMatch(/'sha256-[A-Za-z0-9+/=]+'/)
    expect(csp).toContain("object-src 'none'")
    // Scroll everything into view so lazy images and map frames load under the policy too.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForLoadState('networkidle')
    expect(violations).toEqual([])
  })
}

test('the CSP lets a clicked video load its YouTube player', async ({ page }) => {
  const violations: string[] = []
  page.on('console', (m) => { if (/Content Security Policy/i.test(m.text())) violations.push(m.text()) })
  await page.goto('/about')
  await page.locator('.yt button').first().click()
  await expect(page.locator('.yt iframe')).toHaveCount(1)
  await expect(page.locator('.yt-status')).toHaveCount(0, { timeout: 15000 })
  expect(violations).toEqual([])
})

test('an inline script the build did not hash is blocked', async ({ page }) => {
  await page.goto('/')
  const ran = await page.evaluate(async () => {
    const s = document.createElement('script')
    s.textContent = 'window.__injected = true'
    document.body.append(s)
    await new Promise((r) => setTimeout(r, 50))
    return (window as Window & { __injected?: boolean }).__injected === true
  })
  expect(ran).toBe(false)
})
