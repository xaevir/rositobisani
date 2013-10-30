define([ 
  'hbs!apps/subnav/templates/link',
  'hbs!apps/subnav/templates/layout',
], function(linkTpl, layoutTpl){
  'use strict';

  var Link = Marionette.ItemView.extend({
    template: linkTpl,
    tagName: 'li',

    events: {
      'click a': 'scroll'
    },

    initialize: function(){
      _.bindAll(this) 
    },

    scroll: function(e){
      e.preventDefault() 
      var target = this.model.get('slug');
      this.trigger('scrollTo:section', target)
      //this.trigger("set:active:link", target)
    },

    onRender: function(){
      if(this.model.selected){
        // add class so Bootstrap will highlight the active entry in the navbar
        this.$el.addClass('active');
      }
    }
  });

  return Marionette.CompositeView.extend({
    
    className: 'sidebar-wrap',

    template: layoutTpl,

    itemViewContainer: '.nav',

    itemView: Link,

    isFixed: 0,

    initialize: function(){
      _.bindAll(this) 
      //$(window).on('scroll', this.processScroll)
    },

    setOffsetTop: function(){
      if (this.topOffset) return
      this.topOffset = $(this.el).offset().top
    },

    //onRender: function(){  
      //this.setOffsetTop() //its now showing in the dom or I wld use this
    //},

    onShow: function() {
      var $sideBar = $('.bs-sidebar')

      $sideBar.affix({
        offset: {
          top: function () {
            var offsetTop      = $sideBar.offset().top
            var sideBarMargin  = parseInt($sideBar.children(0).css('margin-top'), 10)
            return (this.top = offsetTop - sideBarMargin)
          },
          bottom: function () {
            return (this.bottom = $('footer').outerHeight(true))
          }
        }
      })
    },

    /*processScroll: function() {
      this.setOffsetTop()
      var scrollTop = $(window).scrollTop()
      if (scrollTop >= this.topOffset && !this.isFixed) {
        this.isFixed = 1;
        $(this.el).addClass('subnav-fixed');
      } else if (scrollTop <= this.topOffset && this.isFixed) {
        this.isFixed = 0;
        $(this.el).removeClass('subnav-fixed');
      }
    },
    */

    onItemviewScrollToSection: function(view, target){
      var targetDistanceFromTop = $('#'+target).offset().top
      // the distance from top lessens as the navbar becomes fixed and removed from regular layout
      var padding = 10
      var position = targetDistanceFromTop - padding
      $('html, body').animate({
        'scrollTop': position 
      }, 700)
    },

    onItemviewSetActiveLink: function(view, target) {
      var linkToSelect = this.collection.find(function(link){
        return link.get('slug') === target; 
      });
      linkToSelect.select();
      this.collection.trigger('reset');
    }

  });

});
