define([ 
  'appMarionette',
  'apps/nav/list/list_controller',
], function(App, ListController){

  var API = {
    listNav: function(){
      ListController.listNav();
    }
  };

  App.commands.setHandler("set:active:link", function(name){
    ListController.setActiveLink(name);
  });

  API.listNav();
});
