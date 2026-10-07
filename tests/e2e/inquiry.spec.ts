import { test, expect, type Page } from '@playwright/test'

// Builds with a Web3Forms key send through the API instead; inquiry-web3forms.spec.ts covers those.
const skipIfWeb3Forms = async (page: Page) => test.skip(await page.locator('input[name="botcheck"]').count() > 0, 'build sends through Web3Forms')

test('reports every invalid field and focuses the first', async ({ page }) => {
  await page.goto('/contact')
  await page.getByRole('button', { name: 'Send inquiry' }).click()
  await expect(page.locator('#inquiry-status')).toHaveText('3 fields need fixing before we can send this.')
  await expect(page.locator('#name')).toBeFocused()
  await expect(page.locator('#name')).toHaveAttribute('aria-invalid', 'true')
  await expect(page.locator('#name-error')).toHaveText('Enter your full name.')
  await expect(page.locator('#phone')).toHaveAttribute('aria-invalid', 'false')
})

test('validates on blur and clears the error while typing a fix', async ({ page }) => {
  await page.goto('/contact')
  await page.locator('#email').fill('ana@')
  await page.locator('#email').blur()
  await expect(page.locator('#email-error')).toBeVisible()
  await page.locator('#email').fill('ana@example.com')
  await expect(page.locator('#email-error')).toBeHidden()
  await expect(page.locator('#email')).toHaveAttribute('aria-invalid', 'false')
})

test('caps field lengths in the browser', async ({ page }) => {
  await page.goto('/contact')
  await expect(page.locator('#name')).toHaveAttribute('maxlength', '100')
  await expect(page.locator('#email')).toHaveAttribute('maxlength', '254')
  await expect(page.locator('#phone')).toHaveAttribute('maxlength', '30')
  await expect(page.locator('#message')).toHaveAttribute('maxlength', '5000')
})

test('without a Web3Forms key there is no honeypot or captcha, and a no-script submit goes to email', async ({ page }) => {
  await page.goto('/contact')
  await skipIfWeb3Forms(page)
  await expect(page.locator('input[name="botcheck"]')).toHaveCount(0)
  await expect(page.locator('#inquiry-form')).toHaveAttribute('action', 'mailto:info@mastersflyingschool.com')
})

test('preselects the course from the query string', async ({ page }) => {
  await page.goto('/contact?course=cpl#inquiry')
  await expect(page.locator('#course')).toHaveValue('cpl')
})

test('ignores an unknown course in the query string', async ({ page }) => {
  await page.goto('/contact?course=jet-pack')
  await expect(page.locator('#course')).toHaveValue('unsure')
})

test('course links on the courses page carry the course over', async ({ page }) => {
  await page.goto('/courses')
  await page.locator('a[href^="/contact?course=phpl"]').first().click()
  await expect(page.locator('#course')).toHaveValue('phpl')
})

test('a valid inquiry hands off to email and confirms with a fallback', async ({ page }) => {
  await page.goto('/contact')
  await skipIfWeb3Forms(page)
  await page.locator('#name').fill('Ana Cruz')
  await page.locator('#email').fill('ana@example.com')
  await page.locator('#message').fill('I want to start my PPL in June.')
  await page.getByRole('button', { name: 'Send inquiry' }).click()
  const status = page.locator('#inquiry-status')
  await expect(status).toContainText('Your email app should now be open')
  await expect(status).toBeFocused()
  await expect(status.getByRole('link', { name: 'info@mastersflyingschool.com' })).toHaveAttribute('href', 'mailto:info@mastersflyingschool.com')
  await expect(page.getByRole('button', { name: 'Send inquiry' })).toBeEnabled()
})
