define([
  'hbs!apps/products/templates/show',
], function(showTpl){
  'use strict';
  return Marionette.ItemView.extend({

    className:  'product',

    template: showTpl,

    initialize: function() {
      if (this.model.get('name') === "FGR Rotary Gas Fired" ||
          this.model.get('name') == "FGRi Rotary Wood Gas Hybrid") {
        this.model.set('hasCols', true);
        var pdfs = this.model.get('orignalFiles');
        this.model.set('column1', pdfs.column1)
        this.model.set('column2', pdfs.column2)
        this.model.set('column3', pdfs.column3)
      } else {
        this.model.set('pdfs', this.pickPdfs(this.model.get('files')));
      }
      var header = this.model.get('category').name + ' /'
      if (this.model.get('subcategory').name)
        header += ' ' +this.model.get('subcategory').name
      this.model.set('header', header)
    },

    pickPdfs: function(files){
      return files.reduce(function(memo, file) {
        if (file.get('type') === 'application/pdf')
          memo.push(file.toJSON())
        return memo
      }, [])
    }
  })
})
