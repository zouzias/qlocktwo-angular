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
    var numRows = $scope.grid.length;
    var numCols = $scope.grid[0].length;

    var hours = CurrentTimeService.hours;
    var minutes = CurrentTimeService.minutes;

    $scope.currentHour = hours[CurrentTimeService.indexHour];
    $scope.currentMinute = minutes[CurrentTimeService.indexMinute];

    /**
    * Updates state to next time
    */
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

    $scope.previousTime = function(){
      if ( CurrentTimeService.indexMinute > 0){
        CurrentTimeService.indexMinute = CurrentTimeService.indexMinute - 1;
      }
      else if (CurrentTimeService.indexHour > 0){
        CurrentTimeService.indexMinute = 0;
        CurrentTimeService.indexHour = CurrentTimeService.indexHour - 1;
      }
      else{
        CurrentTimeService.indexMinute = minutes.length - 1;
        CurrentTimeService.indexHour = hours.length - 1;
      }

      $scope.currentHour = hours[CurrentTimeService.indexHour];
      $scope.currentMinute = minutes[CurrentTimeService.indexMinute];
    };

    /**
    * Resets letter grid
    */
    $scope.resetGrid = function(){
      letterGridService.grid = letterGridService.grid.map(function(d){
        return d.map(function(l){
          return {char: l.char, selected: false};
        })
      })

      $scope.grid = letterGridService.grid;
    };

    $scope.findWord = function(searchGrid, word, fromRow, fromCol){
      var locations = searchGrid.map( function (row, i) {
                                  var col = row.indexOf(word.toUpperCase());
                                  return {row: i, col: col, sz: word.length};
                                }).filter(function(d){
                                    return d.col !== -1;
                                  })
                                  .filter(function(d){
                                    if ( d.row > fromRow){
                                      return true;
                                    }
                                    else if (d.row == fromRow && d.col >= fromCol){
                                      return true;
                                    }

                                    return false;
                                  });

      return locations;
    };

    /**
    *  Highlights a single word
    */
    $scope.highlightWord = function(word, fromRow, fromCol){
      var locations = $scope.findWord(letterGridService.searchGrid, word, fromRow, fromCol);
      console.log('Found ' + locations.length + ' locations');

      locations.forEach(function(d){
        console.log('Row: ' + d.row + ' , ' + d.col);
      });


      if ( locations.length > 0){
        var foundRow = locations[0].row;
        var foundCol = locations[0].col;
        var sz = locations[0].sz;

        for( var j = 0; j < sz; j++){
          letterGridService.grid[foundRow][foundCol + j].selected = true;
        }

        // Update grid
        $scope.grid = letterGridService.grid;

        // Check if the column index overflowed
        if ( foundCol + sz >= numCols ){
          return {row: foundRow + 1, col: 0};
        }
        else{
          return {row: foundRow, col: foundCol + sz};
        }
      }

      return {row: fromRow, col: fromCol};
    };

    $scope.previous = function(){
      console.log('Previous button pressed');

      $scope.resetGrid();
      $scope.previousTime();
      var loc = $scope.highlightWord($scope.currentHour, 0, 0);
      $scope.highlightWord($scope.currentMinute, loc.row, loc.col);
    };

    $scope.next = function(){
      console.log('Next button pressed');

      $scope.resetGrid();
      $scope.nextTime();
      var loc = $scope.highlightWord($scope.currentHour, 0, 0);
      $scope.highlightWord($scope.currentMinute, loc.row, loc.col);
    };
  });
