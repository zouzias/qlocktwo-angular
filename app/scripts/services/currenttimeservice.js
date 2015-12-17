'use strict';

/**
 * @ngdoc service
 * @name qlocktwoAngularApp.CurrentTimeService
 * @description
 * # CurrentTimeService
 * Service in the qlocktwoAngularApp.
 */
angular.module('qlocktwoAngularApp')
  .service('CurrentTimeService', function ($rootScope, TimeToPhrases) {

    var minutes = TimeToPhrases.minutes;
    var hours = TimeToPhrases.hours;
    var currentTimeState = {now: new Date(), indexHour: 0, indexMinute: 0, hours: hours, minutes: minutes};

    currentTimeState.updateTime = function (){
      currentTimeState.now = new Date();
      $rootScope.$emit('TIME_UPDATED');
    };

    currentTimeState.updateLater = function() {
        setTimeout(function() {
          console.log('Time state updated...' + currentTimeState.now );
          currentTimeState.updateTime(); // update state
          currentTimeState.updateLater(); // schedule another update
        }, 3000);
    };

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

    // Initiate timer
    currentTimeState.updateLater();

    return currentTimeState;
  });
