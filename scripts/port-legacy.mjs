// Converts a legacy static page into a Nuxt page: the inside of <main> becomes the template,
// links between pages become NuxtLinks, and image paths point at public/img.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'

export const PAGES = ['index', 'courses', 'fleet', 'students', 'about', 'contact']

const PAGE_LINK = new RegExp(
  `<a\\b([^>]*?)\\shref="(${PAGES.join('|')})\\.html([?#][^"]*)?"([^>]*)>([\\s\\S]*?)<\\/a>`,
  'g',
)

const decode = (s) => s.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&')

export function extract(html) {
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1]
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1]
  const main = html.match(/<main id="main">([\s\S]*?)<\/main>/)?.[1]
  if (!title || !description || main === undefined) {
    throw new Error('Legacy page is missing <title>, meta description or <main id="main">')
  }
  return { title: decode(title), description: decode(description), main }
}

export function rewriteBody(main) {
  if (main.includes('{{')) throw new Error('Legacy markup contains "{{", which Vue would treat as interpolation')
  return main
    .replace(/<form id="inquiry-form"[\s\S]*?<\/form>/, '<InquiryForm />')
    .replace(PAGE_LINK, (_, before, page, rest = '', after, inner) =>
      `<NuxtLink${before} to="/${page === 'index' ? '' : page}${rest}"${after}>${inner}</NuxtLink>`)
    .replaceAll('assets/img/', '/img/')
    .replaceAll('bg-[#7D8DA6]', 'bg-navy-400')
}

export function toVue({ title, description, body }) {
  return `<script setup lang="ts">
useSiteMeta({
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)},
})
const root = ref<HTMLElement | null>(null)
usePageEnhancements(root)
</script>

<template>
  <div ref="root" class="contents">${body}</div>
</template>
`
}

if (process.argv[1]?.replace(/\\/g, '/').endsWith('scripts/port-legacy.mjs')) {
  mkdirSync('app/pages', { recursive: true })
  for (const name of PAGES) {
    const { title, description, main } = extract(readFileSync(`legacy/${name}.html`, 'utf8'))
    writeFileSync(`app/pages/${name}.vue`, toVue({ title, description, body: rewriteBody(main) }))
    console.log(`app/pages/${name}.vue`)
  }
}
