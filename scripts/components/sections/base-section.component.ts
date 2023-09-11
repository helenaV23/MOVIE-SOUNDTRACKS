import { IComponent } from "../../models";

export abstract class BaseSectionComponent implements IComponent {
    protected wrapper: HTMLElement;

    public render(): HTMLElement {
        const section = document.createElement('section');
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('wrapper');
        section.appendChild(this.wrapper);

        return section;
    }
}
