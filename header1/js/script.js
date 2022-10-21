window.onload = function(){

  // 메뉴기능
  let mainMenu = $('.mainmenu > li > a');
  let subMenu = $('.sub-menu');
  let header =$('.header');

  // 아래 방식도 좋다. 하지만, html 이 추가되면
  // 높이가 변하므로 코드를 수정해야 한다.
  // 각각의 서브메뉴 높이를 숫치로 적어서 완료
  let subMenuH = [363, 147, 147, 291, 147];

  // outerHeight 를 이용해서 높이를 받아올 수 있도록
  let subMenuHArr = [];
  $.each(subMenu, function(index, item){
    // index 는 순서값(0,1,2....)
    // item 은 html 요소 (<div .submenu></div>)
    subMenuHArr[index] = $(this).outerHeight();
  });

  // 서브메뉴가 사라지는 timer 저장
  let subHideTimer;
  let submenuWrap = $('.submenu-wrap');
  let gnbBg = $('.gnb-bg');
  
  // 롤오버 기능
  $.each(mainMenu, function(index, item) {
    // index 는 순서값(0,1,2....)
    // item 은 html 요소 (<a></a>)
    $(this).mouseenter(function(){      
      clearTimeout(subHideTimer);
      // 높이가 얼마지? subMenuHArr[0, 1 .....]
      let temp = subMenuHArr[index];
      // 145 는 header 의 높이값
      //  temp + 145 : 서브메뉴의 높이값
      // header.css('height', temp + 145);
      // gnbBg.css('height', temp + 145);
      
      // header.stop().animate({
      //   height: temp + 145
      // }, 150);

      // gnbBg.stop().animate({
      //   height: temp + 145
      // }, 200);

      gsap.to( header, 0.15, { height: temp + 145 });
      gsap.to( gnbBg, 0.2, { height: temp + 145 });

      // index : 어떤 번호가 선택되었는지를 알 수 있다.
      showSubmenu(index);
    });

    $(this).mouseleave(function(){
      // 즉시 사라지면 안된다.
      // 약간만 판단할 시간이 필요하다.
      // 서브메뉴로 마우스가 이동했는지 아닌지 판단할 필요
      subHideTimer = setTimeout(function(){
          // 145 는 header 의 높이값으로 돌아간다.
          header.css('height', 145);          
          gnbBg.css('height', 0);
      }, 100);     
    });
  });

  submenuWrap.mouseenter(function(){
    clearTimeout(subHideTimer);
  });
  submenuWrap.mouseleave(function(){
    subHideTimer = setTimeout(function(){
        // 145 는 header 의 높이값으로 돌아간다.
        header.css('height', 145);         
        gnbBg.css('height', 0);
    }, 100);   
  });

  // 서브메뉴 보여주는 코드
  function showSubmenu(_index) {
    subMenu.hide();
    subMenu.eq(_index).show();
  }

}