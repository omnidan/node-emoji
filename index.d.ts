declare namespace emoji {
  export interface EmojiData {
    /**
    The emoji name.
    */
    name: string

    /**
    The emoji.
    */
    emoji: string
  }
}

declare const emoji: {
  /**
  Get an emoji from an emoji name.
  
  @param name The name of the emoji to get.

  @example
  ```
  const emoji = require('node-emoji')

  console.log(emoji.get('unicorn'))
  //=> '🦄'
  ```
  */
  get(name: string): string | undefined

  /**
  Get an emoji name from an emoji.

  @param emoji The emoji to get the name of.

  @example
  ```
  const emoji = require('node-emoji')

  console.log(emoji.which('🦄'))
  //=> 'unicorn'
  ```
  */
  which(emoji: string): string | undefined

  /**
  Get a random emoji.

  @example
  ```
  const emoji = require('node-emoji')

  console.log(emoji.random())
  //=> { name: 'unicorn', emoji: '🦄' }
  ```
  */
  random(): string

  /**
  Search for emojis containing the provided name in their name.

  @param keyword The keyword to search for.

  @example
  ```
  const emoji = require('node-emoji')

  console.log(emoji.search('honey'))
  //=> [ { name: 'honeybee', emoji: '🐝' }, { name: 'honey_pot', emoji: '🍯' } ]
  ```
  */
  search(keyword: string): emoji.EmojiData[]

  /**
  Get the name and character of an emoji.

  @param emoji The emoji to get the data of.

  @example
  ```
  const emoji = require('node-emoji')

  console.log(emoji.find('🦄'))
  //=> { name: 'unicorn', emoji: '🦄' }
  ```
  */
  find(emoji: string): emoji.EmojiData | undefined

  /**
  Check if this library supports a specific emoji.

  @param emoji The emoji to check.

  @example
  ```
  const emoji = require('node-emoji')

  console.log(emoji.has('🦄'))
  //=> true
  ```
  */
  has(emoji: string): boolean

  /**
  Replace the emojis in a string.

  @param input The input string.
  @param replacement The character to replace the emoji with.

  @example
  ```
  const emoji = require('node-emoji')

  console.log(emoji.replace('The 🦄 is a fictitious animal.', 'unicorn'))
  //=> 'The unicorn is a fictitious animal.'
  ```
  */
  replace<InputValueType extends string>(input: InputValueType, replacement: string | ((emoji: string, index: number, string: InputValueType) => string)): string

  /**
  Remove all of the emojis from a string.

  @param input The input string to strip the emojis from.
  
  @example
  ```
  const emoji = require('node-emoji')

  console.log(emoji.strip('🦄 The unicorn is a fictitious animal.'))
  //=> emoji.strip('The unicorn is a fictitious animal.')
  ```
  */
  strip(input: string, options?: {
    /**
    Automatically remove the extra space after a stripped emoji.

    @default true
    */
    removeSpaces?: boolean
  }): string

  /**
  Parse all markdown-encoded emojis in a string.

  @param input The input string containing the markdown-encoding emojis.

  @example
  ```
  const emoji = require('node-emoji')

  console.log(emoji.emojify('The :unicorn: is a fictitious animal.'))
  //=> emoji.strip('The 🦄 is a fictitious animal.')
  ```
  */
  emojify<InputValueType extends string>(input: InputValueType, options?: {
    /**
    The string to fallback to if an emoji was not found.

    @default ''
    */
    fallback?: string

    /**
    Add a middleware layer to modify each matched emoji after parsing.
    
    @default value => value
    */
    format?: (emoji: string, part: string, string: InputValueType) => string
  }): string

  /**
  Convert all emojis in a string to their markdown-encoded counterparts.

  @param input The input string containing the emojis.

  @example
  ```
  const emoji = require('node-emoji')

  console.log(emoji.unemojify('The 🦄 is a fictitious animal.'))
  //=> emoji.strip('The :unicorn: is a fictitious animal.')
  ```
  */
  unemojify(input: string): string

  /**
  Find all of the emojis in a string.

  @param input The input string containing the emojis to find.

  @example
  ```
  const emoji = require('node-emoji')

  console.log(emoji.findAll('The 🦄 is a fictitious animal. 🍕 is an italian food.'))
  //=> [ { name: 'unicorn', emoji: '🦄' }, { name: 'pizza', emoji: '🍕' } ]
  ```
  */
  findAll(input: string): emoji.EmojiData[]
}

export = emoji
