define([ 
  'exports',
], function(exports){

  var App = new Marionette.Application();

  App.addRegions({
    //headerRegion: "#header-region",
    //mainRegion: "#main-region",
    mainRegion: "#app",
    dialogRegion: "#dialog-region",
    alertRegion: "#alert-region",
    //dialogRegion: Marionette.Region.Dialog.extend({ el: "#dialog-region" })
  });

  App.navigate = function(route,  options){
    options || (options = {});
    Backbone.history.navigate(route, options);
  };

  App.getCurrentRoute = function(){
    return Backbone.history.fragment
  };

  App.on("initialize:after", function(){
    //require(['apps/manuals/manuals_app', 'apps/categories/categories_app'],function(){ 
      if(Backbone.history){
        Backbone.history.start({pushState: true})
      }
    //});
  });

   ///exports.App = App

  return App;
});
