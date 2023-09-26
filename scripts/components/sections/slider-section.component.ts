import { ISliderData } from "../../models";
import { SliderComponent } from "../slider/slider.component";
import { BaseSectionComponent } from "./base-section.component";

export class SliderSectionComponent extends BaseSectionComponent {
    private sliderData: ISliderData[];

    constructor(sliderData: ISliderData[]) {
        super();
        this.sliderData = sliderData;
    }

    public render(): HTMLElement {
        const section = super.render();
        section.classList.add('movie-slider');

        const sliderComponent = new SliderComponent(this.sliderData, 1);
        const renderedSliderComponent = sliderComponent.render();
        
        this.wrapper.appendChild(renderedSliderComponent);
        return section;
    }
}
