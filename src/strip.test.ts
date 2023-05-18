import { describe, expect, it } from '@jest/globals'

import { strip } from './strip'

describe('strip', () => {
  it('returns an empty string when given an empty string', () => {
    expect(strip('')).toEqual('')
  })

  it('returns an the input string when given a string with no emojis', () => {
    expect(strip('abc')).toEqual('abc')
  })

  it('returns an input string with an emoji removed when given an input string with one emoji', () => {
    expect(strip('a ☕ c')).toEqual('a c')
  })

  it('returns an input string with multiple emojis removed when given an input string with multiple emojis', () => {
    expect(strip('a ☕ b 🍕 c')).toEqual('a b c')
  })

  it('preserves spaces around emoji when preserveSpaces is true', () => {
    expect(strip('a ☕ c', { preserveSpaces: true })).toEqual('a  c')
  })
})
