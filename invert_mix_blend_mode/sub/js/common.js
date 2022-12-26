/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	Gnb Function	

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	js_gnb ();

	$('footer i').addClass('wow fadeInDown');
	new WOW().init();

	var counties = [];
	counties['korea'] = "KR";
	counties['english'] = "EN";
	counties['japan'] = "JP";
	counties['china'] = "CN"; 

	$(function(){
	    //var src = "/assets/img/"+lang+".png";
	    //$('#country_img >a > img').attr('src',src);
	    // $('#country_img >a > em').html(counties[lang]);
	    // $('#country_img >a').css('background-image', 'url(\"/assets/img/'+lang+'1.png\")');
	    // $('.mid576 .contry > a').html(counties[lang]);
	});
});


function js_gnb(){
	var dtxt01 = $(".depth01").text();
	var dtxt02 = $(".depth02").text();
	var dtxt03 = $(".depth03").text();
	var dtxt04 = $("#contents .path strong").text();
	
	var gnb_obj = $("#nav > #gnb > ul");
		gnb_obj.intervals = "";
		gnb_obj.li = gnb_obj.find(">li.contry"); 
		gnb_obj.li.a = gnb_obj.li.find(">a");
		gnb_obj.li.ul = gnb_obj.li.find(">ul");
		gnb_obj.li.ul.li = gnb_obj.li.ul.find(">li"); 
		gnb_obj.li.ul.li.a = gnb_obj.li.ul.li.find(">a");
		gnb_obj.h = $("#header #nav"); 
		gnb_obj.blind = $("#nav > #blind"); 
		
	//default
	/*gnb_obj.li.each(function(e){
		$(this).addClass("num"+(e+1));	
	});
	setTimeout(function(){gnb_def();},300);
	
	gnb_obj.mouseenter(function(){
		clearTimeout(gnb_obj.intervals);
	});	
	
	gnb_obj.mouseleave(function(){
		gnb_obj.intervals = setTimeout(function(){
			gnb_def(gnb_obj);
		},300);
	});*/
		
	/*gnb_obj.li.a.on("mouseover focus",function(){
		var idx = gnb_obj.li.index($(this).parent());
		gnb_open(idx);
	});*/
	
	/*gnb_obj.li.ul.mouseenter(function(){
		gnb_obj.li.find(">a.ov").removeClass("ov");
		$(this).siblings("a").addClass("ov");
		gnb_obj.li.ul.not($(this)).removeClass("ov");
		$(this).addClass("ov");
	});
	
	gnb_obj.li.ul.li.a.on("mouseover focus",function(){
		gnb_obj.li.find(">a.ov").removeClass("ov");
		$(this).parent().parent().siblings("a").addClass("ov");
		gnb_obj.li.find(">ul.ov").removeClass("ov");
		$(this).parent().parent().addClass("ov");
	});	
	
	gnb_obj.li.eq(4).find(">ul>li").last().find(">a").on("focusout",function(){
		gnb_obj.intervals = setTimeout(function(){
			gnb_def(gnb_obj);
		},300);
	});*/
	
	/*function gnb_def(){
		gnb_obj.li.find("a").removeClass("ov");
		if(dtxt01.length!=0){
			gnb_obj.li.a.removeClass("ov");
			gnb_obj.li.a.each(function(){
				var dt = $(this).text();
				if(dt==dtxt01){
					$(this).addClass("ov");
				}
			});
			if(dtxt02.length!=0){
				gnb_obj.li.ul.li.a.find(">strong").each(function(){
					var dt = $(this).text();
					if(dt==dtxt02){
						$(this).parent("a").addClass("ov");
					}
				});
			}
		}
		gnb_obj.li.ul.stop().animate({"opacity":0},150,function(){$(this).hide();});
		gnb_obj.h.stop().animate({"height":75+"px"},300);*/
	}
	
	function gnb_open(idx){
		gnb_obj.li.find(">a").removeClass("ov");
		gnb_obj.li.eq(idx).find(">a").addClass("ov");
		gnb_obj.li.find(">ul").removeClass("ov");
		gnb_obj.li.eq(idx).find(">ul").addClass("ov");
		
		gnb_obj.maxH = 0;
		for(var i=0; i<gnb_obj.li.size(); i++){
			gnb_obj.maxH = Math.max(gnb_obj.maxH,gnb_obj.li.eq(i).find(">ul").removeAttr("style").innerHeight());
		}
		gnb_obj.li.ul.height(gnb_obj.maxH).show().stop().animate({"opacity":1},300);
		gnb_obj.maxH = gnb_obj.maxH + 80;     //  height of  submenu 
		gnb_obj.h.stop().animate({"height":gnb_obj.maxH+"px"},300);
		gnb_obj.blind.stop().animate({"height":100+"%"},300);
	}
	
	
	//Slide_map
	/*
	$('<div id="slide_map"><div class="box"><strong class="title">전체메뉴</strong><div class="binds"></div><a href="#" class="close">닫기</a></div><span class="blind"></span></div>').prependTo($("#wrapper"));
	gnb_obj.clone(false).appendTo($("#slide_map >.box > .binds"));
	$(".sns_link, .site_code").clone(false).appendTo($("#slide_map >.box > .binds"));
	
	$(".mob_btn").click(function(){
		$("body,html").stop().animate({"scrollTop":"0"},300,function(){
			$("#slide_map").show().stop().animate({"opacity":1},300,function(){
				$(this).find(">.box").stop().animate({"right":0},300);
			});
			$("#wrapper").height(940);
			$("#slide_map").height($(document).height());		
		});
		return false;
	});

	$("#slide_map .box .close").click(function(){
		$("#slide_map").find(">.box").stop().animate({"right":-100+"%"},300,function(){
			$(this).parent().stop().animate({"opacity":0},300,function(){
				$(this).hide();	
			});
			$("#wrapper, #slide_map").removeAttr("style");
		});	
		return false;
	});

	$(window).resize(function(){
		if($("#slide_map").is(":visible")){
			$("#wrapper").height(940);
			$("#slide_map").height($(document).height());
		} else {
			$("#wrapper, #slide_map").removeAttr("style");	
		}
	});	
	
	//Mobile Menu
	var mob_gnb_obj = $("#slide_map"); 
		mob_gnb_obj.box = mob_gnb_obj.find(">.box"); 
		mob_gnb_obj.box.gnb = mob_gnb_obj.box.find(">.binds"); 
		mob_gnb_obj.box.gnb.ul = mob_gnb_obj.box.gnb.find(">ul");
		mob_gnb_obj.box.gnb.ul.li = mob_gnb_obj.box.gnb.ul.find(">li");
		mob_gnb_obj.box.gnb.ul.li.a = mob_gnb_obj.box.gnb.ul.li.find(">a");
		mob_gnb_obj.box.gnb.ul.li.ul = mob_gnb_obj.box.gnb.ul.li.find(">ul");
		mob_gnb_obj.box.gnb.ul.li.ul.li = mob_gnb_obj.box.gnb.ul.li.ul.find(">li");
		mob_gnb_obj.box.gnb.ul.li.ul.li.a = mob_gnb_obj.box.gnb.ul.li.ul.li.find(">a");	
		mob_gnb_obj.box.gnb.ul.li.ul.li.ul = mob_gnb_obj.box.gnb.ul.li.ul.li.find(">ul");
		mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li = mob_gnb_obj.box.gnb.ul.li.ul.li.ul.find(">li");
		mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li.a = mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li.find(">a");
		mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li.ul = mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li.find(">ul");
		mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li.ul.li = mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li.ul.find(">li");
		mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li.ul.li.a = mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li.ul.li.find(">a");
		
	//def
	mob_def();
	function mob_def(){
		mob_gnb_obj.box.find("a").removeClass("ov");
		if(dtxt01.length!=0){
			mob_gnb_obj.box.gnb.ul.li.a.removeClass("ov");
			mob_gnb_obj.box.gnb.ul.li.a.each(function(){
				var dt = $(this).text();
				if(dt==dtxt01){
					$(this).addClass("ov").siblings("ul").slideDown();
				}
			});
			if(dtxt02.length!=0){
				mob_gnb_obj.box.gnb.ul.li.ul.li.a.find(">strong").each(function(){
					var dt = $(this).text();
					if(dt==dtxt02){
						$(this).parent().addClass("ov").siblings("ul").slideDown();
					}
				});
				if(dtxt03.length!=0){
					mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li.a.find(">strong").each(function(){
						var dt = $(this).text();
						if(dt==dtxt03){
							$(this).parent().addClass("ov").siblings("ul").slideDown();
						}
					});
					if(dtxt04.length!=0){
						mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li.ul.li.a.find(">strong").each(function(){
							var dt = $(this).text();
							if(dt==dtxt04){
								$(this).parent().addClass("ov");
							}
						});
					}
				}
			}
		}
	}
	
	mob_gnb_obj.box.gnb.ul.li.a.click(function(){
		if(mob_gnb_obj.box.gnb.ul.li.ul.is(":animated")) return false;
		if($(this).siblings("ul").size() != 0){
			mob_gnb_obj.box.gnb.ul.li.a.not(this).removeClass("ov").siblings("ul").slideUp();
			$(this).toggleClass("ov").siblings("ul").slideToggle();
			return false;	
		} else {
			return true;	
		}
	});
	
	mob_gnb_obj.box.gnb.ul.li.ul.li.a.click(function(){
		if(mob_gnb_obj.box.gnb.ul.li.ul.li.ul.is(":animated")) return false;
		if($(this).siblings("ul").size() != 0){
			mob_gnb_obj.box.gnb.ul.li.ul.li.a.not(this).removeClass("ov").siblings("ul").slideUp();
			$(this).toggleClass("ov").siblings("ul").slideToggle();
			return false;
		} else {
			return true;	
		}
	});
	
	mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li.a.click(function(){
		if(mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li.ul.is(":animated")) return false;
		if($(this).siblings("ul").size() != 0){
			mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li.a.not(this).removeClass("ov").siblings("ul").slideUp();
			$(this).toggleClass("ov").siblings("ul").slideToggle();
			return false;
		} else {
			return true;	
		}
	});*/
