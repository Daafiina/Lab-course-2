import { actorMovieDTO } from "../actors/actors.model";
import { genreDTO } from "../genres/genres.model";
import { movieTheaterDTO } from "../movietheaters/movieTheater.model";

export interface movieDTO{
    id:number;
    title:string;
    poster:string;
    inTheaters: boolean;
    trailer: string;
    summary?: string;
    releaseDate: Date;
    genres: genreDTO[];
    movieTheaters: movieTheaterDTO[];
    userVote: number;
    averageVote: number;

}

export interface movieCreationDTO{
    title: string;
    inTheaters: boolean;
    trailer: string;
    summary?: string;
    releaseDate?: Date;
    poster?: File;
    posterURL?: string;
    genresIds?: number[];
    movieTheatersIds?: number[];
}


export interface landingPageDTO{
    [x: string]: any;
    inTheatres?:movieDTO[];//? e bon mu kon undifined array,se me 0 element i bje qe smundet me pas asni ele ne array
    upComingMoives?:movieDTO[]
}

export interface moviesPostGetDTO{
    genres: genreDTO[];
    movieTheaters: movieTheaterDTO[];
}

export interface moviePutGetDTO{
    movie: movieDTO;
    selectedGenres: genreDTO[];
    nonSelectedGenres: genreDTO[];
    selectedMovieTheaters: movieTheaterDTO[];
    nonSelectedMovieTheaters: movieTheaterDTO[];
}