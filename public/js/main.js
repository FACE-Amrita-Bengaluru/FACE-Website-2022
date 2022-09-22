/* ===================================================================
 * Flare 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function ($) {
    'use strict';

    const cfg = {
        scrollDuration: 800, // smoothscroll duration
        mailChimpURL: '', // mailchimp url
    };
    const $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
    // const doc = document.documentElement;
    // doc.setAttribute('data-useragent', navigator.userAgent);

    /* preloader
     * -------------------------------------------------- */
    const ssPreloader = function () {
        $('html').addClass('ss-preload');

        $WIN.on('load', function () {
            // force page scroll position to top at page refresh
            $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation
            $('#loader').fadeOut('slow', function () {
                // will fade out the whole DIV that covers the website.
                $('#preloader').delay(300).fadeOut('slow');
            });

            // for hero content animations
            $('html').removeClass('ss-preload');
            $('html').addClass('ss-loaded');
        });
    };

    /* pretty print
     * -------------------------------------------------- */
    const ssPrettyPrint = function () {
        $('pre').addClass('prettyprint');
        $(document).ready(function () {
            prettyPrint();
        });
    };

    /* move header
     * -------------------------------------------------- */
    const ssMoveHeader = function () {
        const $hero = $('.s-hero'),
            $hdr = $('.s-header'),
            triggerHeight = $hero.outerHeight() - 170;

        $WIN.on('scroll', function () {
            let loc = $WIN.scrollTop();

            if (loc > triggerHeight) {
                $hdr.addClass('sticky');
            } else {
                $hdr.removeClass('sticky');
            }

            if (loc > triggerHeight + 20) {
                $hdr.addClass('offset');
            } else {
                $hdr.removeClass('offset');
            }

            if (loc > triggerHeight + 150) {
                $hdr.addClass('scrolling');
            } else {
                $hdr.removeClass('scrolling');
            }
        });
    };

    /* mobile menu
     * ---------------------------------------------------- */
    const ssMobileMenu = function () {
        const $toggleButton = $('.s-header__menu-toggle');
        const $headerContent = $('.s-header__content');
        const $siteBody = $('body');

        $toggleButton.on('click', function (event) {
            event.preventDefault();
            $toggleButton.toggleClass('is-clicked');
            $siteBody.toggleClass('menu-is-open');
        });

        $headerContent.find('.s-header__nav a, .btn').on('click', function () {
            // at 900px and below
            if (window.matchMedia('(max-width: 900px)').matches) {
                $toggleButton.toggleClass('is-clicked');
                $siteBody.toggleClass('menu-is-open');
            }
        });

        $WIN.on('resize', function () {
            // above 900px
            if (window.matchMedia('(min-width: 901px)').matches) {
                if ($siteBody.hasClass('menu-is-open')) $siteBody.removeClass('menu-is-open');
                if ($toggleButton.hasClass('is-clicked')) $toggleButton.removeClass('is-clicked');
            }
        });
    };

    /* photoswipe
     * ----------------------------------------------------- */
    const ssPhotoswipe = function () {
        const items = [],
            $pswp = $('.pswp')[0],
            $folioItems = $('.folio-item');

        // get items
        $folioItems.each(function (i) {
            let $folio = $(this),
                $thumbLink = $folio.find('.folio-item__thumb-link'),
                $title = $folio.find('.folio-item__title'),
                $caption = $folio.find('.folio-item__caption'),
                $titleText = '<h4>' + $.trim($title.html()) + '</h4>',
                $captionText = $.trim($caption.html()),
                $href = $thumbLink.attr('href'),
                $size = $thumbLink.data('size').split('x'),
                $width = $size[0],
                $height = $size[1];

            let item = {
                src: $href,
                w: $width,
                h: $height,
            };

            if ($caption.length > 0) {
                item.title = $.trim($titleText + $captionText);
            }

            items.push(item);
        });

        // bind click event
        $folioItems.each(function (i) {
            $(this)
                .find('.folio-item__thumb-link')
                .on('click', function (e) {
                    e.preventDefault();
                    let options = {
                        index: i,
                        showHideOpacity: true,
                    };

                    // initialize PhotoSwipe
                    let lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                    lightBox.init();
                });
        });
    };

    /* slick slider
     * ------------------------------------------------------ */
    const ssSlickSlider = function () {
        $('.clients').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            pauseOnFocus: false,
            autoplaySpeed: 1000,
            responsive: [
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 4,
                    },
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                    },
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    },
                },
            ],
        });

        $('.testimonial-slider').slick({
            arrows: true,
            dots: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        arrows: false,
                        dots: true,
                    },
                },
            ],
        });
    };

    /* animate on scroll
     * ------------------------------------------------------ */
    const ssAOS = function () {
        AOS.init({
            offset: 100,
            duration: 600,
            easing: 'ease-in-out',
            delay: 300,
            once: true,
            disable: 'mobile',
        });
    };

    /* alert boxes
     * ------------------------------------------------------ */
    const ssAlertBoxes = function () {
        $('.alert-box').on('click', '.alert-box__close', function () {
            $(this).parent().fadeOut(500);
        });
    };

    /* smooth scrolling
     * ------------------------------------------------------ */
    const ssSmoothScroll = function () {
        $('.smoothscroll').on('click', function (e) {
            const target = this.hash;
            const $target = $(target);

            e.preventDefault();
            e.stopPropagation();

            $('html, body')
                .stop()
                .animate(
                    {
                        scrollTop: $target.offset().top,
                    },
                    cfg.scrollDuration,
                    'swing'
                )
                .promise()
                .done(function () {
                    window.location.hash = target;
                });
        });
    };

    /* back to top
     * ------------------------------------------------------ */
    const ssBackToTop = function () {
        const pxShow = 800;
        const $goTopButton = $('.ss-go-top');

        // Show or hide the button
        if ($(window).scrollTop() >= pxShow) $goTopButton.addClass('link-is-visible');

        $(window).on('scroll', function () {
            if ($(window).scrollTop() >= pxShow) {
                if (!$goTopButton.hasClass('link-is-visible')) $goTopButton.addClass('link-is-visible');
            } else {
                $goTopButton.removeClass('link-is-visible');
            }
        });
    };

    /* initialize
     * ------------------------------------------------------ */
    (function ssInit() {
        ssPreloader();
        ssPrettyPrint();
        ssMoveHeader();
        ssMobileMenu();
        ssPhotoswipe();
        ssSlickSlider();
        ssAOS();
        ssAlertBoxes();
        ssSmoothScroll();
        ssBackToTop();
    })();
})(jQuery);

