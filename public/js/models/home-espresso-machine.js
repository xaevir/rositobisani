define(function(require) {

  return Backbone.Model.extend({
    
    url: '/contact',

    validatePhone: function(value, attr, computedState) {
      // "+1 (267) 977.-2670" tested against
      // from debuggex.com
      // a{9,}	9 or more a's
      var cleanedStr=value.replace(/[^0-9]/g,"");
      var result = /^\d{10,}$/.test(cleanedStr);
      if(result !== true) {
        return 'Phone number is invalid';
      }
    },

    validation: {
      first_name: {
        required: true,
      },
      last_name: {
        required: true,
      },
      phone: {
        fn: 'validatePhone'
      },
      email: {
        required: true,
        pattern: 'email',
      },
      company: {
        required: true,
      },
      message: {
        required: false,
      },
    }, 

  })
})
