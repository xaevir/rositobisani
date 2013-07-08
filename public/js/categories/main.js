require.config({
  baseUrl: './js',
  //urlArgs: 'bust=' + (new Date()).getTime()
  map: {
    '*': {
      'css': 'libs/require-css/css' // or whatever the path to require-css is
    }
  },
  paths: {
    jquery: 'libs/jquery',
    underscore: 'libs/underscore',
    Backbone: 'libs/backbone',
    'Backbone.Validation': 'libs/backbone.validation',
    text: 'libs/text',
    'iframe-transport' : 'libs/jquery.iframe-transport',
    'app': 'fileUpload/app'
    //templates: '/templates',
  },

  shim: {
    'iframe-transport': ['jquery'],
    'Backbone': ['underscore', 'jquery'],
    'Backbone.Validation': ['Backbone'],
    'app': ['Backbone', 'Backbone.Validation', 'iframe-transport' ]
  }
});

require(['app'], function(app) {
  app.initialize();
});
