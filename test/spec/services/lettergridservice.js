'use strict';

describe('Service: LetterGridService', function () {

  // load the service's module
  beforeEach(module('qlocktwoAngularApp'));

  // instantiate service
  var letterGridService;
  beforeEach(inject(function (_LetterGridService_) {
    letterGridService = _LetterGridService_;
  }));

  it('should contain a grid of String with length 11', function () {
    expect(!!letterGridService).toBe(true);
    expect(letterGridService.numRows).toBe(11);
  });

});
