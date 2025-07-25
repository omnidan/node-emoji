import { describe, expect, it } from 'vitest'

import { find } from './find.js'

describe('find', () => {
  it('returns an emoji when given a name', () => {
    expect(find('red_heart')).toEqual({ emoji: '❤️', key: 'red_heart' })
  })

  it('returns an emoji when given a :name:', () => {
    expect(find(':red_heart:')).toEqual({ emoji: '❤️', key: 'red_heart' })
  })

  it('returns an emoji when given a code', () => {
    expect(find('❤')).toEqual({ emoji: '❤', key: 'red_heart' })
  })

  it('returns the base emoji when given an alternate emoji code', () => {
    expect(find('❤️')).toEqual({ emoji: '❤', key: 'red_heart' })
  })

  it('returns undefined when given an unknown name', () => {
    expect(find('unknown_emoji')).toBeUndefined()
  })

  it('returns undefined when given an unknown :name:', () => {
    expect(find('unknown_emoji')).toBeUndefined()
  })
})
