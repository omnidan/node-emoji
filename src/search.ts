import { assert } from '@sindresorhus/is'

import { emojiData } from './data.js'
import { normalizeName } from './utils.js'

/**
 * Search for emojis containing the provided name in their name.
 */
export const search = (keyword: string) => {
  assert.string(keyword)

  keyword = normalizeName(keyword)

  return emojiData
    .filter(([name]) => name.includes(keyword))
    .map(([name, emoji]) => ({ emoji, name }))
}
