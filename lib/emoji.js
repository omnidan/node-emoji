/*jslint node: true*/
"use strict";

/**
 * regex to parse emoji in a string - finds emoji, e.g. :coffee:
 */
var parser = /:([a-zA-Z0-9_\-\+]+):/g;

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
  if (emoji.indexOf(':') > -1) {
    // :emoji: (http://www.emoji-cheat-sheet.com/)
    emoji = emoji.substr(1, emoji.length-2);
  }

  return Emoji._get(emoji);
};

/**
 * get emoji name from code
 * @param  {string} emoji_code
 * @return {string}
 */
Emoji.which = function which(emoji_code) {
  for (var prop in Emoji.emoji) {
    if (Emoji.emoji.hasOwnProperty(prop)) {
      if (Emoji.emoji[prop] === emoji_code) {
        return prop;
      }
    }
  }
};

/**
 * emojify a string (replace :emoji: with an emoji)
 * @param  {string} str
 * @return {string}
 */
Emoji.emojify = function emojify(str) {
  return str.split(parser) // parse emoji via regex
            .map(function parseEmoji(s, i) {
              return (i % 2 === 0) ? s : Emoji._get(s); // every second element is an emoji, e.g. "test :fast_forward:" -> [ "test ", "fast_forward" ]
            })
            .join('') // convert back to string
  ;
};
