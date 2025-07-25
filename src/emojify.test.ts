import { describe, expect, it } from 'vitest'

import { emojify } from './emojify.js'

describe('emojify', () => {
  it('handles flags correctly', () => {
    expect(
      emojify(
        'Mexico :flag_mexico: and Morocco :flag_morocco: are not the same',
      ),
    ).toBe('Mexico 🇲🇽 and Morocco 🇲🇦 are not the same')
  })

  it('leaves unknown emoji when no fallback is provided', () => {
    expect(emojify('I :unknown_emoji: :star: :another_one:')).toBe(
      'I :unknown_emoji: ⭐ :another_one:',
    )
  })

  it('replaces unknown emoji with the fallback when a fallback string is provided', () => {
    expect(
      emojify('I :unknown_emoji: :star: :another_one:', {
        fallback: 'unknown',
      }),
    ).toBe('I unknown ⭐ unknown')
  })

  it('replaces unknown emoji with the fallback when a fallback function is provided', () => {
    expect(
      emojify('I :unknown_emoji: :star: :another_one:', {
        fallback: part => `(${part})`,
      }),
    ).toBe('I (unknown_emoji) ⭐ (another_one)')
  })

  it('parses a single :emoji: in a string when there is only one emoji', () => {
    expect(emojify(':hot_beverage:!')).toBe('☕!')
  })

  it('parses multiple :emoji: in a string when there are multiple emoji', () => {
    expect(
      emojify(
        'I :red_heart:  :hot_beverage:! -  :hushed_face::star::smiling_face_with_heart_eyes:  ::: test : : :thumbs_up:+',
      ),
    ).toBe('I ❤️  ☕! -  😯⭐😍  ::: test : : 👍+')
  })

  it('formats emoji when given a format function', () => {
    expect(
      emojify('I :unknown_emoji: :star: :another_one:', {
        format: name => `[${name}]`,
      }),
    ).toBe('I [:unknown_emoji:] [⭐] [:another_one:]')
  })
})
