require.config({
  hbs: {
    disableI18n: true,
    disableHelpers: true,
    helperPathCallback:       // Callback to determine the path to look for helpers
      function (name) {       // ('/template/helpers/'+name by default)
        return 'cs!' + name;
      }
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
    transition:              'libs/bootstrap/js/transition',
    carousel:                'libs/bootstrap/js/carousel',
    collapse:                'libs/bootstrap/js/collapse',
    dropdown:                'libs/bootstrap/js/dropdown',
    tab:                     'libs/bootstrap/js/tab',
    scrollspy:               'libs/bootstrap/js/scrollspy',
    affix:                   'libs/bootstrap/js/affix',
    utilities:               'libs/utilities',
    'iframe-transport':      'libs/jquery.iframe-transport',
    appMarionette:           'app_marionette',
    spin:                    'libs/spin',
    'spin.jquery':           'libs/spin.jquery',
    'jquery-ui':             'libs/jquery-ui-1.10.3',
    picky:                   'libs/picky',
    stripe:                  'https://checkout.stripe.com/v2/checkout'
  },

  shim: {
    'iframe-transport': ['jquery'],
    'backbone': ['underscore', 'jquery'],
    'backbone.validation': ['backbone'],
    transition: ['jquery'],
    collapse : ['jquery'],
    dropdown : ['jquery'],
    scrollspy : ['jquery'],
    tab : ['jquery'],
    carousel: ['transition'],
    affix: ['transition'],
    'jquery-ui': ['jquery'],
    utilities: ['jquery', 'backbone', 'backbone.validation'],
    marionette : ['jquery', 'underscore', 'backbone'],
    'spin.jquery': ['jquery', 'spin'],
    picky: ['backbone', 'underscore'],
    app: [
      'json2',
      'backbone', 
      'carousel', 
      'backbone.validation', 
      'utilities', 
      'collapse', 
      'affix', 
      'jquery-ui', 
      'Hogan', 
      'dropdown', 
      'tab',
      'iframe-transport'
    ],
    appMarionette: [
      'marionette',
      'hbs', 
      'picky',
      'scrollspy'
    ]
  }
});

require([
  'app', 
  'appMarionette',
  'require',
], function(app, appMarionette, require) {
  'use strict';
    app.initialize();
    require([
      'entities/categories',
      'entities/manuals',
      'entities/products',
      'entities/nav',
      'entities/reviews',
      'apps/nav/nav_app',
      'apps/products/products_app',
      'apps/contact/contact_app',
      'apps/subnav/subnav_app',
      'apps/static/static_app',
      'apps/manuals/manuals_app',
      'apps/categories/categories_app',
      'apps/reale/reale_app',
      'apps/reviews/reviews_app',
    ], function(){
      appMarionette.start();

    })
});
