const { strict: assert } = require('node:assert')

const emoji = require('../lib/index.cjs')

assert.equal(emoji.emojify(':wave:'), 'intentional failure')
