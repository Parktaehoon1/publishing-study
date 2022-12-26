
function slickgrid_cell_validate(id,value,input){
	var value = $.trim(value);
	var data = {};
	
	if(typeof valid_data == "undefined") {
		return {valid: true, msg: null }; 
	}	

	for(var i=0;i<valid_data.length;i++){
		if(valid_data[i].id == id) {
			data = valid_data[i];
			break;
		}
	}

	if(typeof data.id == "undefined"){
		return {valid: true, msg: null }; 
	}
//alert( " id :: " + id + "   value :: "  +value + "  data :: " + JSON.stringify(data));
	var name = data.name;
	var rule = data.rule;
	
	var msg = null;

	if(typeof rule.required == "undefined" || rule.required == "") { 
		if(value.length == 0) { //필수가 아닐때 아무것도 입력되지 않으면 skip , 입력되어 있으면  rule 체크
			return {valid: true, msg: null };
		}
	}else {
		if(value.length == 0) {
			if(typeof data.msg  != "undefined"){
				msg = data.msg;
			}else {
				msg = name + " 를 입력하세요";	
			}
			
			return {valid: false, msg: msg,input:input }; 
		}			
	}

	if(typeof rule.min_length != "undefined" && rule.min_length != ""){
		if( value.length < rule.min_length ) {
			if(typeof data.msg  != "undefined"){
				msg = data.msg;
			}else {
				msg = name + " 의 최소 길이는 " + rule.min_length + " 입니다";
			} 
			return {valid: false, msg: msg,input:input };  
		}
	}

	if(typeof rule.max_length != "undefined" && rule.max_length != ""){
		if( value.length > rule.max_length ) { 
			if(typeof data.msg  != "undefined"){
				msg = data.msg;
			}else {
				msg = name + " 의 최대 길이는 " + rule.max_length + " 입니다";
			}
			return {valid: false, msg: msg,input:input }; 
		}
	}

	if(typeof rule.pattern != "undefined" && rule.pattern != ""){
		
		if(rule.pattern == "number") {
			var regExp = /^[0-9]*$/;
			if(!value.match(regExp)){
				if(typeof data.msg  != "undefined"){
					msg = data.msg;
				}else {
					msg = name + " 은 숫자이어야 합니다.";
				}
				return {valid: false, msg: msg,input:input }; 
			}
		}

		if(rule.pattern == "positive_number") { //양수
			var regExp = /^[1-9]{1}[0-9]*$/;
			if(!value.match(regExp)){
				if(typeof data.msg  != "undefined"){
					msg = data.msg;
				}else {
					msg = name + " 은 양의 숫자이어야 합니다.";
				}
				return {valid: false, msg: msg,input:input }; 
			}
		}

		if(rule.pattern == "email") {
			var regExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
			if(!value.match(regExp)){
				if(typeof data.msg  != "undefined"){
					msg = data.msg;
				}else {
					msg = name + " 은 이메일 형식이어야 합니다.";
				}
				return {valid: false, msg: msg,input:input }; 
			}
		}//
		
		if(rule.pattern == "url") {
			var regExp = /^(https?:\/\/)?((([a-z\d](([a-z\d-]*[a-z\d]))|([ㄱ-힣])*)\.)+(([a-zㄱ-힣]{2,}))|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/;
			if(!value.match(regExp)){
				if(typeof data.msg  != "undefined"){
					msg = data.msg;
				}else {
					msg = name + " 은 인터넷주소 형식이어야 합니다.";
				}
				return {valid: false, msg: msg,input:input }; 
			}
		}
	}

	return {valid: true, msg: null };

}
