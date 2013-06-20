define(function(require) {

  var Router = require('router')
  , User = require('models/user')
  , NavBar = require('views/navbar/navbar')    
  , RouterLanding = require('router-landing')


  var initialize = function() {
    window.dispatcher = _.clone(Backbone.Events)
  
    var router = new Router()
    var routerLanding = new RouterLanding()

    Backbone.history.start({pushState: true})
  }

  return {
    initialize: initialize
  };
});
