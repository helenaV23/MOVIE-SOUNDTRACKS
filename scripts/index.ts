import { MovieCentralSectionComponent, MovieSectionComponent, SignUpSectionComponent, MainScreenSectionComponent } from "./components/sections";
import { SliderSectionComponent } from "./components/sections/slider-section.component";
import { data } from "./data";
import { FooterComponent } from "./components/footer.component";

(function () {    
    var body = document.body;
    var menuBtn = document.querySelector('.menu-btn');
    var main = document.querySelector('main');

    var mainScreen = new MainScreenSectionComponent(data);
    var renderedMainScreen = mainScreen.render();
    main.appendChild(renderedMainScreen);
    
    data.ratingData.forEach(function (dataItem, index) {
        var id = data.ratingData.length - index;
        var reverseBlock = index % 3 === 1;

        if (index % 3 === 2) {
            var centralSection = new MovieCentralSectionComponent(id, dataItem);
            var renderedSection = centralSection.render();
            main.insertBefore(renderedSection, main.querySelector('.sign-up'));
            
            var sliderData = data.ratingData.slice(index - 2, index + 1);
            
            var slider = new SliderSectionComponent(sliderData);
            var renderedSlider = slider.render();
            main.appendChild(renderedSlider);
        } else {
            var section = new MovieSectionComponent(id, dataItem, reverseBlock);
            var renderedSection = section.render();
            main.appendChild(renderedSection);
        }
    });

    var signUp = new SignUpSectionComponent();
    var renderedSection = signUp.render();
    main.appendChild(renderedSection);

    var footer = new FooterComponent();
    var renderedFooter = footer.render();
    body.appendChild(renderedFooter);

    // Opening/closing burger menu 
    menuBtn.addEventListener('click', function () {
        document.querySelector('.menu-wrapper').classList.toggle('open-burger-menu');
        menuBtn.classList.toggle('menu-btn-active');
        body.classList.toggle('lock');
    });

    document.querySelectorAll('.submenu-link').forEach(function (submenuLink) {
        submenuLink.addEventListener('click', function() {
            body.classList.remove('lock');
            document.querySelector('.menu-wrapper').classList.remove('open-burger-menu');
            menuBtn.classList.remove('menu-btn-active');
        });
    });

    closeVideo('.slider-btn-left');
    closeVideo('.slider-btn-right');
    closeVideo('.js-listen');

    makeSmoothScroll('.submenu-link');
    makeSmoothScroll('.js-scroll-link');
}());

function closeVideo(selector) {
    var elements = document.querySelectorAll(selector);

    elements.forEach(function (element) {
        element.addEventListener('click', function () {
            document.querySelectorAll('.movie-video').forEach(function (movieVideoElem) {
                (movieVideoElem as any).pause();
            });
            document.querySelectorAll('.movie-item').forEach(function (movieItemElem) {
                movieItemElem.classList.remove('movie-item-playing');
            });
            document.querySelectorAll('.btn-play').forEach(function (jsVideoPlayElem) {
                jsVideoPlayElem.classList.remove('btn-pause');
            });
        });
    });
}

function makeSmoothScroll(selector) {
    var elements = document.querySelectorAll(selector);
    
    elements.forEach(function (element) {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            var scrollElemHref = element.getAttribute('href');
            var scrollEndElem = document.querySelector(scrollElemHref);
            var scrollEndElemTop = scrollEndElem.getBoundingClientRect().top;
            var startTime = performance.now();
            var duration = 1200;

            var startScrollValue = document.documentElement.scrollTop;

            requestAnimationFrame(function smoothScroll(currentTime) {
                var runtime = currentTime - startTime;
                var progress = runtime / duration;

                if (progress >= 1) {
                    progress = 1;
                }

                var scrollOffset = progress * scrollEndElemTop;
                document.documentElement.scrollTop = scrollOffset + startScrollValue;
                
                if (runtime < duration) {
                    requestAnimationFrame(smoothScroll);
                }
            });
        });
    });
}
