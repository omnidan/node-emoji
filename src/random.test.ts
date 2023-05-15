import { describe, expect, it } from '@jest/globals'

import { has } from './has'
import { get } from './get'
import { random } from './random'

describe('random', () => {
  it('returns a random emoji and the corresponding key', () => {
    const result = random()

    expect(has(result.name)).toBe(true)
    expect(result.emoji).toBe(get(result.name))
  })
})
