require.config({
  //baseUrl: '/public/',
  paths: {
    'jquery'        : '/js/libs/jquery',
    'underscore'    : '/js/libs/underscore',
    'backbone'      : '/js/libs/backbone',
    'text'          : '/js/libs/text',
    'mocha'         : '/node_modules/mocha/mocha',
    'chai'          : '/node_modules/chai/chai',
    'sinon'         : '/node_modules/sinon/pkg/sinon',
    'sinon-chai'    : '/node_modules/sinon-chai/lib/sinon-chai',
    'transition'    : '/js/libs/bootstrap/js/bootstrap-transition',
    'carousel'      : '/js/libs/bootstrap/js/bootstrap-carousel',
    'utilities'     : '/js/libs/utilities'

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
    'carousel': {
      deps: ['jquery'],
    },
    'sinon-chai': ['chai']
  },
//  urlArgs: 'bust=' + (new Date()).getTime()
});
 
require(['require', 'chai', 'sinon-chai', 'backbone', 'mocha', 'sinon', 'carousel'  ], function(require, chai, sinonChai){
  
  //window.chai = chai
  chai.use(sinonChai);
  window.expect = chai.expect
  window.should = chai.should


  /*globals mocha */
  mocha.setup('bdd');
 
  require([
    'routers/tested-routes.js',
  ], function(require) {
    mocha.run();
  });
 
});



