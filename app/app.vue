<script setup lang="ts">
const { siteUrl } = useRuntimeConfig().public

useHead({
  htmlAttrs: { lang: 'en' },
  bodyAttrs: { class: 'bg-white font-sans text-base text-ink antialiased' },
  script: [
    { key: 'ld-school', type: 'application/ld+json', innerHTML: toJsonLd(schoolSchema(siteUrl)) },
    { key: 'ld-website', type: 'application/ld+json', innerHTML: toJsonLd(websiteSchema(siteUrl)) },
  ],
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
