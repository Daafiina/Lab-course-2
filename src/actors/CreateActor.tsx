import axios from "axios";
import { convertActorToFormData } from "../utilis/formDataUtils";
import ActorForm from "./ActorForm";
import { actorCreationDTO } from "./actors.model";
import { urlActors } from "../endpoints";
import { useHistory } from "react-router";

export default function CreateActor(){

const history = useHistory();

async function create(actor: actorCreationDTO){
    try{
        console.log('Creating book:', actor);

        const formData = convertActorToFormData(actor);
        console.log('FormData:', formData);

        await axios({
            method: 'post',
            url: urlActors,
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'}
        });
        history.push('/actors');
    }
catch(error){
                console.log(error);
           }
    }


return (
    <>
        <h3>Create Actor</h3>
        
        <ActorForm model={{name: '', dateOfBirth: undefined}}
            onSubmit={async values => await create(values)}
        />
    </>
)
}