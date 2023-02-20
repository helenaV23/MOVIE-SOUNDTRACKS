$(function () {

    // Opening/closing burger menu 
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

    // Opening/closing modal window with audio playing by clicking on "Listen" button
    $('.js-listen').on('click', function () {
        var currentFilmSection = $(this).closest('section');
        var filmTitle = currentFilmSection.data('title');
        var filmRating = currentFilmSection.data('rating');
        var audio = currentFilmSection.data('audio');

        $('.modal-overlay').addClass('modal-open');
        $('body').addClass('lock');

        $('.modal-rating').text(filmRating);
        $('.modal-title').text(filmTitle);
        $('.modal-audio').attr('src', 'audios/' + audio);
    });

    $('.modal-container').on('click', function (e) {
        e.stopPropagation();
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

    closeModal('.modal-overlay');
    closeModal('.modal-close-btn');

    // Interacting with videos in movie sliders
    $('.js-video-play').on('click', function () {
        var currentBtn = $(this);
        var movieItem = currentBtn.parent('.movie-item');
        var video = movieItem.find('.movie-video');
        var allVideos = $('.movie-video');

        currentBtn.toggleClass('btn-pause');
        movieItem.toggleClass('movie-item-playing');
        
        if (currentBtn.hasClass('btn-pause')) {
            video[0].play();

        } else {
            video[0].pause();
        }
        
        allVideos.not(video).each(function (_index, element) {
            var elementObject = $(element);
            element.pause();
            elementObject.parent('.movie-item').removeClass('movie-item-playing');
            elementObject.siblings('.js-video-play').removeClass('btn-pause');
        });
    });

    // Adjusting media volume when volume is being dragged
    $('.volume-range').on('mousedown', function() {
        var volumeRangeObj = $(this);
        var volumeRangeWidth = volumeRangeObj.width();
        var volumeElement = volumeRangeObj.find('.volume');
        var volumeIcon = volumeRangeObj.siblings('.volume-icon');
        var grandparentElement = volumeRangeObj.parent('.volume-control').parent('.media-controls').parent();

        $(window).on('mousemove', function(e) {
            var x = e.pageX - volumeRangeObj.offset().left;
            var volume = x / volumeRangeWidth;
            var volumeValue = Math.floor(volume * 100);

            if (volumeValue <= 0) {
                volumeIcon.attr('src', 'images/player/mute.svg');
            } else if (volumeValue > 100) {
                volumeValue = 100; 
            } else {
                volumeIcon.attr('src', 'images/player/volume.svg');
            }

            volumeElement.css('width', volumeValue + '%');

            if (grandparentElement.hasClass('movie-item')) {
                $(grandparentElement).find('.movie-video').prop('volume', volume);
            } else {
                $(grandparentElement).find('.modal-audio').prop('volume', volume);
            }
        });
    
        $(document).on('mouseup', function() {
            $(window).off('mousemove');
        });
    });

    initSliders(1);

    closeVideo('.slider-btn-left');
    closeVideo('.slider-btn-right');
    closeVideo('.js-listen');

    makeSmoothScroll('.submenu-link');
    makeSmoothScroll('.js-scroll-link');

    showMediaTime('.movie-video');
    showMediaTime('.modal-audio');
});

function closeModal(selector) {
    $(selector).on('click', function () {
        $('.modal-audio')[0].pause();
        $('.modal-overlay').removeClass('modal-open');
        $('body').removeClass('lock');
        $('.js-modal-play').removeClass('btn-pause');
        $('.volume').width('100%');
    });
}

function closeVideo(selector) {
    $(selector).on('click', function () {
        $('.movie-item').removeClass('movie-item-playing');
        $('.js-video-play').removeClass('btn-pause');
        $('.movie-video').each(function() {
            this.pause();
        });
    });
}

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

function makeSmoothScroll(selector) {
    $(selector).on('click', function () {
        var scrollName = $(this).attr('href');
        var scrollTop = $(scrollName).offset().top;

        $('html').animate({
            scrollTop: scrollTop
        }, 500);
    });
}

function showMediaTime(selector) {
    $(selector).each(function (_index, element) {
        var elementObj = $(element);
        var mediaTimeElem = elementObj.siblings('.media-controls').find('.media-time');
        var currentTimeElem = mediaTimeElem.find('.current-time');
        var timeLineElem = mediaTimeElem.find('.timeline');
        var timeProgressElem = mediaTimeElem.find('.timeline-progress');
        var timer = 0;

        elementObj.on('loadedmetadata', function () {
            mediaTimeElem.find('.media-duration').text(formatTime(element.duration));
            currentTimeElem.text(formatTime(0));
            timeProgressElem.width(0);
        });  

        elementObj.on('play', function () {
            showProgress();
        });
        
        elementObj.on('pause', function () {
            cancelAnimationFrame(timer);
        });

        elementObj.on('ended', function () {
            elementObj.siblings('.btn-play').removeClass('btn-pause');
            currentTimeElem.text(formatTime(0));
            timeProgressElem.width(0);

            if (selector == '.movie-video') {
                $('.movie-item').removeClass('movie-item-playing');
            }
        });

        function showProgress() {
            var currTime = element.currentTime;
            currentTimeElem.text(formatTime(currTime));

            var progress = (currTime / element.duration) * 100;
            timeProgressElem.width(progress + '%');

            timer = requestAnimationFrame(showProgress);
        }

        timeLineElem.on('click', function (e) {
            var progress = e.offsetX / $(this).width();
            var newCurrentTime = progress * element.duration;

            element.currentTime = newCurrentTime;

            currentTimeElem.text(formatTime(newCurrentTime));
            timeProgressElem.width(progress * 100 + '%');    
        });
    }); 
}

function formatTime(time) {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time - minutes * 60);
  
    return  minutes + ':' +
            (seconds < 10 ? '0' + seconds : seconds);
}
