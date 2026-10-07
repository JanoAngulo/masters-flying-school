// JSON-LD for search engines. Every value here is already published on the site; nothing is added.

export const SITE_NAME = 'Masters Flying School'

export function schoolSchema(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${siteUrl}/#school`,
    name: SITE_NAME,
    url: `${siteUrl}/`,
    logo: `${siteUrl}/img/logo.jpg`,
    image: `${siteUrl}/img/og-image.jpg`,
    foundingDate: '1994',
    email: 'info@mastersflyingschool.com',
    telephone: '+6328517042',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2317 Nissan Car Lease Bldg., Aurora Blvd.',
      addressLocality: 'Pasay City',
      addressRegion: 'Metro Manila',
      addressCountry: 'PH',
    },
    // Coordinates match the map pins on the contact page.
    location: [
      {
        '@type': 'Place',
        name: 'Pasay main office',
        telephone: '+6328517042',
        address: { '@type': 'PostalAddress', streetAddress: '2317 Nissan Car Lease Bldg., Aurora Blvd.', addressLocality: 'Pasay City', addressRegion: 'Metro Manila', addressCountry: 'PH' },
        geo: { '@type': 'GeoCoordinates', latitude: 14.529044, longitude: 121.004663 },
        hasMap: 'https://www.google.com/maps/search/?api=1&query=14.529044,121.004663',
      },
      {
        '@type': 'Place',
        name: 'Plaridel hangar',
        telephone: '+63447942865',
        address: { '@type': 'PostalAddress', streetAddress: 'Plaridel Airport', addressLocality: 'Plaridel', addressRegion: 'Bulacan', addressCountry: 'PH' },
        geo: { '@type': 'GeoCoordinates', latitude: 14.891871, longitude: 120.853987 },
        hasMap: 'https://www.google.com/maps/search/?api=1&query=14.891871,120.853987',
      },
    ],
    sameAs: ['https://www.facebook.com/pages/Masters-Flying-School/154831617913387'],
  }
}

// Lets Google show the school's name, rather than the domain, above results.
export function websiteSchema(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: SITE_NAME,
    url: `${siteUrl}/`,
    inLanguage: 'en-PH',
    publisher: { '@id': `${siteUrl}/#school` },
  }
}

export function breadcrumbSchema(siteUrl: string, page: { name: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: page.name, item: `${siteUrl}${page.path}` },
    ],
  }
}

// Descriptions are condensed from the course sections on /courses.
const COURSE_DETAILS = [
  { id: 'ppl', name: 'Private pilot license (PPL), airplane', description: 'Ground and flight training on the Cessna 150 or 152, from first solo to the private pilot license.' },
  { id: 'cpl', name: 'Commercial pilot license (CPL), airplane', description: 'Advanced ground school and flight training toward a license to fly for pay, with decision-making and crew resource management.' },
  { id: 'phpl', name: 'Private helicopter pilot license (PHPL)', description: 'Helicopter ground and flight training on the Schweizer 269 and 300 CB.' },
  { id: 'chpl', name: 'Commercial helicopter pilot license (CHPL)', description: 'Advanced commercial helicopter maneuvers and emergency procedures, with the decision-making a paid pilot needs.' },
  { id: 'instrument', name: 'Instrument rating', description: 'Instrument ground school and at least 20 hours in a CAAP-certified simulator, then actual instrument flight and the CAAP tests.' },
  { id: 'multi-engine', name: 'Multi-engine rating', description: 'Equipment Qualification Course ground school and at least 10 hours on the Piper Aztec, then the CAAP written and practical tests.' },
  { id: 'instructor', name: 'Flight instructor course (CFI, CFII)', description: 'Training toward the Certified Flight Instructor initial rating and the Certified Flight Instrument Instructor rating.' },
]

export function courseListSchema(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: COURSE_DETAILS.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Course',
        name: c.name,
        description: c.description,
        url: `${siteUrl}/courses#${c.id}`,
        provider: { '@id': `${siteUrl}/#school` },
      },
    })),
  }
}

// "<" is escaped so a value can never close the surrounding <script> tag.
export const toJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')
