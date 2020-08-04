# Emoji [![Travis CI Build Status](https://img.shields.io/travis/omnidan/node-emoji/master.svg?style=for-the-badge)](https://travis-ci.org/omnidan/node-emoji)

Simple emoji support for Node.js.

[![NPM Badge](https://nodei.co/npm/node-emoji.png)](https://npmjs.com/package/node-emoji)

## Install

```sh
npm install node-emoji
```

## Usage

```js
const emoji = require("node-emoji");

emoji.get("hot_beverage");
//=> ☕️

emoji.get(":hot_beverage:");
//=> ☕️

emoji.which("☕️");
//=> "hot_beverage"

emoji.emojify("I :heart: :hot_beverage:!");
//=> "I ❤️ ☕️!"

emoji.random();
//=> { key: 'house', emoji: '🏠' }
```

## API

### get(key)

Get an emoji from an emoji name.

### which(emoji)

Get an emoji name from an emoji.

### random()

Get a random emoji.

### search(key)

Search for emojis containing the provided key in their name.

### find(emoji)

Get the data for an emoji.

### has(key)

Check if this library supports a specific emoji.

### replace(string, replacement)

Replace the emojis in a string.

### strip(string, { removeSpaces = true })

Remove all of the emojis from a string.

### emojify(string, { fallback = "", format = (value) => value })

Parse all markdown-encoded emojis in a string.

### unemojify(string)

Convert all emojis in a string to their markdown-encoded counterparts.

### findAll(string)

Find all the emojis in a string.
