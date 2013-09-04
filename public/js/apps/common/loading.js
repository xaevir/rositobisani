define([ 
  'hbs!apps/common/loading_tpl',
  'appMarionette',
  'spin.jquery'
], function(tpl){
  return Marionette.ItemView.extend({
    template: tpl,

    serializeData: function(){
      return {
        title: this.options.title || "Loading Data",
        message: this.options.message || "Please wait, data is loading."
      }
    },

    onShow: function(){
      var opts = {
        lines: 10, // The number of lines to draw
        length: 8, // The length of each line
        width: 4, // The line thickness
        radius: 8, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#000', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '0', // Top position relative to parent in px
        left: '0' // Left position relative to parent in px
      };
      $('.spinner').spin(opts);
    }
  });
});
