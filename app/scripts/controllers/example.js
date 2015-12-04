'use strict';

/**
 * @ngdoc function
 * @name qlocktwoAngularApp.controller:ExampleCtrl
 * @description
 * # ExampleCtrl
 * Controller of the qlocktwoAngularApp
 */
angular.module('qlocktwoAngularApp')
  .controller('ExampleCtrl', function ($scope, letterGridService, CurrentTimeService) {

    $scope.grid = letterGridService.grid;

    var hours = CurrentTimeService.hours;
    var minutes = CurrentTimeService.minutes;

    $scope.currentHour = hours[CurrentTimeService.indexHour];
    $scope.currentMinute = minutes[CurrentTimeService.indexMinute];

    $scope.findWord = function(searchGrid, word){
      var locations = searchGrid.map( function (row, i) {
        var col = row.indexOf(word.toUpperCase());

        return {row: i, col: col, sz: word.length};
      }).filter(function(d){return d.col !== -1;});

      return locations;
    };

    $scope.nextTime = function(){
      if ( CurrentTimeService.indexMinute < minutes.length - 1){
        CurrentTimeService.indexMinute = CurrentTimeService.indexMinute + 1;
      }
      else if (CurrentTimeService.indexHour < hours.length -1){
        CurrentTimeService.indexMinute = 0;
        CurrentTimeService.indexHour = CurrentTimeService.indexHour + 1;
      }
      else{
        CurrentTimeService.indexMinute = 0;
        CurrentTimeService.indexHour = 0;
      }

      $scope.currentHour = hours[CurrentTimeService.indexHour];
      $scope.currentMinute = minutes[CurrentTimeService.indexMinute];
    };

    $scope.resetGrid = function(){
      letterGridService.grid = letterGridService.grid.map(function(d){
        return d.map(function(l){
          return {char: l.char, selected: false};
        })
      })

      $scope.grid = letterGridService.grid;
    };

    $scope.highlightWord = function(word){
      var locations = $scope.findWord(letterGridService.searchGrid, word);
      console.log('Found ' + locations.length + ' locations');

      // TODO: rewrite this
      for ( var i = 0 ; i < letterGridService.grid.length; i++){
        for( var j = 0; j < letterGridService.grid[0].length; j++){
          for ( var k = 0; k < locations.length; k++){
            if ( locations[k].row === i && locations[k].col <= j && locations[k].col + locations[k].sz > j){
                letterGridService.grid[i][j].selected = true;
              }
          }
        }
      }

      $scope.grid = letterGridService.grid;
    };

    $scope.previous = function(){
      console.log('Previous button pressed');

      $scope.resetGrid();
      $scope.highlightWord('clock');
      $scope.highlightWord('two');
    };

    $scope.next = function(){
      console.log('Next button pressed');

      $scope.resetGrid();
      $scope.nextTime();
      $scope.highlightWord($scope.currentHour);
      $scope.highlightWord($scope.currentMinute);
    };
  });
