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
const header = ref<HTMLElement | null>(null)

// While the menu is open, everything outside the header is inert, so Tab and screen readers stay in
// the menu instead of wandering into the page that scrolling is locked on.
function setPageInert(on: boolean) {
  for (const el of header.value?.parentElement?.children ?? []) {
    if (el !== header.value) (el as HTMLElement).inert = on
  }
}

watch(open, async (isOpen) => {
  document.body.classList.toggle('overflow-hidden', isOpen)
  setPageInert(isOpen)
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
  setPageInert(false)
})
</script>

<template>
  <header ref="header" class="site-header sticky top-0 z-40 bg-white transition-shadow" :data-scrolled="String(scrolled)">
    <div :hidden="!open" class="menu-backdrop fixed inset-x-0 bottom-0 top-20 bg-navy/40 lg:hidden" aria-hidden="true" @click="open = false"></div>
    <div class="relative mx-auto flex h-20 max-w-site items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
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
      <!-- Phone and inquiry stay in the sticky header at every width, so a phone visitor is never more than a tap from the school. -->
      <div class="flex items-center gap-1.5 sm:gap-2">
        <a href="tel:+6328517042" aria-label="Call the Pasay office, (02) 851-7042" class="hidden h-11 w-11 items-center justify-center rounded-md text-navy hover:bg-apron hover:text-red min-[360px]:inline-flex xl:hidden">
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" /></svg>
        </a>
        <a href="tel:+6328517042" class="hidden min-h-[44px] items-center rounded px-3 text-sm font-semibold text-navy hover:text-red xl:inline-flex tabular">(02) 851-7042</a>
        <NuxtLink v-if="!onContact" to="/contact#inquiry" class="inline-flex min-h-[44px] items-center rounded-md bg-red px-4 font-display text-lg font-semibold text-white press hover:bg-red-dark sm:px-5"><span class="sm:hidden">Inquire</span><span class="hidden sm:inline">Send an inquiry</span></NuxtLink>
        <button ref="toggle" type="button" aria-controls="mobile-menu" :aria-expanded="String(open)" :aria-label="open ? 'Close menu' : 'Open menu'" class="inline-flex h-11 w-11 items-center justify-center rounded-md text-navy hover:bg-apron lg:hidden" @click="open = !open">
          <svg :class="{ hidden: open }" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" /></svg>
          <svg :class="{ hidden: !open }" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6L19 6.4 17.6 5 12 10.6z" /></svg>
        </button>
      </div>
    </div>
    <div id="mobile-menu" ref="panel" :hidden="!open" class="menu-panel relative border-t border-line bg-white lg:hidden">
      <nav aria-label="Mobile" class="mx-auto max-w-site px-4 pb-6 pt-2 sm:px-6">
        <ul class="divide-y divide-line font-display text-2xl font-semibold text-navy">
          <li v-for="item in NAV" :key="item.to">
            <NuxtLink :to="item.to" class="flex min-h-[52px] items-center aria-[current=page]:text-red" @click="open = false">{{ item.label }}</NuxtLink>
          </li>
        </ul>
        <div :class="onContact ? 'mt-4' : 'mt-4 grid gap-3 sm:grid-cols-2'">
          <NuxtLink v-if="!onContact" to="/contact#inquiry" class="press flex min-h-[48px] items-center justify-center rounded-md bg-red font-display text-lg font-semibold text-white" @click="open = false">Send an inquiry</NuxtLink>
          <a href="tel:+6328517042" class="press flex min-h-[48px] items-center justify-center rounded-md border border-navy font-semibold text-navy tabular">Call (02) 851-7042</a>
        </div>
      </nav>
    </div>
  </header>
</template>
