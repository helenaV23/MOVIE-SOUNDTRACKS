class AbstractBaseButtonComponent {
    _buttonClick;

    constructor(buttonClick) {
        this._buttonClick = buttonClick;
    }

    renderButton(className) {
        const button = document.createElement('button'); 
        button.classList.add(className);

        return button;
    }
}

class PlayButtonComponent extends AbstractBaseButtonComponent {
    #button;
    #playing;

    constructor(buttonClick) {
        super(buttonClick);
        this.#playing = false;
    }

    render() {
        this.#button = super.renderButton('btn-play');
    
        this.#button.addEventListener('click', () => {
            this.#playing = !this.#playing;
    
            if (this.#playing) {
                this.#button.classList.add('btn-pause');
            } else {
                this.#button.classList.remove('btn-pause');
            }

            this._buttonClick(this.#playing);
        });

        return this.#button;
    }

    reset() {
        this.#button.classList.remove('btn-pause');
    }
}

class VolumeControlComponent {
    #volumeChange;
    #volumeIcon;
    #volume;

    constructor(volumeChange) {
        this.#volumeChange = volumeChange;
    }

    render() {
        const volumeControlDiv = document.createElement('div');
        volumeControlDiv.classList.add('volume-control');

        this.#volumeIcon = document.createElement('img');
        this.#volumeIcon.classList.add('volume-icon');
        this.#volumeIcon.setAttribute('src', 'images/player/volume.svg');
        this.#volumeIcon.setAttribute('alt', 'volume-icon');

        const volumeRange = this.#createVolumeRange();
        
        this.#volume = document.createElement('div');
        this.#volume.classList.add('volume');
        volumeRange.appendChild(this.#volume);

        volumeControlDiv.appendChild(this.#volumeIcon);
        volumeControlDiv.appendChild(volumeRange);

        return volumeControlDiv;
    }

    #createVolumeRange() {
        const volumeRange = document.createElement('div');
        volumeRange.classList.add('volume-range');
        volumeRange.addEventListener('mousedown', (e) => {
            this.setVolume(volumeRange, e.pageX);

            window.addEventListener('mousemove', handleMouseMove);

            document.addEventListener('mouseup', () => {
                window.removeEventListener('mousemove', handleMouseMove);
            }, { once: true });
        });

        const handleMouseMove = (e) => {
            this.setVolume(volumeRange, e.pageX);
        };

        return volumeRange;
    }

    setVolume(element, eventXPosition) {
        const volumeRangeWidth = element.offsetWidth;
        const volumeRangeLeftPostion = element.getBoundingClientRect().left;
        const x = eventXPosition - volumeRangeLeftPostion;
        let volume = x / volumeRangeWidth;

        if (volume <= 0) {
            volume = 0;
        } else if (volume > 1) {
            volume = 1;
        }

        this.#volume.style.width = `${volume * 100}%`;
        const icon = volume <= 0 ? 'images/player/mute.svg' : 'images/player/volume.svg';
        this.#volumeIcon.setAttribute('src', icon);
    
        this.#volumeChange(volume);  
    }
}

class ProgressControlComponent {
    #mediaPlayButton;
    #media;
    #mediaTime;
    #currentTime;
    #timeLine;
    #timeLineProgress;
    #mediaDuration;
    #timer;

    constructor(mediaPlayButton, media) {
        this.#mediaPlayButton = mediaPlayButton;
        this.#media = media;
    }

    render() {
        this.#mediaTime = document.createElement('div');
        this.#mediaTime.classList.add('media-time');
    
        this.#currentTime = document.createElement('span');
        this.#currentTime.classList.add('current-time');
    
        this.#timeLine = document.createElement('div');
        this.#timeLine.classList.add('timeline');
    
        this.#timeLineProgress = document.createElement('div');
        this.#timeLineProgress.classList.add('timeline-progress');
    
        this.#mediaDuration = document.createElement('span');
        this.#mediaDuration.classList.add('media-duration');
    
        this.#mediaTime.appendChild(this.#currentTime);
        this.#mediaTime.appendChild(this.#timeLine);
        this.#mediaTime.appendChild(this.#mediaDuration);
    
        this.#timeLine.appendChild(this.#timeLineProgress);
    
        this.#showMediaTime();
    
        return this.#mediaTime;
    }

    #showMediaTime() {
        this.#timer = 0;
    
