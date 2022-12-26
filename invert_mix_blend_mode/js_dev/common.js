function change_comma(obj) { //대신 Number(123456.123).toLocaleString() 을 이용하는것을 권장.(소숫점 뒷자리 필요하면 그때 생각하는걸로)

	if ( obj.endsWith(".") )
	{
		obj = obj.replace(".", "");
	}
	//obj = "" + Number(obj).toFixed(8);
	//	obj = new BigDecimal(obj).toString();

	var regx = new RegExp(/(-?\d+)(\d{3})/);
	var bExists = obj.indexOf(".", 0);//0번째부터 .을 찾는다.
	var strArr = obj.split('.');
	while (regx.test(strArr[0])) {//문자열에 정규식 특수문자가 포함되어 있는지 체크
		//정수 부분에만 콤마 달기
		strArr[0] = strArr[0].replace(regx, "$1,$2");//콤마추가하기
	}
	if (bExists > -1) {
		//. 소수점 문자열이 발견되지 않을 경우 -1 반환
		obj = strArr[0] + "." + strArr[1];
	} else { //정수만 있을경우 //소수점 문자열 존재하면 양수 반환
		obj = strArr[0];
	}


	return obj;//문자열 반환
}

function getTimeString(timestamp){
	var date = new Date(timestamp);

	var year = date.getFullYear();
	var month = (date.getMonth() +1);
	var day = date.getDate();

	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();

	return formateTime(year, month, day, hour, minute, second);
}

function formateTime(year, month, day, hour, minute, second){
	return makeDoubleDigit(year) + "." +
		makeDoubleDigit(month) + "." +
		makeDoubleDigit(day) + " " +
		makeDoubleDigit(hour) + ":" +
		makeDoubleDigit(minute) + ":" +
		makeDoubleDigit(second);
}

function makeDoubleDigit(x){
	return (x < 10) ? "0" + x : x;
}

class BigDecimal {
	// Configuration: constants
	static DECIMALS = 8; // number of decimals on all instances
	static ROUNDED = true; // numbers are truncated (false) or rounded (true)
	static SHIFT = BigInt("1" + "0".repeat(BigDecimal.DECIMALS)); // derived constant
	constructor(value) {
		if (value instanceof BigDecimal) return value;
		let [ints, decis] = String(value).split(".").concat("");
		this._n = BigInt(ints + decis.padEnd(BigDecimal.DECIMALS, "0")
				.slice(0, BigDecimal.DECIMALS))
			+ BigInt(BigDecimal.ROUNDED && decis[BigDecimal.DECIMALS] >= "5");
	}
	static fromBigInt(bigint) {
		return Object.assign(Object.create(BigDecimal.prototype), { _n: bigint });
	}
	add(num) {
		return BigDecimal.fromBigInt(this._n + new BigDecimal(num)._n);
	}
	subtract(num) {
		return BigDecimal.fromBigInt(this._n - new BigDecimal(num)._n);
	}
	static _divRound(dividend, divisor) {
		return BigDecimal.fromBigInt(dividend / divisor
			+ (BigDecimal.ROUNDED ? dividend  * 2n / divisor % 2n : 0n));
	}
	multiply(num) {
		return BigDecimal._divRound(this._n * new BigDecimal(num)._n, BigDecimal.SHIFT);
	}
	divide(num) {
		return BigDecimal._divRound(this._n * BigDecimal.SHIFT, new BigDecimal(num)._n);
	}
	toString() {
		const s = this._n.toString().padStart(BigDecimal.DECIMALS+1, "0");
		return s.slice(0, -BigDecimal.DECIMALS) + "." + s.slice(-BigDecimal.DECIMALS)
			.replace(/\.?0+$/, "");
	}
}


//  tab
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
