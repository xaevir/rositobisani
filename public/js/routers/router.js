define(function(require) {

var BaseRouter = require('routers/baseRouter')
  , SignupView = require('views/users/signup').signup
  , LoginView = require('views/users/login').login
  , ContactView = require('views/contact')
  , NavView = require('views/navbar/navbar')
  , User = require('models/user')
  , NewUser = require('models/newUser')
  , Products = require('collections/products') 
  , Product = require('models/product') 
  , ProductsView = require('views/products/products')
  , ProductView = require('views/products/product')
  , ProductEditView = require('views/products/product-edit')
  , ContextualMenuView = require('views/products/contextual-menu')
  , PageHeaderView = require('views/site/page-header')
  , SubnavView = require('views/products/subnav')
  , StopClickView = require('views/site/stopClick')

  function setPageContent(content, title) {
    $('#app').html(content);
    document.title = title;
  }

  var alreadyLoggedIn = function(callback) { 
    if (this.user.isLoggedIn()) 
      return this.navigate('/', true)
    callback.apply(this, Array.prototype.slice.call(arguments,1)); 
  }

  var restrict = function(callback) { 
    if (!this.user.isLoggedIn()) 
      return this.navigate('/login', true)
    callback.apply(this, Array.prototype.slice.call(arguments,1)); 
  }

  var Router = Backbone.Router.extend({ 

    initialize: function(user) {
      _.bindAll(this) 
      this.user = user 
      window.dispatcher.on('session:logout', this.logout, this)
      var navView = new NavView({user: this.user}).render()
      $.ajaxSetup({ cache: false });
    },

    routes: {
        '':                             'home'
      , 'login':                        'login'
      , 'signup':                       'signup'
      , 'products':                     'products'
      , 'products/:slug/edit':          'productEdit'
      , 'products/:slug/delete':        'productDelete'
      , 'products/new'  :               'newProduct'
      , 'products/:slug':               'product'
      , 'contact':                      'contact'
      , 'about':                        'about'
      , 'privacy-policy':               'privacyPolicy'
    },

    reset: function(route)  {
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
        //_.bind(this.reset, BaseRouter);
        this.reset(name)
        if (typeof callback !== 'undefined')
          callback.apply(this, arguments);
      });
    },
  
    home: function() {
      if ($('#home').length) {
        $('#myCarousel').carousel({
          interval: 3000
        })
        // for screen larger than 1600 width 
        var winWidth = $(window).width()
        if(winWidth >1600 )
          $('#myCarousel img').css('width', winWidth) 

        var view = new StopClickView({el: $('.icons')} )
        return
      }
      $.get('/', function(obj) {
        $('#app').html(obj.body);
         document.title = obj.title
        $('#myCarousel').carousel('cycle')
        var view = new StopClickView({el: $('.icons')} )
      })
    }, 

    contact: function() {
      if ($('#contact').length) {
        this.contactForm() 
      } else {
        var self = this
        $.get('/contact', function(obj) {
          $('#app').html(obj.body);
          document.title = obj.title
          self.contactForm()
        })
      }
    },
    
    contactForm: function() {
      var view = new ContactView({el: $('.contact')} )
      var html = view.render()
    },

    about: function() {
      $('body').addClass('narrowPage')
      if ($('#about').length) 
        return
      $.get('/about', function(obj) {
        $('#app').html(obj.body);
        document.title = obj.title
        var view = new ContactView({el: $('.contact')} )
        var html = view.render()
        //$('#app').html(html)
      })
    },

    reset_about: function(){
      $('body').removeClass('narrowPage')
    },

    privacyPolicy: function() {
      $('body').addClass('narrowPage')
      if ($('#privacyPolicy').length) 
        return
      $.get('/privacy-policy', function(obj) {
        $('#app').html(obj.body);
        document.title = obj.title
      })
    },

    reset_privacyPolicy: function(){
      $('body').removeClass('narrowPage')
    },

    login:  _.wrap(function(){
      var view = new LoginView({user: this.user}).render()
      $('body').addClass('login')
      $('#app').html(view.el)
      document.title = 'Login'
    }, alreadyLoggedIn),

    reset_login: function(){
      $('body').removeClass('login')
    },

    signup: _.wrap(function(){ 
        this.signupView = new SignupView({model: new NewUser(), user: this.user})
        this.signupView.render();
        $('body').addClass('signup')
        $('#app').html(this.signupView.el)
        document.title = 'Sign Up'
      }, alreadyLoggedIn
    ),

    reset_signup: function(){
      $('body').removeClass('signup')
    },

    logout: function(){
      console.log('router.logout.on->session:logout')
      $.ajax({
        type: "DELETE",
        url: "/user",
        success: function(){
          this.user.clear(); 
          var router = new Backbone.Router();
          router.navigate('login', {trigger: true})
        }
      });
    },

    newProduct: _.wrap(function(){
        var product = new Product()
        var productEditView = new ProductEditView({model: product})
        $('#app').html(productEditView.render().el)
        document.title = 'New Product'
      }, restrict),

    productEdit: _.wrap(function(slug){
      var product = new Product({slug:slug})
      product.fetch({success: function(model, res){
        var productEditView = new ProductEditView({model: model})
        $('#app').html(productEditView.render().el)
        document.title = 'Edit Product'
      }})
    }, restrict),

    productDelete: _.wrap(function(slug){
      $.ajax({
        type: "DELETE",
        url: "/products/" + slug,
        success: function(res){
          var successAlert = new AlertView({
            message: '<strong>' + res.data.name + ' removed</strong>',
            type: 'info'
          })
          successAlert.fadeOut()
          var router = new Backbone.Router();
          router.navigate('products', {trigger: true})
        }
      });
    }, restrict),

    products: function(){ 
      var products = new Products()
      var self = this
      products.fetch({success: function(collection, res){
        this.productsView = new ProductsView({collection: collection})  
        var template = this.productsView.render().el
        $('#app').html(template)
        this.subnavView = new SubnavView()
        $('#jumboheader').after(this.subnavView.render().el)
        this.subnavView.setOffsetTop()
        //self.subnavView = new SubnavView()
        //self.pageHeaderView = new PageHeaderView({header: header})
        //self.pageHeaderView.render()
        document.title = 'Products' 
      }})
    },  
    
    'reset_products': function(){
      if (this.pageHeaderView)
        this.pageHeaderView.remove()
      if (this.subnavView)
        this.subnavView.remove()
    },

    contextualMenu: function(model){
      if (this.user.isLoggedIn()){ 
        this.contextualMenuView = new ContextualMenuView({model: model})
        var template = this.contextualMenuView.render().el
        $('.nav.main').after(template)
      }
    },

    product: function(slug){
      var product = new Product({slug: slug})
      var self = this
      //if scrolled down when clicking on product from products page
      // then the top navbar was being cut off on click of the specific product 
      $('html, body').scrollTop(0)
      product.fetch({success: function(model, res){
        var productView = new ProductView({model: model})
        $('#app').html(productView.render().el)
        document.title = model.get('name')+' - '+model.get('category').name
        self.contextualMenu(model) 

        var header = model.get('category').name
        if (model.get('subcategory').name)
          header += ' / ' +model.get('subcategory').name

        self.pageHeaderView = new PageHeaderView({header: header}) 
        self.pageHeaderView.render()

      }})
    },

    reset_product: function(){
      if (this.contextualMenuView)
        this.contextualMenuView.remove()
      if (this.pageHeaderView)    
        this.pageHeaderView.remove()
    },
  });



  return Router;
});
