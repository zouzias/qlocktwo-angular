'use strict';

/**
 * @ngdoc service
 * @name qlocktwoAngularApp.TimeToPhrases
 * @description
 * Convert time to phrases
 * Service in the qlocktwoAngularApp. Contains a mapping from time to time phrases, i.e., 7:30 corresponds to
 * "SEVEN", "THIRTY". You can update this to your favourite language. Note that
 * you must also update the content of the LetterGridService
 */
angular.module('qlocktwoAngularApp')
  .service('TimeToPhrases', function() {

    // Here put your words for hours
    var hours = [{hour: 1, word: 'one'},
                 {hour: 2, word: 'two'},
                 {hour: 3, word: 'three'},
                 {hour: 4, word: 'four'},
                 {hour: 5, word: 'five'},
                 {hour: 6, word: 'six'},
                 {hour: 7, word: 'seven'},
                 {hour: 8, word: 'eight'},
                 {hour: 9, word: 'nine'},
                 {hour: 10, word: 'ten'},
                 {hour: 11, word: 'eleven'},
                 {hour: 12, word: 'twelve'},
                 {hour: 13, word: 'one'},
                 {hour: 14, word: 'two'},
                 {hour: 15, word: 'three'},
                 {hour: 16, word: 'four'},
                 {hour: 17, word: 'five'},
                 {hour: 18, word: 'six'},
                 {hour: 19, word: 'seven'},
                 {hour: 20, word: 'eight'},
                 {hour: 21, word: 'nine'},
                 {hour: 22, word: 'ten'},
                 {hour: 23, word: 'eleven'},
                 {hour: 24, word: 'twelve'}];

    // Here put your word for minutes
    // This will be displayed if time is in interval [start, end]
    var minutes = [{start: 0, end:  5, word: 'clock'},
                  {start:  5, end:  9, word: 'five'},
                  {start: 10, end: 14, word: 'ten'},
                  {start: 15, end: 19, word: 'fifteen'},
                  {start: 20, end: 29, word: 'twenty'},
                  {start: 30, end: 39, word: 'thirty'},
                  {start: 40, end: 49, word: 'forty'},
                  {start: 50, end: 59, word: 'fifty'}];

    return {hours: hours, minutes: minutes};
  });
