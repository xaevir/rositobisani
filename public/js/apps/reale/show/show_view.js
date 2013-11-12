/* global StripeCheckout */
define([
  'appMarionette',
  'stripe'
], function(App){
  'use strict';

  return Marionette.Layout.extend({
    id: 'reale',

    events: {
      'click .nav a[href]':                           'realLink',
      'click .nav a:not([href])':                     'tabClicked',
      'click .scroll-down-wrap a':                    'scrollNavToTop',
      'click .buy-btn a':                             'buy',
      'click .review-link-js':                        'tabClicked'
    },

    regions: {
      reviewsRegion: '#reviews'
    },

    initialize: function(){
      if(this.options.tpl)
        this.template = this.options.tpl

      _.bindAll(this);
      this.alreadyCalledSlideIn = false
      this.alreadyCalledSlideOut =  false

      $(window).on('resize', this.setHeights)
      $(window).on('scroll', this.scrollBanner)
    },

    buy: function() {

      var token = function(res){
        var $input = $('<input type=hidden name=stripeToken />').val(res.id);
        $('form').append($input).submit();
      };

      StripeCheckout.open({
        key:         'pk_test_kO65ouSwP01jQ1EcxQfUkHA4',
        address:     true,
        amount:     154999,
        currency:    'usd',
        name:        'Reale',
        description: 'Espresso Machine',
        panelLabel:  'Checkout',
        token:       token
      });

      return false;

    },

    realLink: function(e){
      e.preventDefault()
      var linkEl = $(e.currentTarget)
      var href = linkEl.attr('href')
      if (href === '/contact')
        App.trigger('contact:show')
      if (href === '/espresso-machines/reale')
        App.trigger('reale:show')
    },

    tabClicked: function(e){
      e.preventDefault()

      $('#spinner-region').css('display', 'block');

      this.scrollNavToTop()

      var clickedEl = $(e.target)

      $(clickedEl).tab('show')

      $('#spinner-region').css('display', 'none')
    },

    scrollNavToTop: function(){
      var navHeight = $('#reale .nav').height()

      var buyBoxHeight = $('.buy-box').offset().top - navHeight
      $('html, body').animate({
        'scrollTop': buyBoxHeight
      }, 1500)
    },

    onLoadTab: function(tab) {
      this.setHeights() //this is entry point so set up page
      var anchor = this.$el.find('[data-target="#'+tab+'"]');
      anchor.click()
    },

    onShow: function(){
      $('.navbar').css('display', 'none')
      $('#reale .fadeIn').delay(700).animate({ opacity: 1 }, 700);

      this.setHeights()
    },

    onBeforeClose: function(){
      $('body').removeAttr('id')
      $('.navbar').css('display', 'block')
      // not sure if needed
      $(window).unbind( 'resize', this.setHeights)
      $(window).unbind( 'scroll', this.scrollBanner)
    },

    setHeights: function() {
      var windowHeight= $(window).height()
      //var scrollDownArrowHeight = $('#reale .header .scroll-down').height()
      $('#reale > .header').css('height', windowHeight+'px');

      //$('#reale .header .row').css('height', (windowHeight - scrollDownArrowHeight)+'px');

      var machineHeight = 425
      var contentOffsetTop = (windowHeight - machineHeight)/2
      $('#reale .header .row').css('padding-top', contentOffsetTop+'px');

      // center machine
      var colWidth = $('#reale .col-md-6').width()
      $('#reale .machine').css('width', colWidth+'px' )

    },

    slideIn: function(){
      $( '.nav .fonticon-reale-logo' ).stop().animate({
        'margin-left': '0px'
      }, 700, function() {
      });
    },

    slideOut: function(){
      $( '.nav .fonticon-reale-logo' ).stop().animate({
        'margin-left': '-97px'
      }, 700, function() {
      });
    },

    scrollBanner: function() {
      var scrollPos = $(window).scrollTop();
      var height = $(window).height()
      var nav = $('#reale .nav').height()

      if( scrollPos > (height - nav) ) {
        $('.nav-wrapper').addClass('reale-nav-fixed');
        if(this.alreadyCalledSlideIn === false) {
          this.slideIn()
          this.alreadyCalledSlideIn = true
          this.alreadyCalledSlideOut = false
        }
      } else {
        $('.nav-wrapper').removeClass('reale-nav-fixed');
        if(this.alreadyCalledSlideOut === false) {
          this.slideOut()
          this.alreadyCalledSlideOut = true
          this.alreadyCalledSlideIn = false
        }
      }

      $('#reale .girl img').css({
        'opacity' : 1-(scrollPos/height)
      });

      $('#reale .header .headline').css({
        'margin-top' : -(scrollPos/3)+'px',
        'opacity' : 1-(scrollPos/height)
      });
      $('#reale .review-container').css({
        'opacity' : 1-(scrollPos/height)
      });

      // its fixed so pulling it up with the negative margin keeps it
      // in view a little longer
      $('#reale .machine').css({
        'margin-top' : (-scrollPos/4)+'px'
      }); 
    }

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


///////////////////////////////
// Parallax
///////////////////////////////

// Calculate the home banner parallax scrolling
  function scrollBanner() {

    //Get the scoll position of the page
    scrollPos = jQuery(this).scrollTop();

    if( scrollPos > window.innerHeight - 60 )
      $('#nav').addClass('stickOnTop');
    else
      $('#nav').removeClass('stickOnTop');


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
      jQuery(window).scr.fadeoll(function() {        
         scrollBanner();
       });

    //}
    
    jQuery(window).resize( function() {
      console.log('resize'+ (window.innerHeight   ));
      jQuery('#headSection.home').css('height', ($(window).height()-offset) +'px');
      jQuery('#headSection.home #headContent').css('height', ($(window).height()-offset-100) +'px');
      
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
