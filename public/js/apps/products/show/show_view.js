define([
  'hbs!apps/products/templates/show',
], function(showTpl){
  'use strict';
  return Marionette.ItemView.extend({

    className:  'product',

    template: showTpl,

    initialize: function() {

      // dont need images in the files array pretty much ever. just need pdfs
      // so over ride files array
      this.model.set('files', this.model.get('files').reduce(function(memo, file) {
          if (file.get('type') === 'application/pdf')
            memo.push(file.toJSON())
          return memo
        }, [])
     );

      if (this.model.get('hasCols') !== true) {
        this.model.set('noCols', true)
      }


      //if (this.model.get('hasCols') !== true) {
      //  this.model.set('pdfs', this.pickPdfs(this.model.get('files')));
      //}
      var header = this.model.get('category').name + ' /'
      if (this.model.get('subcategory').name)
        header += ' ' +this.model.get('subcategory').name
      this.model.set('header', header)
    }
  })
})
