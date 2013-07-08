define(function(require) {

  var RouterFileUpload = require('fileUpload/router')


  var initialize = function() {
    window.dispatcher = _.clone(Backbone.Events)
   
    var router = new RouterFileUpload()

    Backbone.history.start({pushState: true})
  }

  return {
    initialize: initialize
  };
});
