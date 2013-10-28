define([ 
  'appMarionette',
  'apps/reale/show/show_controller',
], function(App, ShowController ){

  App.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'products/reale': 'showReale',
      'products/reale/tabs/:tab': 'showReale'
    }
  });

  var API = {
    showReale: function(tab){
      ShowController.showReale(tab)
    },
  };

  App.on("reale:show", function(){
    API.showReale()
    App.navigate("products/reale");
  });

  new App.Router({ controller: API });

});
