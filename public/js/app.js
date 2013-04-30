define(function(require) {

  var Router = require('router')

  var initialize = function() {
    var router = new Router()
    Backbone.history.start({pushState: true})
  }

  return {
    initialize: initialize
  };
});
