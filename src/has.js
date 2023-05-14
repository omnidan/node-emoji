import { assert } from '@sindresorhus/is'

import { emojiCodesByName, emojiNamesByCode } from './data.js'
import { normalizeName, normalizeCode } from './utils.js'

export const has = codeOrName => {
  assert.string(codeOrName)

  return (
    emojiCodesByName.has(normalizeName(codeOrName)) ||
    emojiNamesByCode.has(normalizeCode(codeOrName))
  )
}
