import { IMovie, IMovieComponent } from "../../models";
import { BaseSectionComponent } from "./base-section.component";
import { MovieInfoComponent } from "../movie-info.component";

export class MovieCentralSectionComponent extends BaseSectionComponent implements IMovieComponent {
    private movieData: IMovie;
    private section: HTMLElement;

    constructor(movieData: IMovie) {
        super();
        this.movieData = movieData;
    }

    public getId(): number {
        return this.movieData.id;
    }

    public getContainerOffsetTop(): number {
        return this.section.getBoundingClientRect().top;
    }

    public render(): HTMLElement {
        this.section = super.render();
        this.section.classList.add('about-movie', 'movie-heroes');

        const imageCovers = this.movieData.imageCovers;
        const backgroundImageStyle = imageCovers.map((imageCover) => `url("images/${imageCover}")`).join(', ');
        this.section.style.backgroundImage = backgroundImageStyle;

        const movieInfo = new MovieInfoComponent(this.movieData, true);
        const renderedMovieInfo = movieInfo.render();
        this.wrapper.appendChild(renderedMovieInfo);

        return this.section;
    }
}
