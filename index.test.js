const { describe, expect, it } = require('@jest/globals')
const emoji = require('.')

describe('emojify', () => {
  it('parses :emoji: in a string and replaces them with the right emoji', () => {
    expect(
      emoji.emojify(
        'I :heart:  :coffee:! -  :hushed::star::heart_eyes:  ::: test : : :+1:+'
      )
    ).toBe('I ❤️  ☕! -  😯⭐😍  ::: test : : 👍+')
  })

  it('handles flags correctly', () => {
    expect(
      emoji.emojify('Mexico :mexico: and Morocco :morocco: are not the same')
    ).toBe('Mexico 🇲🇽 and Morocco 🇲🇦 are not the same')
  })

  it('removes unknown emoji with the empty string by default', () => {
    expect(emoji.emojify('I :unknown_emoji: :star: :another_one:')).toBe(
      'I  ⭐ '
    )
  })

  it('replaces unknown emoji with the fallback when a fallback string is provided', () => {
    expect(
      emoji.emojify('I :unknown_emoji: :star: :another_one:', {
        fallback: 'unknown',
      })
    ).toBe('I unknown ⭐ unknown')
  })

  it('replaces unknown emoji with the fallback when a fallback string is provided', () => {
    expect(
      emoji.emojify('I :unknown_emoji: :star: :another_one:', {
        fallback: part => `(${part})`,
      })
    ).toBe('I (unknown_emoji) ⭐ (another_one)')
  })

  it('formats emoji when given a format function', () => {
    expect(
      emoji.emojify('I :unknown_emoji: :star: :another_one:', {
        format: name => `[${name}]`,
      })
    ).toBe('I  [⭐] ')
  })
})

describe('find', () => {
  it('finds a emoji by :name:', () => {
    expect(emoji.find(':heart:')).toBe({ emoji: '❤️', key: 'heart' })
  })

  it('finds an emoji by name', () => {
    expect(emoji.find('heart')).toBe({ emoji: '❤️', key: 'heart' })
  })

  it('finds an alternate emoji by code', () => {
    expect(emoji.find('❤')).toBe({ emoji: '❤️', key: 'heart' })
  })

  it('returns `undefined` for unknown emojis', () => {
    expect(emoji.find('unknown_emoji')).toBeUndefined()
  })
})

