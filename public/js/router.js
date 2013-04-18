define(function(require) {

  var ContactView = require('views/contact')

  var Router = Backbone.Router.extend({

    initialize: function() {
      _.bindAll(this) 
    },

    routes: {
      "": "index",
    },

    index: function() {
      $('#myCarousel').carousel('cycle')
    },

    contact: function() {
      var view = new ContactView({el: $('.contact')} )
      $('#app').html(view.render().el)
      document.title = 'Contact'
    },

  });

  return Router;
});
