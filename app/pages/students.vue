<script setup lang="ts">
useSiteMeta({
  title: "Students | Masters Flying School",
  description: "What training at Masters Flying School is like, from ground school to first solo and beyond, plus visa information for foreign students and the alumni roll.",
})
const intro = useIntro()
const root = ref<HTMLElement | null>(null)
usePageEnhancements(root)
useStudentsMotion(root, intro)
</script>

<template>
  <div ref="root" class="contents">
    <section class="on-dark bg-navy text-white" :class="{ intro }">
      <div class="mx-auto max-w-site px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <h1 class="font-display text-5xl font-bold leading-none sm:text-6xl">Students</h1>
        <p class="mt-5 max-w-2xl text-lg text-navy-300">What training here is like, what foreign students need to arrange, and where our graduates went.</p>
        <nav aria-label="Sections on this page" class="mt-8">
          <ul class="flex flex-wrap gap-3">
            <li><a href="#student-life" class="inline-flex min-h-[44px] items-center rounded-md border border-white/40 px-4 font-semibold hover:bg-white hover:text-navy">Student life</a></li>
            <li><a href="#foreign-students" class="inline-flex min-h-[44px] items-center rounded-md border border-white/40 px-4 font-semibold hover:bg-white hover:text-navy">Foreign students</a></li>
            <li><a href="#alumni" class="inline-flex min-h-[44px] items-center rounded-md border border-white/40 px-4 font-semibold hover:bg-white hover:text-navy">Alumni</a></li>
          </ul>
        </nav>
      </div>
      <div class="threshold-thin" aria-hidden="true"></div>
    </section>

    <!-- Student life intro -->
    <section id="student-life" aria-labelledby="life-title" class="scroll-mt-24">
      <div class="mx-auto grid max-w-site items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-20">
        <div class="lg:col-span-5">
          <h2 id="life-title" class="font-display text-4xl font-bold leading-none text-navy sm:text-5xl">You arrive shy. You leave a pilot.</h2>
          <p class="mt-6 text-lg leading-relaxed text-ink-muted">In our experience, new trainees walk in with bowed heads, humble and unsure. Ground school, the flight line and, above all, the first solo change that. Studying here transforms both character and confidence.</p>
          <p class="mt-4 text-lg leading-relaxed text-ink-muted">Here is the path every Masters student follows, in order.</p>
        </div>
        <figure class="lg:col-span-7">
          <img src="/img/class-apron.webp" width="930" height="624" alt="A batch of Masters students in white uniforms lined up on the Plaridel apron" class="w-full rounded-lg object-cover">
        </figure>
      </div>
    </section>

    <!-- Stage by stage. A real sequence, so stages are numbered. -->
    <section aria-labelledby="stages-title" class="mx-auto max-w-site px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
      <h2 id="stages-title" class="sr-only">Training stages</h2>
      <div class="relative">
      <div class="route-track-v absolute bottom-6 left-[19px] top-6" aria-hidden="true"></div>
      <ol class="relative space-y-12">

        <li class="relative grid gap-6 pl-16 md:grid-cols-12 md:gap-10">
          <span class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-navy font-display text-xl font-bold text-white">1</span>
          <div class="md:col-span-7">
            <h3 class="font-display text-3xl font-bold leading-none text-navy">Ground course</h3>
            <p class="mt-2 inline-block rounded bg-apron px-2 py-1 text-sm font-semibold text-navy">9 subjects, Pasay or Plaridel</p>
            <p class="mt-4 leading-relaxed text-ink-muted">Everyone starts in the classroom with air law, meteorology, navigation and the rest of the private pilot syllabus. Reading before and after every lesson makes the flying come faster later.</p>
          </div>
          <img src="/img/ground-school.webp" width="930" height="624" loading="lazy" alt="Instructor pointing to a chart during ground school" class="aspect-[16/10] w-full rounded-lg object-cover md:col-span-5">
        </li>

        <li class="relative grid gap-6 pl-16 md:grid-cols-12 md:gap-10">
          <span class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-navy font-display text-xl font-bold text-white">2</span>
          <div class="md:col-span-7">
            <h3 class="font-display text-3xl font-bold leading-none text-navy">Flight training at Plaridel</h3>
            <p class="mt-2 inline-block rounded bg-apron px-2 py-1 text-sm font-semibold text-navy tabular">RPUX, runway 17/35, 900 × 30 m</p>
            <p class="mt-4 leading-relaxed text-ink-muted">New pilots are not allowed to train at international airports, so you fly from Plaridel, the training airfield closest to Metro Manila and the only airport in Bulacan. You start on the Cessna 150 or 152, and CAAP controllers staff the tower during operating hours.</p>
          </div>
          <img src="/img/preflight-cessna.webp" width="930" height="624" loading="lazy" alt="Student and line crew doing a preflight check under a Cessna wing" class="aspect-[16/10] w-full rounded-lg object-cover md:col-span-5">
        </li>

        <!-- First solo is the milestone the whole school celebrates, so it gets the accent -->
        <li class="relative pl-16">
          <span class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-red font-display text-xl font-bold text-white">3</span>
          <div class="grid gap-6 overflow-hidden rounded-lg bg-red text-white on-dark md:grid-cols-12">
            <div class="p-6 sm:p-8 md:col-span-6">
              <h3 class="font-display text-3xl font-bold leading-none">First solo</h3>
              <p class="mt-2 inline-block rounded bg-white/15 px-2 py-1 text-sm font-semibold tabular">At least 8 hours and a pre-solo exam first</p>
              <p class="mt-4 leading-relaxed">Your instructor steps out and you fly the aircraft alone. When you climb down, your batchmates pour a bucket of water over you in front of the plane you just soloed. A solo blow-out party, paid for by the soloist, is customary but not required.</p>
              <p class="mt-4 font-display text-2xl font-semibold leading-snug">“Another eagle is born and is set conquering the sky.”</p>
            </div>
            <img src="/img/crew-runway.webp" width="930" height="624" loading="lazy" alt="Students in red flight suits on runway 17 at Plaridel in front of a Cessna" class="h-full min-h-[240px] w-full object-cover md:col-span-6">
          </div>
        </li>

        <li class="relative grid gap-6 pl-16 md:grid-cols-12 md:gap-10">
          <span class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-navy font-display text-xl font-bold text-white">4</span>
          <div class="md:col-span-7">
            <h3 class="font-display text-3xl font-bold leading-none text-navy">Private pilot license</h3>
            <p class="mt-2 inline-block rounded bg-apron px-2 py-1 text-sm font-semibold text-navy tabular">40 hours: 20 dual, 20 solo</p>
            <p class="mt-4 leading-relaxed text-ink-muted">Confidence after soloing makes this stage quicker. With the hours and your ground certificate, you sit the CAAP written test on nine subjects, then the practical test. You also need an English Language Proficiency certificate at Level 4 or above.</p>
            <NuxtLink to="/courses#ppl" class="mt-3 inline-flex min-h-[44px] items-center font-semibold text-red underline decoration-2 underline-offset-4 hover:text-red-dark">Private pilot course details</NuxtLink>
          </div>
          <img src="/img/student-cessna.webp" width="930" height="624" loading="lazy" alt="Two students beside a Masters Cessna" class="aspect-[16/10] w-full rounded-lg object-cover md:col-span-5">
        </li>

        <li class="relative grid gap-6 pl-16 md:grid-cols-12 md:gap-10">
          <span class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-navy font-display text-xl font-bold text-white">5</span>
          <div class="md:col-span-7">
            <h3 class="font-display text-3xl font-bold leading-none text-navy">Commercial pilot license</h3>
            <p class="mt-2 inline-block rounded bg-apron px-2 py-1 text-sm font-semibold text-navy tabular">110 more hours: at least 100 solo, 50 dual</p>
            <p class="mt-4 leading-relaxed text-ink-muted">The commercial ground course plus flying beyond your private hours, and a rating on a higher-horsepower aircraft. Pass nine CAAP written subjects and a practical checkride, and you can be paid to fly.</p>
            <NuxtLink to="/courses#cpl" class="mt-3 inline-flex min-h-[44px] items-center font-semibold text-red underline decoration-2 underline-offset-4 hover:text-red-dark">Commercial pilot course details</NuxtLink>
          </div>
          <img src="/img/instructor-student.webp" width="930" height="624" loading="lazy" alt="Instructor and student with headsets in the cockpit" class="aspect-[16/10] w-full rounded-lg object-cover md:col-span-5">
        </li>

        <li class="relative grid gap-6 pl-16 md:grid-cols-12 md:gap-10">
          <span class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-navy font-display text-xl font-bold text-white">6</span>
          <div class="md:col-span-7">
            <h3 class="font-display text-3xl font-bold leading-none text-navy">Instrument rating</h3>
            <p class="mt-2 inline-block rounded bg-apron px-2 py-1 text-sm font-semibold text-navy tabular">At least 20 simulator hours</p>
            <p class="mt-4 leading-relaxed text-ink-muted">Mandatory for commercial pilots. It lets you fly in poor weather, low visibility and at night. Instrument ground school and simulator time come first, then the CAAP written and practical exams.</p>
            <NuxtLink to="/courses#instrument" class="mt-3 inline-flex min-h-[44px] items-center font-semibold text-red underline decoration-2 underline-offset-4 hover:text-red-dark">Instrument rating details</NuxtLink>
          </div>
          <img src="/img/simulator-students.webp" width="930" height="624" loading="lazy" alt="Two students flying the fixed-wing simulator" class="aspect-[16/10] w-full rounded-lg object-cover md:col-span-5">
        </li>

        <li class="relative grid gap-6 pl-16 md:grid-cols-12 md:gap-10">
          <span class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-navy font-display text-xl font-bold text-white">7</span>
          <div class="md:col-span-7">
            <h3 class="font-display text-3xl font-bold leading-none text-navy">Twin-engine rating</h3>
            <p class="mt-2 inline-block rounded bg-apron px-2 py-1 text-sm font-semibold text-navy tabular">At least 10 hours on the Piper Aztec</p>
            <p class="mt-4 leading-relaxed text-ink-muted">For pilots who plan to fly multi-engine planes. Equipment Qualification Course ground school, flights with a rated instructor, then CAAP written and practical tests.</p>
            <NuxtLink to="/courses#multi-engine" class="mt-3 inline-flex min-h-[44px] items-center font-semibold text-red underline decoration-2 underline-offset-4 hover:text-red-dark">Multi-engine rating details</NuxtLink>
          </div>
          <img src="/img/student-aztec.webp" width="930" height="624" loading="lazy" alt="Students and instructors with the Piper Aztec" class="aspect-[16/10] w-full rounded-lg object-cover md:col-span-5">
        </li>
      </ol>
      </div>

      <div class="mt-16 grid items-center gap-6 rounded-lg border border-line p-4 sm:grid-cols-[200px_1fr_auto] sm:p-5">
        <img src="/img/lodging.webp" width="930" height="624" loading="lazy" alt="Student lodging room near Plaridel Airport" class="aspect-[16/10] w-full rounded-md object-cover">
        <div>
          <p class="font-display text-2xl font-semibold text-navy">Flying daily? Stay near the airport.</p>
          <p class="mt-1 text-ink-muted">Affordable shared quarters and apartments next to Plaridel, with separate male and female quarters.</p>
        </div>
        <NuxtLink to="/about#facilities" class="inline-flex min-h-[44px] items-center font-semibold text-red underline decoration-2 underline-offset-4 hover:text-red-dark">About student lodging</NuxtLink>
      </div>
    </section>

    <!-- Foreign students -->
    <section id="foreign-students" aria-labelledby="foreign-title" class="scroll-mt-24 bg-apron">
      <div class="mx-auto max-w-site px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div class="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div class="lg:col-span-7">
            <h2 id="foreign-title" class="font-display text-4xl font-bold leading-none text-navy sm:text-5xl">Coming from abroad</h2>
            <p class="mt-5 text-lg text-ink-muted">We are authorized by the Bureau of Immigration to accept foreign students (AAFS RBR No. 2000). You submit the same documents as local students, plus papers for your visa. Our liaison officers hand-carry conversion papers to the Bureau for you.</p>
          </div>
          <p class="rounded-md border border-navy/20 bg-white p-4 text-sm text-ink lg:col-span-5">Immigration rules change. Confirm current requirements with the <a href="https://immigration.gov.ph" target="_blank" rel="noopener" class="font-semibold text-red underline underline-offset-2">Bureau of Immigration</a> and the <a href="https://dfa.gov.ph" target="_blank" rel="noopener" class="font-semibold text-red underline underline-offset-2">Department of Foreign Affairs</a> before you travel.</p>
        </div>

        <h3 class="mt-12 font-display text-2xl font-semibold text-navy">Which route fits you?</h3>
        <ul class="mt-4 grid gap-4 md:grid-cols-3">
          <li class="flex flex-col rounded-lg border-2 border-navy bg-white p-6">
            <p class="font-display text-2xl font-bold text-navy">Student visa</p>
            <dl class="mt-4 space-y-3 text-sm">
              <div><dt class="font-semibold text-ink">Best for</dt><dd class="text-ink-muted">Full license programs you plan before you travel</dd></div>
              <div><dt class="font-semibold text-ink">Where you apply</dt><dd class="text-ink-muted">Philippine embassy or consulate at home, after our Notice of Acceptance</dd></div>
            </dl>
            <a href="#visa-student" class="mt-auto inline-flex min-h-[44px] items-center pt-4 font-semibold text-red underline decoration-2 underline-offset-4 hover:text-red-dark">See the steps</a>
          </li>
          <li class="flex flex-col rounded-lg border border-line bg-white p-6">
            <p class="font-display text-2xl font-bold text-navy">Tourist visa and study permit</p>
            <dl class="mt-4 space-y-3 text-sm">
              <div><dt class="font-semibold text-ink">Best for</dt><dd class="text-ink-muted">Courses shorter than six months, such as a single rating</dd></div>
              <div><dt class="font-semibold text-ink">Where you apply</dt><dd class="text-ink-muted">Tourist visa at home, then a special study permit at the Bureau's student desk</dd></div>
            </dl>
            <a href="#visa-permit" class="mt-auto inline-flex min-h-[44px] items-center pt-4 font-semibold text-red underline decoration-2 underline-offset-4 hover:text-red-dark">See the requirements</a>
          </li>
          <li class="flex flex-col rounded-lg border border-line bg-white p-6">
            <p class="font-display text-2xl font-bold text-navy">Convert to a student visa</p>
            <dl class="mt-4 space-y-3 text-sm">
              <div><dt class="font-semibold text-ink">Best for</dt><dd class="text-ink-muted">Students already in the Philippines on another visa</dd></div>
              <div><dt class="font-semibold text-ink">Where you apply</dt><dd class="text-ink-muted">Bureau of Immigration, through our liaison officer</dd></div>
            </dl>
            <a href="#visa-convert" class="mt-auto inline-flex min-h-[44px] items-center pt-4 font-semibold text-red underline decoration-2 underline-offset-4 hover:text-red-dark">See the requirements</a>
          </li>
        </ul>

        <div class="mt-10 divide-y divide-line rounded-lg border border-line bg-white">
          <details id="visa-student" class="group scroll-mt-28 px-5">
            <summary class="flex min-h-[60px] items-center justify-between gap-4 font-display text-xl font-semibold text-navy hover:text-red">Student visa, step by step<svg class="chev shrink-0" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m7 9 5 5 5-5z"/></svg></summary>
            <ol class="list-decimal space-y-2 pb-6 pl-5 text-ink-muted marker:font-semibold marker:text-navy">
              <li>Send us five copies of your Personal History Statement (signed, in English and your national alphabet, with thumbprints and a 2×2 photo), authenticated scholastic records, a notarized affidavit of support with bank statements, and an authenticated copy of your passport data page and birth certificate.</li>
              <li>We issue a Notice of Acceptance (NOA).</li>
              <li>Submit your documents to the Department of Foreign Affairs, which forwards them to the Philippine embassy or consulate in your country.</li>
              <li>Attend a consular interview with the original NOA, an authenticated police clearance and a medical certificate including chest x-ray, HIV and hepatitis B results.</li>
              <li>On arrival, register at the Bureau of Immigration student desk and enroll with us. We help you get your ACR and Certificate of Residence for Temporary Student.</li>
            </ol>
          </details>
          <details id="visa-tourist" class="group scroll-mt-28 px-5">
            <summary class="flex min-h-[60px] items-center justify-between gap-4 font-display text-xl font-semibold text-navy hover:text-red">Tourist visa requirements<svg class="chev shrink-0" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m7 9 5 5 5-5z"/></svg></summary>
            <div class="pb-6 text-ink-muted">
              <p>Apply in person at the Philippine embassy or consulate for your place of residence.</p>
              <ul class="mt-3 list-disc space-y-1 pl-5 marker:text-red">
                <li>Passport valid at least six months beyond your stay</li>
                <li>Completed visa application forms and two passport photos</li>
                <li>Proof of status as a tourist or businessperson</li>
                <li>Confirmed return or onward ticket</li>
                <li>Visa fee</li>
              </ul>
            </div>
          </details>
          <details id="visa-permit" class="group scroll-mt-28 px-5">
            <summary class="flex min-h-[60px] items-center justify-between gap-4 font-display text-xl font-semibold text-navy hover:text-red">Special study permit requirements<svg class="chev shrink-0" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m7 9 5 5 5-5z"/></svg></summary>
            <div class="pb-6 text-ink-muted">
              <p>For applicants 18 and over on a non-degree course of less than a year. Arrive on a tourist visa, then apply at the Bureau of Immigration student desk with:</p>
              <ul class="mt-3 list-disc space-y-1 pl-5 marker:text-red">
                <li>Letter of request</li>
                <li>Certificate of acceptance from an accredited school (we provide this)</li>
                <li>Copy of your passport showing valid stay</li>
                <li>Affidavit of support with proof</li>
                <li>Birth certificate</li>
              </ul>
              <p class="mt-3">Minors and dependents need extra documents such as parents' passports or guardianship papers. Ask us which apply to you.</p>
            </div>
          </details>
          <details id="visa-convert" class="group scroll-mt-28 px-5">
            <summary class="flex min-h-[60px] items-center justify-between gap-4 font-display text-xl font-semibold text-navy hover:text-red">Conversion to a student visa requirements<svg class="chev shrink-0" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m7 9 5 5 5-5z"/></svg></summary>
            <div class="pb-6 text-ink-muted">
              <p>Our liaison officer submits these to the Bureau of Immigration under a school cover letter:</p>
              <ul class="mt-3 list-disc space-y-1 pl-5 marker:text-red">
                <li>School endorsement with the original Notice of Acceptance</li>
                <li>Proof of financial support for living costs and school fees</li>
                <li>Scholastic records authenticated by the Philippine post in your country</li>
                <li>Authenticated police clearance from your country; NBI clearance too if you have been here more than 59 days</li>
                <li>Quarantine medical examination by the National Quarantine Office</li>
                <li>Personal History Statement with a recent 2×2 photo</li>
                <li>Copies of your passport photo, data and latest arrival pages, with the passport itself for verification</li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    </section>

    <!-- Alumni -->
    <section id="alumni" aria-labelledby="alumni-title" class="scroll-mt-24 mx-auto max-w-site px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div class="grid gap-6 lg:grid-cols-12 lg:items-end">
        <h2 id="alumni-title" class="font-display text-4xl font-bold leading-none text-navy sm:text-5xl lg:col-span-6">The students of yesterday are the pilots of today</h2>
        <p class="text-lg text-ink-muted lg:col-span-6">Graduates on our alumni roll, grouped by where they flew when they were listed. Several batches of the Philippine Army Aviation Battalion also trained here and are now command pilots in their own service.</p>
      </div>

      <!-- Larger cards for the two airlines with the most graduates; hierarchy follows the roll -->
      <div class="mt-12 grid gap-6 lg:grid-cols-2">
        <article class="rounded-lg bg-navy p-6 text-white on-dark sm:p-8">
          <div class="flex items-baseline justify-between gap-4 border-b border-white/20 pb-4">
            <h3 class="font-display text-3xl font-bold">Cebu Pacific</h3>
            <p class="font-display text-xl text-navy-300"><span class="text-4xl font-bold text-white tabular">10</span> on the roll</p>
          </div>
          <ul class="mt-4 grid gap-x-6 gap-y-1 text-navy-300 sm:grid-cols-2">
            <li>Capt. William Chuasoto, 2004</li><li>Capt. Oliver Roy Catan, 2008</li><li>Capt. Francis Evan Singson, 2010</li><li>Capt. Richard Anthony Avila, 2011</li><li>Capt. Clarence Mark Dela Tina, 2011</li><li>Capt. Mark Marzo</li><li>Capt. Jonjie Guballa</li><li>Capt. Robert Jose Tabberrah</li><li>Capt. Ruel Marandan</li><li>Capt. Greg Raymundo</li>
          </ul>
        </article>
        <article class="rounded-lg bg-navy p-6 text-white on-dark sm:p-8">
          <div class="flex items-baseline justify-between gap-4 border-b border-white/20 pb-4">
            <h3 class="font-display text-3xl font-bold">PAL Express</h3>
            <p class="font-display text-xl text-navy-300"><span class="text-4xl font-bold text-white tabular">10</span> on the roll</p>
          </div>
          <ul class="mt-4 grid gap-x-6 gap-y-1 text-navy-300 sm:grid-cols-2">
            <li>Capt. Jose A. Olaguer, 2000</li><li>Capt. Felizca Fernando, 2008</li><li>Capt. Maria Anna Karenina Zosa, 2010</li><li>Capt. Chuck Marin, 2010</li><li>Capt. Mann Ed Demalata, 2010</li><li>Capt. Antonette Fernando, 2010</li><li>Capt. Michael Relano</li><li>Capt. John Lapangan</li><li>Capt. Nicanor Pongos</li><li>Capt. Russell Gentica</li>
          </ul>
        </article>
      </div>

      <div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <article class="rounded-lg border border-line p-5">
          <div class="flex items-baseline justify-between gap-3 border-b border-line pb-3"><h3 class="font-display text-xl font-bold text-navy">AirAsia and AirAsia Zest</h3><span class="font-display text-3xl font-bold text-navy tabular">5</span></div>
          <ul class="mt-3 space-y-1 text-sm text-ink-muted"><li>Capt. Dennis Salumbides, 1998</li><li>Capt. Carmelito Bidayan, 1999</li><li>Capt. Francisco Santiago, 2000</li><li>Capt. Ernest Gerard G. Villa, 2011</li><li>Capt. Jayfred Basawil</li></ul>
        </article>
        <article class="rounded-lg border border-line p-5">
          <div class="flex items-baseline justify-between gap-3 border-b border-line pb-3"><h3 class="font-display text-xl font-bold text-navy">SEAIR</h3><span class="font-display text-3xl font-bold text-navy tabular">3</span></div>
          <ul class="mt-3 space-y-1 text-sm text-ink-muted"><li>Capt. Mark Allan Caluag, 2009</li><li>Capt. Nilo Sumang</li><li>Capt. Pocholo Delos Reyes</li></ul>
        </article>
        <article class="rounded-lg border border-line p-5">
          <div class="flex items-baseline justify-between gap-3 border-b border-line pb-3"><h3 class="font-display text-xl font-bold text-navy">Philippine Airlines</h3><span class="font-display text-3xl font-bold text-navy tabular">2</span></div>
          <ul class="mt-3 space-y-1 text-sm text-ink-muted"><li>Capt. Gerry Recio, 2001</li><li>Capt. Thor Cuasadin</li></ul>
          <div class="mt-5 flex items-baseline justify-between gap-3 border-b border-line pb-3"><h3 class="font-display text-xl font-bold text-navy">Airphil Express</h3><span class="font-display text-3xl font-bold text-navy tabular">2</span></div>
          <ul class="mt-3 space-y-1 text-sm text-ink-muted"><li>Capt. Dickenson James Mangahas</li><li>Capt. Mark Tangonan</li></ul>
        </article>
        <article class="rounded-lg border border-line p-5">
          <div class="flex items-baseline justify-between gap-3 border-b border-line pb-3"><h3 class="font-display text-xl font-bold text-navy">CAAP and others</h3><span class="font-display text-3xl font-bold text-navy tabular">5</span></div>
          <ul class="mt-3 space-y-1 text-sm text-ink-muted"><li>Capt. Khristuval E. Brillantes, CAAP check pilot</li><li>Capt. Sigfrid Repasa, CAAP check pilot</li><li>Capt. Amiel Jerome Perlas, PAAC</li><li>Capt. Aldrin Sabawa, Malaysia</li><li>Capt. Vikas Hooda, helicopter pilot, India</li></ul>
        </article>
      </div>

      <div class="mt-16 border-t-2 border-navy pt-10">
        <div class="max-w-2xl">
          <h3 class="font-display text-3xl font-bold text-navy">Graduates from abroad</h3>
          <p class="mt-3 text-ink-muted">Students have come to Plaridel from the United States, Bangladesh, India, Nepal, Egypt, Mexico, Papua New Guinea, China and the Arab world. These are the foreign graduates named on our roll.</p>
        </div>
        <dl class="mt-8 divide-y divide-line border-y border-line">
          <div class="grid gap-x-8 gap-y-2 py-5 sm:grid-cols-[200px_1fr]">
            <dt class="flex items-baseline gap-3 sm:block">
              <span class="block font-display text-2xl font-semibold leading-tight text-navy">Saudi Arabia</span>
              <span class="block text-sm font-semibold text-red tabular sm:mt-1">13 graduates</span>
            </dt>
            <dd class="max-w-3xl leading-relaxed text-ink-muted">Muner Hael, Shaher Alamadhi, Amro Daghistani, Hussam Morea, Faisal Alomoudi, Faisal Abdullah Alghamdi, Yasser Alshery, Ayman Ayoub, Mohammed Misky, Mohamad Khayat, Wael Albakri, Mohamed Algrably and Khalid Essa Huladar, all graduated 2010</dd>
          </div>
          <div class="grid gap-x-8 gap-y-2 py-5 sm:grid-cols-[200px_1fr]">
            <dt class="flex items-baseline gap-3 sm:block">
              <span class="block font-display text-2xl font-semibold leading-tight text-navy">Nepal</span>
              <span class="block text-sm font-semibold text-red tabular sm:mt-1">5 graduates</span>
            </dt>
            <dd class="max-w-3xl leading-relaxed text-ink-muted">Hareram Thapa, Sobit Gauchan and Dilip Thapa, graduated 2010. Manoj Pandey and Pravakar KC (helicopter pilot), graduated 2011</dd>
          </div>
          <div class="grid gap-x-8 gap-y-2 py-5 sm:grid-cols-[200px_1fr]">
            <dt class="flex items-baseline gap-3 sm:block">
              <span class="block font-display text-2xl font-semibold leading-tight text-navy">Bangladesh</span>
              <span class="block text-sm font-semibold text-red tabular sm:mt-1">2 graduates</span>
            </dt>
            <dd class="max-w-3xl leading-relaxed text-ink-muted">Faraz Bin Zafar, graduated 2011. Arafat Hossen, graduated 2012</dd>
          </div>
          <div class="grid gap-x-8 gap-y-2 py-5 sm:grid-cols-[200px_1fr]">
            <dt class="flex items-baseline gap-3 sm:block">
              <span class="block font-display text-2xl font-semibold leading-tight text-navy">India</span>
              <span class="block text-sm font-semibold text-red tabular sm:mt-1">1 graduate</span>
            </dt>
            <dd class="max-w-3xl leading-relaxed text-ink-muted">Taran Barmi, graduated 2010</dd>
          </div>
        </dl>
      </div>

      <p class="mt-10 text-ink-muted">Graduated from Masters and not listed? <NuxtLink to="/contact#inquiry" class="font-semibold text-red underline underline-offset-2 hover:text-red-dark">Tell us where you fly</NuxtLink>.</p>
    </section>
  </div>
</template>
