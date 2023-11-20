import { IComponent, IOnEnded } from "../../models";
import { PlayButtonComponent } from "../buttons";
import { MediaControlsComponent } from "../media-controls";
import { ServiceLocator, Services, SlideService } from "../../services";

export class SlideComponent implements IComponent, IOnEnded {
    private imageSrc: string;
    private imageAlt: string;
    private videoSrc: string;
    private movieItem: HTMLElement;
    private movieVideo: HTMLMediaElement;
    private playButton: PlayButtonComponent;
    private slideService: SlideService = ServiceLocator.inject<SlideService>(Services.slideService);

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

    public stopVideo(): void {
        this.movieVideo.pause();
        this.movieItem.classList.remove('movie-item-playing');
        this.playButton.onEnded();
    }

    public onEnded(): void {
        this.movieItem.classList.remove('movie-item-playing');
        this.playButton.onEnded();
    }

    private createPlayButtonComponent(): HTMLElement {
        this.playButton = new PlayButtonComponent((playing) => {
            if (playing) {
                this.movieItem.classList.add('movie-item-playing');
                this.movieVideo.play();
            } else {
                this.movieItem.classList.remove('movie-item-playing');
                this.movieVideo.pause();
            }
            this.slideService.stopSlideVideos(this);
        });

        return this.playButton.render();
    }

    private createMediaControlsComponent(): HTMLElement {
        const mediaControlsComponent = new MediaControlsComponent(this, this.movieVideo);
        const mediaControlsElement = mediaControlsComponent.render();

        return mediaControlsElement;
    }
}
