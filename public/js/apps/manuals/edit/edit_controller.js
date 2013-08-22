define([ 
  'appMarionette',
  'apps/common/loading',
  'apps/manuals/edit/edit_view',
  'apps/manuals/show/show_view',
], function(App, Loading, EditView, ShowView ){

  return function(id) {
    var loadingView = new Loading();
    App.mainRegion.show(loadingView);

    var fetchingManual = App.request("manual:entity", id) 
    $.when(fetchingManual).done(function(manual){
      var view;
      if(manual !== undefined){
        view = new EditView({
          model: manual
        })
        Backbone.Validation.bind(view);
        view.on("form:submit", function(data){
          if(manual.save(data)){
            alert("saved, now go back screen")
            //ContactManager.trigger("contact:show", contact.get('id'));
          }
        });
      }
      else {
        view = new ShowView.MissingManual() 
      }
      App.mainRegion.show(view);
    })
  }
});
