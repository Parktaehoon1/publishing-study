
function pop_up_layer(el) {
	console.log("ㄹㄹ");
	let scroll_top = $(window).scrollTop();
	let class_obj = $("." + el);
	console.log(class_obj, "클래스")
	let temp = $("#" + el);
	console.log(temp, "아이디");
	//let bg = temp.prev().hasClass('bg');   //dimmed 레이어를 감지하기 위한 boolean 변수
	let bg = class_obj.find(".bg");
	console.log(bg, "배경");
		if (bg) {
		bg.css("height", $("body").prop("scrollHeight") + "px");
		bg.css("display", "block");
		class_obj.fadeIn(); //'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다.
		} else {
		temp.fadeIn();
		}
	temp.find(".save").click(function (e) {
		if (bg) {
			class_obj.fadeOut(200); //'bg' 클래스가 존재하면 레이어를 사라지게 한다.
		} else {
			temp.fadeOut(200);
		}
		e.preventDefault();
		bg.fadeOut(400);
		});
	temp.find(".close_btn").click(function (e) {
		if (bg) {
			class_obj.fadeOut(200); //'bg' 클래스가 존재하면 레이어를 사라지게 한다.
		} else {
			temp.fadeOut(200);
		}
		e.preventDefault();
		bg.fadeOut(400);
		});
	bg.click(function (e) {
		console.log("눌러져씀")
		$(this).fadeOut();
		e.preventDefault();
		$('.popwrap').fadeOut(400);
	});
}