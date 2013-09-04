define([ 
  'appMarionette',
  'apps/categories/list/list_controller',
], function(App, ListController ){

  App.Router = Marionette.AppRouter.extend({
    appRoutes: {
      //"admin/manuals/category/:id": "adminManuals"
    }
  });

  var API = {

    //adminManuals: function(id){
    //  AdminController.byCategory(id);
    //},
  };

// App.on('manual:category:selected', function(id){
//    App.navigate("admin/manuals/category/" + id);
//    EditableListController.list(id)
//  })

  App.on("categories:list", function(view){
    ListController.listCategories(view);
  });

  new App.Router({ controller: API });

});
