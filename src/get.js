import { assert } from '@sindresorhus/is'

import { normalizeName } from './utils.js'
import { emojiCodesByName } from './data.js'

export const get = codeOrName => {
  assert.string(codeOrName)

  return emojiCodesByName.get(normalizeName(codeOrName))
}
