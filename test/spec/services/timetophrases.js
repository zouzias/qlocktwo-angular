'use strict';

describe('Service: TimeToPhrases', function () {

  // load the service's module
  beforeEach(module('qlocktwoAngularApp'));

  // instantiate service
  var TimeToPhrases;
  beforeEach(inject(function (_TimeToPhrases_) {
    TimeToPhrases = _TimeToPhrases_;
  }));

  var phrasesAt = function(hours, minutes) {
    return TimeToPhrases.phrasesFor(new Date(2026, 0, 1, hours, minutes));
  };

  it('should say o\'clock on the hour', function () {
    expect(phrasesAt(15, 0)).toEqual({words: ['it', 'is', 'three', 'oclock'], dots: 0});
    expect(phrasesAt(0, 2)).toEqual({words: ['it', 'is', 'twelve', 'oclock'], dots: 2});
  });

  it('should count minutes past the hour', function () {
    expect(phrasesAt(7, 32).words).toEqual(['it', 'is', 'half', 'past', 'seven']);
    expect(phrasesAt(7, 32).dots).toBe(2);
    expect(phrasesAt(10, 15).words).toEqual(['it', 'is', 'a', 'quarter', 'past', 'ten']);
    expect(phrasesAt(9, 26).words).toEqual(['it', 'is', 'twenty', 'fiveMinute', 'past', 'nine']);
  });

  it('should count minutes to the next hour', function () {
    expect(phrasesAt(11, 45).words).toEqual(['it', 'is', 'a', 'quarter', 'to', 'twelve']);
    expect(phrasesAt(23, 59)).toEqual({words: ['it', 'is', 'fiveMinute', 'to', 'twelve'], dots: 4});
  });

});
