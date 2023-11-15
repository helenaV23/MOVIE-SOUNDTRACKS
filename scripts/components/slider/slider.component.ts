import { IComponent, IMovie } from "../../models";
import { SlideComponent } from "./slide.component";
import { ServiceLocator, Services } from "../../services/service-locator";
import { SlideService } from "../../services/slide.service";

export class SliderComponent implements IComponent {
    private static readonly slideStep: number = -100;
    private movieData: IMovie[];
    private moviesList: HTMLElement; 
    private leftButton: HTMLAnchorElement;
    private rightButton: HTMLAnchorElement;
    private sliderWrapper: HTMLElement;
    private currentSlide: number;
    private slideService: SlideService = ServiceLocator.inject<SlideService>(Services.slideService);
    
    constructor(movieData: IMovie[], initialSlide: number) {
        this.movieData = movieData;
        this.currentSlide = initialSlide;
    }

    public render(): HTMLElement {
        this.sliderWrapper = document.createElement('div');
        this.sliderWrapper.classList.add('slider-wrapper');

        this.moviesList = document.createElement('ul');
        this.moviesList.classList.add('movies-list');

        this.createSlideComponent();
        this.createSvgButtons();

        this.sliderWrapper.appendChild(this.moviesList);
        this.sliderWrapper.appendChild(this.leftButton);
        this.sliderWrapper.appendChild(this.rightButton);

        this.initSlider();

        return this.sliderWrapper;
    }

    private createSlideComponent(): void {
        for (const itemData of this.movieData) {
            const imageSrc = `images/slider/${itemData.videoCoverUrl}`;
            const imageAlt = `${itemData.title}-image`;
            const videoSrc = `videos/${itemData.videoUrl}`;

            const slideComponent = new SlideComponent(imageSrc, imageAlt, videoSrc);
            this.slideService.registerSlideComponent(slideComponent);
            
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

    private initSlider(): void {
        const lastSlideIndex = this.movieData.length - 1;
        
        this.moveSlide();

        this.rightButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.slideService.stopSlideVideos();

            if (this.currentSlide < lastSlideIndex) {
                this.currentSlide++;
                this.moveSlide();
            }
        });

        this.leftButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.slideService.stopSlideVideos();
            
            if (this.currentSlide > 0) {
                this.currentSlide--;
                this.moveSlide();
            }
        });
    }

    private moveSlide(): void {
        this.moviesList.style.marginLeft = `${this.currentSlide * SliderComponent.slideStep}%`;
    }
}
