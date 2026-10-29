'use strict';

describe('Service: LetterGridService', function () {

  // load the service's module
  beforeEach(module('qlocktwoAngularApp'));

  // instantiate service
  var letterGridService;
  beforeEach(inject(function (_LetterGridService_) {
    letterGridService = _LetterGridService_;
  }));

  it('should contain the 10x11 English QLOCKTWO grid', function () {
    expect(!!letterGridService).toBe(true);
    expect(letterGridService.numRows).toBe(10);
    expect(letterGridService.numCols).toBe(11);
  });

  it('should locate every word on the grid', function () {
    Object.keys(letterGridService.words).forEach(function(name) {
      var loc = letterGridService.words[name];
      var text = letterGridService.searchGrid[loc.row].substr(loc.col, loc.sz);
      expect(text).toBe(name.replace(/(Minute)$/, '').toUpperCase());
    });
  });

});
