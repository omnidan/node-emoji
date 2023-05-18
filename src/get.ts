import { assert } from '@sindresorhus/is'

import { normalizeName } from './utils'
import { emojiCodesByName } from './data'

export const get = (codeOrName: string) => {
  assert.string(codeOrName)

  return emojiCodesByName.get(normalizeName(codeOrName))
}
