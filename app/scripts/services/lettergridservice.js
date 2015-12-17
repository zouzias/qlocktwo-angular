'use strict';

/**
 * @ngdoc service
 * @name qlocktwoAngularApp.letterGridService
 * @description
 * # letterGridService
 * Service in the qlocktwoAngularApp.
 */
angular.module('qlocktwoAngularApp')
  .service('LetterGridService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var grid = ['NSEVENFOURC', 'FELEVENOTWO', 'TWELVEFIVEV', 'TEIGHTENONE', 'TNINETHREEL',
    'SIXHALFIFTY', 'EFORTYYPAST', 'OFTHIRTYTEN', 'TOTWENTYSIX', 'TWCLOCKFIVE', 'FIFTEENTONE'];

    var numRows = grid.length;
    var numCols = grid[0].length;

    // Convert to array of arrays
    var finalGrid = grid.map(function(row){
      return row.split('')
                .map(function(d){
                  return {char: d, selected: Math.random() > 0.5};
                });
    });

    return {searchGrid: grid, grid: finalGrid, numRows: numRows, numCols: numCols};
  });
