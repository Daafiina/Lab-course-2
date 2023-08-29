  import React, { useEffect, useState } from "react";
  import MoviesList from "./MoviesList";
  import { landingPageDTO, movieDTO } from "./movies.model";
  import axios, { AxiosResponse } from "axios";
  import { urlMovies } from "../endpoints";
  import AlertContext from "../utilis/AlertContext";
  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'bootstrap-icons/font/bootstrap-icons.css';
  
  export default function LandingPage() {
    const [movies, setMovies] = useState<landingPageDTO>({});
    const [sortedMovies, setSortedMovies] = useState<movieDTO[]>([]);
    const [isSorted, setIsSorted] = useState(false);

    useEffect(() => {
      axios.get(urlMovies).then((response: AxiosResponse<landingPageDTO>) => {
        setMovies(response.data);
        setSortedMovies([...response.data.inTheaters]);
      });
    }, []);

    const handleSort = () => {
      if (isSorted) {
        setSortedMovies([...movies.inTheaters]);
      } else {
        const sorted = [...sortedMovies].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setSortedMovies(sorted);
      }
      setIsSorted(!isSorted);
    };

    return (
      <AlertContext.Provider value={() => {}}>
        <div className="containerOfButton" style={{display:'flex', justifyContent:'space-between', marginTop:'14px', marginLeft:'3REM', marginRight:'3REM'}}>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "500",
              // marginBottom: "20px",
              // marginTop: "20px",
              // marginLeft: "2%",
            }}
          >
            <span style={{ borderBottom: "3.5px solid #DC4B71" }}>
              La
            </span>
            test Movies
          </h1>
          <button onClick={handleSort} className="btn btn-primary" style={{border:'none'}}>
        {isSorted ? (
          <>
           <b><i className="bi bi-sort-alpha-down-alt"style={{fontSize:'18px', fontWeight:'bold'}}></i></b> Reset default Sort
          </>
        ) : (
          <>
             <i className="bi bi-sort-alpha-down" style={{fontSize:'18px', fontWeight:'bold'}}></i> Sort Alphabeticaly
          </>
        )}
      </button>
        </div>
        
        <MoviesList movies={isSorted ? sortedMovies : movies.inTheaters} />

        <div className="container">
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "500",
              marginBottom: "20px",
              marginTop: "20px",
              marginLeft: "2%",
            }}
          >
            <span style={{ borderBottom: "3.5px solid #DC4B71", marginLeft: "10px" }}>
              Up
            </span>
            coming Releases
          </h1>
        </div>
        <MoviesList movies={movies.upComingReleases} />
      </AlertContext.Provider>
    );
  }
