import { transform } from "typescript";
import { urlActors } from "../endpoints";
import EditEntity from "../utilis/EditEntity";
import { convertActorToFormData } from "../utilis/formDataUtils";
import ActorForm from "./ActorForm";
import { actorCreationDTO, actorDTO } from "./actors.model";

export default function EditActor(){
   
    function transform(actor: actorDTO): actorCreationDTO {
        return {
            name: actor.name,
            pictureURL: actor.picture,
            biography: actor.biography,
            dateOfBirth: new Date(actor.dateOfBirth)
        }
    }

    return (
        <div>
        <EditEntity<actorCreationDTO, actorDTO> 
         url={urlActors} indexURL="/actors" entityName="Actor" 
         transformFormData={convertActorToFormData}
         transform={transform}
        >
            {(entity, edit) => 
                <ActorForm 
                    model={entity}
                    onSubmit={async values => await edit(values)}
                />
            }
        </EditEntity>
        </div>
    )
}

