define([ 
  'appMarionette',
  'apps/categories/list/list_controller',
], function(App, ListController){

  App.on("categories:list", function(view){
    ListController.listCategories(view);
  });


});
