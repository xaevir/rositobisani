define(function(require) {


var tpl = require('text!manuals/templates/edit.mustache')
  , tplSubCat = require('text!manuals/templates/editSubCats.mustache')
  , AlertView = require('views/site/alert').alert         
  , AlertErrorView = require('views/site/alert').error         
  , Manual = require('manuals/models/manual')
  , Products = require('collections/products')

return Backbone.View.extend({

  events: {
    'change input[type="file"]':  'fileUpload',
    'change input[type="text"]':  'setName',
    'change .category':           'setCategory',
    'change .subcategory':        'setSubCategory',
  },

  values: {},

  hasSubCats: false,

  template: Hogan.compile(tpl),

  templateSubCat: Hogan.compile(tplSubCat),

  initialize: function(options){
    _.bindAll(this); 
    this.on('catSet', this.shouldAddSubCat, this)
    this.on('catHasSubCats', this.addSubCat, this)
    this.on('catNoSubCats', this.removeSubCat, this)
  },

  setName: function(e){
    var input = $(e.currentTarget)
    var name = input.val()
    this.values.name = name
  },

  shouldAddSubCat: function(currentCat){
    var products = new Products()
    var catWithSubCats = _.find(products.categories, function(cat){ 
      return cat.name == currentCat && cat.subcategories
    });
    if (catWithSubCats)
      this.trigger('catHasSubCats', catWithSubCats)
    else
      this.trigger('catNoSubCats')
  },

  addSubCat: function(cat){
    var template = this.templateSubCat.render({subCats: cat.subcategories})
    this.$('.subCat').html(template)
    this.hasSubCats = true
  },

  removeSubCat: function(currentCat){
    this.$('.subCat').html('')
    this.hasSubCats = false
  },

  setCategory: function(e){
    this.selectEl = $(e.currentTarget)
    var category = this.selectEl.val()
    this.values.category = category
    this.trigger('catSet', category)
  },

  fileUpload: function(e){
    this.inputEl = $(e.currentTarget)
    this.inputEl.addClass("loading")
    var products = new Products()
    this.model = new Manual()
    this.model.cats = products.categories
    Backbone.Validation.bind(this)
    this.model.bind('validated:valid', this.upload) 
    this.model.set(this.values)
    this.model.validate()

    /*
    var data = this.model.toJSON() 

    $.ajax('/manuals', {
      data: data,
      processData: false,
      type: 'POST',
      files: this.inputEl,
      iframe: true,
      dataType: "json",
      success: this.successUpload,
      context: this
    })
    */
  },
  
  upload: function() {
    alert('uploaded')
  },

  successUpload: function(res){
    var manual = new Manual(res.data)
    this.render()
    this.collection.add(manual)
    new AlertErrorView({message: '<strong>Uploaded</strong>', type: 'info'})
  },

  render: function(){
    var products = new Products() 
    var locals = {categories: products.categories}
    var template = this.template.render(locals)
    $(this.el).html(template)
    return this; 
  },
})
})
