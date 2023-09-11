import { IMovieData, ISectionData } from "../../models";
import { BaseSectionComponent } from "./base-section.component";
import { MovieInfoComponent } from "../movie-info.component";

export class MovieCentralSectionComponent extends BaseSectionComponent {
    private id: number;
    private sectionData: ISectionData;
    private movieContent: IMovieData;

    constructor(id: number, sectionData: ISectionData, movieContent: IMovieData) {
        super();
        this.id = id;
        this.sectionData = sectionData;
        this.movieContent = movieContent;
    }

    public render(): HTMLElement {
        const section = super.render();
        section.classList.add('about-movie', 'movie-heroes', this.sectionData.sectionClass);
        section.id = this.id.toString();
        const movieInfo = new MovieInfoComponent(this.movieContent, true);
        const renderedMovieInfo = movieInfo.render();
        this.wrapper.appendChild(renderedMovieInfo);

        return section;
    }
}
