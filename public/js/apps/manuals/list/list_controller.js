define([ 
  'appMarionette',
  'apps/common/loading',
  'apps/manuals/list/list_view',
], function(App, Loading, ManualsListView){
  return {
    listManuals: function(view){
      //var loadingView = new Loading();
      //App.mainRegion.show(loadingView);
        
      var fetchingManuals = App.request("manual:entities:sorted");
      
      $.when(fetchingManuals).done(function(manuals){
        var manualsListView = new ManualsListView({
          collection: manuals
        });

        App.mainRegion.show(manualsListView);
      });
    }
  }
});
