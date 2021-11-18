/*jslint node: true*/
/*jslint expr: true*/
/*global describe, it*/
'use strict'

const should = require('should')
const emoji = require('../index')

describe('emoji.js', function () {
  describe('get(emoji)', function () {
    it('should return an emoji code when passed a string', function () {
      const coffee = emoji.get('coffee')
      should.exist(coffee)
      coffee.should.be.exactly('☕')
    })

    it('should return emoji code back when passed an emoji code', function () {
      const dancers = emoji.get('👯‍♀️')
      should.exist(dancers)
      dancers.should.be.exactly('👯‍♀️')
    })

    it('should support github flavored markdown emoji', function () {
      const coffee = emoji.get(':coffee:')
      should.exist(coffee)
      coffee.should.be.exactly('☕')
    })
  })

  describe('random()', function () {
    it('should return a random emoji and the corresponding key', function () {
      const result = emoji.random()
      should.exist(result)
      should.exist(result.key)
      should.exist(result.emoji)
      result.emoji.should.be.exactly(emoji.get(result.key))
    })
  })

  describe('which(emoji_code)', function () {
    it('should return name of the emoji', function () {
      const coffee = emoji.which('☕')
      should.exist(coffee)
      coffee.should.be.exactly('coffee')
    })

    it('should work for differently formed characters', function () {
      const umbrella = emoji.which('☔')
      should.exist(umbrella)
      umbrella.should.be.exactly('umbrella_with_rain_drops')
    })

    it('should return the same name for differently formed characters', function () {
      const umbrella1 = emoji.which('☔')
      should.exist(umbrella1)
      const umbrella2 = emoji.which('☔️')
      should.exist(umbrella2)
      umbrella1.should.equal(umbrella2)
    })

    it('should work for flags', function () {
      const mexico = emoji.which('🇲🇽')
      should.exists(mexico)
      mexico.should.be.exactly('flag-mx')

      const marocco = emoji.which('🇲🇦')
      should.exists(marocco)
      marocco.should.be.exactly('flag-ma')

      // see issue #21
      mexico.should.not.equal(marocco)
    })
  })

  describe('emojify(str)', function () {
    it('should parse :emoji: in a string and replace them with the right emoji', function () {
      const coffee = emoji.emojify(
        'I :heart:  :coffee:! -  :hushed::star::heart_eyes:  ::: test : : :+1:+'
      )
      should.exist(coffee)
      coffee.should.be.exactly('I ❤️  ☕! -  😯⭐😍  ::: test : : 👍+')
    })

    it('should handle flags correctly', function () {
      const flags = emoji.emojify(
        'Mexico :flag-mx: and Marocco :flag-ma: are not the same'
      )
      should.exists(flags)
      flags.should.be.exactly('Mexico 🇲🇽 and Marocco 🇲🇦 are not the same')
    })

    it('should leave unknown emoji', function () {
      const coffee = emoji.emojify('I :unknown_emoji: :star: :another_one:')
      should.exist(coffee)
      coffee.should.be.exactly('I :unknown_emoji: ⭐ :another_one:')
    })

    it('should replace unknown emoji using provided cb function', function () {
      const coffee = emoji.emojify(
        'I :unknown_emoji: :star: :another_one:',
        function (name) {
          return name
        }
      )
      should.exist(coffee)
      coffee.should.be.exactly('I unknown_emoji ⭐ another_one')
    })

    it('should wrap emoji using provided format function', function () {
      const coffee = emoji.emojify(
        'I :heart: :coffee:',
        null,
        function (code, name) {
          return '<img alt="' + code + '" src="' + name + '.png" />'
        }
      )

      should.exist(coffee)
      coffee.should.be.exactly(
        'I <img alt="❤️" src="heart.png" /> <img alt="☕" src="coffee.png" />'
      )
    })

    it('should not wrap unknown using provided format function', function () {
      const coffee = emoji.emojify(
        'I :unknown_emoji: :coffee:',
        null,
        function (code, name) {
          return '<img alt="' + code + '" src="' + name + '.png" />'
        }
      )

      should.exist(coffee)
      coffee.should.be.exactly(
        'I :unknown_emoji: <img alt="☕" src="coffee.png" />'
      )
    })

    it('should replace unknown emojis and wrap known emojis using cb functions', function () {
      const coffee = emoji.emojify(
        'I :unknown_emoji: :coffee:',
        function (name) {
          return name
        },
        function (code, name) {
          return '<img alt="' + code + '" src="' + name + '.png" />'
        }
      )

      should.exist(coffee)
      coffee.should.be.exactly(
        'I unknown_emoji <img alt="☕" src="coffee.png" />'
      )
    })
  })

  it('should return an emoji code', function () {
    const coffee = emoji.emoji.coffee
    should.exist(coffee)
    coffee.should.be.exactly('☕')
  })

  describe('search(str)', function () {
    it('should return partially matched emojis', function () {
      const matchingEmojis = emoji.search('cof')
      matchingEmojis.length.should.not.eql(0)
      matchingEmojis.forEach(function (emoji) {
        emoji.key.should.match(/^cof/)
      })
    })

    it('should only include emojies that begin with the search', function () {
      const matchingEmojis = emoji.search('ca')
      matchingEmojis.length.should.not.eql(0)
      matchingEmojis.forEach(function (emoji) {
        const index = emoji.key.indexOf('ca')
        index.should.be.exactly(0)
      })
    })

    it('should match when you include the colon', function () {
      const matchingEmojis = emoji.search(':c')
      matchingEmojis.length.should.not.eql(0)
      matchingEmojis.forEach(function (emoji) {
        const index = emoji.key.indexOf('c')
        index.should.be.exactly(0)
      })
    })

    it('should return an empty array when no matching emojis are found', function () {
      const matchingEmojis = emoji.search('notAnEmoji')
      matchingEmojis.length.should.be.exactly(0)
    })
  })

  describe('unemojify(str)', function () {
    it('should parse emoji and replace them with :emoji:', function () {
      const coffee = emoji.unemojify('I ❤️  ☕️! -  😯⭐️😍  ::: test : : 👍+')
      should.exist(coffee)
      coffee.should.be.exactly(
        'I :heart:  :coffee:! -  :hushed::star::heart_eyes:  ::: test : : :thumbsup:+'
      )
    })

    it('should leave unknown emoji', function () {
      // Emoji :melting_face: (U+1FAE0) Unicode 14.0 draft: https://emojipedia.org/unicode-14.0
      const coffee = emoji.unemojify('I ⭐️ :another_one: 🫠')
      should.exist(coffee)
      coffee.should.be.exactly('I :star: :another_one: 🫠')
    })

    it('should parse a complex emoji like woman-kiss-woman and replace it with :woman-kiss-woman:', function () {
      const coffee = emoji.unemojify('I love 👩‍❤️‍💋‍👩')
      should.exist(coffee)
      coffee.should.be.exactly('I love :woman-kiss-woman:')
    })

    it('should parse flags correctly', function () {
      const flags = emoji.unemojify('The flags of 🇲🇽 and 🇲🇦 are not the same')
      should.exists(flags)
      flags.should.be.exactly(
        'The flags of :flag-mx: and :flag-ma: are not the same'
      )
    })
  })

  describe('find emoji', function () {
    it('Should be able to find a emoji by :name:', function () {
      const result = emoji.find(':heart:')
      should.exists(result)
      result.should.eql({ emoji: '❤️', key: 'heart' })
    })

    it('Should be able to find an emoji by name', function () {
      const result = emoji.find('heart')
      should.exists(result)
      result.should.eql({ emoji: '❤️', key: 'heart' })
    })

    it('Should be able to find an emoji by code', function () {
      const result = emoji.find('❤')
      should.exists(result)
      result.should.eql({ emoji: '❤️', key: 'heart' })
    })

    it('Should return `undefined` for unknown emojis', function () {
      const result = emoji.find('unknown_emoji')
      should.not.exists(result)
    })
  })

  describe('hasEmoji', function () {
    it('Should be able to check a emoji by :name:', function () {
      const result = emoji.hasEmoji(':heart:')
      result.should.equal(true)
    })

    it('Should be able to check a emoji by name', function () {
      const result = emoji.hasEmoji('heart')
      result.should.equal(true)
    })

    it('Should be able to check a emoji by code text form)', function () {
      const result = emoji.hasEmoji('❤')
      result.should.equal(true)
    })

    it('Should be able to check a emoji by code in constiant form', function () {
      const result = emoji.hasEmoji('❤️')
      result.should.equal(true)
    })

    it('Should return false for unknown emoji names', function () {
      const result = emoji.hasEmoji(':pizza-kiss-coffee:')
      result.should.equal(false)
    })

    it('Should return false for unknown emoji codes', function () {
      const result = emoji.hasEmoji('🍕❤️‍💋‍☕')
      result.should.equal(false)
    })
  })

  describe('replace', function () {
    it('Should be able to strip emojis', function () {
      const result = emoji.replace(
        'Host: eseaps001 Addr: 10.XX.XX.XX: - ⚠️ 〰️ 〰️ low disk space',
        '',
        true
      )
      result.should.equal('Host: eseaps001 Addr: 10.XX.XX.XX: - low disk space')
    })

    it('Should keep the trailing spaces when not explicitly told to clean', function () {
      const result = emoji.replace(
        'Host: eseaps001 Addr: 10.XX.XX.XX: - ⚠️ 〰️ 〰️ low disk space',
        ''
      )
      result.should.equal(
        'Host: eseaps001 Addr: 10.XX.XX.XX: -    low disk space'
      )
    })

    it('Should be able to strip a emoji by code text form', function () {
      const result = emoji.replace('I ❤ coffee', '', true)
      result.should.equal('I coffee')
    })

    it('Should be able to strip a emoji by code in constiant form', function () {
      const result = emoji.replace('I ❤️ cleaning', '', true)
      result.should.equal('I cleaning')
    })

    it('Should be able to strip complex emojis', function () {
      const result = emoji.replace('Where did this 👩‍❤️‍💋‍👩 happen?', '', true)
      result.should.equal('Where did this happen?')
    })

    it('Should be able to strip flag emojis', function () {
      const result = emoji.replace('There is no flag 🇲🇽', '', true)
      result.should.equal('There is no flag')
    })

    it('Should be able to replace by callback function', function () {
      const result = emoji.replace(
        'There is no ⚠ on my hard drive',
        function (emoji) {
          return emoji.key
        }
      )
      result.should.equal('There is no warning on my hard drive')
    })

    it('Non existing complex emojis are known to be ignored', function () {
      const result = emoji.replace('Some 🍕❤️‍💋‍☕ emoji', '')
      result.should.not.equal('Some emoji')
    })
  })

  describe('strip', function () {
    it('Should be able to strip emojis', function () {
      const result = emoji.strip(
        'Host: eseaps001 Addr: 10.XX.XX.XX: - ⚠️ 〰️ 〰️ low disk space'
      )
      result.should.equal('Host: eseaps001 Addr: 10.XX.XX.XX: - low disk space')
    })
  })
})
