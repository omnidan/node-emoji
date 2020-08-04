import test from 'ava'
import emoji from '.'

test('get', t => {
  t.is(emoji.get('hot_beverage'), '☕')
  t.is(emoji.get(':hot_beverage:'), '☕')
})

test('which', t => {
  t.is(emoji.which('☕'), 'hot_beverage')
  t.is(emoji.which('☕', { markdown: true }), ':hot_beverage:')
  t.is(emoji.which('👍🏾'), 'thumbs_up')
})

test('has', t => {
  t.true(emoji.has('☕'))
  t.true(emoji.has('hot_beverage'))
  t.true(emoji.has(':hot_beverage:'))
  t.false(emoji.has('idontexist'))
})

test('random', t => {
  const data = emoji.random()
  t.true(emoji.has(data.key))
  t.true(emoji.has(data.emoji))
})

test('replace', t => {
  t.is(emoji.replace('a ☕ c', 'b'), 'a b c')
  t.is(emoji.replace('a 🌭 c', () => 'b'), 'a b c')
})

test('strip', t => {
  t.is(emoji.strip('a ☕ c'), 'a c')
  t.is(emoji.strip('a ☕ c', { removeSpaces: false }), 'a  c')
})

test('emojify', t => {
  t.is(emoji.emojify('a :hot_beverage: c'), 'a ☕ c')
  t.is(emoji.emojify('a :hot_beverage: c :idontexist: d'), 'a ☕ c  d')
})

test('unemojify', t => {
  t.is(emoji.unemojify('a ☕ c'), 'a :hot_beverage: c')
  t.is(emoji.unemojify('a ☕ 🌭 c'), 'a :hot_beverage: :hot_dog: c')
})

test('search', t => {
  t.deepEqual(emoji.search('hundred_points'), [{ key: 'hundred_points', emoji: '💯' }])
})

test('find', t => {
  t.deepEqual(emoji.find('💯'), { key: 'hundred_points', emoji: '💯' })
  t.is(emoji.find('a'), undefined)
})

test('findAll', t => {
  t.deepEqual(emoji.findAll('I :red_heart: ☕ and :pizza:!'), [
    {
      emoji: '❤️',
      key: 'red_heart'
    },
    {
      emoji: '☕',
      key: 'hot_beverage'
    },
    {
      emoji: '🍕',
      key: 'pizza'
    }
  ])
})
