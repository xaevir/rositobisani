define(function(require) {

var tpl  = '<div class="content">'
    tpl += '  <a class="close" href="#">&times;</a>'
    tpl += '  <div class="inner">'
    tpl += '    <%= body %>'
    tpl += '  </div>' 
    tpl += '</div>'

return Backbone.View.extend({

  id: 'myModal',

  template: _.template(tpl),

  initialize: function(options){
    _.bindAll(this) 
    this.body = options.body 
    this.globalEvent()
    this.render()
  },

  events: { 
    'click .close' : 'close'
  },

  globalEvent: function(){
    var func = _.bind(this.close, this)
    $('body').click(function(){
      func() 
    });
  },

  render: function(){
    template = this.template({body: this.body})
    $(this.el).html(template)
    $('body').append('<div class="modal-backdrop" />')
    $('#notification').html(this.el)
    $(this.el).animate({ top: '100'})
    if(this.shouldFadeOut)
      this.fadeOut() 
    return this
  },

  close: function() {
    $('.modal-backdrop').fadeOut('slow', function() {
      $(this.el).remove();
     });

    $(this.el).fadeOut('slow', function() {
      $(this).remove();
     });
   }
})


});