/*}*/


//snb

$(document).ready(function(e) {

	/*******************서브 SNB 활성화*******************************/
	$(".snb_menu .current_selected").on('click',function(){	
			
		if( $(this).parent().hasClass("active")){	
			$(this).parent().removeClass("active");	
		}else{
			$(this).parent().addClass("active");	
		}
		$(this).siblings(".list").slideToggle(200);
		return false;
	});	
    /*마우스 아웃시 닫힘 처리*/
	$(".snb_menu .snb_depth1, .snb_menu .snb_depth2, .snb_menu .snb_depth3").on('mouseleave',function(){		
		$(this).children(".list").css("display","none");
        $(this).removeClass("active");	
	});	   
	
});  
  

//bmcho 180521 main tab 수정
function tab_move(num){
    $(".tab_btn").removeClass("on");
    $(".tab_btn:eq("+num+")").addClass("on");
    $(".cont").hide();
    $("#tab" + num).show()	
}
// tab
$(document).ready(function() {
    $(".cont").hide();
    $(".cont:first").show();
  
  /* bmcho 주석180521
    $(".tab_btn").click(function() {
        $(".tab_btn").removeClass("on");
        $(this).addClass("on");
        $(".cont").hide()
        var selTab = $(this).attr("name");
        $("#" + selTab).show()
        return false;
    });
  
    $(".tab_btn").focusin(function() {
        $(".tab_btn").removeClass("on");
        $(this).addClass("on");
        $(".cont").hide()
        var selTab = $(this).attr("name");
        $("#" + selTab).show()
        return false;
    });*/
});




