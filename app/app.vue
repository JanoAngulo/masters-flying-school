<script setup lang="ts">
const { siteUrl } = useRuntimeConfig().public

// Every value here is already published on the site; nothing is added.
const school = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Masters Flying School',
  url: `${siteUrl}/`,
  logo: `${siteUrl}/img/logo.jpg`,
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
  location: {
    '@type': 'Place',
    name: 'Plaridel hangar',
    telephone: '+63447942865',
    address: { '@type': 'PostalAddress', streetAddress: 'Plaridel Airport', addressLocality: 'Plaridel', addressRegion: 'Bulacan', addressCountry: 'PH' },
  },
  sameAs: ['https://www.facebook.com/pages/Masters-Flying-School/154831617913387'],
}

useHead({
  htmlAttrs: { lang: 'en' },
  bodyAttrs: { class: 'bg-white font-sans text-base text-ink antialiased' },
  link: [{ rel: 'icon', href: '/img/logo.jpg' }],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(school) }],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
