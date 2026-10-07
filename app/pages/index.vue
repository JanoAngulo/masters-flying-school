<script setup lang="ts">
useSiteMeta({
  title: "Masters Flying School | Pilot training at Plaridel Airport, Bulacan",
  description: "CAAP-certified airplane and helicopter pilot training since 1994. Ground school in Pasay City, flight training at Plaridel Airport, Bulacan.",
})
const root = ref<HTMLElement | null>(null)
usePageEnhancements(root)
</script>

<template>
  <div ref="root" class="contents">
    <!-- Hero -->
    <section aria-labelledby="hero-title" class="relative bg-white">
      <div class="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        <div class="order-2 px-4 pb-14 pt-10 sm:px-6 lg:order-1 lg:self-center lg:py-24 lg:pl-[max(2rem,calc((100vw-76rem)/2+2rem))] lg:pr-12">
          <h1 id="hero-title" class="font-display text-5xl font-bold leading-[.95] text-navy sm:text-6xl xl:text-7xl">Learn to fly at Plaridel.</h1>
          <p class="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">Airplane and helicopter pilot courses, certified by the Civil Aviation Authority of the Philippines since 1994. Ground school in Pasay City, flight training at Plaridel Airport in Bulacan, the training airfield closest to Metro Manila.</p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <NuxtLink to="/courses" class="inline-flex min-h-[48px] items-center justify-center rounded-md bg-red px-6 font-display text-xl font-semibold text-white transition-colors hover:bg-red-dark">Compare the courses</NuxtLink>
            <NuxtLink to="/contact#inquiry" class="inline-flex min-h-[48px] items-center justify-center rounded-md border-2 border-navy px-6 font-display text-xl font-semibold text-navy transition-colors hover:bg-navy hover:text-white">Ask about enrollment</NuxtLink>
          </div>
        </div>
        <div class="relative order-1 aspect-[4/3] overflow-hidden lg:order-2 lg:aspect-auto lg:min-h-[600px]">
          <img src="/img/hero-cessna-line.webp" width="930" height="624" alt="Two Masters Flying School Cessnas in red and white livery parked on the Plaridel flight line" class="hero-photo absolute inset-0 h-full w-full object-cover" fetchpriority="high">
        </div>
      </div>

      <!-- Runway band: the identity motif -->
      <div class="on-dark bg-tarmac text-white">
        <div class="mx-auto flex max-w-site flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:gap-10 lg:px-8">
          <div class="flex items-center gap-5" aria-hidden="true">
            <div class="threshold h-16 w-36 sm:h-20 sm:w-52"></div>
            <span class="designator text-7xl sm:text-8xl">17</span>
          </div>
          <dl class="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4 md:ml-auto">
            <div><dt class="text-sm text-navy-300">Airfield</dt><dd class="font-display text-2xl font-semibold">Plaridel, RPUX</dd></div>
            <div><dt class="text-sm text-navy-300">Runway</dt><dd class="font-display text-2xl font-semibold tabular">17 / 35</dd></div>
            <div><dt class="text-sm text-navy-300">Length by width</dt><dd class="font-display text-2xl font-semibold tabular">900 × 30 m</dd></div>
            <div><dt class="text-sm text-navy-300">Training pilots since</dt><dd class="font-display text-2xl font-semibold tabular">1935</dd></div>
          </dl>
        </div>
      </div>
    </section>

    <!-- Credentials -->
    <section aria-labelledby="cred-title" class="mx-auto max-w-site px-4 py-16 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-24">
      <div class="lg:col-span-4">
        <h2 id="cred-title" class="font-display text-4xl font-bold leading-none text-navy sm:text-5xl">Certified to train you, and the people who check.</h2>
        <p class="mt-5 text-ink-muted">Masters Flying School was founded in 1994. These registrations are on file with the agencies below. Scans of each certificate are on the About page.</p>
        <NuxtLink to="/about#accreditation" class="mt-6 inline-flex min-h-[44px] items-center font-semibold text-red underline decoration-2 underline-offset-4 hover:text-red-dark">See certificates and accreditation</NuxtLink>
      </div>
      <dl class="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8 lg:mt-0">
        <div class="border-t-2 border-navy pt-4">
          <dt class="font-display text-2xl font-semibold text-navy">Civil Aviation Authority of the Philippines</dt>
          <dd class="mt-1 text-ink-muted">Air training organization, ATOC Certificate No. 94-02. Fixed-wing and helicopter simulators are CAAP certified.</dd>
        </div>
        <div class="border-t-2 border-navy pt-4">
          <dt class="font-display text-2xl font-semibold text-navy">Philippine Air Force Air Reserve Command</dt>
          <dd class="mt-1 text-ink-muted">Affiliated with PAF-ARCEN and designated the 2201st Reserve Pilot Training Squadron.</dd>
        </div>
        <div class="border-t-2 border-line pt-4">
          <dt class="font-display text-2xl font-semibold text-navy">TESDA</dt>
          <dd class="mt-1 text-ink-muted">Registered with the Technical Education and Skills Development Authority, RCGN V-0023.</dd>
        </div>
        <div class="border-t-2 border-line pt-4">
          <dt class="font-display text-2xl font-semibold text-navy">Bureau of Immigration</dt>
          <dd class="mt-1 text-ink-muted">Authorized to accept foreign students, AAFS RBR No. 2000.</dd>
        </div>
      </dl>
    </section>

    <!-- Training path: a real sequence, so it is numbered -->
    <section aria-labelledby="path-title" class="bg-apron py-16 lg:py-24">
      <div class="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div class="max-w-2xl">
          <h2 id="path-title" class="font-display text-4xl font-bold leading-none text-navy sm:text-5xl">From your medical exam to a commercial license</h2>
          <p class="mt-4 text-lg text-ink-muted">Every step below is set by CAAP. Hours shown are the CAAP minimums; most students fly more.</p>
        </div>

        <div class="relative mt-12">
        <div class="route-track absolute left-0 right-0 top-[17px] hidden lg:block" aria-hidden="true"></div>
        <div class="route-track-v absolute bottom-0 left-[17px] top-0 lg:hidden" aria-hidden="true"></div>
        <ol class="relative grid gap-10 lg:grid-cols-7 lg:gap-4">

          <li class="relative pl-14 lg:pl-0 lg:pt-14">
            <span class="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full bg-navy font-display text-lg font-bold text-white">1</span>
            <h3 class="font-display text-xl font-semibold leading-tight text-navy">Student pilot authority</h3>
            <p class="mt-2 text-[15px] leading-relaxed text-ink-muted">Third-class medical certificate and NBI clearance, filed with CAAP.</p>
          </li>
          <li class="relative pl-14 lg:pl-0 lg:pt-14">
            <span class="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full bg-navy font-display text-lg font-bold text-white">2</span>
            <h3 class="font-display text-xl font-semibold leading-tight text-navy">Ground school</h3>
            <p class="mt-2 text-[15px] leading-relaxed text-ink-muted">Nine subjects, air law to principles of flight, in Pasay or at the hangar.</p>
          </li>
          <li class="relative pl-14 lg:pl-0 lg:pt-14">
            <span class="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full bg-red font-display text-lg font-bold text-white">3</span>
            <h3 class="font-display text-xl font-semibold leading-tight text-navy">First solo</h3>
            <p class="mt-2 text-[15px] leading-relaxed text-ink-muted">After the pre-solo exam and at least 8 flying hours. Ends with a bucket of water.</p>
          </li>
          <li class="relative pl-14 lg:pl-0 lg:pt-14">
            <span class="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full bg-navy font-display text-lg font-bold text-white">4</span>
            <h3 class="font-display text-xl font-semibold leading-tight text-navy">Private pilot license</h3>
            <p class="mt-2 text-[15px] leading-relaxed text-ink-muted"><span class="tabular">40</span> hours total, 20 dual and 20 solo, then CAAP written and practical tests.</p>
          </li>
          <li class="relative pl-14 lg:pl-0 lg:pt-14">
            <span class="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full bg-navy font-display text-lg font-bold text-white">5</span>
            <h3 class="font-display text-xl font-semibold leading-tight text-navy">Commercial pilot license</h3>
            <p class="mt-2 text-[15px] leading-relaxed text-ink-muted"><span class="tabular">150</span> hours, a higher-horsepower rating and a CAAP checkride.</p>
          </li>
          <li class="relative pl-14 lg:pl-0 lg:pt-14">
            <span class="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full bg-navy font-display text-lg font-bold text-white">6</span>
            <h3 class="font-display text-xl font-semibold leading-tight text-navy">Instrument rating</h3>
            <p class="mt-2 text-[15px] leading-relaxed text-ink-muted">Instrument ground school and at least 20 simulator hours.</p>
          </li>
          <li class="relative pl-14 lg:pl-0 lg:pt-14">
            <span class="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full bg-navy font-display text-lg font-bold text-white">7</span>
            <h3 class="font-display text-xl font-semibold leading-tight text-navy">Add-on ratings</h3>
            <p class="mt-2 text-[15px] leading-relaxed text-ink-muted">Multi-engine on the Piper Aztec, then flight instructor.</p>
          </li>
        </ol>
        </div>
      </div>
    </section>

    <!-- Courses -->
    <section aria-labelledby="courses-title" class="mx-auto max-w-site px-4 py-16 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-24">
      <figure class="relative hidden overflow-hidden rounded-lg lg:col-span-5 lg:block">
        <img src="/img/student-cockpit.webp" width="930" height="624" loading="lazy" alt="A Masters student pilot with headset at the controls" class="h-full w-full object-cover">
      </figure>
      <div class="lg:col-span-7">
        <h2 id="courses-title" class="font-display text-4xl font-bold leading-none text-navy sm:text-5xl">Seven courses, two kinds of aircraft</h2>
        <p class="mt-4 max-w-xl text-lg text-ink-muted">Start with a private license on airplanes or helicopters. Add ratings when you are ready to fly for a living.</p>

        <div class="mt-10 grid gap-10 sm:grid-cols-2">
          <div>
            <h3 class="font-display text-2xl font-semibold text-red">Airplane</h3>
            <ul class="mt-3 divide-y divide-line border-y border-line">
              <li><NuxtLink to="/courses#ppl" class="flex min-h-[52px] items-center justify-between gap-4 py-3 font-semibold text-navy hover:text-red">Private pilot ground and flight<span class="text-sm font-normal text-ink-muted">Start here</span></NuxtLink></li>
              <li><NuxtLink to="/courses#cpl" class="flex min-h-[52px] items-center justify-between gap-4 py-3 font-semibold text-navy hover:text-red">Commercial pilot ground and flight<span class="text-sm font-normal text-ink-muted">Needs PPL</span></NuxtLink></li>
            </ul>
          </div>
          <div>
            <h3 class="font-display text-2xl font-semibold text-red">Helicopter</h3>
            <ul class="mt-3 divide-y divide-line border-y border-line">
              <li><NuxtLink to="/courses#phpl" class="flex min-h-[52px] items-center justify-between gap-4 py-3 font-semibold text-navy hover:text-red">Private helicopter pilot<span class="text-sm font-normal text-ink-muted">Start here</span></NuxtLink></li>
              <li><NuxtLink to="/courses#chpl" class="flex min-h-[52px] items-center justify-between gap-4 py-3 font-semibold text-navy hover:text-red">Commercial helicopter pilot<span class="text-sm font-normal text-ink-muted">Needs PHPL</span></NuxtLink></li>
            </ul>
          </div>
          <div class="sm:col-span-2">
            <h3 class="font-display text-2xl font-semibold text-red">Ratings for licensed pilots</h3>
            <ul class="mt-3 grid divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <li><NuxtLink to="/courses#instrument" class="flex min-h-[52px] items-center py-3 font-semibold text-navy hover:text-red sm:px-4 sm:first:pl-0">Instrument rating</NuxtLink></li>
              <li><NuxtLink to="/courses#multi-engine" class="flex min-h-[52px] items-center py-3 font-semibold text-navy hover:text-red sm:px-4">Multi-engine</NuxtLink></li>
              <li><NuxtLink to="/courses#instructor" class="flex min-h-[52px] items-center py-3 font-semibold text-navy hover:text-red sm:px-4">Flight instructor (CFI, CFII)</NuxtLink></li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Plaridel -->
    <section aria-labelledby="plaridel-title" class="on-dark bg-navy text-white">
      <div class="grid lg:grid-cols-2">
        <div class="relative aspect-[3/2] lg:aspect-auto">
          <img src="/img/flightline-dusk.webp" width="930" height="624" loading="lazy" alt="Masters Cessnas lined up on the Plaridel apron at dusk" class="absolute inset-0 h-full w-full object-cover">
        </div>
        <div class="px-4 py-16 sm:px-6 lg:px-16 lg:py-24">
          <h2 id="plaridel-title" class="font-display text-4xl font-bold leading-none sm:text-5xl">Your classroom has a control tower</h2>
          <p class="mt-6 max-w-lg text-lg leading-relaxed text-navy-300">Plaridel Airport opened in 1935 and trained fighter pilots during the Second World War. Today it is the only airport in Bulacan and is dedicated mainly to flight training. CAAP staffs the tower during operating hours, so you practice radio calls with a staffed tower from your first lessons.</p>
          <p class="mt-4 max-w-lg text-lg leading-relaxed text-navy-300">Our hangar sits on the field with a classroom and briefing room, and student lodging is in the immediate vicinity of the airport.</p>
          <div class="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <NuxtLink to="/about#facilities" class="inline-flex min-h-[44px] items-center font-semibold text-white underline decoration-red decoration-2 underline-offset-4 hover:decoration-white">Tour the facilities</NuxtLink>
            <NuxtLink to="/contact#plaridel" class="inline-flex min-h-[44px] items-center font-semibold text-white underline decoration-red decoration-2 underline-offset-4 hover:decoration-white">Directions to the hangar</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Fleet: six peers of the same kind, so an even grid is the honest layout -->
    <section aria-labelledby="fleet-title" class="mx-auto max-w-site px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 id="fleet-title" class="font-display text-4xl font-bold leading-none text-navy sm:text-5xl">The fleet you will fly</h2>
          <p class="mt-4 max-w-xl text-lg text-ink-muted">Registered, airworthy and maintained in-house by our CAAP-approved maintenance organization, AMO No. 113-12.</p>
        </div>
        <NuxtLink to="/fleet" class="inline-flex min-h-[44px] shrink-0 items-center font-semibold text-red underline decoration-2 underline-offset-4 hover:text-red-dark">Specifications for every aircraft</NuxtLink>
      </div>
      <ul class="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        <li>
          <NuxtLink to="/fleet#cessna-150" class="group block">
            <div class="overflow-hidden rounded-lg"><img src="/img/fleet-cessna-150.webp" width="930" height="624" loading="lazy" alt="Cessna 150 RP-C1330 on the apron" class="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"></div>
            <h3 class="mt-4 font-display text-2xl font-semibold text-navy group-hover:text-red">Cessna 150</h3>
            <p class="text-ink-muted">Basic trainer for first lessons and first solo</p>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/fleet#cessna-152" class="group block">
            <div class="overflow-hidden rounded-lg"><img src="/img/fleet-cessna-152.webp" width="930" height="624" loading="lazy" alt="Cessna 152 RP-C2683 climbing out over Plaridel" class="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"></div>
            <h3 class="mt-4 font-display text-2xl font-semibold text-navy group-hover:text-red">Cessna 152</h3>
            <p class="text-ink-muted">Primary trainer for private pilot training</p>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/fleet#cessna-172" class="group block">
            <div class="overflow-hidden rounded-lg"><img src="/img/fleet-cessna-172.webp" width="930" height="624" loading="lazy" alt="Cessna 172 on the Plaridel apron" class="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"></div>
            <h3 class="mt-4 font-display text-2xl font-semibold text-navy group-hover:text-red">Cessna 172</h3>
            <p class="text-ink-muted">Higher-horsepower rating for commercial students</p>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/fleet#piper-aztec" class="group block">
            <div class="overflow-hidden rounded-lg"><img src="/img/fleet-piper-aztec.webp" width="930" height="624" loading="lazy" alt="Piper Aztec twin on the grass beside the runway" class="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"></div>
            <h3 class="mt-4 font-display text-2xl font-semibold text-navy group-hover:text-red">Piper Aztec</h3>
            <p class="text-ink-muted">Twin-engine aircraft for the multi-engine rating</p>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/fleet#schweizer-269" class="group block">
            <div class="overflow-hidden rounded-lg"><img src="/img/fleet-schweizer-269.webp" width="930" height="624" loading="lazy" alt="Masters Schweizer training helicopter on the pad" class="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"></div>
            <h3 class="mt-4 font-display text-2xl font-semibold text-navy group-hover:text-red">Schweizer 269</h3>
            <p class="text-ink-muted">Light trainer helicopter</p>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/fleet#schweizer-300cb" class="group block">
            <div class="overflow-hidden rounded-lg"><img src="/img/fleet-schweizer-300cb.webp" width="930" height="624" loading="lazy" alt="Schweizer 300CB helicopter with a student in the cockpit" class="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"></div>
            <h3 class="mt-4 font-display text-2xl font-semibold text-navy group-hover:text-red">Schweizer 300 CB</h3>
            <p class="text-ink-muted">Light trainer helicopter</p>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <!-- First solo -->
    <section aria-labelledby="solo-title" class="bg-apron">
      <div class="mx-auto grid max-w-site items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24">
        <div class="lg:col-span-5">
          <h2 id="solo-title" class="font-display text-4xl font-bold leading-none text-navy sm:text-5xl">The day you fly alone</h2>
          <p class="mt-6 text-lg leading-relaxed text-ink-muted">Your first solo is the flight every student works toward. When you climb out of the aircraft, your batchmates meet you with a bucket of water in front of the plane you just flew. In our instructors' experience, that new confidence carries students through the rest of their license, and they push on to it sooner.</p>
          <blockquote class="mt-8 border-t-2 border-red pt-4">
            <p class="font-display text-2xl font-semibold leading-snug text-navy">“Another eagle is born and is set conquering the sky.”</p>
            <footer class="mt-2 text-sm text-ink-muted">From the school's student life guide</footer>
          </blockquote>
          <NuxtLink to="/students#student-life" class="mt-8 inline-flex min-h-[44px] items-center font-semibold text-red underline decoration-2 underline-offset-4 hover:text-red-dark">Read about student life</NuxtLink>
        </div>
        <figure class="lg:col-span-7">
          <img src="/img/crew-runway.webp" width="930" height="624" loading="lazy" alt="Masters students in red flight suits standing on runway 17 at Plaridel in front of a Cessna" class="w-full rounded-lg object-cover">
        </figure>
      </div>
    </section>

    <!-- Alumni: counts come from the names on the school's alumni roll. One series, so one color; numbers are printed, bars only show proportion. -->
    <section aria-labelledby="alumni-title" class="mx-auto max-w-site px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div class="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div class="lg:col-span-5">
          <h2 id="alumni-title" class="font-display text-4xl font-bold leading-none text-navy sm:text-5xl">Where our graduates fly</h2>
          <p class="mt-5 text-lg leading-relaxed text-ink-muted">Captains on our alumni roll, counted by the airline listed beside their name. Several batches of the Philippine Army Aviation Battalion also trained here, and graduates have come from Saudi Arabia, Nepal, Bangladesh and India.</p>
          <p class="mt-4 text-sm text-ink-muted">Some airlines have since merged or rebranded. We list them as our graduates joined them.</p>
          <figure class="mt-8 hidden overflow-hidden rounded-lg lg:block">
            <img src="/img/class-runway-17.webp" width="930" height="624" loading="lazy" alt="Masters students and instructors on the runway 17 threshold at Plaridel" class="aspect-[16/10] w-full object-cover">
          </figure>
        </div>
        <div class="lg:col-span-7">
          <h3 class="font-display text-xl font-semibold text-ink-muted">Graduates by airline</h3>
          <ol class="mt-2 divide-y divide-line border-y border-line">
            <li class="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-2 py-3">
              <span class="font-display text-xl font-semibold text-navy sm:text-2xl">Cebu Pacific</span>
              <span class="text-sm text-ink-muted tabular"><span class="font-display text-2xl font-bold text-navy">10</span> graduates</span>
              <span class="col-span-2 block h-2 rounded-full bg-apron" aria-hidden="true"><span class="block h-2 rounded-full bg-navy" style="width:100%"></span></span>
            </li>
            <li class="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-2 py-3">
              <span class="font-display text-xl font-semibold text-navy sm:text-2xl">PAL Express</span>
              <span class="text-sm text-ink-muted tabular"><span class="font-display text-2xl font-bold text-navy">10</span> graduates</span>
              <span class="col-span-2 block h-2 rounded-full bg-apron" aria-hidden="true"><span class="block h-2 rounded-full bg-navy" style="width:100%"></span></span>
            </li>
            <li class="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-2 py-3">
              <span class="font-display text-xl font-semibold text-navy sm:text-2xl">AirAsia and AirAsia Zest</span>
              <span class="text-sm text-ink-muted tabular"><span class="font-display text-2xl font-bold text-navy">5</span> graduates</span>
              <span class="col-span-2 block h-2 rounded-full bg-apron" aria-hidden="true"><span class="block h-2 rounded-full bg-navy" style="width:50%"></span></span>
            </li>
            <li class="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-2 py-3">
              <span class="font-display text-xl font-semibold text-navy sm:text-2xl">SEAIR</span>
              <span class="text-sm text-ink-muted tabular"><span class="font-display text-2xl font-bold text-navy">3</span> graduates</span>
              <span class="col-span-2 block h-2 rounded-full bg-apron" aria-hidden="true"><span class="block h-2 rounded-full bg-navy" style="width:30%"></span></span>
            </li>
            <li class="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-2 py-3">
              <span class="font-display text-xl font-semibold text-navy sm:text-2xl">Philippine Airlines</span>
              <span class="text-sm text-ink-muted tabular"><span class="font-display text-2xl font-bold text-navy">2</span> graduates</span>
              <span class="col-span-2 block h-2 rounded-full bg-apron" aria-hidden="true"><span class="block h-2 rounded-full bg-navy" style="width:20%"></span></span>
            </li>
            <li class="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-2 py-3">
              <span class="font-display text-xl font-semibold text-navy sm:text-2xl">Airphil Express</span>
              <span class="text-sm text-ink-muted tabular"><span class="font-display text-2xl font-bold text-navy">2</span> graduates</span>
              <span class="col-span-2 block h-2 rounded-full bg-apron" aria-hidden="true"><span class="block h-2 rounded-full bg-navy" style="width:20%"></span></span>
            </li>
            <li class="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-2 py-3">
              <span class="font-display text-xl font-semibold text-navy sm:text-2xl">CAAP, as check pilots</span>
              <span class="text-sm text-ink-muted tabular"><span class="font-display text-2xl font-bold text-navy">2</span> graduates</span>
              <span class="col-span-2 block h-2 rounded-full bg-apron" aria-hidden="true"><span class="block h-2 rounded-full bg-navy" style="width:20%"></span></span>
            </li>
          </ol>
          <NuxtLink to="/students#alumni" class="mt-6 inline-flex min-h-[44px] items-center font-semibold text-red underline decoration-2 underline-offset-4 hover:text-red-dark">See every name on the alumni roll</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Video -->
    <section aria-labelledby="video-title" class="on-dark bg-tarmac text-white">
      <div class="mx-auto grid max-w-site items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24">
        <div class="lg:col-span-4">
          <h2 id="video-title" class="font-display text-4xl font-bold leading-none sm:text-5xl">Ride along on a training flight</h2>
          <p class="mt-4 text-navy-300">A fixed-wing flight in a Masters Cessna. The helicopter flight and both simulators are on the About page.</p>
          <NuxtLink to="/about#videos" class="mt-6 inline-flex min-h-[44px] items-center font-semibold text-white underline decoration-red decoration-2 underline-offset-4 hover:decoration-white">Watch all four videos</NuxtLink>
        </div>
        <div class="lg:col-span-8">
          <div class="yt rounded-lg" data-yt="zArCGT2t9AQ" data-title="Fixed wing flight, Cessna">
            <button type="button" class="group absolute inset-0 h-full w-full" aria-label="Play video: Fixed wing flight, Cessna">
              <img src="https://i.ytimg.com/vi/zArCGT2t9AQ/hqdefault.jpg" alt="" loading="lazy">
              <span class="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red text-white transition-transform group-hover:scale-105">
                <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Locations and inquiry -->
    <section aria-labelledby="visit-title" class="mx-auto max-w-site px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <h2 id="visit-title" class="max-w-3xl font-display text-4xl font-bold leading-none text-navy sm:text-5xl">Visit the office or the hangar. Bring your questions.</h2>
      <div class="mt-10 grid gap-6 md:grid-cols-3">
        <div class="rounded-lg border border-line p-6">
          <h3 class="font-display text-2xl font-semibold text-navy">Pasay office</h3>
          <p class="mt-2 text-ink-muted">2317 Nissan Car Lease Bldg., Aurora Blvd., Pasay City, Metro Manila</p>
          <p class="mt-4"><a href="tel:+6328517042" class="inline-flex min-h-[44px] items-center font-semibold text-navy hover:text-red tabular">(02) 851-7042</a></p>
        </div>
        <div class="rounded-lg border border-line p-6">
          <h3 class="font-display text-2xl font-semibold text-navy">Plaridel hangar</h3>
          <p class="mt-2 text-ink-muted">Plaridel Airport, Plaridel, Bulacan</p>
          <p class="mt-4"><a href="tel:+63447942865" class="inline-flex min-h-[44px] items-center font-semibold text-navy hover:text-red tabular">(044) 794-2865</a></p>
        </div>
        <div class="flex flex-col justify-between rounded-lg bg-red p-6 text-white on-dark">
          <div>
            <h3 class="font-display text-2xl font-semibold">Not sure which course fits?</h3>
            <p class="mt-2">Tell us your goal and any licenses you hold. Ask about schedules and current fees too.</p>
          </div>
          <NuxtLink to="/contact#inquiry" class="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-md bg-white px-5 font-display text-xl font-semibold text-red transition-colors hover:bg-apron">Send an inquiry</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
