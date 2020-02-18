import test from 'ava'
import emoji from '.'

test('get', t => {
  t.is(emoji.get('hot beverage'), '☕')
  t.is(emoji.get(':hot beverage:'), '☕')
})

test('which', t => {
  t.is(emoji.which('☕'), 'hot beverage')
  t.is(emoji.which('☕', { markdown: true }), ':hot beverage:')
})

test('has', t => {
  t.true(emoji.has('☕'))
  t.true(emoji.has('hot beverage'))
  t.true(emoji.has(':hot beverage:'))
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
  t.is(emoji.emojify('a :hot beverage: c'), 'a ☕ c')
  t.is(emoji.emojify('a :hot beverage: c :idontexist: d'), 'a ☕ c  d')
})

test('unemojify', t => {
  t.is(emoji.unemojify('a ☕ c'), 'a :hot beverage: c')
  t.is(emoji.unemojify('a ☕ 🌭 c'), 'a :hot beverage: :hot dog: c')
})

test('search', t => {
  t.deepEqual(emoji.search('hundred'), [{ key: 'hundred points', emoji: '💯' }])
})

test('find', t => {
  t.deepEqual(emoji.find('💯'), { key: 'hundred points', emoji: '💯' })
  t.is(emoji.find('a'), null)
})
