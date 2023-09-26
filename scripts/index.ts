import { MovieCentralSectionComponent, MovieSectionComponent } from "./components/sections";
import { SliderSectionComponent } from "./components/sections/slider-section.component";
import { IMovieData, ISectionData, ISliderData } from "./models";


(function () {    
    var body = document.body;
    var menuBtn = document.querySelector('.menu-btn');
    var main = document.querySelector('main');

    var sectionsData: ISectionData[] = [
        {
            image: 'guardians-of-the-galaxy.png',
            alt: 'guardians-of-the-galaxy',
        },    
        {
            image: 'jurassic-park.png',
            alt: 'jurassic-park-image',
        },
        {
            sectionClass: 'star-wars-heroes',
        },
        {
            image: 'baby-driver-banner.png',
            alt: 'baby-driver-banner',
        },
        {
            image: 'goodfellas-banner.png',
            alt: 'goodfellas-image',
        },
        {
            sectionClass: 'blade-runner-heroes',
        },
        {
            image: 'o-brother-where-art-thou.png',
            alt: 'o-brother-where-art-thou-banner',
        },
        {
            image: 'space-odyssey.png',
            alt: 'space-odyssey-image',
        },
        {
            sectionClass: 'godfather-heroes',
        },
        {
            image: 'the-lord-of-rings.png',
            alt: 'the-lord-of-rings-banner',
        },
    ];

    var movieContentData: IMovieData[]= [
        {
            rating: '.10',
            header: 'GUARDIANS OF THE GALAXY VOL. 2',
            description: 'While the Awesome Mix Vol. 1 in Guardians of the Galaxy was resonant with a lot of people, it was the soundtrack in Guardians of the Galaxy Vol. 2 that improved  on the formula. The first film featured songs that were fun and upbeat but didn`t have much to do with the film`s story.',
            audio: 'guardinas-of-the-galaxy-vol-2.ogg',
        },
        {
            rating: '.09',
            header: 'JURASSIC PARK',
            description: 'John Williams did a lot of music for many popular franchises. After his work on Star Wars, he would later do the score for Jurassic Park. This dinosaur film was full of epic shots and tense moments that were further brought to life by Williams` music.',
            audio: 'jurassic-park.ogg',
        },
        {
            rating: '.08',
            header: 'STAR WARS: A NEW HOPE',
            description: 'When Star Wars: A New Hope was released, it introduced many iconic themes that people would recognize decades after. That was thanks to John Williams, who put together the iconic fanfare, the Imperial March, and so many more great tracks.',
            audio: 'star-wars-a-new-hope.ogg',
        },
        {
            rating: '.07',
            header: 'BABY DRIVER',
            description: 'Baby Driver`s soundtrack is similar to Guardians of the Galaxy in many ways. It uses a lot of older songs to provide a backdrop to the films many beats. However, what Edgar Wright did with the music was so far beyond that.',
            audio: 'baby-driver.ogg',
        },
        {
            rating: '.06',
            header: 'GOODFELLAS',
            description: 'Martin Scorcese`s movie Goodfellas remains one of his best to date. The movie deals with gangs, drugs, and everything else  in between. It`s a crime movie that isn`t afraid to deal with the dark side of life. Going along with every scene is a great soundtrack full of hand-picked songs that compliment every moment they appear in.',
            audio: 'goodfellas.ogg',
        },
        {
            rating: '.05',
            header: 'BLADE RUNNER',
            description: 'It`s astounding that Blade Runner didn`t become as popular as other movies released in its time. It arguably has one of the best soundtracks in movie history, with every tune being a perfect match with the action on-screen.',
            audio: 'blade-runner.ogg',
        },
        {
            rating: '.04',
            header: 'O BROTHER, WHERE ART THOU?',
            description: 'O Brother, Where Art Thou? is a movie that fires on all cylinders. It takes place in the Great Depression and involves a group of convicts who go on a wild journey to find a treasure of sorts. With this film based in a stylistic period in history, the soundtrack was designed to match it.',
            audio: 'o-brother-where-art-thou.ogg',
        },
        {
            rating: '.03',
            header: '2001: A SPACE ODYSSEY',
            description: 'The movie tries very hard to sell the idea of what space exploration would be like, and its themes of isolation and sophistication are further enhanced by its soundtrack. 2001: A Space Odyssey makes use of classical themes and motifs to narrow down a tone that makes the movie feel all its own.',
            audio: '2001-a-space-odyssey.ogg',
        },
        {
            rating: '.02',
            header: 'THE GODFATHER',
            description: 'The Godfather is one of cinema`s best works. There are so many pieces in that movie that just work, and the soundtrack is part of it. Because the movie deals with crime, gangs, and the works, the music is designed to reflect that.',
            audio: 'the-godfather.ogg',
        },
        {
            rating: '.01',
            header: 'THE LORD OF THE RINGS',
            description: 'Everything about the soundtrack in The Lord of the Rings is excellent, which is one of the many reasons that the trilogy remains one of the most beloved in cinema history. Where Peter Jackson had a frame of reference with Tolkien`s detailed descriptions, Howard Shore had to match those visuals with music all his own.',
            audio: 'the-lord-of-the-rings.ogg',
        },
    ];

    var slidersData: ISliderData[][] = [
        [
            {
                imageSrc: 'guardians-video.png',
                imageAlt: 'guardians',
                videoSrc: 'guardinas-of-the-galaxy-vol-2.mp4',
            },

            {
                imageSrc: 'the-lost-world-jurassic-park-video.png',
                imageAlt: 'jurassic-park',
                videoSrc: 'jurassic-park.mp4',
            },

            {
                imageSrc: 'star-wars-video.png',
                imageAlt: 'star-wars',
                videoSrc: 'star-wars-a-new-hope.mp4',
            },
        ],

        [ 
            {
                imageSrc: 'baby-driver-video.png',
                imageAlt: 'baby-driver',
                videoSrc: 'baby-driver.mp4',
            },

            {
                imageSrc: 'goodfellas-video.png',
                imageAlt: 'goodfellas',
                videoSrc: 'goodfellas.mp4',
            },

            {
                imageSrc: 'culture-bladerunner.png',
                imageAlt: 'blade-runner',
                videoSrc: 'blade-runner.mp4',
            },
        ],

        [
            {
                imageSrc: 'o-brother-video.png',
                imageAlt: 'o-brother-where-art-thou',
                videoSrc: 'o-brother-where-art-thou.mp4',
            },

            {
                imageSrc: 'odyssey-video.png',
                imageAlt: 'a-space-odyssey',
                videoSrc: '2001-a-space-odyssey.mp4',
            },

            {
                imageSrc: 'godfather-video.png',
                imageAlt: 'the-godfather',
                videoSrc: 'the-godfather.mp4',
            },
        ],
    ]; 

    sectionsData.forEach(function (sectionData, index) {
        var id = sectionsData.length - index;

        if (index % 3 === 2) {
            var movieContent = movieContentData[index];
            var centralSection = new MovieCentralSectionComponent(id, sectionData, movieContent);
            var renderedSection = centralSection.render();
            main.insertBefore(renderedSection, main.querySelector('.sign-up')); 

            var sliderDataIndex = Math.floor(index / 3);
            var slider = new SliderSectionComponent(slidersData[sliderDataIndex]);
            var renderedSlider = slider.render();
            main.insertBefore(renderedSlider, main.querySelector('.sign-up'));
        } else {
            var reverseBlock = index % 3 === 1;
            var movieContent = movieContentData[index];
            var section = new MovieSectionComponent(id, sectionData, reverseBlock, movieContent);
            var renderedSection = section.render();
            main.insertBefore(renderedSection, main.querySelector('.sign-up')); 
        }
    });

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
