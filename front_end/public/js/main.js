
$(function() {
	"use strict";


	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();


	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};

		scrollWindow();


	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();
	//url改變
	// $(window).on('popstate', function(){
	// 	console.log("it run");
	// });


	// magnific popup
// 	$('.image-popup').magnificPopup({
//     type: 'image',
//     closeOnContentClick: true,
//     closeBtnInside: false,
//     fixedContentPos: true,
//     mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
//      gallery: {
//       enabled: true,
//       navigateByImgClick: true,
//       preload: [0,1] // Will preload 0 - before current, and 1 after the current image
//     },
//     image: {
//       verticalFit: true
//     },
//     zoom: {
//       enabled: true,
//       duration: 300 // don't foget to change the duration also in CSS
//     }
//   });


    
	// $('#book_pick_date,#book_off_date').datepicker({
	//   'format': 'm/d/yyyy',
	//   'autoclose': true
	// });


	// //--datepicker
	// $('.date').datepicker();

	//匯款方式
	// var payment_info = $('#payment_info'),
	//     payment_1 = $('#cash_transaction'),
	//     payment_2 = $('#atm_transaction');
    // payment_1.change(function(){
	// 	if($(this).is(':checked')){
	// 		payment_info.addClass('d-none');
	// 	}
	// });
    // payment_2.change(function(){
	// 	if($(this).is(':checked')){
	// 		payment_info.removeClass('d-none');
	// 	}
	// });
	

});

