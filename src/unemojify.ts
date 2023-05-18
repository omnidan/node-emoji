import { assert } from '@sindresorhus/is'

import { charRegexMatcher } from './utils'
import { which } from './which'

export const unemojify = (input: string) => {
  assert.string(input)

  const characters = input.match(charRegexMatcher)
  if (characters === null) {
    return input
  }

  return characters
    .map(character => which(character, { markdown: true }) || character)
    .join('')
}
