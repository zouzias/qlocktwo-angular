'use strict';

/**
 * @ngdoc service
 * @name qlocktwoAngularApp.CurrentTimeService
 * @description
 * # CurrentTimeService
 * Service in the qlocktwoAngularApp. Current time service. Fire up every 10 seconds to update the state of the letter grid
 */
angular.module('qlocktwoAngularApp')
  .service('CurrentTimeService', function ($rootScope, TimeToPhrases) {

    /** Update time every 10 seconds */
    var timeout = 10000;

    var minutes = TimeToPhrases.minutes;
    var hours = TimeToPhrases.hours;
    var currentTimeState = {now: new Date(), indexHour: 0, indexMinute: 0, hours: hours, minutes: minutes};

    /**
     * Emit event to qlocktwo controller
     */
    currentTimeState.updateTime = function (){
      currentTimeState.now = new Date();
      $rootScope.$emit('TIME_UPDATED');
    };

    /**
     * Recursively call updateTime()
     */
    currentTimeState.updateLater = function() {
        setTimeout(function() {
          console.log('Time state updated...' + currentTimeState.now );
          currentTimeState.updateTime(); // update state
          currentTimeState.updateLater(); // schedule another update
        }, timeout);
    };

    /**
     * Updates state to next time
     */
    currentTimeState.nextTime = function(){
      // Increase minute, else increase hour and zero minute, otherwise zero hour and minute
      if ( currentTimeState.indexMinute < minutes.length - 1){
        // Increase minute index
        currentTimeState.indexMinute = currentTimeState.indexMinute + 1;
      }
      else if (currentTimeState.indexHour < hours.length -1){
        // Increase hour and zero minutes
        currentTimeState.indexMinute = 0;
        currentTimeState.indexHour = currentTimeState.indexHour + 1;
      }
      else{
        // Overflow hour and minute to zeroes
        currentTimeState.indexHour = 0;
        currentTimeState.indexMinute = 0;
      }
    };

    /**
     * Update state to previous time
     */
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
