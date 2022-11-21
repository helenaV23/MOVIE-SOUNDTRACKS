$(function () {
    $('.menu-btn').on('click', function () {
        $('.menu-wrapper').toggleClass('open-burger-menu');
        $('.menu-btn').toggleClass('menu-btn-active');
        $('body').toggleClass('lock');
    });

    $('.submenu-link').on('click', function () {
        $('body').removeClass('lock');
        $('.menu-wrapper').removeClass('open-burger-menu');
        $('.menu-btn').removeClass('menu-btn-active');
    });

    $('.js-listen').on('click', function () {
        $('.modal-overlay').addClass('modal-open');
        $('body').addClass('lock');
    });

    closeModal('.modal-overlay');
    closeModal('.modal-close-btn');

    $('.modal-container').on('click', function (e) {
        e.stopPropagation();
    });

    function closeModal(selector) {
        $(selector).on('click', function () {
            $('.modal-overlay').removeClass('modal-open');
            $('body').removeClass('lock');
            $('.modal-audio')[0].pause();
            $('.js-modal-play').removeClass('btn-pause');
        });
    }

    $('.js-listen').on('click', function () {
        var currentFilmSection = $(this).closest('section');
        var filmTitle = currentFilmSection.data('title');
        var filmRating = currentFilmSection.data('rating');
        var audio = currentFilmSection.data('audio');

        $('.modal-rating').text(filmRating);
        $('.modal-title').text(filmTitle);
        $('.modal-audio').attr('src', 'audios/' + audio);
    });

    $('.js-modal-play').on('click', function () {
        var currentBtn = $(this);
        currentBtn.toggleClass('btn-pause');

        if (currentBtn.hasClass('btn-pause')) {
            $('.modal-audio')[0].play();
        } else {
            $('.modal-audio')[0].pause();
        }
    });

    $('.js-video-play').on('click', function () {
        var currentBtn = $(this);
        var movieItem = currentBtn.parent('.movie-item');
        var video = movieItem.find('.movie-video');
        var videoImage = movieItem.find('.movie-item-image')

        currentBtn.toggleClass('btn-pause');
        videoImage.addClass('image-hide');
        video.addClass('movie-video-active');

        if (currentBtn.hasClass('btn-pause')) {
            video[0].play();
        } else {
            video[0].pause();
        }

        closeVideo('.slider-btn-left');
        closeVideo('.slider-btn-right');
        closeVideo('.js-listen');

        function closeVideo(selector) {
            $(selector).on('click', function () {
                videoImage.removeClass('image-hide');
                video.removeClass('movie-video-active');
                currentBtn.removeClass('btn-pause');
                video[0].pause();
            })
        }
    });

    initSliders(1);
});

function initSliders(initialSlide) {
    var SLIDE_STEP = -100;

    $('.slider-wrapper').each(function (_index, sliderWrapperElem) {
        var currentSlide = initialSlide;
        var sliderWrapper = $(sliderWrapperElem);
        var moviesList = sliderWrapper.find('.movies-list');
        var lastSlideIndex = moviesList.find('.movie-item').length - 1;

        moveSlide(moviesList, currentSlide);

        sliderWrapper.find('.slider-btn-right').on('click', function (e) {
            e.preventDefault();

            if (currentSlide < lastSlideIndex) {
                currentSlide++;
                moveSlide(moviesList, currentSlide);
            }
        });

        sliderWrapper.find('.slider-btn-left').on('click', function (e) {
            e.preventDefault();
        
            if (currentSlide > 0) {
                currentSlide--;
                moveSlide(moviesList, currentSlide);
            }
        });
    });

    function moveSlide(element, slide) {
        element.css('margin-left', (slide * SLIDE_STEP) + '%');
    }
}
