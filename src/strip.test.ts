import { describe, expect, it } from 'vitest'

import { strip } from './strip.js'

describe('strip', () => {
  it('returns an empty string when given an empty string', () => {
    expect(strip('')).toBe('')
  })

  it('returns an the input string when given a string with no emojis', () => {
    expect(strip('abc')).toBe('abc')
  })

  it('returns an input string with an emoji removed when given an input string with one emoji', () => {
    expect(strip('a ☕ c')).toBe('a c')
  })

  it('returns an input string with multiple emojis removed when given an input string with multiple emojis', () => {
    expect(strip('a ☕ b 🍕 c')).toBe('a b c')
  })

  it('preserves spaces around emoji when preserveSpaces is true', () => {
    expect(strip('a ☕ c', { preserveSpaces: true })).toBe('a  c')
  })

  it('removes an emoji that has a skin tone modifier', () => {
    expect(strip('X👍🏽Y')).toBe('XY')
    expect(strip('a👋🏿b✋🏼c')).toBe('abc')
  })
})
