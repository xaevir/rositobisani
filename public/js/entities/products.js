define([ 
  'appMarionette',
  'entities/product',
], function(App, Product){

  var Products = Backbone.Collection.extend({
    url: "/products",
    model: Product
  });

  var API = {
    getAll: function(){
      var products = new Products();
      var defer = $.Deferred();
      products.fetch({
        success: function(data){
          defer.resolve(data);
        },
        error: function(data){
          defer.resolve(undefined);
        }
      });
      var promise = defer.promise();
      return promise;
    },

    getSorted: function(){
      var products = new Products();
      var defer = $.Deferred();
      $.get('/products/sorted', function(data) {
        products.reset(data)
        defer.resolve(products);
      });
      var promise = defer.promise();
      return promise;
    }
  };

  App.reqres.setHandler("product:entities", function(){
    return API.getAll();
  });

  App.reqres.setHandler("product:entities:sorted", function(){
    return API.getSorted();
  });

  return;
});
