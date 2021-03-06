define(function(require) {

var AlertView = require('views/site/alert')         
  , ProductDetailsEdit = require('views/products/details-edit') 
  , UploadView = require('fileUpload/views/uploadForm')
  , ThumbsView = require('fileUpload/views/thumbs')

return Backbone.View.extend({

  className: 'product',

  initialize: function(options){
    $(this.el).append('<div class="container"><div class="row">')
    $('.row', this.el).append('<div class="details span4"></div>')
    $('.row', this.el).append('<div class="files span8"></div>')
    _.bindAll(this, 'render'); 
  },

  render: function(){
    var productDetailsEdit = new ProductDetailsEdit({ 
      el: this.$(".details"), 
      model: this.model
    })
    productDetailsEdit.render()

    var uploadView = new UploadView({
      el: this.$('.files'), 
      model: this.model
    })
    uploadView.render()
 
    var thumbsView = new ThumbsView({
      model: this.model
    })
    var html = thumbsView.render().el
    this.$('.files').append(html)
    return this; 
  }

});

});
