define(function(require) {
  var File = require('fileUpload/models/file')
  
  return Backbone.Collection.extend({

    model: File,

    url : '/files'

  })
})
