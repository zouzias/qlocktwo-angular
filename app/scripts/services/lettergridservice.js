'use strict';

/**
 *
 * @ngdoc service
 * @name qlocktwoAngularApp.letterGridService
 * @description
 * # letterGridService
 * Service in the qlocktwoAngularApp. Letter grid model of the English QLOCKTWO front: the 10x11 letter
 * matrix and the location of every word on it.
 */
angular.module('qlocktwoAngularApp')
  .service('LetterGridService', function() {

    var grid = ['ITLISASAMPM',
                'ACQUARTERDC',
                'TWENTYFIVEX',
                'HALFSTENFTO',
                'PASTERUNINE',
                'ONESIXTHREE',
                'FOURFIVETWO',
                'EIGHTELEVEN',
                'SEVENTWELVE',
                'TENSEOCLOCK'];

    // Word locations as {row, col, sz}. Words that appear twice (FIVE, TEN) are split
    // into a minute and an hour variant.
    var words = {
      it:         {row: 0, col: 0, sz: 2},
      is:         {row: 0, col: 3, sz: 2},
      a:          {row: 1, col: 0, sz: 1},
      quarter:    {row: 1, col: 2, sz: 7},
      twenty:     {row: 2, col: 0, sz: 6},
      fiveMinute: {row: 2, col: 6, sz: 4},
      half:       {row: 3, col: 0, sz: 4},
      tenMinute:  {row: 3, col: 5, sz: 3},
      to:         {row: 3, col: 9, sz: 2},
      past:       {row: 4, col: 0, sz: 4},
      nine:       {row: 4, col: 7, sz: 4},
      one:        {row: 5, col: 0, sz: 3},
      six:        {row: 5, col: 3, sz: 3},
      three:      {row: 5, col: 6, sz: 5},
      four:       {row: 6, col: 0, sz: 4},
      five:       {row: 6, col: 4, sz: 4},
      two:        {row: 6, col: 8, sz: 3},
      eight:      {row: 7, col: 0, sz: 5},
      eleven:     {row: 7, col: 5, sz: 6},
      seven:      {row: 8, col: 0, sz: 5},
      twelve:     {row: 8, col: 5, sz: 6},
      ten:        {row: 9, col: 0, sz: 3},
      oclock:     {row: 9, col: 5, sz: 6}
    };

    var numRows = grid.length;
    var numCols = grid[0].length;

    var finalGrid = grid.map(function(row) {
      return row.split('')
                .map(function(d) {
                  return {char: d, selected: false};
                });
    });

    return {searchGrid: grid, grid: finalGrid, words: words, numRows: numRows, numCols: numCols};
  });
