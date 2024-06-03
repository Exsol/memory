$(document).ready(function ($) {
  'use strict';

 /* ---------------------------------------------
         page  Prealoader
         --------------------------------------------- */
        $(window).on('load', function () {
        $("#loading-center-page").fadeOut();
        $("#loading-page").delay(300).fadeOut("fast");
    });



    /* ---------------------------------------------
        Panel Menu
        --------------------------------------------- */

        var isLateralNavAnimating = false;
        $('.menu-nav-trigger').on('click', function(event){
          event.preventDefault();
          if( !isLateralNavAnimating ) {
            if($(this).parents('.csstransitions').length > 0 ) isLateralNavAnimating = true; 

            $('body').toggleClass('navigation-is-open');
            $('.menu-navigation-wrapper').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
              isLateralNavAnimating = false;
            });
          }
        });


   /* ---------------------------------------------
     Smooth scroll
     --------------------------------------------- */

     $('a.section-scroll[href*="#"]:not([href="#"])').on('click', function (event) {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') ||
        location.hostname == this.hostname) {

        var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();

                $('body').removeClass('navigation-is-open');

                $('html,body').animate({
                  scrollTop: target.offset().top
                }, 750);
                return false;
              }
            }
          });

     /* ---------------------------------------------
         Sticky header
         --------------------------------------------- */
         $(window).on('scroll', function () {
          var scroll_top=$(window).scrollTop();

          if (scroll_top > 40){
            $('.navbar').addClass('sticky');

          }
          else{
            $('.navbar').removeClass('sticky');  
          }

        });





    /* ---------------------------------------------
     Back top page scroll up
     --------------------------------------------- */

     if(Animocon){
       $.scrollUp({
        scrollText: '<div class="btn-button"><img src="assets/images/icons/arrow-up.svg" class="hand-btn"></div>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
      });
     }


    /* ---------------------------------------------
     WoW plugin
     --------------------------------------------- */

     new WOW().init({
      mobile: true,
    });



  /*--------------------
Slick  JS
----------------------*/

$('.slider-image').slick({
 dots: true,
 arrows: false,
 centerMode: true,
 infinite: true,
 autoplay: true,
 autoplaySpeed:6000,
 slidesToShow: 1,
 variableWidth: true
});

$('.client-slider').slick({
 dots: false,
 arrows: false,
 infinite: true,
 autoplay: true, 
 slidesToShow: 5,
 autoplaySpeed:3000,
 slidesToScroll: 5,
 centerMode: true,
 responsive: [
 {
  breakpoint: 1024,
  settings: {
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: true,
    
  }
},
{
  breakpoint: 600,
  settings: {
    slidesToShow: 2,
    slidesToScroll: 2
  }
},
{
  breakpoint: 480,
  settings: {
    slidesToShow: 2,
    slidesToScroll: 2
  }
}
]
});

$('.testimonial-slider').slick({
 dots: true,
 arrows: false,
 centerMode: true,
 slidesToShow: 1,
 slidesToScroll: 1,
});


$('.slider-avatar .item-image').on('click', function(event){

 event.preventDefault();
 var slide_img = $(this).data('slide');
 var className = this.className.split(' ');
 for (var i = 0; i < className.length; i+=1) {
  if (className[i].indexOf('avatar') >= 0) {

   $('.testimonial-slider').slick('slickGoTo', slide_img - 1);
   /** animation 3 **/
   var anim_avatar_1 =$('.slider-avatar .item-image.'+className[i]+''),
   anim_im3=$('.hand-image');
   new Animocon(anim_avatar_1, {
    tweens : [
        // burst animation
        new mojs.Burst({
          parent:    anim_avatar_1,
          count:      6,
          radius:     { 40 : 90 },
          timeline:   { delay: 300 },
          children: {
            fill:       '#6666ff75',
            radius:     7,
            opacity:    0.6,
            duration:   1500,
            easing:     mojs.easing.bezier(0.1, 1, 0.3, 1)
          }
        }),
        // ring animation
        new mojs.Shape({
          parent:    anim_avatar_1,
          radius:     {0: 50},
          fill:       'transparent',
          stroke:     '#6666ff75',
          strokeWidth: {35:0},
          opacity:      0.6,
          duration:     600,
          easing: mojs.easing.ease.inout
        }),
        // icon scale animation
        new mojs.Tween({
          duration : 1100,
          onUpdate: function(progress) {

            if(progress > 0.3) {
             var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
             anim_im3.css({
              'opacity': 1,
              '-webkit-transform' : 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)',
              '-moz-transform'    : 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)',
              '-ms-transform'     : 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)',
              '-o-transform'      : 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)',
              'transform'         : 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)'
            });
           }
           else {
             anim_im3.css({
              '-webkit-transform' : 'scale3d(0,0,1)',
              '-moz-transform'    : 'scale3d(0,0,1)',
              '-ms-transform'     : 'scale3d(0,0,1)',
              '-o-transform'      : 'scale3d(0,0,1)',
              'transform'         : 'scale3d(0,0,1)'
            });

           }

         }
       })
        ],

      });

 }
}



});


