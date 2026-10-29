'use strict';

/**
 * @ngdoc function
 * @name qlocktwoAngularApp.controller:QlocktwoCtrl
 * @description
 * # QlocktwoCtrl
 * Controller of the qlocktwoAngularApp
 */
angular.module('qlocktwoAngularApp')
  .controller('QlocktwoCtrl', function($rootScope, $scope, LetterGridService, CurrentTimeService, TimeToPhrases) {

    // Front plate finishes of the QLOCKTWO EARTH
    $scope.finishes = [{id: 'black-pepper', name: 'Black Pepper'},
                       {id: 'steel', name: 'Brushed Steel'},
                       {id: 'pure-white', name: 'Pure White'},
                       {id: 'slate', name: 'Slate'}];
    $scope.finish = $scope.finishes[0];

    $scope.selectFinish = function(finish) {
      $scope.finish = finish;
    };

    $scope.grid = LetterGridService.grid;
    $scope.dots = [false, false, false, false];
    $scope.currentTime = CurrentTimeService.now;

    // Listen for timer updates
    $rootScope.$on('TIME_UPDATED', function() {
      $scope.$apply(function(){
        $scope.currentTime = CurrentTimeService.now;
        $scope.updateTimePhrases();
      });
    });

    $scope.updateTimePhrases = function(){
      var phrases = TimeToPhrases.phrasesFor($scope.currentTime);

      $scope.resetGrid();
      phrases.words.forEach($scope.highlightWord);

      $scope.dots = $scope.dots.map(function(d, i) {
        return i < phrases.dots;
      });
    };

    /**
    * Resets letter grid
    */
    $scope.resetGrid = function(){
      LetterGridService.grid = LetterGridService.grid.map(function(d) {
        return d.map(function(l){
          return {char: l.char, selected: false};
        });
      });

      $scope.grid = LetterGridService.grid;
    };

    /**
     * Highlights a single word of LetterGridService.words on the letter grid.
     *
     * It updates the state of Service LetterGridService.grid
     *
     * @param word Name of the word in LetterGridService.words
     */
    $scope.highlightWord = function(word) {
      var loc = LetterGridService.words[word];

      for (var j = 0; j < loc.sz; j++) {
        LetterGridService.grid[loc.row][loc.col + j].selected = true;
      }

      $scope.grid = LetterGridService.grid;
    };

    // Update time now
    $scope.updateTimePhrases();
  });
