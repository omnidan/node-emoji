import { assert } from '@sindresorhus/is'

import { asFunction, charRegexMatcher } from './utils.js'
import { findByCode } from './findByCode.js'

export const replace = (
  input,
  replacement,
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
