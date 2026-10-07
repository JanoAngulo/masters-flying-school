<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="on-dark bg-tarmac text-white">
    <div class="threshold-thin" aria-hidden="true" />
    <div class="mx-auto max-w-site px-4 py-14 sm:px-6 lg:px-8">
      <div class="grid gap-10 lg:grid-cols-12">
        <p class="font-display text-3xl font-semibold leading-tight lg:col-span-5">Fly and you will catch the wind; dream and you shall reach your goal.</p>
        <div class="grid gap-8 sm:grid-cols-2 lg:col-span-7">
          <address class="not-italic">
            <p class="font-semibold">Main office</p>
            <p class="mt-1 text-navy-300">2317 Nissan Car Lease Bldg., Aurora Blvd., Pasay City, Metro Manila</p>
            <a href="tel:+6328517042" class="mt-2 inline-flex min-h-[44px] items-center text-white hover:underline tabular">(02) 851-7042</a>
          </address>
          <address class="not-italic">
            <p class="font-semibold">Hangar</p>
            <p class="mt-1 text-navy-300">Plaridel Airport, Plaridel, Bulacan</p>
            <a href="tel:+63447942865" class="mt-2 inline-flex min-h-[44px] items-center text-white hover:underline tabular">(044) 794-2865</a>
          </address>
        </div>
      </div>
      <div class="mt-12 flex flex-col gap-6 border-t border-white/15 pt-8 lg:flex-row lg:items-center lg:justify-between">
        <nav aria-label="Footer">
          <!-- Short labels get a 44px tap width; the gap is trimmed by the same amount so the row wraps as it did before. -->
          <ul class="flex flex-wrap gap-x-[22px] gap-y-1">
            <li><NuxtLink to="/courses" class="inline-flex min-h-[44px] min-w-[44px] items-center justify-center hover:underline">Courses</NuxtLink></li>
            <li><NuxtLink to="/fleet" class="inline-flex min-h-[44px] min-w-[44px] items-center justify-center hover:underline">Fleet</NuxtLink></li>
            <li><NuxtLink to="/students" class="inline-flex min-h-[44px] min-w-[44px] items-center justify-center hover:underline">Students</NuxtLink></li>
            <li><NuxtLink to="/about" class="inline-flex min-h-[44px] min-w-[44px] items-center justify-center hover:underline">About</NuxtLink></li>
            <li><NuxtLink to="/contact" class="inline-flex min-h-[44px] min-w-[44px] items-center justify-center hover:underline">Contact</NuxtLink></li>
            <li><a href="mailto:info@mastersflyingschool.com" class="inline-flex min-h-[44px] items-center hover:underline">info@mastersflyingschool.com</a></li>
            <li><a href="https://www.facebook.com/pages/Masters-Flying-School/154831617913387" rel="noopener" target="_blank" class="inline-flex min-h-[44px] items-center hover:underline">Facebook</a></li>
          </ul>
        </nav>
        <p class="text-sm text-navy-300">© {{ year }} Masters Flying School. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
