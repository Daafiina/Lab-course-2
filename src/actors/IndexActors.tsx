import IndexEntity from "../utilis/IndexEntity";
import { actorDTO } from "./actors.model";
import { urlActors } from "../endpoints";
import ActorsList from "./ActorsList";
import { useEffect, useState } from "react";
import {IndexActorsDTO} from './actors.model'
import axios, { AxiosResponse } from "axios";
import AlertContext from "../utilis/AlertContext";

export default function IndexActors(){
    const [actors, setActor] = useState<IndexActorsDTO>({});

    useEffect(()=>{
        axios.get(urlActors).then((response: AxiosResponse<IndexActorsDTO>) =>{
            setActor(response.data);
        })
      }, []);
      return(
        <AlertContext.Provider value={() =>{
            //loadData();
          }}>
  <div className="container">
        <h1 style={{ fontSize: '30px', fontWeight: '500', marginBottom: '20px', marginTop:'20px', marginLeft:'2%'}}>
          <span style={{ borderBottom: '3.5px solid #DC4B71', marginLeft: '10px',  }}>Top Ac</span>tors of 2023
        </h1>
      </div>
        <ActorsList actors={actors.isActor}/>
      

</AlertContext.Provider>

    )
    
}