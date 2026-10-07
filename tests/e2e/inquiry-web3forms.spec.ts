import { test, expect, type Page } from '@playwright/test'

// Runs against a build generated with NUXT_PUBLIC_WEB3FORMS_KEY set; skipped otherwise.
// hCaptcha and the Web3Forms API are stubbed at the network layer, so nothing real is sent.

const HCAPTCHA_STUB = `
  window.hcaptcha = {
    render: (el, opts) => { el.dataset.rendered = 'true'; window.__captchaOpts = opts; return 'w1' },
    getResponse: () => window.__captchaToken || '',
    reset: () => { window.__captchaResets = (window.__captchaResets || 0) + 1 },
  };
  const cb = new URL(document.currentScript.src).searchParams.get('onload');
  if (cb) window[cb]();
`

async function stub(page: Page, api: { status: number; body: object }) {
  const sent: Record<string, unknown>[] = []
  await page.route('https://js.hcaptcha.com/**', (r) => r.fulfill({ contentType: 'application/javascript', body: HCAPTCHA_STUB }))
  await page.route('https://api.web3forms.com/submit', async (r) => {
    sent.push(r.request().postDataJSON())
    await r.fulfill({ status: api.status, contentType: 'application/json', body: JSON.stringify(api.body) })
  })
  return sent
}

async function fill(page: Page) {
  await page.locator('#name').fill('Ana Cruz')
  await page.locator('#email').fill('ana@example.com')
  await page.locator('#message').fill('I want to start my PPL in June.')
}

test.beforeEach(async ({ page }) => {
  await page.goto('/contact')
  test.skip(await page.locator('input[name="botcheck"]').count() === 0, 'build has no Web3Forms key')
})

test('sends a solved inquiry to Web3Forms and confirms', async ({ page }) => {
  const sent = await stub(page, { status: 200, body: { success: true } })
  await page.reload()
  await fill(page)
  await expect(page.locator('[data-rendered="true"]')).toBeAttached()
  await page.evaluate(() => { (window as Window & { __captchaToken?: string }).__captchaToken = 'solved' })
  await page.waitForTimeout(3100)
  await page.getByRole('button', { name: 'Send inquiry' }).click()
  await expect(page.locator('#inquiry-status')).toHaveText('Thank you, your inquiry is on its way. We will reply to ana@example.com.')
  await expect(page.locator('#inquiry-status')).toBeFocused()
  expect(sent).toHaveLength(1)
  expect(sent[0]).toMatchObject({ name: 'Ana Cruz', email: 'ana@example.com', course: 'Not sure yet', botcheck: false, 'h-captcha-response': 'solved' })
  await expect(page.locator('#name')).toHaveValue('')
})

test('asks for the human check before sending', async ({ page }) => {
  const sent = await stub(page, { status: 200, body: { success: true } })
  await page.reload()
  await fill(page)
  await page.waitForTimeout(3100)
  await page.getByRole('button', { name: 'Send inquiry' }).click()
  await expect(page.locator('#inquiry-status')).toContainText('Tick the "I am human" box')
  expect(sent).toHaveLength(0)
})

test('a filled honeypot looks sent but nothing leaves the page', async ({ page }) => {
  const sent = await stub(page, { status: 200, body: { success: true } })
  await page.reload()
  await fill(page)
  await page.locator('input[name="botcheck"]').evaluate((el: HTMLInputElement) => { el.checked = true; el.dispatchEvent(new Event('change')) })
  await page.evaluate(() => { (window as Window & { __captchaToken?: string }).__captchaToken = 'solved' })
  await page.waitForTimeout(3100)
  await page.getByRole('button', { name: 'Send inquiry' }).click()
  await expect(page.locator('#inquiry-status')).toContainText('your inquiry is on its way')
  expect(sent).toHaveLength(0)
})

test('a rejected submission keeps the message and offers phone and email', async ({ page }) => {
  await stub(page, { status: 429, body: { success: false, message: 'Too many requests. Please try later!' } })
  await page.reload()
  await fill(page)
  await page.evaluate(() => { (window as Window & { __captchaToken?: string }).__captchaToken = 'solved' })
  await page.waitForTimeout(3100)
  await page.getByRole('button', { name: 'Send inquiry' }).click()
  await expect(page.locator('#inquiry-status')).toContainText('Your inquiry did not go through.')
  await expect(page.locator('#message')).toHaveValue('I want to start my PPL in June.')
})
