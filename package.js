Package.describe({
  name: 'quadric:backdoor-raw',
  summary: 'Runs arbitrary code on server returning raw data',
  version: '0.1.0',
  git: 'https://github.com/quadric/meteor-backdoor-raw.git',
  debugOnly: true
});

Npm.depends({
  lodash: '3.10.1',
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.2.1');
  api.use('ecmascript');
  api.use('xolvio:backdoor@0.1.2');
  api.addFiles('server.js', 'server');

  // For testing purposes
  // @todo: all the following lines should be moved to `onTest`
  // @see https://github.com/quadric/meteor-backdoor-raw/issues/1
  api.use('erasaur:meteor-lodash@3.10.1_1');
  api.use('mongo', ['server']);
  api.use('jagi:astronomy@1.2.10', ['server']);
  api.addFiles('tests/models.js', 'server');
  api.export('models');
});

Package.onTest(function(api) {
  api.versionsFrom('METEOR@1.2.1');
  api.use('quadric:backdoor-raw');
  api.use('ecmascript');
  api.use('sanjo:jasmine@0.20.3');

  api.addFiles('tests/quadric_backdoor-raw.js', 'client');
});
