import { IComponent } from "../../models";

export class PlayButtonComponent implements IComponent {
    private button: HTMLElement;
    private playing: boolean;
    private buttonClick: (playing: boolean) => void;

    constructor(buttonClick: (playing: boolean) => void) {
        this.playing = false;
        this.buttonClick = buttonClick;
    }

    public render(): HTMLElement {
        this.button = document.createElement('button'); 
        this.button.classList.add('btn-play');
    
        this.button.addEventListener('click', () => {
            this.playing = !this.playing;
    
            if (this.playing) {
                this.button.classList.add('btn-pause');
            } else {
                this.button.classList.remove('btn-pause');
            }

            this.buttonClick(this.playing);
        });

        return this.button;
    }

    public reset(): void {
        this.button.classList.remove('btn-pause');
    }
}
