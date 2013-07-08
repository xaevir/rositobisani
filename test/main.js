require.config({
  baseUrl: '/',
  paths: {
    'jquery'                   : 'public/js/libs/jquery',
    'underscore'               : 'public/js/libs/underscore',
    'backbone'                 : 'public/js/libs/backbone',
    'backbone.validation'      : 'public/js/libs/backbone.validation',
    'text'                     : 'public/js/libs/text',
    'chai'          : 'public/js/libs/chai',
    'sinon'         : 'public/js/libs/sinon',
    'sinon-chai'    : 'public/js/libs/sinon-chai',
    'transition'    : 'public/js/libs/bootstrap/js/bootstrap-transition',
    'carousel'      : 'public/js/libs/bootstrap/js/bootstrap-carousel',
    'utilities'     : 'public/js/libs/utilities',
    'views'         : 'public/js/views',
    'models'        : 'public/js/models',
    'templates'     : 'public/templates',
    'fileUpload'    : 'public/js/fileUpload',
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'jquery': {
      exports: '$'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'sinon-chai': ['chai'],
    'backbone.validation': ['backbone'],
    'utilities': ['backbone', 'jquery', 'backbone.validation']
  },
//  urlArgs: 'bust=' + (new Date()).getTime()
});
 
require([
  'require', 
  'chai', 
  'sinon-chai', 
  'backbone', 
  'backbone.validation',
  'utilities',
  'sinon' ], function(require, chai, sinonChai){
  
  //window.chai = chai
  chai.use(sinonChai);
  window.expect = chai.expect
  window.should = chai.should()

  /*globals mocha */
  mocha.setup('bdd');
 
  require([
    'test/models/contact.js',
    'test/fileUpload/fileModel.js',
    //'test/views/landing/home-espresso-machine.js',
    
  ], function(require) {
    mocha.run();
  });
 
});

