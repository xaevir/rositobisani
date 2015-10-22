define([
  'appMarionette',
  'apps/categories/list/list_view',
], function(App, Loading, ListCategoriesView){

  return {
    listCategories: function(regionView){

      var fetchingCategories = App.request("category:entities");

      $.when(fetchingCategories).done(function(categories){
        var listCategoriesView = new ListCategoriesView({ collection: categories });

        listCategoriesView.on('itemview:manual:category:selected', function(childView, model) {
          App.trigger('manual:category:selected', model.get('_id'))
        })

        listCategoriesView.on('itemview:itemview:manual:category:selected', function(parnetView, childView, model) {
          App.trigger('manual:category:selected', model.get('_id'))
        })


        regionView.show(listCategoriesView);

      });
    }
  }
});
