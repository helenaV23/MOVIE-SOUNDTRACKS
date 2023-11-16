import { IMovieComponent } from "../models";

export class ScrollService {
    private movieComponents: IMovieComponent[] = []; 

    public registerMovieComponent(movieSections: IMovieComponent): void {
        this.movieComponents.push(movieSections);
    }
}
