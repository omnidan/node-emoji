'use strict';

const _ = require('lodash');
const {default: ow} = require('ow');

const emojiData = require('emoji.json').map(({name: key, char: emoji}) => [key, emoji]);
const invertedEmojiData = emojiData.map(([key, emoji]) => ([emoji, key]));

const emoji = new Map(emojiData);
const inverted = new Map(invertedEmojiData);

function normalizeName(name) {
	if (/:.+:/.test(name)) {
		name = name.slice(1, -1);
	}

	return name;
}

function replace(string, replacement, {removeSpaces = false} = {}) {
	ow(string, ow.string);
	ow(replacement, ow.any(ow.string, ow.function));
	ow(removeSpaces, ow.boolean);

	const replaceFn = _.isFunction(replacement) ? replacement : () => replacement;

	const chars = string.split('');

	return chars
		.map((char, i) => {
			const emoji = core.which(char);

			if (!emoji) {
				return char;
			}

			if (removeSpaces && chars[i + 1] === ' ') {
				chars[i + 1] = '';
			}

			return replaceFn(emoji, i, string);
		})
		.join('');
}

const core = {
	get(key) {
		ow(key, ow.string);

		return emoji.get(normalizeName(key));
	},

	which(emoji, {markdown = false} = {}) {
		ow(emoji, ow.string);
		ow(markdown, ow.boolean);

		const res = inverted.get(emoji);

		if (_.isUndefined(res)) {
			return null;
		}

		return markdown ? `:${res}:` : res;
	},

	random() {
		const [key, emoji] = _.sample(emojiData);
		return {key, emoji};
	},

	search(key) {
		ow(key, ow.string);

		return emojiData
			.filter(([name]) => name.includes(key))
			.map(([key, emoji]) => ({key, emoji}));
	},

	find(emoji) {
		ow(emoji, ow.string);

		const key = core.which(emoji);

		if (_.isNull(key)) {
			return null;
		}

		return {key, emoji};
	},

	has(key) {
		ow(key, ow.string);

		return emoji.has(normalizeName(key)) || inverted.has(key);
	},

	replace(string, replacement) {
		return replace(string, replacement);
	},

	strip(string, {removeSpaces = true} = {}) {
		return replace(string, '', {removeSpaces});
	},

	emojify(string, {fallback = '', format = _.identity} = {}) {
		ow(string, ow.string);

		return string
			.split(/:([a-zA-Z0-9_\-+ ]+):/g)
			.map((str, i) => {
				if (i % 2 === 0) {
					return str;
				}

				const emoji = core.get(str);

				return emoji ? format(emoji, str, string) : fallback;
			})
			.join('');
	},

	unemojify(string) {
		ow(string, ow.string);

		return string
			.split('')
			.map(char => core.which(char, {markdown: true}) || char)
			.join('');
	}
};

module.exports = core;
