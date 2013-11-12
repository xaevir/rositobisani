/* jshint expr: true */
define([ 
], function(){
  'use strict';
  var App = new Marionette.Application();

  App.addRegions({
    navRegion: '#nav-region',
    //mainRegion: '#main-region',
    mainRegion: '#app',
    dialogRegion: '#dialog-region',
    alertRegion: '#alert-region',
    spinnerRegion: '#spinner-region'
  });

  App.navigate = function(route,  options){
    options || (options = {});
    Backbone.history.navigate(route, options);
  };

  App.getCurrentRoute = function(){
    return Backbone.history.fragment
  };

  App.on('initialize:after', function(){
    if(Backbone.history){
      Backbone.history.start({pushState: true})
    }
  });


  App.mainRegion.on('close', function(){
    $('html, body').animate({
      'scrollTop': 0
    }, 700)
  })

  App.mainRegion.on('show', function(){
    $('#spinner-region').css('display', 'none')
  });

  $.ajaxSetup({ cache: false });

  $(document).on('click', 'a[href]:not([data-bypass], [href^="http"])', function () {
    $('#spinner-region').css('display', 'block');

    if ($('.navbar-collapse.in').length) // for link on products page and logo
      $('.navbar-collapse').collapse('toggle')
  })

  return App;
});
