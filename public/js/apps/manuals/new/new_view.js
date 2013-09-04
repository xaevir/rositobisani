define([ 
  'hbs!apps/manuals/templates/new_form',
], function(tpl){

  return Marionette.ItemView.extend({ 

    template: tpl,

    initialize: function(){
      _.bindAll(this); 
      this.title = 'New Manual'
    },

    events: {
      'click button.js-new': 'submitClicked',
    },

    //submitClicked: function(e) {
      //e.preventDefault()
      //this.trigger('form:submit', params)
    //},
 
    onShow: function() {
      this.$el.dialog({
        modal: true,
        title: this.title,
        width: "auto"
      })
    },

    submitClicked: function(e){
      e.preventDefault()
      var params = this.$('form').serializeObject();
      var fileEl = $('#manual-image')
      this.model.set(params)
      var valid = this.model.isValid(true)

      if (!valid) 
        return
      $.ajax('/manuals/upload', {
        data: JSON.stringify(this.model.toJSON()),
        files: fileEl,
        iframe: true,
        dataType: "json",
        processData: false,
        success: this.successUpload
      })
    },

    successUpload: function(res){
      this.model.clear() //bc file is set
      this.model.set(res)
      this.trigger('form:success', this.model)
    },
  });
});
