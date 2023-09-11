import { IComponent, ISliderData } from "../../models";
import { SlideComponent } from "./slide.component";

export class SliderComponent implements IComponent {
    private slidesData: ISliderData[];
    private moviesList: HTMLElement; 
    private leftButton: HTMLAnchorElement;
    private rightButton: HTMLAnchorElement;
    
    constructor(slidesData: ISliderData[]) {
        this.slidesData = slidesData;
    }

    public render(): HTMLElement {
        const sliderWrapper = document.createElement('div');
        sliderWrapper.classList.add('slider-wrapper');

        this.moviesList = document.createElement('ul');
        this.moviesList.classList.add('movies-list');

        this.createSlideComponent();
        this.createSvgButtons();

        sliderWrapper.appendChild(this.moviesList);
        sliderWrapper.appendChild(this.leftButton);
        sliderWrapper.appendChild(this.rightButton);

        return sliderWrapper;
    }

    private createSlideComponent(): void {
        for (const itemData of this.slidesData) {
            const imageSrc = `images/slider/${itemData.imageSrc}`;
            const imageAlt = itemData.imageAlt;
            const videoSrc = `videos/${itemData.videoSrc}`;

            const slideComponent = new SlideComponent(imageSrc, imageAlt, videoSrc);
            const renderedSlideComponent = slideComponent.render();

            this.moviesList.appendChild(renderedSlideComponent);
        }
    }

    private createSvgButtons(): void {
        this.leftButton = document.createElement('a');
        this.leftButton.classList.add('btn-link', 'slider-btn-left');
        this.leftButton.href = '#';

        const leftButtonSvg = `
            <svg width="60" height="43" viewBox="0 0 60 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27 41.5L2 21.5M2 21.5L28 1M2 21.5L60 21.5" stroke-width="2"/>
            </svg>
        `;

        this.leftButton.innerHTML = leftButtonSvg;

        this.rightButton = document.createElement('a');
        this.rightButton.classList.add('btn-link', 'slider-btn-right');
        this.rightButton.href = '#';

        const rightButtonSvg = `
            <svg width="60" height="43" viewBox="0 0 60 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M33 41.5L58 21.5M58 21.5L32 1M58 21.5L0 21.5" stroke-width="2"/>
            </svg> 
        `
        this.rightButton.innerHTML = rightButtonSvg;
    }
}
