import { describe, it, expect } from 'vitest'
import { inquiryRules, buildInquiryMailto, buildWeb3FormsPayload, COURSES, INQUIRY_MAX } from './inquiry'

describe('inquiryRules', () => {
  it('requires a name of at least two characters', () => {
    expect(inquiryRules.name(' J ')).toBe('Enter your full name.')
    expect(inquiryRules.name('Jo')).toBe('')
  })
  it('requires a plausible email', () => {
    expect(inquiryRules.email('name@example')).toBe('Enter an email address like name@example.com.')
    expect(inquiryRules.email(' name@example.com ')).toBe('')
  })
  it('accepts an empty phone but rejects letters', () => {
    expect(inquiryRules.phone('')).toBe('')
    expect(inquiryRules.phone('+63 917 123 4567')).toBe('')
    expect(inquiryRules.phone('call me')).toBe('Use digits only, for example +63 917 123 4567.')
  })
  it('requires a message of at least ten characters', () => {
    expect(inquiryRules.message('Hi there')).toBe('Tell us a little more, at least 10 characters.')
    expect(inquiryRules.message('I want my PPL')).toBe('')
  })
})

describe('length limits', () => {
  it('rejects a name or message past its limit', () => {
    expect(inquiryRules.name('A'.repeat(INQUIRY_MAX.name + 1))).toBe('Keep your name under 100 characters.')
    expect(inquiryRules.message('A'.repeat(INQUIRY_MAX.message + 1))).toBe('Keep your message under 5000 characters.')
    expect(inquiryRules.message('A'.repeat(INQUIRY_MAX.message))).toBe('')
  })
  it('rejects an over-long email or phone', () => {
    expect(inquiryRules.email(`${'a'.repeat(250)}@b.co`)).not.toBe('')
    expect(inquiryRules.phone('1'.repeat(31))).not.toBe('')
  })
})

describe('buildWeb3FormsPayload', () => {
  const base = { accessKey: 'key', name: 'Ana Cruz', email: 'ana@example.com', phone: '', course: 'Private pilot, airplane', message: ' Start in June.\nThanks ', captcha: 'token' }

  it('maps the inquiry to Web3Forms fields with the honeypot unset', () => {
    expect(buildWeb3FormsPayload(base)).toEqual({
      access_key: 'key',
      subject: 'Website inquiry: Private pilot, airplane',
      from_name: 'Masters Flying School website',
      name: 'Ana Cruz',
      email: 'ana@example.com',
      phone: 'Not given',
      course: 'Private pilot, airplane',
      message: 'Start in June.\nThanks',
      botcheck: false,
      'h-captcha-response': 'token',
    })
  })
  it('flattens line breaks in fields that reach email headers', () => {
    const p = buildWeb3FormsPayload({ ...base, name: 'Ana\r\nBcc: spam@example.com', email: 'ana@example.com\nCc: x@y.z' })
    expect(p.name).toBe('Ana Bcc: spam@example.com')
    expect(p.email).not.toMatch(/[\r\n]/)
  })
})

describe('COURSES', () => {
  it('lists the eight options the legacy form offered, in order', () => {
    expect(COURSES.map((c) => c.value)).toEqual(['unsure', 'ppl', 'cpl', 'phpl', 'chpl', 'instrument', 'multi-engine', 'instructor'])
  })
})

describe('buildInquiryMailto', () => {
  it('encodes subject and body and leaves out an empty phone', () => {
    const url = buildInquiryMailto({ name: 'Ana Cruz', email: 'ana@example.com', phone: '', course: 'Private pilot, airplane', message: 'Start in June & ask fees' })
    expect(url.startsWith('mailto:info@mastersflyingschool.com?subject=Inquiry%3A%20Private%20pilot%2C%20airplane&body=')).toBe(true)
    const body = decodeURIComponent(url.split('&body=')[1])
    expect(body).toBe('Name: Ana Cruz\nEmail: ana@example.com\nCourse: Private pilot, airplane\n\nStart in June & ask fees')
  })
  it('includes the phone line when given', () => {
    const body = decodeURIComponent(buildInquiryMailto({ name: 'A', email: 'a@b.co', phone: '0917', course: 'Not sure yet', message: 'x' }).split('&body=')[1])
    expect(body).toContain('Email: a@b.co\nPhone: 0917\nCourse:')
  })
})
