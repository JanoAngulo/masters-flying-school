<script setup lang="ts">
type Fields = Record<InquiryField, string>
type Status = 'idle' | 'invalid' | 'captcha' | 'blocked' | 'sent' | 'failed'
interface HCaptcha {
  render: (el: HTMLElement, options: Record<string, unknown>) => string
  getResponse: (id: string) => string
  reset: (id: string) => void
}

const route = useRoute()
// Without an access key (pitch and test builds) the form falls back to opening the visitor's email app.
const accessKey = useRuntimeConfig().public.web3formsKey
const viaWeb3Forms = !!accessKey

const values = reactive<Fields>({ name: '', email: '', phone: '', message: '' })
const errors = reactive<Fields>({ name: '', email: '', phone: '', message: '' })
const checked = reactive<Record<InquiryField, boolean>>({ name: false, email: false, phone: false, message: false })
const course = ref('unsure')
const status = ref<Status>('idle')
const invalidCount = ref(0)
const sentTo = ref('')
const sending = ref(false)
const botcheck = ref(false)
const formEl = ref<HTMLFormElement | null>(null)
const statusEl = ref<HTMLElement | null>(null)
const captchaEl = ref<HTMLElement | null>(null)
// 'blocked' when hCaptcha can't load (ad blocker, network filter): the form says so and points to phone and email.
const captchaState = ref<'idle' | 'ready' | 'blocked'>('idle')
const inputs: Partial<Record<InquiryField, HTMLInputElement | HTMLTextAreaElement>> = {}

const ALERT = 'mt-6 rounded-md border border-red bg-red-tint p-4 text-ink'
const STATUS_CLASS: Record<Status, string> = {
  idle: '',
  invalid: ALERT,
  captcha: ALERT,
  blocked: ALERT,
  failed: ALERT,
  sent: 'mt-6 rounded-md border border-navy bg-apron p-4 text-ink',
}

const fieldClass = (f: InquiryField) => ({ 'border-red': !!errors[f] })
const ariaInvalid = (f: InquiryField) => (checked[f] ? String(!!errors[f]) : undefined)

function check(f: InquiryField) {
  errors[f] = inquiryRules[f](values[f])
  checked[f] = true
  return !errors[f]
}
const onBlur = (f: InquiryField) => { if (values[f]) check(f) }
const onInput = (f: InquiryField) => { if (checked[f] && errors[f]) check(f) }

// Prerendered pages hydrate at the bare path and the query string arrives just after mount,
// so watch it rather than reading it once.
watch(() => route.query.course, (preset) => {
  if (typeof preset === 'string' && COURSES.some((c) => c.value === preset)) course.value = preset
}, { immediate: true })

// hCaptcha loads only once the form is close to view, so other pages and quick visits never fetch it.
let widgetId: string | null = null
let observer: IntersectionObserver | undefined
// One load at a time, so the observer and a focus or submit arriving together don't add the script twice.
let loading: Promise<HCaptcha> | null = null

function loadHCaptcha() {
  const w = window as Window & { hcaptcha?: HCaptcha; onHCaptchaLoad?: () => void }
  if (w.hcaptcha) return Promise.resolve(w.hcaptcha)
  loading ??= new Promise<HCaptcha>((resolve, reject) => {
    const script = document.createElement('script')
    const fail = () => { script.remove(); loading = null; reject(new Error('hCaptcha did not load')) }
    // A blocked request usually errors at once; a filter that stalls it instead gets ten seconds.
    const timer = setTimeout(fail, 10000)
    w.onHCaptchaLoad = () => { clearTimeout(timer); resolve(w.hcaptcha!) }
    script.src = 'https://js.hcaptcha.com/1/api.js?render=explicit&recaptchacompat=off&onload=onHCaptchaLoad'
    script.async = true
    script.onerror = () => { clearTimeout(timer); fail() }
    document.head.append(script)
  })
  return loading
}

