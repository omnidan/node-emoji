import { describe, expect, it } from 'vitest'

import { get } from './get.js'

describe('get', () => {
  it('returns an emoji code when given a string', () => {
    expect(get('coffee')).toBe('☕')
  })

  it('returns the contained emoji code when given markdown emoji', () => {
    expect(get(':coffee:')).toBe('☕')
  })

  it('returns undefined when given an emoji', () => {
    expect(get('👯')).toBeUndefined()
  })

  it('returns undefined when given an unknown word', () => {
    expect(get('unknown')).toBeUndefined()
  })
})
