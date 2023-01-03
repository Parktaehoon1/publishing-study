"use strict";

// Swiper Slider : N'PLANET Info Banner
var swiper3 = new Swiper(".npInfoSwiper", {
  effect: "fade",
  navigation: {
    nextEl: ".swiper-button-next.npInfo",
    prevEl: ".swiper-button-prev.npInfo",
  },
  pagination: {
    el: ".swiper-pagination.npInfo",
    type: "fraction",
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});
$(".swiper-play, .swiper-pause").click(function () {
  if ($(".swiper-pause").hasClass("on")) {
    $(".swiper-pause").removeClass("on");
    $(".swiper-play").addClass("on");
  } else {
    $(".swiper-pause").addClass("on");
    $(".swiper-play").removeClass("on");
  }
});
$(".swiper-play").click(function () {
  swiper3.autoplay.start();
  return false;
});
$(".swiper-pause").click(function () {
  swiper3.autoplay.stop();
  return false;
});

// Swiper Slider : EDITOR�셎 PICK
var swiper1 = new Swiper(".pickSwiper", {
  slidesPerView: 4,
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next.pick",
    prevEl: ".swiper-button-prev.pick",
  },
  breakpoints: {
    1500: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    991: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    700: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    420: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
  },
});

// Swiper Slider : �멸린 N�셆LANET �묓뭹
var swiper2 = new Swiper(".popularSwiper", {
  slidesPerView: 4,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination.popular",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next.popular",
    prevEl: ".swiper-button-prev.popular",
  },
  breakpoints: {
    1550: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    991: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    700: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    420: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
  },
});

$(function () {
  // Follow button
  $(".edt-pick-con .btn-follow").click(function () {
    const followThis = $(this);

    followThis.toggleClass("on");

    if (followThis.hasClass("on")) {
      $(this).text("Following");

      $(this).hover(
        function () {
          $(this).text("unfollow");
        },
        function () {
          $(this).text("Following");
        }
      );
    } else {
      $(this).text("Follow");

      $(this).hover(
        function () {
          $(this).text("Follow");
        },
        function () {
          $(this).text("Follow");
        }
      );
    }
  });

  // list 寃���
  $(".btn-search-nplanet").click(function () {
    $(".search-area").addClass("on");
  });
});

//寃��� 李얠븘 �ㅽ겕濡�
$(function () {
  $(".btn-go-search").click(function () {
    $("html, body").animate(
      {
        scrollTop: $(".nplanet-list").offset().top,
      },
      400,
      "swing"
    );
    return false;
  });
});
