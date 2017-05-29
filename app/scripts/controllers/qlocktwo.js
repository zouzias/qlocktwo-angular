'use strict';

/**
 * @ngdoc function
 * @name qlocktwoAngularApp.controller:QlocktwoCtrl
 * @description
 * # QlocktwoCtrl
 * Controller of the qlocktwoAngularApp
 */
angular.module('qlocktwoAngularApp')
  .controller('QlocktwoCtrl', function ($rootScope, $scope, LetterGridService, CurrentTimeService) {

    $scope.grid = LetterGridService.grid;

    var hours = CurrentTimeService.hours.map(function(d){return d.word;});
    var minutes = CurrentTimeService.minutes.map(function(d){return d.word;});

    // Initialize state
    $scope.currentHour = hours[CurrentTimeService.indexHour];
    $scope.currentMinute = minutes[CurrentTimeService.indexMinute];
    $scope.currentTime = CurrentTimeService.now;

    // Listen for timer updates
    $rootScope.$on('TIME_UPDATED', function() {
      console.log('Event got on controller');
      $scope.$apply(function(){
        $scope.currentTime = CurrentTimeService.now;
      });

      $scope.updateTimePhrases();
      console.log('Updated time is ' + $scope.currentTime);
    });

    $scope.updateTimePhrases = function(){

      var currentHour = $scope.currentTime.getHours();
      var currentMinute = $scope.currentTime.getMinutes();

      $scope.currentHour = CurrentTimeService.hours.filter(function(d) {
        return d.hour === currentHour;
      }).map(function(d){return d.word;}).shift();

      console.log('CurrentTimeService hours is  ' + CurrentTimeService.hours[currentHour]);
      $scope.currentMinute = CurrentTimeService.minutes.filter(function(d){
        return d.start <= currentMinute && currentMinute <= d.end;
      }).map(function(d){return d.word;}).shift();

      $scope.resetGrid(); // Reset Grid

      // Highlight phrase on letter grid
      var loc = $scope.highlightWord($scope.currentHour, 0, 0);
      $scope.highlightWord($scope.currentMinute, loc.row, loc.col);
    };

    /**
    * Resets letter grid
    */
    $scope.resetGrid = function(){
      LetterGridService.grid = LetterGridService.grid.map(function(d){
        return d.map(function(l){
          return {char: l.char, selected: false};
        });
      });

      $scope.grid = LetterGridService.grid;
    };

    /**
     * Searches letter grid for a word starting from position (fromRow, fromCol)
     *
     * @param searchGrid The letter grid as an array of Strings (each string is a row)
     * @param word Query word on the letter grid
     * @param fromRow Start row location (0-indexed)
     * @param fromCol Start column location (0-indexed)
       * @returns {*} Array of objects: {row: XXX, col: XXX, sz: XXX} containing locations of found locations
       */
    $scope.findWord = function(searchGrid, word, fromRow, fromCol){
      var locations = searchGrid.map(function(row, i) {
                                  var col = row.indexOf(word.toUpperCase());
                                  return {row: i, col: col, sz: word.length};
                                }).filter(function(d) {
                                  return d.col !== -1;  // Remove not found rows
                                }).filter(function(d) {
                                  return d.row > fromRow || (d.row === fromRow && d.col >= fromCol);
                                });
      return locations;
    };

    /**
     * Highlights a single word from a given (fromRow, fromCol) location.
     *
     * It updates the state of Service LetterGridService.grid
     *
     * @param word Query word to search on letter grid
     * @param fromRow Row index to start search
     * @param fromCol Column index to start search (given about row index)
       * @returns {*} A location {row: XXX, col: XXX} from which the following possible word can be searched
       */
    $scope.highlightWord = function(word, fromRow, fromCol){
      var locations = $scope.findWord(LetterGridService.searchGrid, word, fromRow, fromCol);

      if (locations.length === 0) {
        return {row: fromRow, col: fromCol};
      }

      var foundRow = locations[0].row;
      var foundCol = locations[0].col;
      var sz = locations[0].sz;

      // Update letter grid
      for (var j = 0; j < sz; j++) {
        LetterGridService.grid[foundRow][foundCol + j].selected = true;
      }

      // Update controllers grid
      $scope.grid = LetterGridService.grid;

      // Check if the column index overflowed
      if (foundCol + sz >= LetterGridService.numCols) {
        return {row: foundRow + 1, col: 0};
      } else {
        return {row: foundRow, col: foundCol + sz};
      }
    };

    // Update time now
    $scope.currentTime = CurrentTimeService.now;
    $scope.updateTimePhrases();
  });
