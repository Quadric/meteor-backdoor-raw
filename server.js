import _ from "lodash";

const backdoor = Meteor.server.method_handlers['xolvio/backdoor'];

function transfer(items) {
  if(items && _.isFunction(items.raw)) {
    return items.raw();
  }

  if(_.isArray(items)) {
    return _.map(items, transfer);
  }

  if(_.isObject(items)) {
    return _.mapValues(items, transfer);
  }

  return items;
}

Meteor.server.method_handlers['xolvio/backdoor'] = _.flowRight((response) => {
  response.value = transfer(response.value);

  return response;
}, backdoor);
