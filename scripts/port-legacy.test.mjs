import { readFileSync } from 'node:fs'
import { describe, it, expect } from 'vitest'
import { PAGES, extract, rewriteBody, toVue } from './port-legacy.mjs'

const page = (main) => `<!doctype html><html><head><title>Fleet | Masters &amp; Co</title>
<meta name="description" content="It&#x27;s the fleet."></head><body><header>x</header>
<main id="main">${main}</main><footer>y</footer></body></html>`

describe('extract', () => {
  it('returns decoded title, description and the inside of <main>', () => {
    expect(extract(page('<h1>Fleet</h1>'))).toEqual({ title: 'Fleet | Masters & Co', description: "It's the fleet.", main: '<h1>Fleet</h1>' })
  })
  it('throws when <main id="main"> is missing', () => {
    expect(() => extract('<title>a</title><meta name="description" content="b">')).toThrow(/main/)
  })
})

describe('rewriteBody', () => {
  it('turns links to legacy pages into NuxtLinks, keeping attributes, query and hash', () => {
    expect(rewriteBody('<a href="courses.html#ppl" class="x">PPL</a>')).toBe('<NuxtLink to="/courses#ppl" class="x">PPL</NuxtLink>')
    expect(rewriteBody('<a class="y" href="contact.html?course=cpl#inquiry">Ask</a>')).toBe('<NuxtLink class="y" to="/contact?course=cpl#inquiry">Ask</NuxtLink>')
    expect(rewriteBody('<a href="index.html">Home</a>')).toBe('<NuxtLink to="/">Home</NuxtLink>')
  })
  it('keeps multi-line link contents', () => {
    expect(rewriteBody('<a href="fleet.html" class="group">\n<img src="assets/img/a.webp">\n</a>')).toBe('<NuxtLink to="/fleet" class="group">\n<img src="/img/a.webp">\n</NuxtLink>')
  })
  it('leaves tel, mailto, external and same-page links alone', () => {
    const html = '<a href="tel:+6328517042">c</a><a href="mailto:a@b.c">m</a><a href="https://facebook.com/x">f</a><a href="#visa-student">v</a>'
    expect(rewriteBody(html)).toBe(html)
  })
  it('points image paths at /img and swaps the untokenized bar color', () => {
    expect(rewriteBody('<img src="assets/img/logo.jpg"><span class="bg-[#7D8DA6]"></span>')).toBe('<img src="/img/logo.jpg"><span class="bg-navy-400"></span>')
  })
  it('replaces the inquiry form with the component', () => {
    expect(rewriteBody('<div><form id="inquiry-form" novalidate>\n<input name="a">\n</form></div>')).toBe('<div><InquiryForm /></div>')
  })
  it('refuses markup Vue would interpolate', () => {
    expect(() => rewriteBody('<p>{{ x }}</p>')).toThrow(/interpolation/)
  })
})

describe('toVue', () => {
  it('wraps the body and sets page meta from JSON-escaped strings', () => {
    const vue = toVue({ title: 'A "quoted" title', description: 'D', body: '<h1>A</h1>' })
    expect(vue).toContain('useSiteMeta({\n  title: "A \\"quoted\\" title",\n  description: "D",\n})')
    expect(vue).toContain('usePageEnhancements(root)')
    expect(vue).toContain('<div ref="root" class="contents"><h1>A</h1></div>')
  })
})

describe('every legacy page', () => {
  it.each(PAGES)('%s ports without leftover legacy paths', (name) => {
    const { main } = extract(readFileSync(`legacy/${name}.html`, 'utf8'))
    const body = rewriteBody(main)
    expect(body).not.toMatch(/href="(index|courses|fleet|students|about|contact)\.html/)
    expect(body).not.toContain('assets/img/')
    expect(body).not.toContain('#7D8DA6')
  })
})
