define([ 
  'appMarionette',
  'apps/products/list/list_view',
  'apps/subnav/list/list_controller'
], function(App, ProductsList, SubnavController){
  'use strict';
  return {
    listProducts: function(target){

      var fetchingProducts = App.request('product:entities:sorted');

      var layout = new ProductsList.Layout()

      $.when(fetchingProducts).done(function(products){
        var productsList = new ProductsList.Products({
          collection: products
        });

        layout.on('show', function() {

          App.trigger('subnav:list', layout.subnavRegion)

          //setTimeout(function() {
          //  layout.triggerMethod('layout:rendered', target)
          //},100);
        })

        layout.subnavRegion.on('show', function(view) {

          layout.productsRegion.show(productsList)

        })

        productsList.on('show', function() {
          productsList.triggerMethod('layout:rendered', target)
        })

        App.mainRegion.show(layout);

      });
    }
  }
});
