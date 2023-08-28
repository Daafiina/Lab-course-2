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
      

      
      <div className="container">
        <h1 style={{ fontSize: '30px', fontWeight: '500', marginBottom: '20px', marginTop:'20px', marginLeft:'2%'}}>
          <span style={{ borderBottom: '3.5px solid #DC4B71', marginLeft: '10px',  }}>La</span>test Movies
        </h1>
      </div>
            <MoviesList movies={movies.inTheaters}/>
  
        <h3>Upcoming Realeases</h3>
        <MoviesList movies={movies.upComingReleases}/>


      </AlertContext.Provider>
    )
}