/*사용법
1. 하단 initPage 스크립트 본문 ready에서 호출 필요
2. pagination 양식은 다음과 같을것
<div class="page">
	<ul>
	</ul>
</div>
3. tab 전환시에는 setTransaction을 새로 호출할것
4. init 및 setTransaction시 아래와 같은 map 파라미터가 필요함
var data = {
			page : (int),
			tab : (string),
			pagingLimit : (int),
			url : (string)
		};
*/


function initPage(data) {
	if (document.location.hash) {
		var hash = get_hash();
		setTransaction(hash);
	} else {
//		data {
//			page
//			tab
//			pagingLimit
//			url
//		}
		set_hash(data);
	}

	$(window).on('hashchange', function() {
		console.log("#### hash changed ####");
		var hash = get_hash();
		setTransaction(hash);
	});
}

function get_hash() {
	var hashData = decode_hash(document.location.hash.replace('#', ''));

	return hashData;
}

function set_hash(option) {//page, tab, pagingLimit, url
	// var data = {
	// 	page : option['page'],
	// 	tab : option['tab'],
	// 	pagingLimit : option['pagingLimit'],
	// 	url : option['url']
	// };
	var hash = encode_hash(option)
	document.location.hash = hash;
	return hash;
}

function encode_hash(data) {
	var jsonString = JSON.stringify(data);

	return btoa(encodeURIComponent(jsonString));
}

function decode_hash(data) {
	var jsonString = decodeURIComponent(atob(data));

	return JSON.parse(jsonString);
}

function setTransaction(hashData){
	var data = {
		page : hashData['page'],
		limit: hashData['pagingLimit']
	}

	ajax(hashData['url'],data
		,function(req){
		console.log(req);
			// setPagination(req.result);
			setTable(req.result, hashData);
			setPagination(req.result, hashData);
		} ,function(req){
			location.href = '/';
		}
	);
}

function setPagination(req, hashData) {
	var page = "";

	if(req.length > 0){

		page += '<li class="start"><a><span>처음</span> </a></li>';
		page += '<li class="pre"><a><span>이전</span> </a></li>';

		var max = Math.ceil((req[0].count) / parseInt(hashData['pagingLimit'])); //소수점 올림
		if ( max == 0 ){
			max = 1;
		}

		var startIndex = parseInt(hashData['page']) < 3 ? 1 : parseInt(hashData['page']) - 2;
		if( parseInt(hashData['page']) + 3 > max ){
			startIndex = max - 4;
		}

		if ( startIndex < 1 ){
			startIndex = 1;
		}
		for(var i = startIndex; i <= max && i < startIndex + 5 ; i++){
			if ( i === parseInt(hashData['page']) ){
				page += '<li><a class="on">'+(i)+'</a></li>';
			}
			else{
				page += '<li><a>'+(i)+'</a></li>';
			}
		}

		page += '<li class="next"><a><span>다음</span> </a></li>';
		page += '<li class="end"><a><span>마지막</span> </a></li>';
		$('.page > ul').children().remove();
		$('.page > ul').append(page);

		set_hash(hashData);

		$('.page > ul a').click(function(){

			console.log( $(this).find('span').text());

			if($('.page > ul').find('.on').text() === $(this).text()){
				return;
			}
			else if($('.page > ul').find('.on').text() == '1'
				&& $(this).find('span').text() == '처음'){
				return;
			}
			else if($('.page > ul').find('.on').text() == '1'
				&& $(this).find('span').text() == '이전'){
				return;
			}
			else if($('.page > ul').find('.on').text() == max
				&& $(this).find('span').text() == '다음'){
				console.log('다음조건');
				return;
			}
			else if($('.page > ul').find('.on').text() == max
				&& $(this).find('span').text() == '마지막'){
				console.log('마지막조건');
				return;
			}

			var removeFlag = true;

			var clickedBtn = $(this).text().trim();

			if( clickedBtn === "처음" ){
				page = 1;
				if(parseInt(hashData['page']) === 1){
					removeFlag = false;
				}
			}
			else if( clickedBtn === "이전" ){
				page = parseInt(hashData['page'])-1;
				if( page < 1 ){
					page = 1;
					removeFlag = false;
				}
			}
			else if(clickedBtn === "다음"){
				page = hashData['page'] + 1;
				if (page > max){
					page = max;
					removeFlag = false;
				}
			}
			else if(clickedBtn === "마지막"){
				page = max;
				if(parseInt(hashData['page']) === max){
					removeFlag = false;
				}
			} else {
				page = clickedBtn;
			}

			if(hashData['page'] === clickedBtn){
				removeFlag = false;
			}

			if(removeFlag){
				$('.page > ul a').removeClass('on');
			}

			// $('.page > ul').find('.page-area > a').addClass('on');

			hashData['page'] = page
			set_hash(hashData);
		})

	}
}

//
// function setTable(req) {
// 	console.log(req);
// 	$('.token_row').remove();
// 	if(req.length>0){
// 		var items = "";
// 		$('.nodata1').css("display","none");
// 		$.each(req,function(idx,value){
// 			var obj = ""
// 				+"<ul>"
// 				+"	<li class='coin'><em class='stit'>Coin</em><span>ADC</span></li>"
// 				+"	<li class='txid'><em class='stit'>TXID</em><a href=''>0c7290b75f84d8d7a190c7290b75f84d8d7a190c7290b75f84d8d7a19</a></li>"
// 				+"	<li class='block'><em class='stit'>Block</em><span>668990</span></li>"
// 				+"	<li class='type'><em class='stit'>Type</em><span>Transfer</span></li>"
// 				+"	<li class='from'><em class='stit'>FROM</em><a href=''>0b75f84d8d7a190c7290b75f84d8d7a190c7290b75f84d8d7a1</a></li>"
// 				+"	<li class='to'><em class='stit'>To</em><a href=''>880b75f84d8d7a190c7290b75f84d8d7a190c7290b75f84d8d7a1</a></li>"
// 				+"	<li class='amount'><em class='stit'>Amount</em><span>100.000000</span></li>"
// 				+"	<li class='age'><em class='stit'>Age</em><span>13 minutes ago</span></li>"
// 				+"</ul>";
// 		});
// 	}
// 	$('.boardList.myTrans').append(items);
// }
