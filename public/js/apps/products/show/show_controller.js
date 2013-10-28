define([ 
  'appMarionette',
  'apps/products/show/show_view',
], function(App, ShowProduct){
  return {

    showProduct: function(slug){

      var fetchingProduct = App.request("product:entity", slug);

      $.when(fetchingProduct).done(function(model){

        document.title = model.get('name')+' - '+model.get('category').name

        var showProduct = new ShowProduct({model: model});

        App.mainRegion.show(showProduct);

      });
    }
  }
});
