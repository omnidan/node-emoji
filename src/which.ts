import { assert } from '@sindresorhus/is'
import skinTone from 'skin-tone'

import { findByCode } from './findByCode.js'

export interface WhichOptions {
  markdown?: boolean
}

/**
 * Get an emoji name from an emoji.
 */
export const which = (
  emoji: string,
  { markdown = false }: WhichOptions = {},
) => {
  assert.string(emoji)
  assert.boolean(markdown)

  const result = findByCode(skinTone(emoji, 'none'))
  if (result === undefined) {
    return undefined
  }

  return markdown ? `:${result.key}:` : result.key
}
