import emojilib from 'emojilib'

import { normalizeCode } from './utils'

export interface Emoji {
  emoji: string
  key: string
}

export const emojiData = Object.entries(emojilib.lib).map(
  ([name, { char: emoji }]) => [name, emoji] as const
)

export const emojiCodesByName = new Map(emojiData)

export const emojiNamesByCode = new Map(
  emojiData.map(([name, emoji]) => [normalizeCode(emoji), name])
)
