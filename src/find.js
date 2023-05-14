import { findByName } from './findByName.js'
import { findByCode } from './findByCode.js'

export const find = codeOrName => {
  return findByCode(codeOrName) || findByName(codeOrName)
}
