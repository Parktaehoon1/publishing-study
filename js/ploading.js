let $loading;

function showLoading(name) {
	console.log("showLoading");
	if(typeof $loading == "undefined") {

		$loading  = $('<div></div>');
		$loading.css({
			"display":"none"
			,"background":"rgba(0,0,0,0.4)"
			,"position":"fixed"
			,"top":"0"
			,"height":"100%"
			,"width":"100%"
			,"z-index":"100"
		});

		$loading.removeClass();
		$loading.addClass(name);

		$('body').append($loading);

		$loader = $('<div></div>');
		$loader.css({
			"position":"absolute"
			,"left":"0"
			,"top":"0" 
			,"z-index":"101"  
		});

		$loading.append($loader);

		$fa = $('<div class="loading">\n' +
				'\t<div class="loader">\n' +
				'\t\t<div class="loadingbox"></div>\n' +
				'\t\t<div id="loading_text">KOONG</div>\n' +
				'\t</div>\n' +
				'</div>');

		$loader.append($fa);
	}else{
		$loading.removeClass();
		$loading.addClass(name);
		$loading.show();
	}
}
function hideLoading() {
	console.log("hideLoading");
	$loading.hide();
}
