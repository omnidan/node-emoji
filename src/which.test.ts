import { describe, expect, it } from 'vitest'

import { which } from './which.js'

describe('which', () => {
  it('returns a simple emoji name when given an emoji', () => {
    expect(which('☕')).toBe('hot_beverage')
  })

  it('returns a simple emoji name as markdown when specified as markdown', () => {
    expect(which('☕', { markdown: true })).toBe(':hot_beverage:')
  })

  it('returns a skin toned emoji name when given a skin toned emoji', () => {
    expect(which('👍🏾')).toBe('thumbs_up')
  })

  it('returns a skin toned emoji name as markdown when specified as markdown', () => {
    expect(which('👍🏾', { markdown: true })).toBe(':thumbs_up:')
  })

  // see issue #21
  it('should work for flags', () => {
    expect(which('🇲🇽')).toBe('flag_mexico')
    expect(which('🇲🇦')).toBe('flag_morocco')
  })
})
