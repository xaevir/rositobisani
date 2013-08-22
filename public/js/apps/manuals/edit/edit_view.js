define([ 
  'hbs!apps/manuals/templates/edit_form',
], function(editFormTpl){

  return Marionette.ItemView.extend({ 

    template: editFormTpl,

    events: {
      'click button.js-submit': 'submitClicked'
    },

    initialize: function(options){
      _.bindAll(this); 
      //this.model.on('sync', this.notice, this) 
    },

    submitClicked: function() {
      var params = this.$('form').serializeObject();
      this.trigger('form:submit', params)
    },
  
  });
});
