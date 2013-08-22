ContactManager.module('ContactsApp.New', function(New, ContactManager, Backbone, Marionette, $, _){
  New.Contact = ContactManager.ContactsApp.Common.Views.Form.extend({
    title: "New Contact",

    onRender: function(){
      this.$el.find(".js-submit").text("Create contact");
    }
  });
});