define([
  'appMarionette',
  'apps/manuals/edit/edit_view',
  'apps/manuals/show/show_view',
  'apps/common/alert',
], function(App, EditView, ShowView, AlertView){

  return function(id) {

    var fetchingManual = App.request("manual:entity", id) // in case url is random id

    $.when(fetchingManual).done(function(manual){

      var view;

      if(manual !== undefined){

        view = new EditView({
          model: manual
        })

        Backbone.Validation.bind(view);

        view.on("form:submit", function(data){
          if(manual.save(data)){

            App.dialogRegion.close() //this should be in view?

            var alertView = new AlertView()
            App.alertRegion.show(alertView);

            App.trigger('manual:model:updated', manual)
          }
        });
      }
      else {
        view = new ShowView.MissingManual()
      }
      App.dialogRegion.show(view);
    })
  }
});
