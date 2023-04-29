import { Link } from "react-router-dom";
import IndexEntity from "../utilis/IndexEntity";
import { actorDTO } from "./actors.model";
import { urlActors } from "../endpoints";

export default function IndexActiors(){
    return(
        
        <IndexEntity<actorDTO>
        url={urlActors} createURL='actors/create' title="Actors"
        entityName="Actor"
    >
        {(actors, buttons) => <>
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {actors?.map(actor => <tr key={actor.id}>
                    <td>
                        {buttons(`actors/edit/${actor.id}`, actor.id)}
                    </td>
                    <td>
                        {actor.name}
                    </td>
                </tr>)}
            </tbody>
        </>}
    </IndexEntity>

        
    )
}