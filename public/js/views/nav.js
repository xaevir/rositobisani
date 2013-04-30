define(function(require) {

  return Backbone.View.extend({
    
    events: {
      //"click a": "preventDefault",
      "click a:not([href^='#'])": "pushState",
     // "click a[href^='#']": "hashState",
    },

    initialize: function(options){
      //this.router = options.router
    },

    preventDefault: function(e) {
      e.preventDefault() 
    },

    hashState: function(e) {
      var linkEl = $(e.currentTarget);
      var href = linkEl.attr("href");
      var href = href.substr(1)
      var route_name = this.router.routes[href]
      this.router[route_name]()
    },


    pushState: function(e) {
      e.preventDefault() 
      var linkEl = $(e.currentTarget);
      var href = linkEl.attr("href");
      var router = new Backbone.Router();
      router.navigate(href, true)
    },

  })
})
