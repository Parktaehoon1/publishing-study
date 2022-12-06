"use strict";



$(".header").addClass("bb-0");

// Swiper Slider : Visual
/*
var swiper = new Swiper(".mvSwiper", {
	effect        : "fade",
	grabCursor    : true,
	speed         : 1000,
	centeredSlides: true,
	loop          : true,
	autoplay      : {
		delay               : 2000,
		disableOnInteraction: false,
	},
	navigation    : {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	pagination    : {
		el       : ".swiper-pagination",
			clickable: true,
	},
});

$(".mvSwiper").each(function (elem, target) {
	var swp = target.swiper;
	$(this).hover(function () {
		swp.autoplay.stop();
	}, function () {
		swp.autoplay.start();
	});
});
*/

// Swiper Slider : Visual Ver.2
$(function () {

	var interleaveOffset = 0.5;

	var mvSlideThumbs = new Swiper(".mvSlide-thumb", {
		slidesPerView: 5,
		spaceBetween: 10,
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		observer: true,
		observeParents: true,
		breakpoints: {
			700: {
				slidesPerView: 1,
				spaceBetween: 0,
			},
		},
		grabCursor : true,
		//loop: true,
		//loopAdditionalSlides: 5,
	});

	var mvSlide = new Swiper(".mvSlide", {
		speed: 2000,
		autoplay: {
			delay: 4000,
			autoplayDisableOnInteraction: true,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: '.mvSlide .swiper-button-next',
			prevEl: '.mvSlide .swiper-button-prev',
		},
		pagination: {
			el: ".visual-slide .swiper-pagination",
			type: 'fraction',
			formatFractionCurrent: function (number) {
				return ('0' + number).slice(-2);
			},
			formatFractionTotal: function (number) {
				return ('0' + number).slice(-2);
			},
			renderFraction: function (currentClass, totalClass) {
				return '<span class="' + currentClass + '"></span>' + ' <span class="bar">/</span> ' + '<span class="' + totalClass + '"></span>';
			}
		},
		thumbs: {
			swiper: mvSlideThumbs,
		},
		observer: true,
		observeParents: true,
		watchSlidesProgress: true,	
		on: {
			progress: function() {

				var swiper = this;
				for (var i = 0; i < swiper.slides.length; i++) {
					var slideProgress = swiper.slides[i].progress;
					var innerOffset = swiper.width * interleaveOffset;
					var innerTranslate = slideProgress * innerOffset;
					swiper.slides[i].querySelector(".moving").style.transform =
						"translate3d(" + innerTranslate + "px, 0, 0)";
				}      
			},
			touchStart: function() {
				var swiper = this;
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = "";
				}
			},
			setTransition: function(speed) {
				var swiper = this;
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = speed + "ms";
					swiper.slides[i].querySelector(".moving").style.transition =
					speed + "ms";
				}
			},
			init: function () {
				var slideCon = $('.mvSlide-thumb .swiper-slide .slide-con');
				slideCon.removeClass('on');
				slideCon.eq(0).addClass('on');
			},		
			slideChange: function () {
				var slideCon = $('.mvSlide-thumb .swiper-slide .slide-con');
				slideCon.removeClass('on');
				slideCon.eq(this.realIndex).addClass('on');
			},
			resize: function () {
				var swiper = this;
				swiper.on('slideChange', function () {
					swiper.update();
				});
			}
		},
	});

	$(".mvSlide").each(function (elem, target) {
		var swp = target.swiper;
		$(this).hover(function () {
			swp.autoplay.stop();
		}, function () {
			swp.autoplay.start();
		});
	});

	var mv = $(".mvSlide-thumb").innerWidth();
	var mvSlide = $(".mvSlide-thumb .swiper-slide");
	var mvSlideW = mvSlide.innerWidth();
	var mvImg = $(".mvSlide-thumb .img");
	var mvText = $(".mvSlide-thumb .text-area");
	
	function mvTextInit(){
		mvSlide.find(mvText).css("width", mv);

		var i;
		for (i = 1; i < mvSlide.length; i++) {
			mvSlide.eq([i]).find(mvText).css("left", -(mvSlideW + 10) * [i]);
		}
	}
	mvTextInit();

	$(window).on('resize', function(){
		mv = $(".mvSlide-thumb").innerWidth();
		mvSlide = $(".mvSlide-thumb .swiper-slide");
		mvSlideW = mvSlide.innerWidth();
		mvText = $(".mvSlide-thumb .text-area");

		mvTextInit();
	});	

	mvSlide.eq(0).css("z-index", "10");
	mvImg.on('click', function(){
		mvSlide.css("z-index", "0");
		if($(this).parent().hasClass("on")){
			$(this).parent().parent().css("z-index", "10");
		}
	});

});


