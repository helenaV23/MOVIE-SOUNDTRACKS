import { IMovieData, ISectionData } from "../../models";
import { BaseSectionComponent } from "./base-section.component";
import { MovieInfoComponent } from "../movie-info.component";

export class MovieSectionComponent extends BaseSectionComponent {
    private id: number;
    private sectionData: ISectionData;
    private reverseBlock: boolean;
    private movieContentData: IMovieData;

    constructor(id: number, sectionData: ISectionData, reverseBlock: boolean, movieContentData: IMovieData) {
        super();
        this.id = id;
        this.sectionData = sectionData;
        this.reverseBlock = reverseBlock;
        this.movieContentData = movieContentData;
    }

    public render(): HTMLElement {
        const section = super.render();
        section.classList.add('about-movie');
        section.id = this.id.toString();
        this.wrapper.classList.add('push-apart');
        const img = document.createElement('img');
        img.src = `images/${this.sectionData.image}`;
        img.alt = this.sectionData.alt;
        
        this.wrapper.appendChild(img);

        if (this.reverseBlock) {
            this.wrapper.classList.add('reverse-block');
        }

        const movieInfo = new MovieInfoComponent(this.movieContentData);
        const renderedMovieInfo = movieInfo.render();
        this.wrapper.appendChild(renderedMovieInfo);

        return section;
    }
}
