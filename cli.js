#!/usr/bin/env node

const _ = require('lodash')
const meow = require('meow')
const chalk = require('chalk')

const emoji = require('.')

const { input: args } = meow(`
    Usage
      $ emoji <function> <arguments>

    Examples
      $ emoji which ☕
      hot beverage
`)

const cmd = emoji[_.first(args)]

if (!cmd) console.log(chalk.red('Command not found!'))
else console.log(cmd(..._.tail(args)))
