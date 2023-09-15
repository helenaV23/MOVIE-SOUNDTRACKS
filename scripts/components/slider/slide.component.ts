import { IComponent } from "../../models";
import { PlayButtonComponent } from "../buttons";
import { MediaControlsComponent } from "../media-controls";

export class SlideComponent implements IComponent {
    private imageSrc: string;
    private imageAlt: string;
    private videoSrc: string;
    private movieItem: HTMLElement;
    private movieVideo: HTMLMediaElement;
    private playButton: PlayButtonComponent;

    constructor(imageSrc: string, imageAlt: string, videoSrc: string) {
        this.imageSrc = imageSrc;
        this.imageAlt = imageAlt;
        this.videoSrc = videoSrc;
    }

    public render(): HTMLElement {
        this.movieItem = document.createElement('li');
        this.movieItem.classList.add('movie-item');

        const movieItemImage = document.createElement('img');
        movieItemImage.classList.add('movie-item-image');
        movieItemImage.src = this.imageSrc;
        movieItemImage.alt = this.imageAlt;

        this.movieVideo = document.createElement('video');
        this.movieVideo.classList.add('movie-video');
        this.movieVideo.src = this.videoSrc;

        const renderedPlayButton = this.createPlayButtonComponent();
        const mediaControlsElement = this.createMediaControlsComponent();

        this.movieItem.appendChild(movieItemImage);
        this.movieItem.appendChild(this.movieVideo);
        this.movieItem.appendChild(renderedPlayButton);
        this.movieItem.appendChild(mediaControlsElement);

        return this.movieItem;
    }

    private createPlayButtonComponent(): HTMLElement {
        const playButton = new PlayButtonComponent((playing) => {
            if (playing) {
                this.movieItem.classList.add('movie-item-playing');
                this.movieVideo.play();
            } else {
                this.movieItem.classList.remove('movie-item-playing');
                this.movieVideo.pause();
            }
            this.stopAllOtherVideos();
        });

        const renderedPlayButton = playButton.render();

        return renderedPlayButton;
    }

    private createMediaControlsComponent(): HTMLElement {
        const mediaControlsComponent = new MediaControlsComponent(this.playButton, this.movieVideo);
        const mediaControlsElement = mediaControlsComponent.render();

        return mediaControlsElement;
    }

    private stopAllOtherVideos(): void {
        const allVideos = document.querySelectorAll('.movie-video');
        allVideos.forEach((videoElem: HTMLMediaElement) => {
            if (videoElem !== this.movieVideo) {
                videoElem.pause();
                videoElem.closest('.movie-item').classList.remove('movie-item-playing');
                videoElem.parentNode.querySelector('.btn-play').classList.remove('btn-pause');
            }
        });
    }
}
