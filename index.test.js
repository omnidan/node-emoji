const { describe, expect, it } = require('@jest/globals')
const emoji = require('.')

describe('node-emoji', () => {
  test('get', () => {
    expect(emoji.get('coffee')).toEqual('☕')
    expect(emoji.get(':coffee:')).toEqual('☕')
  })

  test('which', () => {
    expect(emoji.which('☕')).toEqual('coffee')
    expect(emoji.which('☕', { markdown: true })).toEqual(':coffee:')
    expect(emoji.which('👍🏾')).toEqual('+1')
    expect(emoji.which('👍🏾', { markdown: true })).toEqual(':+1:')
  })

  test('has', () => {
    expect(emoji.has('☕')).toBe(true)
    expect(emoji.has('coffee')).toBe(true)
    expect(emoji.has(':coffee:')).toBe(true)
    expect(emoji.has('idontexist')).toBe(false)
    expect(emoji.has(':idontexist:')).toBe(false)
  })

  test('random', () => {
    const data = emoji.random()
    expect(emoji.has(data.name)).toBe(true)
    expect(emoji.has(data.emoji)).toBe(true)
  })

  test('replace', () => {
    expect(emoji.replace('', 'b')).toEqual('')
    expect(emoji.replace('no emojis', 'b')).toEqual('no emojis')
    expect(emoji.replace('a ☕ c', 'b')).toEqual('a bc')
    expect(emoji.replace('a 🌭 c', () => 'b')).toEqual('a bc')
    expect(
      emoji.replace(
        'a 🌭 b 🌭 🌭🌭 c',
        (() => {
          let counter = 0
          const letters = ['w', 'x', 'y', 'z']
          return () => letters[counter++]
        })()
      )
    ).toEqual('a wb xyzc')
  })

  test('strip', () => {
    expect(emoji.strip('a ☕ c')).toEqual('a c')
    expect(emoji.strip('a ☕ c', { preserveSpaces: false })).toEqual('a c')
    expect(emoji.strip('a ☕ c', { preserveSpaces: true })).toEqual('a  c')
  })

  test('emojify', () => {
    expect(emoji.emojify('a :coffee: c')).toEqual('a ☕ c')
    expect(emoji.emojify('a :coffee: c :idontexist: d')).toEqual('a ☕ c  d')
  })

  test('unemojify', () => {
    expect(emoji.unemojify('a ☕ c')).toEqual('a :coffee: c')
    expect(emoji.unemojify('a ☕ 🌭 c')).toEqual('a :coffee: :hotdog: c')
  })

  test('search', () => {
    expect(emoji.search('100')).toEqual([{ name: '100', emoji: '💯' }])
  })

  test('find', () => {
    expect(emoji.find('💯')).toEqual({ name: '100', emoji: '💯' })
    expect(emoji.find('a')).toEqual(undefined)
  })

  test('findAll', () => {
    expect(emoji.findAll('')).toEqual([])
    expect(emoji.findAll('unrelated')).toEqual([])
    expect(emoji.findAll(':idontexist:')).toEqual([])
    expect(emoji.findAll('I :heart: ☕ and :pizza:!')).toEqual([
      {
        emoji: '❤️',
        name: 'heart',
      },
      {
        emoji: '☕',
        name: 'coffee',
      },
      {
        emoji: '🍕',
        name: 'pizza',
      },
    ])
  })
})
