define(function(require) {

  return Backbone.View.extend({
    
    events: {
      "click a": "pushState",
    },

    pushState: function(e) {
      e.preventDefault() 
      var linkEl = $(e.currentTarget);
      var href = linkEl.attr("href");
      var router = new Backbone.Router();
      router.navigate(href.substr(1), true)
      this.moveToPageSection(e)
    },

    moveToPageSection: function(e) {
      var anchor = $(e.currentTarget);
      var target = $(anchor).data("target");
      var self = this
      this.int=setInterval(function(){self.triggerClick(target)},100);
    },
    
    triggerClick: function(target){
      if ($('#products').length) {
        var selector = '[data-target="'+target+'"]'
        var anchor = $(selector);
        clearInterval(this.int)
        setTimeout(function(){ anchor.trigger('click')}, 300);
      }
    }
  })
})
