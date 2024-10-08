import { assert } from '@sindresorhus/is'

import { Emoji } from './data.js'
import { findByCode } from './findByCode.js'
import { asFunction, charRegexMatcher } from './utils.js'

export type ReplaceReplacement = (
  emoji: Emoji,
  index: number,
  string: string,
) => string

/**
 * Replace the emojis in a string.
 */
export const replace = (
  input: string,
  replacement: ReplaceReplacement | string,
  { preserveSpaces = false } = {},
) => {
  const replace = asFunction(replacement)

  assert.string(input)
  assert.function_(replace)
  assert.boolean(preserveSpaces)

  const characters = input.match(charRegexMatcher)
  if (characters === null) {
    return input
  }

  return characters
    .map((character, index) => {
      const found = findByCode(character)
      if (!found) {
        return character
      }

      if (!preserveSpaces && characters[index + 1] === ' ') {
        characters[index + 1] = ''
      }

      return replace(found, index, input)
    })
    .join('')
}
