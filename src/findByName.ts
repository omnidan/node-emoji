import { assert } from '@sindresorhus/is'

import { emojiCodesByName } from './data'
import { normalizeName } from './utils'

export const findByName = (name: string) => {
  assert.string(name)

  const nameNormalized = normalizeName(name)
  const emoji = emojiCodesByName.get(nameNormalized)

  return emoji ? { emoji, key: nameNormalized } : undefined
}
