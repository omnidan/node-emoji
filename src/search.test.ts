import { describe, expect, it } from '@jest/globals'

import { search } from './search'

describe('search', () => {
  it('returns a single pair when given a one-of emoji name', () => {
    expect(search('100')).toEqual([{ name: '100', emoji: '💯' }])
  })

  it('returns multiple emojis when given a common substring', () => {
    expect(search('cartwheel')).toEqual([
      {
        emoji: '🤸‍♀️',
        name: 'woman_cartwheeling',
      },
      {
        emoji: '🤸‍♂️',
        name: 'man_cartwheeling',
      },
    ])
  })

  it('should match when you include the colon', () => {
    expect(search(':cartwheel:')).toEqual([
      {
        emoji: '🤸‍♀️',
        name: 'woman_cartwheeling',
      },
      {
        emoji: '🤸‍♂️',
        name: 'man_cartwheeling',
      },
    ])
  })

  it('returns an empty array when no matching emojis are found', () => {
    expect(search('notAnEmoji')).toEqual([])
  })
})
