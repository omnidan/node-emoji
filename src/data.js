import emojilib from 'emojilib'

import { normalizeCode } from './utils.js'

export const emojiData = Object.entries(emojilib.lib).map(
  ([name, { char: emoji }]) => [name, emoji]
)

export const emojiCodesByName = new Map(emojiData)

export const emojiNamesByCode = new Map(
  emojiData.map(([name, emoji]) => [normalizeCode(emoji), name])
)
