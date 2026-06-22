import { describe, expect, it } from 'vitest'

import { replace } from './replace.js'

describe('replace', () => {
  it('returns an empty string when given an empty string', () => {
    expect(replace('', 'b')).toBe('')
  })

  it('returns the input text when given text without emojis', () => {
    expect(replace('no emojis', 'b')).toBe('no emojis')
  })

  it('returns a single emoji replacement when given text with one emoji', () => {
    expect(replace('a ☕ c', 'b')).toBe('a bc')
  })

  it('returns multiple emoji replacement when given text with multiple emojis', () => {
    expect(replace('a ☕ c 🍕 d', 'b')).toBe('a bc bd')
  })

  it('preserves spaces around emojis when preserveSpaces is true', () => {
    expect(replace('a ☕ c 🍕 d', 'b', { preserveSpaces: true })).toBe(
      'a b c b d',
    )
  })

  it('replaces with the replacer when given a replacer', () => {
    expect(replace('a 🌭 c', ({ emoji }) => `>${emoji}<`)).toBe('a >🌭<c')
  })

  it('replaces with the replacer and preserves spaces when given a replacer and preserveSpaces', () => {
    expect(
      replace('a 🌭 c', ({ emoji }) => `>${emoji}<`, {
        preserveSpaces: true,
      }),
    ).toBe('a >🌭< c')
  })

  it('calls the replacer again when given multiple emojis', () => {
    expect(
      replace(
        'a 🌭 b 🌭 🍵☕ c',
        (() => {
          let counter = 0
          const letters = ['w', 'x', 'y', 'z']
          return () => letters[counter++]
        })(),
      ),
    ).toBe('a wb xyzc') // cspell:disable-line
  })

  it('strips complex emojis', () => {
    expect(replace('before 👩‍❤️‍💋‍👩 after', '')).toBe('before after')
  })

  it('strips flag emojis', () => {
    expect(replace('There is no flag 🇲🇽', '')).toBe('There is no flag ')
  })

  it('ignores known existing complex emojis', () => {
    expect(replace('Some 🍕❤️‍💋‍☕ emoji', '')).toBe('Some ❤️‍💋‍☕ emoji')
  })

  it('replaces an emoji that has a skin tone modifier', () => {
    expect(replace('👍🏽', () => 'Z')).toBe('Z')
    expect(replace('thumbs 👍🏽 up', '')).toBe('thumbs up')
  })
})
