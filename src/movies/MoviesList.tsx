import GenericList from "../utilis/GenericList";
import MovieComp from "./MovieComp";
import { movieDTO } from "./movies.model";
import css from "./MoviesList.module.css";

export default function MoviesList(props: moviesListProps) {
  return <GenericList list={props.movies}>
    <div className={css.div}>
      {props.movies?.map((movie) => (
        <MovieComp {...movie} key={movie.id} />
      ))}
      {/* //?nese movies jane undifined ms mu bo run */}
    </div>
  </GenericList>;
}

interface moviesListProps {
  movies?: movieDTO[];
}
