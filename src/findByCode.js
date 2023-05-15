import { assert } from '@sindresorhus/is'

import { emojiNamesByCode } from './data.js'
import { normalizeCode } from './utils.js'

export const findByCode = code => {
  assert.string(code)

  const emojiNormalized = normalizeCode(code)
  const key = emojiNamesByCode.get(emojiNormalized)

  return key ? { emoji: emojiNormalized, key } : undefined
}
