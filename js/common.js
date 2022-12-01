document.oncontextmenu = function(){return false;}

function topmenubg() {
	if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
		document.getElementById("header").className = "topbg";
	} else {
		document.getElementById("header").className = "";
	}
}

function pop_up_layer(el) {
	var scroll_top = $(window).scrollTop();
	var class_obj = $('#' + el);
	var temp = $('#' + el);
	//var bg = temp.prev().hasClass('bg');   //dimmed 레이어를 감지하기 위한 boolean 변수

	class_obj.find('.key').val('');

	var bg = class_obj.find('.bg');
    $('html').css('overflow', 'hidden'); 
	$('html').css('position', 'sticky');
	$('html').css('touch-action', 'none');

	if (bg) {
		bg.css('height', $('body').prop('scrollHeight') + 'px'); 
		bg.css('display', 'block');
		class_obj.fadeIn();   //'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다.
	} else {
		temp.fadeIn();
	}

	temp.find('.cbtn').click(function (e) {
		if (bg) {
			class_obj.fadeOut(200); //'bg' 클래스가 존재하면 레이어를 사라지게 한다.
		} else {
			temp.fadeOut(200);
		}
		e.preventDefault();
		bg.fadeOut(400);
		$('html').css('position', 'relative');
		$('html').css('touch-action', '');
	});

	bg.click(function (e) {
		$(this).fadeOut();
		e.preventDefault();
		bg.fadeOut(400);
		$('html').css('position', 'relative');
       	$('html').css('touch-action', '');
	});
}

function pop_up_all_close() {
	$('.popwrap').fadeOut(200);
	$('html').css('position', 'relative');
    $('html').css('touch-action', '');
}

function maxLengthCheck(object) {
	if (object.value.length > object.maxLength) {
		object.value = object.value.slice(0, object.maxLength);
	}
}

function maxTextAreaLengthCheck(object, length) {
	$(object).parent().siblings('.cttxt').text(`${object.value.length}/${length}`);

	if (object.value.length > object.maxLength) {
		object.value = object.value.slice(0, object.maxLength);
	}
}

function fileCheck(FileList) {
	let maxSize = 100 * 1024 * 1024;
	let fileSize = FileList[0].size;

	if (FileList.length > 1) {
		alert('하나의 파일만 등록 가능합니다.');
		return true;
	}

	if (fileSize > maxSize) {
		alert("첨부파일 사이즈는 100MB 이내로 등록 가능합니다.");
		return true;
	}
}

function setLang(value) {
	switch (value) {
		case 'en':
			$.cookie('lang', 'english', {path: '/'})
			location.reload();
			break;
		case 'ko':
			$.cookie('lang', 'korean', {path: '/'})
			location.reload();
			break;
		case 'jp':
			$.cookie('lang', 'japanes', {path: '/'})
			location.reload();
			break;
	}
}

function checkWallet(url) {
	_cmn.ajax.exec({
		url: '/api/user/check_has_wallet',
		success: function (res) {
			if (res.status === 'success') {
				if (res.result.status === 'need_signin') {
					pop_up_layer('pop_login');
				} else if (res.result.status === 'has_wallet') {
					if(url === 'pop_myWallet'){
						let address = res.result.address;
						let balance = res.result.balance;

						$('#pop_myWallet #qrimg').empty();

						new QRCode($('#pop_myWallet #qrimg')[0], {
							text: address,
							colorDark: "#000000",
							colorLight: "#ffffff",
							correctLevel: QRCode.CorrectLevel.H
						});

						$('#pop_myWallet #address').text(address);
						$('#pop_myWallet #balance').text(balance);

						pop_up_layer('pop_myWallet');

					}else{
						window.location = url;
					}
				} else if (res.result.status === 'no_wallet') {
					$('#pop_wallet_account .pw').val('');
					$('#pop_wallet_account #divide').val('create');
					pop_up_layer('pop_wallet_account');
				}
			} else {
				window.location = '/';
			}
		}
	});
}

