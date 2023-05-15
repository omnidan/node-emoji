import { assert } from '@sindresorhus/is'

import { emojiNamesByCode } from './data'
import { normalizeCode } from './utils'

export const findByCode = (code: string) => {
  assert.string(code)

  const emojiNormalized = normalizeCode(code)
  const key = emojiNamesByCode.get(emojiNormalized)

  return key ? { emoji: emojiNormalized, key } : undefined
}
