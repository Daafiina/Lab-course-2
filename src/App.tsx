import { useEffect, useState } from 'react';
import './App.css';
import MoviesList from './movies/MoviesList';
import { landingPageDTO} from './movies/movies.model';



function App() {

  const[movies,setMovies]=useState<landingPageDTO>({});

  useEffect(()=>{
    const timerId=setTimeout(()=>{
      setMovies({
        inTheatres:[{ //type movieDTO
          id:1,
          title:'Spider-Man:Far from Home',
          poster:'https://upload.wikimedia.org/wikipedia/en/b/bd/Spider-Man_Far_From_Home_poster.jpg'
      
      
        },
        { //type movieDTO
          id:2,
          title:'Twilight',
          poster:'https://upload.wikimedia.org/wikipedia/en/b/b6/Twilight_%282008_film%29_poster.jpg'
      
      
        }],
      upComingMoives:[{
        id:3,
        title:'Lucifer',
        poster:'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRGZN1_0pyEzJJ8DTE0LurQp6Fu6qeIg6AwvSe1WiKeHD7n4l21'
      }
      ]

      })

    },1000);//ky funksion egzekutohet pas 1 sec

    return ()=>clearTimeout(timerId);
  });

  return(
    <div className="container">
      <h3>In Theaters</h3>
      <MoviesList movies={movies.inTheatres}/>

      <h3>Upcoming Realeases</h3>
      <MoviesList movies={movies.upComingMoives}/>
    </div>
  )
    
  
}

export default App;
