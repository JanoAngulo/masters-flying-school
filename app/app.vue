<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'en' },
  bodyAttrs: { class: 'bg-white font-sans text-base text-ink antialiased' },
  link: [{ rel: 'icon', href: '/img/logo.jpg' }],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
