import { IMovie} from "../../models";
import { SliderComponent } from "../slider/slider.component";
import { BaseSectionComponent } from "./base-section.component";

export class SliderSectionComponent extends BaseSectionComponent {
    private movieData: IMovie[];

    constructor(movieData: IMovie[]) {
        super();
        this.movieData = movieData;
    }

    public render(): HTMLElement {
        const section = super.render();
        section.classList.add('movie-slider');

        const sliderComponent = new SliderComponent(this.movieData, 1);
        const renderedSliderComponent = sliderComponent.render();
        
        this.wrapper.appendChild(renderedSliderComponent);
        return section;
    }
}
