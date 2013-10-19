define([ ], function(){

  return Marionette.ItemView.extend({
    id: 'home',
    initialize: function(){
      if(this.options.tpl)
        this.template = this.options.tpl
      else
        this.el = this.options.homeEl
    },

    events: {
      'click .show-hide-link': 'showHide',
      "click .icons a": "navigate",
    },

    showHide: function(e){
      e.preventDefault()
      $('.show-hide-link-container').hide()
      $( ".show-hide-content" ).show("slow");
    },

    navigate: function(e) {
      e.preventDefault() 
      var anchor = $(e.currentTarget);
      var target = $(anchor).data("target");
      this.trigger("navigate", target);
    },

    onShow: function() {
      $('#myCarousel').carousel({
        interval: 3000
      })
      var winWidth = $(window).width() // for screen larger than 1600 width
      if(winWidth >1600)
        $('#myCarousel img').css('width', winWidth) 
    }
  });
});
