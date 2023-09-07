import { assert, default as is } from '@sindresorhus/is'

import { findByName } from './findByName.js'
import { asFunction, normalizeName } from './utils.js'

export type EmojifyFormat = (
  name: string,
  part?: string,
  input?: string,
) => string

export interface EmojifyOptions {
  fallback?: ((part: string) => string) | string
  format?: EmojifyFormat
}

export const emojify = (
  input: string,
  { fallback, format = name => name }: EmojifyOptions = {},
) => {
  const fallbackFunction =
    fallback === undefined ? fallback : asFunction(fallback)

  assert.string(input)
  assert.any([is.undefined, is.function], fallbackFunction)
  assert.function(format)

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
