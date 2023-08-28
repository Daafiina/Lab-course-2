import axios, { AxiosResponse } from "axios"
import { urlMovies } from "../endpoints"
import { useParams } from "react-router"
import { useEffect, useState } from "react";
import { response } from "express";
import { movieDTO } from "./movies.model";
import Loading from "../utilis/Loading";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import coordinateDTO from "../utilis/coordinateDTO.model";
import Map from "../utilis/Map";



export default function MovieDetails(){

    const {id} : any = useParams();
    const [movie, setMovie] = useState<movieDTO>();

    useEffect(() =>{
        axios.get(`${urlMovies}/${id}`)
        .then((response: AxiosResponse<movieDTO>) =>{
            response.data.releaseDate = new Date(response.data.releaseDate);
            setMovie(response.data);
        })
    }, [id])

    function transformCoordinates(): coordinateDTO[]{
        if(movie?.movieTheaters){
            const coordinates=movie.movieTheaters.map(movieTheater =>{
                return {lat: movieTheater.latitude, lng: movieTheater.longitude,
                name: movieTheater.name} as coordinateDTO
            });

            return coordinates;
        }

        return [];
    }

    function generateEmbeddedVideoURL(trailer: string) : string {
        if (!trailer){
            return '';
        }
        
        let videoId = trailer.split('v=')[1];
        if(!videoId){
            return '';
        }
        const ampersandPosition = videoId.indexOf('&');
        if(ampersandPosition !== -1){
            videoId = videoId.substring(0, ampersandPosition);
        }
        return `https://www.youtube.com/embed/${videoId}`;
    }
        


    return(
        movie ? <div>
            <h2>{movie.title} ({movie.releaseDate.getFullYear()})</h2>
         

            <div style={{display: 'flex' , marginTop: '1rem'}}>
                <span style={{display: 'inline-block', marginRight: '1rem'}}>
                    <img src={movie.poster} 
                        style={{width: '100%', height: '100%'}}
                        alt="poster"
                    />
                </span>
                
            </div>

            {/* Genres */}
            {movie.genres?.map(genre =>
                <Link key={genre.id} style={{marginRight: '5px'}}
                    className="btn btn-primary btn-sm rounded-pill"
                    to={`/movies/filter?genreId=${genre.id}`}
                >{genre.name}</Link>
                )} | {movie.releaseDate.toDateString()}


            {movie.trailer ? <div>
                    <iframe
                        title="youtube-trailer"
                        width="310"
                        height="180"
                        src={generateEmbeddedVideoURL(movie.trailer)}
                        frameBorder={0}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div> : null}
                
            {movie.summary ? <div style={{marginTop: '1rem'}}>
                <h3>Summary</h3>
                <div>
                    <ReactMarkdown>{movie.summary}</ReactMarkdown>
                </div>
                </div>: null
            }
            
            {movie.movieTheaters && movie.movieTheaters.length > 0 ? <div>
                <h2>Showing on</h2>
                <Map coordinates={transformCoordinates()} readonly={true} />
            </div> : null} 

        </div> : <Loading />
    )
}