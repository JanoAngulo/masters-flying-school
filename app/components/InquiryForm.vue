<script setup lang="ts">
type Fields = Record<InquiryField, string>

const route = useRoute()
const values = reactive<Fields>({ name: '', email: '', phone: '', message: '' })
const errors = reactive<Fields>({ name: '', email: '', phone: '', message: '' })
const checked = reactive<Record<InquiryField, boolean>>({ name: false, email: false, phone: false, message: false })
const course = ref('unsure')
const status = ref<'idle' | 'invalid' | 'sent'>('idle')
const invalidCount = ref(0)
const sending = ref(false)
const statusEl = ref<HTMLElement | null>(null)
const inputs: Partial<Record<InquiryField, HTMLInputElement | HTMLTextAreaElement>> = {}

const STATUS_CLASS = {
  idle: '',
  invalid: 'mt-6 rounded-md border border-red bg-red-tint p-4 text-ink',
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

function onSubmit() {
  const invalid = INQUIRY_FIELDS.filter((f) => !check(f))
  if (invalid.length) {
    invalidCount.value = invalid.length
    status.value = 'invalid'
    inputs[invalid[0]]?.focus()
    return
  }
  sending.value = true
  const label = COURSES.find((c) => c.value === course.value)!.label
  window.location.href = buildInquiryMailto({ ...values, course: label })
  setTimeout(async () => {
    sending.value = false
    status.value = 'sent'
    await nextTick()
    statusEl.value?.focus()
  }, 600)
}
</script>

<template>
  <form id="inquiry-form" novalidate class="self-start rounded-lg bg-white p-6 shadow-[0_1px_0_rgb(var(--c-line))] sm:p-8 lg:col-span-8" @submit.prevent="onSubmit">
    <div class="grid gap-6 sm:grid-cols-2">
      <div>
        <label for="name" class="block font-semibold text-navy">Full name <span class="text-red" aria-hidden="true">*</span><span class="sr-only">(required)</span></label>
        <input id="name" :ref="(el) => { inputs.name = el as HTMLInputElement }" v-model="values.name" name="name" type="text" autocomplete="name" required aria-describedby="name-error" :aria-invalid="ariaInvalid('name')" class="mt-2 block min-h-[48px] w-full rounded-md border border-ink-muted/80 px-3 text-base focus:border-navy" :class="fieldClass('name')" @blur="onBlur('name')" @input="onInput('name')">
        <p id="name-error" class="mt-1 text-sm font-semibold text-red" :hidden="!errors.name">{{ errors.name }}</p>
      </div>
      <div>
        <label for="email" class="block font-semibold text-navy">Email <span class="text-red" aria-hidden="true">*</span><span class="sr-only">(required)</span></label>
        <input id="email" :ref="(el) => { inputs.email = el as HTMLInputElement }" v-model="values.email" name="email" type="email" autocomplete="email" inputmode="email" required aria-describedby="email-error" :aria-invalid="ariaInvalid('email')" class="mt-2 block min-h-[48px] w-full rounded-md border border-ink-muted/80 px-3 text-base focus:border-navy" :class="fieldClass('email')" @blur="onBlur('email')" @input="onInput('email')">
        <p id="email-error" class="mt-1 text-sm font-semibold text-red" :hidden="!errors.email">{{ errors.email }}</p>
      </div>
      <div>
        <label for="phone" class="block font-semibold text-navy">Phone or mobile <span class="font-normal text-ink-muted">(optional)</span></label>
        <input id="phone" :ref="(el) => { inputs.phone = el as HTMLInputElement }" v-model="values.phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" aria-describedby="phone-error" :aria-invalid="ariaInvalid('phone')" class="mt-2 block min-h-[48px] w-full rounded-md border border-ink-muted/80 px-3 text-base focus:border-navy" :class="fieldClass('phone')" @blur="onBlur('phone')" @input="onInput('phone')">
        <p id="phone-error" class="mt-1 text-sm font-semibold text-red" :hidden="!errors.phone">{{ errors.phone }}</p>
      </div>
      <div>
        <label for="course" class="block font-semibold text-navy">Course</label>
        <select id="course" v-model="course" name="course" class="mt-2 block min-h-[48px] w-full rounded-md border border-ink-muted/80 bg-white px-3 text-base focus:border-navy">
          <option v-for="c in COURSES" :key="c.value" :value="c.value">{{ c.label }}</option>
        </select>
      </div>
      <div class="sm:col-span-2">
        <label for="message" class="block font-semibold text-navy">Message <span class="text-red" aria-hidden="true">*</span><span class="sr-only">(required)</span></label>
        <textarea id="message" :ref="(el) => { inputs.message = el as HTMLTextAreaElement }" v-model="values.message" name="message" rows="9" required aria-describedby="message-help message-error" :aria-invalid="ariaInvalid('message')" class="mt-2 block w-full rounded-md border border-ink-muted/80 px-3 py-3 text-base focus:border-navy" :class="fieldClass('message')" @blur="onBlur('message')" @input="onInput('message')" />
        <p id="message-help" class="mt-1 text-sm text-ink-muted">For example: "I have a PPL from 2022 and want to start my CPL in June."</p>
        <p id="message-error" class="mt-1 text-sm font-semibold text-red" :hidden="!errors.message">{{ errors.message }}</p>
      </div>
    </div>
    <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
      <button type="submit" :disabled="sending" class="inline-flex min-h-[48px] items-center justify-center rounded-md bg-red px-8 font-display text-xl font-semibold text-white transition-colors hover:bg-red-dark disabled:cursor-wait disabled:opacity-60">{{ sending ? 'Preparing your email…' : 'Send inquiry' }}</button>
      <p class="text-sm text-ink-muted"><span class="text-red" aria-hidden="true">*</span> Required</p>
    </div>
    <div id="inquiry-status" ref="statusEl" role="status" aria-live="polite" tabindex="-1" :hidden="status === 'idle'" :class="STATUS_CLASS[status]">
      <template v-if="status === 'invalid'">{{ invalidCount === 1 ? 'One field needs fixing before we can send this.' : `${invalidCount} fields need fixing before we can send this.` }}</template>
      <template v-else-if="status === 'sent'">Your email app should now be open with this inquiry filled in. Press send there to reach us. If nothing opened, email <a class="font-semibold text-red underline underline-offset-2" href="mailto:info@mastersflyingschool.com">info@mastersflyingschool.com</a> or call <a class="font-semibold text-red underline underline-offset-2" href="tel:+6328517042">(02) 851-7042</a>.</template>
    </div>
  </form>
</template>
