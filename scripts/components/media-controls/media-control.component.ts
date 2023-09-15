import { IComponent } from "../../models";
import { ProgressControlComponent } from "./progress-control.component";
import { PlayButtonComponent } from "../buttons";
import { VolumeControlComponent } from "./volume-control.component";

export class MediaControlsComponent implements IComponent {
    private playButton: PlayButtonComponent;
    private media: HTMLMediaElement;

    constructor(playButton: PlayButtonComponent, media: HTMLMediaElement) {
        this.playButton = playButton;
        this.media = media;
    }

    public render(): HTMLElement {
        const mediaControls = document.createElement('div');
        mediaControls.classList.add('media-controls');
    
        const progressControlElem = new ProgressControlComponent(this.playButton, this.media);
        const renderedProgressControlElement = progressControlElem.render();
    
        const volumeControlElement = new VolumeControlComponent((volume) => {
            this.media.volume = volume;
        });
    
        const renderedVolumeControlElement = volumeControlElement.render();
    
        mediaControls.appendChild(renderedProgressControlElement);
        mediaControls.appendChild(renderedVolumeControlElement);
    
        return mediaControls;
    }
}
