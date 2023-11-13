import { SlideComponent } from "../components/slider";

export class SlideService {
    private slideComponents: SlideComponent[] = [];

    public registerSlideComponent(slideComponent: SlideComponent): void {
        this.slideComponents.push(slideComponent);
    }

    
    public stopSlideVideos(slideComponentToPlay?: SlideComponent): void {
        for (const slideComponent of this.slideComponents) {
            if (slideComponent !== slideComponentToPlay) {
                slideComponent.stopVideo();
            }
        }
    }
}
