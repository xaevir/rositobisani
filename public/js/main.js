require.config({
  paths: {
    jQuery: 'libs/jquery',
    Underscore: 'libs/underscore',
    Backbone: 'libs/backbone',
    'Backbone.Validation': 'libs/backbone.validation',
    text: 'libs/text',
    templates: '../templates',
    transition: 'libs/bootstrap/js/bootstrap-transition',
    carousel:   'libs/bootstrap/js/bootstrap-carousel',
    collapse: 'libs/bootstrap/js/bootstrap-collapse',
    utilities: 'libs/utilities'
  },

  shim: {
    'Backbone': ['Underscore', 'jQuery'],
    //'jQuery': { exports: ['$'] },
    'Backbone.Validation': ['Backbone'],
    'transition': ['jQuery'],
    'collapse' : ['jQuery'],
    'carousel': ['transition'],
    'utilities': ['jQuery', 'Backbone', 'Backbone.Validation'],
    'app': ['Backbone', 'carousel', 'Backbone.Validation', 'utilities', 'collapse']
  }
});

require(['app'], function(app) {
  app.initialize();
});
