define([ 
  'appMarionette',
  'apps/products/list/list_controller',
  'apps/products/show/show_controller',
], function(App, ListController, ShowController ){

  App.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "products":       "listProducts",
      "products/:slug": "showProduct"
    }
  });

  var API = {

    listProducts: function(target){
      ListController.listProducts(target)
      App.execute("set:active:link", "products")
    },

    showProduct: function(slug){
      if (slug =='reale')
        App.trigger('reale:show')
      else
        ShowController.showProduct(slug)
      App.execute("set:active:link", "")
    },
  };

  App.on("products:list", function(target){
    API.listProducts(target)
    App.navigate("products");
  });

  App.on("product:show", function(slug){
    API.showProduct(slug)
    App.navigate("products/"+slug);
  });


  new App.Router({ controller: API });

});
