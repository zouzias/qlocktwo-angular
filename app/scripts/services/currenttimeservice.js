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

    var hours = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
    var minutes = ['clock', 'five', 'ten', 'fifteen', 'twenty', 'thirty', 'forty', 'fifty'];

    return {indexHour: 0, indexMinute: 0, hours: hours, minutes: minutes};
  });
