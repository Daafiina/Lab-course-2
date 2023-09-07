export interface actorDTO{
    id: number;
    name: string;
    biography: string;
    dateOfBirth: Date;
    picture: string;
    isActor:true;
}

export interface actorCreationDTO{
    name: string;
    dateOfBirth?: Date;
    picture?: File;
    pictureURL?: string;
    biography?: string;
}

export interface actorMovieDTO {
    id: number;
    name: string;
    character: string;
    picture: string;
}


export interface IndexActorsDTO{
    [x: string]: any;
    isActor?:actorDTO[];//? e bon mu kon undifined array,se me 0 element i bje qe smundet me pas asni ele ne array
   
}
