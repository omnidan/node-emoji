import { assert, default as is } from '@sindresorhus/is'

import { findByName } from './findByName.js'
import { asFunction, normalizeName } from './utils.js'

export const emojify = (input, { fallback, format = name => name } = {}) => {
  const fallbackFunction =
    fallback === undefined ? fallback : asFunction(fallback)

  assert.string(input)
  assert.any([is.undefined, is.function], fallbackFunction)
  assert.function_(format)

  return input.replace(/:([a-zA-Z0-9_\-+]+):/g, part => {
    const found = findByName(part)
    if (found) {
      return format(found.emoji, part, input)
    }

    if (fallbackFunction) {
      return format(fallbackFunction(normalizeName(part)))
    }

    return format(part)
  })
}
