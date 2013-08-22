define([ 
  'hbs!apps/manuals/templates/item',
  'hbs!apps/manuals/templates/layout',
], function(itemTpl, layoutTpl){
 
  var View = {}
  View.Manual = Backbone.Marionette.ItemView.extend({
    tagName: "li",
    template: itemTpl,

    events: {
      "click": "highlightName",
      "click td a.js-show": "showClicked",
      "click button.js-delete": "deleteClicked"
    },

    highlightName: function(e){
      this.$el.toggleClass('warning');
    },

    showClicked: function(e){
      e.preventDefault();
      e.stopPropagation();
      this.trigger("contact:show", this.model);
    },

    deleteClicked: function(e){
      e.stopPropagation();
      this.trigger("contact:delete", this.model);
    },

    remove: function(){
      this.$el.fadeOut(function(){
        $(this).remove();
      });
    }
  })
  
  View.Manuals = Backbone.Marionette.CollectionView.extend({
    tagName: "ul",
    className: 'item-rows',
    //template: tplList, 
    itemView: View.Manual,
    //itemViewContainer: "tbody"
  })


  View.Layout = Marionette.Layout.extend({
    template: layoutTpl, 
    regions: {
      categoriesRegion: '#categories-region',
      manualsRegion: '#manuals-region'
    }
  })
  
  return View
});
