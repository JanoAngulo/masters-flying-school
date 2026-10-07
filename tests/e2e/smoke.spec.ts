import { test, expect } from '@playwright/test'

test('compiled Tailwind tokens and self-hosted fonts load', async ({ page }) => {
  const external: string[] = []
  page.on('request', (r) => { if (/cdn\.tailwindcss\.com|fonts\.googleapis\.com/.test(r.url())) external.push(r.url()) })
  await page.goto('/')
  const h1 = page.locator('h1')
  await expect(h1).toHaveCSS('color', 'rgb(14, 34, 64)')
  // fonts.check() returns true for families that were never declared, so inspect the loaded faces instead.
  const loaded = await page.evaluate(async () => {
    await document.fonts.ready
    return [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.replace(/["']/g, ''))
  })
  expect(loaded).toContain('Barlow Condensed')
  expect(external).toEqual([])
})
