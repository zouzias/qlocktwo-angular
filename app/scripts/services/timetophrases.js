'use strict';

/**
 * @ngdoc service
 * @name qlocktwoAngularApp.TimeToPhrases
 * @description
 * Convert time to phrases
 * Service in the qlocktwoAngularApp. Maps a time to the words lit on the QLOCKTWO front, e.g., 7:32 corresponds
 * to "IT IS HALF PAST SEVEN" plus two minute dots. Word names refer to LetterGridService.words, so if you
 * change the language you must also update the LetterGridService.
 */
angular.module('qlocktwoAngularApp')
  .service('TimeToPhrases', function() {

    // Hour words, indexed by hour modulo 12
    var hours = ['twelve', 'one', 'two', 'three', 'four', 'five',
                 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'];

    // Words for each five minute block; nextHour is true when the phrase counts down to the next hour
    var minutes = [{start:  0, words: ['oclock'],                       nextHour: false},
                   {start:  5, words: ['fiveMinute', 'past'],           nextHour: false},
                   {start: 10, words: ['tenMinute', 'past'],            nextHour: false},
                   {start: 15, words: ['a', 'quarter', 'past'],         nextHour: false},
                   {start: 20, words: ['twenty', 'past'],               nextHour: false},
                   {start: 25, words: ['twenty', 'fiveMinute', 'past'], nextHour: false},
                   {start: 30, words: ['half', 'past'],                 nextHour: false},
                   {start: 35, words: ['twenty', 'fiveMinute', 'to'],   nextHour: true},
                   {start: 40, words: ['twenty', 'to'],                 nextHour: true},
                   {start: 45, words: ['a', 'quarter', 'to'],           nextHour: true},
                   {start: 50, words: ['tenMinute', 'to'],              nextHour: true},
                   {start: 55, words: ['fiveMinute', 'to'],             nextHour: true}];

    /**
     * @param date The time to display
     * @returns {*} {words: [...], dots: n} with the words to light and the number of minute dots (0-4)
     */
    var phrasesFor = function(date) {
      var minute = date.getMinutes();
      var block = minutes[Math.floor(minute / 5)];
      var hour = hours[(date.getHours() + (block.nextHour ? 1 : 0)) % 12];
      var words = ['it', 'is'];

      if (block.start === 0) {
        words.push(hour, 'oclock');
      } else {
        words = words.concat(block.words, [hour]);
      }

      return {words: words, dots: minute % 5};
    };

    return {hours: hours, minutes: minutes, phrasesFor: phrasesFor};
  });
