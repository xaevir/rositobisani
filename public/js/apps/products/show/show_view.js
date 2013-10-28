define([ 
  'hbs!apps/products/templates/show',
], function(showTpl){

  return Marionette.ItemView.extend({

    className:  "product",

    template: showTpl,

    initialize: function() {
      var pdfs = this.getPdfs(this.model.get('files'))
      this.model.set('pdfs', pdfs)

      var header = this.model.get('category').name
      if (this.model.get('subcategory').name)
        header += ' / ' +this.model.get('subcategory').name
      this.model.set('header', header)
    },

    getPdfs: function(files){
      return files.reduce(function(memo, file) {
        if (file.get('type') == 'application/pdf') 
          memo.push(file.toJSON())
        return memo
      }, [])
    },
  })
})
