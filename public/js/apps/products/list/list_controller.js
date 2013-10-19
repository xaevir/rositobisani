define([ 
  'appMarionette',
  'apps/products/list/list_view',
], function(App, ProductsList){
  return {
    listProducts: function(target){

      var fetchingProducts = App.request("product:entities:sorted");

      var layout = new ProductsList.Layout()

      $.when(fetchingProducts).done(function(products){
        var productsList = new ProductsList.Products({
          collection: products
        });

        layout.on('show', function() {
          App.trigger("subnav:list", layout.subnavRegion) 

          layout.productsRegion.show(productsList)

          setTimeout(function() {
            layout.triggerMethod('layout:rendered', target)
          },100);
        })


        App.mainRegion.show(layout);

      });
    }
  }
});
