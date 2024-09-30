import { replace } from './replace.js'

export interface StripOptions {
  /**
   * Whether to keep the extra space after a stripped emoji.
   */
  preserveSpaces?: boolean
}

/**
 * Remove all the emojis from a string.
 */
export const strip = (input: string, { preserveSpaces }: StripOptions = {}) =>
  replace(input, '', { preserveSpaces })