$('.step-content-image').slick({
 slidesToShow: 1,
 slidesToScroll: 1,
 arrows: false,
 fade: true,
});

$('.setps-content li[data-slide]').on('click', function(event){
 event.preventDefault();
 var slideno = $(this).data('slide');

 var className = this.className.split(' ');
 for (var i = 0; i < className.length; i+=1) {
  if (className[i].indexOf('step') >= 0) {

   $('.slider-nav').slick('slickGoTo', slideno - 1);
   $('.setps-content li[data-slide="1"]').removeClass('active');
   
   /** animation 3 **/
   var anim_avatar_2 =$('.setps-content-inner.'+className[i]+''),
   anim_im4=$('.step-content-number span');
   new Animocon(anim_avatar_2, {
    tweens : [
        // ring animation
        new mojs.Shape({
          parent: anim_avatar_2,
          duration: 750,
          type: 'circle',
          radius: {0: 40},
          fill: 'transparent',
          stroke: '#4d7bf3',
          strokeWidth: {35:0},
          opacity: 0.2,
          top: '45%',
          easing: mojs.easing.bezier(0, 1, 0.5, 1)
        }),
        new mojs.Shape({
          parent:anim_avatar_2,
          duration: 500,
          delay: 100,
          type: 'circle',
          radius: {0: 20},
          fill: 'transparent',
          stroke: '#4d7bf3',
          strokeWidth: {5:0},
          opacity: 0.2,
          x : 40, 
          y : -60,
          easing: mojs.easing.sin.out
        }),
        new mojs.Shape({
          parent:anim_avatar_2,
          duration: 500,
          delay: 180,
          type: 'circle',
          radius: {0: 10},
          fill: 'transparent',
          stroke: '#4d7bf3',
          strokeWidth: {5:0},
          opacity: 0.5,
          x: -10, 
          y: -80,
          isRunLess: true,
          easing: mojs.easing.sin.out
        }),
        new mojs.Shape({
          parent: anim_avatar_2,
          duration: 800,
          delay: 240,
          type: 'circle',
          radius: {0: 20},
          fill: 'transparent',
          stroke: '#4d7bf3',
          strokeWidth: {5:0},
          opacity: 0.3,
          x: -70, 
          y: -10,
          easing: mojs.easing.sin.out
        }),
        new mojs.Shape({
          parent: anim_avatar_2,
          duration: 800,
          delay: 240,
          type: 'circle',
          radius: {0: 20},
          fill: 'transparent',
          stroke: '#4d7bf3',
          strokeWidth: {5:0},
          opacity: 0.4,
          x: 80, 
          y: -50,
          easing: mojs.easing.sin.out
        }),
        new mojs.Shape({
          parent: anim_avatar_2,
          duration: 1000,
          delay: 300,
          type: 'circle',
          radius: {0: 15},
          fill: 'transparent',
          stroke: '#4d7bf3',
          strokeWidth: {5:0},
          opacity: 0.2,
          x: 20, 
          y: -100,
          easing: mojs.easing.sin.out
        }),
        new mojs.Shape({
          parent: anim_avatar_2,
          duration: 600,
          delay: 330,
          type: 'circle',
          radius: {0: 25},
          fill: 'transparent',
          stroke: '#4d7bf3',
          strokeWidth: {5:0},
          opacity: 0.4,
          x: -40, 
          y: -90,
          easing: mojs.easing.sin.out
        }),
        // icon scale animation
        new mojs.Tween({
          duration : 1200,
          easing: mojs.easing.ease.out,
          onUpdate: function(progress) {
            if(progress > 0.3) {
              var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
              anim_im4.css({
                'opacity': 1,
                '-webkit-transform' : 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)',
                '-moz-transform'    : 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)',
                '-ms-transform'     : 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)',
                '-o-transform'      : 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)',
                'transform'         : 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)'
              });
            }
            else {
             anim_im4.css({
              '-webkit-transform' : 'scale3d(0,0,1)',
              '-moz-transform'    : 'scale3d(0,0,1)',
              '-ms-transform'     : 'scale3d(0,0,1)',
              '-o-transform'      : 'scale3d(0,0,1)',
              'transform'         : 'scale3d(0,0,1)'
              
            });

           }

         }
       })
        ],

      });

 }
}



});





    /*----------------------------------------
     Newsletter Subscribe
     --------------------------------------*/

     $(".subscribe-mail").ajaxChimp({
      callback: mailchimpCallRep,
        url: "mailchimp-post-url" //Replace this with your own mailchimp post URL. Just paste the url inside "".
      });

     function mailchimpCallRep(resp) {
      if (resp.result === "success") {
        $(".sucess-message").html(resp.msg).fadeIn(1000);
        $(".error-message").fadeOut(500);
      } else if (resp.result === "error") {
        $(".error-message").html(resp.msg).fadeIn(1000);
      }
    }



 /*----------------------------------------
     mo.js
     --------------------------------------*/

  // taken from mo.js demos
  function isIOSSafari() {
    var userAgent;
    userAgent = window.navigator.userAgent;
    return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
  };

  // taken from mo.js demos
  function isTouch() {
    var isIETouch;
    isIETouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    return [].indexOf.call(window, 'ontouchstart') >= 0 || isIETouch;
  };
  
  // taken from mo.js demos
  var isIOS = isIOSSafari(),
  clickHandler = isIOS || isTouch() ? 'touchstart' : 'click';

  function extend( a, b ) {
    for( var key in b ) { 
      if( b.hasOwnProperty( key ) ) {
        a[key] = b[key];
      }
    }
    return a;
  }

  function Animocon(el, options) {
    this.el = el;
    this.options = extend( {}, this.options );
    extend( this.options, options );

    this.checked = true;

    this.timeline = new mojs.Timeline();
    
    for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
      this.timeline.add(this.options.tweens[i]);
    }

    var self = this;
    this.el.on('click', function() {
     self.options.onCheck();
     self.timeline.replay();

     self.checked = !self.checked;
   });
  }


  Animocon.prototype.options = {
    tweens : [
    new mojs.Burst({})
    ],
    onCheck : function() { return false; },
    onUnCheck : function() { return false; }
  };

  function init() {

    /** animation1 **/

    var anim1 =$('.icobutton'),
    anim_im1=$('.hand');
    new Animocon(anim1, {
      tweens : [
        // burst animation
        new mojs.Burst({
          parent:     anim1,
          count:      6,
          radius:     {40:90},
          children: {
            fill:       [ '#4a4ec7', '#8f65ff ', '#4d7bf3', '#8ADEAD', '#33cc99', '#4a4ec7' ],
            opacity:    0.6,
            scale:      1,
            radius:     { 7: 0 },
            duration:   1500,
            delay:      300,
            easing:     mojs.easing.bezier(0.1, 1, 0.3, 1)
          }
        }),
        // ring animation
        new mojs.Shape({
          parent:       anim1,
          type:         'circle',
          scale:        { 0: 1 },
          radius:       50,
          fill:         'transparent',
          stroke:       '#33cc99',
          strokeWidth:  {35:0},
          opacity:      0.6,
          duration:     750,
          easing:       mojs.easing.bezier(0, 1, 0.5, 1)
        }),
        // icon scale animation
        new mojs.Tween({
          duration : 1100,
          onUpdate: function(progress) {
            if(progress > 0.3) {
             var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
             anim_im1.css({
              'opacity': 1,
              '-webkit-transform' : 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)',
              '-moz-transform'    : 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)',
              '-ms-transform'     : 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)',
              '-o-transform'      : 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)',
              'transform'         : 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)'
            });
           }
           else {
            anim_im1.css({
              '-webkit-transform' : 'scale3d(0,0,1)',
              '-moz-transform'    : 'scale3d(0,0,1)',
              '-ms-transform'     : 'scale3d(0,0,1)',
              '-o-transform'      : 'scale3d(0,0,1)',
              'transform'         : 'scale3d(0,0,1)'
            });

          }
        }
      })
        ],

      });



  }
  /** animation 2 **/
  var anim2 =$('.btn-button'),
  anim_im2=$('.hand-btn');
  var scale_anim= mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
  new Animocon(anim2, {
    tweens : [
        // burst animation
        new mojs.Burst({
          parent:       anim2,
          radius:       {40:110},
          count:        20,
          children: {
            shape:      'line',
            fill :      'white',
            radius:     { 12: 0 },
            scale:      1,
            stroke:     '#33cc99',
            strokeWidth: 2,
            duration:   1500,
            easing:     mojs.easing.bezier(0.1, 1, 0.3, 1)
          },
        }),
        // ring animation
        new mojs.Shape({
          parent:       anim2,
          radius:       {10: 60},
          fill:         'transparent',
          stroke:       '#33cc99',
          strokeWidth:  {30:0},
          duration:     800,
          easing:       mojs.easing.bezier(0.1, 1, 0.3, 1)
        }),
        // icon scale animation
        new mojs.Tween({
          duration : 800,
          easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
          onUpdate: function(progress) {
            var scaleProgress =scale_anim(progress);
            anim_im2.css({
              'opacity': 1,
              '-webkit-transform' : 'scale3d(' + progress + ',' + progress + ',1)',
              '-moz-transform'    : 'scale3d(' +progress + ',' + progress + ',1)',
              '-ms-transform'     : 'scale3d(' + progress + ',' + progress + ',1)',
              '-o-transform'      : 'scale3d(' + progress + ',' + progress + ',1)',
              'transform'         : 'scale3d(' + progress + ',' + progress + ',1)'
            });


          }
        })
        ],

      });


  init();


  /*----------------------------------------------------*/
    /*  scroll buton section 1
    /*----------------------------------------------------*/

    if(Animocon){
      $('.btn-secttion').click(function(){

        $('html, body').animate({
          scrollTop: $("#about-p").offset().top
        }, 2000);
      });

    }


    /*----------------------------------------------------*/
    /*  VIDEO POP PUP
    /*----------------------------------------------------*/



    $('.video-modal').magnificPopup({
      type: 'iframe',

      iframe: {
        patterns: {
          youtube: {

            index: 'youtube.com',
            src: 'https://www.youtube.com/embed/7e90gBu4pas'

          }
        }
      }
    });
 

  });