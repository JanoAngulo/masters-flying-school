// Crops page photos to 1200x630 JPEG link-preview images in public/img/og/.
// JPEG because not every chat app renders WebP previews. Run with `npm run og` after changing a photo.
import { chromium } from '@playwright/test'
import { mkdirSync, readFileSync } from 'node:fs'

const IMAGES = {
  courses: 'student-cessna',
  fleet: 'hangar-plaridel',
  students: 'class-apron',
  about: 'hangar-exterior',
  contact: 'office-pasay',
}

mkdirSync('public/img/og', { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
for (const [name, photo] of Object.entries(IMAGES)) {
  const src = `data:image/webp;base64,${readFileSync(`public/img/${photo}.webp`).toString('base64')}`
  await page.setContent(`<style>body{margin:0}img{display:block;width:1200px;height:630px;object-fit:cover}</style><img src="${src}">`)
  await page.locator('img').evaluate((img) => img.decode())
  await page.screenshot({ path: `public/img/og/${name}.jpg`, type: 'jpeg', quality: 85 })
}
await browser.close()
