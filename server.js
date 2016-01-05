var _ = Npm.require('lodash');
var vm = Npm.require('vm');
var backdoor = Meteor.server.method_handlers['xolvio/backdoor'];

function transfer(items) {
  if(items && _.isFunction(items.raw)) {
    return items.raw();
  }

  if(_.isArray(items)) {
    return _.map(items, transfer);
  }

  if(_.isObject(items)) {
    return _.mapObject(items, transfer);
  }

  return items;
}

Meteor.server.method_handlers['xolvio/backdoor'] = _.compose((response) => {
  response.value = transfer(response.value);

  return response;
}, backdoor);
