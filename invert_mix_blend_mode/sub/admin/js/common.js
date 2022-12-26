function isMobile() {
	var filter = "win16|win32|win64|mac";
	if(navigator.platform){
		if(0 > filter.indexOf(navigator.platform.toLowerCase())){
			return true;
		}else{
			return false;
		}
	}
}

function removeTag(str) {
	return str.replace(/(<([^>]+)>)/gi, "");
}

function fn_addComma(value) {
	if(value !=null) {
		var regExp = new RegExp('(-?[0-9]+)([0-9]{3})');
		var strValue = String(value);
		while(regExp.test(strValue)) {
			strValue = strValue.replace(regExp, '$1,$2');
		}
		
		return ((!strValue || 0 === strValue.length) && (!strValue || /^\s*$/.test(strValue))) ? '0' : strValue;
	} else {
		return value;
	}
}


function is_match2(str,pattern){
	if(pattern == "number") {
		var regExp = /^[0-9]*$/;
	}

	if(pattern == "positive_number") { //양수
		var regExp = /^[1-9]{1}[0-9]+$/;
	}

	if(pattern == "email") {
		var regExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
	}
	
	if(pattern == "url") {
		var regExp = /^(https?:\/\/)?((([a-z\d](([a-z\d-]*[a-z\d]))|([ㄱ-힣])*)\.)+(([a-zㄱ-힣]{2,}))|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/;
	}

	return str.match(regExp);
}

function compareObjects(o1, o2){
    for(var p in o1){
        if(o1.hasOwnProperty(p)){
            if(o1[p] !== o2[p]){
                return false;
            }
        }
    }
    for(var p in o2){
        if(o2.hasOwnProperty(p)){
            if(o1[p] !== o2[p]){
                return false;
            }
        }
    }
    return true;
};


function getDateYmd(param = null, $bool = null){

	if(param != null){
		var d = new Date();

		if($bool == '+'){
		d.setDate(d.getDate() + param);
		}
		else{
		d.setDate(d.getDate() - param);
		}
	}
	else{
		var d = new Date();
	}

	var year = d.getFullYear();
	var month = '' +  (d.getMonth() + 1);
	var day = '' + d.getDate();

	if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;


	return year+"-"+month+"-"+day;

}

function lpad(s, padLength, padString){
 
    while(s.length < padLength)
        s = padString + s;
    return s;
}
 
function rpad(s, padLength, padString){
    while(s.length < padLength)
        s += padString;
    return s;
}
