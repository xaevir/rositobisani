define([ 
  'appMarionette',
  'apps/static/home/show_controller',
  'apps/static/about/show_controller',
], function(App, HomeController, AboutController ){

  App.Router = Marionette.AppRouter.extend({
    appRoutes: {
      '': 'home',
      'about': 'about'
    }
  });

  var API = {

    home: function(){
      HomeController.showHome()
      App.execute("set:active:link", "home")
    },

    about: function(){
      AboutController.showAbout()
      App.execute("set:active:link", "about")
    }

  };

  App.on("home:show", function(){
    API.home()
    App.navigate("/");
  });

  App.on("about:show", function(){
    API.about()
    App.navigate("about");
  });

  new App.Router({ controller: API });

});
