<script setup lang="ts">
useSiteMeta({
  title: "About | Masters Flying School",
  description: "Masters Flying School was founded in 1994. Our accreditation, mission, team, and facilities in Pasay City and at Plaridel Airport.",
  image: { src: '/img/og/about.jpg', alt: 'The Masters Flying School hangar at Plaridel with Cessnas parked in front' },
})
const root = ref<HTMLElement | null>(null)
usePageEnhancements(root)
</script>

<template>
  <div ref="root" class="contents">
    <section class="intro bg-apron text-ink-strong">
      <div class="mx-auto max-w-site px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <h1 class="font-display text-5xl font-bold leading-none sm:text-6xl">About the school</h1>
        <p class="mt-5 text-lg text-ink-muted">Training private and commercial pilots, on airplanes and helicopters, since 1994.</p>
        <nav aria-label="Sections on this page" class="mt-8">
          <ul class="flex flex-wrap gap-3">
            <li><a href="#mission" class="inline-flex min-h-[44px] items-center rounded-md border border-ink-strong/20 bg-white px-4 font-semibold text-ink-strong press hover:border-red hover:bg-red-tint hover:text-red-dark">Mission</a></li>
            <li><a href="#accreditation" class="inline-flex min-h-[44px] items-center rounded-md border border-ink-strong/20 bg-white px-4 font-semibold text-ink-strong press hover:border-red hover:bg-red-tint hover:text-red-dark">Accreditation</a></li>
            <li><a href="#facilities" class="inline-flex min-h-[44px] items-center rounded-md border border-ink-strong/20 bg-white px-4 font-semibold text-ink-strong press hover:border-red hover:bg-red-tint hover:text-red-dark">Facilities</a></li>
            <li><a href="#team" class="inline-flex min-h-[44px] items-center rounded-md border border-ink-strong/20 bg-white px-4 font-semibold text-ink-strong press hover:border-red hover:bg-red-tint hover:text-red-dark">Team</a></li>
            <li><a href="#videos" class="inline-flex min-h-[44px] items-center rounded-md border border-ink-strong/20 bg-white px-4 font-semibold text-ink-strong press hover:border-red hover:bg-red-tint hover:text-red-dark">Videos</a></li>
          </ul>
        </nav>
      </div>
      <div class="cheatline" aria-hidden="true"></div>
    </section>

    <!-- Story -->
    <section aria-labelledby="story-title" class="mx-auto grid max-w-site gap-10 px-4 py-16 sm:px-6 md:grid-cols-12 lg:gap-12 lg:px-8 lg:py-24">
      <div class="md:col-span-7">
        <h2 id="story-title" class="font-display text-4xl font-semibold leading-[1.05] text-ink-strong sm:text-5xl">Safety before anything else</h2>
        <div class="mt-6 space-y-5 text-lg leading-relaxed text-ink-muted">
          <p>People have always looked up at the sky and wanted to be in it. We train you, body and mind, for the physical and mental demands of flying, with time-tested methods and one rule above the rest: safety comes first, because nothing is more valuable than life itself.</p>
          <p>Since 1994 Masters has produced professional pilots now flying for airlines and general aviation in the Philippines and in their home countries. Several batches of the Philippine Army Aviation Battalion trained here and are now command pilots in their own service.</p>
        </div>
      </div>
      <!-- Beside the text, the photo stretches to the column's full height, so it never floats in a corner. -->
      <figure class="md:col-span-5 md:flex md:flex-col">
        <img src="/img/hangar-exterior.webp" width="930" height="624" loading="lazy" alt="The Masters Flying School hangar at Plaridel with Cessnas parked in front" class="w-full rounded-2xl object-cover object-[35%_center] md:h-0 md:min-h-[320px] md:flex-1">
        <figcaption class="mt-2 text-sm text-ink-muted">The Masters hangar on Plaridel Airport.</figcaption>
      </figure>
    </section>

    <!-- Mission -->
    <section id="mission" aria-labelledby="mission-title" class="scroll-mt-24 bg-apron">
      <div class="mx-auto max-w-site px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h2 id="mission-title" class="sr-only">Vision and mission</h2>
        <p class="max-w-4xl font-display text-3xl font-semibold leading-tight text-ink-strong sm:text-4xl">Our vision: to uphold and advance the highest standards of aviation training, and broaden the professional horizons of aviators, in line with the standards set by CAAP.</p>
        <h3 class="mt-14 font-display text-2xl font-semibold text-red">Our mission</h3>
        <ul class="mt-4 grid gap-x-12 gap-y-4 text-lg leading-relaxed text-ink md:grid-cols-2">
          <li class="border-t border-line pt-4">Provide safe and effective aviation training in every program.</li>
          <li class="border-t border-line pt-4">Hold pilot training to the highest professional standards of knowledge and skill.</li>
          <li class="border-t border-line pt-4">Keep raising our programs to match international flight training requirements.</li>
          <li class="border-t border-line pt-4">Build professional discipline in an intensive yet friendly learning environment.</li>
          <li class="border-t border-line pt-4">Strengthen the formal credentials of every student.</li>
        </ul>
      </div>
    </section>

    <!-- Accreditation -->
    <section id="accreditation" aria-labelledby="acc-title" class="scroll-mt-24 mx-auto max-w-site px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div class="max-w-2xl">
        <h2 id="acc-title" class="font-display text-4xl font-semibold leading-[1.05] text-ink-strong sm:text-5xl">Certificates and accreditation</h2>
        <p class="mt-4 text-lg text-ink-muted">Every aircraft is kept registered and airworthy, and we issue graduation and course completion certificates as authorized by CAAP.</p>
      </div>
        <div class="mt-10">
          <div class="overflow-x-auto rounded-lg border border-line" role="region" aria-labelledby="acc-title" tabindex="0">
            <table class="w-full min-w-[640px] text-left">
              <thead class="bg-apron font-display text-lg text-ink-strong">
                <tr><th scope="col" class="w-[26%] px-5 py-3 font-semibold">Issued by</th><th scope="col" class="px-5 py-3 font-semibold">What it covers</th><th scope="col" class="w-[22%] px-5 py-3 font-semibold">Reference</th></tr>
              </thead>
              <tbody class="divide-y divide-line">
                <tr><td class="px-5 py-4 font-semibold text-ink-strong">CAAP</td><td class="px-5 py-4 text-ink-muted">Air training organization certificate</td><td class="whitespace-nowrap px-5 py-4 font-semibold text-ink tabular">ATOC 94-02</td></tr>
                <tr><td class="px-5 py-4 font-semibold text-ink-strong">CAAP</td><td class="px-5 py-4 text-ink-muted">Training specification certificates (two)</td><td class="px-5 py-4 text-ink-muted">On file</td></tr>
                <tr><td class="px-5 py-4 font-semibold text-ink-strong">CAAP</td><td class="px-5 py-4 text-ink-muted">Approved maintenance organization, plus AMO SOP certificate</td><td class="whitespace-nowrap px-5 py-4 font-semibold text-ink tabular">AMO 113-12</td></tr>
                <tr><td class="px-5 py-4 font-semibold text-ink-strong">CAAP</td><td class="px-5 py-4 text-ink-muted">Fixed-wing and helicopter flight simulators</td><td class="px-5 py-4 text-ink-muted">Simulator certificate</td></tr>
                <tr><td class="px-5 py-4 font-semibold text-ink-strong">TESDA</td><td class="px-5 py-4 text-ink-muted">Technical education registration</td><td class="whitespace-nowrap px-5 py-4 font-semibold text-ink tabular">RCGN V-0023</td></tr>
                <tr><td class="px-5 py-4 font-semibold text-ink-strong">PAF-ARCEN</td><td class="px-5 py-4 text-ink-muted">Affiliation as the 2201st Reserve Pilot Training Squadron</td><td class="whitespace-nowrap px-5 py-4 font-semibold text-ink tabular">2201st RPTS</td></tr>
                <tr><td class="px-5 py-4 font-semibold text-ink-strong">Bureau of Immigration</td><td class="px-5 py-4 text-ink-muted">Authority to accept foreign students</td><td class="whitespace-nowrap px-5 py-4 font-semibold text-ink tabular">AAFS RBR 2000</td></tr>
              </tbody>
            </table>
          </div>
          <p class="mt-4 text-sm text-ink-muted">Verify any CAAP certificate directly with the <a href="https://caap.gov.ph" target="_blank" rel="noopener" class="font-semibold text-red underline underline-offset-2">Civil Aviation Authority of the Philippines</a>.</p>
        </div>
    </section>

    <!-- Facilities: mixed sizes because the hangar and simulators matter most to a visiting student -->
    <section id="facilities" aria-labelledby="fac-title" class="scroll-mt-24 bg-apron">
      <div class="mx-auto max-w-site px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h2 id="fac-title" class="font-display text-4xl font-semibold leading-[1.05] text-ink-strong sm:text-5xl">Facilities</h2>
        <p class="mt-4 text-lg text-ink-muted">Ground school runs at two sites. All flying is from the hangar at Plaridel.</p>

        <div class="mt-12 grid gap-10 lg:grid-cols-12">
          <!-- Hangar photo stretches to match the two stacked items on the right -->
          <article class="flex flex-col lg:col-span-7">
            <div class="relative min-h-[260px] flex-1 overflow-hidden rounded-lg sm:min-h-[340px]">
              <img src="/img/hangar-plaridel.webp" width="930" height="624" loading="lazy" alt="Inside the Masters hangar with Cessnas and Schweizer helicopters on a red floor" class="absolute inset-0 h-full w-full object-cover">
            </div>
            <h3 class="mt-5 font-display text-3xl font-semibold text-ink-strong">Plaridel hangar</h3>
            <p class="mt-2 leading-relaxed text-ink-muted">Home of the fleet and of our in-house maintenance team, with its own classroom and briefing room. Plaridel Airport opened in 1935, trained fighter pilots in the Second World War, and is recognized as a historical landmark. It is one of the few airports of its class with taxiways reaching both ends of the runway.</p>
            <dl class="mt-5 grid grid-cols-3 gap-4 border-t border-ink-strong/15 pt-5">
              <div><dt class="text-sm text-ink-muted">ICAO code</dt><dd class="font-display text-2xl font-semibold text-ink-strong tabular">RPUX</dd></div>
              <div><dt class="text-sm text-ink-muted">Runway</dt><dd class="font-display text-2xl font-semibold text-ink-strong tabular">17 / 35</dd></div>
              <div><dt class="text-sm text-ink-muted">Maintenance</dt><dd class="font-display text-2xl font-semibold text-ink-strong tabular">AMO 113-12</dd></div>
            </dl>
          </article>
          <div class="grid content-start gap-10 md:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            <article>
              <img src="/img/simulator-students.webp" width="930" height="624" loading="lazy" alt="Two students at the controls of the fixed-wing simulator" class="aspect-[16/9] w-full rounded-2xl object-cover">
              <h3 class="mt-5 font-display text-2xl font-semibold text-ink-strong">Flight simulators</h3>
              <p class="mt-2 leading-relaxed text-ink-muted">CAAP-certified fixed-wing and helicopter simulators, with single- and twin-engine setups, for instrument training.</p>
            </article>
            <article>
              <img src="/img/classroom.webp" width="930" height="624" loading="lazy" alt="Ground school classroom with desks, whiteboard and screen" class="aspect-[16/9] w-full rounded-2xl object-cover">
              <h3 class="mt-5 font-display text-2xl font-semibold text-ink-strong">Classrooms</h3>
              <p class="mt-2 leading-relaxed text-ink-muted">At the Pasay office and the hangar. Special classes take one to five students; regular batches take six to fifteen. Ground instructors are licensed; flight instructors are CAAP certified.</p>
            </article>
          </div>
        </div>

        <div class="mt-14 grid gap-10 border-t border-ink-strong/15 pt-14 md:grid-cols-2">
          <article>
            <img src="/img/lodging.webp" width="930" height="624" loading="lazy" alt="Student lodging room with a bed and window" class="aspect-[16/9] w-full rounded-2xl object-cover">
            <h3 class="mt-5 font-display text-2xl font-semibold text-ink-strong">Student lodging</h3>
            <p class="mt-2 leading-relaxed text-ink-muted">Affordable shared quarters and apartments right by Plaridel Airport, for local and foreign students who fly daily and want to skip the drive from Manila. Male and female quarters are separate. A church, market, hospital and mall are nearby.</p>
          </article>
          <article>
            <img src="/img/office-pasay.webp" width="930" height="624" loading="lazy" alt="The Masters Flying School main office storefront in Pasay City" class="aspect-[16/9] w-full rounded-2xl object-cover">
            <h3 class="mt-5 font-display text-2xl font-semibold text-ink-strong">Pasay main office</h3>
            <p class="mt-2 leading-relaxed text-ink-muted">Enrollment, records and ground school. Start here for documents and CAAP filings.</p>
            <p class="mt-3 text-ink-muted">2317 Nissan Car Lease Bldg., Aurora Blvd., Pasay City</p>
            <NuxtLink to="/contact#pasay" class="mt-2 inline-flex min-h-[44px] items-center font-semibold text-ink-strong underline decoration-red decoration-2 underline-offset-4 hover:text-red">Map and directions</NuxtLink>
          </article>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section id="team" aria-labelledby="team-title" class="scroll-mt-24 mx-auto max-w-site px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <h2 id="team-title" class="font-display text-4xl font-semibold leading-[1.05] text-ink-strong sm:text-5xl">The people behind your training</h2>
      <div class="mt-12 grid gap-12 md:grid-cols-2">
        <div>
          <h3 class="border-b-2 border-ink-strong pb-2 font-display text-2xl font-semibold text-ink-strong">Mechanics</h3>
          <p class="mt-3 text-sm text-ink-muted">CAAP airframe and powerplant license numbers shown where published.</p>
          <dl class="mt-4 divide-y divide-line">
            <div class="flex flex-wrap justify-between gap-x-4 py-3"><dt class="font-semibold">Albert M. Fegi</dt><dd class="text-ink-muted sm:text-right md:basis-full md:text-left lg:basis-auto lg:text-right">Chief mechanic, fixed wing<span class="block text-sm tabular">License 110136-AMT</span></dd></div>
            <div class="flex flex-wrap justify-between gap-x-4 py-3"><dt class="font-semibold">Arnel Tabag</dt><dd class="text-ink-muted sm:text-right md:basis-full md:text-left lg:basis-auto lg:text-right">Assistant chief mechanic, fixed wing<span class="block text-sm tabular">License 113246-AMT</span></dd></div>
            <div class="flex flex-wrap justify-between gap-x-4 py-3"><dt class="font-semibold">Emmanuel A. Catoto</dt><dd class="text-ink-muted sm:text-right md:basis-full md:text-left lg:basis-auto lg:text-right">Chief mechanic, rotary wing<span class="block text-sm tabular">License 113244-AMT</span></dd></div>
            <div class="flex flex-wrap justify-between gap-x-4 py-3"><dt class="font-semibold">Emmanuel John Mc Daniels</dt><dd class="text-ink-muted sm:text-right md:basis-full md:text-left lg:basis-auto lg:text-right">Senior aircraft mechanic<span class="block text-sm tabular">License 115519-AMT</span></dd></div>
            <div class="flex flex-wrap justify-between gap-x-4 py-3"><dt class="font-semibold">Arvi P. Borac</dt><dd class="text-ink-muted sm:text-right md:basis-full md:text-left lg:basis-auto lg:text-right">Senior aircraft mechanic<span class="block text-sm tabular">License 110652-AMT</span></dd></div>
            <div class="flex flex-wrap justify-between gap-x-4 py-3"><dt class="font-semibold">Denmark Bautista</dt><dd class="text-ink-muted sm:text-right md:basis-full md:text-left lg:basis-auto lg:text-right">Senior aircraft mechanic<span class="block text-sm tabular">License 110486-AMT</span></dd></div>
            <div class="flex flex-wrap justify-between gap-x-4 py-3"><dt class="font-semibold">Eduardo Casipe Jr.</dt><dd class="text-ink-muted sm:text-right md:basis-full md:text-left lg:basis-auto lg:text-right">Senior aircraft mechanic</dd></div>
            <div class="flex flex-wrap justify-between gap-x-4 py-3"><dt class="font-semibold">Byron Paquito S. Espenilla</dt><dd class="text-ink-muted sm:text-right md:basis-full md:text-left lg:basis-auto lg:text-right">Junior aircraft mechanic</dd></div>
          </dl>
        </div>
        <div>
          <h3 class="border-b-2 border-ink-strong pb-2 font-display text-2xl font-semibold text-ink-strong">Office administration</h3>
          <p class="mt-3 text-sm text-ink-muted">Your contacts for enrollment, documents and CAAP filings.</p>
          <dl class="mt-4 divide-y divide-line">
            <div class="flex flex-wrap justify-between gap-x-4 py-3"><dt class="font-semibold">Marieta A. Tañedo</dt><dd class="text-ink-muted sm:text-right md:basis-full md:text-left lg:basis-auto lg:text-right">VP Admin and executive secretary</dd></div>
            <div class="flex flex-wrap justify-between gap-x-4 py-3"><dt class="font-semibold">Rosalie L. Angulo</dt><dd class="text-ink-muted sm:text-right md:basis-full md:text-left lg:basis-auto lg:text-right">Secretary and liaison</dd></div>
            <div class="flex flex-wrap justify-between gap-x-4 py-3"><dt class="font-semibold">Lawrence John M. Siñel</dt><dd class="text-ink-muted sm:text-right md:basis-full md:text-left lg:basis-auto lg:text-right">Simulator and technical staff<span class="block text-sm tabular">License 110650-AMT</span></dd></div>
            <div class="flex flex-wrap justify-between gap-x-4 py-3"><dt class="font-semibold">Louricar P. Tañedo</dt><dd class="text-ink-muted sm:text-right md:basis-full md:text-left lg:basis-auto lg:text-right">Technical staff assistant</dd></div>
            <div class="flex flex-wrap justify-between gap-x-4 py-3"><dt class="font-semibold">Michelle Hernandez</dt><dd class="text-ink-muted sm:text-right md:basis-full md:text-left lg:basis-auto lg:text-right">Hangar secretary</dd></div>
            <div class="flex flex-wrap justify-between gap-x-4 py-3"><dt class="font-semibold">Rhea C. Calubaquib</dt><dd class="text-ink-muted sm:text-right md:basis-full md:text-left lg:basis-auto lg:text-right">Liaison officer</dd></div>
            <div class="flex flex-wrap justify-between gap-x-4 py-3"><dt class="font-semibold">Nomer D. Dela Cruz</dt><dd class="text-ink-muted sm:text-right md:basis-full md:text-left lg:basis-auto lg:text-right">Liaison officer</dd></div>
          </dl>
        </div>
      </div>
    </section>

    <!-- Videos -->
    <section id="videos" aria-labelledby="videos-title" class="scroll-mt-24 bg-apron">
      <div class="mx-auto max-w-site px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h2 id="videos-title" class="font-display text-4xl font-semibold leading-[1.05] text-ink-strong sm:text-5xl">Videos</h2>
        <p class="mt-4 text-ink-muted">Videos load from YouTube when you press play.</p>
        <ul class="mt-10 grid gap-8 md:grid-cols-2">
          <li>
            <div class="yt rounded-2xl" data-yt="zArCGT2t9AQ" data-title="Fixed wing flight, Cessna">
              <button type="button" class="group absolute inset-0 h-full w-full" aria-label="Play video: Fixed wing flight, Cessna">
                <img src="https://i.ytimg.com/vi/zArCGT2t9AQ/hqdefault.jpg" alt="" loading="lazy">
                <span class="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red text-white transition-transform group-hover:scale-105"><svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg></span>
              </button>
            </div>
            <h3 class="mt-3 font-display text-2xl font-semibold text-ink-strong">Fixed-wing flight, Cessna</h3>
          </li>
          <li>
            <div class="yt rounded-2xl" data-yt="BGTzchAqo7w" data-title="Helicopter flight, Schweizer">
              <button type="button" class="group absolute inset-0 h-full w-full" aria-label="Play video: Helicopter flight, Schweizer">
                <img src="https://i.ytimg.com/vi/BGTzchAqo7w/hqdefault.jpg" alt="" loading="lazy">
                <span class="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red text-white transition-transform group-hover:scale-105"><svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg></span>
              </button>
            </div>
            <h3 class="mt-3 font-display text-2xl font-semibold text-ink-strong">Helicopter flight, Schweizer</h3>
          </li>
          <li>
            <div class="yt rounded-2xl" data-yt="9kvG7ZFYz3k" data-title="Flight simulator, fixed wing">
              <button type="button" class="group absolute inset-0 h-full w-full" aria-label="Play video: Flight simulator, fixed wing">
                <img src="https://i.ytimg.com/vi/9kvG7ZFYz3k/hqdefault.jpg" alt="" loading="lazy">
                <span class="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red text-white transition-transform group-hover:scale-105"><svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg></span>
              </button>
            </div>
            <h3 class="mt-3 font-display text-2xl font-semibold text-ink-strong">Flight simulator, fixed wing</h3>
          </li>
          <li>
            <div class="yt rounded-2xl" data-yt="vcRcyYU-rH0" data-title="Flight simulator, helicopter">
              <button type="button" class="group absolute inset-0 h-full w-full" aria-label="Play video: Flight simulator, helicopter">
                <img src="https://i.ytimg.com/vi/vcRcyYU-rH0/hqdefault.jpg" alt="" loading="lazy">
                <span class="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red text-white transition-transform group-hover:scale-105"><svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg></span>
              </button>
            </div>
            <h3 class="mt-3 font-display text-2xl font-semibold text-ink-strong">Flight simulator, helicopter</h3>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
