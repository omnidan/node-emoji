import { findByCode } from './findByCode.js'
import { findByName } from './findByName.js'

/**
 * Get the name and character of an emoji.
 */
export const find = (codeOrName: string) => {
  return findByCode(codeOrName) ?? findByName(codeOrName)
}
