import { IMovie} from "../../models";
import { BaseSectionComponent } from "./base-section.component";
import { MovieInfoComponent } from "../movie-info.component";

export class MovieSectionComponent extends BaseSectionComponent {
    private id: number;
    private movieData: IMovie;
    private reverseBlock: boolean;

    constructor(id: number, movieData: IMovie, reverseBlock: boolean) {
        super();
        this.id = id;
        this.movieData = movieData;
        this.reverseBlock = reverseBlock;
    }

    public render(): HTMLElement {
        const section = super.render();
        section.classList.add('about-movie');
        section.id = `rating-${this.id}`;
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

        return section;
    }
}
