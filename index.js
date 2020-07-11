'use strict'

const ow = require('ow')
const charRegex = require('char-regex')()
const emojiRegex = require('emoji-regex')()
const randomItem = require('random-item')
const skinTone = require('skin-tone')

const emojiData = Object.entries(require('emojilib').lib).map(([key, { char: emoji }]) => [key, emoji])

const emoji = new Map(emojiData)
const inverted = new Map(emojiData.map(([key, emoji]) => ([emoji, key])))

function normalizeName (name) {
  if (/:.+:/.test(name)) {
    name = name.slice(1, -1)
  }

  return name
}

function replace (string, replacement, { removeSpaces = false } = {}) {
  ow(string, ow.string)
  ow(replacement, ow.any(ow.string, ow.function))
  ow(removeSpaces, ow.boolean)

  const replaceFunction = typeof replacement === 'function' ? replacement : () => replacement

  const characters = string.match(charRegex)

  if (characters === null) {
    return string
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

      return replaceFunction(emoji, index, string)
    })
    .join('')
}

exports.get = key => {
  ow(key, ow.string)

  return emoji.get(normalizeName(key))
}

exports.which = (emoji, { markdown = false } = {}) => {
  ow(emoji, ow.string)
  ow(markdown, ow.boolean)

  const result = inverted.get(skinTone(emoji, 'none'))

  if (result === undefined) {
    return undefined
  }

  return markdown ? `:${result}:` : result
}

exports.random = () => {
  const [key, emoji] = randomItem(emojiData)
  return { key, emoji }
}

exports.search = key => {
  ow(key, ow.string)

  key = normalizeName(key)

  return emojiData
    .filter(([name]) => name.includes(key))
    .map(([key, emoji]) => ({ key, emoji }))
}

exports.find = emoji => {
  ow(emoji, ow.string)

  const key = exports.which(emoji)

  if (key === undefined) {
    return undefined
  }

  return { key, emoji }
}

exports.has = key => {
  ow(key, ow.string)

  return emoji.has(normalizeName(key)) || inverted.has(key)
}

exports.replace = (string, replacement) => replace(string, replacement)

exports.strip = (string, { removeSpaces = true } = {}) => replace(string, '', { removeSpaces })

exports.emojify = (string, { fallback = '', format = (value) => value } = {}) => {
  ow(string, ow.string)

  return string
    .split(/:([a-zA-Z0-9_\-+ ]+):/g)
    .map((part, index) => {
      if (index % 2 === 0) {
        return part
      }

      const emoji = exports.get(part)
      return emoji ? format(emoji, part, string) : fallback
    })
    .join('')
}

exports.unemojify = string => {
  ow(string, ow.string)

  return string.match(charRegex)
    .map(character => exports.which(character, { markdown: true }) || character)
    .join('')
}

exports.findAll = string => exports.emojify(string).match(emojiRegex).map(character => exports.find(character))
