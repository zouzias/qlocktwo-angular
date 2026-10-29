'use strict';

describe('Controller: QlocktwoCtrl', function () {

  // load the controller's module
  beforeEach(module('qlocktwoAngularApp'));

  var QlocktwoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QlocktwoCtrl = $controller('QlocktwoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach the letter grid to the scope', function () {
    expect(scope.grid.length).toBe(10);
  });

  it('should light the letters and minute dots of the current time', function () {
    scope.currentTime = new Date(2026, 0, 1, 19, 47);
    scope.updateTimePhrases();

    var lit = scope.grid.map(function(row) {
      return row.map(function(c) { return c.selected ? c.char : ' '; }).join('');
    });
    expect(lit).toEqual(['IT IS      ',
                         'A QUARTER  ',
                         '           ',
                         '         TO',
                         '           ',
                         '           ',
                         '           ',
                         'EIGHT      ',
                         '           ',
                         '           ']);
    expect(scope.dots).toEqual([true, true, false, false]);
  });
});
