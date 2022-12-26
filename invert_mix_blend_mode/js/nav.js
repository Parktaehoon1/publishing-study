$(function(){
	// mobile : 햄버거메뉴 클릭시 메뉴 보임
	$("#navbutton").click(function (e) {
		e.preventDefault();
		$(".menu ul").slideUp();
		
		if (!$(this).hasClass("on"))
		{
			$("header").addClass("mobile_nav");
			$("#nav").addClass("show");
		
			$(this).addClass("on");
			// swiper.disableMousewheelControl();
			// swiper.lockSwipes();
		}
		else {
			$("header").removeClass("mobile_nav");
			$("#nav").removeClass("show");
	
			$(this).removeClass("on");
			// swiper.enableMousewheelControl();
			// swiper.unlockSwipes();
		}
	});

	$("#nav .back").click(function (e) {
			$("#nav").removeClass("show");	
			$("#navbutton").removeClass("on");		 
	});

	// 메인메뉴
	$("#nav .inside").scroll(function () {
		if ($(this).scrollTop() > 0) {
			var navHeight = $(window).height() - 91 + $(this).scrollTop();
			$("#nav .contact").css({top: navHeight, bottom: "auto"});
		} else { $("#nav .contact").removeAttr("style"); }
	});

	//mobile : sub nav
	$(".menu > li > a").click(function(){
		var submenu = $(this).next("ul.smenu");
        if (window.innerWidth <= 1300) {
			if( submenu.is(":visible") ){
				submenu.slideUp(200);
				$(this).parents("li").removeClass("clickmenu");
			}else{
				$(".menu").find("ul.smenu").slideUp(200);
				submenu.slideDown();
				$("ul.menu > li").removeClass("clickmenu");
				$(this).parents("li").addClass("clickmenu");
			}
        };
	});
 

});
