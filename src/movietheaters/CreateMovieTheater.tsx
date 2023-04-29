import axios from "axios";
import MovieTheaterForm from "./MovieTheaterForm";
import { movieTheaterCreationDTO } from "./movieTheater.model";
import { urlMovieTheatres } from "../endpoints";
import { useHistory } from "react-router-dom";

export default function CreateMovieTheater(){
    const history=useHistory();
    async function create(movieTheater:movieTheaterCreationDTO)
    {
        try{
            await axios.post(urlMovieTheatres,movieTheater);
            history.push("/movietheatres")
        }
        catch(error){
            console.log(error);
        }
    }
    return(
        <>
            <h3>Create Movie Theater</h3>
            <MovieTheaterForm
                model={{name:''}}
                onSubmit={async values=>await create(values)}
            />
        </>
    )
}