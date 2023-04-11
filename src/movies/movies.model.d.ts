export interface movieDTO{
    id:number;
    title:string;
    poster:string;
}


export interface landingPageDTO{
    inTheatres?:movieDTO[];//? e bon mu kon undifined array,se me 0 element i bje qe smundet me pas asni ele ne array
    upComingMoives?:movieDTO[]
}