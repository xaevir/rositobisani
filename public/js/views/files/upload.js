define(function(require) {

var tpl = require('text!templates/files/upload.html')
  , File = require('models/file')
  , AlertView = require('views/site/alert').alert         
  , AlertErrorView = require('views/site/alert').error         

require('libs/jquery.iframe-transport')  

return Backbone.View.extend({

  events: {
    'change input[type="file"]':  'fileUpload',
  },

  initialize: function(options){
    _.bindAll(this); 
  },

  fileUpload: function(e){
    this.inputEl = $(e.currentTarget)
    this.inputEl.addClass("loading")
    var valid = this.model.isValid(true)
    if (!valid) {
      this.render()
      new AlertErrorView({message: '<strong>Please add the product name and details first</strong>'})
      return
    }
    $.ajax('/upload/'+ this.model.id, {
      //data: JSON.stringify(this.model.toJSON()),
      files: this.inputEl,
      iframe: true,
      dataType: "json",
      success: this.successUpload
    })
  },

  successUpload: function(res){
    var file = new File(res.data)
    this.inputEl.removeClass("loading")
    this.inputEl.val('')
    var files = this.model.get('files')
    files.add(file)
    this.model.save() 
    this.model.trigger('change:files:added', file)
    new AlertView({message: '<strong>Uploaded</strong>', type: 'info'})

  },

  render: function(){
    $(this.el).html(tpl);
    return this; 
  },
});

});
