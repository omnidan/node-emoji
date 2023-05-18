import emojilib from 'emojilib'

import { normalizeCode } from './utils.js'

export const emojiData = [
  // First we fill in all possible names for each emoji
  ...Object.entries(emojilib).flatMap(([emoji, names]) => {
    return names.map(name => [name, emoji])
  }),
  // Then we give priority to the first name for each emoji
  ...Object.entries(emojilib).flatMap(([emoji, [name]]) => {
    const results = [[name, emoji]]

    if (name.startsWith('flag_')) {
      results.push([name.slice('flag_'.length), emoji])
    }

    if (name.startsWith('smiling_face_with_')) {
      results.push([name.slice('smiling_face_with_'.length), emoji])
    }

    if (name.endsWith('_face')) {
      results.push([name.slice(0, name.length - '_face'.length), emoji])
    }

    return results
  }),
]

export const emojiCodesByName = new Map(emojiData)

export const emojiNamesByCode = new Map(
  emojiData.map(([name, emoji]) => [normalizeCode(emoji), name])
)
