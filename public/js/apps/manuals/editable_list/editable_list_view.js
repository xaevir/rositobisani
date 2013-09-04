define([ 
  'hbs!apps/manuals/templates/editable_item',
  'hbs!apps/manuals/templates/editable_list_panel',
  'hbs!apps/manuals/templates/editable_list_layout',
], function(editableItemTpl, panelTpl, layoutTpl ){

  var Views = {}
  
  Views.Layout = Marionette.Layout.extend({
    template: layoutTpl,
  
    id: 'manuals',

    regions: {
      panelRegion: "#editable-panel-region",
      manualsRegion: "#editable-manuals-region"
    }
  });

  Views.Panel = Marionette.ItemView.extend({
    template: panelTpl,

    triggers: {
      'click button.js-new': 'manual:new'
    }
  })


  var Manual = Backbone.Marionette.ItemView.extend({
    tagName: "li",
    template: editableItemTpl,

    initialize: function() {
      this.model.view = this 
    },

    events: {
      "click button.js-delete": "deleteClicked",
      "click a.js-edit":   "editClicked"
    },

    editClicked: function(e){
      e.preventDefault()
      this.trigger("manual:edit", this.model);
    },

    deleteClicked: function(e){
      this.trigger("contact:delete", this.model);
    },

    remove: function(){
      this.$el.fadeOut(function(){
        $(this).remove();
      });
    },

    flash: function(cssClass) {
      var $view = this.$el
      $view.hide().toggleClass(cssClass).fadeIn(800, function(){
        setTimeout(function(){
          $view.toggleClass(cssClass)
        }, 500)
      })
    }
  })
  
  Views.Manuals = Backbone.Marionette.CollectionView.extend({
    tagName: "ul",
    className: 'item-rows',
    //template: tplList, 
    itemView: Manual,
    //itemViewContainer: "tbody"
  })

  return Views
});
