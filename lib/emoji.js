/*jslint node: true*/
"use strict";

/**
 * Emoji class
 */
function Emoji() {
  try {
    this.emoji = require('./emoji.json');
  } catch (err) {
    throw new Error('emoji.json invalid or not readable.');
  }
}

module.exports = new Emoji();

/**
 * regex to parse emoji in a string - finds emoji, e.g. :coffee:
 */
Emoji.parser = /:([a-zA-Z0-9_\-\+]+):/g;

/**
 * get emoji code from name
 * @param  {string} emoji
 * @return {string}
 */
Emoji.prototype._get = function _get(emoji) {
  if (this.emoji.hasOwnProperty(emoji)) {
    return this.emoji[emoji];
  }
  return ':' + emoji + ':';
};

/**
 * get emoji code from :emoji: string or name
 * @param  {string} emoji
 * @return {string}
 */
Emoji.prototype.get = function get(emoji) {
  if (emoji.indexOf(':') > -1) {
    // :emoji: (http://www.emoji-cheat-sheet.com/)
    emoji = emoji.substr(1, emoji.length-2);
  }

  return this._get(emoji);
};

/**
 * get emoji name from code
 * @param  {string} emoji_code
 * @return {string}
 */
Emoji.prototype.which = function which(emoji_code) {
  for (var prop in this.emoji) {
    if (this.emoji.hasOwnProperty(prop)) {
      if (this.emoji[prop] === emoji_code) {
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
Emoji.prototype.emojify = function emojify(str) {
  var emoji = this;
  return str.split(Emoji.parser) // parse emoji via regex
            .map(function parseEmoji(s, i) {
              return (i % 2 === 0) ? s : emoji._get(s); // every second element is an emoji, e.g. "test :fast_forward:" -> [ "test ", "fast_forward" ]
            })
            .join('') // convert back to string
  ;
};
