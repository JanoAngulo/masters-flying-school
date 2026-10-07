export type InquiryField = 'name' | 'email' | 'phone' | 'message'

export const INQUIRY_FIELDS: InquiryField[] = ['name', 'email', 'phone', 'message']

export const inquiryRules: Record<InquiryField, (value: string) => string> = {
  name: (v) => (v.trim().length >= 2 ? '' : 'Enter your full name.'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Enter an email address like name@example.com.'),
  phone: (v) => (!v.trim() || /^[+\d][\d\s()-]{6,}$/.test(v.trim()) ? '' : 'Use digits only, for example +63 917 123 4567.'),
  message: (v) => (v.trim().length >= 10 ? '' : 'Tell us a little more, at least 10 characters.'),
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

// TODO: replace the mailto handoff with a POST once the school has an inquiry endpoint (see PRODUCT.md).
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
