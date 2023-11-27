import { IMovie, IMovieAudio, ITopData } from "../models";

export class DataService {
    private data: ITopData;

    public getData(callback: (data: ITopData) => void): void {
        if (!this.data) {
            this.fetchData(callback);
        } else {
            callback(this.data);
        }
    }

    public getRating(callback: (ratingData: IMovie[]) => void): void {
        if (!this.data) {
            this.fetchData((d) => {
                callback(d.ratingData);
            });
        } else {
            callback(this.data.ratingData);
        }
    }

    public getAudio(id: number, callback: (audioData: IMovieAudio) => void): void {
        this.sendRequest<IMovieAudio>(`/movies-top/audios/${id}`, (audio) => {
            callback(audio);
        });
    } 

    private fetchData(callback: (data: ITopData) => void): void {
        this.sendRequest<ITopData>('/movies-top', (data) => {
            data.ratingData.sort((a, b) => b.rating - a.rating);
            this.data = data;
            callback(this.data);
        });
    }

    private sendRequest<T>(path: string, onload: (response: T) => void): void {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', path);
        xhr.addEventListener('load', () => {
            onload(JSON.parse(xhr.response) as T);
        });
        xhr.send();
    }
}
