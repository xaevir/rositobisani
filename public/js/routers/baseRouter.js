define(function(require) {

  var BaseRouter = {
    reset: function(route, section) {
      var routeStripped = route.replace('route:', '');
      if(this.prev_route)
        if(_.has(this, 'reset_'+this.prev_route)){
          var path = 'reset_'+this.prev_route 
          this[path]()
        }
      this.prev_route = routeStripped
    },
    route: function(route, name) {
      var callback = this[name]
      var _route = Backbone.Router.prototype.route
      return _route.call(this, route, name, function() {
        //this.trigger.apply(this, ['beforeroute:' + name].concat(_.toArray(arguments)));
        this.reset(name)
        if (typeof callback !== 'undefined')
          callback.apply(this, arguments);
      });
    }
  }
  return BaseRouter;
});
