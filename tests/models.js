models = {
  Post: Astro.Class({
    name: 'Post',
    collection: Posts = new Mongo.Collection('quadric:backdoor-raw_testing'),
    fields: {
      title: 'string',
      content: 'string'
    }
  })
};

_.times(3, function(n) {
  new models.Post({
    title: 'Post '+ n,
    content: _.repeat('*', n)
  }).save();
});
