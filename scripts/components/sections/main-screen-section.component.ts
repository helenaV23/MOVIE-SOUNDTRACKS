import { IComponent, ITopData } from "../../models";
import { BaseSectionComponent } from "./base-section.component";

export class MainScreenSectionComponent extends BaseSectionComponent implements IComponent {
    private topData: ITopData;

    constructor(topData: ITopData) {
        super();
        this.topData = topData;
    }

    public render(): HTMLElement {
        const section = super.render();
        section.classList.add('main-screen');

        const title = document.createElement('h1');
        const accentTitle = document.createElement('span');
        accentTitle.classList.add('accent-title');
        accentTitle.textContent = this.topData.helperTitle;
        title.appendChild(accentTitle);
        title.appendChild(document.createTextNode(this.topData.title));

        const mainScreenDescription = document.createElement('p');
        mainScreenDescription.classList.add('main-screen-description');
        mainScreenDescription.textContent = this.topData.description;

        const scrollLink = document.createElement('a');
        scrollLink.classList.add('btn-link', 'js-scroll-link');
        scrollLink.href = `#rating-${this.topData.ratingData[0].rating}`;
        
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
