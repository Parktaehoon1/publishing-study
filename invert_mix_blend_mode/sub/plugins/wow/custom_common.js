/*해상도별 js 선택 부르기
var pc = window.matchMedia("screen and (min-width: 1201px)");
var laptop = window.matchMedia("screen and (min-width: 993px) and (max-width: 1200px)");
var tablet = window.matchMedia("screen and (min-width: 769px) and (max-width: 992px)");
var smobile = window.matchMedia("screen and (min-width: 577px) and (max-width: 768px)");
var mobile = window.matchMedia("screen and (min-width: 0px) and (max-width: 576px)");
*/

var pc = window.matchMedia("screen and (min-width: 1225px)");
var tablet = window.matchMedia("screen and (min-width: 769px) and (max-width: 1024px)");
var smobile = window.matchMedia("screen and (min-width: 577px) and (max-width: 768px)");
var mobile = window.matchMedia("screen and (min-width: 0px) and (max-width: 576px)");

var motion = 'easeOutQuint';
var motion2 = 'easeOutCirc';

var counties = [];
counties['korea'] = "KO";
counties['english'] = "EN";
counties['japan'] = "JP";

$(function(){



	$('.nav_m > ul > li > a').mouseover(function(){
		$(this).stop(true).animate({
			color: '#46c7f4'
		}, 500);
	}).mouseout(function(){
		$(this).stop(true).animate({
			color: '#fff'
		}, 500);
	});
	
	/*모바일 슬라이드 토글*/
	$('.m_menu > li').on('click', function(){
		$('ul', this).stop(true).slideToggle();
	});
	
	/*pc 마우스 오버시 드랍다운*/
	$('.mid1201 li').hover(function(){
		$('ul', this).stop(true).slideDown();
	}, function(){
		$('ul', this).stop(true).slideUp();
	});
	
	$('.m_sub > li').hover(function(){
		$('> a', this).stop(true).animate({
			color: '#2e67b1'
		}, 500);
		
		
	},function(){
		/*메뉴마우스 오버시 색상 chagne*/
		$('> a', this).stop(true).animate({
			color: '#fff'
		}, 300);
		
	});
	
	/*로그인 롤오버*/
	$('.f_join > li > a').mouseover(function(){
		$(this).stop(true).animate({
			color: '#46c7f4'
		}, 500);
	}).mouseout(function(){
		$(this).stop(true).animate({
			color: '#fff'
		}, 500);
	});


	$('.mobile_nav').on('click', function(e){
		e.preventDefault();
		if($('.nav_m').hasClass('on')){
			$('.nav_m').stop(true).slideDown().removeClass('on');
			
			$('.mobile_nav img').attr('src', '/assets/img/ham_04.png');
			
		}else{
			$('.nav_m').stop(true).slideUp().addClass('on'); 
			$('.mobile_nav img').attr('src', '/assets/img/ham_03.png');
			$('.languages').slideUp();
			$('.mypage_list').slideUp();

		}
	});
	
	
	/*kyc 탭*/
	$('.accout_inner ul li a').on('click', function(){
		$('.accout_inner ul li a').removeClass('selected');
		$(this).addClass('selected');
	})
	

	
	$('.contry > a').on('click', function(e){
		e.preventDefault();
	});
	
	$('.my_pg > a').on('click', function(e){
		e.preventDefault();
	});
});

function change_ham() {
	$('.mobile_nav img').attr('src', '/assets/img/ham_03.png');
}
