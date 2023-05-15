import { assert } from '@sindresorhus/is'

import { emojiCodesByName, emojiNamesByCode } from './data'
import { normalizeName, normalizeCode } from './utils'

export const has = (codeOrName: string) => {
  assert.string(codeOrName)

  return (
    emojiCodesByName.has(normalizeName(codeOrName)) ||
    emojiNamesByCode.has(normalizeCode(codeOrName))
  )
}