/* // main_visual

$(document).ready(function() {
        $('.main_visual .bxslider').bxSlider({
          mode: 'horizontal',
          auto: true,
          autoControls: true,
          stopAutoOnClick: true,
          captions: true,
          moveSlides: 1,
          speed: 200
        });
});
*/

// main_visual
//  $(document).ready(function() {
     
//     var $visual = $('.main_visual'),
//         $original_slide = $visual.find('.slide');     
     
//         var mainSlider = $visual.find('.bxslider').bxSlider({
//           mode: 'horizontal',  //'horizontal', 'vertical', 'fade'
//           auto: true,
//           autoControls: true,
//           autoControlsCombine:true,
//           captions: true,
// 	      autoHover:true,
//           //moveSlides: 1,
//           speed: 600,
//             onSliderLoad: function() {
//                var n = this.getCurrentSlide();
//                $visual.find('.slide').not('.bx-clone').eq(n).addClass('current').find(">img").animate({'opacity': '1'}, 500);
//                $visual.find('.slide').not('.bx-clone').eq(n).addClass('current').find(".txt").css("display","block");
//             },
//             onSlideBefore: function() {
              
//                var n = this.getCurrentSlide();
//                $visual.find('.slide').find(">img").animate({'opacity': '0.3'}, 500);
//                $visual.find('.slide').find(".txt").css("display","none");
//                if ( n == 0 ) {
//                     $visual.find('.slide:last').find(">img").stop(true, true).animate({'opacity': '1'}, 500);
//                     $visual.find('.slide:last').find(".txt").css("display","block");
//                 } else if ( n == ( this.getSlideCount() - 1 ) ) {
//                     $visual.find('.slide:first').find(">img").stop(true, true).animate({'opacity': '1'}, 500);
//                     $visual.find('.slide:first').find(".txt").css("display","block");
//                 }
//                 $original_slide.eq(n).find(">img").stop(true, true).animate({'opacity': '1'}, 500);
//                 $original_slide.eq(n).find(".txt").css("display","block");
//             },
//             onSlideAfter: function() {
//               var n = this.getCurrentSlide();
//               $visual.find('.slide').removeClass('current');
//               $original_slide.eq(n).addClass('current');
//             }            
//         });    
     

