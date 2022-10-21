$(document).ready(function () {
  // 탭 메뉴 기능
  let tabMenu = $(".tab-menu button");
  let tabBox = $(".tab-box");

  tabBox.eq(0).show();
  tabMenu.eq(0).addClass("tab-focus");

  $.each(tabMenu, function (index) {
    $(this).click(function () {
      tabBox.hide();
      tabBox.eq(index).show();
      // 포커스 효과 표현
      tabMenu.removeClass("tab-focus");
      $(this).addClass("tab-focus");
    });
  });
});


// timer 기능

// $(document).ready(function () {
//   // 탭 메뉴 기능
//   let tabMenu = $(".tab-menu button");
//   let tabBox = $(".tab-box");
//   // 타이머 기능
//   let tabTimer;
//   let tabSpeed = 1000;
//   let tabStart = 0;
//   let tabTotal = tabMenu.length;
//   // 타이머 생성
//   clearInterval(tabTimer);
//   tabTimer = setInterval(tabChange, tabSpeed);

//   function tabChange() {
//     tabStart++;
//     if (tabStart >= tabTotal) {
//       tabStart = 0;
//     }

//     tabBox.hide();
//     tabBox.eq(tabStart).show();

//     tabMenu.removeClass("tab-focus");
//     tabMenu.eq(tabStart).addClass("tab-focus");
//   }

//   // 탭 영역에 마우스 올리면 타이머 정지
//   let tabWrap = $(".tab-wrap");
//   tabWrap.mouseenter(function () {
//     // 타이머 지우기
//     clearInterval(tabTimer);
//   });

//   tabWrap.mouseleave(function () {
//     // 타이머 생성
//     clearInterval(tabTimer);
//     tabTimer = setInterval(tabChange, tabSpeed);
//   });

//   tabBox.eq(0).show();
//   tabMenu.eq(0).addClass("tab-focus");

//   $.each(tabMenu, function (index) {
//     $(this).click(function () {
//       // 현재 화면 번호 저장
//       tabStart = index;

//       tabBox.hide();
//       tabBox.eq(index).show();
//       // 포커스 효과 표현
//       tabMenu.removeClass("tab-focus");
//       $(this).addClass("tab-focus");
//     });
//   });
// });

// window.onload = function () {};