function checkWalletStep1() {
	let pw = $('#pop_wallet_account .pw').val();

	$('#pop_wallet_account .error_txt').css('display','none');

	if(pw === ''){
		$('#pop_wallet_account .pw').addClass('error_input');
		$('#pop_wallet_account .change_pw_empty_pw').css('display','block');
	}else if(!_cmn.regex.password.test(pw)){
		$('#pop_wallet_account .pw').addClass('error_input');
		$('#pop_wallet_account .pw_regex_different').css('display','block');
	}else{
		_cmn.ajax.exec({
			url: '/api/user/check_pw',
			data: {
				'pw' : pw,
			},
			success: function (res) {
				if(res.status === 'success'){
					$('#pop_wallet_account .pw').removeClass('error_input');
					$('#pop_enter_walletPw .password_num input').removeClass('on');
					pop_up_layer('pop_enter_walletPw');
				}else{
					$('#pop_wallet_account .pw').removeClass('error_input');
					show_popup(res.msg.title, res.msg.detail);
				}
			}
		});
	}
}

// window.onstorage = function (event) {
// 	if (event.key === 'detect' && event.newValue !== null) {
// 		let detect = JSON.parse(localStorage.getItem('detect'));
// 		openPlayer(detect.type, detect.idx);
// 	}
// };

function openPlayer(type, idx){
	if(type === '' && type === undefined){
		return false;
	}
	if(idx === '' && idx === undefined){
		return false;
	}

	_cmn.ajax.exec({
		url: '/api/playList/get_player_music_list',
		data: {
			'type' : type,
			'idx': idx,
		},
		success: function (res) {
			openPlayer2(res.result);
		}
	});
}

// function checkStorage(){
// 	return localStorage.getItem('player_on') === 'A';
// }

function openPlayer2(list){
	// localStorage.setItem("player_on", "R");

	let pageWidth  = document.documentElement.scrollWidth;
	let url = "/player";
	let name = "player";
	let option;

	if(pageWidth < 900){
		option = "width = 100%, height = 100%, top = 0, left = 10, location = no, menubar = no, toolbar = no, status = no, resizable = no";
	}else{
		option = "width = 840, height = 680, top = 0, left = 10, location = no, menubar = no, toolbar = no, status = no, resizable = no";
	}

	let popup = window.open(url, name, option);

	if (popup) {
		setlocalStorage(list);
	}

	// setTimeout(function(){
	// 	if(checkStorage()){
	// 		setlocalStorage(list);
	// 	} else {
	// 		let pageWidth  = document.documentElement.scrollWidth;
	// 		let url = "/player";
	// 		let name = "player";
	// 		let option;
	//
	// 		if(pageWidth < 900){
	// 			option = "width = 100%, height = 100%, top = 0, left = 10, location = no, menubar = no, toolbar = no, status = no, resizable = no";
	// 		}else{
	// 			option = "width = 840, height = 680, top = 0, left = 10, location = no, menubar = no, toolbar = no, status = no, resizable = no";
	// 		}
	//
	// 		let popup = window.open(url, name, option);
	//
	// 		if (popup) {
	// 			popup.onload = function () {
	// 				setlocalStorage(list);
	// 			}
	// 		}
	// 	}
	// }, 1000);
}

function setlocalStorage(list){
	let trackMeta = JSON.parse(localStorage.getItem('trackMeta'));

	if (trackMeta === null || trackMeta === '' ||
		trackMeta === undefined || trackMeta.length === 0) {
		localStorage.setItem('trackMeta', JSON.stringify(list));
		localStorage.setItem('now_music', '0');
	} else {
		localStorage.setItem('now_music', String(trackMeta.length));

		list.forEach(function (data) {
			trackMeta.push(data);
		});

		localStorage.setItem('trackMeta', JSON.stringify(trackMeta));
	}
}

function checkLogin(callback){
	_cmn.ajax.exec({
		url: '/api/common/checkLoginAPI',
		success: function (res) {
			if(res.status === 'success'){
				callback();
			}else{
				show_popup(res.msg.title, res.msg.detail, function () {
					pop_up_layer('pop_login');
				});
			}
		}
	});
}

function openAlram(){
	checkLogin(function () {

	});
}

function logout() {
	_cmn.ajax.exec({
		url: '/api/user/logout',
		success: function () {
			if(localStorage.getItem('player_on') === 'A'){
				let pageWidth  = document.documentElement.scrollWidth;
				let url = "/player";
				let name = "player";
				let option;

				if(pageWidth < 900){
					option = "width = 100%, height = 100%, top = 0, left = 10, location = no, menubar = no, toolbar = no, status = no, resizable = no";
				}else{
					option = "width = 840, height = 680, top = 0, left = 10, location = no, menubar = no, toolbar = no, status = no, resizable = no";
				}

				window.open(url, name, option);
			}
			window.location.reload();
		}
	});
}

