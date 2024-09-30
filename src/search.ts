import is, { assert } from '@sindresorhus/is'

import { emojiData } from './data.js'
import { normalizeName } from './utils.js'

export const search = (keyword: RegExp | string) => {
  assert.any([is.default.string, is.default.regExp], keyword)

  if (is.default.string(keyword)) {
    keyword = normalizeName(keyword)
  }

  if (is.default.regExp(keyword)) {
    const normalizedPattern = normalizeName(keyword.source)
    keyword = new RegExp(normalizedPattern)
  }

  return emojiData
    .filter(([name]) => name.match(keyword))
    .map(([name, emoji]) => ({ emoji, name }))
}
