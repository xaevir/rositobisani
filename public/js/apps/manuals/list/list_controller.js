define([
  'appMarionette',
  'apps/manuals/list/list_view',
], function(App, ManualsListView){
  return {
    listManuals: function(view){

      var fetchingManuals = App.request("manual:entities:sorted");

      var ManualView = Backbone.Marionette.ItemView.extend({
        id: 'manuals',
      });

      $.when(fetchingManuals).done(function(manualsHtml){
        console.log(manualsHtml);
        var manualView = new ManualView({
          template : function(serialized_model) {
            return _.template(manualsHtml)({  });
          }
        });

        App.mainRegion.show(manualView);
      });
    }
  }
});
