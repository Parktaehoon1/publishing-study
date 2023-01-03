// popup
function pop_up_layer(el){
   var scroll_top = $(window).scrollTop();
   var class_obj = $('.' + el);
   var temp = $('#' + el);
   //var bg = temp.prev().hasClass('bg');   //dimmed 레이어를 감지하기 위한 boolean 변수
   
   var bg = class_obj.find('.bg');
   
   if(bg){
     bg.css('height',$('body').prop('scrollHeight') + 'px'); 
     bg.css('display','block');
      
     class_obj.fadeIn();   //'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
      
   }else{
      temp.fadeIn();
   }

   temp.find('.cbtn').click(function(e){
      if(bg){
         class_obj.fadeOut(200); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
      }else{
         temp.fadeOut(200);
      }
      e.preventDefault();
      bg.fadeOut(400);
   });
    
   bg.click(function(){
      $(this).fadeOut();
      e.preventDefault();
      bg.fadeOut(400);
   });      
}
 
 

//calendar

$(function() {
//input을 datepicker로 선언
$("#datepicker1,#datepicker2").datepicker({
	dateFormat: 'yy-mm-dd' //달력 날짜 형태
	,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
	,showMonthAfterYear:true // 월- 년 순서가아닌 년도 - 월 순서
	,changeYear:false //option값 년 선택 가능
	,changeMonth: false//option값  월 선택 가능
	,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시
	,buttonImage: "../assets/img/com/icon_calendar.svg" //버튼 이미지 경로
	,buttonImageOnly: true //버튼 이미지만 깔끔하게 보이게함
	,buttonText: "선택" //버튼 호버 텍스트
	,yearSuffix: "년" //달력의 년도 부분 뒤 텍스트
	,monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 텍스트
	,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip
	,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 텍스트
	,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 Tooltip
	,minDate: "-5Y" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
	,maxDate: "+5y" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)
	,showButtonPanel: true // 캘린더 하단에 버튼 패널을 표시한다.
	,currentText: 'TODAY' // 오늘 날짜로 이동하는 버튼 패널
	,closeText: 'CLOSE'   // 닫기 버튼 패널
});

//초기값을 오늘 날짜로 설정해줘야 합니다.
$('#datepicker1,#datepicker2').datepicker('setDate', 'today');  
});


// input : select all
$(document).ready(function(){
//최상단 체크박스 클릭
	$("#checkall").click(function(){
	//클릭되었으면
	    if($("#checkall").prop("checked")){
			//input태그의 name이 chk인 태그들을 찾아서 checked옵션을 true로 정의
			$("input[name=chk]").prop("checked",true);
			//클릭이 안되있으면
			}else{
			//input태그의 name이 chk인 태그들을 찾아서 checked옵션을 false로 정의
			$("input[name=chk]").prop("checked",false);
		}
	})
})







// Toast popup
let removeToast;

function toast(string) {
	const toast = document.getElementById("toast");

	toast.classList.contains("reveal") ?
	(clearTimeout(removeToast), removeToast = setTimeout(function () {
	document.getElementById("toast").classList.remove("reveal")
	}, 1000)) :
	removeToast = setTimeout(function () {
	document.getElementById("toast").classList.remove("reveal")
	}, 1000)
	toast.classList.add("reveal"),
	toast.innerText = string
}




 //  input type=file 
$(document).ready(function(){ 
	var fileTarget = $('.filebox .upload-hidden'); 

		fileTarget.on('change', function(){  // 값이 변경되면
			if(window.FileReader){ // modern browser 
			var filename = $(this)[0].files[0].name; 
		} 
			else { // old IE 
			var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출 
		} 

		// 추출한 파일명 삽입 
		$(this).siblings('.upload-name').val(filename); 
	}); 
}); 



//  event tab
function openTab(evt, tabName) {
	var i, x, tablinks;
	x = document.getElementsByClassName("tabbox");
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablink");
	for (i = 0; i < x.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" on", "");
	}
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " on";
}

 

//  sortable : drag

 $(function() {
  $(".displaywrap").sortable();
  $(".displaywrap").disableSelection();
});




// Create :  input : file upload preview
$(document).ready(function(){ 
	console.log()
	function handleFileSelect(event) {
		var input = this;
		console.log(input.files)
		if (input.files && input.files.length) {
			var reader = new FileReader();
			this.enabled = false
			reader.onload = (function (e) {
			console.log(e)
			$(".createFile_preview").html(['<img class="thumb" src="', e.target.result, '" title="닫기', escape(e.name), '"/>'].join(''))
			});
			reader.readAsDataURL(input.files[0]);
		}
	}

	$('.createFile_upload').change(handleFileSelect);

	$('.createFile_upload').change( function() {
		$(".createFile_preview-de").addClass( 'on' );
		$(".createFilebox").fadeOut(0);
	});

	$('.createFile_preview-de').click( function() {
		$(".createFile_preview").empty()
		$(".createFile_preview-de").removeClass( 'on' );
		$(".createFilebox").fadeIn(0);
		$(".createFile_upload").val("");
	} );
});

// search :  datebox 
$(function() {
	$(".datebox a:first").addClass('on');
	$(".datebox a").click(function() {
	$(this).addClass('on');
	$(this).siblings().removeClass('on');
	//$(this).next(".asmenu").siblings(".asmenu").slideUp(300); // 1개씩 펼치기
	});
});

// filebox  
$("input[name=file]").on('change',function(){
  var fileName = $(this).val();
  $(this).parent().parent('div').children('.upload-name').val(fileName);
});



$(function() {
 	$('.period span:nth-child(1)').click(function () { 
		$(this).parent().siblings('.calendarbox').removeClass('disabled'); 
	});
	$('.period span:nth-child(2)').click(function () {
		$(this).parent().siblings('.calendarbox').addClass('disabled'); 
	});
});