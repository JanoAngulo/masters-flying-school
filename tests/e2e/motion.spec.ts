import { test, expect, type Page } from '@playwright/test'

// GSAP's core chunk is the only script that carries its copyright banner.
function watchGsap(page: Page) {
  const loaded: string[] = []
  page.on('response', async (r) => {
    if (r.url().endsWith('.js') && (await r.text().catch(() => '')).includes('GreenSock')) loaded.push(r.url())
  })
  return loaded
}

const dotOpacities = (page: Page) =>
  page.locator('.route-dot').evaluateAll((dots) => dots.map((d) => getComputedStyle(d).opacity))
const leftoverClips = (page: Page) =>
  page.locator('.route-leg, [data-bars] [aria-hidden="true"] > span').evaluateAll((els) => els.filter((e) => e.style.clipPath).length)

test.describe('homepage motion', () => {
  test.use({ viewport: { width: 1280, height: 800 } })

  test('the training route and alumni bars draw in when reached, and end fully drawn', async ({ page }) => {
    await page.goto('/')
    // Below the fold, the route waits hidden until it is scrolled to.
    await expect.poll(() => dotOpacities(page)).toEqual(Array(7).fill('0'))

    await page.locator('#path-title').evaluate((el) => el.scrollIntoView({ behavior: 'instant' }))
    await expect.poll(() => dotOpacities(page)).toEqual(Array(7).fill('1'))
    await page.locator('[data-bars]').evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center' }))
    // Finished tweens clear their inline styles, so the page is left exactly as it was written.
    await expect.poll(() => leftoverClips(page)).toBe(0)
  })

  test('reduced motion leaves the homepage static and never downloads GSAP', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    const gsap = watchGsap(page)
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    expect(await dotOpacities(page)).toEqual(Array(7).fill('1'))
    expect(await leftoverClips(page)).toBe(0)
    expect(gsap).toEqual([])
  })

  test('the opening plays on the first view of the homepage only', async ({ page }) => {
    const hero = page.locator('section[aria-labelledby="hero-title"]')
    await page.goto('/')
    await expect(hero).toHaveClass(/\bintro\b/)

    await page.locator('header').getByRole('link', { name: 'Courses' }).click()
    await expect(page).toHaveURL(/\/courses\/?$/)
    await page.goBack()
    await expect(page.locator('h1')).toHaveText('Learn to fly at Plaridel.')
    await expect(hero).not.toHaveClass(/\bintro\b/)
  })

  test('other pages never download GSAP', async ({ page }) => {
    const gsap = watchGsap(page)
    for (const path of ['/courses', '/fleet', '/students', '/about', '/contact']) {
      await page.goto(path)
      await page.waitForLoadState('networkidle')
    }
    expect(gsap).toEqual([])
  })
})
