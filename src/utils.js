import charRegex from 'char-regex'

export const charRegexMatcher = charRegex()

export function asFunction(input) {
  return typeof input === 'function' ? input : () => input
}

/**
 * Non spacing mark contained by some emoticons (65039 - '️' - 0xFE0F).
 *
 * @remarks
 * It's the 'Variant Form', which provides more information so that emoticons
 * can be rendered as more colorful graphics. FE0E is a unicode text version
 * whereas FE0F should be rendered as a graphical version.
 * The code gracefully degrades.
 */
const NON_SPACING_MARK = String.fromCharCode(65039)

const nonSpacingRegex = new RegExp(NON_SPACING_MARK, 'g')

/**
 * Removes the non-spacing-mark from the emoji code.
 *
 * @remarks
 * Never send a stripped version to clients, as it kills graphical emoticons.
 */
export function normalizeCode(code) {
  return code.replace(nonSpacingRegex, '')
}

export function normalizeName(name) {
  return /:.+:/.test(name) ? name.slice(1, -1) : name
}

export function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)]
}
