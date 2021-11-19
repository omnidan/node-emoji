'use strict'
const is = require('@sindresorhus/is')
const charRegex = require('char-regex')()
const emojilib = require('emojilib')
const emojiRegex = require('emoji-regex')()
const skinTone = require('skin-tone')

const { assert } = is

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)]
}

const emojiData = Object.entries(emojilib.lib).map(
  ([name, { char: emoji }]) => [name, emoji]
)

const emojiEntries = new Map(emojiData)
const emojiEntriesInverted = new Map(
  emojiData.map(([name, emoji]) => [emoji, name])
)

function normalizeName(name) {
  if (/:.+:/.test(name)) {
    name = name.slice(1, -1)
  }

  return name
}

exports.replace = (input, replacement, { preserveSpaces = false } = {}) => {
  assert.string(input)
  assert.any([is.string, is.function], replacement)
  assert.boolean(preserveSpaces)

  const replaceFunction =
    typeof replacement === 'function' ? replacement : () => replacement

  const characters = input.match(charRegex)

  if (characters === null) {
    return input
  }

  return characters
    .map((character, index) => {
      const emoji = exports.which(character)

      if (!emoji) {
        return character
      }

      if (!preserveSpaces && characters[index + 1] === ' ') {
        characters[index + 1] = ''
      }

      return replaceFunction(emoji, index, input)
    })
    .join('')
}

exports.get = name => {
  assert.string(name)

  return emojiEntries.get(normalizeName(name))
}

exports.which = (emoji, { markdown = false } = {}) => {
  assert.string(emoji)
  assert.boolean(markdown)

  const result = emojiEntriesInverted.get(skinTone(emoji, 'none'))

  if (result === undefined) {
    return undefined
  }

  return markdown ? `:${result}:` : result
}

exports.random = () => {
  const [name, emoji] = randomItem(emojiData)
  return { name, emoji }
}

exports.search = keyword => {
  assert.string(keyword)

  keyword = normalizeName(keyword)

  return emojiData
    .filter(([name]) => name.includes(keyword))
    .map(([name, emoji]) => ({ name, emoji }))
}

exports.find = emoji => {
  assert.string(emoji)

  const name = exports.which(emoji)

  if (name === undefined) {
    return undefined
  }

  return { name, emoji }
}

exports.has = name => {
  assert.string(name)

  return emojiEntries.has(normalizeName(name)) || emojiEntriesInverted.has(name)
}

exports.strip = (input, { preserveSpaces } = {}) =>
  exports.replace(input, '', { preserveSpaces })

exports.emojify = (input, { fallback = '', format = value => value } = {}) => {
  assert.string(input)

  const fallbackFunction =
    typeof fallback === 'function' ? fallback : () => fallback

  return input
    .split(/:([a-zA-Z0-9_\-+ ]+):/g)
    .map((part, index) => {
      if (index % 2 === 0) {
        return part
      }

      const emoji = exports.get(part)
      return emoji ? format(emoji, part, input) : fallbackFunction(part)
    })
    .join('')
}

exports.unemojify = input => {
  assert.string(input)

  return input
    .match(charRegex)
    .map(character => exports.which(character, { markdown: true }) || character)
    .join('')
}

exports.findAll = input =>
  (exports.emojify(input).match(emojiRegex) || []).map(character =>
    exports.find(character)
  )
