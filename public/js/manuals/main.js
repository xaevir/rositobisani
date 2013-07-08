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
    utilities: 'libs/utilities',
    Hogan: 'libs/hogan',
    'iframe-transport' : 'libs/jquery.iframe-transport',
    'app': 'manuals/app'
    //templates: '/templates',
  },


//require('css!/js/fileUpload/css/main')

  shim: {
    'iframe-transport': ['jquery'],
    'Backbone': ['underscore', 'jquery'],
    'Backbone.Validation': ['Backbone'],
    'utilities': ['jquery', 'Backbone', 'Backbone.Validation'],
    'app': ['Backbone', 'Backbone.Validation', 'iframe-transport', 'Hogan', 'utilities']
  }
});

require(['app', 'css!/css/bootstrap', 'css!/css/utility'], function(app) {
  app.initialize();
});
