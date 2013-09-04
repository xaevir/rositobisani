require.config({
/*
  map: {
    '*': {
      'css': 'libs/require-css/css' // or whatever the path to require-css is
    }
  },
  */
  hbs: {
    disableI18n: true,        
    disableHelpers: true,     
    helperPathCallback:       // Callback to determine the path to look for helpers
      function (name) {       // ('/template/helpers/'+name by default)
        return 'cs!' + name;
      },
  },
  paths: {
    //for hbs
    hbs:                     'libs/require-handlebars-plugin/hbs',
    Handlebars :             'libs/require-handlebars-plugin/Handlebars',

    json2:                   'libs/json2',
    jquery:                  'libs/jquery',
    underscore:              'libs/underscore',
    backbone:                'libs/backbone',
    marionette :             'libs/backbone.marionette',
    Hogan:                   'libs/hogan',
    'backbone.validation':   'libs/backbone.validation',
    text:                    'libs/text',
    templates:               '../templates',
    transition:              'libs/bootstrap/js/bootstrap-transition',
    carousel:                'libs/bootstrap/js/bootstrap-carousel',
    collapse:                'libs/bootstrap/js/bootstrap-collapse',
    dropdown:                'libs/bootstrap/js/bootstrap-dropdown',
    utilities:               'libs/utilities',
    'iframe-transport' :     'libs/jquery.iframe-transport',
    appMarionette:           'app_marionette',
    spin:                    'libs/spin',
    'spin.jquery':           'libs/spin.jquery',
    'jquery-ui':             'libs/jquery-ui-1.10.3'
  },

  shim: {
    'iframe-transport': ['jquery'],
    'backbone': ['underscore', 'jquery'],
    'backbone.validation': ['backbone'],
    transition: ['jquery'],
    collapse : ['jquery'],
    dropdown : ['jquery'],
    carousel: ['transition'],
    'jquery-ui': ['jquery'],
    utilities: ['jquery', 'backbone', 'backbone.validation'],
    marionette : ['jquery', 'underscore', 'backbone'],
    app: [
      'json2',
      'backbone', 
      'carousel', 
      'backbone.validation', 
      'utilities', 
      'collapse', 
      'jquery-ui', 
      'Hogan', 
      'dropdown', 
      'iframe-transport'
    ],
    appMarionette: [
      'marionette',
      'hbs', 
      'spin',
      'spin.jquery'
    ]
  },

});

require([
  'app', 
  'appMarionette', 
  'require',
  ], function(app, appMarionette, require) {
    app.initialize();
    require([
      'apps/manuals/manuals_app', 
      'apps/categories/categories_app', 
      'entities/categories', 
      'entities/manuals', 
      //'apps/common/loading',
    ], function(){
      appMarionette.start();
    })
});
