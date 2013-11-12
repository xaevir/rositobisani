define([ 
  'appMarionette',
], function(App){

  var File = Backbone.Model.extend({
    defaults: {
      name: '',
      type: '',
      medium: '',
      thumb: ''
    }
  })

  return Backbone.Collection.extend({
    model: File,
    url : '/files'
    //urlRoot : '/files',
  })
});
