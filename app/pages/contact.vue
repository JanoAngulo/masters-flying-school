<script setup lang="ts">
useSiteMeta({
  title: "Contact | Masters Flying School",
  description: "Contact Masters Flying School. Main office in Pasay City, hangar at Plaridel Airport, Bulacan. Phone, email, maps and an inquiry form.",
  image: { src: '/img/og/contact.jpg', alt: 'The Masters Flying School main office storefront in Pasay City' },
})
const viaWeb3Forms = !!useRuntimeConfig().public.web3formsKey
const intro = useIntro()
const root = ref<HTMLElement | null>(null)
usePageEnhancements(root)
</script>

<template>
  <div ref="root" class="contents">
    <section class="on-dark bg-navy text-white" :class="{ intro }">
      <div class="mx-auto max-w-site px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <h1 class="font-display text-5xl font-bold leading-none sm:text-6xl">Contact us</h1>
        <p class="mt-5 max-w-2xl text-lg text-navy-300">Call, email, or send the form below. For enrollment and documents, start with the Pasay office. To see the aircraft, visit the hangar.</p>
        <dl class="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-12">
          <div><dt class="text-sm text-navy-300">Email</dt><dd><a href="mailto:info@mastersflyingschool.com" class="inline-flex min-h-[44px] items-center font-display text-2xl font-semibold hover:underline">info@mastersflyingschool.com</a></dd></div>
          <div><dt class="text-sm text-navy-300">Mobile</dt><dd><a href="tel:+639178691974" class="inline-flex min-h-[44px] items-center font-display text-2xl font-semibold hover:underline tabular">+63 917 869 1974</a></dd></div>
        </dl>
      </div>
      <div class="threshold-thin" aria-hidden="true"></div>
    </section>

    <!-- Locations -->
    <section aria-labelledby="loc-title" class="mx-auto max-w-site px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <h2 id="loc-title" class="sr-only">Locations</h2>
      <div class="grid gap-12 lg:grid-cols-2">
        <article id="pasay" aria-labelledby="pasay-title" class="scroll-mt-28">
          <h3 id="pasay-title" class="font-display text-3xl font-bold text-navy">Pasay main office</h3>
          <p class="mt-2 text-ink-muted">2317 Nissan Car Lease Bldg., Aurora Blvd., Pasay City, Metro Manila</p>
          <p class="mt-3"><a href="tel:+6328517042" class="inline-flex min-h-[44px] items-center font-semibold text-navy hover:text-red tabular">Telefax (02) 851-7042</a></p>
          <div class="mt-4 overflow-hidden rounded-lg border border-line bg-apron">
            <iframe title="Map of the Masters Flying School Pasay office" src="https://maps.google.com/maps?q=14.529044,121.004663&amp;z=16&amp;output=embed" class="aspect-[4/3] w-full" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <a href="https://www.google.com/maps/search/?api=1&amp;query=14.529044,121.004663" target="_blank" rel="noopener" class="mt-3 inline-flex min-h-[44px] items-center font-semibold text-red underline decoration-2 underline-offset-4 hover:text-red-dark">Open in Google Maps</a>
        </article>
        <article id="plaridel" aria-labelledby="plaridel-title" class="scroll-mt-28">
          <h3 id="plaridel-title" class="font-display text-3xl font-bold text-navy">Plaridel hangar</h3>
          <p class="mt-2 text-ink-muted">Masters Flying School Hangar, Plaridel Airport, Plaridel, Bulacan</p>
          <p class="mt-3"><a href="tel:+63447942865" class="inline-flex min-h-[44px] items-center font-semibold text-navy hover:text-red tabular">(044) 794-2865</a></p>
          <div class="mt-4 overflow-hidden rounded-lg border border-line bg-apron">
            <iframe title="Map of Plaridel Airport, Bulacan" src="https://maps.google.com/maps?q=14.891871,120.853987&amp;z=15&amp;output=embed" class="aspect-[4/3] w-full" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <a href="https://www.google.com/maps/search/?api=1&amp;query=14.891871,120.853987" target="_blank" rel="noopener" class="mt-3 inline-flex min-h-[44px] items-center font-semibold text-red underline decoration-2 underline-offset-4 hover:text-red-dark">Open in Google Maps</a>
        </article>
      </div>
    </section>

    <!-- Inquiry form -->
    <section id="inquiry" aria-labelledby="inquiry-title" class="scroll-mt-24 bg-apron">
      <div class="mx-auto grid max-w-site gap-8 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-16">
        <div class="lg:col-span-4">
          <h2 id="inquiry-title" class="font-display text-4xl font-bold leading-none text-navy sm:text-5xl">Send an inquiry</h2>
          <p v-if="viaWeb3Forms" class="mt-4 text-ink-muted">Your message comes straight to our inbox, and we reply to the email address you give.</p>
          <p v-else class="mt-4 text-ink-muted">Sending opens your email app with the message ready, addressed to info@mastersflyingschool.com.</p>

          <h3 class="mt-8 font-display text-xl font-semibold text-navy">Helpful to mention</h3>
          <ul class="mt-3 space-y-3 text-ink">
            <li class="flex gap-3"><svg class="mt-1 shrink-0 text-red" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>Licenses or ratings you already hold</li>
            <li class="flex gap-3"><svg class="mt-1 shrink-0 text-red" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>Whether you have your third-class medical yet</li>
            <li class="flex gap-3"><svg class="mt-1 shrink-0 text-red" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>When you would like to start</li>
            <li class="flex gap-3"><svg class="mt-1 shrink-0 text-red" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>Your nationality, if you need a visa</li>
            <li class="flex gap-3"><svg class="mt-1 shrink-0 text-red" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>If you need lodging near the airport</li>
          </ul>

          <div class="mt-8 rounded-lg border border-line bg-white p-5">
            <p class="font-display text-xl font-semibold text-navy">Rather talk to someone?</p>
            <dl class="mt-3 divide-y divide-line text-sm">
              <div class="flex items-center justify-between gap-4 py-1"><dt class="text-ink-muted">Pasay office</dt><dd><a href="tel:+6328517042" class="inline-flex min-h-[44px] items-center font-semibold text-navy hover:text-red tabular">(02) 851-7042</a></dd></div>
              <div class="flex items-center justify-between gap-4 py-1"><dt class="text-ink-muted">Plaridel hangar</dt><dd><a href="tel:+63447942865" class="inline-flex min-h-[44px] items-center font-semibold text-navy hover:text-red tabular">(044) 794-2865</a></dd></div>
              <div class="flex items-center justify-between gap-4 py-1"><dt class="text-ink-muted">Mobile</dt><dd><a href="tel:+639178691974" class="inline-flex min-h-[44px] items-center font-semibold text-navy hover:text-red tabular">+63 917 869 1974</a></dd></div>
            </dl>
          </div>
        </div>

        <InquiryForm />
      </div>
    </section>
  </div>
</template>
