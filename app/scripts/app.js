'use strict';

/**
 * @ngdoc overview
 * @name qlocktwoAngularApp
 * @description
 * # qlocktwoAngularApp
 *
 * Main module of the application.
 */
angular
  .module('qlocktwoAngularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/example', {
        templateUrl: 'views/example.html',
        controller: 'ExampleCtrl',
        controllerAs: 'example'
      })
      .otherwise({
        redirectTo: '/example'
      });
  });
