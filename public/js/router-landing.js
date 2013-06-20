define(function(require) {

  var HomeEspressoMachineView = require('views/landing/home-espresso-machine')

  var RouterLanding = Backbone.Router.extend({
    routes : { 
      'home-espresso-machine':  'homeEspressoMachine'
    },

    homeEspressoMachine: function() {
      var view = new HomeEspressoMachineView({el: $('.contact')} )
      var html = view.render()
    },
  });

  return RouterLanding;
});
