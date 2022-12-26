$(function(){
	
	$('.headinner h1').click(function (e) {
		e.preventDefault();
		jQuery('body,html').stop(true).animate({
			scrollTop: 0
		}, 1000);
		
	});

	/*space*/
	var radius = 280;
	
	if(mobile.matches) {
		radius = 150;
	}else if(smobile.matches) {
		radius = 190;
	}else if(tablet.matches) {
		radius = 210;
	}else {
		radius = 280;
	}
	

	$('section img,h2,h3,h4,h5,p,span,table,div,dl,ul,li').addClass('wow fadeInDown');

	new WOW().init();

	var space_option = {
		background:"#000",  //background
		color:"#2e107c",  //원 color
		opacity1:1, //투명도 랜덤적용 
		opacity2:0.4, //투명도 랜덤적용
		parentNode:"div_space",//space 적용 node
		radius:radius //가운데 원 크기
	};
	var space = new Space(space_option);
	space.init();
	
	
	if (pc.matches) {
		window.onscroll = function() {myFunction()};
		var b_ground = document.getElementById("b_ground");
		var sticky = b_ground.offsetHeight;
		var header = document.getElementById("head_m");
		var sticky_real = sticky-90;
		
		
		function myFunction() {
		  if (window.pageYOffset >= sticky_real) {
			header.classList.add("sticky");
			
		  } else {
			header.classList.remove("sticky");
		  }
		} 
	}

	$('.develo:nth(1)').hide();
	$('.team_more').css('cursor','pointer');
	$('.team_more').bind('click',function(){
		$('.develo:nth(1)').slideToggle({duration:400});
	});

	/*partner pre next*/
	var step_count = 1;
	var args = {};
	if(mobile.matches) {
		args.show_count = 3;
		args.step_count = step_count;
	}else if(smobile.matches) {
		args.show_count = 3;
		args.step_count = step_count;
	}else if(tablet.matches) {
		args.show_count = 4;
		args.step_count = step_count;
	}else {
		args.show_count = 5;
		args.step_count = step_count;
	}
	
	args.show_obj = '.partner_wapper';
	args.element_obj = '<ul/>';
	args.element_obj_height = '150px';
	args.pre = '<div class="pre"><img src="/assets/img/partner/pre.png" alt=""/></div>';
	args.next = '<div class="next"><img src="/assets/img/partner/next.png" alt=""/></div>';
	args.elements = [];
	if(lang == "korea"){
		args.elements.push("<li><img src='/assets/img/partner/Association_01.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_04.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_05.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_06.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_07.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_08.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_09.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_10.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_11.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_12.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_13.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_16.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_17.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_18.png' alt=''  class='img'/></li>");
	} else {
		args.elements.push("<li><img src='/assets/img/partner/Association_en_01.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_en_04.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_en_05.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_en_06.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_en_07.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_en_08.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_en_09.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_en_10.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_en_11.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_en_12.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_en_13.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_en_16.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_en_17.png' alt=''  class='img'/></li>");
		args.elements.push("<li><img src='/assets/img/partner/Association_en_18.png' alt=''  class='img'/></li>");
	}
	args.time = 1.5;

	new slide_element(args);


	if(lang == "english") {
		$('.file_view > a').attr("href",'/assets/img/FUTUREPIA_test_result_EN.pdf');
	}else if(lang == "korea") {
		$('.file_view > a').attr("href",'/assets/img/FUTUREPIA_test_result_KR.pdf');
	}else if(lang == "japan") {
		$('.file_view > a').attr("href",'/assets/img/FUTUREPIA_test_result_EN.pdf');
	}

	if(mobile.matches) {
		$('.tps2 span').html(tps_span_m);
	}else {
		$('.tps2 span').html(tps_span_pc);
	}

	$(window).resize(function() {
		if(mobile.matches) {
			//element_slide.notify_resize({show:3,step:step_count,resolution:'mobile'});

			$('.tps2 span').html(tps_span_m);
		}else if(smobile.matches) {
			//element_slide.notify_resize({show:4,step:step_count,resolution:'smobile'});

			$('.tps2 span').html(tps_span_pc);
		}else if(tablet.matches) {
			//element_slide.notify_resize({show:4,step:step_count,resolution:'tablet'});

			$('.tps2 span').html(tps_span_pc);
		}else {
			//element_slide.notify_resize({show:5,step:step_count,resolution:'pc'});

			$('.tps2 span').html(tps_span_pc);
		}
	});


	$('.roadbox').each(function(){
		var data_year = $(this).attr('data-year');
		var data_month = $(this).attr('data-month');

		var data_min_percent = $(this).attr('data-min-percent');
		data_min_percent  = (typeof data_min_percent != "undefined")?data_min_percent:0;

		if(typeof data_year != "undefined") {
			var passed_count = 0;
			var not_passed_count = 0;
			
			if(typeof data_month != "undefined") {
				
				
				var date = new Date();
			
				var months = [];

				if(data_month.indexOf(',') > -1) {
					months = data_month.split(',');
				}else {
					months.push(data_month);
				}
				
				for(var i=0;i<months.length;i++){
					var month = months[i];
					var last_day = (new Date(data_year, month, 0) ).getDate();
					for(var j=1;j<=last_day;j++){
						var compare_date = new Date(data_year, month-1, j);
						
						if(compare_date > date) {
							not_passed_count++;
						}else {
							passed_count++;
						}
					}
				}

				var total_count = not_passed_count + passed_count;

				var percent = Math.floor((passed_count/total_count) * 10) * 10; //10% 단위로만 표시 

				if(data_min_percent > percent) {
					percent = data_min_percent;
				}

				$(this).find('.roadgraph > h4 > span').html(percent + '%');
				$(this).find('.roadgraph > .rating > span').css('width',percent + '%');
				
				$(this).find('.roadgraph > p.rtxt').html('');
				if(percent == 0) {
					$(this).find('.roadgraph > p.rtxt').html(road_pending + '<span class="roadcheck"></span>');
				}else if(percent == 100) {
					$(this).find('.roadgraph > p.rtxt').html(road_completed + '<span class="roadcheck"></span>');
				}else {
					$(this).find('.roadgraph > p.rtxt').html(road_inprocess + '<span class="roadcheck"></span>');
				}

			}
		}

		
	});

});
