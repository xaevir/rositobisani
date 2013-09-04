define([ 
  'appMarionette',
  'apps/manuals/admin/admin_controller',
  'apps/manuals/editable_list/editable_list_controller',
  'apps/manuals/edit/edit_controller',
  'apps/manuals/list/list_controller',
], function(App, AdminController, EditableListController, EditController, ListController ){

  App.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "manuals": "listManuals",
      "admin/manuals": "adminComposite",
      "admin/manuals/:id/edit": "editManual",
      "admin/manuals/category/:id": "adminComposite"
    }
  });

  var API = {

    listManuals: function(){
      ListController.listManuals()
    },
  
    adminComposite: function(id){
      AdminController.composite(id);
    },

    editManual: function(id) {
      AdminController.composite('', id);
      //EditController(id)
    },

  };

  App.on('manual:category:selected', function(id){
    App.navigate("admin/manuals/category/" + id);
    EditableListController.listByCat(id)
  })

  App.on("manual:edit", function(id){
    App.navigate("admin/manuals/" + id + "/edit");
  });

  new App.Router({ controller: API });

});
