import { assert } from '@sindresorhus/is'

import { emojiCodesByName } from './data.js'
import { normalizeName } from './utils.js'

export const findByName = name => {
  assert.string(name)

  const nameNormalized = normalizeName(name)
  const emoji = emojiCodesByName.get(nameNormalized)

  return emoji ? { emoji, key: nameNormalized } : undefined
}
