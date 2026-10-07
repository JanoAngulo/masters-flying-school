<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error.statusCode === 404)

useHead({
  title: computed(() => `${notFound.value ? 'Page not found' : 'Something went wrong'} | ${SITE_NAME}`),
  meta: [{ name: 'robots', content: 'noindex' }],
})

const LINKS = [
  { to: '/courses', label: 'Courses', note: 'Airplane and helicopter licenses, plus ratings' },
  { to: '/fleet', label: 'Fleet', note: 'The Cessnas, the Piper Aztec and the Schweizers' },
  { to: '/students', label: 'Students', note: 'Training life, foreign students and alumni' },
  { to: '/contact', label: 'Contact', note: 'Phone, email, maps and the inquiry form' },
]
</script>

<template>
  <NuxtLayout>
    <section class="on-dark bg-navy text-white">
      <div class="mx-auto max-w-site px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <p class="font-display text-xl font-semibold text-navy-300 tabular">{{ error.statusCode }}</p>
        <h1 class="mt-2 font-display text-5xl font-bold leading-none sm:text-6xl">{{ notFound ? 'Page not found' : 'Something went wrong' }}</h1>
        <p class="mt-5 max-w-2xl text-lg text-navy-300">
          <template v-if="notFound">This address does not match a page on the site. It may have moved when the site was rebuilt.</template>
          <template v-else>This page could not load. Try again in a moment, or call us on <a href="tel:+6328517042" class="font-semibold text-white underline underline-offset-2 tabular">(02) 851-7042</a>.</template>
        </p>
      </div>
      <div class="threshold-thin" aria-hidden="true"></div>
    </section>

    <section aria-labelledby="error-links-title" class="mx-auto max-w-site px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
      <h2 id="error-links-title" class="font-display text-3xl font-bold text-navy">Where most visitors are headed</h2>
      <ul class="mt-6 grid gap-4 sm:grid-cols-2">
        <li v-for="link in LINKS" :key="link.to">
          <NuxtLink :to="link.to" class="press flex min-h-[44px] flex-col rounded-lg border border-line p-5 hover:border-red">
            <span class="font-display text-2xl font-semibold text-navy">{{ link.label }}</span>
            <span class="mt-1 text-ink-muted">{{ link.note }}</span>
          </NuxtLink>
        </li>
      </ul>
      <NuxtLink to="/" class="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-md bg-red px-8 font-display text-xl font-semibold text-white press hover:bg-red-dark">Go to the home page</NuxtLink>
    </section>
  </NuxtLayout>
</template>