// Swiper Slider : Best
var swiper2 = new Swiper(".bestSwiper", {
	slidesPerView: 5,
	spaceBetween : 30,
	pagination   : {
		el       : ".swiper-pagination.best",
		clickable: true,
	},
	navigation   : {
		nextEl: ".swiper-button-next.best",
		prevEl: ".swiper-button-prev.best",
	},
	breakpoints  : {
		1600: {
			slidesPerView: 4,
			spaceBetween : 30,
		},
		1200: {
			slidesPerView: 3,
			spaceBetween : 20,
		},
		700 : {
			slidesPerView: 2,
		},
		420 : {
			slidesPerView: 1,
		},
	},
});


// Swiper Slider : temp
/*
var swiper3 = new Swiper(".tempSwiper", {
	slidesPerView: 5,
	spaceBetween : 30,
	pagination   : {
		el       : ".swiper-pagination.temp",
		clickable: true,
	},
	navigation   : {
		nextEl: ".swiper-button-next.temp",
		prevEl: ".swiper-button-prev.temp",
	},
	breakpoints  : {
		1600: {
			slidesPerView: 4,
			spaceBetween : 30,
		},
		1200: {
			slidesPerView: 3,
			spaceBetween : 20,
		},
		700 : {
			slidesPerView: 2,
		},
		420 : {
			slidesPerView: 1,
		},
	},
});
*/


// Swiper Slider : Auction
var swiper4 = new Swiper(".auctionSwiper", {
	navigation : {
		nextEl: ".swiper-button-next.auction",
		prevEl: ".swiper-button-prev.auction",
	},
	breakpoints: {
		991: {
			spaceBetween: 40,
		},
	},
});


// Swiper Slider : Category
var swiper5 = new Swiper(".cate-slide", {
	slidesPerView: 10,
	spaceBetween : 0,
	pagination   : {
		el       : ".swiper-pagination.catego",
		clickable: true,
	},
	navigation   : {
		nextEl: ".swiper-button-next.catego",
		prevEl: ".swiper-button-prev.catego",
	},
	breakpoints  : {
		1760: {
			slidesPerView: 9,
			spaceBetween: 0,
		},
		1650: {
			slidesPerView: 8,
			spaceBetween : 0,
		},
		1500: {
			slidesPerView: 6,
			spaceBetween : 0,
		},
		1200 : {
			slidesPerView: 5,
			spaceBetween : 0,
		},
		767 : {
			slidesPerView: 4,
			spaceBetween : 0,
		},
		600 : {
			slidesPerView: 3,
			spaceBetween : 5,
			slidesPerColumn: 2,
			slidesPerColumnFill: 'column',
		},
	},
});


// Tab
function openTab(evt, tabtransName) {
	var i, x, tablinks;
	x = document.getElementsByClassName("tabbox");
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablink");
	for (i = 0; i < x.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" on", "");
	}
	document.getElementById(tabtransName).style.display = "block";
	evt.currentTarget.className += " on";
}

// Auction
$(function () {
	var auctionLi = $(".auctionlist > li");

	if (auctionLi.length == 1){
		$("#Auction .btn-more").css('display', 'none');
	}
});


