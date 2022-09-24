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
});
