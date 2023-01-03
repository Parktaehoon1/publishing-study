$.datepicker.setDefaults({
	dateFormat: 'yy-mm-dd',

	prevText: '이전 달',
	nextText: '다음 달',
	currentText: 'TODAY',
	monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
	monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
	dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
	dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
	dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
	weekHeader: '주',
	firstDay: 0,
	isRTL: false,
	showButtonPanel: true,
	showMonthAfterYear: true,
	yearSuffix: '년',
	closeText: '<span>x</span>',
	onClose: function (dateText, inst) {
		if ($(window.event.srcElement).hasClass('ui-datepicker-close')) {
			document.getElementById(this.id).value = '';
		}
	}

});


$(function () {
	$(".calendar").datepicker({
		showOn: "button",
		buttonImage: "/assets/admin/img/com/icon_calendar.svg",
		buttonImageOnly: false,
		buttonText: "Select date"
	});


});


$(function () {
	$("#date").datepicker();
});
