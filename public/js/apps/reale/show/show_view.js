define([ ], function(){
  'use strict';
  return Marionette.Layout.extend({
    id: 'reale',

    events: {
      'click .nav-tabs': 'tabClicked'
    },

    regions: {
      reviewsRegion: '#reviews',
    },

    initialize: function() {
      $(window).on('scroll', this.windowSize)
    },

    tabClicked: function(e){
      e.preventDefault()

      var clickedEl = $(e.target)

      var contentTarget = clickedEl.data('target')

      $(clickedEl).tab('show')

      if (contentTarget === '#features')
        $('#part2-region').css('display', 'block')
      else
        $('#part2-region').css('display', 'none')
    },
    onLoadTab: function(tab) {
      var anchor = this.$el.find('[data-target="#'+tab+'"]');
      anchor.click()
    },
    onShow: function(){
      $('.navbar').css('display', 'none')
      $('#reale .headline').delay(1000).animate({ opacity: 1 }, 700);
      this.windowSize();
      //$('.contact-numbers').css('display', 'none')
      //$('html, body').animate({
      //  'scrollTop': 650
      //}, 1500)
      //$('.navbar').css('display', 'none')

    },
    onBeforeClose: function(){
      // prevent the view from being closed
      //return false;
    },

    windowSize: function() {
      var offset = 2,
          height= $(window).height()

      $('#reale .header').css('height', (height-offset) +'px');
      $('#reale .header .wrap').css('height', ($(window).height()-offset-100) +'px');
      $('#reale .header .machine').css('height', ($(window).height()-offset-100) +'px');
      console.log('height: ' + height)
      //if( page != 'home') {
//        jQuery(window).scroll(function() {        
//           scrollBanner();
//         });

      //}
    },

/*
    ///////////////////////////////		
    // Mobile Detection
    ///////////////////////////////

    function isMobile(){
        return (
            (navigator.userAgent.match(/Android/i)) ||
        (navigator.userAgent.match(/webOS/i)) ||
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i)) ||
        (navigator.userAgent.match(/BlackBerry/))
        );
    }

/*
    ///////////////////////////////
    // Parallax
    ///////////////////////////////

    // Calculate the home banner parallax scrolling
      function scrollBanner() {

        //Get the scoll position of the page
        scrollPos = jQuery(this).scrollTop();

        if( scrollPos > window.innerHeight - 60 )
          $('.navbar').addClass('navbar-fixed');
        else
          $('.navbar').removeClass('navbar-fixed');

        //Scroll and fade out the banner text
        jQuery('#headContent').css({
          'margin-top' : -(scrollPos/3)+"px",
          'opacity' : 1-(scrollPos/900)
        });
      
        //Scroll the background of the banner
        jQuery('#headSection').css({
          'background-position' : 'center ' + (-scrollPos/4)+"px"
        }); 

      }


    ///////////////////////////////
    // Initialize
    ///////////////////////////////	
      

    jQuery(document).ready(function(){
      
      if(!isMobile()) {

        var offset = 2;
        jQuery('#headSection.home').css('height', ($(window).height()-offset) +'px');
        jQuery('#headSection.home #headContent').css('height', ($(window).height()-offset-100) +'px');
        //if( page != 'home') {
          jQuery(window).scroll(function() {        
             scrollBanner();
           });

        //}
        
        jQuery(window).resize( function() {
          console.log('resize'+ (window.innerHeight   ));
          jQuery('#reale .header').css('height', ($(window).height()-offset) +'px');
          jQuery('#reale.header #headContent').css('height', ($(window).height()-offset-100) +'px');
          
        });

        
      }
      else {
        $('#sidebarToggle').click(function() {
          $('#nav').toggleClass('open');
        });
      }
      
    });
*/
  });
});
