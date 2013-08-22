define([ 
  'appMarionette',
  'apps/common/loading',
  'apps/category/show/show_view',
], function(App, Loading, ShowView){
  return {
    showManualsByCategory: function(id){
      var loadingView = new Loading();
      App.mainRegion.show(loadingView);

      var fetchingContact = App.request("category:manual:entities", id);
      $.when(fetchingContact).done(function(contact){
        var contactView;
        if(contact !== undefined){
          contactView = new Show.Contact({
            model: contact
          });

          contactView.on("contact:edit", function(contact){
            ContactManager.trigger("contact:edit", contact.get('id'));
          });
        }
        else{
          contactView = new Show.MissingContact();
        }

        ContactManager.mainRegion.show(contactView);
      });
    }
  }
});
