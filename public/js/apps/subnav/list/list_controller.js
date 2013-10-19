define([ 
  'appMarionette',
  'apps/subnav/list/list_view',
], function(App, ListSubnav){

  return {
    listSubnav: function(regionView){

      var fetchingCategories = App.request("category:entities");

      $.when(fetchingCategories).done(function(links){
        var listSubnav = new ListSubnav({ collection: links });

        regionView.show(listSubnav);

      });
    }
  }
});
