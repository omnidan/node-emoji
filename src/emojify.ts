import is from '@sindresorhus/is'

import { findByName } from './findByName.js'
import { asFunction, normalizeName } from './utils.js'

export type EmojifyFormat = (
  name: string,
  part?: string,
  input?: string,
) => string

export interface EmojifyOptions {
  /**
   * The string to fallback to if an emoji was not found.
   */
  fallback?: ((part: string) => string) | string

  /**
   * Adds a middleware layer to modify each matched emoji after parsing.
   */
  format?: EmojifyFormat
}

/**
 * Parse all markdown-encoded emojis in a string.
 */
export const emojify = (
  input: string,
  { fallback, format = name => name }: EmojifyOptions = {},
) => {
  const fallbackFunction =
    fallback === undefined ? fallback : asFunction(fallback)

  is.assert.string(input)
  is.assert.any([is.default.undefined, is.default.function_], fallbackFunction)
  is.assert.function_(format)

  return input.replace(/:[\w\-+]+:/g, part => {
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
