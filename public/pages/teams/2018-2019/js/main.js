/* ===================================================================
 * TypeRite - Main JS
 *
 *
 * ------------------------------------------------------------------- */

(function ($) {
    'use strict';

    var cfg = {
            scrollDuration: 800, // smoothscroll duration
            mailChimpURL: '', // mailchimp url
        },
        $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);

    /* preloader
     * -------------------------------------------------- */
    var ssPreloader = function () {
        $('html').addClass('ss-preload');

        $WIN.on('load', function () {
            //force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

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

    /* search
     * ------------------------------------------------------ */
    var ssSearch = function () {
        var searchWrap = $('.search-block'),
            searchField = searchWrap.find('.search-field'),
            closeSearch = searchWrap.find('.search-close'),
            searchTrigger = $('.search-trigger'),
            siteBody = $('body');

        searchTrigger.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            var $this = $(this);

            siteBody.addClass('search-is-visible');
            setTimeout(function () {
                searchWrap.find('.search-field').focus();
            }, 100);
        });

        closeSearch.on('click', function (e) {
            var $this = $(this);

            e.stopPropagation();

            if (siteBody.hasClass('search-is-visible')) {
                siteBody.removeClass('search-is-visible');
                setTimeout(function () {
                    searchWrap.find('.search-field').blur();
                }, 100);
            }
        });

        searchWrap.on('click', function (e) {
            if (!$(e.target).is('.search-field')) {
                closeSearch.trigger('click');
            }
        });

        searchField.on('click', function (e) {
            e.stopPropagation();
        });

        searchField.attr({ placeholder: 'Type Keywords', autocomplete: 'off' });
    };

    /* menu
     * ------------------------------------------------------ */
    var ssMenu = function () {
        var menuToggle = $('.header__menu-toggle'),
            siteBody = $('body');

        menuToggle.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            menuToggle.toggleClass('is-clicked');
            siteBody.toggleClass('nav-wrap-is-visible');
        });

        $('.header__nav .has-children')
            .children('a')
            .on('click', function (e) {
                e.preventDefault();

                $(this)
                    .toggleClass('sub-menu-is-open')
                    .next('ul')
                    .slideToggle(200)
                    .end()
                    .parent('.has-children')
                    .siblings('.has-children')
                    .children('a')
                    .removeClass('sub-menu-is-open')
                    .next('ul')
                    .slideUp(200);
            });
    };

    /* masonry
     * ---------------------------------------------------- */
    var ssMasonryFolio = function () {
        var containerBricks = $('.masonry');

        containerBricks.masonry({
            itemSelector: '.masonry__brick',
            columnWidth: '.grid-sizer',
            percentPosition: true,
            resize: true,
        });

        // layout Masonry after each image loads
        containerBricks.imagesLoaded().progress(function () {
            containerBricks.masonry('layout');
        });
    };

    /* animate bricks
     * ------------------------------------------------------ */
    var ssBricksAnimate = function () {
        var animateEl = $('.animate-this');

        $WIN.on('load', function () {
            setTimeout(function () {
                animateEl.each(function (ctr) {
                    var el = $(this);

                    setTimeout(function () {
                        el.addClass('animated');
                    }, ctr * 200);
                });
            }, 300);
        });

        $WIN.on('resize', function () {
            // remove animation classes
            animateEl.removeClass('animate-this animated');
        });
    };

    /* slick slider
     * ------------------------------------------------------ */
    var ssSlickSlider = function () {
        var $gallery = $('.slider__slides').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            pauseOnFocus: false,
            fade: true,
            cssEase: 'linear',
        });

        $('.slider__slide').on('click', function () {
            $gallery.slick('slickGoTo', parseInt($gallery.slick('slickCurrentSlide')) + 1);
        });
    };

    /* smooth scrolling
     * ------------------------------------------------------ */
    var ssSmoothScroll = function () {
        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
                $target = $(target);

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
                    // check if menu is open
                    if ($('body').hasClass('menu-is-open')) {
                        $('.header-menu-toggle').trigger('click');
                    }

                    window.location.hash = target;
                });
        });
    };

    /* alert boxes
     * ------------------------------------------------------ */
    var ssAlertBoxes = function () {
        $('.alert-box').on('click', '.alert-box__close', function () {
            $(this).parent().fadeOut(500);
        });
    };

    /* Back to Top
     * ------------------------------------------------------ */
    var ssBackToTop = function () {
        var pxShow = 500,
            goTopButton = $('.go-top');

        // Show or hide the button
        if ($(window).scrollTop() >= pxShow) goTopButton.addClass('link-is-visible');

        $(window).on('scroll', function () {
            if ($(window).scrollTop() >= pxShow) {
                if (!goTopButton.hasClass('link-is-visible')) goTopButton.addClass('link-is-visible');
            } else {
                goTopButton.removeClass('link-is-visible');
            }
        });
    };

    /* Initialize
     * ------------------------------------------------------ */
    (function clInit() {
        ssPreloader();
        ssSearch();
        ssMenu();
        ssMasonryFolio();
        ssBricksAnimate();
        ssSlickSlider();
        ssSmoothScroll();
        ssAlertBoxes();
        ssBackToTop();
    })();
})(jQuery);

const renderQuotes = async () => {
    const response = await fetch('https://api.quotable.io/random?maxLength=70');
    const { content, author } = await response.json();
    document.getElementById('quotes-content').innerHTML = content;
    document.getElementById('quotes-author').innerHTML = author;
};

const searchMembers = () => {
    const search = document.querySelector('.search-form');
    search.addEventListener('submit', event => {
        event.preventDefault();
        const searchValue = document.getElementById('search').value.toLowerCase();
        const members = document.querySelectorAll('.member-name');

        members.forEach(member => {
            const memberCard = member.closest('.masonry__brick');
            const name = member.innerText;
            const designation = member.closest('.entry__text').querySelector('.member-designation').innerText;
            const searchResult =
                name.toLowerCase().includes(searchValue) || designation.toLowerCase().includes(searchValue);

            if (searchResult) memberCard.style.display = 'block';
            else memberCard.style.display = 'none';
        });

        search.reset();
    });
};

particlesJS('particles-js', {
    particles: {
        number: { value: 150, density: { enable: true, value_area: 800 } },
        color: { value: '#000' },
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
        line_linked: { enable: true, distance: 150, color: '#000', opacity: 0.2, width: 1 },
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

renderQuotes();
searchMembers();
