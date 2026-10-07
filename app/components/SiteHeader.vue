<script setup lang="ts">
const NAV = [
  { to: '/courses', label: 'Courses' },
  { to: '/fleet', label: 'Fleet' },
  { to: '/students', label: 'Students' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const

const route = useRoute()
// The contact page already shows the form, so the header drops its inquiry button there.
const onContact = computed(() => route.path.replace(/\/$/, '') === '/contact')

const open = ref(false)
const scrolled = ref(false)
const toggle = ref<HTMLButtonElement | null>(null)
const panel = ref<HTMLElement | null>(null)

watch(open, async (isOpen) => {
  document.body.classList.toggle('overflow-hidden', isOpen)
  if (isOpen) {
    await nextTick()
    panel.value?.querySelector('a')?.focus()
  }
})
watch(() => route.fullPath, () => { open.value = false })

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) {
    open.value = false
    toggle.value?.focus()
  }
}
const onScroll = () => { scrolled.value = window.scrollY > 8 }
const onWide = (e: MediaQueryListEvent) => { if (e.matches) open.value = false }
let wide: MediaQueryList | undefined

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('keydown', onKeydown)
  wide = window.matchMedia('(min-width: 1024px)')
  wide.addEventListener('change', onWide)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('keydown', onKeydown)
  wide?.removeEventListener('change', onWide)
  document.body.classList.remove('overflow-hidden')
})
</script>

<template>
  <header class="site-header sticky top-0 z-40 bg-white transition-shadow" :data-scrolled="String(scrolled)">
    <div class="mx-auto flex h-20 max-w-site items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
      <NuxtLink to="/" class="shrink-0" aria-label="Masters Flying School home">
        <img src="/img/logo.jpg" alt="Masters Flying School" width="179" height="91" class="h-12 w-auto sm:h-14">
      </NuxtLink>
      <nav aria-label="Main" class="hidden lg:block">
        <ul class="flex items-center gap-1 font-display text-lg font-semibold text-navy">
          <li v-for="item in NAV" :key="item.to">
            <NuxtLink :to="item.to" class="inline-flex min-h-[44px] items-center rounded px-3 hover:text-red aria-[current=page]:text-red aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[10px]">{{ item.label }}</NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="flex items-center gap-2">
        <a href="tel:+6328517042" class="hidden min-h-[44px] items-center rounded px-3 text-sm font-semibold text-navy hover:text-red xl:inline-flex tabular">(02) 851-7042</a>
        <NuxtLink v-if="!onContact" to="/contact#inquiry" class="hidden min-h-[44px] items-center rounded-md bg-red px-5 font-display text-lg font-semibold text-white transition-colors hover:bg-red-dark sm:inline-flex">Send an inquiry</NuxtLink>
        <button ref="toggle" type="button" aria-controls="mobile-menu" :aria-expanded="String(open)" :aria-label="open ? 'Close menu' : 'Open menu'" class="inline-flex h-11 w-11 items-center justify-center rounded-md text-navy hover:bg-apron lg:hidden" @click="open = !open">
          <svg :class="{ hidden: open }" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" /></svg>
          <svg :class="{ hidden: !open }" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6L19 6.4 17.6 5 12 10.6z" /></svg>
        </button>
      </div>
    </div>
    <div id="mobile-menu" ref="panel" :hidden="!open" class="border-t border-line bg-white lg:hidden">
      <nav aria-label="Mobile" class="mx-auto max-w-site px-4 pb-6 pt-2 sm:px-6">
        <ul class="divide-y divide-line font-display text-2xl font-semibold text-navy">
          <li v-for="item in NAV" :key="item.to">
            <NuxtLink :to="item.to" class="flex min-h-[52px] items-center aria-[current=page]:text-red" @click="open = false">{{ item.label }}</NuxtLink>
          </li>
        </ul>
        <div :class="onContact ? 'mt-4' : 'mt-4 grid gap-3 sm:grid-cols-2'">
          <NuxtLink v-if="!onContact" to="/contact#inquiry" class="flex min-h-[48px] items-center justify-center rounded-md bg-red font-display text-lg font-semibold text-white" @click="open = false">Send an inquiry</NuxtLink>
          <a href="tel:+6328517042" class="flex min-h-[48px] items-center justify-center rounded-md border border-navy font-semibold text-navy tabular">Call (02) 851-7042</a>
        </div>
      </nav>
    </div>
  </header>
</template>
