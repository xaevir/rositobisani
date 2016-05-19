define([
  'appMarionette',
  'apps/static/home/show_view',
//  'views/site/stopClick',
], function(App, ShowHome){
  'use strict';
  return {
    showHome: function() {
      $.get('/', function(html) {
        var showHome = new ShowHome({tpl: html})
        App.mainRegion.show(showHome);
        document.title = 'Rosito Bisani'

        showHome.on('navigate', function(target){
          // adding for listino to go to manuals page
          if (!target)
            App.trigger('manuals:list', target);
          else
          App.trigger('products:list', target);
        });
      })
    }
  }
});
