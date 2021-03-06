define(function(require) {

var userMenuTpl = require('text!templates/users/userNav.mustache')


return Backbone.View.extend({

  template: Hogan.compile(userMenuTpl),

  events: {
    'click a[href="#logout"]': 'logout'
  },

  logout: function(){
    window.dispatcher.trigger('session:logout') 
    console.log('user-menu.logout.trigger->session:logout')
  },

  initialize: function(options){
    _.bindAll(this, 'render'); 
    this.user = options.user
    this.user.on('change', this.render, this); 
  },

  render: function(user) {
    var template;
    if (this.user.isLoggedIn()) {
      template = this.template.render({user: {name: this.user.get('username') }})
    } else {
      template = this.template.render({user: false});
      $('.dropdown-toggle').dropdown()
    }
    $(this.el).html(template)
    return this;
  },
})

});  
