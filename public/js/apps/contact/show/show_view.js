define([ 
  'hbs!apps/contact/templates/form',
  'hbs!apps/contact/templates/layout',
], function(formTpl, layoutTpl){

  var Contact = {}

  Contact.Form = Marionette.ItemView.extend({ 

    template: formTpl,

    id: "contact-form",

    events: {
      'submit form' : 'submitClicked',
    },

    modelEvents: {
      "sync": "modelSynched"
    },

    modelSynched: function() {
      this.render();
    },

    submitClicked: function(e) {
      e.preventDefault()
      var params = this.$('form').serializeObject();
      this.trigger('form:submit', params)
    },

    onShow: function() {
      $('#carousel-about-us').carousel({
        interval: 4000
      })
    }
  })

  Contact.Layout = Marionette.Layout.extend({
    id: 'contact',
    regions: {
      formRegion: "#form-region",
      contentRegion: "#content-region"
    },
  });

  return Contact

});
