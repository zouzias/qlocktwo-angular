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
    'ngTouch',
    'FBAngular'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/qlocktwo', {
        templateUrl: 'views/qlocktwo.html',
        controller: 'QlocktwoCtrl',
        controllerAs: 'qlocktwo'
      })
      .otherwise({
        redirectTo: '/qlocktwo'
      });
  });
