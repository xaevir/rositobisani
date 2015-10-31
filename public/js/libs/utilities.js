$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

// validation message when attr required
Backbone.Validation.messages.required = 'required'

_.extend(Backbone.Validation.callbacks, {
  valid: function(view, attr, selector) {
    var el = view.$('[' + selector + '~=' + attr + ']')
    var errorEl = el.next() 
    if (errorEl.hasClass('error'))  
      errorEl.remove()
  },
  invalid: function(view, attr, error, selector) {
    // TODO add multiple errors
    var el = view.$('[' + selector + '~=' + attr + ']')
    var sibling = el.next()
    //reset 
    if (sibling.hasClass('error')) 
      sibling.remove()
    el.after('<span class="error">' + error + '</span>')
  }
})


/*
Backbone.Router.prototype.route = function(route, name, callback) {
  if (!_.isRegExp(route)) route = this._routeToRegExp(route);
  if (_.isFunction(name)) {
    callback = name;
    name = '';
  }
  if (!callback) callback = this[name];
  var router = this;
  Backbone.history.route(route, function(fragment) {
    var args = router._extractParameters(route, fragment);
    callback && callback.apply(router, args);
    router.trigger.apply(router, ['route:' + name].concat(args));
    router.trigger('route', name, args);
    Backbone.history.trigger('route', router, name, args);
  });
  return this;
}
*/
/*
var _route = Backbone.Router.prototype.route
Backbone.Router.prototype.route = function(route, name, callback) {
  var callback = this[name]
  return _route.call(this, route, name, function() {
    //_.bind(this.reset, BaseRouter);
    //this.preroute.call(BaseRouter, name)
    if (typeof callback !== 'undefined')
      callback.apply(this, arguments);
  });
}
*/
/*
Backbone.history.preroute = function(fragment, handler.callback)  {
  if(this.prevRoute)
    if(_.has(this, 'reset_'+this.prev_route)){
      var path = 'reset_'+this.prev_route 
      this[path]()
    }
  this.prevRoute = fragment
  this.prevCallback = handler.callback
}


// Attempt to load the current URL fragment. If a route succeeds with a
// match, returns `true`. If no defined routes matches the fragment,
// returns `false`.
Backbone.History.prototype.loadUrl = function(fragmentOverride) {
  var fragment = this.fragment = this.getFragment(fragmentOverride);
  var matched = _.any(this.handlers, function(handler) {
    if (handler.route.test(fragment)) {
      this.preroute(fragment, handler.callback)  
      handler.callback(fragment);
      return true;
    }
  });
  return matched;
}
*/


 
function extendEach () {
  var args  = Array.prototype.slice.call(arguments),
      child = this;

  _.each(args, function (proto) {
    child = child.extend(proto);
  });

  return child;
}

Backbone.Model.extendEach        =
  Backbone.Collection.extendEach =
  Backbone.Router.extendEach     =
  Backbone.View.extendEach       = extendEach;

