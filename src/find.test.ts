import { describe, expect, it } from '@jest/globals'

import { find } from './find'

describe('find', () => {
  it('returns an emoji when given a name', () => {
    expect(find('heart')).toEqual({ emoji: '❤️', key: 'heart' })
  })

  it('returns an emoji when given a :name:', () => {
    expect(find(':heart:')).toEqual({ emoji: '❤️', key: 'heart' })
  })

  it('returns an emoji when given a code', () => {
    expect(find('❤')).toEqual({ emoji: '❤', key: 'heart' })
  })

  it('returns the base emoji when given an alternate emoji code', () => {
    expect(find('❤️')).toEqual({ emoji: '❤', key: 'heart' })
  })

  it('returns undefined when given an unknown name', () => {
    expect(find('unknown_emoji')).toBeUndefined()
  })

  it('returns undefined when given an unknown :name:', () => {
    expect(find('unknown_emoji')).toBeUndefined()
  })
})
