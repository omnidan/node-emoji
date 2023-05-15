'use strict'
const is = require('@sindresorhus/is')
const charRegex = require('char-regex')()
const emojilib = require('emojilib')
const skinTone = require('skin-tone')

const { assert } = is

function asFunction(input) {
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
function normalizeCode(code) {
  return code.replace(nonSpacingRegex, '')
}

function normalizeName(name) {
  return /:.+:/.test(name) ? name.slice(1, -1) : name
}

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)]
}

const emojiData = Object.entries(emojilib.lib).map(
  ([name, { char: emoji }]) => [name, emoji]
)

const emojiCodesByName = new Map(emojiData)
const emojiNamesByCode = new Map(
  emojiData.map(([name, emoji]) => [normalizeCode(emoji), name])
)

exports.emojify = (input, { fallback, format = name => name } = {}) => {
  const fallbackFunction =
    fallback === undefined ? fallback : asFunction(fallback)

  assert.string(input)
  assert.any([is.undefined, is.function], fallbackFunction)
  assert.function_(format)

  return input.replace(/:([a-zA-Z0-9_\-+]+):/g, part => {
    const found = exports.findByName(part)
    if (found) {
      return format(found.emoji, part, input)
    }

    if (fallbackFunction) {
      return format(fallbackFunction(normalizeName(part)))
    }

    return format(part)
  })
}

exports.find = codeOrName => {
  return exports.findByCode(codeOrName) || exports.findByName(codeOrName)
}

exports.findByCode = code => {
  assert.string(code)

  const emojiNormalized = normalizeCode(code)
  const key = emojiNamesByCode.get(emojiNormalized)

  return key ? { emoji: emojiNormalized, key } : undefined
}

exports.findByName = name => {
  assert.string(name)

  const nameNormalized = normalizeName(name)
  const emoji = emojiCodesByName.get(nameNormalized)

  return emoji ? { emoji, key: nameNormalized } : undefined
}

exports.get = codeOrName => {
  assert.string(codeOrName)

  return emojiCodesByName.get(normalizeName(codeOrName))
}

exports.has = codeOrName => {
  assert.string(codeOrName)

  return (
    emojiCodesByName.has(normalizeName(codeOrName)) ||
    emojiNamesByCode.has(normalizeCode(codeOrName))
  )
}

exports.random = () => {
  const [name, emoji] = randomItem(emojiData)
  return { name, emoji }
}

exports.replace = (input, replacement, { preserveSpaces = false } = {}) => {
  const replace = asFunction(replacement)

  assert.string(input)
  assert.function_(replace)
  assert.boolean(preserveSpaces)

  const characters = input.match(charRegex)
  if (characters === null) {
    return input
  }

  return characters
    .map((character, index) => {
      const found = exports.findByCode(character)
      if (!found) {
        return character
      }

      if (!preserveSpaces && characters[index + 1] === ' ') {
        characters[index + 1] = ''
      }

      return replace(found, index, input)
    })
    .join('')
}

exports.search = keyword => {
  assert.string(keyword)

  keyword = normalizeName(keyword)

  return emojiData
    .filter(([name]) => name.includes(keyword))
    .map(([name, emoji]) => ({ name, emoji }))
}

exports.strip = (input, { preserveSpaces } = {}) =>
  exports.replace(input, '', { preserveSpaces })

exports.unemojify = input => {
  assert.string(input)

  const characters = input.match(charRegex)
  if (characters === null) {
    return input
  }

  return characters
    .map(character => exports.which(character, { markdown: true }) || character)
    .join('')
}

exports.which = (emoji, { markdown = false } = {}) => {
  assert.string(emoji)
  assert.boolean(markdown)

  const result = exports.findByCode(skinTone(emoji, 'none'))
  if (result === undefined) {
    return undefined
  }

  return markdown ? `:${result.key}:` : result.key
}
