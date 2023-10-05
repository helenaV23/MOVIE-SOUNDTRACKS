import { IMovie } from "../../models";
import { BaseSectionComponent } from "./base-section.component";
import { MovieInfoComponent } from "../movie-info.component";

export class MovieCentralSectionComponent extends BaseSectionComponent {
    private id: number;
    private movieData: IMovie;

    constructor(id: number, movieData: IMovie) {
        super();
        this.id = id;
        this.movieData = movieData;
    }

    public render(): HTMLElement {
        const section = super.render();
        section.classList.add('about-movie', 'movie-heroes');

        const imageCovers = this.movieData.imageCovers;
        const backgroundImageStyle = imageCovers.map((imageCover) => `url("images/${imageCover}")`).join(', ');
        section.style.backgroundImage = backgroundImageStyle;

        section.id = this.id.toString();
        const movieInfo = new MovieInfoComponent(this.movieData, true);
        const renderedMovieInfo = movieInfo.render();
        this.wrapper.appendChild(renderedMovieInfo);

        return section;
    }
}
