define([ 
  'hbs!apps/categories/templates/item',
  'hbs!apps/categories/templates/categoryGroup',
  'appMarionette'
], function(tplItem, tplGroup, App){

  ChildView = Backbone.Marionette.ItemView.extend({
    template: tplItem,
    tagName: "li",
  });

  CategoryView = Backbone.Marionette.CompositeView.extend({
    template: tplGroup,
    tagName: "li",
    //className: "nav nav-list",
    itemView: ChildView,
    itemViewContainer: "ul",
    initialize: function(){
      this.collection = this.model.get('children');
    },
    events: {
      "click a": "showCategory",
    },
    showCategory: function(e) {
      e.preventDefault()
      App.trigger('category:selected', this.model.id)
    }
  });

  CategoriesView = Backbone.Marionette.CollectionView.extend({
    itemView: CategoryView,
    className: "nav nav-list well",
    tagName: "ul",
  });

  return CategoriesView
});
