# node-emoji [![Travis CI Build Status](https://img.shields.io/travis/omnidan/node-emoji/master.svg?style=for-the-badge)](https://travis-ci.org/omnidan/node-emoji)

Friendly emoji lookups and parsing utilities for Node.js. ✨

[![NPM Badge](https://nodei.co/npm/node-emoji.png)](https://npmjs.com/package/node-emoji)

`node-emoji` provides a fun, straightforward interface on top of the following excellent libraries:

- [`emojilib`](https://npmjs.org/package/emojilib): provides a list of emojis and keyword search on top of it
- [`skin-tone`](https://npmjs.org/package/skin-tone): helps parse out base emojis from skin tones

It also uses [`char-regex`](https://npmjs.org/package/char-regex) and [`emoji-regex`](https://npmjs.org/package/emoji-regex) on the inside to help parse emojis to and from plain text.

## Install

```sh
npm install node-emoji
```

## Usage

```js
const emoji = require("node-emoji");

emoji.get("unicorn");
// 🦄

emoji.get(":unicorn:");
// 🦄

emoji.which("🦄");
// "unicorn"

emoji.emojify("I :heart: :coffee:!");
// "I ❤️ ☕️!"

emoji.random();
// { name: 'house', emoji: '🏠' }
```

## API

### emoji.get(name)

Get an emoji from an emoji name.

Parameters:

1. **`name`** (`string`): The name of the emoji to get.

```js
const emoji = require("node-emoji");

console.log(emoji.get("unicorn"));
// '🦄'
```

### emoji.which(emoji)

Get an emoji name from an emoji.

Parameters:

1. **`emoji`** (`string`): The emoji to get the name of.

```js
const emoji = require("node-emoji");

console.log(emoji.which("🦄"));
// 'unicorn'
```

### emoji.random()

Get a random emoji.

```js
const emoji = require("node-emoji");

console.log(emoji.random());
// { name: 'unicorn', emoji: '🦄' }
```

### emoji.search(keyword)

Search for emojis containing the provided name in their name.

Parameters:

1. **`keyword`** (`string`): The keyword to search for.

```js
const emoji = require("node-emoji");

console.log(emoji.search("honey"));
// [ { name: 'honeybee', emoji: '🐝' }, { name: 'honey_pot', emoji: '🍯' } ]
```

### emoji.find(emoji)

Get the name and character of an emoji.

Parameters:

1. **`emoji`** (`string`): The emoji to get the data of.

```js
const emoji = require("node-emoji");

console.log(emoji.find("🦄"));
// { name: 'unicorn', emoji: '🦄' }
```

### emoji.has(emoji)

Check if this library supports a specific emoji.

Parameters:

1. **`emoji`** (`string`): The emoji to check.

```js
const emoji = require("node-emoji");

console.log(emoji.has("🦄"));
// true
```

### emoji.replace(input, replacement)

Replace the emojis in a string.

Parameters:

- **`input`** (`string`): The input string.
- **`replacement`** (`string | (emoji: string, index: number, string: InputValueType) => string`): The character to replace the emoji with. Can be either a string or a callback that returns a string.

```js
const emoji = require("node-emoji");

console.log(emoji.replace("The 🦄 is a fictitious animal.", "unicorn"));
// 'The unicorn is a fictitious animal.'
```

### emoji.strip(input, options?)

Remove all of the emojis from a string.

Parameters:

1. **`input`** (`string`): The input string to strip the emojis from.
1. **`options`** _(optional)_:

   - **`preserveSpaces`** (`boolean`): Whether to keep the extra space after a stripped emoji.

```js
const emoji = require("node-emoji");

console.log(emoji.strip("🦄 The unicorn is a fictitious animal."));
// emoji.strip('The unicorn is a fictitious animal.')

console.log(
  emoji.strip("🦄 The unicorn is a fictitious animal.", {
    preserveSpaces: true,
  })
);
// emoji.strip(' The unicorn is a fictitious animal.')
```

### emoji.emojify(input, options?)

Parse all markdown-encoded emojis in a string.

Parameters:

1. **`input`** (`string`): The input string containing the markdown-encoding emojis.
1. **`options`** _(optional)_:
   - **`fallback`** (`string`; default: `""`): The string to fallback to if an emoji was not found.
   - **`format`** (`() => (emoji: string, part: string, string: string) => string`; default: `value => value`): Add a middleware layer to modify each matched emoji after parsing.

```js
const emoji = require("node-emoji");

console.log(emoji.emojify("The :unicorn: is a fictitious animal."));
// emoji.strip('The 🦄 is a fictitious animal.')
```

### emoji.unemojify(input)

Convert all emojis in a string to their markdown-encoded counterparts.

Parameters:

1. **`input`** (`string`): The input string containing the emojis.

```js
const emoji = require("node-emoji");

console.log(emoji.unemojify("The 🦄 is a fictitious animal."));
// emoji.strip('The :unicorn: is a fictitious animal.')
```

### emoji.findAll(input)

Find all of the emojis in a string.

Parameters:

1. **`input`** (`string`): The input string containing the emojis to find.

```js
const emoji = require("node-emoji");

console.log(
  emoji.findAll("The 🦄 is a fictitious animal. 🍕 is an italian food.")
);
// [ { name: 'unicorn', emoji: '🦄' }, { name: 'pizza', emoji: '🍕' } ]
```
