define(function(require) {
  'use strict';
  var Router = require('routers/router'),
      User = require('models/user')

  var initialize = function() {
    window.dispatcher = _.clone(Backbone.Events);

    var user = new User(window.user)
    new Router(user)
  }

  return {
    initialize: initialize
  };
});
