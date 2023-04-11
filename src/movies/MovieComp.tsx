import { movieDTO } from "./movies.model";
import css from './MovieComp.module.css'

export default function MovieComp(props:movieDTO){

    const buildLink=()=> `/movie/${props.id}`

    return(
        <div className={css.div}>
            <a href={buildLink()}>
                <img alt="Poster" src={props.poster}/>
            </a>
            <p>
                <a href={buildLink()}>{props.title}</a>
            </p>

        </div>
    )
}