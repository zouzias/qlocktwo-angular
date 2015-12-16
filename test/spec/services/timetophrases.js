'use strict';

describe('Service: TimeToPhrases', function () {

  // load the service's module
  beforeEach(module('qlocktwoAngularApp'));

  // instantiate service
  var TimeToPhrases;
  beforeEach(inject(function (_TimeToPhrases_) {
    TimeToPhrases = _TimeToPhrases_;
  }));

  it('should do something', function () {
    expect(!!TimeToPhrases).toBe(true);
  });

});
