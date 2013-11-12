define([ 
  'appMarionette',
  'apps/static/about/show_view',
  'apps/common/loading',
//  'views/site/stopClick',
], function(App, ShowAbout, Loading){
  'use strict';
  return {
    showAbout: function() {
      //var loadingView = new Loading();
      //App.spinnerRegion.show(loadingView);

      $.get('/about', function(obj) {
        var showAbout = new ShowAbout({template: obj.body})
        App.mainRegion.show(showAbout);
        document.title = obj.title
      })
    }
  }
});