        this.#media.addEventListener('loadedmetadata', () => {
            this.#mediaDuration.textContent = this.#formatTime(this.#media.duration);
            this.#currentTime.textContent = this.#formatTime(0);
            this.#timeLineProgress.style.width = '0';
    
            this.#media.addEventListener('play', () => {
                this.#showProgress(this.#media);
            });
        
            this.#media.addEventListener('pause', () => {
                cancelAnimationFrame(this.#timer);
            });
    
            this.#media.addEventListener('ended', () => {
                this.#mediaPlayButton.reset();
                this.#currentTime.textContent = this.#formatTime(0);
                this.#timeLineProgress.style.width = '0';
            });
    
            this.#timeLine.addEventListener('click', (e) => {
                const progress = e.offsetX / this.#timeLine.offsetWidth;
                const newCurrentTime = progress * this.#media.duration;
    
                this.#media.currentTime = newCurrentTime;
    
                this.#currentTime.textContent = this.#formatTime(newCurrentTime);
                this.#timeLineProgress.style.width = `${progress * 100}%`;    
            });
        });
    }

    #showProgress() {
        const currTime = this.#media.currentTime;
        this.#currentTime.textContent = this.#formatTime(currTime);
    
        const progress = (currTime / this.#media.duration) * 100;
        this.#timeLineProgress.style.width = `${progress}%`;
    
        this.#timer = requestAnimationFrame(this.#showProgress.bind(this, this.#media));
    }

    #formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time - minutes * 60);
        
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }
}

class MediaControlsComponent {
    #playButton;
    #media;

    constructor(playButton, media) {
        this.#playButton = playButton;
        this.#media = media;
    }

    render() {
        const mediaControls = document.createElement('div');
        mediaControls.classList.add('media-controls');
    
        const progressControlElem = new ProgressControlComponent(this.#playButton, this.#media);
        const renderedProgressControlElement = progressControlElem.render();
    
        const volumeControlElement = new VolumeControlComponent((volume) => {
            this.#media.volume = volume;
        });
    
        const renderedVolumeControlElement = volumeControlElement.render();
    
        mediaControls.appendChild(renderedProgressControlElement);
        mediaControls.appendChild(renderedVolumeControlElement);
    
        return mediaControls;
    }
}

class ModalComponent {
    #filmTitle;
    #filmRating;
    #audio;
    #modalOverlay;
    #modalAudio;
    #modalPlayButton;

    constructor(filmTitle, filmRating, audio) {
        this.#filmTitle = filmTitle;
        this.#filmRating = filmRating;
        this.#audio = audio;
    }

    render() {
        document.body.classList.add('lock');
        this.#modalOverlay = document.createElement('div');
        this.#modalOverlay.classList.add('modal-overlay');
    
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');
    
        modalContainer.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    
        const modalAudioInfo = document.createElement('div');
        modalAudioInfo.classList.add('modal-audio-info');
        
        const modalRating = document.createElement('span');
        modalRating.classList.add('modal-rating');
        modalRating.textContent = this.#filmRating;
    
        const modalTitle = document.createElement('h3');
        modalTitle.classList.add('modal-title');
        modalTitle.textContent = this.#filmTitle;
        
        modalContainer.appendChild(modalAudioInfo);
        modalAudioInfo.appendChild(modalRating);
        modalAudioInfo.appendChild(modalTitle);
    
        const modalCloseBtn = document.createElement('button');
        modalCloseBtn.classList.add('modal-close-btn');
    
        const modalCloseBtnSpan = document.createElement('span');
        
        modalCloseBtn.appendChild(modalCloseBtnSpan);
    
        this.#modalAudio = document.createElement('audio');
        this.#modalAudio.classList.add('modal-audio');
        this.#modalAudio.setAttribute('src', `audios/${this.#audio}`);
    
        this.#modalOverlay.appendChild(modalContainer);
        modalContainer.appendChild(modalCloseBtn);
        modalContainer.appendChild(this.#modalAudio);
    
        this.#modalPlayButton = new PlayButtonComponent((playing) => {
            if (playing) {
                this.#modalAudio.play();
            } else {
                this.#modalAudio.pause();
            }
        });
    
        const renderedButton = this.#modalPlayButton.render();
        modalContainer.appendChild(renderedButton);
    
        const mediaControlElement = new MediaControlsComponent(this.#modalPlayButton, this.#modalAudio);
        const renderedMediaControlElement = mediaControlElement.render();
        modalContainer.appendChild(renderedMediaControlElement);
    
        this.#closeModal(this.#modalOverlay);
        this.#closeModal(modalCloseBtn);
    
        return this.#modalOverlay;
    }

