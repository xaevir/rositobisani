define(function(require) {

  var UploadForm = require('fileUpload/views/uploadForm')

  var Router = Backbone.Router.extend({ 

    initialize: function() {
      _.bindAll(this) 
    },

    routes: {
        'uploadForm': 'uploadForm'
    },

    uploadForm: function() {
      var view = new UploadForm().render()
      $('body').html(view.el)
    }, 


  });

  return Router;
});
