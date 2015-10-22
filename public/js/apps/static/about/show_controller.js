define([
  'appMarionette',
  'apps/static/about/show_view'
//  'views/site/stopClick',
], function(App, ShowAbout, Loading){
  'use strict';
  return {
    showAbout: function() {
      $.get('/about', function(obj) {
        var showAbout = new ShowAbout({template: obj.body})
        App.mainRegion.show(showAbout);
        document.title = obj.title
      })
    }
  }
});
