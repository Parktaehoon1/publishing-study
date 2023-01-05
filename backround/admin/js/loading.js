let $loading;

function showLoading() {
	console.log("showLoading");
	if(typeof $loading == "undefined") {

		$loading  = $('<div></div>');
		$loading.css({
			"display":"none"
			,"background":"rgba(0,0,0,0.4)"
			,"position":"fixed"
			,"top":"0"
            ,"left":"0"
			,"height":"100%"
			,"width":"100%"
			,"z-index":"10000"
		});

		$('body').append($loading);

		$loader  = $('<div></div>');
		$loader.css({
			"position":"absolute"
			,"left":"0"
			,"top":"0" 
			,"z-index":"10001"  
		});

		$loading.append($loader);

		$fa = $('<div class="loading">\n' +
				'\t<div class="loader">\n' +
				'\t\t<div class="loadingbox"></div>\n' +
				'\t\t<div id="loading_text">KOONG</div>\n' +
				'\t</div>\n' +
				'</div>');

		$loader.append($fa);
	}
	$loading.show();
}
function hideLoading() {
	console.log("hideLoading");
	$loading.hide();
}
