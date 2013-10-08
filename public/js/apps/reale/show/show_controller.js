define([ 
  'appMarionette',
  'apps/common/loading',
  'apps/reale/show/show_view',
], function(App, Loading, ShowView){
  return {
    showReale: function() {
      var showView = new ShowView()
      App.mainRegion.show(showView);
    }
  }
});