// });


    // link
//  $(document).ready(function() {
//         linkSlider = $('.link .bxslider').bxSlider({
//          mode: 'horizontal',
//          auto:true,
//          maxSlides:5,
//          slideWidth:180,
//     	 moveSlides:1,
//     	 speed:200,
//           startSlide:1
//         });

// 		var ResizeSituation = 0;
// 		$(window).resize(function(){		
// 			var windowWidth = $('body').width();				
// 			if(windowWidth>1000){
// 				if(ResizeSituation!=1){					
// 					ResizeSituation = 1;
// 					linkSlider.reloadSlider();
// 				}else{
// 					return false;
// 				}
// 			}
// 			if(windowWidth<999){					
// 				ResizeSituation = 0;				
// 			}
// 		});	


// });

/*
//main_popup
 function main_layer_open(el){

		var temp = $('#' + el);
		var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

		if(bg){
			$('.main_popup').fadeIn();	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
		}else{
			temp.fadeIn();
		}

		// 화면의 중앙에 레이어를 띄운다.
		if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
		else temp.css('top', '0px');
		if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
		else temp.css('left', '0px');

		temp.find('a.cbtn').click(function(e){
			if(bg){
				$('.main_popup').fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
			}else{
				temp.fadeOut();
			}
			e.preventDefault();
		});

		$('.main_popup .bg').click(function(e){	//배경을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
			$('.main_popup').fadeOut();
			e.preventDefault();
		});

	}
*/
//calendar popup
 function calendar_layer_open(el) {
	 /*vv = el.replace('layer', '') - 1;
    $('.event').eq(vv).fadeIn();*/
    //bmcho 수정
    $('#pop_'+el).fadeIn();
    var temp = $('#' + el);
    temp.fadeIn();
   
   // 화면의 중앙에 레이어를 띄운다.    
    /*if(temp.outerHeight() < $(document).height() ){
        temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
    } else {
        temp.css('top', '0px');
    }
    if(temp.outerWidth() < $(document).width() ){
        temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
    } else {
       temp.css('left', '0px'); 
    }     */
 }  
  $(document).ready(function(){

      $('.event .bg').click(function(e){	//배경을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
       $('.event').fadeOut();
       //e.preventDefault();
      }); 

       $('a.cbtn').click(function(e){	//배경을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
         //alert("dd");
         $('.event').fadeOut();
       //e.preventDefault();
      });   
  });



