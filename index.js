'use strict'

const ow = require('ow')
const charRegex = require('char-regex')()
const emojiRegex = require('emoji-regex')()
const randomItem = require('random-item')
const skinTone = require('skin-tone')

const emojiData = Object.entries(require('unicode-emoji-json')).map(([emoji, { name }]) => [name, emoji])

const emoji = new Map(emojiData)
const inverted = new Map(emojiData.map(([name, emoji]) => ([emoji, name])))

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

exports.get = name => {
  ow(name, ow.string)

  return emoji.get(normalizeName(name))
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
  const [name, emoji] = randomItem(emojiData)
  return { name, emoji }
}

exports.search = keyword => {
  ow(keyword, ow.string)

  keyword = normalizeName(keyword)

  return emojiData
    .filter(([name]) => name.includes(keyword))
    .map(([name, emoji]) => ({ name, emoji }))
}

exports.find = emoji => {
  ow(emoji, ow.string)

  const name = exports.which(emoji)

  if (name === undefined) {
    return undefined
  }

  return { name, emoji }
}

exports.has = name => {
  ow(name, ow.string)

  return emoji.has(normalizeName(name)) || inverted.has(name)
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
