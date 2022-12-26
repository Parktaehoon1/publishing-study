$(function(){

	// 모바일인지 PC인지 구분
	var filter = "win16|win32|win64|mac|macintel";

	var swiper = new Swiper('.swiper-wrap-container', {
	pagination: '.swiper-pagination',
	direction: 'vertical',
	slidesPerView: 'auto',
	//initialSlide :2,
	paginationClickable: true,
	mousewheelControl: true,
	keyboardControl: true,
	simulateTouch: false,
	nextButton: '.btn-godown',
	speed: 800,
		hideOnClick:true,
	normalizeSlideIndex:true,
	paginationBulletRender: 
	function (index, className) {
		var arr = new Array("overview" ,"business", "history", "members", "technology", "contact us");
		return '<span class="' + className + ' ' + 'pg0' + index + '"><em>'+arr[index]+'</em><span></span></span>';
	},

	//현재 상태일때 동작
	onInit: function(swiper){
		 var wrapSwiperno = swiper.activeIndex;
		//현재 상태 = 첫장 동작
		if( wrapSwiperno == 0){
			$(".header h1 a").addClass("cor_wh");
			$("#langLink a").addClass("cor_wh");
			$("#navbutton span").addClass("bg_wh");
	
		}
	},
	//스크롤을 내렸을 때 동작
	onSlideNextStart: function(){
			var wrapSwiperno = swiper.activeIndex;
			$(".header h1 a").removeClass("cor_wh");
			$("#langLink a").removeClass("cor_wh");
			$("#navbutton span").removeClass("bg_wh");
			//스크롤로 마지막장 동작
			if( wrapSwiperno == 1){
				$(".header h1 a").addClass("cor_br");
				$("#langLink a").addClass("cor_br");
				$("#navbutton span").addClass("bg_br");
			}
	},
	//스크롤을 올렸을 때 동작
	onSlidePrevStart: function(){
			var wrapSwiperno = swiper.activeIndex;
			if( wrapSwiperno == 0){
				$(".header h1 a").addClass("cor_wh").removeClass("cor_br");
				$("#langLink a").addClass("cor_wh").removeClass("cor_br");
				$("#navbutton span").addClass("bg_wh").removeClass("bg_br");
			
			}
		
	},
	//슬라이드 변동시 무조건 동작
	onSlideChangeStart: function(swiper){
		var wrapSwiperno = swiper.activeIndex;
		//index bg 초기화
		if( wrapSwiperno == 0){
			$(".list li").removeClass("on");
			$(".section_index .bg1, .section_index .bg2").removeAttr("style");

			
			var swiperGangnam = new Swiper('.gangnam-swiper-container', {
				effect : 'fade',
				slidesPerView: '1',
				initialSlide : 1,
				mousewheelControl: true,
				keyboardControl: true,
				simulateTouch: false,
				autoplay: 2000,
				autoplayDisableOnInteraction: true,
				autoplayStopOnLast : true
			});
		}
		if( wrapSwiperno == 1){
		
			var swiperGangnam = new Swiper('.gangnam-swiper-container', {
				effect : 'fade',
				slidesPerView: '1',
				mousewheelControl: true,
				keyboardControl: true,
				simulateTouch: false,
				autoplay: 2000,
				autoplayDisableOnInteraction: true,
				autoplayStopOnLast : true,
			});
		}
	}
});

$(function(){
    var swiper = new Swiper('.swiper-container2', {
        pagination: '.swiper-pagination2',
        paginationClickable: true,
        spaceBetween: 0,
        centeredSlides: true,
        speed: 2000,
        autoplay: 3500,
        autoplayDisableOnInteraction: false,
        effect: 'fade'
    });
});
	// 탑으로
	$("#gotop a, .header h1 a").click(function(e){
		e.preventDefault();
		swiper.slideTo(0);
	});

	// 햄버거메뉴
	$("#navbutton a").click(function (e) {
		e.preventDefault();
		$(".menu dl").slideUp();
		
		if (!$(this).hasClass("on"))
		{
			$("#nav").addClass("show");
		
			$(this).addClass("on");
			swiper.disableMousewheelControl();
			swiper.lockSwipes();
		}
		else {
			$("#nav").removeClass("show");
	
			$(this).removeClass("on");
			swiper.enableMousewheelControl();
			swiper.unlockSwipes();
		}
	});


	// 메인메뉴
	$("#nav .inside").scroll(function () {
		if ($(this).scrollTop() > 0) {
			var navHeight = $(window).height() - 91 + $(this).scrollTop();
			$("#nav .contact").css({top: navHeight, bottom: "auto"});
		} else { $("#nav .contact").removeAttr("style"); }
	});

	// 서브메뉴 - submenu 가 화면상에 보일때는 위로 보드랍게 접고 아니면 아래로 보드랍게 펼치기
	$(".menu a").click(function(){
		var submenu = $(this).next("ul.smenu");
		if( submenu.is(":visible") ){
			submenu.slideUp("fast");
		}else{
			submenu.slideDown().parent().siblings().find("ul.smenu").slideUp("fast");
		}
	});

	// index - 모바일인지 PC인지 구분해서 PC 에서만 마우스오버 이벤트
	/*
	if ( navigator.platform ) {
		if ( filter.indexOf( navigator.platform.toLowerCase() ) != -1 ) {
			//pc
			
			$(".list a").mouseenter(function(e){
				e.preventDefault();
				var indexClass = $(this).parents().attr("class");
				var index = indexClass.replace(/[^0-9]/g,""); // 숫자만 추출
				var bg1 = $(".section_index .bg1");
				var bg2 = $(".section_index .bg2");
				
				$(".list dd").removeClass("on");
				$(this).parent("dd").addClass("on");
				if (bg2.is(":visible"))
				{
					bg2.fadeOut("300");
					bg1.css('background-image',"url(http://images.joins.com/ui_joongang/ooh/201705/bg_idx" + index + ".jpg)").fadeIn("300");
				}
				else if (bg1.is(":visible"))
				{
					bg1.fadeOut("300");
					bg2.css('background-image',"url(http://images.joins.com/ui_joongang/ooh/201705/bg_idx" + index + ".jpg)").fadeIn("300");
				}
			});
			
			// 버튼 - 마우스오버 이벤트 
			$(".btn-detail").on( "mouseenter mouseleave", function () {
				$(".swiper-slide-active .section").toggleClass("over");
			});
		}
		//mobile - .video 없애고, image 보여주기
		else {
			$(".video-wrap").remove();
			$(".section_no1 .bg, .section_no2 .bg, .section_no3 .bg").show();
		}
	};
	/*

	/* index - 클릭 이벤트 */
	/*
	$(".list a").click(function(e){
		e.preventDefault();
		var indexClass = $(this).parents().attr("class");
		var index = indexClass.replace(/[^0-9]/g,""); // 숫자만 추출
		swiper.slideTo(index);
	});
	*/
	
	// pagination - 마우스오버시 이벤트
	$(".swiper-pagination").on( "mouseenter mouseleave", function () {
		$(this).toggleClass("swiper-pagination-bullet-ready");
	});

	$(function () {
		$(".swiper-button-close, .closelayer").on("click", function () { closePromotion(); });
		/*if (utils.getCookie("promotion") != 'n') {
			openPromotion();
		}*/
	});
	function closePromotion() {
		$(".all-case-layer").removeClass("show");
		return false;
	}
	function openPromotion() {
		$(".all-case-layer").addClass("show");
		return false;
	}
	/*function noPromotion() {
		utils.setCookie("promotion", 'n', 1);
		closePromotion();
	}*/

});