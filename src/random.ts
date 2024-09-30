import { emojiData } from './data.js'
import { randomItem } from './utils.js'

/**
 * Get a random emoji.
 */
export const random = () => {
  const [name, emoji] = randomItem(emojiData)
  return { emoji, name }
}
