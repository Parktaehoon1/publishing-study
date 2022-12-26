
var $loading;

function showLoading() {
	console.log("show loading!");
	if(typeof $loading == "undefined") {

		$loading  = $('<div><div/>');
		$loading.css({
			"display":"none"
			,"background":"rgba(0,0,0,0.8)"
			,"position":"fixed"
			,"top":"0"
			,"height":"100%"
			,"width":"100%"
			,"z-index":"100000"
		});

		$('body').append($loading);

		$loader  = $('<div><div/>');
		$loader.css({
			"position":"absolute"
			,"left":"50%"
			,"top":"50%"
			,"z-index":"1"
			,"color":"#fff"
			,"font-size":"50px"
			,"margin-left":"-47px"
			,"margin-top":"-47px"
		});


		$loading.append($loader);

		$fa = $('<i class="fa fa-spinner fa-pulse fa-lg fa-fw"></i>');

		$loader.append($fa);
	}

	$loading.show();

}

/*
<style>
.loading {display:none; background: rgba(0,0,0,0.8); position:fixed; top:0; height:100%; width:100%; z-index: 11;}

.loader {
	position: absolute; left: 50%; top: 50%; z-index: 1;color:#fff;font-size:50px

}

</style>

<div class="loading">
<div class="loader">
	<i class="fa fa-spinner fa-pulse fa-lg fa-fw"></i>
</div>
</div>

*/

function hideLoading() {
	console.log("hide loading!");
	$loading.hide();
}

