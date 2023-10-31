export interface IComponent { 
    render(): HTMLElement;
}

export interface ITopData {
    helperTitle: string;
    title: string;
    description: string;
    ratingData: IMovie[];
}

export interface IMovie {
    title: string;
    description: string;
    imageCovers: string[];
    rating: number;
    audioUrl: string;
    videoUrl?: string;
    videoCoverUrl?: string;
}
