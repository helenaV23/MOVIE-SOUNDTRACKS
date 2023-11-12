import { IComponent, IOnEnded } from "../../models";
import { ProgressControlComponent } from "./progress-control.component";
import { VolumeControlComponent } from "./volume-control.component";

export class MediaControlsComponent implements IComponent {
    private onEndedComponent: IOnEnded;
    private media: HTMLMediaElement;

    constructor(onEndedComponent: IOnEnded, media: HTMLMediaElement) {
        this.onEndedComponent = onEndedComponent;
        this.media = media;
    }

    public render(): HTMLElement {
        const mediaControls = document.createElement('div');
        mediaControls.classList.add('media-controls');
    
        const progressControlElem = new ProgressControlComponent(this.onEndedComponent, this.media);
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
