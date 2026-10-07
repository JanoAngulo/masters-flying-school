import { test, expect } from '@playwright/test'

test.describe('fleet tabs', () => {
  test('fleet HTML works without JavaScript', async ({ request }) => {
    const html = await (await request.get('/fleet')).text()
    expect(html).toMatch(/<div role="tablist"[^>]*\shidden/)
    expect(html.match(/role="tabpanel"/g)).toHaveLength(6)
    expect(html).not.toMatch(/role="tabpanel"[^>]*\shidden/)
  })

  test('shows the first aircraft and supports arrow keys, Home and End', async ({ page }) => {
    await page.goto('/fleet')
    const tabs = page.getByRole('tab')
    await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true')
    await expect(page.locator('#cessna-150')).toBeVisible()
    await expect(page.locator('#cessna-152')).toBeHidden()
    await tabs.nth(0).focus()
    await page.keyboard.press('ArrowRight')
    await expect(tabs.nth(1)).toBeFocused()
    await expect(page.locator('#cessna-152')).toBeVisible()
    await expect(page).toHaveURL(/#cessna-152$/)
    await page.keyboard.press('End')
    await expect(page.locator('#schweizer-300cb')).toBeVisible()
    await page.keyboard.press('Home')
    await expect(page.locator('#cessna-150')).toBeVisible()
  })

  test('opens the right aircraft from a homepage card', async ({ page }) => {
    await page.goto('/')
    await page.locator('a[href="/fleet#piper-aztec"]').click()
    await expect(page).toHaveURL(/\/fleet\/?#piper-aztec$/)
    await expect(page.getByRole('tab', { name: /Piper Aztec/ })).toHaveAttribute('aria-selected', 'true')
    await expect(page.locator('#piper-aztec')).toBeInViewport()
  })

  test('direct load with a hash selects that aircraft', async ({ page }) => {
    await page.goto('/fleet#schweizer-269')
    await expect(page.locator('#schweizer-269')).toBeVisible()
    await expect(page.locator('#cessna-150')).toBeHidden()
  })

  test('back button works after choosing a tab', async ({ page }) => {
    const warnings: string[] = []
    page.on('console', (m) => { if (m.type() === 'warning' || m.type() === 'error') warnings.push(m.text()) })
    await page.goto('/')
    await page.locator('header').getByRole('link', { name: 'Fleet' }).first().click()
    await page.getByRole('tab', { name: /Cessna 172/ }).click()
    await page.goBack()
    await expect(page.locator('h1')).toHaveText('Learn to fly at Plaridel.')
    expect(warnings.filter((w) => /history\.state/.test(w))).toEqual([])
  })
})

test.describe('term tips', () => {
  test('open with text in a status region, close on Escape and outside click', async ({ page }) => {
    await page.goto('/fleet')
    const btn = page.getByRole('button', { name: 'What does stall mean?' }).first()
    const note = page.locator('#tip-cessna-150-1')
    await expect(note).toHaveAttribute('role', 'status')
    await btn.click()
    await expect(btn).toHaveAttribute('aria-expanded', 'true')
    await expect(note).toBeVisible()
    await expect(note).toContainText('wing stops making enough lift')
    await page.keyboard.press('Escape')
    await expect(note).toBeHidden()
    await expect(btn).toBeFocused()
    await btn.click()
    await page.locator('h1').click()
    await expect(note).toBeHidden()
    await expect(note).toHaveText('')
  })

  test('stays inside a narrow viewport', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 })
    await page.goto('/fleet')
    const btn = page.getByRole('button', { name: 'What does service ceiling mean?' }).first()
    await btn.scrollIntoViewIfNeeded()
    await btn.click()
    // The note is repositioned on the next animation frame, so poll until it settles.
    await expect.poll(async () => {
      const box = (await page.locator('#tip-cessna-150-3').boundingBox())!
      return box.x + box.width
    }).toBeLessThanOrEqual(360 - 11)
  })
})

test('video loads only after the play button is pressed', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.yt iframe')).toHaveCount(0)
  await page.getByRole('button', { name: 'Play video: Fixed wing flight, Cessna' }).click()
  const iframe = page.locator('.yt iframe')
  await expect(iframe).toHaveAttribute('src', /youtube-nocookie\.com\/embed\/zArCGT2t9AQ\?autoplay=1/)
  await expect(iframe).toHaveAttribute('title', 'Fixed wing flight, Cessna')
})

test('same-page link to a collapsed section opens it', async ({ page }) => {
  await page.goto('/students')
  const details = page.locator('details#visa-student')
  await expect(details).not.toHaveAttribute('open', '')
  await page.locator('a[href="#visa-student"]').first().click()
  await expect(details).toHaveAttribute('open', '')
})
