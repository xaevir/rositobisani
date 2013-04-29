define(function(require) {

  var ContactView = require('views/contact')
  var NavView = require('views/nav')
  ///var iconsTpl = require('text!templates/icons.html')
  //var homeTpl = require('text!templates/home.html')

  function autoResetRouter(){ 
    _(this.routes).each(function(destination) {
      _(this.routes).each(function(other) {
        if (destination === other) return;
        // route:x => reset_y
        if(_.has(this, 'reset_'+other))
          this.bind('route:'+destination, this['reset_'+other]);
      }, this);
    }, this);
  }

  function setPageContent(content, title) {
    $('#app').html(content);
    document.title = title;
  }

  var Router = Backbone.Router.extend({

    initialize: function() {
      _.bindAll(this) 
      var navView = new NavView({el: $('.navbar')} )
      autoResetRouter.call(this)
    },

    routes: {
      "": "home",
      "black": "black",
      "icons": "icons",
    },

    // write a closure 

    home: function() {
      this.homeTpl;
      this.homeTitle;

      $('#myCarousel').carousel('cycle')
      $('body').addClass('home-page')

      // currently loaded page as sent by non xhr request
      if ($('#home').length) {
        return
      }
      // page already loaded by another click
      else if (this.homeTpl) {
        setPageContent(this.homeTpl, this.homeTitle)
        return
      }
      else {
        var self = this
        $.get('/', function(obj) {
          self.homeTpl = obj.body
          self.homeTitle = obj.title
          setPageContent(self.homeTpl, self.homeTitle)
        })
      }
    },

    reset_home: function(){
      $('body').removeClass('home-page')
    },

    black: function() {
      this.blackTpl;
      this.blackTitle;

      $('#myCarousel').carousel('cycle')
      $('body').addClass('black-page')
      $('.navbar').addClass('navbar-inverse')
      $('.logo').attr('src', '/img/logo-red.png')

      if ($('#home').length) {
        return
      }
      else if (this.blackTpl) {
        setPageContent(this.blackTpl, this.blackTitle)
        return
      }
      else {
        var self = this
        $.get('/', function(obj) {
          self.blackTpl = obj.body
          self.blackTitle = obj.title
          setPageContent(self.blackTpl, self.blackTitle)
        })
      }
    },

    reset_black: function(){
      $('body').removeClass('black-page')
      $('.navbar').removeClass('navbar-inverse')
      $('.logo').attr('src', '/img/logo-white.png')
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