    #closeModal(element) {

        element.addEventListener('click', () => {
            document.body.classList.remove('lock');
            this.#modalOverlay.remove();
        });
    } 
}

class SlideComponent {
    #imageSrc;
    #imageAlt;
    #videoSrc;

    constructor(imageSrc, imageAlt, videoSrc) {
        this.#imageSrc = imageSrc;
        this.#imageAlt = imageAlt;
        this.#videoSrc = videoSrc;
    }

    render() {
        const movieItem = document.createElement('li');
        movieItem.classList.add('movie-item');

        const movieItemImage = document.createElement('img');
        movieItemImage.classList.add('movie-item-image');
        movieItemImage.src = this.#imageSrc;
        movieItemImage.alt = this.#imageAlt;

        const movieVideo = document.createElement('video');
        movieVideo.classList.add('movie-video');
        movieVideo.src = this.#videoSrc;

        const playButton = new PlayButtonComponent((playing) => {
            if (playing) {
                movieItem.classList.add('movie-item-playing');
                movieVideo.play();
            } else {
                movieItem.classList.remove('movie-item-playing');
                movieVideo.pause();
            }
        });

        const renderedPlayButton = playButton.render();

        const allVideos = document.querySelectorAll('.movie-video');
        allVideos.forEach((videoElem) => {
            if (videoElem !== movieVideo) {
                videoElem.pause();
                videoElem.closest('.movie-item').classList.remove('movie-item-playing');
                videoElem.parentNode.querySelector('.btn-play').classList.remove('btn-pause');
            }
        });

        const mediaControlsComponent = new MediaControlsComponent(playButton, movieVideo);
        const mediaControlsElement = mediaControlsComponent.render();

        movieItem.appendChild(movieItemImage);
        movieItem.appendChild(movieVideo);
        movieItem.appendChild(renderedPlayButton);
        movieItem.appendChild(mediaControlsElement);

        return movieItem;
    }
}

class SliderComponent {
    
    constructor(slidesData) {
        this.slidesData = slidesData;
    }

    render() {
        const sliderWrapper = document.createElement('div');
        sliderWrapper.classList.add('slider-wrapper');

        const moviesList = document.createElement('ul');
        moviesList.classList.add('movies-list');

        for (const itemData of this.slidesData) {
            const imageSrc = `images/slider/${itemData.imageSrc}`;
            const imageAlt = itemData.imageAlt;
            const videoSrc = `videos/${itemData.videoSrc}`;

            const slideComponent = new SlideComponent(imageSrc, imageAlt, videoSrc);
            const renderedSlideComponent = slideComponent.render();

            moviesList.appendChild(renderedSlideComponent);
        }

        const leftButton = document.createElement('a');
        leftButton.classList.add('btn-link', 'slider-btn-left');
        leftButton.href = '#';

        const leftButtonSvg = `
            <svg width="60" height="43" viewBox="0 0 60 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27 41.5L2 21.5M2 21.5L28 1M2 21.5L60 21.5" stroke-width="2"/>
            </svg>
        `;

        leftButton.innerHTML = leftButtonSvg;

        const rightButton = document.createElement('a');
        rightButton.classList.add('btn-link', 'slider-btn-right');
        rightButton.href = '#';

        const rightButtonSvg = `
            <svg width="60" height="43" viewBox="0 0 60 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M33 41.5L58 21.5M58 21.5L32 1M58 21.5L0 21.5" stroke-width="2"/>
            </svg> 
        `
        rightButton.innerHTML = rightButtonSvg;

        sliderWrapper.appendChild(moviesList);
        sliderWrapper.appendChild(leftButton);
        sliderWrapper.appendChild(rightButton);

        return sliderWrapper;
    }
}

class ListenButtonComponent extends AbstractBaseButtonComponent {

    constructor (buttonClick) {
        super(buttonClick);
    }

    render() {
        const listenBtn = super.renderButton('btn');
        listenBtn.textContent = 'Listen';

        listenBtn.addEventListener('click', () => {
            this._buttonClick();
        });

        return listenBtn;   
    }
}

class MovieInfoComponent {
    #movieContentData;
    #centerAlignedBlocks;

    constructor(movieContentData, centerAlignedBlocks) {
        this.#movieContentData = movieContentData;
        this.#centerAlignedBlocks = centerAlignedBlocks;
    };

