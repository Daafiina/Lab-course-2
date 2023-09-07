import { movieDTO } from "./movies.model";
import css from './IndividualMovie.module.css';
import { Link, useParams } from "react-router-dom";
import Button from "../utilis/Button";
import customConfirm from "../utilis/customConfirm";
import axios from "axios";
import { urlMovies } from "../endpoints";
import AlertContext from "../utilis/AlertContext";
import {useContext, useState} from "react";
import Authorized from "../auth/Authorized";

export default function IndividualMovie(props: movieDTO){

    const buildLink = () =>`/movie/${props.id}`
    const customAlert=useContext(AlertContext);
    const [movie, setMovie] = useState<movieDTO>();
    const {id} : any = useParams();

    function deleteMovie(){
        axios.delete(`${urlMovies}/${props.id}`)
            .then(() =>{
                customAlert();
            });
    }



    
    const Swal = require('sweetalert2')

 
    return(
        <div className={css.div}>
            <div className={css.moviecontainer}>
                <Link to={buildLink()} className={css.movielink}>
                    <img alt="Poster" src={props.poster} className={css.movieposter} />
                    <p className={css.movietitle}>{props.title} <br/>  
                    <button style={{border:"none", backgroundColor:'none'}}>Add to wishlist <i className="bi bi-heart"></i></button></p>
                </Link>     
            </div>

                <Authorized
                    role="admin"
                    authorized={<>
                    <div>
                    <Link style={{marginRight: '1rem'}} className="btn btn-info"
                        to={`/movies/edit/${props.id}`}
                    >Edit</Link>
                    <Button
                    onClick={() => customConfirm(() => deleteMovie())}
                    className="btn btn-danger"
                    >Delete</Button>
                </div>
                    </>}
                />  
            
        </div>
    )
}