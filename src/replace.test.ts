import { describe, expect, it } from '@jest/globals'

import { replace } from './replace'

describe('replace', () => {
  it('returns an empty string when given an empty string', () => {
    expect(replace('', 'b')).toEqual('')
  })

  it('returns the input text when given text without emojis', () => {
    expect(replace('no emojis', 'b')).toEqual('no emojis')
  })

  it('returns a single emoji replacement when given text with one emoji', () => {
    expect(replace('a ☕ c', 'b')).toEqual('a bc')
  })

  it('returns multiple emoji replacement when given text with multiple emojis', () => {
    expect(replace('a ☕ c 🍕 d', 'b')).toEqual('a bc bd')
  })

  it('preserves spaces around emojis when preserveSpaces is true', () => {
    expect(replace('a ☕ c 🍕 d', 'b', { preserveSpaces: true })).toEqual(
      'a b c b d'
    )
  })

  it('replaces with the replacer when given a replacer', () => {
    expect(replace('a 🌭 c', ({ emoji }) => `>${emoji}<`)).toEqual('a >🌭<c')
  })

  it('replaces with the replacer and preserves spaces when given a replacer and preserveSpaces', () => {
    expect(
      replace('a 🌭 c', ({ emoji }) => `>${emoji}<`, {
        preserveSpaces: true,
      })
    ).toEqual('a >🌭< c')
  })

  it('calls the replacer again when given multiple emojis', () => {
    expect(
      replace(
        'a 🌭 b 🌭 🍵☕ c',
        (() => {
          let counter = 0
          const letters = ['w', 'x', 'y', 'z']
          return () => letters[counter++]
        })()
      )
    ).toEqual('a wb xyzc')
  })

  it('strips complex emojis', () => {
    expect(replace('before 👩‍❤️‍💋‍👩 after', '')).toBe('before after')
  })

  it('strips flag emojis', () => {
    expect(replace('There is no flag 🇲🇽', '')).toBe('There is no flag ')
  })

  it('ignores known existing complex emojis', () => {
    expect(replace('Some 🍕❤️‍💋‍☕ emoji', '')).toEqual('Some ❤️‍💋‍☕ emoji')
  })
})
