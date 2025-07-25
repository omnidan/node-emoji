import { describe, expect, it } from 'vitest'

import { unemojify } from './unemojify.js'

describe('unemojify', () => {
  it('returns a blank string when given a blank string', () => {
    expect(unemojify('')).toBe('')
  })

  it('returns a replaced emoji name when given a string with one emoji', () => {
    expect(unemojify('a ☕ c')).toBe('a :hot_beverage: c')
  })

  it('returns multiple replaced emoji names when given a string with multiple emojis', () => {
    expect(unemojify('a ☕ 🌭 c')).toBe('a :hot_beverage: :hot_dog: c')
  })

  it('returns a complex emoji name when given a complex emoji:', () => {
    expect(unemojify('before 👩‍❤️‍💋‍👩 after')).toBe('before :kiss_woman_woman: after')
  })

  it('parses emojis with names next to non-space characters', () => {
    expect(unemojify('I ❤️  ☕️! -  😯⭐️😍  ::: test : : 👍+')).toBe(
      'I :red_heart:  :hot_beverage:! -  :hushed_face::star::smiling_face_with_heart_eyes:  ::: test : : :thumbs_up:+',
    )
  })

  // see issue #21
  it('should parse flags correctly', () => {
    expect(unemojify('The flags of 🇲🇽 and 🇲🇦 are not the same')).toBe(
      'The flags of :flag_mexico: and :flag_morocco: are not the same',
    )
  })
})