    render() {
        const movieInfo = document.createElement('div');
        movieInfo.classList.add('movie-info');

        if (this.#centerAlignedBlocks) {
            movieInfo.classList.add('align-center');
        }

        const h2 = document.createElement('h2');
        h2.textContent = this.#movieContentData.header;

        const rating = document.createElement('span');
        rating.classList.add('rating');
        rating.textContent = this.#movieContentData.rating;

        const movieContent = document.createElement('div');
        movieContent.classList.add('movie-content');

        const movieDescription = document.createElement('p');
        movieDescription.classList.add('movie-description');
        movieDescription.textContent = this.#movieContentData.description;

        movieInfo.appendChild(h2);
        movieInfo.appendChild(movieContent);

        h2.appendChild(rating);
        movieContent.appendChild(movieDescription);

        const listenBtn = new ListenButtonComponent(() => {
            const filmTitle = this.#movieContentData.header;
            const filmRating = this.#movieContentData.rating;
            const audio = this.#movieContentData.audio;
    
            const modalComponent = new ModalComponent(filmTitle, filmRating, audio);
            const renderedModalComponent = modalComponent.render();
            document.body.appendChild(renderedModalComponent);
        });

        const renderedListenBtn = listenBtn.render();
        movieContent.appendChild(renderedListenBtn);

        return movieInfo;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var body = document.body;
    var menuBtn = document.querySelector('.menu-btn');
    var aboutMovieWrappers = document.querySelectorAll('.about-movie .wrapper');;

    var movieContentData = [
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

    movieContentData.forEach((movieData, index) => {
        var wrapper = aboutMovieWrappers[index];
        var movieInfo = new MovieInfoComponent(movieData, index % 3 === 2);
        var renderedMovieInfo = movieInfo.render();
        wrapper.appendChild(renderedMovieInfo);
    });

    var slidersData = [
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

    var sliderSections = document.querySelectorAll('.movie-slider');

    sliderSections.forEach(function (sliderSectionElem, index) {
        var sliderData = slidersData[index];
        var sliderWrapperComponent = new SliderComponent(sliderData);
        var renderedsliderWrapperComponent = sliderWrapperComponent.render();
 
        sliderSectionElem.querySelector('.wrapper').appendChild(renderedsliderWrapperComponent);
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

    // Adjusting media volume when volume is being dragged
    document.querySelectorAll('.movie-item').forEach(function (movieItem) {
        var volumeRange = movieItem.querySelector('.volume-control').querySelector('.volume-range');
        volumeRange.addEventListener('mousedown', function (e) {
            setVolume(volumeRange, e.pageX);

            window.addEventListener('mousemove', handleMouseMove);

            document.addEventListener('mouseup', function() {
                window.removeEventListener('mousemove', handleMouseMove);
            }, { once: true });
        });
        
        function handleMouseMove(e) {
            setVolume(volumeRange, e.pageX);
        }
    });

    initSliders(1);

    closeVideo('.slider-btn-left');
    closeVideo('.slider-btn-right');
    closeVideo('.js-listen');

    makeSmoothScroll('.submenu-link');
    makeSmoothScroll('.js-scroll-link');
});

function closeVideo(selector) {
    var elements = document.querySelectorAll(selector);

    elements.forEach(function (element) {
        element.addEventListener('click', function () {
            document.querySelectorAll('.movie-video').forEach(function (movieVideoElem) {
                movieVideoElem.pause();
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

function initSliders(initialSlide) {
    var SLIDE_STEP = -100;

    document.querySelectorAll('.slider-wrapper').forEach(function (sliderWrapperElem) {
        var currentSlide = initialSlide;
        var moviesList = sliderWrapperElem.querySelector('.movies-list');
        var lastSlideIndex = moviesList.querySelectorAll('.movie-item').length - 1;

        moveSlide(moviesList, currentSlide);

        sliderWrapperElem.querySelector('.slider-btn-right').addEventListener('click', function (e) {
            e.preventDefault();

            if (currentSlide < lastSlideIndex) {
                currentSlide++;
                moveSlide(moviesList, currentSlide);
            }
        });

        sliderWrapperElem.querySelector('.slider-btn-left').addEventListener('click', function (e) {
            e.preventDefault();

            if (currentSlide > 0) {
                currentSlide--;
                moveSlide(moviesList, currentSlide);
            }
        });
    });

    function moveSlide(element, slide) {
        element.style.marginLeft = (slide * SLIDE_STEP) + '%';
    }
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
