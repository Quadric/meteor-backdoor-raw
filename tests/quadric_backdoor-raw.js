describe('quadric/backdoor-raw', function () {
  it('executes the passed code on the server', function (done) {
    const myFunction = function (globalToCheck) {
      return !!global[globalToCheck];
    };

    Meteor.call('xolvio/backdoor', myFunction.toString(), ['process'], function (error, result) {
      expect(error).toBeUndefined();
      expect(result).toEqual({
        value: true
      });
      done();
    });
  });

  it('returns the error when one happens', function (done) {
    const myFunction = function () {
      throw new Error('fire');
    };

    Meteor.call('xolvio/backdoor', myFunction.toString(), ['isServer'], function (error, result) {
      expect(error).toBeUndefined();
      expect(result).toEqual({
        error: jasmine.objectContaining({
          message: 'Error: fire'
        })
      });
      done();
    });
  });
});

it('returns a cursor with raw objects', function (done) {
  const myFunction = function () {
    return Package['quadric:backdoor-raw'].models.Post.find();
  };

  Meteor.call('xolvio/backdoor', myFunction.toString(), [], function (error, result) {
    expect(error).toBeUndefined();
    expect(result).toEqual({
      value: true
    });
    done();
  });
});
