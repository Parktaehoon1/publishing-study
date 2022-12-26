function pwcheck(pw, pw_re){
	let result = new Map();
	let check = true;
	let msg = "";
	// 재입력 일치 여부
	if (pw !== pw_re) {
		msg = lang.pwcheck.valid_equal; // 입력한 두 개의 비밀번호가 서로 일치하지 않습니다.
		check = false;
	}

	// 길이
	if(!/^[a-zA-Z0-9!@#$%^&*()?_~]{10,}$/.test(pw))
	{
		msg = lang.pwcheck.valid_length; // 비밀번호는 숫자, 영문, 특수기호 조합으로 10자리 이상을 사용해야 합니다.
		check = false;
	}

	// 영문, 숫자, 특수문자 2종 이상 혼용
	let chk = 0;
	if(pw.search(/[0-9]/g) !== -1 ) chk ++;
	if(pw.search(/[a-z]/ig)  !== -1 ) chk ++;
	if(pw.search(/[A-Z]/ig)  !== -1 ) chk ++;
	if(pw.search(/[!@#$%^&*()?_~]/g)  !== -1  ) chk ++;
	if(chk < 4)
	{
		msg = lang.pwcheck.valid_condition; // 비밀번호는 숫자, 대문자, 소문자, 특수기호 조합으로 입력하셔야 합니다.
		check =  false;
	}

	result.set("msg",msg);
	result.set("result",check);
	return result;
}
