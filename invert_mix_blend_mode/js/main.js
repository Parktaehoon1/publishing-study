$(document).ready(function () {

    // main slide 
    var $slider = $('.slick_slider');

    if ($slider.length) {
        var currentSlide;
        var slidesCount;
        var sliderCounter = document.createElement('div');
        sliderCounter.classList.add('slider_counter');

        var updateSliderCounter = function(slick, currentIndex) {
            currentSlide = slick.slickCurrentSlide() + 1;
            slidesCount = slick.slideCount;
            $(sliderCounter).html('<span class="active">' + '0' + currentSlide + '</span>' + '/' + '<span>' + '0' + slidesCount + '</span>')
        };

        $slider.on('init', function(event, slick) {
            $slider.append(sliderCounter);
            updateSliderCounter(slick);
        });

        $slider.on('afterChange', function(event, slick, currentSlide) {
            updateSliderCounter(slick, currentSlide);
        });

        $slider.slick({
            dots: true,
            arrows: true, 
            infinite: true,
            fade: true,
            autoplay: true,
            speed: 800,
            pauseOnHover:false,

            responsive: [
                {
                breakpoint: 400,
                settings: {
                    arrows: false, 
                }
                },
            ]
        });
    }

    // explore slide 
    $('.explore_slide').slick({
        arrows:true,
        dots:true,
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover:false,
        autoplay: true,
        autoplaySpeed: 3000,
        variableWidth: true,
        
        responsive: [
                {
                breakpoint: 850,
                settings: {
                    arrows:false,
                    dots:false,
                }
                },
                {
                breakpoint: 480,
                settings: {
                    arrows:false,
                    dots:false,
                    slidesToShow: 1,
                    variableWidth: false,
                }
                },
            ]
    });

    // tit titinfo fade move 
    AOS.init({
        disable: false,
        offset: 0, 
        delay: 0,
        duration:700, 
        easing: 'ease-in-out',
    });


});