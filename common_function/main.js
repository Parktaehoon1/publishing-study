// 이번 작업에 사용했던 공통 함수 모음

//popup 레이어
// popup
function pop_up_layer(el) {
  var scroll_top = $(window).scrollTop();
  var class_obj = $("." + el);
  var temp = $("#" + el);
  //var bg = temp.prev().hasClass('bg');   //dimmed 레이어를 감지하기 위한 boolean 변수

  var bg = class_obj.find(".bg");

  if (bg) {
    bg.css("height", $("body").prop("scrollHeight") + "px");
    bg.css("display", "block");

    class_obj.fadeIn(); //'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다.
  } else {
    temp.fadeIn();
  }

  temp.find(".cbtn").click(function (e) {
    if (bg) {
      class_obj.fadeOut(200); //'bg' 클래스가 존재하면 레이어를 사라지게 한다.
    } else {
      temp.fadeOut(200);
    }
    e.preventDefault();
    bg.fadeOut(400);
  });

  bg.click(function () {
    $(this).fadeOut();
    e.preventDefault();
    bg.fadeOut(400);
  });
}

// toast 박스
let removeToast;
// reveal 이라는 클래스 필요
function toast(string) {
  const toast = document.getElementById("toast");
  toast.classList.contains("reveal")
    ? (clearTimeout(removeToast),
      (removeToast = setTimeout(function () {
        document.getElementById("toast").classList.remove("reveal");
      }, 1000)))
    : (removeToast = setTimeout(function () {
        document.getElementById("toast").classList.remove("reveal");
      }, 1000));
  toast.classList.add("reveal"), (toast.innerText = string);
}
