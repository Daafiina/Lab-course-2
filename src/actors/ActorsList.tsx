import GenericList from "../utilis/GenericList";
import { actorDTO } from "./actors.model";
import css from "./IndividualActor.module.css";
import IndividualActor from "./IndividualActor";

export default function ActorsList(props: ActorsListProps) {
  return <GenericList 
  list={props.actors}>
    <div className={css.div}>
      {props.actors?.map(actor => 
        <IndividualActor {...actor} key={actor.id} />)}
        
    </div>
    
  </GenericList>;
}

interface ActorsListProps {
  actors?: actorDTO[];
}
