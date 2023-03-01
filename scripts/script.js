document.addEventListener('DOMContentLoaded', function() {
    
    var menuBtn = document.querySelector('.menu-btn');
    var menuWrapper = document.querySelector('.menu-wrapper');
    var body = document.body;
    var submenuLinks = document.querySelectorAll('.submenu-link');
    var jsListenButtons = document.querySelectorAll('.js-listen');
    var modalOverlay = document.querySelector('.modal-overlay');
    var modalRating = document.querySelector('.modal-rating');
    var modalTitle = document.querySelector('.modal-title');
    var modalAudio = document.querySelector('.modal-audio');
    var modalContainer = document.querySelector('.modal-container');
    var jsModalPlayBtns = document.querySelectorAll('.js-modal-play');

    // Opening/closing burger menu 
    menuBtn.addEventListener('click', function() {
        menuWrapper.classList.toggle('open-burger-menu');
        menuBtn.classList.toggle('menu-btn-active');
        body.classList.toggle('lock');
    });

    submenuLinks.forEach(function (submenuLink) {
        submenuLink.addEventListener('click', function() {
            body.classList.remove('lock');
            menuWrapper.classList.remove('open-burger-menu');
            menuBtn.classList.remove('menu-btn-active');
        });
    });

    // Opening/closing modal window with audio playing by clicking on "Listen" button
    jsListenButtons.forEach(function (jsListenButton) {
        jsListenButton.addEventListener('click', function() {
            var currentFilmSection = jsListenButton.closest('section');
            var filmTitle = currentFilmSection.dataset.title;
            var filmRating = currentFilmSection.dataset.rating;
            var audio = currentFilmSection.dataset.audio;

            modalOverlay.classList.add('modal-open');
            body.classList.add('lock');

            modalRating.textContent = filmRating;
            modalTitle.textContent = filmTitle;
            modalAudio.setAttribute('src', 'audios/' + audio);  
        });
    });

    modalContainer.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    jsModalPlayBtns.forEach(function (jsModalPlayBtn) {
        jsModalPlayBtn.addEventListener('click', function() {
            jsModalPlayBtn.classList.toggle('btn-pause');

            if (jsModalPlayBtn.classList.contains('btn-pause')) {
                modalAudio.play();
            } else {
                modalAudio.pause();
            }
        });
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
    $('.volume-range').on('mousedown', function(e) {
        var volumeRangeObj = $(this);

        setVolume(volumeRangeObj, e.pageX);
        
        $(window).on('mousemove', function (e) {
            setVolume(volumeRangeObj, e.pageX);
        });
    
        $(document).one('mouseup', function() {
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

function setVolume(element, eventXPosition) {
    var volumeRangeWidth = element.width();
    var volumeRangeLeftPostion = element.offset().left;
    var volumeElement = element.find('.volume');
    var volumeIcon = element.siblings('.volume-icon');
    var grandparentElement = element.parent('.volume-control').parent('.media-controls').parent();
    var x = eventXPosition - volumeRangeLeftPostion;
    var volume = x / volumeRangeWidth;
    var volumeValue = volume * 100;

    if (volume <= 0) {
        volumeValue = 0;
        volume = 0;
    } else if (volume > 1) {
        volume = 1;
        volumeValue = 100; 
    }

    volumeElement.css('width', volumeValue + '%');
    
    var icon = volume <= 0 ? 'images/player/mute.svg' : 'images/player/volume.svg';
    volumeIcon.attr('src', icon);

    var mediaSelector = grandparentElement.hasClass('movie-item') ? '.movie-video' : '.modal-audio';        
    grandparentElement.find(mediaSelector).prop('volume', volume);
}
