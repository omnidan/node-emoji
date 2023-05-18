import { assert } from '@sindresorhus/is'

import { asFunction, charRegexMatcher } from './utils'
import { findByCode } from './findByCode'
import { Emoji } from './data'

export type ReplaceReplacement = (
  emoji: Emoji,
  index: number,
  string: string
) => string

export const replace = (
  input: string,
  replacement: string | ReplaceReplacement,
  { preserveSpaces = false } = {}
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
