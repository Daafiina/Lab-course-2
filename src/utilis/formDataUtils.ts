import { format } from "path";
import { actorCreationDTO } from "../actors/actors.model";
import { movieCreationDTO } from "../movies/movies.model";
import { bookCreationDTO } from '../Books/Books.models';

export function convertActorToFormData(actor:actorCreationDTO):FormData{
    const formData = new FormData();

    formData.append('name', actor.name);

    if (actor.biography){
        formData.append('biography', actor.biography);
    }

    if (actor.dateOfBirth){
        formData.append('dateOfBirth', formatDate(actor.dateOfBirth))
    }

    if (actor.picture){
        formData.append('picture', actor.picture);
    }

    return formData;
}

export function convertBookToFormData(book: bookCreationDTO): FormData {
    const formData = new FormData();
if(book.bookName){
    formData.append('bookName', book.bookName);

}
    if(book.author){
    formData.append('author', book.author);
}
    if(book.publishedDate){
    formData.append('publishedDate', formatDate(book.publishedDate)); 
}

    if (book.bookGenre) {
        formData.append('bookGenre', book.bookGenre);
    }

    // Add more fields as needed

    return formData;
}

export function convertMovieToFormData(movie: movieCreationDTO){
    const formData=new FormData();

    formData.append('title', movie.title);

    if(movie.summary){
        formData.append('summary', movie.summary);
    }
    formData.append('trailer', movie.trailer);
    formData.append('inTheaters', String(movie.inTheaters));

    if(movie.releaseDate){
        formData.append('releaseDate', formatDate(movie.releaseDate));
    }

    if(movie.poster){
        formData.append('poster', movie.poster);
    }

    formData.append('genresIds' , JSON.stringify(movie.genresIds));
    formData.append('MovieTheatersIds' , JSON.stringify(movie.movieTheatersIds));


    return formData;
}

function formatDate(date: Date){
    date = new Date(date);
    const format = new Intl.DateTimeFormat("en", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const [
        {value: month},,
        {value: day},,
        {value: year}
    ] = format.formatToParts(date);

    return `${year}-${month}-${day}`;
}