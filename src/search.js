import { assert } from '@sindresorhus/is'

import { emojiData } from './data.js'
import { normalizeName } from './utils.js'

export const search = keyword => {
  assert.string(keyword)

  keyword = normalizeName(keyword)

  return emojiData
    .filter(([name]) => name.includes(keyword))
    .map(([name, emoji]) => ({ name, emoji }))
}
