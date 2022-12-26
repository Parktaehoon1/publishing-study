$(document).ready(function(){
	$.ajax({
		url: '/api/Recaptcha/getSiteKey',
		type: 'POST',
		method: 'POST',
		async: false,
		success: function (req) {
			// console.log(req);
			site_key = req;
		}
	});
});

var site_key = null;
var old_v = "";
function recaptchaValidate(){
	var v = grecaptcha.getResponse();

	var result = false;
	if(v.length > 0) {

		if(old_v === v) {
			return true;
		}
		// 진행중
		$.ajax({
			url : '/api/Recaptcha/recaptcha_validate',
			type : 'POST',
			method : 'POST',
			dataType : 'JSON',
			async : false,
			data : {
				response : grecaptcha.getResponse//,
				// "<?=$this->security->get_csrf_token_name();?>" : $('#csrf_token').val()
			},
			success:function(req){
				// $('#csrf_token').val(req.token);
				// var json_req = JSON.parse(req);
				// console.log(json_req);
				if(req.success === true){
					old_v = v;
					result =  true;
				}
			},
			error:function(request,status,error){
				console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
	} else {

	}
	return result;
}

function recaptcha_onload(){
	grecaptcha.render('g-recaptcha', {
		'sitekey' : site_key
		//'size' : 'compact'
	});
}
