'use strict'

const { default: ow } = require('ow')
const charRegex = require('char-regex')()
const emojiRegex = require('emoji-regex')()

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

  const replaceFn = typeof replacement === 'function' ? replacement : () => replacement

  const chars = string.match(charRegex)

  if (chars === null) {
    return string
  }

  return chars
    .map((char, i) => {
      const emoji = exports.which(char)

      if (!emoji) {
        return char
      }

      if (removeSpaces && chars[i + 1] === ' ') {
        chars[i + 1] = ''
      }

      return replaceFn(emoji, i, string)
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

  const res = inverted.get(skinTone(emoji, 'none'))

  if (res === undefined) {
    return undefined
  }

  return markdown ? `:${res}:` : res
}

exports.random = () => {
  const [key, emoji] = emojiData[Math.floor(Math.random() * emojiData.length)]
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

exports.replace = (string, replacement) => {
  return replace(string, replacement)
}

exports.strip = (string, { removeSpaces = true } = {}) => {
  return replace(string, '', { removeSpaces })
}

exports.emojify = (string, { fallback = '', format = (value) => value } = {}) => {
  ow(string, ow.string)

  return string
    .split(/:([a-zA-Z0-9_\-+ ]+):/g)
    .map((str, i) => {
      if (i % 2 === 0) {
        return str
      }

      const emoji = exports.get(str)
      return emoji ? format(emoji, str, string) : fallback
    })
    .join('')
}

exports.unemojify = (string) => {
  ow(string, ow.string)

  return string.match(charRegex)
    .map(char => exports.which(char, { markdown: true }) || char)
    .join('')
}

exports.findAll = (string) => {
  return exports.emojify(string).match(emojiRegex).map(char => exports.find(char))
}
