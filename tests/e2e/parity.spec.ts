import { test, expect, type Page } from '@playwright/test'

// The homepage left parity on purpose when its redesign began; its behavior is covered by the other specs.
const PAGES = ['courses', 'fleet', 'students', 'about', 'contact'] as const
const VIEWPORTS = { desktop: { width: 1280, height: 800 }, mobile: { width: 390, height: 844 } } as const

export function urlFor(name: string, project: string) {
  if (project === 'legacy') return `/${name}.html`
  return name === 'index' ? '/' : `/${name}`
}

async function settle(page: Page) {
  await page.evaluate(async () => {
    document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => { img.loading = 'eager' })
    await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => { img.onload = img.onerror = r }))))
    await document.fonts.ready
  })
}

for (const name of PAGES) {
  for (const [viewport, size] of Object.entries(VIEWPORTS)) {
    test(`${name} matches the legacy page (${viewport})`, async ({ page }, info) => {
      // Parity is about the static page. Scroll motion would leave parts of a full-page capture
      // undrawn, so it stays off here and motion.spec.ts covers it.
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.setViewportSize(size)
      await page.goto(urlFor(name, info.project.name))
      await settle(page)
      await expect(page).toHaveScreenshot(`${name}-${viewport}.png`, {
        fullPage: true,
        // Third-party content (map iframes, YouTube thumbnails) changes on its own.
        mask: [page.locator('iframe'), page.locator('.yt img')],
      })
    })
  }
}
