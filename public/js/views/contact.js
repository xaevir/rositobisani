define(function(require) {

var tpl = require('text!templates/contact.html')
  , Contact = require('models/contact') 
  , ModalView = require('views/modal')         

return Backbone.View.extend({

  className: 'contact',

  events: {
    'submit form' : 'submit',
  },

  initialize: function(options){
    _.bindAll(this); 
    this.model = new Contact()
    Backbone.Validation.bind(this)
    this.model.on('sync', this.notice, this) 
    this.model.on('sync', this.render, this) 
  },

  render: function(){
    $(this.el).html(tpl);
    return this; 
  },

  submit: function(e) {
    e.preventDefault()
    var params = this.$('form').serializeObject();
    this.model.save(params);
  },

  notice: function(){
    var msg = '<p>Thank you for contacting us. We shall email you back as soon as possible.</p>' 
    new ModalView({body: msg})
  },

});
});
