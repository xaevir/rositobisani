define([ ], function(){
  'use strict';
  return Marionette.Layout.extend({
    id: 'reale',

    events: {
      'click .nav': 'tabClicked'
    },

    regions: {
      reviewsRegion: '#reviews',
    },

    initialize: function() {
      $(window).on('scroll', this.scrollBanner)
      $(window).on('resize', this.windowHeight)
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
      $('#reale .fade').delay(1000).animate({ opacity: 1 }, 700);
      this.windowHeight();

      //$('#reale .nav a[data-target="#features"], #reale .scrollDown').click( function() {
       // $("html, body").animate({ scrollTop: $('#features').offset().top }, 1500);
        //return false;
      //});

      //$('.contact-numbers').css('display', 'none')
      //$('html, body').animate({
      //  'scrollTop': 682
      //}, 1500)
      //$('.navbar').css('display', 'none')

    },
    onBeforeClose: function(){
      // prevent the view from being closed
      //return false;
    },

    windowHeight: function() {
      var height= $(window).height()
      var nav = $('#reale .nav').height()

      $('#reale .header').css('height', height +'px');
      $('#reale .header .header-inner').css('height', (height - nav)+'px');
      $('#reale .header .ht').css('height', (height - nav) +'px');
      // position content 
      var offsetTop = (height - nav- 420)/2
      $('#reale .header .row').css('margin-top', offsetTop+'px');

      // center machine
      var colWidth = $('#reale .col-md-6').width()
      $('#reale .machine').css('width', colWidth+'px' )

      //$('#reale .header .machine').css('height', ($(window).height()-offset-100) +'px');
    },

    scrollBanner: function() {
      //Get the scoll position of the page
      var scrollPos = $(this).scrollTop();
      console.log('scroll top: '+ scrollPos);
      var height = $(window).height()
      var nav = $('#reale .nav').height()

      if( scrollPos > (height - nav) )
        $('.nav-wrapper').addClass('reale-nav-fixed');
      else
        $('.nav-wrapper').removeClass('reale-nav-fixed');

      //Scroll and fade out the banner text
      //var x = scrollPos/3
      //var y = scrollPos/900

      $('#reale .girl img').css({
        'opacity' : 1-(scrollPos/height)
      });

      $('#reale .headline').css({
        'margin-top' : -(scrollPos/3)+'px',
        'opacity' : 1-(scrollPos/height)
      });
      $('#reale .review-container').css({
        'bottom' : (scrollPos/3)+'px',
        'opacity' : 1-(scrollPos/height)
      });

      // its fixed so pulling it up with the negative margin keeps it
      // in view a little longer
      $('#reale .machine').css({
        'margin-top' : (-scrollPos/4)+'px'
      }); 


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
