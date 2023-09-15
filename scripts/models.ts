export interface IComponent { 
    render(): HTMLElement;
}

export interface ISectionData {
    image?: string;
    alt?: string;
    sectionClass?: string;
}

export interface IMovieData {
    rating: string;
    header: string;
    description: string;
    audio: string;
}

export interface ISliderData {
    imageSrc: string;
    imageAlt: string;
    videoSrc: string;
}