//map

 function initMap() {
		var map = new google.maps.Map(document.getElementById('map'), {
		  center: {
			lat: 36.37816,
			lng: 129.10893
		  },
		  zoom: 14
		});


		var image = '/csmice/images/sub/map_logo.png';
		var beachMarker = new google.maps.Marker({
		  position: {
			lat: 36.37816,
			lng: 129.10893
		  },
		  map: map,
		  draggable: false,
		  animation: google.maps.Animation.DROP,
		  icon: image
		});


	  }


//popwrap

function popwrap_01_layer_open(el){

		var temp = $('#' + el);
		var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

		if(bg){
			$('.popwrap_01').fadeIn();	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
		}else{
			temp.fadeIn();
		}

		// 화면의 중앙에 레이어를 띄운다.
		if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
		else temp.css('top', '0px');
		if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
		else temp.css('left', '0px');

		temp.find('.popbtn').click(function(e){
			if(bg){
				$('.popwrap_01').fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
			}else{
				temp.fadeOut();
			}
			e.preventDefault();
		});

		$('.popwrap_01 .bg').click(function(e){	//배경을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
			$('.popwrap_01').fadeOut();
			e.preventDefault();
		});

	}	




//tab
var tab = function(){
	var $tabArea = $('.js-tab-area');
	$tabArea.each(function(){
		var $tabBtn = $(this).find('.js-tab-btn');
		var $tabBtnItem = $tabBtn.find('a');
		var $tabPanel = $(this).find('.js-tab-panel');
		var idx = 0;

		$tabBtnItem.on('click', function(e){
		//console.log($tabPanel);
		idx = $(this).parent().index();
		$(this).parent().addClass('on').siblings().removeClass('on');
		$tabPanel.eq(idx).show().siblings().hide();

		e.preventDefault();
		});
	});
}







/*매치 미디어 스크롤*/
jQuery(document).ready(function($) { 
	$(".scroll").click(function(event){
		event.preventDefault();
		
		if (window.matchMedia("(min-width: 981px)").matches){
			$('.s_sub_tab > li > a').removeClass('active');
			$(this).addClass('active');
			$('html,body').animate({scrollTop:$(this.hash).offset().top-280}, 800);
		}
		
		if (window.matchMedia("(max-width: 980px)").matches){
			$('.s_sub_tab > li > a').removeClass('active');
			$(this).addClass('active');
			$('html,body').animate({scrollTop:$(this.hash).offset().top-100}, 800);
		}
		
	});
});
	




/*careers slidedown*/

$(function(){
	$('.car_list > div:first-child').on('click', function(){
		if($(this).hasClass('on')){
			$('.careers_con').stop(true).slideUp(300);
			$('.car_list > div:first-child').removeClass('on');
			$('.car_list > div > .car_date > img').attr('src', '../../assets/img/sub/cl_bt.png');
		}else{
			$('.careers_con').slideUp();
			$('.car_list > div > .car_date > img').attr('src', '../../assets/img/sub/cl_bt.png');
			
			$('+ .careers_con', this).stop(true).slideDown(300);
			$('.car_date > img', this).attr('src', '../../assets/img/sub/op_bt.png');
			$(this).addClass('on');
		}
	});
	
	
	$('.sub_nav').after('<div class="vir_div"></div>')
});



/*langWrap*/

$(function(){
	$('.langWrap .langBox').on('click', function(){
	if($(this).hasClass('on')){
	$('.langBox_con').stop(true).slideUp(300);
	$('.langWrap .langBox').removeClass('on');
	$('.langWrap .langBox .infoBox_btn > img').attr('src', '/assets/img/com/lang_marr.png');
	}else{
	$('.langBox_con').slideUp();
	$('.langWrap  .langBox .infoBox_btn > img').attr('src', '/assets/img/com/lang_marr.png');

	$('+ .langBox_con', this).stop(true).slideDown(300);
	$('.langBox_btn > img', this).attr('src', '/assets/img/com/lang_marr.png');
	$(this).addClass('on');
	}
	}); 
});
