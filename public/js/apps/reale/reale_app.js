define([ 
  'appMarionette',
  'apps/reale/show/show_controller',
], function(App, ShowController ){
  'use strict';

  App.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'espresso-machines/reale': 'showReale',
      'espresso-machines/reale/tabs/:tab': 'showReale'
    }
  });

  var API = {
    showReale: function(tab){
      ShowController.showReale(tab)
    }
  };

  App.on('reale:show', function(){
    API.showReale()
    //App.navigate('espresso-machines/reale');
    App.navigate('/');
  });

  new App.Router({ controller: API });

});
