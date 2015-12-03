'use strict';

/**
 * @ngdoc function
 * @name qlocktwoAngularApp.controller:ExampleCtrl
 * @description
 * # ExampleCtrl
 * Controller of the qlocktwoAngularApp
 */
angular.module('qlocktwoAngularApp')
  .controller('ExampleCtrl', function (letterGridService) {
    this.grid = letterGridService.grid;
  });
