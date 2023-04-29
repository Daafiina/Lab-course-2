import IndexEntity from "../utilis/IndexEntity";
import { movieTheaterDTO } from "./movieTheater.model";
import { urlMovieTheatres } from "../endpoints";

export default function IndexMovieTheaters(){
    return (
        <IndexEntity<movieTheaterDTO> 
            url={urlMovieTheatres} createURL="movietheaters/create" title="Movie Theaters"
            entityName="Movie Theater"
        >
            {(entities, buttons) => <>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {entities?.map(entity => <tr key={entity.id}>
                        <td>
                            {buttons(`movietheaters/edit/${entity.id}`, entity.id)}
                        </td>
                        <td>
                            {entity.name}
                        </td>
                    </tr>)}
                </tbody>
            </>}
        </IndexEntity>
    )
}