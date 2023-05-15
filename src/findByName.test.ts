import { describe, expect, it } from '@jest/globals'

import { findByName } from './findByName'

describe('findByName', () => {
  it('returns an emoji when given a name', () => {
    expect(findByName('heart')).toEqual({ emoji: '❤️', key: 'heart' })
  })

  it('returns an emoji when given a :name:', () => {
    expect(findByName(':heart:')).toEqual({ emoji: '❤️', key: 'heart' })
  })

  it('returns undefined when given an emoji code', () => {
    expect(findByName('❤')).toBeUndefined()
  })

  it('returns undefined when given an alternate emoji code', () => {
    expect(findByName('❤️')).toBeUndefined()
  })

  it('returns undefined when given an unknown name', () => {
    expect(findByName('unknown_emoji')).toBeUndefined()
  })

  it('returns undefined when given an unknown :name:', () => {
    expect(findByName('unknown_emoji')).toBeUndefined()
  })
})
