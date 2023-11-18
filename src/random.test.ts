import { describe, expect, it } from 'vitest'

import { get } from './get.js'
import { has } from './has.js'
import { random } from './random.js'

describe('random', () => {
  it('returns a random emoji and the corresponding key', () => {
    const result = random()

    expect(has(result.name)).toBe(true)
    expect(result.emoji).toBe(get(result.name))
  })
})
