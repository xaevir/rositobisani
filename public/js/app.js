define(function(require) {

  var Router = require('routers/router')
  , User = require('models/user')
  , NavBar = require('views/navbar/navbar')    
  , RouterLanding = require('routers/routerLanding')
//  , RouterManuals = require('manuals/router')

  
  var initialize = function() {
    window.dispatcher = _.clone(Backbone.Events)

    var user = new User(window.user) 
    var router = new Router(user)
//    var router = new RouterManuals(user)


  }

  return {
    initialize: initialize
  };
});
