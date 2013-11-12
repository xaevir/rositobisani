define([ 
  'appMarionette',
  'apps/contact/show/show_controller',
], function(App, ShowController ){

  App.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'contact': 'contact'
    }
  });

  var API = {
    contact: function(){
      ShowController.showContact()
      App.execute("set:active:link", "contact")
    }
  };

  App.on("contact:show", function(){
    API.contact()
    App.navigate("/contact");
  });

  new App.Router({ controller: API });

});
