define(function(require) {

  var HomeEspressoMachineView = require('views/landing/home-espresso-machine')
    , Router = require('routers/router')

  Router.prototype.routes['home-espresso-machine'] = 'homeEspressoMachine';

  Router.prototype.homeEspressoMachine = function() {
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
  } 

  Router.prototype.reset_homeEspressoMachine =  function(){
    $('body').removeClass('home-espresso-machine')
  }

});
