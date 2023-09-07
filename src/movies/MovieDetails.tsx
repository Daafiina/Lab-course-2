import axios, { AxiosResponse } from "axios"
import { urlMovies, urlRatings } from "../endpoints"
import { useParams } from "react-router"
import React, { useEffect, useState } from "react";
import { response } from "express";
import { movieDTO } from "./movies.model";
import Loading from "../utilis/Loading";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import coordinateDTO from "../utilis/coordinateDTO.model";
import Map from "../utilis/Map";
import Ratings from '../utilis/Ratings';

import Swal from 'sweetalert2'



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

    const Swal = require('sweetalert2')

 // Function to handle adding the movie to the wishlist
 const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    if (!wishlist.some((item: movieDTO) => item.id === movie?.id)) {
        wishlist.push(movie);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        Swal.fire({
            icon: 'success',
            title: 'Movie Added to Wishlist!',
            html: '<a href="/wishlist" style="text-decoration:none;"><i class="bi bi-eye-fill"></i> View Wishlist</a>'
          }) 
        
        } else {
        Swal.fire({
            icon: 'error',
            title: 'Movie is already in the Wishlist!',
            html: '<a href="/wishlist" style="text-decoration:none;"><i class="bi bi-eye-fill"></i> View Wishlist</a>'
          })    }
};

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
        
    function handleRate(rate: number) {
        axios.post(urlRatings, { rating: rate, movieId: id }).then(() => {
            Swal.fire({ icon: 'success', title: 'Rating received' });
        })
    }

    return(

        movie ? <div>
            <h2>{movie.title} ({movie.releaseDate.getFullYear()})</h2>
            {movie.genres?.map(genre =>
                <Link key={genre.id} style={{marginRight: '5px'}}
                    className="btn btn-primary btn-sm rounded-pill"
                    to={`/movies/filter?genreId=${genre.id}`}
                >{genre.name}</Link>
                )} | {movie.releaseDate.toDateString()}
                    | Your vote: <Ratings maximumValue={5} selectedValue={movie.userVote}
                onChange={handleRate} /> | Average Vote: {movie.averageVote}
                

                


        movie ? <div style={{marginTop:'1REM'}}>
            <h2 style={{fontSize:"2.3rem",padding:"5px" , boxShadow:'0px 1px 15px 5px lightgrey', display:'inline'}}>{movie.title} ({movie.releaseDate.getFullYear()})</h2>
         
        <div style={{display:'flex'}}>
            <div style={{display: 'flex' , marginTop: '1rem'}}>
                <span style={{display: 'inline-block', marginRight: '1rem'}}>
                    <img src={movie.poster} 
                        style={{width: '100%', height: '100%'}}
                        alt="poster"
                    />
                </span>
                
            </div>
            {movie.summary ? <div style={{marginRight: '1%', marginTop:'1%'}}>
                 {/* Wishlist button */}
<button onClick={addToWishlist} style={{backgroundColor:'#0D6EFD', color:'white', border:'none', borderRadius:'20px', padding:'5px 10px 5px 10px'}}>Add to Wishlist  <i className="bi bi-heart-fill text-danger"></i> {/* Bootstrap Heart Icon */}</button>
                <h3>Summary</h3>
                <div>
                    <ReactMarkdown>{movie.summary}</ReactMarkdown>
                </div>
                </div>: null
            }
        </div>
           

        {/* Genres */}
        <div className="divvv" style={{marginTop:'1%', marginBottom:'1%'}}>
                    {movie.genres?.map(genre =>
                        <Link key={genre.id} style={{marginRight: '5px'}}
                            className="btn btn-primary btn-sm rounded-pill"
                            to={`/movies/filter?genreId=${genre.id}`}
                        >{genre.name}</Link>
                        )} | {movie.releaseDate.toDateString()}
            </div>
        <div style={{display:'flex'}}>
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

        </div>
            {movie.movieTheaters && movie.movieTheaters.length > 0 ? <div>
                <h2>Showing on</h2>
                <Map coordinates={transformCoordinates()} readonly={true} />
            </div> : null} 

            </div>

        </div> : <Loading />
        
    )}