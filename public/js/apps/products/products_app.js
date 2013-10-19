define([ 
  'appMarionette',
  'apps/products/list/list_controller',
], function(App, ListController ){

  App.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "products": "listProducts",
    }
  });

  var API = {

    listProducts: function(target){
      ListController.listProducts(target)
      App.execute("set:active:link", "products")
    },

  };

  App.on("products:list", function(target){
    API.listProducts(target)
    App.navigate("products");
  });

  new App.Router({ controller: API });

});
