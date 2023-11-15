export interface IComponent { 
    render(): HTMLElement;
}

export interface IOnEnded {
    onEnded(): void;
}

export interface ITopData {
    helperTitle: string;
    title: string;
    description: string;
    ratingData: IMovie[];
}

export interface IMovie {
    id: number;
    title: string;
    description: string;
    imageCovers: string[];
    rating: number;
    videoUrl?: string;
    videoCoverUrl?: string;
}

export interface IMovieAudio {
    id: number;
    audioUrl: string;
}
