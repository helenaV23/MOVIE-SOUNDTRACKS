import { IComponent } from "../../models";
import { DataService } from "../../services/data.service";
import { ScrollService } from "../../services/scroll.service";
import { ServiceLocator, Services } from "../../services/service-locator";
import { BaseSectionComponent } from "./base-section.component";

export class MainScreenSectionComponent extends BaseSectionComponent implements IComponent {
    private dataService: DataService = ServiceLocator.inject<DataService>(Services.dataService);
    private scrollService: ScrollService = ServiceLocator.inject<ScrollService>(Services.scrollService);

    public render(): HTMLElement {
        const data = this.dataService.getData();

        const section = super.render();
        section.classList.add('main-screen');

        const title = document.createElement('h1');
        const accentTitle = document.createElement('span');
        accentTitle.classList.add('accent-title');
        accentTitle.textContent = data.helperTitle;
        title.appendChild(accentTitle);
        title.appendChild(document.createTextNode(data.title));

        const mainScreenDescription = document.createElement('p');
        mainScreenDescription.classList.add('main-screen-description');
        mainScreenDescription.textContent = data.description;

        const scrollLink = document.createElement('a');
        scrollLink.classList.add('btn-link');
        scrollLink.href = '#';
        scrollLink.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();

            this.scrollService.scrollToSection(data.ratingData[0].id);
        });

        const buttonSvg = `
            <svg width="43" height="60" viewBox="0 0 43 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 33L21 58M21 58L41.5 32M21 58V0" stroke-width="2"/>
            </svg>
        `;
        scrollLink.innerHTML = buttonSvg;

        this.wrapper.appendChild(title);
        this.wrapper.appendChild(mainScreenDescription);
        this.wrapper.appendChild(scrollLink);

        return section;
    }
}
