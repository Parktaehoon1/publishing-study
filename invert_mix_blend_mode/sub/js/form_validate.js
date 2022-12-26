function form_validate(datas){

	var state = true;

	for(i=0;i<datas.length;i++){
		var data = datas[i];

		var value = $.trim($('#'+data.id).val());
		$('#'+data.id).val(value);
		var name = data.name;
		
		var rule = data.rule;

		if(typeof rule.required == "undefined" || rule.required == "") {
			if(value.length == 0) { //필수가 아닐때 아무것도 입력되지 않으면 skip , 입력되어 있으면  rule 체크
				continue;
			}
		}else {
			if(value.length == 0) {
				if(typeof data.msg  != "undefined"){
					alert(data.msg);
				}else {
					alert(form_required_msg.replace(/{name}/g,name));
				}

				$('#'+data.id).focus();
				state = false;
				break;
			}			
		}

		if(typeof rule.min_length != "undefined" && rule.min_length != ""){
			if( value.length < rule.min_length ) {
				
				if(typeof data.msg  != "undefined"){
					alert(data.msg);
				}else {
					alert(form_min_length_msg.replace(/{name}/g,name).replace(/{min_length}/g,rule.min_length));
				}
				$('#'+data.id).focus();
				state = false;	
				break;
			}
		}

		if(typeof rule.max_length != "undefined" && rule.max_length != ""){
			if( value.length > rule.max_length ) {
				if(typeof data.msg  != "undefined"){
					alert(data.msg);
				}else {
					alert(form_max_length_msg.replace(/{name}/g,name).replace(/{max_length}/g,rule.max_length));
				}
				$('#'+data.id).focus();
				state = false;
				break;
			}
		}

		if(typeof rule.pattern != "undefined" && rule.pattern != ""){
			
			if(rule.pattern == "number") {
				var regExp = /^[0-9]+$/;
				if(!value.match(regExp)){
					if(typeof data.msg  != "undefined"){
						alert(data.msg);
					}else {
						alert(form_number_msg.replace(/{name}/g,name));
					}
					$('#'+data.id).focus();
					state = false;
					break;
				}
			}

			if(rule.pattern == "positive_number") { //양수
				var regExp = /^[1-9]{1}[0-9]*$/;
				if(!value.match(regExp)){
					if(typeof data.msg  != "undefined"){
						alert(data.msg);
					}else {
						alert(form_positive_number_msg.replace(/{name}/g,name));
					}
					$('#'+data.id).focus();
					state = false;
					break;
				}
			}

			if(rule.pattern == "email") {
				var regExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
				if(!value.match(regExp)){
					if(typeof data.msg  != "undefined"){
						alert(data.msg);
					}else {
						alert(form_email_msg.replace(/{name}/g,name));
					}
					$('#'+data.id).focus();
					state = false;
					break;
				}
			}//
			
			if(rule.pattern == "url") {
				var regExp = /^(https?:\/\/)?((([a-z\d](([a-z\d-]*[a-z\d]))|([ㄱ-힣])*)\.)+(([a-zㄱ-힣]{2,}))|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/;
				if(!value.match(regExp)){
					if(typeof data.msg  != "undefined"){
						alert(data.msg);
					}else {
						alert(form_url_msg.replace(/{name}/g,name));
					}
					$('#'+data.id).focus();
					state = false;
					break;
				}
			}

			if(rule.pattern == "eq") {
				var compare_value = "";
				if(typeof rule.compare_id != "undefined") {
					compare_value = $.trim($('#'+rule.compare_id).val());
				}

				if(typeof rule.compare_value != "undefined") {
					compare_value = rule.compare_value;
				}
				if(value != compare_value) {
					if(typeof data.msg  != "undefined"){
						alert(data.msg);
					}else {
						alert(form_eq_msg.replace(/{name}/g,name));
					}
					$('#'+data.id).focus();
					state = false;
					break;
				}
			}

			if(rule.pattern == "ne") {
				var compare_value = "";
				if(typeof rule.compare_id != "undefined") {
					compare_value = $.trim($('#'+rule.compare_id).val());
				}

				if(typeof rule.compare_value != "undefined") {
					compare_value = rule.compare_value;
				}
				if(value == compare_value) {
					if(typeof data.msg  != "undefined"){
						alert(data.msg);
					}else {
						alert(form_ne_msg.replace(/{name}/g,name));
					}
					$('#'+data.id).focus();
					state = false;
					break;
				}
			}
		}

		if(typeof rule.regexp != "undefined" && rule.regexp != ""){
			if(!value.match(rule.regexp)){
				if(typeof data.msg  != "undefined"){
					alert(data.msg);
				}else {
					alert("형식에 맞지 않는 데이터 입력입니다..");
				}
				$('#'+data.id).focus();
				state = false;
				break;
			}
		}
	}
	return state;

}

function valid_check(data){

	var state = true;

	//for(i=0;i<datas.length;i++){
		//var data = datas[i];

	var value = $.trim($('#'+data.id).val());
	$('#'+data.id).val(value);
	var name = data.name;
	
	var rule = data.rule;

	if(typeof rule.required == "undefined" || rule.required == "") {
		if(value.length == 0) { //필수가 아닐때 아무것도 입력되지 않으면 skip , 입력되어 있으면  rule 체크
			
		}
	}else {
		if(value.length == 0) {
			state = false;
		}			
	}

	if(typeof rule.min_length != "undefined" && rule.min_length != ""){
		if( value.length < rule.min_length ) {
			state = false;	
		}
	}

	if(typeof rule.max_length != "undefined" && rule.max_length != ""){
		if( value.length > rule.max_length ) {
			state = false;
		}
	}

	if(typeof rule.pattern != "undefined" && rule.pattern != ""){
		
		if(rule.pattern == "number") {
			var regExp = /^[0-9]*$/;
			if(!value.match(regExp)){
				state = false;
			}
		}

		if(rule.pattern == "positive_number") { //양수
			var regExp = /^[1-9]{1}[0-9]+$/;
			if(!value.match(regExp)){
				state = false;
			}
		}

		if(rule.pattern == "email") {
			var regExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
			if(!value.match(regExp)){
				state = false;
			}
		}//
		
		if(rule.pattern == "url") {
			var regExp = /^(https?:\/\/)?((([a-z\d](([a-z\d-]*[a-z\d]))|([ㄱ-힣])*)\.)+(([a-zㄱ-힣]{2,}))|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/;
			if(!value.match(regExp)){
				state = false;
			}
		}

		if(rule.pattern == "eq") {
			var compare_value = "";
			if(typeof rule.compare_id != "undefined") {
				compare_value = $.trim($('#'+rule.compare_id).val());
			}

			if(typeof rule.compare_value != "undefined") {
				compare_value = rule.compare_value;
			}

			if(value != compare_value) {
				state = false;
			}
		}
	}

	if(typeof rule.regexp != "undefined" && rule.regexp != ""){
		if(!value.match(rule.regexp)){
			state = false;
		}
	}
	//}
	return state;

}
