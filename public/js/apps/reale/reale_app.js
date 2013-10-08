define([ 
  'appMarionette',
  'apps/reale/show/show_controller',
], function(App, ShowController ){

  App.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'products/reale': 'showReale'
    }
  });

  var API = {
    showReale: function(){
      ShowController.showReale()
    },
  };

//  App.on("manual:edit", function(id){
//    App.navigate("admin/manuals/" + id + "/edit");
//  });

  new App.Router({ controller: API });

});
