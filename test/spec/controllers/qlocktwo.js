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

  it('should attach a list of awesomeThings to the scope', function () {
    expect(QlocktwoCtrl.awesomeThings.length).toBe(3);
  });
});
