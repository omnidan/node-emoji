import { assert } from '@sindresorhus/is'

import { charRegexMatcher } from './utils.js'
import { which } from './which.js'

export const unemojify = input => {
  assert.string(input)

  const characters = input.match(charRegexMatcher)
  if (characters === null) {
    return input
  }

  return characters
    .map(character => which(character, { markdown: true }) || character)
    .join('')
}
