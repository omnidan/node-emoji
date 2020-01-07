#!/usr/bin/env node

const _ = require("lodash")
const meow = require("meow")

const emoji = require(".")

const { input: args } = meow(`
    Usage
      $ emoji <function> <arguments>

    Examples
      $ emoji which ☕
      hot beverage
`);

console.log(emoji[_.first(args)](..._.tail(args)))
