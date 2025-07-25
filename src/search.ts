import is, { assert } from '@sindresorhus/is'

import { emojiData } from './data.js'
import { normalizeName } from './utils.js'

/**
 * Search for emojis containing the provided name or pattern in their name.
 */
export const search = (keyword: RegExp | string) => {
  assert.any([is.string, is.regExp], keyword)

  if (is.string(keyword)) {
    keyword = normalizeName(keyword)
  }

  if (is.regExp(keyword)) {
    const normalizedPattern = normalizeName(keyword.source)
    keyword = new RegExp(normalizedPattern)
  }

  return emojiData
    .filter(([name]) => name.match(keyword))
    .map(([name, emoji]) => ({ emoji, name }))
}
