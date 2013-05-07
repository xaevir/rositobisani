define(function(require) {

  var ContactView = require('views/contact')
  var NavView = require('views/nav')

  function setPageContent(content, title) {
    $('#app').html(content);
    document.title = title;
  }

  var rp = Backbone.Router.prototype
  var _route = rp.route;
  rp.route = function(route, name) {
    var callback = this[name]
    return _route.call(this, route, name, function() {
      //this.trigger.apply(this, ['beforeroute:' + name].concat(_.toArray(arguments)));
      this.reset(name)
      if (typeof callback !== 'undefined')
        callback.apply(this, arguments);
    });
  };

  var Router = Backbone.Router.extend({

    initialize: function() {
      _.bindAll(this) 
      //var navView = new NavView({el: $('.navbar')} )
    },

    routes: {
      //"": "home",
      //"v-red-white-border": "red_white_border",
      //"v-red-no-border": "red_no_border",
      //"v-red-border-gray": "red_border_gray",
      //"v-white": "white",
      //"icons": "icons",
    },

    //originalLogo: '/img/logo-white-gray-border.png',

    reset: function(route, section) {
      route = route.replace('route:', '');
      if(this.prev_route)
        if(_.has(this, 'reset_'+this.prev_route)){
          var path = 'reset_'+this.prev_route 
          this[path]()
        }
      this.prev_route = route
    },

    home: function() {
      this.newTpl;
      this.newTitle;

      $('#myCarousel').carousel('cycle')

      // currently loaded page as sent by non xhr request
      if ($('#home').length) {
        return
      }
      // page already loaded by another click
      else if (this.newTpl) {
        setPageContent(this.newTpl, this.newTitle)
        $('#myCarousel').carousel('cycle')
        return
      }
      else {
        var self = this
        $.get('/', function(obj) {
          self.newTpl = obj.body
          self.newTitle = obj.title
          setPageContent(self.newTpl, self.newTitle)
          $('#myCarousel').carousel('cycle')
        })
      }
    },

    mainSetup: function(func) {
      this.homeTpl;
      this.homeTitle;

      $('#myCarousel').carousel('cycle')
      if ($('#home').length) {
        return func()
      }
      else if (this.homeTpl) {
        setPageContent(this.homeTpl, this.homeTitle)
        return func()
      }
      else {
        var self = this
        $.get('/v-something', function(obj) {
          self.homeTpl = obj.body
          self.homeTitle = obj.title
          setPageContent(self.homeTpl, self.homeTitle)
          return func()
        })
      }
    },

    red_white_border: function() {
      this.mainSetup(function(){
        $('body').addClass('black-page')
        $('.navbar').addClass('navbar-inverse')
        $('.logo').attr('src', '/img/logo-red-white-border.png')
      })
    },

    reset_red_white_border: function(){
      $('body').removeClass('black-page')
      $('.navbar').removeClass('navbar-inverse')
      $('.logo').attr('src', this.originalLogo)
    },

    icons: function() {
      this.iconsTpl;
      this.iconsTitle;

      $('#myCarousel').carousel('cycle')

      $('body').addClass('icons-page')

      // currently loaded page as sent by non xhr request
      if ($('#icons').length) {
        return
      }
      // page already loaded by another click
      else if (this.iconsTpl) {
        setPageContent(this.iconsTpl, this.iconsTitle)
        return
      }
      else {
        var self = this
        $.get('/icons', function(obj) {
          self.iconsTpl = obj.body
          self.iconsTitle = obj.title
          setPageContent(self.iconsTpl, self.iconsTitle)
        })
      }
    },

    reset_icons: function(){
      $('body').removeClass('icons-page')
    },

    contact: function() {
      var view = new ContactView({el: $('.contact')} )
      $('#app').html(view.render().el)
      document.title = 'Contact'
    },

  });

  return Router;
});