async function renderCaptcha() {
  observer?.disconnect()
  if (widgetId !== null || !captchaEl.value) return
  try {
    const hcaptcha = await loadHCaptcha()
    if (captchaEl.value && widgetId === null) {
      widgetId = hcaptcha.render(captchaEl.value, { sitekey: HCAPTCHA_SITEKEY, callback: () => { if (status.value === 'captcha') status.value = 'idle' } })
    }
    captchaState.value = 'ready'
  } catch {
    captchaState.value = 'blocked'
  }
}
const captchaToken = () => (widgetId === null ? '' : (window as Window & { hcaptcha?: HCaptcha }).hcaptcha?.getResponse(widgetId) ?? '')
const resetCaptcha = () => { if (widgetId !== null) (window as Window & { hcaptcha?: HCaptcha }).hcaptcha?.reset(widgetId) }

onMounted(() => {
  if (!viaWeb3Forms || !formEl.value) return
  observer = new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) renderCaptcha() }, { rootMargin: '400px 0px' })
  observer.observe(formEl.value)
})
onBeforeUnmount(() => observer?.disconnect())

async function announce(next: Status) {
  status.value = next
  await nextTick()
  statusEl.value?.focus()
}

function clearForm() {
  for (const f of INQUIRY_FIELDS) { values[f] = ''; errors[f] = ''; checked[f] = false }
  course.value = 'unsure'
}

async function sendViaWeb3Forms(courseLabel: string) {
  // A ticked hidden box is a bot: it gets the normal confirmation and nothing is sent.
  if (botcheck.value) {
    sentTo.value = values.email.trim()
    return announce('sent')
  }
  const captcha = captchaToken()
  if (!captcha) {
    // Retries a failed load, so a visitor who just switched off a blocker can carry on.
    await renderCaptcha()
    return announce(captchaState.value === 'blocked' ? 'blocked' : 'captcha')
  }
  sending.value = true
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(buildWeb3FormsPayload({ accessKey, ...values, course: courseLabel, captcha })),
    })
    const data = await res.json().catch(() => null)
    if (!res.ok || !data?.success) throw new Error(data?.message ?? `Web3Forms responded ${res.status}`)
    sentTo.value = values.email.trim()
    clearForm()
    await announce('sent')
  } catch {
    await announce('failed')
  } finally {
    sending.value = false
    resetCaptcha()
  }
}

function sendViaEmailApp(courseLabel: string) {
  sending.value = true
  window.location.href = buildInquiryMailto({ ...values, course: courseLabel })
  setTimeout(async () => {
    sending.value = false
    await announce('sent')
  }, 600)
}

function onSubmit() {
  const invalid = INQUIRY_FIELDS.filter((f) => !check(f))
  if (invalid.length) {
    invalidCount.value = invalid.length
    status.value = 'invalid'
    inputs[invalid[0]!]?.focus()
    return
  }
  const label = COURSES.find((c) => c.value === course.value)!.label
  if (viaWeb3Forms) sendViaWeb3Forms(label)
  else sendViaEmailApp(label)
}
</script>

