import { Typeahead } from "react-bootstrap-typeahead";
import { actorMovieDTO } from "../actors/actors.model";

export default function TypeAheadActors(props: typeAheadActorsProps){

    const actors: actorMovieDTO[]=[{
        id:1, name:'Felipe', character:'', picture:'https://nationaltoday.com/wp-content/uploads/2022/05/83-Tom-Holland-640x514.jpg'
    },
    {
        id:2, name:'Fernando', character:'', picture:'https://cdn.mos.cms.futurecdn.net/Krf8MjtWTqz95vMnLopbtB-1024-80.jpg.webp'
    },
    {
        id:3, name:'Jesica', character:'', picture:'https://pbs.twimg.com/profile_images/1157880409851432960/9n7HSjC8_400x400.jpg'
    }]


    return(
        <>
            <label>{props.displayName}</label>
            <Typeahead
                id="typeahead"
                onChange={actor => {
                    console.log(actor);
                }}
                options={actors}
                labelKey="text"
                filterBy={['name']}
                placeholder="Write name of the actor.."
                minLength={1}
            />
        </>
    )
}

interface typeAheadActorsProps{
    displayName: string;
    actors: actorMovieDTO[];
}