import { IMovie, IMovieAudio, ITopData } from "../models";

const data: ITopData = {
    helperTitle: 'The 10',
    title: 'best movie soundtracks of all-time',
    description: 'Awesome movie soundtracks can turn a good movie like Guardians Of The Galaxy or Star Wars into iconic ones.',
    ratingData: [
        {
            id: 3421,
            title: '2001: A SPACE ODYSSEY',
            description: 'The movie tries very hard to sell the idea of what space exploration would be like, and its themes of isolation and sophistication are further enhanced by its soundtrack. 2001: A Space Odyssey makes use of classical themes and motifs to narrow down a tone that makes the movie feel all its own.',
            imageCovers: ['space-odyssey.png'],
            rating: 3,
            videoUrl: '2001-a-space-odyssey.mp4',
            videoCoverUrl: 'odyssey-video.png',
        },
        {
            id: 867,
            title: 'STAR WARS: A NEW HOPE',
            description: 'When Star Wars: A New Hope was released, it introduced many iconic themes that people would recognize decades after. That was thanks to John Williams, who put together the iconic fanfare, the Imperial March, and so many more great tracks.',
            imageCovers: ['starwars-the-mandalorian.svg', 'star-wars-skywalker.svg'],
            rating: 8,
            videoUrl: 'star-wars-a-new-hope.mp4',
            videoCoverUrl: 'star-wars-video.png',
        },
        {
            id: 1364,
            title: 'THE GODFATHER',
            description: 'The Godfather is one of cinema`s best works. There are so many pieces in that movie that just work, and the soundtrack is part of it. Because the movie deals with crime, gangs, and the works, the music is designed to reflect that.',
            imageCovers: ['godfather-left.svg', 'godfather-right.svg'],
            rating: 2,
            videoUrl: 'the-godfather.mp4',
            videoCoverUrl: 'godfather-video.png',
        },
        {
            id: 980,
            title: 'BABY DRIVER',
            description: 'Baby Driver`s soundtrack is similar to Guardians of the Galaxy in many ways. It uses a lot of older songs to provide a backdrop to the films many beats. However, what Edgar Wright did with the music was so far beyond that.',
            imageCovers: ['baby-driver-banner.png'],
            rating: 7,
            videoUrl: 'baby-driver.mp4',
            videoCoverUrl: 'baby-driver-video.png',
        },
        {
            id: 5632,
            title: 'BLADE RUNNER',
            description: 'It`s astounding that Blade Runner didn`t become as popular as other movies released in its time. It arguably has one of the best soundtracks in movie history, with every tune being a perfect match with the action on-screen.',
            imageCovers: ['bladerunner-women.svg', 'blade-runner-man.svg'],
            rating: 5,
            videoUrl: 'blade-runner.mp4',
            videoCoverUrl: 'culture-bladerunner.png',
        },
        {
            id: 876,
            title: 'JURASSIC PARK',
            description: 'John Williams did a lot of music for many popular franchises. After his work on Star Wars, he would later do the score for Jurassic Park. This dinosaur film was full of epic shots and tense moments that were further brought to life by Williams` music.',
            imageCovers: ['jurassic-park.png'],
            rating: 9,
            videoUrl: 'jurassic-park.mp4',
            videoCoverUrl: 'the-lost-world-jurassic-park-video.png',
        },
        {
            id: 2434,
            title: 'GUARDIANS OF THE GALAXY VOL. 2',
            description: 'While the Awesome Mix Vol. 1 in Guardians of the Galaxy was resonant with a lot of people, it was the soundtrack in Guardians of the Galaxy Vol. 2 that improved  on the formula. The first film featured songs that were fun and upbeat but didn`t have much to do with the film`s story.',
            imageCovers: ['guardians-of-the-galaxy.png'],
            rating: 10,
            videoUrl: 'guardinas-of-the-galaxy-vol-2.mp4',
            videoCoverUrl: 'guardians-video.png',
        },
        {
            id: 232,
            title: 'O BROTHER, WHERE ART THOU?',
            description: 'O Brother, Where Art Thou? is a movie that fires on all cylinders. It takes place in the Great Depression and involves a group of convicts who go on a wild journey to find a treasure of sorts. With this film based in a stylistic period in history, the soundtrack was designed to match it.',
            imageCovers: ['o-brother-where-art-thou.png'],
            rating: 4,
            videoUrl: 'o-brother-where-art-thou.mp4',
            videoCoverUrl: 'o-brother-video.png',
        },
        {
            id: 610,
            title: 'THE LORD OF THE RINGS',
            description: 'Everything about the soundtrack in The Lord of the Rings is excellent, which is one of the many reasons that the trilogy remains one of the most beloved in cinema history. Where Peter Jackson had a frame of reference with Tolkien`s detailed descriptions, Howard Shore had to match those visuals with music all his own.',
            imageCovers: ['the-lord-of-rings.png'],
            rating: 1,
        }, 
        {
            id: 456,
            title: 'GOODFELLAS',
            description: 'Martin Scorcese`s movie Goodfellas remains one of his best to date. The movie deals with gangs, drugs, and everything else  in between. It`s a crime movie that isn`t afraid to deal with the dark side of life. Going along with every scene is a great soundtrack full of hand-picked songs that compliment every moment they appear in.',
            imageCovers: ['goodfellas-banner.png'],
            rating: 6,
            videoUrl: 'goodfellas.mp4',
            videoCoverUrl: 'goodfellas-video.png',
        }
    ]
};

const audioData: IMovieAudio[] = [
    {
        id: 3421,
        audioUrl: '2001-a-space-odyssey.ogg',
    },
    {
        id: 867,
        audioUrl: 'star-wars-a-new-hope.ogg',
    },
    {
        id: 1364,
        audioUrl: 'the-godfather.ogg',
    },
    {
        id: 980,
        audioUrl: 'baby-driver.ogg',
    },
    {
        id: 5632,
        audioUrl: 'blade-runner.ogg',
    },
    {
        id: 876,
        audioUrl: 'jurassic-park.ogg',
    },
    {
        id: 2434,
        audioUrl: 'guardinas-of-the-galaxy-vol-2.ogg',
    },
    {
        id: 232,
        audioUrl: 'o-brother-where-art-thou.ogg',
    },
    {
        id: 610,
        audioUrl: 'the-lord-of-the-rings.ogg',
    }, 
    {
        id: 456,
        audioUrl: 'goodfellas.ogg',
    }
];

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
        callback(audioData.find(item => item.id === id));
    } 

    private fetchData(callback: (data: ITopData) => void): void {
        data.ratingData.sort((a, b) => b.rating - a.rating);
        this.data = data;
        callback(this.data);  
    }
}
