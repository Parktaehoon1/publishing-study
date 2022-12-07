$(function(){

$.datepicker.setDefaults({
  closeText: "닫기",
  prevText: "이전달",
  nextText: "다음달",
  currentText: "오늘",
  monthNames: ["1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월"
  ],
  monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월"
  ],
  dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
  dayNamesShort: ["S", "M", "T", "W", "T", "F", "S"],
  dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
  weekHeader: "주",
  dateFormat: "yy-mm-dd", // 날짜형태 예)yy년 m월 d일
  firstDay: 0,
  isRTL: false,
  showMonthAfterYear: true,
  yearSuffix: "년"
})
//calendar
$(".datepicker").datepicker({
  showOn:"both",
  buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif",
  buttonImageOnly: true
})
});
