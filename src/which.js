import { assert } from '@sindresorhus/is'
import skinTone from 'skin-tone'

import { findByCode } from './findByCode.js'

export const which = (emoji, { markdown = false } = {}) => {
  assert.string(emoji)
  assert.boolean(markdown)

  const result = findByCode(skinTone(emoji, 'none'))
  if (result === undefined) {
    return undefined
  }

  return markdown ? `:${result.key}:` : result.key
}
