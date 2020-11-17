# Emoji [![Travis CI Build Status](https://img.shields.io/travis/omnidan/node-emoji/master.svg?style=for-the-badge)](https://travis-ci.org/omnidan/node-emoji)

Simple emoji support for Node.js.

[![NPM Badge](https://nodei.co/npm/node-emoji.png)](https://npmjs.com/package/node-emoji)

## Install

```sh
npm install node-emoji
```

## Usage

```js
const emoji = require('node-emoji')

emoji.get('unicorn')
//=> 🦄

emoji.get(':unicorn:')
//=> 🦄

emoji.which('🦄')
//=> "unicorn"

emoji.emojify('I :heart: :coffee:!')
//=> "I ❤️ ☕️!"

emoji.random()
//=> { name: 'house', emoji: '🏠' }
```

## API

### emoji.get(name)

Get an emoji from an emoji name.

#### name

Type: `string`

The name of the emoji to get.

```js
const emoji = require('node-emoji')

console.log(emoji.get('unicorn'))
//=> '🦄'
```

### emoji.which(emoji)

Get an emoji name from an emoji.

#### emoji

Type: `string`

The emoji to get the name of.

```js
const emoji = require('node-emoji')

console.log(emoji.which('🦄'))
//=> 'unicorn'
```

### emoji.random()

Get a random emoji.

```js
const emoji = require('node-emoji')

console.log(emoji.random())
//=> { name: 'unicorn', emoji: '🦄' }
```

### emoji.search(keyword)

Search for emojis containing the provided name in their name.

#### keyword

Type: `string`

The keyword to search for.

```js
const emoji = require('node-emoji')

console.log(emoji.search('honey'))
//=> [ { name: 'honeybee', emoji: '🐝' }, { name: 'honey_pot', emoji: '🍯' } ]
```

### emoji.find(emoji)

Get the name and character of an emoji.

#### emoji

Type: `string`

The emoji to get the data of.

```js
const emoji = require('node-emoji')

console.log(emoji.find('🦄'))
//=> { name: 'unicorn', emoji: '🦄' }
```

### emoji.has(emoji)

Check if this library supports a specific emoji.

#### emoji

Type: `string`

The emoji to check.

```js
const emoji = require('node-emoji')

console.log(emoji.has('🦄'))
//=> true
```

### emoji.replace(input, replacement)

Replace the emojis in a string.

#### input

Type: `string`

The input string.

#### replacement

Type: `string | (emoji: string, index: number, string: InputValueType) => string`

The character to replace the emoji with. Can be either a string or a callback that returns a string.

```js
const emoji = require('node-emoji')

console.log(emoji.replace('The 🦄 is a fictitious animal.', 'unicorn'))
//=> 'The unicorn is a fictitious animal.'
```

### emoji.strip(input, options?)

Remove all of the emojis from a string.

#### input

Type: `string`

The input string to strip the emojis from.

#### options

Type: `object`

##### removeSpaces

Type: `boolean`\
Default: `true`.

Automatically remove the extra space after a stripped emoji.

```js
const emoji = require('node-emoji')

console.log(emoji.strip('🦄 The unicorn is a fictitious animal.'))
//=> emoji.strip('The unicorn is a fictitious animal.')
```

### emoji.emojify(input, options?)

Parse all markdown-encoded emojis in a string.

#### input

Type: `string`

The input string containing the markdown-encoding emojis.

#### options

Type: `object`

##### fallback

Type: `string`\
Default: `""`

The string to fallback to if an emoji was not found.

##### format

Type: `() => (emoji: string, part: string, string: string) => string`\
Default: `value => value`

Add a middleware layer to modify each matched emoji after parsing.

```js
const emoji = require('node-emoji')

console.log(emoji.emojify('The :unicorn: is a fictitious animal.'))
//=> emoji.strip('The 🦄 is a fictitious animal.')
```

### emoji.unemojify(input)

Convert all emojis in a string to their markdown-encoded counterparts.

#### input

Type: `string`

The input string containing the emojis.

```js
const emoji = require('node-emoji')

console.log(emoji.unemojify('The 🦄 is a fictitious animal.'))
//=> emoji.strip('The :unicorn: is a fictitious animal.')
```

### emoji.findAll(input)

Find all of the emojis in a string.

#### input

Type: `string`

The input string containing the emojis to find.

```js
const emoji = require('node-emoji')

console.log(emoji.findAll('The 🦄 is a fictitious animal. 🍕 is an italian food.'))
//=> [ { name: 'unicorn', emoji: '🦄' }, { name: 'pizza', emoji: '🍕' } ]
```
