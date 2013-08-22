define([ 
  'appMarionette',
  'apps/common/loading',
  'apps/categories/list/list_view',
], function(App, Loading, ListCategories){

  return {
    listCategories: function(view){
      var loadingView = new Loading();
      view.show(loadingView);

      var fetchingCategories = App.request("category:entities");

      $.when(fetchingCategories).done(function(categories){
        var listCategoriesView = new ListCategories({ collection: categories });
        view.show(listCategoriesView);
      });
    }
  }
});
