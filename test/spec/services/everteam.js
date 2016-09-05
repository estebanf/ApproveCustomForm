'use strict';

describe('Service: everteam', function () {

  // load the service's module
  beforeEach(module('approveCustomFormApp'));

  // instantiate service
  var everteam;
  beforeEach(inject(function (_everteam_) {
    everteam = _everteam_;
  }));

  it('should do something', function () {
    expect(!!everteam).toBe(true);
  });

});
