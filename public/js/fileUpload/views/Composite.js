define(function(require) {

var AlertView = require('views/site/alert')         
  //, ProductDetailsEdit = require('views/products/details-edit') 
  , UploadFormView = require('fileUpload/views/uploadForm')
  , ThumbsView = require('fileUpload/views/thumbs')

return Backbone.View.extend({

  className: 'fileUpload',

  initialize: function(options){
    $(this.el).append('<div class="container"><div class="row">')
    $('.row', this.el).append('<div class="fileUpload-composite span8"></div>')
    $('.fileUpload-composite', this.el).append('<div class="uploadForm"></div>')
    $('.fileUpload-composite', this.el).append('<div class="thumbs"></div>')
    _.bindAll(this, 'render'); 
  },

  render: function(){
    var uploadFormView = new UploadFormView({
      el: this.$('.uploadForm'), 
      model: this.model,
    })
    uploadView.render()
 
    var thumbsView = new ThumbsView({
      model: this.model
    })
    var html = thumbsView.render().el
    this.$('.files').append(html)
    return this; 
  },

});

});
