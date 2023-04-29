export interface movieDTO{
    id:number;
    title:string;
    poster:string;
}

export interface movieCreationDTO{
    title: string;
    inTheaters: boolean;
    trailer: string;
    releaseDate?: Date;
    poster?: File;
    posterURL?: string;
    genresIds?: number[];
    movieTheatersIds?: number[];
}


export interface landingPageDTO{
    inTheatres?:movieDTO[];//? e bon mu kon undifined array,se me 0 element i bje qe smundet me pas asni ele ne array
    upComingMoives?:movieDTO[]
}