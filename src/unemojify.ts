import { assert } from '@sindresorhus/is'

import { charRegexMatcher } from './utils.js'
import { which } from './which.js'

/**
 * Convert all emojis in a string to their markdown-encoded counterparts.
 */
export const unemojify = (input: string) => {
  assert.string(input)

  const characters = input.match(charRegexMatcher)
  if (characters === null) {
    return input
  }

  return characters
    .map(character => which(character, { markdown: true }) ?? character)
    .join('')
}
