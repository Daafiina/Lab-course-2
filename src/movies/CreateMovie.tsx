import { useEffect, useState } from "react";
import { genreDTO } from "../genres/genres.model";
import { movieTheaterDTO } from "../movietheaters/movieTheater.model";
import MovieForm from "./MovieForm";
import axios, { AxiosResponse } from "axios";
import { urlMovies } from "../endpoints";
import { movieCreationDTO, moviesPostGetDTO } from "./movies.model";
import Loading from "../utilis/Loading";
import { convertMovieToFormData } from "../utilis/formDataUtils";
import { useHistory } from "react-router";
import DisplayErrors from "../utilis/DisplayErrors";

export default function CreateMovie(){

    const [nonSelectedGenres, setNonSelectedGenres]= useState<genreDTO[]>([]);
    const [nonSelectedMovieTheaters, setNonSelectedMovieTheaters]= 
        useState<movieTheaterDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const[errors, setErrors] = useState<string[]>([]);
    const history = useHistory();

    useEffect(() =>{
        axios.get(`${urlMovies}/postget`)
            .then((response: AxiosResponse<moviesPostGetDTO>) =>{
                setNonSelectedGenres(response.data.genres);
                setNonSelectedMovieTheaters(response.data.movieTheaters);
                setLoading(false);
            })
    }, [])

    async function create(movie: movieCreationDTO){
        try{
            const formData= convertMovieToFormData(movie);
            const response = await axios({
                method: 'post',
                url: urlMovies,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            })

            history.push(`/movie/${response.data}`);

        }catch(error: any){
            setErrors(error.response.data);
        }
    }
    
    return(
        <>
            <h3>Create Movie</h3>
            <DisplayErrors errors={errors} />
            {loading ? <Loading/> :
            <MovieForm
                model={{ title: "", inTheaters: false, trailer: "" }}
                onSubmit={async values => await create(values)}
                nonSelectedGenres={nonSelectedGenres}
                selectedGenres={[]}

                nonSelectedMovieTheaters={nonSelectedMovieTheaters}
                selectedMovieTheaters={[]}
                

            /> }
        </>

   

    )
}