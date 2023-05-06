import { useEffect, useState } from "react";
import MoviesList from "./MoviesList"
import { landingPageDTO } from "./movies.model";
import axios, { AxiosResponse } from "axios";
import { urlMovies } from "../endpoints";
import AlertContext from "../utilis/AlertContext";

export default function LandingPage(){
    const[movies, setMovies]=useState<landingPageDTO>({});

  useEffect(()=>{
    axios.get(urlMovies).then((response: AxiosResponse<landingPageDTO>) =>{
      setMovies(response.data);
    })
  }, []);

  
  
    return(
        <AlertContext.Provider value={() =>{
          //loadData();
        }}>
      

        <h3>In Theaters</h3>
        <MoviesList movies={movies.inTheaters}/>
  
        <h3>Upcoming Realeases</h3>
        <MoviesList movies={movies.upComingReleases}/>


      </AlertContext.Provider>
    )
}