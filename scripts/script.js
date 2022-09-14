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
        });
    }

    $('.js-listen').on('click', function () {
        var filmTitle = $(this).closest('div').prev('h2').text();
        var filetredTitle = filmTitle
            .split('\n')
            .map(function (el) { return el.trim(); })
            .filter(function (el) { return el !== ""; });
        
        $('.modal-rating').text(filetredTitle[0]);
        $('.modal-title').text(filetredTitle[1]);  
    });
});
