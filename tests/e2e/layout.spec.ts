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
