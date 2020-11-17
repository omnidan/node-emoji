'use strict'

const charRegex = require('char-regex')()
const emojiRegex = require('emoji-regex')()
const randomItem = require('random-item')
const skinTone = require('skin-tone')
const is = require('@sindresorhus/is')
const { assert } = is

const emojiData = Object.entries(require('emojilib').lib).map(([name, { char: emoji }]) => [name, emoji])

const emoji = new Map(emojiData)
const inverted = new Map(emojiData.map(([name, emoji]) => ([emoji, name])))

function normalizeName (name) {
  if (/:.+:/.test(name)) {
    name = name.slice(1, -1)
  }

  return name
}

function replace (input, replacement, { removeSpaces = false } = {}) {
  assert.string(input)
  assert.any([is.string, is.function], replacement)
  assert.boolean(removeSpaces)

  const replaceFunction = typeof replacement === 'function' ? replacement : () => replacement

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

      if (removeSpaces && characters[index + 1] === ' ') {
        characters[index + 1] = ''
      }

      return replaceFunction(emoji, index, input)
    })
    .join('')
}

exports.get = name => {
  assert.string(name)

  return emoji.get(normalizeName(name))
}

exports.which = (emoji, { markdown = false } = {}) => {
  assert.string(emoji)
  assert.boolean(markdown)

  const result = inverted.get(skinTone(emoji, 'none'))

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

  return emoji.has(normalizeName(name)) || inverted.has(name)
}

exports.replace = (input, replacement) => replace(input, replacement)

exports.strip = (input, { removeSpaces = true } = {}) => replace(input, '', { removeSpaces })

exports.emojify = (input, { fallback = '', format = (value) => value } = {}) => {
  assert.string(input)

  return input
    .split(/:([a-zA-Z0-9_\-+ ]+):/g)
    .map((part, index) => {
      if (index % 2 === 0) {
        return part
      }

      const emoji = exports.get(part)
      return emoji ? format(emoji, part, input) : fallback
    })
    .join('')
}

exports.unemojify = input => {
  assert.string(input)

  return input.match(charRegex)
    .map(character => exports.which(character, { markdown: true }) || character)
    .join('')
}

exports.findAll = input => exports.emojify(input).match(emojiRegex).map(character => exports.find(character))
