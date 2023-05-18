import { describe, expect, it } from '@jest/globals'

import { has } from './has'

describe('has', () => {
  it('returns true when given an emoji', () => {
    expect(has('☕')).toBe(true)
  })

  it('returns true when given the name of an emoji', () => {
    expect(has('coffee')).toBe(true)
  })

  it('returns true when given a markdown emoji name', () => {
    expect(has(':coffee:')).toBe(true)
  })

  it('returns false when given unrelated text', () => {
    expect(has('idontexist')).toBe(false)
  })

  it('returns false when given an unknown markdown name', () => {
    expect(has(':idontexist:')).toBe(false)
  })

  it('returns true when given a emoji in base form', () => {
    expect(has('❤️')).toBe(true)
  })

  it('returns true when given an emoji in code text form', () => {
    expect(has('❤')).toBe(true)
  })

  it('returns false when given multiple emoji codes', () => {
    expect(has('🍕❤️‍💋‍☕')).toBe(false)
  })
})
