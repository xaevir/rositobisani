define([ 
  'appMarionette',
], function(App){

  var internal = {}

  var Nav = Backbone.Model.extend({
    initialize: function(){
      var selectable = new Backbone.Picky.Selectable(this);
      _.extend(this, selectable);
    }
  });

  var NavCollection = Backbone.Collection.extend({
    model: Nav,

    initialize: function(){
      var singleSelect = new Backbone.Picky.SingleSelect(this);
      _.extend(this, singleSelect);
    }
  });

  var initializeNav = function(){
    internal.navCollection = new NavCollection([
      { name: "Home", url: "home", navigationTrigger: "home:show" },
      { name: "Products", url: "products", navigationTrigger: "products:list" },
      { name: "About", url: "about", navigationTrigger: "about:show" },
      { name: "Manuals", url: "manuals", navigationTrigger: "manuals:list" },
      { name: "Contact", url: "contact", navigationTrigger: "contact:show" },
    ]);
  };

  var API = {
    getNav: function(){
      if(internal.navCollection === undefined){
        initializeNav();
      }
      return internal.navCollection;
    }
  };

  App.reqres.setHandler("nav:entities", function(){
    return API.getNav();
  });
});
