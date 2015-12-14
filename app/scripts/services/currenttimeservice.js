'use strict';

/**
 * @ngdoc service
 * @name qlocktwoAngularApp.CurrentTimeService
 * @description
 * # CurrentTimeService
 * Service in the qlocktwoAngularApp.
 */
angular.module('qlocktwoAngularApp')
  .service('CurrentTimeService', function () {

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

    var currentTimeState = {now: new Date(), indexHour: 0, indexMinute: 0, hours: hours, minutes: minutes};

    currentTimeState.updateTime = function (){
      currentTimeState.now = new Date();
    }

    currentTimeState.updateLater = function() {
        setTimeout(function() {
          console.log('Time state updated...' + currentTimeState.now );
          currentTimeState.updateTime(); // update DOM
          currentTimeState.updateLater(); // schedule another update
        }, 1000);
    }

    currentTimeState.getCurrentTime = function(){
      return currentTimeState.now;
    }

    /**
    * Updates state to next time
    */
    currentTimeState.nextTime = function(){
      if ( currentTimeState.indexMinute < minutes.length - 1){
        // Increase minute index
        currentTimeState.indexMinute = currentTimeState.indexMinute + 1;
      }
      else if (currentTimeState.indexHour < hours.length -1){
        // Decrease hour and zero minutes
        currentTimeState.indexMinute = 0;
        currentTimeState.indexHour = currentTimeState.indexHour + 1;
      }
      else{
        // Overflow hour and minute to zeroes
        currentTimeState.indexMinute = 0;
        currentTimeState.indexHour = 0;
      }
    };

    currentTimeState.previousTime = function(){
      if ( currentTimeState.indexMinute > 0){
        // Decrease minute index
        currentTimeState.indexMinute = currentTimeState.indexMinute - 1;
      }
      else if (currentTimeState.indexHour > 0){
        // Set minute to zero and decrease hour
        currentTimeState.indexMinute = 0;
        currentTimeState.indexHour = currentTimeState.indexHour - 1;
      }
      else{
        // Hour and minute index are zero,
        // move to end of array
        currentTimeState.indexMinute = minutes.length - 1;
        currentTimeState.indexHour = hours.length - 1;
      }
    };

    currentTimeState.updateLater();

    return currentTimeState;
  });
