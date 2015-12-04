'use strict';

describe('Service: CurrentTimeService', function () {

  // load the service's module
  beforeEach(module('qlocktwoAngularApp'));

  // instantiate service
  var CurrentTimeService;
  beforeEach(inject(function (_CurrentTimeService_) {
    CurrentTimeService = _CurrentTimeService_;
  }));

  it('should do something', function () {
    expect(!!CurrentTimeService).toBe(true);
  });

});
