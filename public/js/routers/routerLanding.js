define(function(require) {

  var HomeEspressoMachineView = require('views/landing/home-espresso-machine')
    , BaseRouter = require('routers/baseRouter')


  var RouterLanding = Backbone.Router.extendEach(BaseRouter, {

    initialize: function() {
      _.bindAll(this) 
    },

    routes : { 
      'home-espresso-machine':  'homeEspressoMachine'
    },

    homeEspressoMachine: function() {
      if ($('#home-espresso-machine').length) {
        var view = new HomeEspressoMachineView({el: $('.lead-gen')} )
        var html = view.render()
        return
      }
      $.get('/home-espresso-machine', function(obj) {
        $('#app').html(obj.body);
        document.title = obj.title
        var view = new HomeEspressoMachineView({el: $('.lead-gen')} )
        var html = view.render()
      })
    }, 

    reset_homeEspressoMachine: function(){
      $('body').removeClass('home-espresso-machine')
    },
  });  

  return RouterLanding;
});
