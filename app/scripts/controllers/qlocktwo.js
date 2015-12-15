'use strict';

/**
 * @ngdoc function
 * @name qlocktwoAngularApp.controller:QlocktwoCtrl
 * @description
 * # QlocktwoCtrl
 * Controller of the qlocktwoAngularApp
 */
angular.module('qlocktwoAngularApp')
  .controller('QlocktwoCtrl', function ($rootScope, $scope, letterGridService, CurrentTimeService) {

    $scope.grid = letterGridService.grid;
    var numRows = $scope.grid.length;
    var numCols = $scope.grid[0].length;

    var hours = CurrentTimeService.hours.map(function(d){return d.word;});
    var minutes = CurrentTimeService.minutes.map(function(d){return d.word;});

    $scope.currentHour = hours[CurrentTimeService.indexHour];
    $scope.currentMinute = minutes[CurrentTimeService.indexMinute];

    $scope.currentTime = CurrentTimeService.now;

    // Listen for timer updates
    $rootScope.$on('TIME_UPDATED', function(){
        console.log('Event got on controller');
        $scope.$apply(function(){
          $scope.currentTime = CurrentTimeService.now;
        });

        $scope.next();
        console.log('Updated time is ' + $scope.currentTime);
    });

    /**
    * Update letter time
    */
    $scope.updateTime = function(){
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

    /**
    *
    * searchGrid:
    * word: Word to search on letter grid
    * fromRow: Row index to start the search
    * fromCol: Column index to start search
    *
    * Return a list
    */
    $scope.findWord = function(searchGrid, word, fromRow, fromCol){
      var locations = searchGrid.map( function (row, i) {
                                  var col = row.indexOf(word.toUpperCase());
                                  return {row: i, col: col, sz: word.length};
                                }).filter( function(d){
                                  return d.col !== -1;  // Remove not found rows
                                }).filter( function(d){
                                    return d.row > fromRow || (d.row == fromRow && d.col >= fromCol);
                                });
      return locations;
    };

    /**
    *  Highlights a single word from a (fromRow, fromCol) location
    *
    * Returns a new {row: rowIndex, col: colIndex} to continue highlight search
    */
    $scope.highlightWord = function(word, fromRow, fromCol){
      var locations = $scope.findWord(letterGridService.searchGrid, word, fromRow, fromCol);

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

      // Reset letter grid
      $scope.resetGrid();

      // Previous time
      CurrentTimeService.previousTime();
      $scope.updateTime();

      // Highlight letter grid
      var loc = $scope.highlightWord($scope.currentHour, 0, 0);
      $scope.highlightWord($scope.currentMinute, loc.row, loc.col);
    };

    $scope.next = function(){
      console.log('Next button pressed');

      // Reset Grid
      $scope.resetGrid();

      // Next time
      CurrentTimeService.nextTime();
      $scope.updateTime();

      // Highlight phrase on letter grid
      var loc = $scope.highlightWord($scope.currentHour, 0, 0);
      $scope.highlightWord($scope.currentMinute, loc.row, loc.col);
    };
  });
