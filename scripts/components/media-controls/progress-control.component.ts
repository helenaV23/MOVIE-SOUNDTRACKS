import { IComponent } from "../../models";
import { PlayButtonComponent } from "../buttons";

export class ProgressControlComponent implements IComponent {
    private mediaPlayButton: PlayButtonComponent;
    private media: HTMLMediaElement;
    private mediaTime: HTMLElement;
    private currentTime: HTMLElement;
    private timeLine: HTMLElement;
    private timeLineProgress: HTMLElement;
    private mediaDuration: HTMLElement;
    private timer: number;

    constructor(mediaPlayButton: PlayButtonComponent, media: HTMLMediaElement) {
        this.mediaPlayButton = mediaPlayButton;
        this.media = media;
    }

    public render(): HTMLElement {
        this.mediaTime = document.createElement('div');
        this.mediaTime.classList.add('media-time');
    
        this.currentTime = document.createElement('span');
        this.currentTime.classList.add('current-time');
    
        this.timeLine = document.createElement('div');
        this.timeLine.classList.add('timeline');
    
        this.timeLineProgress = document.createElement('div');
        this.timeLineProgress.classList.add('timeline-progress');
    
        this.mediaDuration = document.createElement('span');
        this.mediaDuration.classList.add('media-duration');
    
        this.mediaTime.appendChild(this.currentTime);
        this.mediaTime.appendChild(this.timeLine);
        this.mediaTime.appendChild(this.mediaDuration);
    
        this.timeLine.appendChild(this.timeLineProgress);
    
        this.showMediaTime();
    
        return this.mediaTime;
    }

    private showMediaTime(): void {
        this.timer = 0;
    
        this.media.addEventListener('loadedmetadata', () => {
            this.mediaDuration.textContent = this.formatTime(this.media.duration);
            this.currentTime.textContent = this.formatTime(0);
            this.timeLineProgress.style.width = '0';
    
            this.media.addEventListener('play', () => {
                this.showProgress();
            });
        
            this.media.addEventListener('pause', () => {
                cancelAnimationFrame(this.timer);
            });
    
            this.media.addEventListener('ended', () => {
                this.mediaPlayButton.reset();
                this.currentTime.textContent = this.formatTime(0);
                this.timeLineProgress.style.width = '0';
            });
    
            this.timeLine.addEventListener('click', (e) => {
                const progress = e.offsetX / this.timeLine.offsetWidth;
                const newCurrentTime = progress * this.media.duration;
    
                this.media.currentTime = newCurrentTime;
    
                this.currentTime.textContent = this.formatTime(newCurrentTime);
                this.timeLineProgress.style.width = `${progress * 100}%`;    
            });
        });
    }

    private showProgress(): void {
        const currTime = this.media.currentTime;
        this.currentTime.textContent = this.formatTime(currTime);

        const progress = (currTime / this.media.duration) * 100;
        this.timeLineProgress.style.width = `${progress}%`;
    
        this.timer = requestAnimationFrame(() => this.showProgress());
    }

    private formatTime(time: number): string {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time - minutes * 60);
        
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }
}
