import { PlayButtonComponent } from "./buttons";
import { MediaControlsComponent } from "./media-controls";
import { IComponent } from "../models";

export class ModalComponent implements IComponent {
    private filmRating: string;
    private audio: string;
    private modalOverlay: HTMLElement;
    private modalAudio: HTMLMediaElement;
    private modalPlayButton: PlayButtonComponent;

    constructor(private filmTitle: string, filmRating: string, audio: string) {
        this.filmRating = filmRating;
        this.audio = audio;
    }

    public render(): HTMLElement {
        document.body.classList.add('lock');
        this.modalOverlay = document.createElement('div');
        this.modalOverlay.classList.add('modal-overlay');

        const modalContainer = this.createModalContainer();
        const modalAudioInfo = this.createmodalAudioInfoElem();
        
        modalContainer.appendChild(modalAudioInfo);
    
        const modalCloseBtn = document.createElement('button');
        modalCloseBtn.classList.add('modal-close-btn');
    
        const modalCloseBtnSpan = document.createElement('span');
        
        modalCloseBtn.appendChild(modalCloseBtnSpan);
    
        this.modalAudio = document.createElement('audio');
        this.modalAudio.classList.add('modal-audio');
        this.modalAudio.setAttribute('src', `audios/${this.audio}`);
    
        this.modalOverlay.appendChild(modalContainer);
        modalContainer.appendChild(modalCloseBtn);
        modalContainer.appendChild(this.modalAudio);

        const renderedButton = this.createPlayButtonComponent();
        const renderedMediaControlElement = this.createMediaControlsComponent();
    
        modalContainer.appendChild(renderedButton);
        modalContainer.appendChild(renderedMediaControlElement);
    
        this.closeModal(this.modalOverlay);
        this.closeModal(modalCloseBtn);
    
        return this.modalOverlay;
    }

    private closeModal(element: HTMLElement): void {
        element.addEventListener('click', () => {
            document.body.classList.remove('lock');
            this.modalOverlay.remove();
        });
    } 

    private createPlayButtonComponent(): HTMLElement {
        this.modalPlayButton = new PlayButtonComponent((playing) => {
            if (playing) {
                this.modalAudio.play();
            } else {
                this.modalAudio.pause();
            }
        });

        const renderedButton = this.modalPlayButton.render();

        return renderedButton;
    }

    private createMediaControlsComponent(): HTMLElement {
        const mediaControlElement = new MediaControlsComponent(this.modalPlayButton, this.modalAudio);
        const renderedMediaControlElement = mediaControlElement.render();

        return renderedMediaControlElement;
    }

    private createModalContainer(): HTMLElement {
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');
    
        modalContainer.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        return modalContainer;
    }

    private createmodalAudioInfoElem(): HTMLElement {
        const modalAudioInfo = document.createElement('div');
        modalAudioInfo.classList.add('modal-audio-info');
        
        const modalRating = document.createElement('span');
        modalRating.classList.add('modal-rating');
        modalRating.textContent = this.filmRating;
    
        const modalTitle = document.createElement('h3');
        modalTitle.classList.add('modal-title');
        modalTitle.textContent = this.filmTitle;
        modalAudioInfo.appendChild(modalRating);
        modalAudioInfo.appendChild(modalTitle);

        return modalAudioInfo;
    } 
}
