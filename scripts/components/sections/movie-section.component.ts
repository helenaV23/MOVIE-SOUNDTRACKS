import { IMovie, IMovieComponent } from "../../models";
import { BaseSectionComponent } from "./base-section.component";
import { MovieInfoComponent } from "../movie-info.component";

export class MovieSectionComponent extends BaseSectionComponent implements IMovieComponent {
    private id: number;
    private movieData: IMovie;
    private reverseBlock: boolean;
    private section: HTMLElement;

    constructor(id: number, movieData: IMovie, reverseBlock: boolean) {
        super();
        this.id = id;
        this.movieData = movieData;
        this.reverseBlock = reverseBlock;
    }

    public getId(): number {
        return this.id;
    }

    public getContainer(): HTMLElement {
        return this.section;
    }

    public render(): HTMLElement {
        this.section = super.render();
        this.section.classList.add('about-movie');
        this.section.id = `rating-${this.id}`;
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
