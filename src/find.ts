import { findByName } from './findByName'
import { findByCode } from './findByCode'

export const find = (codeOrName: string) => {
  return findByCode(codeOrName) || findByName(codeOrName)
}
