import { assert } from '@sindresorhus/is'

import { emojiCodesByName } from './data.js'
import { normalizeName } from './utils.js'

export const get = (codeOrName: string) => {
  assert.string(codeOrName)

  return emojiCodesByName.get(normalizeName(codeOrName))
}
