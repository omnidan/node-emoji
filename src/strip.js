import { replace } from './replace.js'

export const strip = (input, { preserveSpaces } = {}) =>
  replace(input, '', { preserveSpaces })
