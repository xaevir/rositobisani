define([ 
  'appMarionette',
  'apps/manuals/admin/admin_controller',
  'apps/manuals/editable_list/editable_list_controller',
  'apps/manuals/edit/edit_controller',
], function(App, AdminController, EditableListController, EditController ){

  App.Router = Marionette.AppRouter.extend({
    appRoutes: {
      //"manuals": "listManuals",
      "admin/manuals": "adminManuals",
      "admin/manual/:id/edit": "editManual"
    }
  });

  var API = {
    //listManuals: function(view){
    //  ListController.listManuals(view);
    //},

    adminManuals: function(){
      AdminController.admin();
    },

    editManual: function(id) {
      EditController(id)
    }
  };

  //App.on("manuals:list", function(view){
  //  App.navigate("manuals");
  //  API.listManuals(view);
  //});

  App.on("manuals:editableList", function(view){
    EditableListController(view)
  });

  App.on("manual:edit", function(id){
    App.navigate("admin/manual/" + id + "/edit");
    EditController(manual)
  });


  App.on("admin", function(){
    App.navigate("admin/manuals");
    API.adminManuals();
  });

  new App.Router({ controller: API });

});
