import { ModalComponent } from "./modal.component";
import { IComponent, IMovie } from "../models";
import { ListenButtonComponent } from "./buttons/listen-button.component";
import { getMovieRating } from "../utils";
import { DataService, ServiceLocator, Services, SlideService } from "../services";

export class MovieInfoComponent implements IComponent {
    private movieData: IMovie;
    private centerAlignedBlocks: boolean;
    private dataService: DataService = ServiceLocator.inject<DataService>(Services.dataService);
    private slideService: SlideService = ServiceLocator.inject<SlideService>(Services.slideService);

    constructor(movieData: IMovie, centerAlignedBlocks: boolean = false) {
        this.movieData = movieData;
        this.centerAlignedBlocks = centerAlignedBlocks;
    };

    public render(): HTMLElement {
        const movieInfo = document.createElement('div');
        movieInfo.classList.add('movie-info');

        if (this.centerAlignedBlocks) {
            movieInfo.classList.add('align-center');
        }

        const h2 = document.createElement('h2');
        h2.textContent = this.movieData.title;

        const rating = document.createElement('span');
        rating.classList.add('rating');
        rating.textContent = getMovieRating(this.movieData.rating);

        const movieContent = document.createElement('div');
        movieContent.classList.add('movie-content');

        const movieDescription = document.createElement('p');
        movieDescription.classList.add('movie-description');
        movieDescription.textContent = this.movieData.description;

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
            const { title, rating, id } = this.movieData;
            this.slideService.stopSlideVideos();
            const movieAudio = this.dataService.getAudio(id);

            const modalComponent = new ModalComponent(title, rating, movieAudio.audioUrl);
            const renderedModalComponent = modalComponent.render();
            document.body.appendChild(renderedModalComponent);
        });

        const renderedListenBtn = listenBtn.render();

        return renderedListenBtn;
    }
}
