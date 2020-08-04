declare interface EmojiData {
  /** The emoji name. */
  name: string

  /** The emoji. */
  emoji: string
}

declare type replaceCallback<T = any> = (emoji: string, index: number, string: T) => string

declare const emoji: {
  /** Get an emoji from an emoji name. */
  get(name: string): string | undefined

  /** Get an emoji name from an emoji. */
  which(emoji: string): string | undefined

  /** Get a random emoji. */
  random(): string

  /** Search for emojis containing the provided name in their name. */
  search(keyword: string): EmojiData[]

  /** Get the data for an emoji. */
  find(emoji: string): EmojiData | undefined

  /** Check if this library supports a specific emoji. */
  has(name: string): boolean

  /** Replace the emojis in a string. */
  replace<T extends string>(input: T, replacement: string | replaceCallback<T>): string

  /** Remove all of the emojis from a string. */
  strip(input: string, options?: {
    /**
     * Automatically remove the space after a stripped emoji.
     * @default true
    */
    removeSpaces?: boolean
  }): string

  /** Parse all markdown-encoded emojis in a string. */
  emojify<T extends string>(input: T, options?: {
    /**
     * The string to fallback to if an emoji was not found.
     * @default ''
     */
    fallback?: string

    /**
     * Add a middleware layer to modify each matched emoji after parsing.
     * @default (value) => value
    */
    format?: (emoji: string, str: string, string: T) => string
  }): string

  /** Convert all emojis in a string to their markdown-encoded counterparts. */
  unemojify(input: string): string

  /** Find all the emojis in a string. */
  findAll(input: string): EmojiData[]
}

export = emoji
