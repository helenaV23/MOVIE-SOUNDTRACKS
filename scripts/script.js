$(function () {
    $('.dropdown').hover(function () {
        $('.submenu').toggleClass('dropdown-show');
    });

    $('.menu-btn').click(function () {
        $('.menu-btn ~ nav, .menu-btn').toggleClass('open-burger-menu')
        $('body').toggleClass('lock')
    });
});
