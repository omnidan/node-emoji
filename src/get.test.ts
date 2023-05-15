import { describe, expect, it } from '@jest/globals'

import { get } from './get'

describe('get', () => {
  it('returns an emoji code when given a string', () => {
    expect(get('coffee')).toEqual('☕')
  })

  it('returns the contained emoji code when given markdown emoji', () => {
    expect(get(':coffee:')).toEqual('☕')
  })

  it('returns undefined when given an emoji', () => {
    expect(get('👯')).toBeUndefined()
  })

  it('returns undefined when given an unknown word', () => {
    expect(get('idontexist')).toBeUndefined()
  })
})
