import axios, { AxiosResponse } from "axios"
import { urlActors } from "../endpoints"
import { useParams } from "react-router"
import { useEffect, useState } from "react";
import { response } from "express";
import { actorDTO } from "./actors.model";
import Loading from "../utilis/Loading";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import coordinateDTO from "../utilis/coordinateDTO.model";
import Map from "../utilis/Map";



export default function MovieDetails(){

    const {id} : any = useParams();
    const [actor, setActor] = useState<actorDTO>();


      
    useEffect(() =>{
        axios.get(`${urlActors}/${id}`)
        .then((response: AxiosResponse<actorDTO>) =>{
            response.data.dateOfBirth = new Date(response.data.dateOfBirth);
            setActor(response.data);
        })
    }, [id])

   



    return(
        
        actor ? <div style={{marginTop:'1REM'}}>
            <h2 style={{fontSize:"2.3rem",padding:"5px" , display:'inline',fontFamily:'sans-serif', borderBottom:'3px solid red'}}>{actor.name} </h2>
         
            <div style={{display: 'flex' , marginTop: '1rem'}}>
             
                    <img src={actor.picture}     
                        alt="poster"
                    />
                    <p style={{marginLeft:"1REM", marginRight:"10REM", fontFamily:'sans-serif'}}><h3><span style={{borderBottom:'3px solid #656a7a'}}>Bio</span>graphy:<br/></h3>{actor.biography}</p>
        </div>
       <p style={{fontFamily:'sans-serif'}}><b>Date Birth:</b> {actor.dateOfBirth.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day:'2-digit' })}</p>
        </div>
        

        : <Loading />
    )
}