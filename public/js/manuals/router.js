define(function(require) {

  var ManualsView = require('manuals/views/list')
    , ManualsEdit = require('manuals/views/edit')
    , Manuals = require('manuals/collections/manuals')

  var Router = Backbone.Router.extend({ 

    initialize: function(user) {
      _.bindAll(this) 
      this.user = user
      this.on('manualsLoaded', this.edit, this)
    },

    routes: {
      'manuals'     : 'manuals',
      'manuals-test': 'manuals'
    },

    manuals: function() {
      var manuals = new Manuals()
      var self = this
      manuals.fetch({success: function(collection, res){
        var view = new ManualsView({collection: collection, user: this.user})
        var template = view.render().el
        $('#app').html(template)
        document.title = 'User Manuals' 
        self.trigger('manualsLoaded', collection)
      }})
    }, 
   
    edit: function(collection){
      if (this.user.isLoggedIn()) {
        var manualsEdit = new ManualsEdit({collection: collection})
        $('#jumboheader').after(manualsEdit.render().el)
      }

    },

  });

  return Router;
});
