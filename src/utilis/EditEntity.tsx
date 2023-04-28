import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import DisplayErrors from "./DisplayErrors";
import Loading from "./Loading";


export default function EditEntity<TCreation,TRead>(
    props:editEntityProps<TCreation,TRead>){

    const {id}: any = useParams();
    const[entity,setEntity]=useState<TCreation>();
    const [errors, setErrors] = useState<string[]>([]);
    const history=useHistory();

    useEffect(()=>{
        axios.get(`${props.url}/${id}`)
        .then((response:AxiosResponse<TRead>)=>{
            setEntity(props.transform(response.data));
            
        })
    },[id]);

    async function edit(entityToEdit:TCreation) {
        try{
            await axios.put(`${props.url}/${id}`,entityToEdit);
            history.push(props.indexURL);
        }catch(error){
            console.log(error);
        }
        
    }

    return(
        <>
        <h3>Edit {props.entityName}</h3>
            <DisplayErrors errors={errors} />
            {entity ? props.children(entity,edit) : <Loading/>}
            </>

    )
}

interface editEntityProps<TCreation,TRead>{
    url:string;
    transform(entity:TRead):TCreation;
    entityName:string;
    indexURL:string;
    children(entity:TCreation,edit:(entity:TCreation)=>void):ReactElement;
}

EditEntity.defaultProps=
{
    transform:(entity:any)=>entity
}