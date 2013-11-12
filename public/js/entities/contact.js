define(function(require) {

  return Backbone.Model.extend({
    
    url: '/contact',

    validation: {
      name: {
        required: true
      },

      email: [{
        required: true
      },{
        pattern: 'email',
        msg: 'Please enter a valid email'
      }],
      message: {
        required: true
      }
    }
  })
})