describe('findAll', () => {
  it('returns an empty array when the input is blank', () => {
    expect(emoji.findAll('')).toEqual([])
  })

  it('returns an empty array when the input is unrelated', () => {
    expect(emoji.findAll('unrelated')).toEqual([])
  })

  it('returns an empty array when the input is an unknown emoji', () => {
    expect(emoji.findAll(':idontexist:')).toEqual([])
  })

  it('returns a matched emoji when the input contain an emoji', () => {
    expect(emoji.findAll(':sparkling_heart:')).toEqual([
      {
        emoji: '💖',
        name: 'sparkling_heart',
      },
    ])
  })

  it('returns matched emojis when the input contains emojis', () => {
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

describe('get', () => {
  it('returns an emoji code when passed a string', () => {
    expect(emoji.get('coffee')).toEqual('☕')
  })

  it('returns emoji code back when passed an emoji code', () => {
    expect(emoji.get('👯‍♀️')).toEqual('👯‍♀️')
  })

  it('supports github flavored markdown emoji', () => {
    expect(emoji.get(':coffee:')).toEqual('☕')
  })
})

describe('has', () => {
  it('returns true when given an emoji', () => {
    expect(emoji.has('☕')).toBe(true)
  })

  it('returns true when given the name of an emoji', () => {
    expect(emoji.has('coffee')).toBe(true)
  })

  it('returns true when given a markdown emoji name', () => {
    expect(emoji.has(':coffee:')).toBe(true)
  })

  it('returns false when given unrelated text', () => {
    expect(emoji.has('idontexist')).toBe(false)
  })

  it('returns false when given an unknown markdown name', () => {
    expect(emoji.has(':idontexist:')).toBe(false)
  })

  it('returns true when given a emoji in base form', () => {
    expect(emoji.has('❤️')).toBe(true)
  })

  it('returns true when given an emoji in code text form', () => {
    expect(emoji.has('❤')).toBe(true)
  })

  it('returns false when given multiple emoji codes', () => {
    expect(emoji.has('🍕❤️‍💋‍☕')).toBe(false)
  })
})

describe('random', () => {
  it('returns a random emoji and the corresponding key', () => {
    const result = emoji.random()

    expect(emoji.has(result.name)).toBe(true)
    expect(result.emoji).toBe(emoji.get(result.name))
  })
})

describe('replace', () => {
  it('returns an empty string when given an empty string', () => {
    expect(emoji.replace('', 'b')).toEqual('')
  })

  it('returns the input text when given text without emojis', () => {
    expect(emoji.replace('no emojis', 'b')).toEqual('no emojis')
  })

  it('returns a single emoji replacement when given text with one emoji', () => {
    expect(emoji.replace('a ☕ c', 'b')).toEqual('a bc')
  })

  it('returns multiple emoji replacement when given text with multiple emojis', () => {
    expect(emoji.replace('a ☕ c 🍕 d', 'b')).toEqual('a bc bd')
  })

  it('preserves spaces around emojis when preserveSpaces is true', () => {
    expect(emoji.replace('a ☕ c 🍕 d', 'b', { preserveSpaces: true })).toEqual(
      'a b c b d'
    )
  })

  it('replaces with the replacer when given a replacer', () => {
    expect(emoji.replace('a 🌭 c', () => 'b')).toEqual('a bc')
  })

  it('calls the replacer again when given multiple emojis', () => {
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

  it('strips complex emojis', () => {
    expect(emoji.replace('Where did this 👩‍❤️‍💋‍👩 happen?', '')).toBe(
      'Where did this happen?'
    )
  })

  it('strips flag emojis', () => {
    expect(emoji.replace('There is no flag 🇲🇽', '')).toBe('There is no flag ')
  })

  it('ignores known existing complex emojis', () => {
    expect(emoji.replace('Some 🍕❤️‍💋‍☕ emoji', '')).toEqual(
      'Some ❤️‍💋‍☕ emoji'
    )
  })
})

describe('search', () => {
  it('returns a single pair when given a one-of emoji name', () => {
    expect(emoji.search('100')).toEqual([{ name: '100', emoji: '💯' }])
  })

  it('returns multiple emojis when given a common substring', () => {
    expect(emoji.search('cartwheel')).toEqual([
      {
        emoji: '🤸‍♀️',
        name: 'woman_cartwheeling',
      },
      {
        emoji: '🤸‍♂️',
        name: 'man_cartwheeling',
      },
    ])
  })

  it('should match when you include the colon', () => {
    expect(emoji.search(':cartwheel:')).toEqual([
      {
        emoji: '🤸‍♀️',
        name: 'woman_cartwheeling',
      },
      {
        emoji: '🤸‍♂️',
        name: 'man_cartwheeling',
      },
    ])
  })

  it('returns an empty array when no matching emojis are found', () => {
    expect(emoji.search('notAnEmoji')).toEqual([])
  })
})

describe('strip', () => {
  it('returns an empty string when given an empty string', () => {
    expect(emoji.strip('')).toEqual('')
  })

  it('returns an the input string when given a string with no emojis', () => {
    expect(emoji.strip('abc')).toEqual('abc')
  })

  it('returns an input string with an emoji removed when given an input string with one emoji', () => {
    expect(emoji.strip('a ☕ c')).toEqual('a c')
  })

  it('returns an input string with multiple emojis removed when given an input string with multiple emojis', () => {
    expect(emoji.strip('a ☕ b 🍕 c')).toEqual('a b c')
  })

  it('preserves spaces around emoji when preserveSpaces is true', () => {
    expect(emoji.strip('a ☕ c', { preserveSpaces: true })).toEqual('a  c')
  })
})

describe('unemojify', () => {
  it('returns a replaced emoji name when given a string with one emoji', () => {
    expect(emoji.unemojify('a ☕ c')).toEqual('a :coffee: c')
  })

  it('returns multiple replaced emoji names when given a string with multiple emojis', () => {
    expect(emoji.unemojify('a ☕ 🌭 c')).toEqual('a :coffee: :hotdog: c')
  })

  it('returns a complex emoji name when given a complex emoji:', () => {
    expect(emoji.unemojify('I love 👩‍❤️‍💋‍👩')).toBe('I love :couplekiss_woman_woman:')
  })

  it('parses emojis with names next to non-space characters', () => {
    expect(emoji.unemojify('I ❤️  ☕️! -  😯⭐️😍  ::: test : : 👍+')).toBe(
      'I :heart:  :coffee:! -  :hushed::star::heart_eyes:  ::: test : : :thumbsup:+'
    )
  })

  it('ignores only unknown emoji when given a string with some valid, some unknown emojis', () => {
    // Emoji :melting_face: (U+1FAE0) Unicode 14.0 draft: https://emojipedia.org/unicode-14.0
    expect(emoji.unemojify('I ⭐️ :another_one: 🫠')).toBe(
      'I ⭐️ :another_one: 🫠'
    )
  })

  // see issue #21
  it('should parse flags correctly', () => {
    expect(emoji.unemojify('The flags of 🇲🇽 and 🇲🇦 are not the same')).toBe(
      'The flags of :mexico: and :morocco: are not the same'
    )
  })
})

describe('which', () => {
  it('returns the emoji name when given an emoji', () => {
    expect(emoji.which('☕')).toBe('coffee')
  })

  it('returns the emoji name as markdown when specified as markdown', () => {
    expect(emoji.which('☕', { markdown: true })).toBe(':coffee:')
  })

  it('returns the emoji name when given a skin toned emoji', () => {
    expect(emoji.which('👍🏾')).toBe('+1')
  })

  it('returns the emoji name as markdown when specified as markdown', () => {
    expect(emoji.which('👍🏾', { markdown: true })).toBe(':+1:')
  })

  // see issue #21
  it('should work for flags', () => {
    expect(emoji.which('🇲🇽')).toEqual('mexico')
    expect(emoji.which('🇲🇦')).toEqual('morocco')
  })
})
