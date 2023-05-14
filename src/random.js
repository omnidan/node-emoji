import { emojiData } from './data.js'
import { randomItem } from './utils.js'

export const random = () => {
  const [name, emoji] = randomItem(emojiData)
  return { name, emoji }
}
