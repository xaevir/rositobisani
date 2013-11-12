define([ 
  'hbs!apps/nav/templates/nav-layout',
  'hbs!apps/nav/templates/nav-link',
], function(layoutTpl, linkTpl){
  'use strict';
  var Link = Marionette.ItemView.extend({
    template: linkTpl,
    tagName: 'li',

    events: {
      'click a:not([data-bypass])': 'navigate'
    },

    navigate: function(e){
      e.preventDefault();
      this.trigger('navigate', this.model);
    },

    onRender: function(){
      if(this.model.selected){
        // add class so Bootstrap will highlight the active entry in the navbar
        this.$el.addClass('active');
      }
    }
  });

  return Marionette.CompositeView.extend({
    template: layoutTpl,
    className: 'navbar',
    itemView: Link,
    itemViewContainer: '.nav.navbar-nav',

    appendHtml: function(collectionView, itemView){
      collectionView.$('.contact-numbers').before(itemView.el);
    },

    events: {
      'click a.navbar-brand': 'brandClicked'
    },

    brandClicked: function(e){
      e.preventDefault();
      this.trigger('brand:clicked');
    }
  });
});
