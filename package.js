Package.describe({
  name: 'quadric:backdoor-raw',
  summary: 'Runs arbitrary code on server returning raw data',
  version: '0.2.0-rc.0',
  git: 'https://github.com/quadric/meteor-backdoor-raw.git',
  debugOnly: true
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.3-beta.11');
  api.use('ecmascript@0.1.6');
  api.use('xolvio:backdoor@0.1.2');
  api.addFiles('server.js', 'server');

  // For testing purposes,
  // uncomment the lines below
  //  @todo: all the following lines should be moved to `onTest`
  //  @see https://github.com/quadric/meteor-backdoor-raw/issues/1

  // api.use('mongo', ['server']);
  // api.use('jagi:astronomy@1.2.10', ['server']);
  // api.addFiles('tests/models.js', 'server');
  // api.export('models');
});

Package.onTest(function(api) {
  api.versionsFrom('METEOR@1.3-beta.11');
  api.use('quadric:backdoor-raw');
  api.use('ecmascript@0.1.6');
  api.use('sanjo:jasmine@0.20.3');

  api.addFiles('tests/quadric_backdoor-raw.js', 'client');
});
