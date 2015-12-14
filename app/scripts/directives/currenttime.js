'use strict';

/**
 * @ngdoc directive
 * @name qlocktwoAngularApp.directive:CurrentTime
 * @description
 * # CurrentTime
 */
angular.module('qlocktwoAngularApp')
  .directive('currentTime', function (CurrentTimeService, dateFilter) {
    return {
      restrict: 'AE',
      link: function(scope, element, attrs){
        scope.format = 'M/d/yy h:mm:ss a';
    }
  }
  });
