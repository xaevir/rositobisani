define([ 
  'appMarionette',
  'apps/common/loading',
  'apps/manuals/admin/admin_view',
  'apps/manuals/editable_list/editable_list_controller',
], function(App, Loading, AdminView, EditableListController){
  return {
    composite: function(catId, editManualId){
      var loadingView = new Loading();
      App.mainRegion.show(loadingView);
      
      var layoutView = new AdminView.Layout();

      layoutView.on('show', function(){

        App.trigger("categories:list", layoutView.categoriesRegion) 

        EditableListController.regionView = layoutView.manualsRegion

        if (editManualId) 
          EditableListController.listByManualId(editManualId)
        else {
          catId = catId || '51db047ebaea90738a903c1d'
          EditableListController.listByCat(catId)
        }
      })

      App.mainRegion.show(layoutView);
    },

  }
});
