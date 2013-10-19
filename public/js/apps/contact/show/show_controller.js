define([ 
  'appMarionette',
  'apps/contact/show/show_view',
  'entities/contact',
  'apps/common/alert',
], function(App, Contact, Model, AlertView){

  return {

    showContact: function() {

      var model = new Model()

      var form = new Contact.Form({model: model})

      Backbone.Validation.bind(form);

      form.on("form:submit", function(data){
        if(model.save(data)){
          var msg = 'Thank you for contacting us. We shall get back you back as soon as possible.'
          var alertView = new AlertView({message: msg})
          App.alertRegion.show(alertView);
        }
      });

      $.get('/contact', function(obj) {

        var layout = new Contact.Layout({template: obj.body})

        document.title = obj.title

        layout.on('show', function() {
          layout.formRegion.show(form)
        })

        App.mainRegion.show(layout);
      })
    }
  }
});
