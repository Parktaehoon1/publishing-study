$(function(){
	// 모바일인지 PC인지 구분
	var filter = "win16|win32|win64|mac|macintel";	 
 
	// 탑으로
	$("#gotop a, .header h1 a").click(function(e){
		e.preventDefault();
		swiper.slideTo(0);
	});

	// 햄버거메뉴
	$("#navbutton a").click(function (e) {
		e.preventDefault();
		$(".menu ul").slideUp();
		
		if (!$(this).hasClass("on"))
		{
			$("#nav").addClass("show");
		
			$(this).addClass("on");
			swiper.disableMousewheelControl();
			swiper.lockSwipes();
		}
		else {
			$("#nav ").removeClass("show");
	
			$(this).removeClass("on");
			swiper.enableMousewheelControl();
			swiper.unlockSwipes();
		}
	});

	$("#nav .back").click(function (e) {
			$("#nav").removeClass("show");	
			$("#navbutton a").removeClass("on");		 
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
 

	/* index - 클릭 이벤트 */
	$(".menu a").click(function(e){
		e.preventDefault();
		var indexClass = $(this).parents().attr("class");
		var index = indexClass.replace(/[^0-9]/g,""); // 숫자만 추출
		swiper.slideTo(index);
	});

	// pagination - 마우스오버시 이벤트
	$(".swiper-pagination").on( "mouseenter mouseleave", function () {
		$(this).toggleClass("swiper-pagination-bullet-ready");
	});

	$(function () {
		$(".swiper-button-close, .closelayer").on("click", function () { closePromotion(); });	 
	});
	function closePromotion() {
		$(".all-case-layer").removeClass("show");
		return false;
	}
	function openPromotion() {
		$(".all-case-layer").addClass("show");
		return false;
	} 

});