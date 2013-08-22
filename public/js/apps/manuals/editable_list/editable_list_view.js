define([ 
  'hbs!apps/manuals/templates/editable_item',
], function(editableItemTpl){
 
  var Manual = Backbone.Marionette.ItemView.extend({
    tagName: "li",
    template: editableItemTpl,

    events: {
      "click button.js-delete": "deleteClicked",
      "click button.js-edit":   "editClicked"
    },

    editClicked: function(e){
      this.trigger("manual:edit", this.model);
    },

    deleteClicked: function(e){
      this.trigger("contact:delete", this.model);
    },

    remove: function(){
      this.$el.fadeOut(function(){
        $(this).remove();
      });
    }
  })
  
  var Manuals = Backbone.Marionette.CollectionView.extend({
    tagName: "ul",
    className: 'item-rows',
    //template: tplList, 
    itemView: Manual,
    //itemViewContainer: "tbody"
  })

  return Manuals
});
