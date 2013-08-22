define([ 
  'appMarionette',
  'apps/common/loading',
  'apps/manuals/admin/admin_view',
], function(App, Loading, AdminView){
  return {
    admin: function(){
      var loadingView = new Loading();
      App.mainRegion.show(loadingView);
      
      var layoutView = new AdminView.Layout();

      layoutView.on('show', function(){
        App.trigger("categories:list", layoutView.categoriesRegion) 
        App.trigger("manuals:editableList", layoutView.manualsRegion) 
      })

      App.mainRegion.show(layoutView);
    },

  }
});
