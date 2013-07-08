define(function(require) {
  var Manual = require('manuals/models/manual')
  
  return Backbone.Collection.extend({

    model: Manual,

    url : '/manuals',

  })
})
