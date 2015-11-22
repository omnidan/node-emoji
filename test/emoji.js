/*jslint node: true*/
/*jslint expr: true*/
/*global describe, it*/
"use strict";

var should = require('should');
var emoji = require('../index');

describe("emoji.js", function () {
  describe("class", function () {
    describe("get(emoji)", function () {
      it("should return an emoji code", function () {
        var coffee = emoji.get('coffee');
        should.exist(coffee);
        coffee.should.be.exactly('☕️');
      });

      it("should support github flavored markdown emoji", function () {
        var coffee = emoji.get(':coffee:');
        should.exist(coffee);
        coffee.should.be.exactly('☕️');
      });
    });

    describe("which(emoji_code)", function () {
      it("should return name of the emoji", function () {
        var coffee = emoji.which('☕️');
        should.exist(coffee);
        coffee.should.be.exactly('coffee');
      });
    });

    describe("emojify(str)", function () {
      it("should parse :emoji: in a string and replace them with the right emoji", function () {
        var coffee = emoji.emojify('I :heart:  :coffee:! -  :hushed::star::heart_eyes:  ::: test : : :+1:+');
        should.exist(coffee);
        coffee.should.be.exactly('I ❤️  ☕️! -  😯⭐️😍  ::: test : : 👍+');
      });
      it("should not parse string emoji", function () {
        var coffee = emoji.emojify('I :heart: :D :coffee:! -  :hushed::star::heart_eyes:  ::: test : : :+1:+');
        should.exist(coffee);
        coffee.should.be.exactly('I ❤️ :D ☕️! -  😯⭐️😍  ::: test : : 👍+');
      });
      it("should leave unknown emoji", function () {
        var coffee = emoji.emojify('I :unknown_emoji: :star: :another_one:');
        should.exist(coffee);
        coffee.should.be.exactly('I :unknown_emoji: ⭐️ :another_one:');
      });
    });

    describe("emojify(str, {enableStringEmoji: true})", function() {
      it("should also parse string :emoji: in a string and replace them with the right emoji", function () {
        var coffee = emoji.emojify(';) I <3 :coffee: ! - :) :D :::((( :/ :(', {enableStringEmoji: true});
        should.exist(coffee);
        coffee.should.be.exactly('😉 I ❤️ ☕️ ! - 🙂 😀 ::🙁(( 😕 🙁');
      });
    });
  });

  describe("object", function () {
    it("should return an emoji code", function () {
      var coffee = emoji.emoji[":coffee:"];
      should.exist(coffee);
      coffee.should.be.exactly('☕️');
    });
  });
});
