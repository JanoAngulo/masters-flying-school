import { describe, it, expect } from 'vitest'
import { inquiryRules, buildInquiryMailto, COURSES } from './inquiry'

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
