import { IMovieComponent } from "../models";

export class ScrollService {
    private movieComponents: IMovieComponent[] = []; 

    public registerMovieComponent(movieSections: IMovieComponent): void {
        this.movieComponents.push(movieSections);
    }

    public scrollToSection(movieId: number): void {
        const movieComponent = this.movieComponents.find(item => item.getId() === movieId);
        const scrollEndElemTop = movieComponent.getContainerOffsetTop();
        const startTime = performance.now();
        const duration = 1200;

        const startScrollValue = document.documentElement.scrollTop;

        const smoothScroll = (currentTime: number) => {
            const runtime = currentTime - startTime;
            let progress = runtime / duration;

            if (progress >= 1) {
                progress = 1;
            }

            const scrollOffset = progress * scrollEndElemTop;
            document.documentElement.scrollTop = scrollOffset + startScrollValue;

            if (runtime < duration) {
                requestAnimationFrame(smoothScroll);
            }
        };

        requestAnimationFrame(smoothScroll);
    }
}
