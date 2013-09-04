define([ 
  'hbs!apps/manuals/templates/edit_form',
], function(editFormTpl){

  return Marionette.ItemView.extend({ 

    template: editFormTpl,

    initialize: function(){
      // _.bindAll(this); 
      //this.title = 'Edit ' + this.model.get('name')
    },

    events: {
      'click button.js-submit': 'submitClicked'
    },

    submitClicked: function(e) {
      e.preventDefault()
      var params = this.$('form').serializeObject();
      this.trigger('form:submit', params)
    },
 
    onShow: function() {
      this.$el.dialog({
        modal: true,
        //title: view.title,
        width: "auto"
      })
    }
  });
});
