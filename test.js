import test from 'ava'
import emoji from '.'

test('get', t => {
  t.is(emoji.get('coffee'), '☕')
  t.is(emoji.get(':coffee:'), '☕')
})

test('which', t => {
  t.is(emoji.which('☕'), 'coffee')
  t.is(emoji.which('☕', { markdown: true }), ':coffee:')
})

test('has', t => {
  t.true(emoji.has('☕'))
  t.true(emoji.has('coffee'))
  t.true(emoji.has(':coffee:'))
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
  t.is(emoji.emojify('a :coffee: c'), 'a ☕ c')
  t.is(emoji.emojify('a :coffee: c :idontexist: d'), 'a ☕ c  d')
})

test('unemojify', t => {
  t.is(emoji.unemojify('a ☕ c'), 'a :coffee: c')
  t.is(emoji.unemojify('a ☕ 🌭 c'), 'a :coffee: :hotdog: c')
})

test('search', t => {
  t.deepEqual(emoji.search('100'), [{ key: '100', emoji: '💯' }])
})

test('find', t => {
  t.deepEqual(emoji.find('💯'), { key: '100', emoji: '💯' })
  t.is(emoji.find('a'), null)
})

test('findAll', t => {
  t.deepEqual(emoji.findAll('I :heart: ☕ and :pizza:!'), [
    {
      emoji: '❤️',
      key: 'heart'
    },
    {
      emoji: '☕',
      key: 'coffee'
    },
    {
      emoji: '🍕',
      key: 'pizza'
    }
  ])
})
