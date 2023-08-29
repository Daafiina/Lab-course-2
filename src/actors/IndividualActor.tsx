import { Link } from "react-router-dom";
import Button from "../utilis/Button";
import customConfirm from "../utilis/customConfirm";
import css from "./IndividualActor.module.css";
import axios from "axios";
import { urlMovies } from "../endpoints";
import AlertContext from "../utilis/AlertContext";
import {useContext, useState} from "react";
import Authorized from "../auth/Authorized";
import { actorDTO } from "./actors.model";

export default function IndividualActor(props: actorDTO){
    const builddLink = () =>`/actors/${props.id}`
    const customAlert=useContext(AlertContext);
    const [actor, setActor] = useState<actorDTO>();
   
        const formattedDateOfBirth = new Date(props.dateOfBirth).toLocaleDateString('en-US', {
          year: 'numeric',
         
        });

return(
    <div className={css.div}>
    <div className={css.actorcontainer}>
      <Link to={builddLink()} className={css.actorlink}>
          <img alt="Actor" src={props.picture} className={css.actorposter} />
          <p className={css.actorName}>{props.name} ({formattedDateOfBirth})</p>
          
      </Link>
      </div>
      </div>
)
}