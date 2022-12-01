$(function () {

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
		hideOnClick: true,
		normalizeSlideIndex: true,


		//슬라이드 변동시 무조건 동작
		onSlideChangeStart: function (swiper) {
			var wrapSwiperno = swiper.activeIndex;
			//index bg 초기화
			if (wrapSwiperno == 0) {
				$(".list li").removeClass("on");
				$(".section_index .bg1, .section_index .bg2").removeAttr("style");


				var swiperGangnam = new Swiper('.gangnam-swiper-container', {
					effect: 'fade',
					slidesPerView: '1',
					initialSlide: 1,
					mousewheelControl: true,
					keyboardControl: true,
					simulateTouch: false,
					autoplay: 2000,
					autoplayDisableOnInteraction: true,
					autoplayStopOnLast: true
				});
			}
			if (wrapSwiperno == 1) {

				var swiperGangnam = new Swiper('.gangnam-swiper-container', {
					effect: 'fade',
					slidesPerView: '1',
					mousewheelControl: true,
					keyboardControl: true,
					simulateTouch: false,
					autoplay: 2000,
					autoplayDisableOnInteraction: true,
					autoplayStopOnLast: true,
				});
			}
		}
	});


	// 탑으로
	$("#gotop a, .header h1 a").click(function (e) {
		e.preventDefault();
		swiper.slideTo(0);
	});

	// 햄버거메뉴
	$("#navbutton a").click(function (e) {
		e.preventDefault();
		$(".menu ul").slideUp();

		if (!$(this).hasClass("on")) {

			$('body').css('overflow', 'hidden');
			$('body').css('touch-action', 'none');

			$("#nav").addClass("show");

			$(this).addClass("on");
			//swiper.disableMousewheelControl();
			//swiper.lockSwipes();
		} else {

			$('body').css('overflow', '');
			$('body').css('touch-action', '');

			$("#nav").removeClass("show");

			$(this).removeClass("on");
			//swiper.enableMousewheelControl();
			//swiper.unlockSwipes();
		}
	});


	// 메인메뉴
	$("#nav .inside").scroll(function () {
		if ($(this).scrollTop() > 0) {
			var navHeight = $(window).height() - 91 + $(this).scrollTop();
			$("#nav .contact").css({top: navHeight, bottom: "auto"});
		} else {
			$("#nav .contact").removeAttr("style");
		}
	});

	// 서브메뉴 - submenu 가 화면상에 보일때는 위로 보드랍게 접고 아니면 아래로 보드랍게 펼치기
	$(".menu > li a").mouseenter(function () {
		var submenu = $(this).next("ul.smenu");
		if (submenu.is(":visible")) {
			submenu.slideUp("fast");

		} else {
			submenu.slideDown().parent().siblings().find("ul.smenu").slideUp("fast");
		}

		$(".menu > li").mouseleave(function () {
			$("ul.smenu").slideUp("fast");
		});
	});


	// pagination - 마우스오버시 이벤트
	$(".swiper-pagination").on("mouseenter mouseleave", function () {
		$(this).toggleClass("swiper-pagination-bullet-ready");
	});

	$(function () {
		$(".swiper-button-close, .closelayer").on("click", function () {
			closePromotion();
		});
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
