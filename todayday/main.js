$(function(){
    $(".popSwiper ul li").each(function(){
        var i, x;
        x = $(".popSwiper ul li");
        btnDayClose = $(".ui-today button");
        btnClose = $(".ui-close button");

        for (i = 0; i < x.length; i++) {
            $(x[i]).attr('id', 'poplist'+[i]).addClass("show");
            $(x[i]).find(".ui-today button").attr('onClick', 'todayClosePop(\'poplist'+[i]+'\')');
            $(x[i]).find(".ui-close button").attr('onClick', 'closePop(\'poplist'+[i]+'\')');
        }
    })
});

// Popup 하루만 닫기
function setCookie(name, value, expiredays) {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);  // 현재시간에 하루를 더함
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}
function todayClosePop(id) {   // 오늘 하루 닫기
    setCookie(id, "done", 1);
    $("#"+id).hide().removeClass("show");
}
function weekClosePop(id) {   // 일주일 닫기
    setCookie(id, "done", 7);
    $("#"+id).hide();
}
function closePop(id) {    // 그냥 닫기
    $("#"+id).hide().removeClass("show");
}


// Popup 실행
$(function () {
    var cookiedata = document.cookie;

    // 메인 팝업
    var i, x;
    x = $(".popSwiper ul li");
    for (i = 0; i < x.length; i++) {
        if (cookiedata.indexOf('poplist'+[i]+'=done') < 0) {
            $("#poplist"+i).show();  // 팝업 사용
            //$("#poplist"+i).hide().removeClass("show");  // 팝업 안사용
        } else {
            $("#poplist"+i).hide().removeClass("show");
        }
    }
});


// Main popup : li 5개 이상 또는 가로 1200 이하에서 swiper 작동
$(function(){
    var popLiShow = $(".popSwiper ul li.show");
    var ww = $(window).width();
    var popSwiper = undefined;

    function count() {
        if (popLiShow.length == 0){
            $(".popup-spot").hide();
        } else if (popLiShow.length == 1){
            $(".pop").addClass("d-none");
        }else if (popLiShow.length == 4){
            $(".popup-spot-in").addClass("count4");
        } else if (popLiShow.length == 5){
            $(".popup-spot-in").addClass("count5");
        }
    }
    count();

    function initSwiper() {
        if (ww < 1200 && popSwiper == undefined || popLiShow.length >= 5 && popSwiper == undefined) {
            popSwiper = new Swiper(".popSwiper", {
                slidesPerView: '1',
                //effect: "fade",
                preventClicks: true,
                preventClicksPropagation: false,
                observer: true,
                observeParents: true,
                navigation: {
                    nextEl: ".swiper-button-next.pop",
                    prevEl: ".swiper-button-prev.pop",
                },
                pagination: {
                    el: ".swiper-pagination.pop",
                    clickable: true,
                },
            });
        } else if (ww >= 1201 && popSwiper != undefined && popLiShow.length < 5) {
            popSwiper.destroy();
            popSwiper = undefined;
        }
    }
    initSwiper();

    $(window).on('resize', function () {
        ww = $(window).width();
        initSwiper();
    });
});

let popInnerSwiper = new Swiper(".popInnerSwiper", {
    speed: 1000,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    loop: true,
})

// Main popup : li 삭제시 dot 같이 삭제
$(function(){
    $(".ui-today button, .ui-close button").on("click", function(){
        $(this).parents("li").remove();
        //swiper.update();

        if ($(".popSwiper ul li.show").length == 0){
            $(".popup-spot").hide();
        }
    });
});