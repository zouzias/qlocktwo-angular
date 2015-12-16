'use strict';

/**
 * Contains a mapping from time to time phrases, i.e., 7:30 corresponds to
 * "SEVEN", "THIRTY". You can update this to your favourite language. Note that
 * you must also update the content of the LetterGridService
 * @ngdoc service
 * @name qlocktwoAngularApp.TimeToPhrases
 * @description
 * # TimeToPhrases
 * Service in the qlocktwoAngularApp.
 */
angular.module('qlocktwoAngularApp')
  .service('TimeToPhrases', function () {

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
                 {hour: 12, word: 'twelve'}];

    var minutes = [{minute: 0, word: 'clock'},
                  {minute: 5, word: 'five'},
                  {minute: 10, word: 'ten'},
                  {minute: 15, word: 'fifteen'},
                  {minute: 20, word: 'twenty'},
                  {minute: 30, word: 'thirty'},
                  {minute: 40, word: 'forty'},
                  {minute: 50, word: 'fifty'}];

    return {hours: hours, minutes: minutes};
  });
