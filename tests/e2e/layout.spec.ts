import { test, expect } from '@playwright/test'

test.describe('layout', () => {
  test('skip link is first in tab order and targets main', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: 'Skip to content' })
    await expect(skip).toBeFocused()
    await expect(skip).toHaveAttribute('href', '#main')
    await expect(page.locator('main#main')).toHaveCount(1)
  })

  test('header gains its hairline after scrolling', async ({ page }) => {
    await page.goto('/')
    const header = page.locator('.site-header')
    await expect(header).toHaveAttribute('data-scrolled', 'false')
    await page.evaluate(() => { document.body.style.minHeight = '300vh'; window.scrollTo(0, 400) })
    await expect(header).toHaveAttribute('data-scrolled', 'true')
  })

  test('mobile menu opens, focuses the first link, and closes on Escape', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    const toggle = page.getByRole('button', { name: 'Open menu' })
    await toggle.click()
    await expect(page.locator('#mobile-menu')).toBeVisible()
    await expect(page.locator('#mobile-menu a').first()).toBeFocused()
    await expect(page.locator('body')).toHaveClass(/overflow-hidden/)
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Escape')
    await expect(page.locator('#mobile-menu')).toBeHidden()
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused()
    await expect(page.locator('body')).not.toHaveClass(/overflow-hidden/)
  })

  test('footer shows the current year and both addresses', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer').last()
    await expect(footer).toContainText(`© ${new Date().getFullYear()} Masters Flying School`)
    await expect(footer).toContainText('Plaridel Airport, Plaridel, Bulacan')
  })
})

test.describe('client-side navigation', () => {
  test('announces the new page and moves focus to the main content', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Courses' }).click()
    await expect(page.locator('h1')).toHaveText('Courses')
    await expect(page.locator('main#main')).toBeFocused()
    await expect(page.locator('[aria-live]').filter({ hasText: 'Courses | Masters Flying School' })).toHaveCount(1)
  })

  test('keeps focus out of a closed mobile menu after navigating from it', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await page.getByRole('button', { name: 'Open menu' }).click()
    await page.locator('#mobile-menu').getByRole('link', { name: 'Students' }).click()
    await expect(page.locator('h1')).toHaveText('Students')
    await expect(page.locator('main#main')).toBeFocused()
  })

  test('arriving at a hash leaves focus alone so the browser can jump to it', async ({ page }) => {
    await page.goto('/')
    await page.locator('a[href="/fleet#piper-aztec"]').click()
    await expect(page.locator('#piper-aztec')).toBeVisible()
    await expect(page.locator('main#main')).not.toBeFocused()
  })
})
