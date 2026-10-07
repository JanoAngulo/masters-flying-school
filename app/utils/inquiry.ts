export type InquiryField = 'name' | 'email' | 'phone' | 'message'

export const INQUIRY_FIELDS: InquiryField[] = ['name', 'email', 'phone', 'message']

// Also set as maxlength on the inputs; the rules repeat them for pasted or scripted values.
export const INQUIRY_MAX: Record<InquiryField, number> = { name: 100, email: 254, phone: 30, message: 5000 }

const tooLong = (f: InquiryField, v: string) => v.trim().length > INQUIRY_MAX[f]

export const inquiryRules: Record<InquiryField, (value: string) => string> = {
  name: (v) => (tooLong('name', v) ? `Keep your name under ${INQUIRY_MAX.name} characters.` : v.trim().length >= 2 ? '' : 'Enter your full name.'),
  email: (v) => (!tooLong('email', v) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Enter an email address like name@example.com.'),
  phone: (v) => (!v.trim() || (!tooLong('phone', v) && /^[+\d][\d\s()-]{6,}$/.test(v.trim())) ? '' : 'Use digits only, for example +63 917 123 4567.'),
  message: (v) => (tooLong('message', v) ? `Keep your message under ${INQUIRY_MAX.message} characters.` : v.trim().length >= 10 ? '' : 'Tell us a little more, at least 10 characters.'),
}

// Web3Forms' shared hCaptcha site key for free accounts (docs.web3forms.com, hCaptcha guide).
export const HCAPTCHA_SITEKEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2'

// Nobody types a name, an email and a ten-character message this fast; scripts do.
export const MIN_FILL_MS = 3000
export const filledTooFast = (startedAt: number, now = Date.now()) => now - startedAt < MIN_FILL_MS

// Single-line values end up in email headers, so line breaks are flattened to rule out header injection.
const oneLine = (v: string) => v.replace(/[\r\n]+/g, ' ').trim()

export function buildWeb3FormsPayload(d: { accessKey: string; name: string; email: string; phone: string; course: string; message: string; captcha: string }) {
  return {
    access_key: d.accessKey,
    subject: oneLine(`Website inquiry: ${d.course}`),
    from_name: 'Masters Flying School website',
    name: oneLine(d.name),
    // Web3Forms makes this the reply-to address.
    email: oneLine(d.email),
    phone: oneLine(d.phone) || 'Not given',
    course: oneLine(d.course),
    message: d.message.trim(),
    botcheck: false,
    'h-captcha-response': d.captcha,
  }
}

export const COURSES = [
  { value: 'unsure', label: 'Not sure yet' },
  { value: 'ppl', label: 'Private pilot, airplane' },
  { value: 'cpl', label: 'Commercial pilot, airplane' },
  { value: 'phpl', label: 'Private helicopter pilot' },
  { value: 'chpl', label: 'Commercial helicopter pilot' },
  { value: 'instrument', label: 'Instrument rating' },
  { value: 'multi-engine', label: 'Multi-engine rating' },
  { value: 'instructor', label: 'Flight instructor (CFI, CFII)' },
]

// Fallback when no Web3Forms access key is configured, so builds without one still work.
export function buildInquiryMailto(d: { name: string; email: string; phone: string; course: string; message: string }) {
  const body = [
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    d.phone ? `Phone: ${d.phone}` : null,
    `Course: ${d.course}`,
    '',
    d.message,
  ].filter((line) => line !== null).join('\n')
  return `mailto:info@mastersflyingschool.com?subject=${encodeURIComponent(`Inquiry: ${d.course}`)}&body=${encodeURIComponent(body)}`
}
