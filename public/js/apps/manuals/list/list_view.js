define([ 
  'hbs!apps/manuals/templates/list_item',
  'hbs!apps/manuals/templates/list_layout',
  'hbs!apps/manuals/templates/list_header',
  'hbs!apps/manuals/templates/list_subheader',
], function(itemTpl, layoutTpl, headerTpl, subHeaderTpl){

  var Model = Backbone.Model.extend({})

  var TreeCollection = Backbone.Collection.extend({
    model: Model
  })


  var ManualView = Backbone.Marionette.ItemView.extend({

    template: itemTpl,

    tagName: "li",
    
  });

  var SubHeaderView = Backbone.Marionette.CompositeView.extend({

    template: subHeaderTpl,
   
    itemViewContainer: ".item-rows",

    className: 'subheader',

    itemView: ManualView,

    initialize: function(){
      var manuals = this.model.get('manuals');
      if (manuals){
        this.collection = new TreeCollection(manuals) 
        this.model.set('hasManuals', true);
      }
    },
  });


  var CategoryView = Backbone.Marionette.CompositeView.extend({

    template: headerTpl,

    className: "section",

    initialize: function(){
      var childrenSubHeads = this.model.get('children');
      if (childrenSubHeads) {
        this.collection = new TreeCollection(childrenSubHeads) 
        this.itemView = SubHeaderView
        this.model.set('hasSubHeaders', true)
        this.model.set('hasManuals', true)
      }
      else {
        var manuals = this.model.get('manuals');
        if (manuals) {
          this.collection = new TreeCollection(manuals)
          this.itemView = ManualView
          this.itemViewContainer = ".item-rows"
          this.model.set('hasManuals', true)
          this.model.set('hasSubHeaders', false)
        }
      }
    }

  });

  var CategoriesView = Backbone.Marionette.CompositeView.extend({
    id: 'manuals',

    template: layoutTpl,

    itemView: CategoryView,

    itemViewContainer: ".body",

  });


  return CategoriesView
});
