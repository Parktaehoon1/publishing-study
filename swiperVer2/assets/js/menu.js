// Swiper Slider : Visual Ver.2
$(function () {
	console.log("실행되고있음")
  var interleaveOffset = 0.5;

  var mvSlideThumbs = new Swiper(".mvSlide-thumb", {
    slidesPerView: 5,
    spaceBetween: 10,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    observer: true,
    observeParents: true,
    breakpoints: {
      700: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
    },
    grabCursor: true,
    //loop: true,
    //loopAdditionalSlides: 5,
  });

  var swVisual = new Swiper(".sw_visual", {
    speed: 2000,
    autoplay: {
      delay: 4000,
      autoplayDisableOnInteraction: true,
      disableOnInteraction: false,
    },
    // navigation: {
    //   nextEl: ".sw_visual .swiper-button-next",
    //   prevEl: ".sw_visual .swiper-button-prev",
    // },
    // pagination: {
    //   el: ".sw_visual .swiper-pagination",
    //   type: "fraction",
    //   formatFractionCurrent: function (number) {
    //     return ("0" + number).slice(-2);
    //   },
    //   formatFractionTotal: function (number) {
    //     return ("0" + number).slice(-2);
    //   },
    //   renderFraction: function (currentClass, totalClass) {
    //     return (
    //       '<span class="' +
    //       currentClass +
    //       '"></span>' +
    //       ' <span class="bar">/</span> ' +
    //       '<span class="' +
    //       totalClass +
    //       '"></span>'
    //     );
    //   },
    // },
    thumbs: {
      swiper: mvSlideThumbs,
    },
    observer: true,
    observeParents: true,
    watchSlidesProgress: true,
    on: {
      progress: function () {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          var slideProgress = swiper.slides[i].progress;
		  var innerOffset = swiper.width * interleaveOffset;
          var innerTranslate = slideProgress * innerOffset;
          swiper.slides[i].querySelector(".moving").style.transform =
            "translate3d(" + innerTranslate + "px, 0, 0)";
        }
      },
      touchStart: function () {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].style.transition = "";
        }
      },
      setTransition: function (speed) {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].style.transition = speed + "ms";
          swiper.slides[i].querySelector(".moving").style.transition =
            speed + "ms";
        }
      },
      init: function () {
        var slideCon = $(".mvSlide-thumb .swiper-slide .slide-con");
        slideCon.removeClass("on");
        slideCon.eq(0).addClass("on");
      },
      slideChange: function () {
        var slideCon = $(".mvSlide-thumb .swiper-slide .slide-con");
        slideCon.removeClass("on");
        slideCon.eq(this.realIndex).addClass("on");
      },
      resize: function () {
        var swiper = this;
        swiper.on("slideChange", function () {
          swiper.update();
        });
      },
    },
  });

  $(".sw_visual").each(function (elem, target) {
    var swp = target.swiper;
    $(this).hover(
      function () {
        swp.autoplay.stop();
      },
      function () {
        swp.autoplay.start();
      }
    );
  });

  var mv = $(".mvSlide-thumb").innerWidth();
	console.log(mv, 'mv')
	
  var mvSlide = $(".mvSlide-thumb .swiper-slide");
  var mvSlideW = mvSlide.innerWidth();
	console.log(mvSlideW, 'mvSlideW')
	
  var mvImg = $(".mvSlide-thumb .img");	
  console.log(mvImg)
  var mvText = $(".mvSlide-thumb .text-area");

  function mvTextInit() {
    mvSlide.find(mvText).css("width", mv);
    var i;
    for (i = 1; i < mvSlide.length; i++) {
      mvSlide
        .eq([i])
        .find(mvText)
        .css("left", -(mvSlideW + 10) * [i]);
    }
  }
  mvTextInit();

  $(window).on("resize", function () {
    mv = $(".mvSlide-thumb").innerWidth();
    mvSlide = $(".mvSlide-thumb .swiper-slide");
	mvSlideW = mvSlide.innerWidth();
    mvText = $(".mvSlide-thumb .text-area");

    mvTextInit();
  });

  mvSlide.eq(0).css("z-index", "10");
  mvImg.on("click", function () {
    mvSlide.css("z-index", "0");
    if ($(this).parent().hasClass("on")) {
      $(this).parent().parent().css("z-index", "10");
    }
  });
});
