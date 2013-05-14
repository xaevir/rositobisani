require.config({
  paths: {
    jQuery: 'libs/jquery',
    Underscore: 'libs/underscore',
    Backbone: 'libs/backbone',
    Hogan: 'libs/hogan',
    'Backbone.Validation': 'libs/backbone.validation',
    text: 'libs/text',
    templates: '../templates',
    transition: 'libs/bootstrap/js/bootstrap-transition',
    carousel:   'libs/bootstrap/js/bootstrap-carousel',
    collapse: 'libs/bootstrap/js/bootstrap-collapse',
    dropdown: 'libs/bootstrap/js/bootstrap-dropdown',
    utilities: 'libs/utilities'
  },

  shim: {
    'Backbone': ['Underscore', 'jQuery'],
    //'jQuery': { exports: ['$'] },
    'Backbone.Validation': ['Backbone'],
    'transition': ['jQuery'],
    'collapse' : ['jQuery'],
    'dropdown' : ['jQuery'],
    'carousel': ['transition'],
    'utilities': ['jQuery', 'Backbone', 'Backbone.Validation'],
    'app': ['Backbone', 'carousel', 'Backbone.Validation', 'utilities', 'collapse', 'Hogan', 'dropdown']
  }
});

require(['app'], function(app) {
  app.initialize();
});
