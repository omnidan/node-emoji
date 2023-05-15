import { describe, expect, it } from '@jest/globals'

import { unemojify } from './unemojify'

describe('unemojify', () => {
  it('returns a blank string when given a blank string', () => {
    expect(unemojify('')).toBe('')
  })

  it('returns a replaced emoji name when given a string with one emoji', () => {
    expect(unemojify('a ☕ c')).toEqual('a :coffee: c')
  })

  it('returns multiple replaced emoji names when given a string with multiple emojis', () => {
    expect(unemojify('a ☕ 🌭 c')).toEqual('a :coffee: :hotdog: c')
  })

  it('returns a complex emoji name when given a complex emoji:', () => {
    expect(unemojify('before 👩‍❤️‍💋‍👩 after')).toBe(
      'before :couplekiss_woman_woman: after'
    )
  })

  it('parses emojis with names next to non-space characters', () => {
    expect(unemojify('I ❤️  ☕️! -  😯⭐️😍  ::: test : : 👍+')).toBe(
      'I :heart:  :coffee:! -  :hushed::star::heart_eyes:  ::: test : : :+1:+'
    )
  })

  it('ignores only unknown emoji when given a string with some valid, some unknown emojis', () => {
    // Emoji :melting_face: (U+1FAE0) Unicode 14.0 draft: https://emojipedia.org/unicode-14.0
    expect(unemojify('I ⭐️ :another_one: 🫠')).toBe('I :star: :another_one: 🫠')
  })

  // see issue #21
  it('should parse flags correctly', () => {
    expect(unemojify('The flags of 🇲🇽 and 🇲🇦 are not the same')).toBe(
      'The flags of :mexico: and :morocco: are not the same'
    )
  })
})
