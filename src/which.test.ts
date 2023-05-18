import { describe, expect, it } from '@jest/globals'

import { which } from './which'

describe('which', () => {
  it('returns the emoji name when given an emoji', () => {
    expect(which('☕')).toBe('coffee')
  })

  it('returns the emoji name as markdown when specified as markdown', () => {
    expect(which('☕', { markdown: true })).toBe(':coffee:')
  })

  it('returns the emoji name when given a skin toned emoji', () => {
    expect(which('👍🏾')).toBe('+1')
  })

  it('returns the emoji name as markdown when specified as markdown', () => {
    expect(which('👍🏾', { markdown: true })).toBe(':+1:')
  })

  // see issue #21
  it('should work for flags', () => {
    expect(which('🇲🇽')).toEqual('mexico')
    expect(which('🇲🇦')).toEqual('morocco')
  })
})
