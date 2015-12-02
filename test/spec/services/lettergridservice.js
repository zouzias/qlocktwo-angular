'use strict';

describe('Service: letterGridService', function () {

  // load the service's module
  beforeEach(module('qlocktwoAngularApp'));

  // instantiate service
  var letterGridService;
  beforeEach(inject(function (_letterGridService_) {
    letterGridService = _letterGridService_;
  }));

  it('should do something', function () {
    expect(!!letterGridService).toBe(true);
  });

});
