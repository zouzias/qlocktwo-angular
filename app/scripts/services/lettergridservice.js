'use strict';

/**
 *
 * @ngdoc service
 * @name qlocktwoAngularApp.letterGridService
 * @description
 * # letterGridService
 * Service in the qlocktwoAngularApp. Letter grid model. Contains the state of the letter grid, i.e., which cells are highlighted, etc
 */
angular.module('qlocktwoAngularApp')
  .service('LetterGridService', function () {

    var grid = ['NSEVENFOURC', 'FELEVENOTWO', 'TWELVEFIVEV', 'TEIGHTENONE', 'TNINETHREEL',
    'SIXHALFIFTY', 'EFORTYYPAST', 'OFTHIRTYTEN', 'TOTWENTYSIX', 'TWCLOCKFIVE', 'FIFTEENTONE'];

    var numRows = grid.length;
    var numCols = grid[0].length;

    // Convert grid to array of arrays and select random cells
    var finalGrid = grid.map(function(row){
      return row.split('')
                .map(function(d){
                  return {char: d, selected: Math.random() > 0.5};
                });
    });

    return {searchGrid: grid, grid: finalGrid, numRows: numRows, numCols: numCols};
  });
