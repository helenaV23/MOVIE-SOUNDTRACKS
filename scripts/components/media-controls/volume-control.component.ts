import { IComponent } from "../../models";

export class VolumeControlComponent implements IComponent {
    private volumeChange: (volume: number) => void;
    private volumeIcon: HTMLElement;
    private volume: HTMLElement;

    constructor(volumeChange: (volume: number) => void) {
        this.volumeChange = volumeChange;
    }

    public render(): HTMLElement {
        const volumeControlDiv = document.createElement('div');
        volumeControlDiv.classList.add('volume-control');

        this.volumeIcon = document.createElement('img');
        this.volumeIcon.classList.add('volume-icon');
        this.volumeIcon.setAttribute('src', 'images/player/volume.svg');
        this.volumeIcon.setAttribute('alt', 'volume-icon');

        const volumeRange = this.createVolumeRange();
        
        this.volume = document.createElement('div');
        this.volume.classList.add('volume');
        volumeRange.appendChild(this.volume);

        volumeControlDiv.appendChild(this.volumeIcon);
        volumeControlDiv.appendChild(volumeRange);

        return volumeControlDiv;
    }

    private createVolumeRange(): HTMLElement {
        const volumeRange = document.createElement('div');
        volumeRange.classList.add('volume-range');
        volumeRange.addEventListener('mousedown', (e) => {
            this.setVolume(volumeRange, e.pageX);

            window.addEventListener('mousemove', handleMouseMove);

            document.addEventListener('mouseup', () => {
                window.removeEventListener('mousemove', handleMouseMove);
            }, { once: true });
        });

        const handleMouseMove = (e: MouseEvent) => {
            this.setVolume(volumeRange, e.pageX);
        };

        return volumeRange;
    }

    private setVolume(element: HTMLElement, eventXPosition: number): void {
        const volumeRangeWidth = element.offsetWidth;
        const volumeRangeLeftPostion = element.getBoundingClientRect().left;
        const x = eventXPosition - volumeRangeLeftPostion;
        let volume = x / volumeRangeWidth;

        if (volume <= 0) {
            volume = 0;
        } else if (volume > 1) {
            volume = 1;
        }

        this.volume.style.width = `${volume * 100}%`;
        const icon = volume <= 0 ? 'images/player/mute.svg' : 'images/player/volume.svg';
        this.volumeIcon.setAttribute('src', icon);
    
        this.volumeChange(volume);  
    }
}
