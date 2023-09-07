import { describe, expect, it } from 'vitest'

import { which } from './which.js'

describe('which', () => {
  it('returns a simple emoji name when given an emoji', () => {
    expect(which('☕')).toBe('coffee')
  })

  it('returns a simple emoji name as markdown when specified as markdown', () => {
    expect(which('☕', { markdown: true })).toBe(':coffee:')
  })

  it('returns a skin toned emoji name when given a skin toned emoji', () => {
    expect(which('👍🏾')).toBe('+1')
  })

  it('returns a skin toned emoji name as markdown when specified as markdown', () => {
    expect(which('👍🏾', { markdown: true })).toBe(':+1:')
  })

  // see issue #21
  it('should work for flags', () => {
    expect(which('🇲🇽')).toBe('mexico')
    expect(which('🇲🇦')).toBe('morocco')
  })
})
