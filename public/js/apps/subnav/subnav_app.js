define([ 
  'appMarionette',
  'apps/subnav/list/list_controller',
], function(App, ListController ){

  App.on("subnav:list", function(view){
    ListController.listSubnav(view)
  });

});

