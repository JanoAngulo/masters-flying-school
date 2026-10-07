import { describe, it, expect } from 'vitest'
import { schoolSchema, websiteSchema, breadcrumbSchema, courseListSchema, toJsonLd } from './structuredData'
import { COURSES } from './inquiry'

const SITE = 'https://example.com'

describe('schoolSchema', () => {
  it('places both locations at the coordinates the contact page maps use', () => {
    const [pasay, plaridel] = schoolSchema(SITE).location
    expect(pasay.address.addressLocality).toBe('Pasay City')
    expect(pasay.geo).toMatchObject({ latitude: 14.529044, longitude: 121.004663 })
    expect(plaridel.address.addressLocality).toBe('Plaridel')
    expect(plaridel.geo).toMatchObject({ latitude: 14.891871, longitude: 120.853987 })
  })
})

describe('websiteSchema', () => {
  it('names the site and points its publisher at the school', () => {
    expect(websiteSchema(SITE)).toMatchObject({ '@type': 'WebSite', name: 'Masters Flying School', url: `${SITE}/`, publisher: { '@id': `${SITE}/#school` } })
  })
})

describe('breadcrumbSchema', () => {
  it('leads from Home to the page', () => {
    const items = breadcrumbSchema(SITE, { name: 'Fleet', path: '/fleet' }).itemListElement
    expect(items.map((i) => [i.position, i.name, i.item])).toEqual([[1, 'Home', `${SITE}/`], [2, 'Fleet', `${SITE}/fleet`]])
  })
})

describe('courseListSchema', () => {
  it('lists every course the inquiry form offers, each linked to its section', () => {
    const urls = courseListSchema(SITE).itemListElement.map((i) => i.item.url)
    const offered = COURSES.filter((c) => c.value !== 'unsure').map((c) => `${SITE}/courses#${c.value}`)
    expect(urls).toEqual(offered)
  })
})

describe('toJsonLd', () => {
  it('cannot close the script tag it is embedded in', () => {
    expect(toJsonLd({ a: '</script><script>alert(1)</script>' })).not.toContain('</script>')
  })
})
