define([ 
  'hbs!apps/products/templates/list_item',
  'hbs!apps/products/templates/list_layout',
  'hbs!apps/products/templates/list_header',
  'hbs!apps/products/templates/list_subheader',
], function(itemTpl, layoutTpl, headerTpl, subHeaderTpl){

  var Model = Backbone.Model.extend({})

  var TreeCollection = Backbone.Collection.extend({
    model: Model
  })


  var ProductView = Backbone.Marionette.ItemView.extend({

    template: itemTpl,

    tagName: "li",



  });

  var SubHeaderView = Backbone.Marionette.CompositeView.extend({

    template: subHeaderTpl,
   
    itemViewContainer: ".item-rows",

    className: 'sub-section',

    itemView: ProductView,

    initialize: function(){
      var products = this.model.get('products');
      if (products){
        this.collection = new TreeCollection(products) 
        this.model.set('hasProducts', true);
      }
    },
  });

  var Categories = Backbone.Marionette.CompositeView.extend({

    template: headerTpl,

    tagName: "section",

    initialize: function(){

      this.$el.attr('id', this.model.get('slug'))

      var childrenSubHeads = this.model.get('children');
      if (childrenSubHeads) {
        this.collection = new TreeCollection(childrenSubHeads) 
        this.itemView = SubHeaderView
        this.model.set('hasSubHeaders', true)
        this.model.set('hasProducts', true)
      }
      else {
        var products = this.model.get('products');
        if (products) {
          this.collection = new TreeCollection(products)
          this.itemView = ProductView
          this.itemViewContainer = ".item-rows"
          this.model.set('hasProducts', true)
          this.model.set('hasSubHeaders', false)
        }
      }
    }

  });

  var API = {}

  API.Products = Backbone.Marionette.CollectionView.extend({
    className: 'items',
    itemView: Categories,
  })



  API.Layout = Backbone.Marionette.Layout.extend({
    id: 'products',

    template: layoutTpl,

    regions: {
      productsRegion: "#products-region",
      subnavRegion: "#subnav-region"
    },

    onLayoutRendered: function(target){
      $('body').scrollspy({ target: '.spy-nav', offset: 70 })
      if(target){
        var selector = 'a[href="#'+target+'"]'
        var anchor = $(selector);
        setTimeout(function(){ anchor.trigger('click')}, 300);
      }
    }

  });


  return API
});
