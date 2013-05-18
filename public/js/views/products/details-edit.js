define(function(require) {

var tpl = require('text!templates/products/product-details.mustache')
  , AlertView = require('views/site/alert').alert         
  , Product = require('models/product')
  , Products = require('collections/products')

return Backbone.View.extend({

  template: Hogan.compile(tpl),

  className: 'well',

  events: {
    'submit form' : 'submit',
  },

  initialize: function(options){
    _.bindAll(this); 
    Backbone.Validation.bind(this)
    this.model.on('sync', this.notice, this) 
  },

  render: function(){
    var products = new Products()
    var locals = this.model.toJSON()
    locals.categories = products.categories
    locals.subcategories = products.subcategories

    _.each(products.categories, function(category){
      if(locals.category.slug == category.slug)
        category.selected = true 
    })

    _.each(products.subcategories, function(subcategory){
      if(locals.subcategory.slug == subcategory.slug) 
        subcategory.selected = 'selected'
    })

    var template = this.template.render(locals)
    $(this.el).html(template);
    return this; 
  },

  submit: function(e) {
    //if (!window.user.isLoggedIn()) 
      //return this.navigate('/', true)
    e.preventDefault()
    var params = this.$('form').serializeObject();

    // set the category only if its present
    if (params.category) {
      // get the name from the html  
      var catLabel = this.$('option[value="' + params.category + '"]').html()
      params.category = {slug: params.category, name: catLabel}
    }

    // set the category only if its present
    if (params.subcategory) {
      // get the name from the html  
      var subcatLabel = this.$('option[value="' + params.subcategory + '"]').html()
      params.subcategory = {slug: params.subcategory, name: subcatLabel}
    }

    // hack put this in model validation later
    // taking out bc the model is not resetting on new model in router
    //if (params.category.name == 'Espresso Machines') {
    //  this.model.validation.subcategory = {required: true}
    //}

    this.model.save(params);
  },

  notice: function(){
    new AlertView({message: '<strong>Saved</strong>', type: 'info'})
  },
});

});
