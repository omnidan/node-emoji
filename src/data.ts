import { normalizeCode } from './utils.js'

export interface Emoji {
  emoji: string
  key: string
}

const emojiDataSource = require('unicode-emoji-json') as {
  [key: string]: { slug: string }
}

export const emojiData = Object.entries(emojiDataSource).map(
  ([emoji, { slug: name }]) => {
    return [name, emoji] as const
  },
)

export const emojiCodesByName = new Map(emojiData)

export const emojiNamesByCode = new Map(
  emojiData.map(([name, emoji]) => {
    return [normalizeCode(emoji), name]
  }),
)
