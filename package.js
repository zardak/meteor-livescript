Package.describe({
  name: 'zardak:livescript',
  version: '0.1.0',
  summary: 'LiveScript is a fork of Coco and an indirect descendant of CoffeeScript.',
  git: ''
});

Package.registerBuildPlugin({
  name: "compileLivescript",
  use: [],
  sources: [
    'plugin/compile-livescript.js'
  ],
  npmDependencies: {
    "livescript": "1.4.0"
  }
});

Package.onUse(function(api) {
  api.versionsFrom('0.9.3');
});
