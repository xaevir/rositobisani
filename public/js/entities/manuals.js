define([ 
  'appMarionette',
  'entities/manual',
], function(App, Manual){

  var Manuals = Backbone.Collection.extend({
    url: "/manuals",
    model: Manual,
  });

  var API = {
    getAll: function(){
      var manuals = new Manuals();
      var defer = $.Deferred();
      manuals.fetch({
        success: function(data){
          defer.resolve(data);
        },
        error: function(data){
          defer.resolve(undefined);
        }
      });
      var promise = defer.promise();
      return promise;
    },

    getSorted: function(){
      var manuals = new Manuals();
      var defer = $.Deferred();

      $.get('/manuals/sorted', function(data) {
        manuals.reset(data)
        defer.resolve(manuals);
      });

      var promise = defer.promise();
      return promise;
    }
  };

  App.reqres.setHandler("manual:entities", function(){
    return API.getAll();
  });

  App.reqres.setHandler("manual:entities:sorted", function(){
    return API.getSorted();
  });

  return;
});
