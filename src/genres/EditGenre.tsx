import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { urlGenres } from "../endpoints";
import EditEntity from "../utilis/EditEntity";
import GenreForm from "./GenreForm";
import { genreCreationDTO, genreDTO } from "./genres.model";

export default function EditGenre(){
    const {id}: any = useParams();
    const[genre,setgenre]=useState<genreCreationDTO>();
    const [errors, setErrors] = useState<string[]>([]);
    const history=useHistory();

    useEffect(()=>{
        axios.get(`${urlGenres}/${id}`)
        .then((response:AxiosResponse<genreDTO>)=>{
            setgenre(response.data);
            
        })
    },[id]);

    async function edit(genreToEdit:genreCreationDTO) {
        try{
            await axios.put(`${urlGenres}/${id}`,genreToEdit);
            history.push('/genres');
        }catch(error){
            console.log(error);
        }
        
    }

    return(
        <>
            <EditEntity<genreCreationDTO,genreDTO>
                url={urlGenres} entityName="Genres"
                indexURL="/genres">
                {(entity,edit)=>
                    <GenreForm model={entity} onSubmit={async value=>{
                        await edit(value);
                    }}
                    />
                 }
            </EditEntity>
        </>
    )
}