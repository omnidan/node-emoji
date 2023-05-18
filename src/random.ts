import { emojiData } from './data'
import { randomItem } from './utils'

export const random = () => {
  const [name, emoji] = randomItem(emojiData)
  return { name, emoji }
}
