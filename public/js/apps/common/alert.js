define([ 
  'hbs!apps/common/alert_tpl',
], function(tpl){

  return Marionette.ItemView.extend({
    template: tpl,
    className: 'center-dialog',

    serializeData: function(){
      return {
        type: this.options.type || "alert-success",
        message: this.options.message || "Saved"
      }
    },

    onRender: function(){
      $(this.el).animate({ top: '50'})
      this.fadeOut() 
    },

    fadeOut: function(){
     var self = this
     var duration = this.duration || 3000
     var t = setTimeout(function(){
      $(self.el).fadeOut('slow', function() {
        $(self.el).remove();
       });
      }, duration);
    },
  });
});
