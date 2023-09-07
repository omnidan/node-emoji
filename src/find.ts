import { findByCode } from './findByCode.js'
import { findByName } from './findByName.js'

export const find = (codeOrName: string) => {
  return findByCode(codeOrName) ?? findByName(codeOrName)
}
