import { ModalComponent } from "./modal.component";
import { IComponent, IMovieData } from "../models";
import { ListenButtonComponent } from "./buttons/listen-button.component";

export class MovieInfoComponent implements IComponent {
    private movieContentData: IMovieData;
    private centerAlignedBlocks: boolean;

    constructor(movieContentData: IMovieData, centerAlignedBlocks: boolean = false) {
        this.movieContentData = movieContentData;
        this.centerAlignedBlocks = centerAlignedBlocks;
    };

    public render(): HTMLElement {
        const movieInfo = document.createElement('div');
        movieInfo.classList.add('movie-info');

        if (this.centerAlignedBlocks) {
            movieInfo.classList.add('align-center');
        }

        const h2 = document.createElement('h2');
        h2.textContent = this.movieContentData.header;

        const rating = document.createElement('span');
        rating.classList.add('rating');
        rating.textContent = this.movieContentData.rating;

        const movieContent = document.createElement('div');
        movieContent.classList.add('movie-content');

        const movieDescription = document.createElement('p');
        movieDescription.classList.add('movie-description');
        movieDescription.textContent = this.movieContentData.description;

        movieInfo.appendChild(h2);
        movieInfo.appendChild(movieContent);

        h2.appendChild(rating);
        movieContent.appendChild(movieDescription);

        const renderedListenBtn = this.createListenButtonComponent();
        movieContent.appendChild(renderedListenBtn);

        return movieInfo;
    }

    private createListenButtonComponent(): HTMLElement {
        const listenBtn = new ListenButtonComponent(() => {
            const filmTitle = this.movieContentData.header;
            const filmRating = this.movieContentData.rating;
            const audio = this.movieContentData.audio;
    
            const modalComponent = new ModalComponent(filmTitle, filmRating, audio);
            const renderedModalComponent = modalComponent.render();
            document.body.appendChild(renderedModalComponent);
        });

        const renderedListenBtn = listenBtn.render();

        return renderedListenBtn;
    }
}