<template>
  <!-- Before the page's script runs, the browser's own mailto submit keeps the form usable and keeps details out of the URL. -->
  <form id="inquiry-form" ref="formEl" action="mailto:info@mastersflyingschool.com" method="post" enctype="text/plain" novalidate class="self-start rounded-lg bg-white p-6 shadow-[0_1px_0_rgb(var(--c-line))] sm:p-8 lg:col-span-8" @submit.prevent="onSubmit" @focusin="viaWeb3Forms && renderCaptcha()">
    <div class="grid gap-6 sm:grid-cols-2">
      <div>
        <label for="name" class="block font-semibold text-navy">Full name <span class="text-red" aria-hidden="true">*</span><span class="sr-only">(required)</span></label>
        <input id="name" :ref="(el) => { inputs.name = el as HTMLInputElement }" v-model="values.name" name="name" type="text" autocomplete="name" required :maxlength="INQUIRY_MAX.name" aria-describedby="name-error" :aria-invalid="ariaInvalid('name')" class="mt-2 block min-h-[48px] w-full rounded-md border border-ink-muted/80 px-3 text-base focus:border-navy" :class="fieldClass('name')" @blur="onBlur('name')" @input="onInput('name')">
        <p id="name-error" class="field-error mt-1 text-sm font-semibold text-red" :hidden="!errors.name">{{ errors.name }}</p>
      </div>
      <div>
        <label for="email" class="block font-semibold text-navy">Email <span class="text-red" aria-hidden="true">*</span><span class="sr-only">(required)</span></label>
        <input id="email" :ref="(el) => { inputs.email = el as HTMLInputElement }" v-model="values.email" name="email" type="email" autocomplete="email" inputmode="email" required :maxlength="INQUIRY_MAX.email" aria-describedby="email-error" :aria-invalid="ariaInvalid('email')" class="mt-2 block min-h-[48px] w-full rounded-md border border-ink-muted/80 px-3 text-base focus:border-navy" :class="fieldClass('email')" @blur="onBlur('email')" @input="onInput('email')">
        <p id="email-error" class="field-error mt-1 text-sm font-semibold text-red" :hidden="!errors.email">{{ errors.email }}</p>
      </div>
      <div>
        <label for="phone" class="block font-semibold text-navy">Phone or mobile <span class="font-normal text-ink-muted">(optional)</span></label>
        <input id="phone" :ref="(el) => { inputs.phone = el as HTMLInputElement }" v-model="values.phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" :maxlength="INQUIRY_MAX.phone" aria-describedby="phone-error" :aria-invalid="ariaInvalid('phone')" class="mt-2 block min-h-[48px] w-full rounded-md border border-ink-muted/80 px-3 text-base focus:border-navy" :class="fieldClass('phone')" @blur="onBlur('phone')" @input="onInput('phone')">
        <p id="phone-error" class="field-error mt-1 text-sm font-semibold text-red" :hidden="!errors.phone">{{ errors.phone }}</p>
      </div>
      <div>
        <label for="course" class="block font-semibold text-navy">Course</label>
        <select id="course" v-model="course" name="course" class="mt-2 block min-h-[48px] w-full rounded-md border border-ink-muted/80 bg-white px-3 text-base focus:border-navy">
          <option v-for="c in COURSES" :key="c.value" :value="c.value">{{ c.label }}</option>
        </select>
      </div>
      <div class="sm:col-span-2">
        <label for="message" class="block font-semibold text-navy">Message <span class="text-red" aria-hidden="true">*</span><span class="sr-only">(required)</span></label>
        <textarea id="message" :ref="(el) => { inputs.message = el as HTMLTextAreaElement }" v-model="values.message" name="message" rows="9" required :maxlength="INQUIRY_MAX.message" aria-describedby="message-help message-error" :aria-invalid="ariaInvalid('message')" class="mt-2 block w-full rounded-md border border-ink-muted/80 px-3 py-3 text-base focus:border-navy" :class="fieldClass('message')" @blur="onBlur('message')" @input="onInput('message')" />
        <p id="message-help" class="mt-1 text-sm text-ink-muted">For example: "I have a PPL from 2022 and want to start my CPL in June."</p>
        <p id="message-error" class="field-error mt-1 text-sm font-semibold text-red" :hidden="!errors.message">{{ errors.message }}</p>
      </div>
    </div>

    <template v-if="viaWeb3Forms">
      <!-- Honeypot: hidden from people and assistive tech, so only a bot fills it in. Web3Forms rejects it too. -->
      <div class="hidden" aria-hidden="true">
        <label>Leave this box unticked <input v-model="botcheck" type="checkbox" name="botcheck" tabindex="-1" autocomplete="off"></label>
      </div>
      <div id="inquiry-captcha" class="mt-8">
        <!-- Reserves the hCaptcha checkbox's height so the button does not jump when it appears. -->
        <div v-show="captchaState !== 'blocked'" ref="captchaEl" class="min-h-[78px]" />
        <p v-if="captchaState === 'blocked'" class="rounded-md border border-line bg-apron p-4 text-sm text-ink">The spam check could not load, so this form can't send right now. An ad blocker or network filter may be stopping it. Email <a class="font-semibold text-red underline underline-offset-2" href="mailto:info@mastersflyingschool.com">info@mastersflyingschool.com</a> or call <a class="whitespace-nowrap font-semibold text-red underline underline-offset-2" href="tel:+6328517042">(02) 851-7042</a> instead.</p>
      </div>
    </template>

    <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
      <button type="submit" :disabled="sending" class="inline-flex min-h-[48px] items-center justify-center rounded-md bg-red px-8 font-display text-xl font-semibold text-white press hover:bg-red-dark disabled:cursor-wait disabled:opacity-60">{{ sending ? (viaWeb3Forms ? 'Sending…' : 'Preparing your email…') : 'Send inquiry' }}</button>
      <p class="text-sm text-ink-muted"><span class="text-red" aria-hidden="true">*</span> Required</p>
    </div>
    <p id="inquiry-privacy" class="mt-4 max-w-prose text-sm text-ink-muted">
      We use these details only to reply to your inquiry.
      <template v-if="viaWeb3Forms">The form is delivered by Web3Forms (<a class="underline underline-offset-2 hover:text-red" href="https://web3forms.com/privacy" target="_blank" rel="noopener">privacy policy</a>) and checked for spam by hCaptcha (<a class="underline underline-offset-2 hover:text-red" href="https://www.hcaptcha.com/privacy" target="_blank" rel="noopener">privacy policy</a>, <a class="underline underline-offset-2 hover:text-red" href="https://www.hcaptcha.com/terms" target="_blank" rel="noopener">terms</a>).</template>
    </p>

    <div id="inquiry-status" ref="statusEl" class="form-status" role="status" aria-live="polite" tabindex="-1" :hidden="status === 'idle'" :class="STATUS_CLASS[status]">
      <template v-if="status === 'invalid'">{{ invalidCount === 1 ? 'One field needs fixing before we can send this.' : `${invalidCount} fields need fixing before we can send this.` }}</template>
      <template v-else-if="status === 'captcha'">Tick the "I am human" box above the button, then send again. It keeps spam out of our inbox.</template>
      <template v-else-if="status === 'blocked'">This form can't send because the spam check could not load. Email <a class="font-semibold text-red underline underline-offset-2" href="mailto:info@mastersflyingschool.com">info@mastersflyingschool.com</a> or call <a class="whitespace-nowrap font-semibold text-red underline underline-offset-2" href="tel:+6328517042">(02) 851-7042</a> instead.</template>
      <template v-else-if="status === 'failed'">Your inquiry did not go through. Try again, or email <a class="font-semibold text-red underline underline-offset-2" href="mailto:info@mastersflyingschool.com">info@mastersflyingschool.com</a> or call <a class="whitespace-nowrap font-semibold text-red underline underline-offset-2" href="tel:+6328517042">(02) 851-7042</a>.</template>
      <template v-else-if="status === 'sent' && viaWeb3Forms">Thank you, your inquiry is on its way. We will reply to {{ sentTo }}.</template>
      <template v-else-if="status === 'sent'">Your email app should now be open with this inquiry filled in. Press send there to reach us. If nothing opened, email <a class="font-semibold text-red underline underline-offset-2" href="mailto:info@mastersflyingschool.com">info@mastersflyingschool.com</a> or call <a class="whitespace-nowrap font-semibold text-red underline underline-offset-2" href="tel:+6328517042">(02) 851-7042</a>.</template>
    </div>
  </form>
</template>
