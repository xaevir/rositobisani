define(function(require) {

  var Router = require('manuals/router')
    , User = require('models/user')


  var initialize = function() {
    window.dispatcher = _.clone(Backbone.Events)
   
    var user = new User(window.user) 
    var router = new Router(user)

    Backbone.history.start({pushState: true})
  }

  return {
    initialize: initialize
  };
});