function numberWithCommas(n) {
	let parts = n.toString().split(".");
	return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
}

function get_user_info(){
	_cmn.ajax.exec({
		url: '/api/myPage/get_user_info',
		success: function (res) {
			let result = res.result;
			if(res.status === 'success'){
				$('#pop_my_information #img_path').attr('src',result.user_info.profile_img_path_resize);
				$('#pop_my_information #nickname').text(result.user_info.nickname);
				$('#pop_my_information #email').text(result.user_info.email);
			}else{
				show_popup(res.msg.msg1, res.msg.msg2)
			}
		}
	});
}

// Search Trigger
jQuery(document).ready(function ($) {
	$('.searchbtn').click(function (e) {
		e.preventDefault();
		$('.searchbtn').fadeOut(300);
		$('#nav .inside nav .menu li a').fadeOut(300);
		$('.searchwrap').addClass('visible1');
		$('.searchwrap input').focus();
	});
	$('.search_close').click(function (e) {
		e.preventDefault();
		$('.searchbtn').fadeIn(300);
		$('.searchwrap').removeClass('visible1');
		$('#nav .inside nav .menu li a').fadeIn(300);
	});

	$('.marketwrap .btn_filter').click(function (e) {
		e.preventDefault();
		$('.marketwrap .leftwrap').addClass('fadein');
		$('.asidemenu .atbtn_filter ').fadeIn(300);
	});
	$('.marketwrap  .btn_filter_close').click(function (e) {
		$('.marketwrap .leftwrap').removeClass('fadein');
		$('.marketwrap .asidemenu .atbtn_filter ').fadeOut(300);
	});

	$('footer .btn_info_open').click(function (e) {
		e.preventDefault();
		$('footer .btn_info_open').fadeOut(300);
		$('footer .btn_info_close').addClass('on');
		$('footer .finfo').addClass('on');
	});
	$('footer .btn_info_close').click(function (e) {
		$('footer .btn_info_open').fadeIn(300);
		$('footer .btn_info_close').removeClass('on');
		$('footer .btn_info_open').addClass('on');
		$('footer .finfo').removeClass('on');
	});

	$("#cbx_chkAll").click(function () {
		//클릭되었으면
		if ($("#cbx_chkAll").prop("checked")) {
			//input태그의 name이 chk인 태그들을 찾아서 checked옵션을 true로 정의
			$("input[name=chk]").prop("checked", true);
			//클릭이 안되있으면
		} else {
			//input태그의 name이 chk인 태그들을 찾아서 checked옵션을 false로 정의
			$("input[name=chk]").prop("checked", false);
		}
	});

	$('.select_tsmeu').on('change',function () {
		setLang($('.select_tsmeu option:selected').val());
	});

	$(".key").on("keyup", function (event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			$(".checkKey").triggerHandler("click");
		} else {
			if (this.value) {
				$(this).next().css("display", "inline-block");
			} else {
				$(this).next().hide();
			}
		}
	}).focus();

	$(".keyShow").on("click", function () {
		if ($(this).prev().attr("type") === "password") {
			$(this).prev().attr("type", "text");
			// $($(this)).text("<span>H I D E</span>");
			$($(this)).addClass('view');
		} else {
			$(this).prev().attr("type", "password");
			// $($(this)).text("SHOW");
			$($(this)).removeClass('view');
		}
	});

	$('.searchinput').on("keypress", function (key) {
		if (key.code === 'Enter' || key.code === 'NumpadEnter') {
			if($('.searchinput').val() !== ''){
				window.location='/search/?keyword='+$('.searchinput').val();
			}
		}
	});

	$('.searchinput1').on("keypress", function (key) {
		if (key.code === 'Enter' || key.code === 'NumpadEnter') {
			$(".search_btn").trigger("click");
		}
	});

	$('.searchclear').toggle(Boolean($('.searchinput').val()));
	$('.searchclear').click(function () {
		$(".searchinput").val('').focus();
		$(this).hide();
	});

	$('.searchinput1').keyup(function () {
		$(".searchclear1").toggle(Boolean($(this).val()));
	});

	$('#searchclear1').toggle(Boolean($('.searchinput1').val()));
	$('#searchclear1').click(function () {
		$(".searchinput1").val('').focus();
		$(this).hide();
	});
});

// menu scroll bg
window.onscroll = function () {
	topmenubg()
};


