import { replace } from './replace.js'

export interface StripOptions {
  preserveSpaces?: boolean
}

export const strip = (input: string, { preserveSpaces }: StripOptions = {}) =>
  replace(input, '', { preserveSpaces })
