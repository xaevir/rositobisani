define([ 
  'appMarionette',
  'apps/static/home/show_view',
//  'views/site/stopClick',
], function(App, ShowHome){
  return {
    showHome: function() {
      $.get('/', function(obj) {
        var showHome = new ShowHome({tpl: obj.body})
        App.mainRegion.show(showHome);
        document.title = obj.title

        showHome.on("navigate", function(target){
          App.trigger('products:list', target);
        });
      })
    },
  }
});
