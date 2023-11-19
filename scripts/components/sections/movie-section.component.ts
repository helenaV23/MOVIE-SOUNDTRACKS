import { IMovie, IMovieComponent } from "../../models";
import { BaseSectionComponent } from "./base-section.component";
import { MovieInfoComponent } from "../movie-info.component";

export class MovieSectionComponent extends BaseSectionComponent implements IMovieComponent {
    private movieData: IMovie;
    private reverseBlock: boolean;
    private section: HTMLElement;

    constructor(movieData: IMovie, reverseBlock: boolean) {
        super();
        this.movieData = movieData;
        this.reverseBlock = reverseBlock;
    }

    public getId(): number {
        return this.movieData.id;
    }

    public getContainerOffsetTop(): number {
        return this.section.getBoundingClientRect().top;
    }

    public render(): HTMLElement {
        this.section = super.render();
        this.section.classList.add('about-movie');
        this.wrapper.classList.add('push-apart');
        const img = document.createElement('img');
        img.src = `images/${this.movieData.imageCovers}`;

        img.alt = this.movieData.title;
        
        this.wrapper.appendChild(img);

        if (this.reverseBlock) {
            this.wrapper.classList.add('reverse-block');
        }

        const movieInfo = new MovieInfoComponent(this.movieData);
        const renderedMovieInfo = movieInfo.render();
        this.wrapper.appendChild(renderedMovieInfo);

        return this.section;
    }
}
