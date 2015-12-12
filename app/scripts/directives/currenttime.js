'use strict';

/**
 * @ngdoc directive
 * @name qlocktwoAngularApp.directive:CurrentTime
 * @description
 * # CurrentTime
 */
angular.module('qlocktwoAngularApp')
  .directive('currentTime', function (dateFilter) {
    return {
      restrict: 'AE',
      link: function(scope, element, attrs){
        scope.format = 'M/d/yy h:mm:ss a';

        function updateTime(){
            var dt = dateFilter(new Date(), scope.format);
            element.text(dt);
        }

        function updateLater() {
            setTimeout(function() {
              updateTime(); // update DOM
              updateLater(); // schedule another update
            }, 1000);
        }

        updateLater();
    }
  }
  });
