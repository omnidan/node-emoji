/*jslint node: true*/
require('string.prototype.codepointat');
var toArray = require('lodash.toarray');

"use strict";

/**
 * regex to parse emoji in a string - finds emoji, e.g. :coffee:
 */
var parser = /:([a-zA-Z0-9_\-\+]+):/g;

/**
 * Removes colons on either side
 * of the string if present
 * @param  {string} str
 * @return {string}
 */
var trim = function(str) {
  var colonIndex = str.indexOf(':');
  if (colonIndex > -1) {
    // :emoji: (http://www.emoji-cheat-sheet.com/)
    if (colonIndex === str.length - 1) {
      str = str.substring(0, colonIndex);
      return trim(str);
    } else {
      str = str.substr(colonIndex + 1);
      return trim(str);
    }
  }
  return str;
}

/**
 * Adds colons to either side
 * of the string
 * @param {string} str
 * @return {string}
 */
var wrapColons = function(str) {
  return (str && str.length > 0) ? ':' + str + ':' : '';
}

var NON_SPACING_MARK = String.fromCharCode(65039); // 65039 - '️' - 0xFE0F;

/**
 * Emoji namespace
 */
var Emoji = module.exports = {
  emoji: require('./emoji.json')
};

/**
 * get emoji code from name
 * @param  {string} emoji
 * @return {string}
 */
Emoji._get = function _get(emoji) {
  if (Emoji.emoji.hasOwnProperty(emoji)) {
    return Emoji.emoji[emoji];
  }
  return ':' + emoji + ':';
};

/**
 * get emoji code from :emoji: string or name
 * @param  {string} emoji
 * @return {string}
 */
Emoji.get = function get(emoji) {
  emoji = trim(emoji);

  return Emoji._get(emoji);
};

/**
 * get emoji name from code
 * @param  {string} emoji
 * @param  {boolean} includeColons should the result include the ::
 * @return {string}
 */
Emoji.which = function which(emoji_code, includeColons) {
  var word = emojiToCode[emoji_code];
  if (word) {
    return includeColons ? wrapColons(word) : word;
  }

  // Most of the times, the word is already returned by now. Sometimes 
  // we need to handle the non-spacing-mark. If we haven't returned yet, 
  // we're going to try the oposite version, with or without the mark.
  var endsWithMark = emoji_code[emoji_code.length - 1] === NON_SPACING_MARK;
  var alias = endsWithMark 
    ? emoji_code.substr(0, emoji_code.length - 1) 
    : emoji_code + NON_SPACING_MARK;

  word = emojiToCode[alias];

  return includeColons ? wrapColons(word) : word;
};

/**
 * emojify a string (replace :emoji: with an emoji)
 * @param  {string} str
 * @param  {function} on_missing (gets emoji name without :: and returns a proper emoji if no emoji was found)
 * @param  {function} format (wrap the returned emoji in a custom element)
 * @return {string}
 */
Emoji.emojify = function emojify(str, on_missing, format) {
  if (!str) return '';

  return str.split(parser) // parse emoji via regex
            .map(function parseEmoji(s, i) {
              // every second element is an emoji, e.g. "test :fast_forward:" -> [ "test ", "fast_forward" ]
              if (i % 2 === 0) return s;
              var emoji = Emoji._get(s);

              if (emoji.indexOf(':') > -1 && typeof on_missing === 'function') {
                return on_missing(emoji.substr(1, emoji.length-2));
              }

              if (typeof format === 'function') {
                return format(emoji, s);
              }

              return emoji;
            })
            .join('') // convert back to string
  ;
};

/**
 * return a random emoji
 * @return {string}
 */
Emoji.random = function random() {
  var emojiKeys = Object.keys(Emoji.emoji);
  var randomIndex = Math.floor(Math.random() * emojiKeys.length);
  var key = emojiKeys[randomIndex];
  var emoji = Emoji._get(key);
  return {key: key, emoji: emoji};
}

/**
 *  return an collection of potential emoji matches
 *  @param {string} str
 *  @return {Array.<Object>}
 */
Emoji.search = function search(str) {
  var emojiKeys = Object.keys(Emoji.emoji);
  var matcher = trim(str)
  var matchingKeys = emojiKeys.filter(function(key) {
    return key.toString().indexOf(matcher) === 0;
  });
  return matchingKeys.map(function(key) {
    return {
      key: key,
      emoji: Emoji._get(key),
    };
  });
}

var emojiToCode = Object.keys(Emoji.emoji).reduce(function(h,k) {
  return h[Emoji.emoji[k]] = k, h;
}, {});

/**
 * unemojify a string (replace emoji with :emoji:)
 * @param  {string} str
 * @return {string}
 */
Emoji.unemojify = function unemojify(str) {
  if (!str) return '';
  var words = toArray(str);

  return words.map(function(word) {
    var emoji_text = emojiToCode[word];
    if (emoji_text) {
      return ':'+emoji_text+':';
    } 
    return word;
  }).join('');
};
