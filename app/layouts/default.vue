<script setup lang="ts">
const nuxtApp = useNuxtApp()
const route = useRoute()
const main = ref<HTMLElement | null>(null)

// A client-side page change is not a page load, so focus would stay on the link that was clicked
// (or fall to <body> when that link was in the now-closed mobile menu). Move it to the new content,
// unless a hash is taking the reader somewhere specific.
let lastPath = route.path
const stop = nuxtApp.hook('page:finish', () => {
  if (route.path === lastPath) return
  lastPath = route.path
  if (!route.hash) main.value?.focus({ preventScroll: true })
})
onBeforeUnmount(stop)
</script>

<template>
  <a href="#main" class="skip-link rounded-md bg-navy px-4 py-3 font-semibold text-white">Skip to content</a>
  <SiteHeader />
  <main id="main" ref="main" tabindex="-1" class="focus:outline-none">
    <slot />
  </main>
  <SiteFooter />
</template>
