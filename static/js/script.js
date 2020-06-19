$(function () {
    "use strict";

    //Parallax
    $.fn.Parallax = function (option) {

        let set = $.extend(
            {
                responsive: 768
            },
            option
        );


        let $winHeight = $(window).height();

        $(this).each(function () {
            let $position = $(this).offset().top - $(document).scrollTop();

            if ($winHeight >= $position) {

                let $layers,
                    $parent,
                    $curPos,
                    $depth,
                    $movement,
                    $translate;

                $layers = $(this);

                $($layers).each(function () {

                    if (window.matchMedia("(min-width: " + set.responsive + "px)").matches) {

                        $parent = $(this).parent();
                        $curPos = $($parent).offset().top - $(document).scrollTop();

                        $depth = $(this).attr('data-depth');
                        $movement = $curPos * $depth;
                        $translate = 'translate3d(0, ' + $movement + 'px, 0)';


                        $(this).css({
                            "-webkit-transform": $translate,
                            "-moz-transform": $translate,
                            "-ms-transform": $translate,
                            "-o-transform": $translate,
                            "transform": $translate
                        });
                    } else {
                        $(this).css({
                            "-webkit-transform": 'translate3d(0, 0px, 0)',
                            "-moz-transform": 'translate3d(0, 0px, 0)',
                            "-ms-transform": 'translate3d(0, 0px, 0)',
                            "-o-transform": 'translate3d(0, 0px, 0)',
                            "transform": 'translate3d(0, 0px, 0)'
                        })
                    }
                });
            }
        });
    };

    //Slider
    $.fn.slider = function (option) {

        let set = $.extend(
            {
                slidePause: 5000,
                fadeSpeed: 800
            },
            option
        );

        let $slider = $(this);
        let size = $slider.find("> img").length;
        let position = 0;
        let sliderIntervalID;


        // ajoute .show au premier Slide
        $slider.find("> img:first-of-type").addClass("show");

        //fadeout tout les autres
        $slider.find("> img").not(".show").fadeOut();


        // lance le slider
        function startSlider() {
            sliderIntervalID = setInterval(function () {
                nextSlide();
            }, set.slidePause);
        }

        // click fleche droite
        $slider.find("> .right").click(function () {
            nextSlide();
            clearInterval(sliderIntervalID);
            startSlider();
        });

        // click fleche gauche
        $slider.find("> .left").click(function () {
            prevSlide();
            clearInterval(sliderIntervalID);
            startSlider();
        });

        // slide suivant
        function nextSlide() {
            position = $slider.find(".show").index() + 1;
            if (position > size - 1) position = 0;
            changeImages(position);
        }

        // slide precedent
        function prevSlide() {
            position = $slider.find(".show").index() - 1;
            if (position < 0) position = size - 1;
            changeImages(position);
        }

        //je change l'image cacher/afficher
        function changeImages() {
            $slider.find(".show").removeClass("show").fadeOut();
            $slider
                .find("> img")
                .eq(position)
                .fadeIn(set.fadeSpeed)
                .addClass("show");
        }

        startSlider();

    };


    $("#slider").slider({
        slidePause: 5000,
        fadeSpeed: 300,
    });

    $(window).on('scroll resize', function () {
        $('[data-type="parallax"]').Parallax({
            responsive: 870
        })
    });


    // let observer = new IntersectionObserver(function (observ) {
    //     observ.forEach(function (obs) {
    //        if(obs.intersectionRatio > 0 ){
    //            obs.target.classList.remove('hide');
    //            observer.unobserve(obs.target)
    //        }
    //    })
    // },{
    //     threshold: [0]
    // });
    //
    // let items = document.querySelectorAll('img');
    //
    // items.forEach(function (item) {
    //     item.classList.add('hide');
    //     observer.observe(item)
    // });

});



