<script setup lang="ts">
useSiteMeta({
  title: "Courses | Masters Flying School",
  description: "Private and commercial pilot courses for airplanes and helicopters, plus instrument, multi-engine and flight instructor ratings. CAAP-certified, Plaridel Airport.",
})
useHead({ script: [{ key: 'ld-courses', type: 'application/ld+json', innerHTML: toJsonLd(courseListSchema(useRuntimeConfig().public.siteUrl)) }] })
const intro = useIntro()
const root = ref<HTMLElement | null>(null)
usePageEnhancements(root)
</script>

<template>
  <div ref="root" class="contents">
    <section class="on-dark bg-navy text-white" :class="{ intro }">
      <div class="mx-auto max-w-site px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <h1 class="font-display text-5xl font-bold leading-none sm:text-6xl">Courses</h1>
        <p class="mt-5 max-w-2xl text-lg text-navy-300">Two licenses for airplanes, two for helicopters, and three ratings that add to them. Ground school runs in Pasay City and at the Plaridel hangar. All flying is at Plaridel Airport.</p>
      </div>
      <div class="threshold-thin" aria-hidden="true"></div>
    </section>

    <div class="mx-auto max-w-site px-4 py-12 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-16">
      <!-- In-page navigation -->
      <aside class="lg:col-span-3">
        <nav aria-label="Courses on this page" class="relative lg:sticky lg:top-28" data-scrollspy>
          <p class="font-display text-xl font-semibold text-navy">On this page</p>
          <ul class="mt-3 space-y-1 border-l-2 border-line">
            <li class="pt-2 pl-4 text-sm font-semibold text-ink-muted">Airplane</li>
            <li><a href="#ppl" class="-ml-[2px] flex min-h-[40px] items-center border-l-2 border-transparent pl-4 text-navy hover:border-red hover:text-red aria-[current=location]:text-red">Private pilot</a></li>
            <li><a href="#cpl" class="-ml-[2px] flex min-h-[40px] items-center border-l-2 border-transparent pl-4 text-navy hover:border-red hover:text-red aria-[current=location]:text-red">Commercial pilot</a></li>
            <li class="pt-3 pl-4 text-sm font-semibold text-ink-muted">Helicopter</li>
            <li><a href="#phpl" class="-ml-[2px] flex min-h-[40px] items-center border-l-2 border-transparent pl-4 text-navy hover:border-red hover:text-red aria-[current=location]:text-red">Private helicopter pilot</a></li>
            <li><a href="#chpl" class="-ml-[2px] flex min-h-[40px] items-center border-l-2 border-transparent pl-4 text-navy hover:border-red hover:text-red aria-[current=location]:text-red">Commercial helicopter pilot</a></li>
            <li class="pt-3 pl-4 text-sm font-semibold text-ink-muted">Ratings</li>
            <li><a href="#instrument" class="-ml-[2px] flex min-h-[40px] items-center border-l-2 border-transparent pl-4 text-navy hover:border-red hover:text-red aria-[current=location]:text-red">Instrument rating</a></li>
            <li><a href="#multi-engine" class="-ml-[2px] flex min-h-[40px] items-center border-l-2 border-transparent pl-4 text-navy hover:border-red hover:text-red aria-[current=location]:text-red">Multi-engine</a></li>
            <li><a href="#instructor" class="-ml-[2px] flex min-h-[40px] items-center border-l-2 border-transparent pl-4 text-navy hover:border-red hover:text-red aria-[current=location]:text-red">Flight instructor</a></li>
          </ul>
          <span class="spy-bar" aria-hidden="true"></span>
        </nav>
      </aside>

      <div class="mt-12 space-y-20 lg:col-span-9 lg:mt-0">
        <!-- PPL -->
        <article id="ppl" aria-labelledby="ppl-title" class="scroll-mt-28">
          <img src="/img/student-cessna.webp" width="930" height="624" loading="lazy" alt="Student pilot standing beside a Masters Cessna" class="aspect-[21/9] w-full rounded-lg object-cover">
          <p class="mt-6 font-display text-xl font-semibold text-red">Airplane, start here</p>
          <h2 id="ppl-title" class="font-display text-4xl font-bold leading-none text-navy sm:text-5xl">Private pilot ground and flight training</h2>
          <p class="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">The first step toward a pilot career. You fly the Cessna 150 or 152 until you solo, then build the hours for your private pilot license (PPL).</p>

          <div class="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h3 class="font-display text-2xl font-semibold text-navy">Before you start</h3>
              <ul class="mt-3 list-disc space-y-1 pl-5 text-ink-muted marker:text-red">
                <li>Student Pilot Authority from CAAP</li>
                <li>Third-class medical certificate</li>
                <li>NBI clearance</li>
              </ul>
            </div>
            <div>
              <h3 class="font-display text-2xl font-semibold text-navy">Ground school subjects</h3>
              <ul class="mt-3 grid grid-cols-1 gap-x-6 gap-y-1 text-ink-muted sm:grid-cols-2">
                <li>Air law</li><li>Aircraft general knowledge</li><li>Flight performance and planning</li><li>Human performance</li><li>Meteorology</li><li>Navigation</li><li>Operational procedures</li><li>Principles of flight</li><li>Communication</li>
              </ul>
            </div>
          </div>

          <h3 class="mt-10 font-display text-2xl font-semibold text-navy">Flight training</h3>
          <p class="mt-3 max-w-2xl leading-relaxed text-ink-muted">Flying begins once CAAP issues your Student Pilot Authority, during or after ground school. You need at least 8 flying hours and a passed pre-solo exam before your instructor releases you for your first solo. The syllabus then covers maneuvers, cross-country flights, simulated emergencies and flying in busy airspace.</p>

          <dl class="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
            <div class="bg-white p-5"><dt class="text-sm text-ink-muted">Before first solo</dt><dd class="font-display text-3xl font-bold text-navy tabular">8 hours</dd></div>
            <div class="bg-white p-5"><dt class="text-sm text-ink-muted">Total for PPL, at least</dt><dd class="font-display text-3xl font-bold text-navy tabular">40 hours</dd></div>
            <div class="bg-white p-5"><dt class="text-sm text-ink-muted">Split</dt><dd class="font-display text-3xl font-bold text-navy tabular">20 dual, 20 solo</dd></div>
          </dl>

          <h3 class="mt-10 font-display text-2xl font-semibold text-navy">To apply for your license</h3>
          <ol class="mt-3 list-decimal space-y-1 pl-5 text-ink-muted marker:font-semibold marker:text-navy">
            <li>Restricted Radio Operator Certificate (RROC) from the National Telecommunications Commission</li>
            <li>English Language Proficiency certificate, Level 4 or higher</li>
            <li>Private pilot ground school certificate and flight time certificate</li>
            <li>PPL application form</li>
            <li>Pass the CAAP written exam, then a practical test with a CAAP check pilot</li>
          </ol>
          <NuxtLink to="/contact?course=ppl#inquiry" class="mt-8 inline-flex min-h-[48px] items-center rounded-md bg-red px-6 font-display text-xl font-semibold text-white press hover:bg-red-dark">Ask about the private pilot course</NuxtLink>
        </article>

        <!-- CPL -->
        <article id="cpl" aria-labelledby="cpl-title" class="scroll-mt-28 border-t border-line pt-16">
          <p class="font-display text-xl font-semibold text-red">Airplane, after your PPL</p>
          <h2 id="cpl-title" class="font-display text-4xl font-bold leading-none text-navy sm:text-5xl">Commercial pilot ground and flight training</h2>
          <p class="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">A commercial pilot license (CPL) lets you be paid to fly. That brings responsibility, so the course builds decision-making and crew resource management on top of advanced flying.</p>

          <div class="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h3 class="font-display text-2xl font-semibold text-navy">Advanced ground school</h3>
              <p class="mt-2 text-ink-muted">About 100 hours, covering:</p>
              <ul class="mt-2 grid grid-cols-1 gap-x-6 gap-y-1 text-ink-muted sm:grid-cols-2">
                <li>Air law</li><li>Aircraft general knowledge</li><li>Flight performance and planning</li><li>Human performance</li><li>Meteorology</li><li>Navigation</li><li>Operational procedures</li><li>Principles of flight</li><li>Radiotelephony</li>
              </ul>
            </div>
            <div>
              <h3 class="font-display text-2xl font-semibold text-navy">Flight requirements</h3>
              <ul class="mt-3 list-disc space-y-2 pl-5 text-ink-muted marker:text-red">
                <li>A private pilot license</li>
                <li>At least 110 more flight hours on top of your PPL time</li>
                <li>At least 150 hours total for the CPL written exam permit</li>
                <li>A rating on a higher-horsepower aircraft, at least 10 hours per type</li>
                <li>Simulator training with instrument ground school, plus 20 hours of actual instrument flight</li>
              </ul>
            </div>
          </div>
          <p class="mt-6 max-w-2xl leading-relaxed text-ink-muted">You can add twin-engine training for a multi-engine rating. The license is issued after the CAAP written exam and practical checkride.</p>
          <NuxtLink to="/contact?course=cpl#inquiry" class="mt-8 inline-flex min-h-[48px] items-center rounded-md border-2 border-navy px-6 font-display text-xl font-semibold text-navy press hover:bg-navy hover:text-white">Ask about the commercial pilot course</NuxtLink>
        </article>

        <!-- PHPL -->
        <article id="phpl" aria-labelledby="phpl-title" class="scroll-mt-28 border-t border-line pt-16">
          <img src="/img/schweizer-flight.webp" width="930" height="624" loading="lazy" alt="Masters Schweizer helicopter hovering over the field" class="aspect-[21/9] w-full rounded-lg object-cover">
          <p class="mt-6 font-display text-xl font-semibold text-red">Helicopter, start here</p>
          <h2 id="phpl-title" class="font-display text-4xl font-bold leading-none text-navy sm:text-5xl">Private helicopter pilot ground and flight</h2>
          <p class="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">A helicopter reaches places nothing else can, which is why it is used for rescue, aerial inspection and sightseeing. You train on the Schweizer 269 and 300 CB.</p>

          <div class="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h3 class="font-display text-2xl font-semibold text-navy">Before you start</h3>
              <ul class="mt-3 list-disc space-y-1 pl-5 text-ink-muted marker:text-red">
                <li>Student Helicopter Pilot Authority from CAAP</li>
                <li>Third-class medical certificate</li>
                <li>NBI clearance</li>
              </ul>
            </div>
            <div>
              <h3 class="font-display text-2xl font-semibold text-navy">Ground school subjects</h3>
              <ul class="mt-3 grid grid-cols-1 gap-x-6 gap-y-1 text-ink-muted sm:grid-cols-2">
                <li>Air law</li><li>Helicopter general knowledge</li><li>Flight performance and planning</li><li>Human performance</li><li>Meteorology</li><li>Navigation</li><li>Operational procedures</li><li>Principles of flight</li><li>Communication</li>
              </ul>
            </div>
          </div>

          <h3 class="mt-10 font-display text-2xl font-semibold text-navy">How helicopter flying is different</h3>
          <p class="mt-3 max-w-2xl leading-relaxed text-ink-muted">A helicopter is less stable than an airplane and needs continuous input. You set the angle of the rotor disc with the cyclic, total rotor thrust with the collective, and balance direction with the anti-torque pedals, all while managing engine power, the radio and the weather. Control skills come with practice; command skills, like anticipation and judgement, are built lesson by lesson. Reading before and after each flight makes both come faster.</p>
          <p class="mt-4 max-w-2xl leading-relaxed text-ink-muted">As with airplanes, you need at least 8 flying hours and a passed pre-solo exam before your first solo. The license requires the RROC, an ELP certificate, ground school and flight time certificates, a PHPL application, and passing the CAAP written exam and practical test.</p>
          <NuxtLink to="/contact?course=phpl#inquiry" class="mt-8 inline-flex min-h-[48px] items-center rounded-md bg-red px-6 font-display text-xl font-semibold text-white press hover:bg-red-dark">Ask about the private helicopter course</NuxtLink>
        </article>

        <!-- CHPL -->
        <article id="chpl" aria-labelledby="chpl-title" class="scroll-mt-28 border-t border-line pt-16">
          <p class="font-display text-xl font-semibold text-red">Helicopter, after your PHPL</p>
          <h2 id="chpl-title" class="font-display text-4xl font-bold leading-none text-navy sm:text-5xl">Commercial helicopter pilot ground and flight</h2>
          <p class="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">Fly helicopters for a living. Training adds advanced commercial maneuvers and emergency procedures, plus the decision-making and crew resource management a paid pilot needs.</p>

          <dl class="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
            <div class="bg-white p-5"><dt class="text-sm text-ink-muted">Ground school, about</dt><dd class="font-display text-3xl font-bold text-navy tabular">100 hours</dd></div>
            <div class="bg-white p-5"><dt class="text-sm text-ink-muted">Flying beyond your PHPL, at least</dt><dd class="font-display text-3xl font-bold text-navy tabular">110 hours</dd></div>
            <div class="bg-white p-5"><dt class="text-sm text-ink-muted">CAAP minimum total</dt><dd class="font-display text-3xl font-bold text-navy tabular">150 hours</dd></div>
          </dl>

          <div class="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h3 class="font-display text-2xl font-semibold text-navy">Advanced ground school subjects</h3>
              <ul class="mt-3 grid grid-cols-1 gap-x-6 gap-y-1 text-ink-muted sm:grid-cols-2">
                <li>Air law</li><li>Helicopter general knowledge</li><li>Flight performance and planning</li><li>Human performance</li><li>Meteorology</li><li>Navigation</li><li>Operational procedures</li><li>Principles of flight</li><li>Radiotelephony</li>
              </ul>
            </div>
            <div>
              <h3 class="font-display text-2xl font-semibold text-navy">Before you can apply</h3>
              <ul class="mt-3 list-disc space-y-2 pl-5 text-ink-muted marker:text-red">
                <li>A private helicopter pilot license</li>
                <li>A rating on a higher-horsepower helicopter</li>
                <li>Simulator training with instrument ground school, for the instrument rating</li>
                <li>Pass the CAAP written and practical tests</li>
              </ul>
            </div>
          </div>
          <div class="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p class="max-w-md text-ink-muted">The license lets you be paid for every flight you make.</p>
            <NuxtLink to="/contact?course=chpl#inquiry" class="inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-md border-2 border-navy px-6 font-display text-xl font-semibold text-navy press hover:bg-navy hover:text-white">Ask about the commercial helicopter course</NuxtLink>
          </div>
        </article>

        <!-- Ratings -->
        <section aria-labelledby="ratings-title" class="border-t border-line pt-16">
          <h2 id="ratings-title" class="font-display text-4xl font-bold leading-none text-navy sm:text-5xl">Ratings for licensed pilots</h2>
          <div class="mt-10 grid gap-12 lg:grid-cols-2">
            <article id="instrument" aria-labelledby="ir-title" class="scroll-mt-28">
              <img src="/img/simulator-fixed-wing.webp" width="930" height="624" loading="lazy" alt="Fixed-wing flight simulator with a wraparound runway view" class="aspect-[3/2] w-full rounded-lg object-cover">
              <h3 id="ir-title" class="mt-5 font-display text-3xl font-bold text-navy">Instrument rating</h3>
              <p class="mt-1 font-semibold text-ink-muted">Required for commercial pilots</p>
              <p class="mt-3 leading-relaxed text-ink-muted">Fly through cloud, low visibility and at night with confidence, looking outside only for takeoff and landing. You do intensive instrument ground school and at least 20 hours in our CAAP-certified simulator, with emergency scenarios and cockpit resource management. Single- and twin-engine simulation is available. Actual instrument flight follows, then the CAAP written and practical exams.</p>
              <NuxtLink to="/contact?course=instrument#inquiry" class="mt-5 inline-flex min-h-[44px] items-center font-semibold text-red underline decoration-2 underline-offset-4 hover:text-red-dark">Ask about the instrument rating</NuxtLink>
            </article>
            <article id="multi-engine" aria-labelledby="me-title" class="scroll-mt-28">
              <img src="/img/fleet-piper-aztec.webp" width="930" height="624" loading="lazy" alt="Piper Aztec twin-engine trainer" class="aspect-[3/2] w-full rounded-lg object-cover">
              <h3 id="me-title" class="mt-5 font-display text-3xl font-bold text-navy">Multi-engine rating</h3>
              <p class="mt-1 font-semibold text-ink-muted">Requires at least a private pilot license</p>
              <p class="mt-3 leading-relaxed text-ink-muted">Twin-engine aircraft look complicated until you have trained on one. You complete the Equipment Qualification Course (EQC) ground school and at least 10 hours on our Piper Aztec with a rated instructor, then pass the CAAP written and practical tests to add the rating to your certificate.</p>
              <NuxtLink to="/contact?course=multi-engine#inquiry" class="mt-5 inline-flex min-h-[44px] items-center font-semibold text-red underline decoration-2 underline-offset-4 hover:text-red-dark">Ask about the multi-engine rating</NuxtLink>
            </article>
          </div>
          <article id="instructor" aria-labelledby="cfi-title" class="mt-14 scroll-mt-28 rounded-lg bg-apron p-6 sm:p-10">
            <h3 id="cfi-title" class="font-display text-3xl font-bold text-navy">Flight instructor course</h3>
            <div class="mt-6 grid gap-8 md:grid-cols-2">
              <div>
                <h4 class="font-display text-2xl font-semibold text-red">CFI</h4>
                <p class="mt-1 font-semibold text-ink">For commercial pilot license holders</p>
                <p class="mt-2 leading-relaxed text-ink-muted">Takes you to the Certified Flight Instructor initial rating, so you can teach new pilots.</p>
              </div>
              <div>
                <h4 class="font-display text-2xl font-semibold text-red">CFII</h4>
                <p class="mt-1 font-semibold text-ink">For commercial pilots with an instrument rating</p>
                <p class="mt-2 leading-relaxed text-ink-muted">Takes you to the Certified Flight Instrument Instructor rating, so you can teach instrument flying.</p>
              </div>
            </div>
            <NuxtLink to="/contact?course=instructor#inquiry" class="mt-8 inline-flex min-h-[48px] items-center rounded-md bg-navy px-6 font-display text-xl font-semibold text-white press hover:bg-navy-700">Ask about the instructor course</NuxtLink>
          </article>
        </section>

        <p class="border-t border-line pt-8 text-ink-muted">Fees and class schedules change, so we quote them on request. Foreign applicants also need a student visa or special study permit; see <NuxtLink to="/students#foreign-students" class="font-semibold text-red underline underline-offset-2 hover:text-red-dark">foreign student information</NuxtLink>.</p>
      </div>
    </div>
  </div>
</template>
