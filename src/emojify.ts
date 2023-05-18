import { assert, default as is } from '@sindresorhus/is'

import { findByName } from './findByName'
import { asFunction, normalizeName } from './utils'

export type EmojifyFormat = (
  name: string,
  part?: string,
  input?: string
) => string

export interface EmojifyOptions {
  fallback?: string | ((part: string) => string)
  format?: EmojifyFormat
}

export const emojify = (
  input: string,
  { fallback, format = name => name }: EmojifyOptions = {}
) => {
  const fallbackFunction =
    fallback === undefined ? fallback : asFunction(fallback)

  assert.string(input)
  assert.any([is.undefined, is.function_], fallbackFunction)
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
