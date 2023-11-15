import { DataService } from "../services/data.service";
import { ServiceLocator, Services } from "../services/service-locator";
import { SlideService } from "../services/slide.service";
import { FooterComponent } from "./footer.component";
import { HeaderComponent } from "./header.component";
import { MainScreenSectionComponent, MovieCentralSectionComponent, MovieSectionComponent, SignUpSectionComponent } from "./sections";
import { SliderSectionComponent } from "./sections/slider-section.component";

export class AppComponent {
    private dataService: DataService;
    
    public init(): void {
        this.resisterServices();

        const body = document.body;
        const main = document.createElement('main');
        body.appendChild(main);

        const header = new HeaderComponent();
        const renderedHeader = header.render();
        body.appendChild(renderedHeader);
    
        const mainScreen = new MainScreenSectionComponent();
        const renderedMainScreen = mainScreen.render();
        main.appendChild(renderedMainScreen);
        const ratingData = this.dataService.getRating();
        
        ratingData.forEach((dataItem, index) => {
            const id = ratingData.length - index;
            const reverseBlock = index % 3 === 1;
    
            if (index % 3 === 2) {
                const centralSection = new MovieCentralSectionComponent(id, dataItem);
                const renderedSection = centralSection.render();
                main.appendChild(renderedSection);
                
                const sliderData = ratingData.slice(index - 2, index + 1);
                
                const slider = new SliderSectionComponent(sliderData);
                const renderedSlider = slider.render();
                main.appendChild(renderedSlider);
            } else {
                const section = new MovieSectionComponent(id, dataItem, reverseBlock);
                const renderedSection = section.render();
                main.appendChild(renderedSection);
            }
        });
    
        const signUp = new SignUpSectionComponent();
        const renderedSection = signUp.render();
        main.appendChild(renderedSection);
    
        const footer = new FooterComponent();
        const renderedFooter = footer.render();
        body.appendChild(renderedFooter);
    }

    private resisterServices(): void {
        this.dataService = new DataService();

        ServiceLocator.register(Services.dataService, this.dataService);
        ServiceLocator.register(Services.slideService, new SlideService());
    }
}