particlesJS('particles-js', {
    particles: {
        number: { value: 150, density: { enable: true, value_area: 800 } },
        color: { value: '#fff' },
        shape: {
            type: 'circle',
            stroke: { width: 0, color: '#000' },
            polygon: { nb_sides: 5 },
        },
        opacity: {
            value: 0.4,
            random: false,
            anim: { enable: true, speed: 0.3, opacity_min: 0.1, sync: false },
        },
        size: { value: 3, random: true, anim: { enable: true, speed: 10, size_min: 0.1, sync: false } },
        line_linked: { enable: true, distance: 150, color: '#fff', opacity: 0.2, width: 1 },
        move: {
            enable: true,
            speed: 3,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 },
        },
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' },
            resize: true,
        },
        modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
        },
    },
    retina_detect: true,
});

document.addEventListener('DOMContentLoaded', () => {
    new TypeIt('.greetings', {
        lifeLike: false,
        speed: 0,
    })
        .pause(1000)
        .type('H')
        .pause(375)
        .type('e')
        .pause(251)
        .type('l')
        .pause(169)
        .type('l')
        .pause(281)
        .type('o')
        .pause(460)
        .type('.')
        .pause(650)
        .delete(1)
        .pause(159)
        .delete(1)
        .pause(173)
        .delete(1)
        .pause(168)
        .delete(1)
        .pause(161)
        .delete(1)
        .pause(160)
        .delete(1)
        .pause(603)
        .type('H')
        .pause(446)
        .type('e')
        .pause(297)
        .type('y')
        .pause(493)
        .type('.')
        .pause(572)
        .delete(1)
        .pause(145)
        .delete(1)
        .pause(171)
        .delete(1)
        .pause(159)
        .delete(1)
        .pause(645)
        .type('H')
        .pause(405)
        .type('i')
        .pause(525)
        .type('.')
        .pause(580)
        .delete(1)
        .pause(158)
        .delete(1)
        .pause(173)
        .delete(1)
        .pause(551)
        .type('H')
        .pause(400)
        .type('e')
        .pause(309)
        .type('l')
        .pause(156)
        .type('l')
        .pause(249)
        .type('o')
        .pause(512)
        .type('.')
        .go();
});
